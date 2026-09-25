/**
 * Responsive viewport width breakpoints aligned with Tailwind CSS conventions.
 * Defines minimum pixel thresholds from 2xs (360px) to 2xl (1536px).
 */
export const breakpoints = {
  "2xs": 360,
  xs: 480,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1536,
} as const;

/**
 * SpendSpot responsive media queries aligned with Tailwind CSS breakpoints.
 * Provides min-width and max-width variants plus pointer and hover conditions.
 */
export const media = {
  "2xs": { minWidth: breakpoints["2xs"] },
  xs: { minWidth: breakpoints.xs },
  sm: { minWidth: breakpoints.sm },
  md: { minWidth: breakpoints.md },
  lg: { minWidth: breakpoints.lg },
  xl: { minWidth: breakpoints.xl },
  "2xl": { minWidth: breakpoints["2xl"] },
  "max-2xl": { maxWidth: breakpoints["2xl"] - 1 },
  "max-xl": { maxWidth: breakpoints.xl - 1 },
  "max-lg": { maxWidth: breakpoints.lg - 1 },
  "max-md": { maxWidth: breakpoints.md - 1 },
  "max-sm": { maxWidth: breakpoints.sm - 1 },
  "max-xs": { maxWidth: breakpoints.xs - 1 },
  touchable: { pointer: "coarse" },
  hoverable: { hover: "hover" },
} as const;
