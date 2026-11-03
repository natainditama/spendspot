import { Stack } from "expo-router";
import React from "react";

import { lightTheme } from "@spendspot/ui-components/config";

/**
 * Authentication route group layout configuring seamless Stack navigation
 * for login, registration, and future credential recovery screens.
 */
export default function AuthLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        animation: "fade_from_bottom",
        contentStyle: {
          backgroundColor: lightTheme.background,
        },
      }}
    >
      <Stack.Screen name="login" options={{ title: "Log In" }} />
      <Stack.Screen name="register" options={{ title: "Create Account" }} />
    </Stack>
  );
}
