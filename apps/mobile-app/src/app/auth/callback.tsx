import { Redirect } from "expo-router";
import React from "react";

import { useAuthSession } from "@spendspot/core-logic/providers/auth-session-provider";

/**
 * Route handler for OAuth deep link callbacks (`/auth/callback`).
 * Handles the returning deep link without rendering the not-found fallback screen.
 * Keeps splash screen active while authentication tokens are being exchanged.
 * Seamlessly transitions to the dashboard upon successful authentication.
 */
export default function AuthCallbackRoute() {
  const { isAuthenticated, isLoading } = useAuthSession();

  if (isLoading) {
    return null;
  }

  if (isAuthenticated) {
    return <Redirect href="/(dashboard)" />;
  }

  return <Redirect href="/onboarding" />;
}
