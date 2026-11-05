import { Redirect } from "expo-router";
import React from "react";

import { useAuthSession } from "@spendspot/core-logic/providers/auth-session-provider";

/**
 * Root entry router gate.
 * Evaluates session authentication state and setup completion:
 * - When loading: returns null to keep native splash screen active
 * - When authenticated & setup completed: redirects to (dashboard)
 * - When authenticated & setup pending (location, notifications, or limits): redirects to (setup)
 * - When unauthenticated: redirects to onboarding carousel
 */
export default function IndexRoute() {
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
