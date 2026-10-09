import { styled } from "@tamagui/core";
import type { GetProps } from "@tamagui/core";
import { Separator as TamaguiSeparator } from "@tamagui/separator";

/**
 * Thin horizontal or vertical rule that visually divides content sections.
 * Styled with shadcn border color and shrink-0 to prevent flex compression.
 */
export const Separator = styled(TamaguiSeparator, {
  name: "Separator",
  backgroundColor: "$border",
  flexShrink: 0,

  variants: {
    orientation: {
      horizontal: {
        height: "$px",
        width: "100%",
        flexDirection: "row",
      },
      vertical: {
        width: "$px",
        alignSelf: "stretch",
        flexDirection: "column",
      },
    },
  } as const,

  defaultVariants: {
    orientation: "horizontal",
  },
});

Separator.displayName = "Separator";
export type SeparatorProps = GetProps<typeof Separator>;
