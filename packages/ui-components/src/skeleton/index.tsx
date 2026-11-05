import { styled } from "@tamagui/core";
import type { GetProps } from "@tamagui/core";
import { YStack } from "@tamagui/stacks";

/**
 * Shadcn UI styled Skeleton component built with Tamagui primitives.
 * Replicates shadcn UI's `animate-pulse rounded-md bg-muted` using Tamagui design tokens.
 * Supports zinc tokens, standard rectangular shapes, and a `circle` variant.
 */
export const Skeleton = styled(YStack, {
  name: "Skeleton",
  backgroundColor: "$muted",
  borderRadius: "$md",
  opacity: 0.75,
  userSelect: "none",

  variants: {
    circle: {
      true: {
        borderRadius: "$full",
      },
    },
  } as const,
});

Skeleton.displayName = "Skeleton";
export type SkeletonProps = GetProps<typeof Skeleton>;
