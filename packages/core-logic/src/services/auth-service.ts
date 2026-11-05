import type { Session, User } from "@supabase/supabase-js";
import Constants, { AppOwnership, ExecutionEnvironment } from "expo-constants";
import * as Linking from "expo-linking";
import * as Location from "expo-location";
import * as Notifications from "expo-notifications";
import * as WebBrowser from "expo-web-browser";

import type { LoginFormValues, RegisterFormValues } from "../components/auth/types";
import { supabase } from "../lib/supabase";
import { resolveDeviceCurrency, resolveDeviceLocale } from "../lib/utils/device-locale";
import { formatValidationErrors } from "../lib/utils/format-errors";
import type { UserProfile } from "../types/database";
import type { BaseResponse, ErrorResponse, ServiceResponse, SuccessResponse } from "../types/response";

WebBrowser.maybeCompleteAuthSession();

export type { BaseResponse, ErrorResponse, ServiceResponse, SuccessResponse };

export interface SetupCompletionStatus {
  isCompleted: boolean;
  hasLocationPermission: boolean;
  hasNotificationPermission: boolean;
  hasCurrency: boolean;
  hasDailyCap: boolean;
  hasMonthlyCap: boolean;
}

/**
 * Checks whether the user has completed the onboarding setup wizard.
 * Verifies that:
 * 1. Location foreground permission is granted
 * 2. Push notification permission is granted
 * 3. Currency is selected in user profile
 * 4. dailyCap (daily_limit) is configured (> 0)
 * 5. monthlyCap (monthly_limit) is configured (> 0)
 */
export async function checkUserSetupStatus(
  userId?: string | null,
  cachedProfile?: UserProfile | null
): Promise<SetupCompletionStatus> {
  let hasLocationPermission = false;
  let hasNotificationPermission = false;

  try {
    const locStatus = await Location.getForegroundPermissionsAsync();
    hasLocationPermission = locStatus.status === "granted";
  } catch {
    hasLocationPermission = false;
  }

  try {
    const notifStatus = await Notifications.getPermissionsAsync();
    hasNotificationPermission = notifStatus.status === "granted";
  } catch {
    hasNotificationPermission = false;
  }

  let profile = cachedProfile;
  if (!profile && userId) {
    profile = await getUserProfile(userId);
  }

  const hasCurrency = Boolean(profile?.preferred_currency);
  const hasDailyCap = typeof profile?.daily_limit === "number" && profile.daily_limit > 0;
  const hasMonthlyCap = typeof profile?.monthly_limit === "number" && profile.monthly_limit > 0;

  const isCompleted = hasLocationPermission && hasNotificationPermission && hasCurrency && hasDailyCap && hasMonthlyCap;

  return {
    isCompleted,
    hasLocationPermission,
    hasNotificationPermission,
    hasCurrency,
    hasDailyCap,
    hasMonthlyCap,
  };
}

/**
 * Parses query strings and hash fragments from an OAuth redirect URL.
 */
function extractParamsFromUrl(url: string): Record<string, string> {
  const params: Record<string, string> = {};

  try {
    const queryString = url.includes("?") ? url.split("?")[1]?.split("#")[0] : "";
    const hashString = url.includes("#") ? url.split("#")[1] : "";

    if (queryString) {
      const searchParams = new URLSearchParams(queryString);
      searchParams.forEach((val, key) => {
        params[key] = val;
      });
    }

    if (hashString) {
      const hashParams = new URLSearchParams(hashString);
      hashParams.forEach((val, key) => {
        params[key] = val;
      });
    }
  } catch {
    // Fail silently and return whatever was parsed
  }

  return params;
}

/**
 * Authenticates an existing user using email and password credentials.
 */
export async function signInWithEmail({
  email,
  password,
}: LoginFormValues): Promise<ServiceResponse<{ user: User; session: Session; isSetupCompleted: boolean }>> {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    });

    if (error) {
      return formatValidationErrors(error, "Sign in failed");
    }

    if (!data.user || !data.session) {
      return {
        success: false,
        message: "Authentication failed. No active session returned.",
        errors: {
          session: "Authentication response did not include a valid user and session.",
        },
      };
    }

    const setupStatus = await checkUserSetupStatus(data.user.id);

    return {
      success: true,
      message: "Successfully signed in",
      data: {
        user: data.user,
        session: data.session,
        isSetupCompleted: setupStatus.isCompleted,
      },
    };
  } catch (err) {
    return formatValidationErrors(err, "An unexpected error occurred during login.");
  }
}

