import { Stack } from "expo-router";
import React from "react";

import { GuestOnlyProvider } from "@spendspot/core-logic/providers/guest-only-provider";

import { screenOptions } from "../_layout";

/**
 * Authentication route group layout configuring seamless Stack navigation
 * for login, registration, and future credential recovery screens.
 * Restricted to guest users via GuestOnlyProvider.
 */
export default function AuthLayout() {
  return (
    <GuestOnlyProvider>
      <Stack
        screenOptions={{
          ...screenOptions,
          headerShown: false,
        }}
      >
        <Stack.Screen name="login" options={{ title: "Log In" }} />
        <Stack.Screen name="register" options={{ title: "Create Account" }} />
      </Stack>
    </GuestOnlyProvider>
  );
}
