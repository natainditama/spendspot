import { TamaguiProvider, Theme } from "@tamagui/core";
import { PortalProvider } from "@tamagui/portal";
import React, { createContext, useContext } from "react";
import { StyleSheet, View, type ViewProps } from "react-native";

import { config } from "../config";

const RootProviderContext = createContext<boolean>(false);

/**
 * Configuration properties for the SpendSpot application root provider.
 * Supports passing custom children elements and additional root container styles.
 */
export interface ProviderProps {
  children?: React.ReactNode;
  style?: ViewProps["style"];
}

/**
 * SpendSpot application provider that locks all rendering to the light theme.
 * Prevents duplicate TamaguiProvider roots and enforces unified cross-platform design context.
 */
export function Provider({ children, style }: ProviderProps) {
  const isAlreadyInRoot = useContext(RootProviderContext);

  if (isAlreadyInRoot) {
    return (
      <View style={[styles.root, style]}>
        <Theme name="light">{children}</Theme>
      </View>
    );
  }

  return (
    <RootProviderContext.Provider value={true}>
      <TamaguiProvider config={config} defaultTheme="light">
        <PortalProvider shouldAddRootHost>
          <View style={[styles.root, style]}>
            <Theme name="light">{children}</Theme>
          </View>
        </PortalProvider>
      </TamaguiProvider>
    </RootProviderContext.Provider>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    height: "100%",
    width: "100%",
  },
});

export { config } from "../config";
export { PortalProvider } from "@tamagui/portal";
