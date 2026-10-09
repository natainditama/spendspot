import { styled } from "@tamagui/core";
import type { GetProps } from "@tamagui/core";
import { Span } from "@tamagui/text";

export type BadgeVariant = "default" | "secondary" | "destructive" | "outline" | "ghost" | "link";

/**
 * Shadcn UI styled Badge component built on top of Tamagui's Span text primitive.
 * Supports zinc design tokens, shadcn visual variants, and responsive touch press states.
 */
export const Badge = styled(Span, {
  name: "Badge",
  borderColor: "transparent",
  justifyContent: "center",
  paddingHorizontal: "$2",
  alignSelf: "flex-start",
  paddingVertical: "$1",
  borderRadius: "$full",
  flexDirection: "row",
  alignItems: "center",
  borderWidth: "$px",
  userSelect: "none",
  overflow: "hidden",
  fontWeight: "500",
  fontSize: "$xs",
  lineHeight: "$xs",
  flexShrink: 0,
  gap: "$1",

  variants: {
    variant: {
      default: {
        color: "$primaryForeground",
        backgroundColor: "$primary",
        borderColor: "transparent",
        focusVisibleStyle: {
          outlineColor: "$ring",
          outlineWidth: "$0.5",
          outlineStyle: "solid",
        },
      },
      secondary: {
        color: "$secondaryForeground",
        backgroundColor: "$secondary",
        borderColor: "transparent",
        focusVisibleStyle: {
          outlineColor: "$ring",
          outlineWidth: "$0.5",
          outlineStyle: "solid",
        },
      },
      destructive: {
        color: "$destructive",
        borderColor: "transparent",
        backgroundColor: "$destructiveSubtle",
        focusVisibleStyle: {
          outlineColor: "$destructiveRing",
          outlineWidth: "$0.5",
          outlineStyle: "solid",
        },
      },
      outline: {
        color: "$foreground",
        borderColor: "$border",
        backgroundColor: "transparent",
        focusVisibleStyle: {
          outlineColor: "$ring",
          outlineWidth: "$0.5",
          outlineStyle: "solid",
        },
      },
      ghost: {
        color: "$foreground",
        borderColor: "transparent",
        backgroundColor: "transparent",
        hoverStyle: {
          backgroundColor: "$muted",
          color: "$mutedForeground",
          borderColor: "transparent",
        },
        pressStyle: {
          borderColor: "transparent",
          backgroundColor: "$backgroundPress",
        },
        focusVisibleStyle: {
          outlineColor: "$ring",
          outlineWidth: "$0.5",
          outlineStyle: "solid",
        },
      },
      link: {
        color: "$primary",
        borderColor: "transparent",
        backgroundColor: "transparent",
        textDecorationLine: "underline",
        hoverStyle: {
          opacity: 0.8,
          backgroundColor: "transparent",
        },
        pressStyle: {
          opacity: 0.6,
          backgroundColor: "transparent",
        },
      },
    },

    disabled: {
      true: {
        opacity: 0.5,
        pointerEvents: "none",
      },
    },
  } as const,

  defaultVariants: {
    variant: "default",
  },
});

Badge.displayName = "Badge";
export type BadgeProps = Omit<GetProps<typeof Badge>, "variant"> & {
  variant?: BadgeVariant;
};
