import { Stack } from "expo-router";
import React from "react";

import { screenOptions } from "../_layout";

/**
 * Authentication route group layout configuring seamless Stack navigation
 * for login, registration, and future credential recovery screens.
 * Inherits standard screenOptions from the root layout.
 */
export default function AuthLayout() {
  return (
    <Stack
      screenOptions={{
        ...screenOptions,
        headerShown: false,
      }}
    >
      <Stack.Screen name="login" options={{ title: "Log In" }} />
      <Stack.Screen name="register" options={{ title: "Create Account" }} />
    </Stack>
  );
}
