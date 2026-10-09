import { TamaguiProvider, Theme, View } from "@tamagui/core";
import { PortalProvider } from "@tamagui/portal";
import React, { createContext, useContext } from "react";

import { config } from "../config";

const RootProviderContext = createContext<boolean>(false);

/**
 * SpendSpot application provider that locks all rendering to the light theme.
 * Prevents duplicate TamaguiProvider roots and enforces unified cross-platform design context.
 */
export const Provider = ({ children }: ProviderProps) => {
  const isAlreadyInRoot = useContext(RootProviderContext);

  if (isAlreadyInRoot) {
    return (
      <View flex={1} background="$background">
        <Theme name="light">{children}</Theme>
      </View>
    );
  }

  return (
    <RootProviderContext.Provider value={true}>
      <TamaguiProvider config={config} defaultTheme="light">
        <PortalProvider shouldAddRootHost>
          <View flex={1} background="$background">
            <Theme name="light">{children}</Theme>
          </View>
        </PortalProvider>
      </TamaguiProvider>
    </RootProviderContext.Provider>
  );
};

Provider.displayName = "Provider";
export interface ProviderProps {
  children?: React.ReactNode;
}

export { config } from "../config";
export { PortalProvider } from "@tamagui/portal";
