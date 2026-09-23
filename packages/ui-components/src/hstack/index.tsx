import React, { forwardRef } from "react";
import { styled, XStack } from "tamagui";

const SPACE_MAP: Record<string, number> = {
  none: 0,
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  "2xl": 40,
  "3xl": 48,
  "4xl": 64,
};

const StyledHStack = styled(XStack, {
  name: "HStack",
  flexDirection: "row",
  alignItems: "center",
});

export interface HStackProps extends Omit<React.ComponentPropsWithoutRef<typeof StyledHStack>, "space"> {
  space?: string | number;
  reversed?: boolean;
}

export const HStack = forwardRef<React.ElementRef<typeof StyledHStack>, HStackProps>(function HStack(
  { space, gap, reversed, ...props },
  ref
) {
  const resolvedGap = gap ?? (typeof space === "string" ? (SPACE_MAP[space] ?? space) : space);
  return (
    <StyledHStack ref={ref} flexDirection={reversed ? "row-reverse" : "row"} gap={resolvedGap as any} {...props} />
  );
});

export default HStack;
