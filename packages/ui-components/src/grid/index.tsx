import React, { forwardRef } from "react";
import { styled, View, XStack } from "tamagui";

const StyledGrid = styled(XStack, {
  name: "Grid",
  flexWrap: "wrap",
});

export interface GridProps extends React.ComponentPropsWithoutRef<typeof StyledGrid> {
  _extra?: any;
  className?: string;
}

export const Grid = forwardRef<React.ElementRef<typeof StyledGrid>, GridProps>(function Grid(
  { _extra, ...props },
  ref
) {
  return <StyledGrid ref={ref} {...props} />;
});

const StyledGridItem = styled(View, {
  name: "GridItem",
});

export interface GridItemProps extends React.ComponentPropsWithoutRef<typeof StyledGridItem> {
  _extra?: any;
  colSpan?: number;
  className?: string;
}

export const GridItem = forwardRef<React.ElementRef<typeof StyledGridItem>, GridItemProps>(function GridItem(
  { _extra, colSpan, style, ...props },
  ref
) {
  const span = colSpan ?? _extra?.colSpan;
  const width = span ? `${(span / 12) * 100}%` : undefined;

  return <StyledGridItem ref={ref} style={width ? [{ width: width as any }, style] : style} {...props} />;
});

export default Grid;
