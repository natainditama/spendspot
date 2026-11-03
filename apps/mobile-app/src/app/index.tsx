import { Redirect } from "expo-router";
import React from "react";

import { useAuthSession } from "@spendspot/core-logic/providers/auth-session-provider";

/**
 * Root entry router gate.
 * Evaluates session authentication state and routes appropriately:
 * - When loading: returns null to keep native splash screen active
 * - When authenticated: redirects to (dashboard)
 * - When unauthenticated: redirects to onboarding carousel
 */
export default function IndexRoute() {
  const { isAuthenticated, isLoading } = useAuthSession();

  if (isLoading) {
    return null;
  }

  if (isAuthenticated) {
    return <Redirect href="/(dashboard)" />;
  }

  return <Redirect href="/onboarding" />;
}
