import React from "react";
import { gridStyle, gridItemStyle } from "./styles";

import type { VariantProps } from "@gluestack-ui/utils/nativewind-utils";

type IGridProps = React.ComponentPropsWithoutRef<"div"> &
  VariantProps<typeof gridStyle> & {
    gap?: number;
    rowGap?: number;
    columnGap?: number;
    flexDirection?: "row" | "column" | "row-reverse" | "column-reverse";
    padding?: number;
    paddingLeft?: number;
    paddingRight?: number;
    paddingStart?: number;
    paddingEnd?: number;
    _extra: {
      className: string;
    };
  };

/**
 * Responsive CSS grid container component for web layouts. Renders a CSS grid
 * element with customizable gap spacing and column divisions.
 */
const Grid = React.forwardRef<HTMLDivElement, IGridProps>(function Grid({ className, _extra, ...props }, ref) {
  const gridClass = _extra?.className;
  const finalGridClass = gridClass ?? "";
  return (
    <div
      ref={ref}
      className={gridStyle({
        class: className + " " + finalGridClass,
      })}
      {...props}
    />
  );
});

type IGridItemProps = React.ComponentPropsWithoutRef<"div"> &
  VariantProps<typeof gridItemStyle> & {
    index?: number;
    _extra: {
      className: string;
    };
  };

/**
 * Child column item component positioned inside a web Grid layout. Supports
 * arbitrary column spans and responsive alignment properties.
 */
const GridItem = React.forwardRef<HTMLDivElement, IGridItemProps>(function GridItem(
  { className, _extra, ...props },
  ref
) {
  const gridItemClass = _extra?.className;

  const finalGridItemClass = gridItemClass ?? "";
  return (
    <div
      ref={ref}
      className={gridItemStyle({
        class: className + " " + finalGridItemClass,
      })}
      {...props}
    />
  );
});

Grid.displayName = "Grid";
GridItem.displayName = "GridItem";

export { Grid, GridItem };
