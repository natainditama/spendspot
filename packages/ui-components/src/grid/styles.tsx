import { isWeb, tva } from "@gluestack-ui/utils/nativewind-utils";

const gridBaseStyle = isWeb ? "grid grid-cols-12" : "box-border flex-row flex-wrap justify-start";
const gridItemBaseStyle = isWeb ? "w-auto col-span-1" : "";

/**
 * Multi-column layout container style generator adapting between CSS grid and
 * flex wrap. Provides a responsive 12-column foundation for web and mobile
 * platforms.
 */
export const gridStyle = tva({
  base: `w-full ${gridBaseStyle}`,
});

/**
 * Grid column cell style generator supporting dynamic fractional column spans.
 * Normalizes item widths between web CSS grid items and native flex rows.
 */
export const gridItemStyle = tva({
  base: `w-full ${gridItemBaseStyle}`,
});
