import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Appearance, View, ViewProps, StyleSheet } from "react-native";
import { OverlayProvider } from "@gluestack-ui/core/overlay/creator";
import { ToastProvider } from "@gluestack-ui/core/toast/creator";
import { config } from "./config";

export type ModeType = "light" | "dark" | "system";

export function Provider({
  mode = "system",
  ...props
}: {
  mode?: ModeType;
  children?: React.ReactNode;
  style?: ViewProps["style"];
}) {
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

  const colorScheme = useMemo<"light" | "dark">(() => (mode === "system" ? systemScheme : mode), [mode, systemScheme]);
  const cssVars = useMemo(() => config[colorScheme] as Record<string, string>, [colorScheme]);

  return (
    <View style={[styles.root, cssVars, props.style]}>
      <OverlayProvider>
        <ToastProvider>{props.children}</ToastProvider>
      </OverlayProvider>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    height: "100%",
    width: "100%",
  },
});
