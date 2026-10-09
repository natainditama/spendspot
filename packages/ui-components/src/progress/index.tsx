import { styled } from "@tamagui/core";
import type { GetProps } from "@tamagui/core";
import { Progress as TamaguiProgress } from "@tamagui/progress";
import React from "react";

export type ProgressSize = "default" | "sm" | "lg";

/**
 * Progress bar root track — full width rounded pill with muted background.
 * Overflow hidden ensures indicator stays clipped within the track bounds.
 */
const ProgressFrame = styled(TamaguiProgress, {
  name: "Progress",
  width: "100%",
  height: "$1",
  position: "relative",
  backgroundColor: "$muted",
  borderRadius: "$full",
  overflow: "hidden",

  variants: {
    size: {
      default: {
        height: "$1",
      },
      sm: {
        height: "$0.5",
      },
      lg: {
        height: "$1.5",
      },
    },
  } as const,

  defaultVariants: {
    size: "default",
  },
});
ProgressFrame.displayName = "Progress";

/**
 * Animated progress indicator that fills from left based on the current value.
 * Width is set as a percentage matching the progress value (0%–100%).
 */
const ProgressIndicatorFrame = styled(TamaguiProgress.Indicator, {
  name: "ProgressIndicator",
  backgroundColor: "$primary",
});
ProgressIndicatorFrame.displayName = "ProgressIndicator";

/**
 * Progress bar component styled after shadcn UI specification.
 * Accepts a numeric value (0–100) and renders a filled primary-color indicator.
 */
export const Progress = ({ value = 0, max = 100, size = "default", ...props }: ProgressProps) => {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

  return (
    <ProgressFrame size={size} value={percentage} max={max} {...props}>
      <ProgressIndicatorFrame />
    </ProgressFrame>
  );
};

Progress.displayName = "Progress";
export type ProgressProps = GetProps<typeof ProgressFrame> & {
  value?: number;
  max?: number;
  size?: ProgressSize;
};
