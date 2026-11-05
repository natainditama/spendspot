import { Stack } from "expo-router";
import React from "react";

import i18n from "@spendspot/core-logic/i18n";
import { UserOnlyProvider } from "@spendspot/core-logic/providers/user-only-provider";

import { screenOptions } from "../_layout";

/**
 * Route group layout for the post-authentication Setup Wizard flow.
 * Coordinates smooth stack navigation with fade_from_bottom animation
 * and localized stack header title.
 * Restricted to authenticated users via UserOnlyProvider.
 * Inherits standard screenOptions from the root layout.
 */
export default function SetupLayout() {
  const title = i18n.t("setup-wizard:budget.sectionTitle");

  return (
    <UserOnlyProvider>
      <Stack
        screenOptions={{
          ...screenOptions,
          headerShown: true,
          headerBackVisible: false,
        }}
      >
        <Stack.Screen
          name="index"
          options={{
            title,
          }}
        />
      </Stack>
    </UserOnlyProvider>
  );
}
