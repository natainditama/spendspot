import type { CreateTamaguiProps } from "@tamagui/core";

/**
 * SpendSpot global Tamagui runtime settings for cross-platform style compatibility.
 * Configures default font, scheme behavior, and style strictness for web and native.
 */
export const settings = {
  defaultFont: "body",
  fastSchemeChange: true,
  shouldAddPrefersColorThemes: false,
  allowedStyleValues: "somewhat-strict-web",
  addThemeClassName: "html",
  onlyAllowShorthands: false,
  styleCompat: "web",
} satisfies CreateTamaguiProps["settings"];
