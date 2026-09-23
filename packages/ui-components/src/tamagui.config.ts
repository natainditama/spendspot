import { defaultConfig } from "@tamagui/config/v5";
import { createTamagui } from "tamagui";

/**
 * SpendSpot Tamagui design system configuration. Extends defaultConfig v5 with
 * cross-platform tokens, theme keys, and responsive breakpoints. Incorporates
 * iOS and shadcn UI tokens with Tailwind CSS color values.
 */
const customThemes = {
  ...defaultConfig.themes,
  light: {
    ...defaultConfig.themes.light,
    primary: "#2563eb",
    primaryForeground: "#ffffff",
    secondary: "#f1f5f9",
    secondaryForeground: "#0f172a",
    card: "#ffffff",
    cardForeground: "#0f172a",
    muted: "#f8fafc",
    mutedForeground: "#64748b",
    destructive: "#ef4444",
    destructiveForeground: "#ffffff",
    border: "#e2e8f0",
  },
  dark: {
    ...defaultConfig.themes.dark,
    primary: "#3b82f6",
    primaryForeground: "#ffffff",
    secondary: "#1e293b",
    secondaryForeground: "#f8fafc",
    card: "#18181b",
    cardForeground: "#f8fafc",
    muted: "#0f172a",
    mutedForeground: "#94a3b8",
    destructive: "#ef4444",
    destructiveForeground: "#ffffff",
    border: "#27272a",
  },
};

export const config = createTamagui({
  ...defaultConfig,
  themes: customThemes,
  settings: {
    ...defaultConfig.settings,
    onlyAllowShorthands: false,
  },
});

export type Conf = typeof config;

declare module "tamagui" {
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  interface TamaguiCustomConfig extends Conf {}
}

declare module "@tamagui/core" {
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  interface TamaguiCustomConfig extends Conf {}
}

export default config;
