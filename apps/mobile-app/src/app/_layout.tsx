import { DefaultTheme, Stack, ThemeProvider, type Theme } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import * as WebBrowser from "expo-web-browser";
import React, { useEffect } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";

import i18n, { initializeI18n } from "@spendspot/core-logic/i18n";
import { AuthSessionProvider, useAuthSession } from "@spendspot/core-logic/providers/auth-session-provider";
import { lightTheme } from "@spendspot/ui-components/config";
import { Provider as UIProvider } from "@spendspot/ui-components/provider";
import { Toaster } from "@spendspot/ui-components/toast";

// Keep native splash screen visible while fonts, i18n, and auth state initialize
SplashScreen.preventAutoHideAsync().catch(() => {});

// Ensure auth session redirects are handled immediately upon app mount
WebBrowser.maybeCompleteAuthSession();

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
 * Root Stack navigation container synchronized with native splash screen.
 */
function RootNavigation() {
  const { isLoading } = useAuthSession();
  const appName = i18n.t("common:common.appName", "SpendSpot");

  useEffect(() => {
    if (!isLoading) {
      SplashScreen.hideAsync().catch(() => {});
    }
  }, [isLoading]);

  if (isLoading) {
    return null;
  }

  return (
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
      <Stack.Screen name="auth/callback" options={{ headerShown: false }} />
      <Stack.Screen name="+not-found" options={{ headerShown: false }} />
    </Stack>
  );
}

/**
 * Root application layout provider orchestrating design system context and
 * native gesture support. Configures default Stack navigation headers with
 * synchronous theme colors and localized application naming.
 */
export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider style={{ flex: 1 }}>
        <StatusBar style="dark" />
        <AuthSessionProvider>
          <UIProvider>
            <ThemeProvider value={navigationTheme}>
              <RootNavigation />
              <Toaster position="top-center" />
            </ThemeProvider>
          </UIProvider>
        </AuthSessionProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
