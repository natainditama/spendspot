import { shorthands } from "@tamagui/config/v5";
import { animations } from "@tamagui/config/v5-reanimated";
import { createTamagui } from "@tamagui/core";

import { fonts } from "./fonts";
import { media } from "./media";
import { settings } from "./settings";
import { themes } from "./themes";
import { tokens } from "./tokens";

/**
 * SpendSpot Tamagui configuration initialized with customized themes.
 * Coordinates cross-platform design tokens and responsive breakpoints.
 */
export const tamaguiConfig = createTamagui({
  animations,
  defaultFont: "body",
  fonts,
  media,
  settings,
  shorthands,
  themes,
  tokens,
});

/**
 * Primary SpendSpot configuration alias for application-wide theme consumption.
 * Passed directly into root providers to configure styles across platforms.
 */
export const config = tamaguiConfig;
export type TamaguiConfig = typeof tamaguiConfig;

declare module "@tamagui/core" {
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  interface TamaguiCustomConfig extends TamaguiConfig {}
}

export { tokens, space, size, radius, zIndex, color } from "./tokens";
export { fonts, bodyFont, headingFont } from "./fonts";
export { media, breakpoints } from "./media";
export { settings } from "./settings";
export { themes, lightTheme, variantThemes } from "./themes";
