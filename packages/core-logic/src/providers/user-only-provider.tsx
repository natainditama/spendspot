import { useRouter } from "expo-router";
import React, { useEffect, type ReactNode } from "react";

import { getIsRecoveryFlow } from "../services/auth-service";
import { useAuthSession } from "./auth-session-provider";

export interface UserOnlyProviderProps {
  children: ReactNode;
  redirectTo?: string;
}

/**
 * Route protection provider that restricts access to authenticated users only.
 * If the user is not authenticated, they are automatically redirected to the login screen.
 * If a password recovery flow is active, redirects to /reset-password instead.
 */
export function UserOnlyProvider({ children, redirectTo = "/(auth)/login" }: UserOnlyProviderProps) {
  const { isAuthenticated, isLoading, isRecoveryMode } = useAuthSession();
  const router = useRouter();
  const isRecovery = isRecoveryMode || getIsRecoveryFlow();

  useEffect(() => {
    if (!isLoading && isAuthenticated && isRecovery) {
      router.replace("/reset-password" as never);
      return;
    }

    if (!isLoading && !isAuthenticated) {
      router.replace(redirectTo as never);
    }
  }, [isAuthenticated, isLoading, isRecovery, redirectTo, router]);

  if (isLoading || !isAuthenticated || isRecovery) {
    return null;
  }

  return <>{children}</>;
}
