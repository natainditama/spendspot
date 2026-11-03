import { useRouter } from "expo-router";
import React, { useEffect, type ReactNode } from "react";

import { useAuthSession } from "./auth-session-provider";

export interface GuestOnlyProviderProps {
  children: ReactNode;
  redirectTo?: string;
}

/**
 * Route protection provider that restricts access to guest (unauthenticated) users only.
 * If the user is authenticated, they are automatically redirected to the dashboard.
 */
export function GuestOnlyProvider({ children, redirectTo = "/(dashboard)" }: GuestOnlyProviderProps) {
  const { isAuthenticated, isLoading } = useAuthSession();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      router.replace(redirectTo as never);
    }
  }, [isAuthenticated, isLoading, redirectTo, router]);

  if (!isLoading && isAuthenticated) {
    return null;
  }

  return <>{children}</>;
}
