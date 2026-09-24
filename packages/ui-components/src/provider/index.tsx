import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { Appearance, StyleSheet, View, type ViewProps } from "react-native";
import { TamaguiProvider, Theme } from "tamagui";
import { config } from "../config";

const RootProviderContext = createContext<boolean>(false);
export type ModeType = "light" | "dark" | "system";

/**
 * Theme-aware TamaguiProvider for SpendSpot. Delegates nested instances to
 * avoid duplicate PortalProvider root hosts and hydration warnings.
 */
export function Provider({
  mode = "system",
  defaultTheme,
  children,
  style,
}: {
  mode?: ModeType;
  defaultTheme?: "light" | "dark";
  children?: React.ReactNode;
  style?: ViewProps["style"];
}) {
  const isAlreadyInRoot = useContext(RootProviderContext);
  const [systemScheme, setSystemScheme] = useState<"light" | "dark">(() =>
    Appearance.getColorScheme() === "dark" ? "dark" : "light"
  );

  const handleSystemChange = useCallback((preferences: Appearance.AppearancePreferences) => {
    setSystemScheme(preferences.colorScheme === "dark" ? "dark" : "light");
  }, []);

  useEffect(() => {
    if (mode !== "system") return;
    const subscription = Appearance.addChangeListener(handleSystemChange);
    return () => subscription.remove();
  }, [mode, handleSystemChange]);

  const activeTheme = useMemo<"light" | "dark">(
    () => defaultTheme ?? (mode === "system" ? systemScheme : mode),
    [defaultTheme, mode, systemScheme]
  );

  // If already nested within a root Provider, do not instantiate a second TamaguiProvider
  // to avoid duplicate PortalProvider root hosts and hydration mismatches. Instead, apply the Theme.
  if (isAlreadyInRoot) {
    return (
      <Theme name={activeTheme}>
        <View style={[styles.root, style]}>{children}</View>
      </Theme>
    );
  }

  return (
    <RootProviderContext.Provider value={true}>
      <TamaguiProvider config={config} defaultTheme={activeTheme}>
        <Theme name={activeTheme}>
          <View style={[styles.root, style]}>{children}</View>
        </Theme>
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

export { config, tamaguiConfig } from "../config";
