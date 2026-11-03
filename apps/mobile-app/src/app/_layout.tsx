import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";

import i18n, { initializeI18n } from "@spendspot/core-logic/i18n";
import { lightTheme } from "@spendspot/ui-components/config";
import { Provider as UIProvider } from "@spendspot/ui-components/provider";
import { Toaster } from "@spendspot/ui-components/toast";

// Bootstrap i18n translation catalogs early on app mount
initializeI18n();

/**
 * Root application layout provider orchestrating design system context and
 * native gesture support. Configures default Stack navigation headers with
 * synchronous theme colors and localized application naming.
 */
export default function RootLayout() {
  const appName = i18n.t("common:common.appName", "SpendSpot");

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider style={{ flex: 1 }}>
        <StatusBar style="auto" />
        <UIProvider>
          <Stack
            screenOptions={{
              headerShown: true,
              headerBackVisible: true,
              headerTitleAlign: "center",
              title: appName,
              headerStyle: {
                backgroundColor: lightTheme.background,
              },
              headerTintColor: lightTheme.foreground,
              headerTitleStyle: {
                color: lightTheme.foreground,
                fontWeight: "700",
              },
              contentStyle: {
                backgroundColor: lightTheme.background,
              },
            }}
          >
            <Stack.Screen name="index" options={{ headerBackVisible: false }} />
            <Stack.Screen name="onboarding" options={{ headerShown: true }} />
            <Stack.Screen name="(auth)" options={{ headerShown: false }} />
          </Stack>
          <Toaster />
        </UIProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