/**
 * Registers a new user account with email, password, and full name metadata.
 * Designed for immediate access without requiring email verification.
 * Automatically initiates session and provisions the user profile in public.users.
 */
export async function signUpWithEmail({
  fullName,
  email,
  password,
}: RegisterFormValues): Promise<ServiceResponse<{ user: User; session: Session; isSetupCompleted: boolean }>> {
  try {
    const trimmedEmail = email.trim();
    const trimmedName = fullName.trim();

    const { data, error } = await supabase.auth.signUp({
      email: trimmedEmail,
      password,
      options: {
        data: {
          full_name: trimmedName,
        },
      },
    });

    if (error) {
      return formatValidationErrors(error, "Registration failed");
    }

    if (!data.user) {
      return {
        success: false,
        message: "Registration failed. User profile could not be created.",
        errors: {
          user: "Supabase authentication did not return a created user object.",
        },
      };
    }

    let session = data.session;

    // If Supabase project has email confirmation enabled in dashboard, attempt immediate
    // sign-in to bypass verification requirement if allowed, or restore session
    if (!session) {
      const { data: signInData } = await supabase.auth.signInWithPassword({
        email: trimmedEmail,
        password,
      });

      if (signInData?.session) {
        session = signInData.session;
      }
    }

    // Provision or update user profile record in public.users
    try {
      const preferredCurrency = resolveDeviceCurrency();
      const preferredLanguage = resolveDeviceLocale();

      await supabase.from("users").upsert(
        {
          user_id: data.user.id,
          email: trimmedEmail,
          full_name: trimmedName,
          preferred_currency: preferredCurrency,
          preferred_language: preferredLanguage,
        },
        { onConflict: "user_id" }
      );
    } catch {
      // Ignored if database trigger handle_new_user already handled profile insertion
    }

    if (!session) {
      // When Supabase strictly enforces confirmation at server level
      return {
        success: true,
        message: "Account created successfully. You can now log in.",
        data: {
          user: data.user,
          session: null as unknown as Session,
          isSetupCompleted: false,
        },
      };
    }

    const setupStatus = await checkUserSetupStatus(data.user.id);

    return {
      success: true,
      message: "Successfully registered account",
      data: {
        user: data.user,
        session,
        isSetupCompleted: setupStatus.isCompleted,
      },
    };
  } catch (err) {
    return formatValidationErrors(err, "An unexpected error occurred during registration.");
  }
}

/**
 * Resolves the appropriate OAuth redirect URI.
 * In development / Expo Go, dynamically targets the Metro bundler deep link (`exp://<hostUri>/--/auth/callback`).
 * In standalone / production builds, targets the native app scheme (`spendspot://auth/callback`).
 */
export function getAuthRedirectUri(): string {
  const isExpoGo =
    Constants.appOwnership === AppOwnership.Expo || Constants.executionEnvironment === ExecutionEnvironment.StoreClient;
  const hostUri = Constants.expoConfig?.hostUri || Constants.expoGoConfig?.debuggerHost;

  if (isExpoGo || (__DEV__ && hostUri)) {
    if (hostUri) {
      return `exp://${hostUri}/--/auth/callback`;
    }

    if (Constants.linkingUri && Constants.linkingUri.startsWith("exp://")) {
      const cleanUri = Constants.linkingUri.replace(/\/--($|\/.*$)/, "").replace(/\/+$/, "");
      return `${cleanUri}/--/auth/callback`;
    }
  }

  // Standalone / Production APK uses the native custom scheme
  return Linking.createURL("auth/callback");
}

/**
 * Authenticates the user with Google OAuth using Chrome Custom Tabs on Android / WebBrowser,
 * compatible with Expo Go and standalone builds without native code requirements.
 */
export async function signInWithGoogle(): Promise<
  ServiceResponse<{ user: User; session: Session; isSetupCompleted: boolean }>
