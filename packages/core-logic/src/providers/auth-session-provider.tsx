import type { Session, User } from "@supabase/supabase-js";
import React, { createContext, useContext, useEffect, useState, type ReactNode } from "react";

import type { LoginFormValues, RegisterFormValues } from "../components/auth/types";
import { supabase } from "../lib/supabase";
import { getUserProfile, signInWithEmail, signOutUser, signUpWithEmail } from "../services/auth-service";
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
  /** Signs in an existing account via email & password */
  signIn: (credentials: LoginFormValues) => Promise<{ success: boolean; error?: string }>;
  /** Registers a new account via email, password, and full name */
  signUp: (values: RegisterFormValues) => Promise<{ success: boolean; error?: string }>;
  /** Signs out of current active session */
  signOut: () => Promise<void>;
  /** Refreshes profile row from public.users */
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
            if (isMounted) setProfile(userProfile);
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
        }
      } else {
        if (isMounted) {
          setProfile(null);
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
    }
  };

  const signIn = async (credentials: LoginFormValues): Promise<{ success: boolean; error?: string }> => {
    setIsLoading(true);
    const result = await signInWithEmail(credentials);
    setIsLoading(false);

    if (!result.success || !result.data) {
      return { success: false, error: result.message ?? "Sign in failed" };
    }

    setSession(result.data.session);
    setUser(result.data.user);
    const userProfile = await getUserProfile(result.data.user.id);
    setProfile(userProfile);

    return { success: true };
  };

  const signUp = async (values: RegisterFormValues): Promise<{ success: boolean; error?: string }> => {
    setIsLoading(true);
    const result = await signUpWithEmail(values);
    setIsLoading(false);

    if (!result.success || !result.data) {
      return { success: false, error: result.message ?? "Sign up failed" };
    }

    setSession(result.data.session);
    setUser(result.data.user);

    if (result.data.session) {
      const userProfile = await getUserProfile(result.data.user.id);
      setProfile(userProfile);
    }

    return { success: true };
  };

  const signOut = async () => {
    setIsLoading(true);
    await signOutUser();
    setSession(null);
    setUser(null);
    setProfile(null);
    setIsLoading(false);
  };

  const value: AuthContextType = {
    user,
    session,
    profile,
    isLoading,
    isAuthenticated: Boolean(session && user),
    signIn,
    signUp,
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
