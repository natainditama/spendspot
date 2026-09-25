import { themes as v5Themes } from "@tamagui/config/v5";

/**
 * Primary light theme incorporating shadcn UI and Tailwind hex tokens.
 * Establishes surface, action, utility, feedback, and zinc scale colors.
 */
export const lightTheme = {
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

  // 12-step palette tokens (Zinc scale)
  color1: "#ffffff",
  color2: "#fafafa",
  color3: "#f4f4f5",
  color4: "#e4e4e7",
  color5: "#d4d4d8",
  color6: "#a1a1aa",
  color7: "#71717a",
  color8: "#52525b",
  color9: "#3f3f46",
  color10: "#27272a",
  color11: "#18181b",
  color12: "#09090b",

  // Translucent background and color offsets
  background0: "rgba(255, 255, 255, 0)",
  background02: "rgba(255, 255, 255, 0.2)",
  background04: "rgba(255, 255, 255, 0.4)",
  background06: "rgba(255, 255, 255, 0.6)",
  background08: "rgba(255, 255, 255, 0.8)",
  color0: "rgba(9, 9, 11, 0)",
  color02: "rgba(9, 9, 11, 0.2)",
  color04: "rgba(9, 9, 11, 0.4)",
  color06: "rgba(9, 9, 11, 0.6)",
  color08: "rgba(9, 9, 11, 0.8)",
};

/**
 * Variant sub-themes providing semantic colors for component styling.
 * Configures hover, press, and focus states matching shadcn UI specifications.
 */
