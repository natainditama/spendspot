import { useRouter } from "expo-router";
import React, { useEffect, type ReactNode } from "react";

import { useAuthSession } from "./auth-session-provider";

export interface UserOnlyProviderProps {
  children: ReactNode;
  redirectTo?: string;
}

/**
 * Route protection provider that restricts access to authenticated users only.
 * If the user is not authenticated, they are automatically redirected to the login screen.
 */
export function UserOnlyProvider({ children, redirectTo = "/(auth)/login" }: UserOnlyProviderProps) {
  const { isAuthenticated, isLoading } = useAuthSession();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.replace(redirectTo as never);
    }
  }, [isAuthenticated, isLoading, redirectTo, router]);

  if (isLoading || !isAuthenticated) {
    return null;
  }

  return <>{children}</>;
}
