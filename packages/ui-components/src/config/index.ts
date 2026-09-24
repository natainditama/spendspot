import { defaultConfig } from "@tamagui/config/v5";
import { createTamagui } from "tamagui";

// Light theme: shadcn ui hex tokens aligned with DESIGN.md
const lightTheme = {
  ...defaultConfig.themes.light,

  // Surface
  background: "#ffffff",
  foreground: "#09090b",
  card: "#ffffff",
  cardForeground: "#09090b",
  popover: "#ffffff",
  popoverForeground: "#09090b",

  // Action
  primary: "#18181b",
  primaryForeground: "#fafafa",
  secondary: "#f4f4f5",
  secondaryForeground: "#18181b",

  // Utility
  muted: "#f4f4f5",
  mutedForeground: "#71717a",
  accent: "#f4f4f5",
  accentForeground: "#18181b",

  // Feedback
  destructive: "#e11d48",
  destructiveForeground: "#fafafa",

  // Borders & inputs
  border: "#e4e4e7",
  input: "#e4e4e7",
  ring: "#a1a1aa",

  // Charts
  chart1: "#d4d4d8",
  chart2: "#71717a",
  chart3: "#52525b",
  chart4: "#3f3f46",
  chart5: "#27272a",

  // Sidebar
  sidebar: "#fafafa",
  sidebarForeground: "#09090b",
  sidebarPrimary: "#18181b",
  sidebarPrimaryForeground: "#fafafa",
  sidebarAccent: "#f4f4f5",
  sidebarAccentForeground: "#18181b",
  sidebarBorder: "#e4e4e7",
  sidebarRing: "#a1a1aa",

  // Tamagui standard semantic tokens (Hex)
  color: "#09090b",
  colorHover: "#09090b",
  colorPress: "#09090b",
  colorFocus: "#09090b",
  borderColor: "#e4e4e7",
  borderColorHover: "#d4d4d8",
  borderColorPress: "#a1a1aa",
  borderColorFocus: "#a1a1aa",
  backgroundHover: "#f4f4f5",
  backgroundPress: "#e4e4e7",
  backgroundFocus: "#f4f4f5",
  placeholderColor: "#71717a",
};

// Dark theme: shadcn ui hex tokens aligned with DESIGN.md
const darkTheme = {
  ...defaultConfig.themes.dark,

  // Surface
  background: "#09090b",
  foreground: "#fafafa",
  card: "#18181b",
  cardForeground: "#fafafa",
  popover: "#18181b",
  popoverForeground: "#fafafa",

  // Action
  primary: "#fafafa",
  primaryForeground: "#18181b",
  secondary: "#27272a",
  secondaryForeground: "#fafafa",

  // Utility
  muted: "#27272a",
  mutedForeground: "#a1a1aa",
  accent: "#27272a",
  accentForeground: "#fafafa",

  // Feedback
  destructive: "#f43f5e",
  destructiveForeground: "#fafafa",

  // Borders & inputs
  border: "#27272a",
  input: "#27272a",
  ring: "#71717a",

  // Charts
  chart1: "#d4d4d8",
  chart2: "#71717a",
  chart3: "#52525b",
  chart4: "#3f3f46",
  chart5: "#27272a",

  // Sidebar
  sidebar: "#18181b",
  sidebarForeground: "#fafafa",
  sidebarPrimary: "#3b82f6",
  sidebarPrimaryForeground: "#fafafa",
  sidebarAccent: "#27272a",
  sidebarAccentForeground: "#fafafa",
  sidebarBorder: "#27272a",
  sidebarRing: "#71717a",

  // Tamagui standard semantic tokens (Hex)
  color: "#fafafa",
  colorHover: "#fafafa",
  colorPress: "#fafafa",
  colorFocus: "#fafafa",
  borderColor: "#27272a",
  borderColorHover: "#3f3f46",
  borderColorPress: "#52525b",
  borderColorFocus: "#71717a",
  backgroundHover: "#27272a",
  backgroundPress: "#3f3f46",
  backgroundFocus: "#27272a",
  placeholderColor: "#a1a1aa",
};

/**
 * SpendSpot Tamagui configuration initialized with customized themes.
 * Coordinates cross-platform design tokens and responsive breakpoints.
 */
export const tamaguiConfig = createTamagui({
  ...defaultConfig,
  themes: {
    ...defaultConfig.themes,
    light: lightTheme,
    dark: darkTheme,
  },
  settings: {
    ...defaultConfig.settings,
    onlyAllowShorthands: false,
  },
});

export const config = tamaguiConfig;
export type TamaguiConfig = typeof tamaguiConfig;

declare module "tamagui" {
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  interface TamaguiCustomConfig extends TamaguiConfig {}
}

declare module "@tamagui/core" {
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  interface TamaguiCustomConfig extends TamaguiConfig {}
}
