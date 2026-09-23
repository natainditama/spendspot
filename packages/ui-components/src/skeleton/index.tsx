import React, { forwardRef } from "react";
import { styled, View, YStack } from "tamagui";

export interface SkeletonProps extends React.ComponentPropsWithoutRef<typeof View> {
  className?: string;
  isLoaded?: boolean;
  startColor?: string;
  speed?: number | string;
  variant?: "circular" | "rounded" | "sharp";
  children?: React.ReactNode;
}

export interface SkeletonTextProps extends React.ComponentPropsWithoutRef<typeof YStack> {
  className?: string;
  _lines?: number;
  gap?: number;
  isLoaded?: boolean;
  startColor?: string;
  children?: React.ReactNode;
}

const SkeletonFrame = styled(View, {
  name: "SkeletonFrame",
  backgroundColor: "$backgroundHover",
  opacity: 0.7,

  variants: {
    variant: {
      circular: {
        borderRadius: 9999,
      },
      rounded: {
        borderRadius: 6,
      },
      sharp: {
        borderRadius: 0,
      },
    },
  } as const,

  defaultVariants: {
    variant: "rounded",
  },
});

/**
 * Skeleton placeholder component presenting an animated shimmer block while
 * content loads.
 */
export const Skeleton = forwardRef<React.ElementRef<typeof SkeletonFrame>, SkeletonProps>(function Skeleton(
  { isLoaded = false, children, variant = "rounded", ...props },
  ref
) {
  if (isLoaded) {
    return <>{children}</>;
  }

  return <SkeletonFrame ref={ref} variant={variant} {...props} />;
});

/** Multiple line skeleton placeholder representing loading paragraphs of text. */
export const SkeletonText = forwardRef<React.ElementRef<typeof YStack>, SkeletonTextProps>(function SkeletonText(
  { isLoaded = false, children, _lines = 3, gap = 8, ...props },
  ref
) {
  if (isLoaded) {
    return <>{children}</>;
  }

  return (
    <YStack gap={gap} ref={ref} {...props}>
      {Array.from({ length: _lines }).map((_, index) => (
        <SkeletonFrame key={index} variant="rounded" height={14} width={index === _lines - 1 ? "70%" : "100%"} />
      ))}
    </YStack>
  );
});

Skeleton.displayName = "Skeleton";
SkeletonText.displayName = "SkeletonText";
