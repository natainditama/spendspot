import { useRouter } from "expo-router";
import React, { useEffect, type ReactNode } from "react";

import { getIsRecoveryFlow } from "../services/auth-service";
import { useAuthSession } from "./auth-session-provider";

export interface GuestOnlyProviderProps {
  children: ReactNode;
  redirectTo?: string;
}

/**
 * Route protection provider that restricts access to guest (unauthenticated) users only.
 * If the user is authenticated, they are automatically redirected to the dashboard.
 * Suppressed when a password recovery flow is active.
 */
export function GuestOnlyProvider({ children, redirectTo = "/(dashboard)" }: GuestOnlyProviderProps) {
  const { isAuthenticated, isLoading, isRecoveryMode } = useAuthSession();
  const router = useRouter();
  const isRecovery = isRecoveryMode || getIsRecoveryFlow();

  useEffect(() => {
    if (!isLoading && isAuthenticated && !isRecovery) {
      router.replace(redirectTo as never);
    }
  }, [isAuthenticated, isLoading, isRecovery, redirectTo, router]);

  if (!isLoading && isAuthenticated && !isRecovery) {
    return null;
  }

  return <>{children}</>;
}
