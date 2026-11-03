import type { Session, User } from "@supabase/supabase-js";

import type { LoginFormValues, RegisterFormValues } from "../components/auth/types";
import { supabase } from "../lib/supabase";
import { formatValidationErrors } from "../lib/utils/format-errors";
import type { UserProfile } from "../types/database";
import type { BaseResponse, ErrorResponse, ServiceResponse, SuccessResponse } from "../types/response";

export type { BaseResponse, ErrorResponse, ServiceResponse, SuccessResponse };

/**
 * Authenticates an existing user using email and password credentials.
 */
export async function signInWithEmail({
  email,
  password,
}: LoginFormValues): Promise<ServiceResponse<{ user: User; session: Session }>> {
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

    return {
      success: true,
      message: "Successfully signed in",
      data: {
        user: data.user,
        session: data.session,
      },
    };
  } catch (err) {
    return formatValidationErrors(err, "An unexpected error occurred during login.");
  }
}

/**
 * Registers a new user account with email, password, and full name metadata.
 * Safely inserts or updates the public profile row in public.users.
 */
export async function signUpWithEmail({
  fullName,
  email,
  password,
}: RegisterFormValues): Promise<ServiceResponse<{ user: User; session: Session | null }>> {
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

    // Client-side fallback: ensure user row in public.users exists
    if (data.session) {
      try {
        await supabase.from("users").upsert(
          {
            user_id: data.user.id,
            email: trimmedEmail,
            full_name: trimmedName,
            preferred_currency: "IDR",
            preferred_language: "id",
          },
          { onConflict: "user_id" }
        );
      } catch {
        // Ignored if database trigger handle_new_user already handled profile insertion
      }
    }

    return {
      success: true,
      message: "Successfully registered account",
      data: {
        user: data.user,
        session: data.session,
      },
    };
  } catch (err) {
    return formatValidationErrors(err, "An unexpected error occurred during registration.");
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
