import { DefaultTheme, Stack, ThemeProvider, type Theme } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";

import i18n, { initializeI18n } from "@spendspot/core-logic/i18n";
import { AuthSessionProvider } from "@spendspot/core-logic/providers/auth-session-provider";
import { lightTheme } from "@spendspot/ui-components/config";
import { Provider as UIProvider } from "@spendspot/ui-components/provider";
import { Toaster } from "@spendspot/ui-components/toast";

// Bootstrap i18n translation catalogs early on app mount
initializeI18n();

/**
 * Shared React Navigation theme overriding all default Expo Router color tokens
 * with spendspot lightTheme tokens (background, foreground, card, border, primary).
 */
export const navigationTheme: Theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: lightTheme.primary,
    background: lightTheme.background,
    card: lightTheme.card,
    text: lightTheme.foreground,
    border: lightTheme.border,
    notification: lightTheme.destructive,
  },
};

/**
 * Global stack screenOptions contract standardizing native iOS-style navigation
 * across all layout groups with synchronized lightTheme tokens.
 */
export const screenOptions = {
  headerShown: true,
  animation: "fade_from_bottom",
  headerBackVisible: true,
  headerTitleAlign: "center",
  headerShadowVisible: true,
  statusBarStyle: "dark",
  statusBarColor: lightTheme.background,
  navigationBarColor: lightTheme.background,
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
} as const;

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
        <StatusBar style="dark" />
        <AuthSessionProvider>
          <UIProvider>
            <ThemeProvider value={navigationTheme}>
              <Stack
                screenOptions={{
                  ...screenOptions,
                  title: appName,
                }}
              >
                <Stack.Screen name="index" options={{ headerShown: false }} />
                <Stack.Screen name="onboarding" options={{ headerShown: false }} />
                <Stack.Screen name="(auth)" options={{ headerShown: false }} />
                <Stack.Screen name="(setup)" options={{ headerShown: false }} />
                <Stack.Screen name="(dashboard)" options={{ headerShown: false }} />
              </Stack>
              <Toaster position="top-center" />
            </ThemeProvider>
          </UIProvider>
        </AuthSessionProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
