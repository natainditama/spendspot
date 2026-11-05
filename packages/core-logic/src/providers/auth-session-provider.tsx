import type { Session, User } from "@supabase/supabase-js";
import React, { createContext, useContext, useEffect, useState, type ReactNode } from "react";

import type { LoginFormValues, RegisterFormValues } from "../components/auth/types";
import { supabase } from "../lib/supabase";
import {
  checkUserSetupStatus,
  getUserProfile,
  signInWithEmail,
  signInWithGoogle,
  signOutUser,
  signUpWithEmail,
  type SetupCompletionStatus,
} from "../services/auth-service";
import type { UserProfile } from "../types/database";

export interface AuthContextType {
  /** The currently authenticated Supabase user entity */
  user: User | null;
  /** Active session containing JWT tokens */
  session: Session | null;
  /** Profile attributes loaded from public.users */
  profile: UserProfile | null;
  /** Whether the initial auth session resolution is in-flight */
  isLoading: boolean;
  /** Boolean indicating valid authenticated state */
  isAuthenticated: boolean;
  /** Boolean indicating whether permissions and financial budget setup are completed */
  isSetupCompleted: boolean;
  /** Checks current setup status across permissions and profile baseline */
  checkSetupStatus: () => Promise<SetupCompletionStatus>;
  /** Signs in an existing account via email & password */
  signIn: (credentials: LoginFormValues) => Promise<{ success: boolean; isSetupCompleted?: boolean; error?: string }>;
  /** Registers a new account via email, password, and full name */
  signUp: (values: RegisterFormValues) => Promise<{ success: boolean; isSetupCompleted?: boolean; error?: string }>;
  /** Signs in or registers via Google OAuth */
  signInWithGoogle: () => Promise<{ success: boolean; isSetupCompleted?: boolean; error?: string }>;
  /** Signs out of current active session */
  signOut: () => Promise<void>;
  /** Refreshes profile row from public.users and revalidates setup status */
  refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export interface AuthSessionProviderProps {
  children: ReactNode;
}

/**
 * Context provider managing Supabase user authentication, active session persistence,
 * and profile synchronization across all mobile screen hierarchies.
 */
export function AuthSessionProvider({ children }: AuthSessionProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isSetupCompleted, setIsSetupCompleted] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    let isMounted = true;

    const initializeAuth = async () => {
      try {
        const { data } = await supabase.auth.getSession();

        if (isMounted) {
          setSession(data.session);
          setUser(data.session?.user ?? null);

          if (data.session?.user) {
            const userProfile = await getUserProfile(data.session.user.id);
            if (isMounted) {
              setProfile(userProfile);
              const setupStatus = await checkUserSetupStatus(data.session.user.id, userProfile);
              setIsSetupCompleted(setupStatus.isCompleted);
            }
          }
        }
      } catch (err) {
        console.warn("SpendSpot Auth: Failed to restore session:", err);
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    void initializeAuth();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, newSession) => {
      if (!isMounted) return;
      setSession(newSession);
      setUser(newSession?.user ?? null);

      if (newSession?.user) {
        const userProfile = await getUserProfile(newSession.user.id);
        if (isMounted) {
          setProfile(userProfile);
          const setupStatus = await checkUserSetupStatus(newSession.user.id, userProfile);
          setIsSetupCompleted(setupStatus.isCompleted);
        }
      } else {
        if (isMounted) {
          setProfile(null);
          setIsSetupCompleted(false);
        }
      }
      setIsLoading(false);
    });

    return () => {
      isMounted = false;
      subscription.unsubscribe();
    };
  }, []);

  const refreshProfile = async () => {
    if (user?.id) {
      const userProfile = await getUserProfile(user.id);
      setProfile(userProfile);
      const setupStatus = await checkUserSetupStatus(user.id, userProfile);
      setIsSetupCompleted(setupStatus.isCompleted);
    }
  };

  const handleCheckSetupStatus = async (): Promise<SetupCompletionStatus> => {
    const status = await checkUserSetupStatus(user?.id, profile);
    setIsSetupCompleted(status.isCompleted);
    return status;
  };

  const signIn = async (
    credentials: LoginFormValues
  ): Promise<{ success: boolean; isSetupCompleted?: boolean; error?: string }> => {
    setIsLoading(true);
    try {
      const result = await signInWithEmail(credentials);

      if (!result.success || !result.data) {
        return { success: false, error: result.message ?? "Sign in failed" };
      }

      setSession(result.data.session);
      setUser(result.data.user);
      const userProfile = await getUserProfile(result.data.user.id);
      setProfile(userProfile);
      setIsSetupCompleted(result.data.isSetupCompleted);

      return { success: true, isSetupCompleted: result.data.isSetupCompleted };
    } finally {
      setIsLoading(false);
    }
  };

  const signUp = async (
    values: RegisterFormValues
  ): Promise<{ success: boolean; isSetupCompleted?: boolean; error?: string }> => {
    setIsLoading(true);
    try {
      const result = await signUpWithEmail(values);

      if (!result.success || !result.data) {
        return { success: false, error: result.message ?? "Sign up failed" };
      }

      setSession(result.data.session);
      setUser(result.data.user);

      if (result.data.session) {
        const userProfile = await getUserProfile(result.data.user.id);
        setProfile(userProfile);
      }
      setIsSetupCompleted(result.data.isSetupCompleted);

      return { success: true, isSetupCompleted: result.data.isSetupCompleted };
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async (): Promise<{ success: boolean; isSetupCompleted?: boolean; error?: string }> => {
    setIsLoading(true);
    try {
      const result = await signInWithGoogle();

      if (!result.success || !result.data) {
        return { success: false, error: result.message ?? "Google sign-in failed" };
      }

      setSession(result.data.session);
      setUser(result.data.user);
      const userProfile = await getUserProfile(result.data.user.id);
      setProfile(userProfile);
      setIsSetupCompleted(result.data.isSetupCompleted);

      return { success: true, isSetupCompleted: result.data.isSetupCompleted };
    } finally {
      setIsLoading(false);
    }
  };

  const signOut = async () => {
    setIsLoading(true);
    await signOutUser();
    setSession(null);
    setUser(null);
    setProfile(null);
    setIsSetupCompleted(false);
    setIsLoading(false);
  };

  const value: AuthContextType = {
    user,
    session,
    profile,
    isLoading,
    isAuthenticated: Boolean(session && user),
    isSetupCompleted,
    checkSetupStatus: handleCheckSetupStatus,
    signIn,
    signUp,
    signInWithGoogle: handleGoogleSignIn,
    signOut,
    refreshProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

/**
 * Access the SpendSpot authentication context and user session state.
 */
export function useAuthSession(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthSession must be used within an AuthSessionProvider");
  }
  return context;
}
