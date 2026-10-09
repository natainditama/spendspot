import { Button as TamaguiButton } from "@tamagui/button";
import { styled } from "@tamagui/core";
import type { GetProps } from "@tamagui/core";

export type ButtonVariant = "primary" | "destructive" | "outline" | "secondary" | "ghost";
export type ButtonSize = "default" | "xs" | "sm" | "lg" | "icon" | "icon-xs" | "icon-sm" | "icon-lg";

/**
 * Shadcn UI styled Button component built on top of Tamagui's native button frame.
 * Supports zinc design tokens, shadcn visual variants, and responsive touch press states.
 */
export const Button = styled(TamaguiButton, {
  name: "Button",
  color: "$foreground",
  backgroundColor: "$background",
  borderColor: "transparent",
  justifyContent: "center",
  alignSelf: "flex-start",
  flexDirection: "row",
  alignItems: "center",
  userSelect: "none",
  fontWeight: "500",
  flexShrink: 1,
  borderWidth: "$px",
  size: "$sm",

  variants: {
    variant: {
      primary: {
        backgroundColor: "$primary",
        color: "$primaryForeground",
        borderColor: "transparent",
        hoverStyle: {
          backgroundColor: "$primaryHover",
          borderColor: "transparent",
        },
        pressStyle: {
          backgroundColor: "$primaryPress",
          borderColor: "transparent",
          scale: 0.98,
        },
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
        hoverStyle: {
          backgroundColor: "$destructiveSubtleHover",
          borderColor: "transparent",
        },
        pressStyle: {
          backgroundColor: "$destructiveSubtlePress",
          borderColor: "transparent",
          scale: 0.98,
        },
        focusVisibleStyle: {
          outlineColor: "$destructiveRing",
          outlineWidth: "$0.5",
          outlineStyle: "solid",
        },
      },
      outline: {
        backgroundColor: "$background",
        borderColor: "$border",
        color: "$foreground",
        hoverStyle: {
          backgroundColor: "$muted",
          borderColor: "$border",
        },
        pressStyle: {
          backgroundColor: "$backgroundPress",
          borderColor: "$border",
          scale: 0.98,
        },
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
        hoverStyle: {
          backgroundColor: "$secondaryHover",
          borderColor: "transparent",
        },
        pressStyle: {
          backgroundColor: "$secondaryPress",
          borderColor: "transparent",
          scale: 0.98,
        },
        focusVisibleStyle: {
          outlineColor: "$ring",
          outlineWidth: "$0.5",
          outlineStyle: "solid",
        },
      },
      ghost: {
        backgroundColor: "transparent",
        borderColor: "transparent",
        color: "$foreground",
        hoverStyle: {
          backgroundColor: "$muted",
          borderColor: "transparent",
        },
        pressStyle: {
          backgroundColor: "$backgroundPress",
          borderColor: "transparent",
          scale: 0.98,
        },
        focusVisibleStyle: {
          outlineColor: "$ring",
          outlineWidth: "$0.5",
          outlineStyle: "solid",
        },
      },
    },

    buttonSize: {
      default: {
        height: "$9",
        paddingHorizontal: "$4",
        borderRadius: "$md",
        gap: "$1.5",
      },
      xs: {
        height: "$6.5",
        paddingHorizontal: "$2",
        borderRadius: "$sm",
        gap: "$1",
      },
      sm: {
        height: "$8",
        paddingHorizontal: "$3",
        borderRadius: "$sm",
        gap: "$1",
      },
      lg: {
        height: "$11",
        paddingHorizontal: "$5",
        borderRadius: "$md",
        gap: "$2",
      },
      icon: {
        width: "$9",
        height: "$9",
        paddingHorizontal: "$0",
        paddingVertical: "$0",
        borderRadius: "$md",
      },
      "icon-xs": {
        width: "$6.5",
        height: "$6.5",
        paddingHorizontal: "$0",
        paddingVertical: "$0",
        borderRadius: "$sm",
      },
      "icon-sm": {
        width: "$8",
        height: "$8",
        paddingHorizontal: "$0",
        paddingVertical: "$0",
        borderRadius: "$sm",
      },
      "icon-lg": {
        width: "$11",
        height: "$11",
        paddingHorizontal: "$0",
        paddingVertical: "$0",
        borderRadius: "$md",
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
    variant: "primary",
    buttonSize: "default",
  },
});

Button.displayName = "Button";
export type ButtonProps = Omit<GetProps<typeof Button>, "variant"> & {
  variant?: ButtonVariant;
  buttonSize?: ButtonSize;
};
