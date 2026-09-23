import React, { forwardRef } from "react";
import { styled, YStack } from "tamagui";

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

const StyledVStack = styled(YStack, {
  name: "VStack",
  flexDirection: "column",
});

export interface VStackProps extends Omit<React.ComponentPropsWithoutRef<typeof StyledVStack>, "space"> {
  space?: string | number;
  reversed?: boolean;
}

export const VStack = forwardRef<React.ElementRef<typeof StyledVStack>, VStackProps>(function VStack(
  { space, gap, reversed, ...props },
  ref
) {
  const resolvedGap = gap ?? (typeof space === "string" ? (SPACE_MAP[space] ?? space) : space);
  return (
    <StyledVStack
      ref={ref}
      flexDirection={reversed ? "column-reverse" : "column"}
      gap={resolvedGap as any}
      {...props}
    />
  );
});

export default VStack;
