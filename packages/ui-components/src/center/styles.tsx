import { isWeb, tva } from "@gluestack-ui/utils/nativewind-utils";

const baseStyle = isWeb ? "flex flex-col relative z-0" : "";

/**
 * Variant style configuration for Centered layout primitives. Applies
 * bidirectional flex centering along both main and cross axes.
 */
export const centerStyle = tva({
  base: `justify-center items-center ${baseStyle}`,
});
