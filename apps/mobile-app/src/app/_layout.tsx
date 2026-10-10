import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { Provider as UIProvider } from "@spendspot/ui-components/provider";
import { Toaster } from "@spendspot/ui-components/toast";

/**
 * Root application layout provider orchestrating design system context and
 * native gesture support. Wraps all routes in gesture handlers, safe areas,
 * overlay portals, and theme configurations.
 */
export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider style={{ flex: 1 }}>
        <StatusBar style="auto" />
        <UIProvider>
          <Stack />
          <Toaster />
        </UIProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