> {
  try {
    // Generate valid redirect URL for Expo Go (e.g. exp://...) or production scheme (spendspot://...)
    const redirectUri = getAuthRedirectUri();
    console.log("[SpendSpot Auth] Initiating Google OAuth with redirectUri:", redirectUri);

    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: redirectUri,
        skipBrowserRedirect: true,
      },
    });

    if (error) {
      return formatValidationErrors(error, "Google sign in failed");
    }

    if (!data.url) {
      return {
        success: false,
        message: "Could not generate Google authentication URL.",
        errors: {
          auth: "No OAuth URL returned from Supabase authentication endpoint.",
        },
      };
    }

    // Launch in-app browser session
    const authResult = await WebBrowser.openAuthSessionAsync(data.url, redirectUri);
    if (authResult.type !== "success" || !authResult.url) {
      const isCanceled = authResult.type === "cancel" || authResult.type === "dismiss";

      return {
        success: false,
        message: isCanceled ? "Google sign-in was canceled." : "Google sign-in could not be completed.",
        errors: {
          auth: authResult.type,
        },
      };
    }

    // Extract authorization tokens or PKCE code from response URL
    const params = extractParamsFromUrl(authResult.url);
    console.log("[SpendSpot Auth] OAuth callback URL parsed params:", Object.keys(params));

    if (params.error || params.error_description) {
      const errorMessage = params.error_description || params.error || "Authentication provider returned an error.";

      return {
        success: false,
        message: decodeURIComponent(errorMessage.replace(/\+/g, " ")),
        errors: {
          auth: params.error,
        },
      };
    }

    let session: Session | null = null;
    let user: User | null = null;

    if (params.code) {
      const { data: exchangeData, error: exchangeError } = await supabase.auth.exchangeCodeForSession(params.code);
      if (exchangeError) return formatValidationErrors(exchangeError, "Failed to exchange auth code for session.");

      session = exchangeData.session;
      user = exchangeData.user;
    } else if (params.access_token && params.refresh_token) {
      const { data: sessionData, error: sessionError } = await supabase.auth.setSession({
        access_token: params.access_token,
        refresh_token: params.refresh_token,
      });

      if (sessionError) return formatValidationErrors(sessionError, "Failed to set session from tokens.");
      session = sessionData.session;
      user = sessionData.user;
    } else {
      // Fallback: Check active session from client
      const { data: currentSession } = await supabase.auth.getSession();
      session = currentSession.session;
      user = currentSession.session?.user ?? null;
    }

    if (!session || !user) {
      return {
        success: false,
        message: "Failed to establish user session after Google sign-in.",
        errors: {
          auth: "Session or user not found after callback completion.",
        },
      };
    }

    // Provision or update user profile in public.users
    try {
      const meta = user.user_metadata || {};
      const fullName = (meta.full_name as string) || (meta.name as string) || "SpendSpot User";
      const avatarUrl = (meta.avatar_url as string) || null;
      const preferredCurrency = resolveDeviceCurrency();
      const preferredLanguage = resolveDeviceLocale();

      await supabase.from("users").upsert(
        {
          user_id: user.id,
          email: user.email ?? "",
          full_name: fullName,
          avatar_url: avatarUrl,
          preferred_currency: preferredCurrency,
          preferred_language: preferredLanguage,
        },
        { onConflict: "user_id" }
      );
    } catch {
      // Ignored if database trigger handle_new_user already handled profile insertion
    }

    const setupStatus = await checkUserSetupStatus(user.id);

    return {
      success: true,
      message: "Successfully authenticated with Google",
      data: {
        user,
        session,
        isSetupCompleted: setupStatus.isCompleted,
      },
    };
  } catch (err) {
    return formatValidationErrors(err, "An unexpected error occurred during Google sign-in.");
  }
}

/**
 * Terminates the current active Supabase user session.
 */
export async function signOutUser(): Promise<ServiceResponse<null>> {
  try {
    const { error } = await supabase.auth.signOut();

    if (error) {
      return formatValidationErrors(error, "Sign out failed");
    }

    return {
      success: true,
      message: "Successfully signed out",
      data: null,
    };
  } catch (err) {
    return formatValidationErrors(err, "Failed to sign out.");
  }
}

/**
 * Retrieves the current cached active session from Supabase client.
 */
export async function getCurrentSession(): Promise<Session | null> {
  try {
    const { data } = await supabase.auth.getSession();
    return data.session;
  } catch {
    return null;
  }
}

/**
 * Validates and fetches the current authenticated user from Supabase.
 */
export async function getCurrentUser(): Promise<User | null> {
  try {
    const { data } = await supabase.auth.getUser();
    return data.user;
  } catch {
    return null;
  }
}

/**
 * Queries user profile details from public.users table.
 */
export async function getUserProfile(userId: string): Promise<UserProfile | null> {
  try {
    const { data, error } = await supabase.from("users").select("*").eq("user_id", userId).maybeSingle();

    if (error || !data) {
      return null;
    }

    return data as UserProfile;
  } catch {
    return null;
  }
}
