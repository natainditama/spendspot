import { Redirect } from "expo-router";
import React from "react";

import { useAuthSession } from "@spendspot/core-logic/providers/auth-session-provider";

/**
 * Route handler for OAuth deep link callbacks (`/auth/callback`).
 * Handles the returning deep link without rendering the not-found fallback screen.
 * Keeps splash screen active while authentication tokens are being exchanged.
 * Seamlessly transitions to the dashboard if setup completed, or setup wizard if pending.
 */
export default function AuthCallbackRoute() {
  const { isAuthenticated, isLoading, isSetupCompleted } = useAuthSession();

  if (isLoading) {
    return null;
  }

  if (isAuthenticated) {
    if (isSetupCompleted) {
      return <Redirect href="/(dashboard)" />;
    }

    return <Redirect href="/(setup)" />;
  }

  return <Redirect href="/onboarding" />;
}