export const variantThemes = {
  // Direct theme names
  primary: {
    ...lightTheme,
    background: "#18181b",
    color: "#fafafa",
    borderColor: "#18181b",
    backgroundHover: "#27272a",
    backgroundPress: "#3f3f46",
    backgroundFocus: "#27272a",
    colorHover: "#fafafa",
    colorPress: "#fafafa",
    colorFocus: "#fafafa",
    borderColorHover: "#27272a",
    borderColorPress: "#3f3f46",
    borderColorFocus: "#a1a1aa",
  },
  secondary: {
    ...lightTheme,
    background: "#f4f4f5",
    color: "#18181b",
    borderColor: "#e4e4e7",
    backgroundHover: "#e4e4e7",
    backgroundPress: "#d4d4d8",
    backgroundFocus: "#e4e4e7",
    colorHover: "#18181b",
    colorPress: "#18181b",
    colorFocus: "#18181b",
    borderColorHover: "#d4d4d8",
    borderColorPress: "#a1a1aa",
    borderColorFocus: "#a1a1aa",
  },
  destructive: {
    ...lightTheme,
    background: "#e11d48",
    color: "#fafafa",
    borderColor: "#e11d48",
    backgroundHover: "#f43f5e",
    backgroundPress: "#fb7185",
    backgroundFocus: "#f43f5e",
    colorHover: "#fafafa",
    colorPress: "#fafafa",
    colorFocus: "#fafafa",
    borderColorHover: "#f43f5e",
    borderColorPress: "#fb7185",
    borderColorFocus: "#e11d48",
  },
  outline: {
    ...lightTheme,
    background: "transparent",
    color: "#09090b",
    borderColor: "#e4e4e7",
    backgroundHover: "#f4f4f5",
    backgroundPress: "#e4e4e7",
    backgroundFocus: "#f4f4f5",
    colorHover: "#09090b",
    colorPress: "#09090b",
    colorFocus: "#09090b",
    borderColorHover: "#d4d4d8",
    borderColorPress: "#a1a1aa",
    borderColorFocus: "#a1a1aa",
  },
  ghost: {
    ...lightTheme,
    background: "transparent",
    color: "#09090b",
    borderColor: "transparent",
    backgroundHover: "#f4f4f5",
    backgroundPress: "#e4e4e7",
    backgroundFocus: "#f4f4f5",
    colorHover: "#09090b",
    colorPress: "#09090b",
    colorFocus: "#09090b",
    borderColorHover: "transparent",
    borderColorPress: "transparent",
    borderColorFocus: "transparent",
  },
  muted: {
    ...lightTheme,
    background: "#f4f4f5",
    color: "#71717a",
    borderColor: "transparent",
    backgroundHover: "#e4e4e7",
    backgroundPress: "#d4d4d8",
    backgroundFocus: "#e4e4e7",
    colorHover: "#09090b",
    colorPress: "#09090b",
    colorFocus: "#09090b",
    borderColorHover: "transparent",
    borderColorPress: "transparent",
    borderColorFocus: "transparent",
  },
  accent: {
    ...lightTheme,
    background: "#f4f4f5",
    color: "#18181b",
    borderColor: "transparent",
    backgroundHover: "#e4e4e7",
    backgroundPress: "#d4d4d8",
    backgroundFocus: "#e4e4e7",
    colorHover: "#18181b",
    colorPress: "#18181b",
    colorFocus: "#18181b",
    borderColorHover: "transparent",
    borderColorPress: "transparent",
    borderColorFocus: "transparent",
  },
  card: {
    ...lightTheme,
    background: "#ffffff",
    color: "#09090b",
    borderColor: "#e4e4e7",
    backgroundHover: "#f4f4f5",
    backgroundPress: "#e4e4e7",
    backgroundFocus: "#f4f4f5",
    colorHover: "#09090b",
    colorPress: "#09090b",
    colorFocus: "#09090b",
    borderColorHover: "#d4d4d8",
    borderColorPress: "#a1a1aa",
    borderColorFocus: "#a1a1aa",
  },
  popover: {
    ...lightTheme,
    background: "#ffffff",
    color: "#09090b",
    borderColor: "#e4e4e7",
    backgroundHover: "#f4f4f5",
    backgroundPress: "#e4e4e7",
    backgroundFocus: "#f4f4f5",
    colorHover: "#09090b",
    colorPress: "#09090b",
    colorFocus: "#09090b",
    borderColorHover: "#d4d4d8",
    borderColorPress: "#a1a1aa",
    borderColorFocus: "#a1a1aa",
  },

  // Component-specific Button mappings for full robustness
  Button: lightTheme,
  primary_Button: {
    ...lightTheme,
    background: "#18181b",
    color: "#fafafa",
    borderColor: "#18181b",
    backgroundHover: "#27272a",
    backgroundPress: "#3f3f46",
    backgroundFocus: "#27272a",
    colorHover: "#fafafa",
    colorPress: "#fafafa",
    colorFocus: "#fafafa",
    borderColorHover: "#27272a",
    borderColorPress: "#3f3f46",
    borderColorFocus: "#a1a1aa",
  },
  destructive_Button: {
    ...lightTheme,
    background: "#e11d48",
    color: "#fafafa",
    borderColor: "#e11d48",
    backgroundHover: "#f43f5e",
    backgroundPress: "#fb7185",
    backgroundFocus: "#f43f5e",
    colorHover: "#fafafa",
    colorPress: "#fafafa",
    colorFocus: "#fafafa",
    borderColorHover: "#f43f5e",
    borderColorPress: "#fb7185",
    borderColorFocus: "#e11d48",
  },
  secondary_Button: {
    ...lightTheme,
    background: "#f4f4f5",
    color: "#18181b",
    borderColor: "#e4e4e7",
    backgroundHover: "#e4e4e7",
    backgroundPress: "#d4d4d8",
    backgroundFocus: "#e4e4e7",
    colorHover: "#18181b",
    colorPress: "#18181b",
    colorFocus: "#18181b",
    borderColorHover: "#d4d4d8",
    borderColorPress: "#a1a1aa",
    borderColorFocus: "#a1a1aa",
  },
};

const lightOnlyThemes = Object.fromEntries(Object.entries(v5Themes).filter(([key]) => !key.startsWith("dark")));

/**
 * Light-prefixed mirror of every variantTheme so Tamagui resolves light_primary_Button,
 * light_secondary_Button, etc. when the parent theme context is "light".
 */
const lightPrefixedVariants = Object.fromEntries(
  Object.entries(variantThemes).map(([key, value]) => [`light_${key}`, value])
);

/**
 * SpendSpot light-only theme registry merging v5 light themes and shadcn UI variants.
 * Provides base, variant, and component-specific themes for consistent cross-platform styling.
 */
export const themes = {
  ...lightOnlyThemes,
  light: lightTheme,
  ...variantThemes,
  ...lightPrefixedVariants,
};
