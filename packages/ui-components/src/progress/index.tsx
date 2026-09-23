import React from "react";
import { Progress as TamaguiProgress, styled } from "tamagui";

export interface ProgressProps extends React.ComponentPropsWithoutRef<typeof TamaguiProgress> {
  className?: string;
  orientation?: "horizontal" | "vertical";
}

/**
 * Progress bar component visualizing task completion percentages. Built with
 * Tamagui Progress primitives.
 */
export const Progress = styled(TamaguiProgress, {
  name: "Progress",
  size: "$2",
  backgroundColor: "$backgroundHover",
  borderRadius: 9999,
  overflow: "hidden",
  height: 8,
  width: "100%",

  variants: {
    orientation: {
      horizontal: {
        width: "100%",
        height: 8,
      },
      vertical: {
        height: "100%",
        width: 8,
      },
    },
  } as const,

  defaultVariants: {
    orientation: "horizontal",
  },
});

export const ProgressFilledTrack = styled(TamaguiProgress.Indicator, {
  name: "ProgressFilledTrack",
  backgroundColor: "$primary",
  borderRadius: 9999,
  height: "100%",
});
