import React from "react";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider as UIProvider } from "@spendspot/ui-components/provider";

/**
 * Root application layout provider orchestrating design system context and
 * native gesture support. Wraps all routes in gesture handlers, safe areas,
 * overlay portals, and theme configurations.
 */
export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider style={{ flex: 1 }}>
        <UIProvider mode="system">
          <StatusBar style="auto" />
          <Stack
            screenOptions={{
              headerShown: true,
              headerStyle: { backgroundColor: "#ffffff" },
              headerShadowVisible: false,
              title: "SpendSpot UI Showcase",
            }}
          />
        </UIProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
