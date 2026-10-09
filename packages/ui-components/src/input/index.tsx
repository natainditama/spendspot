import { styled } from "@tamagui/core";
import type { GetProps } from "@tamagui/core";
import { Input as TamaguiInput } from "@tamagui/input";

/**
 * Shadcn UI styled Input component built on top of Tamagui's native Input.
 * Supports zinc design tokens, responsive focus rings, and validation states.
 */
export const Input = styled(TamaguiInput, {
  name: "Input",
  backgroundColor: "transparent",
  color: "$foreground",
  borderWidth: "$px",
  borderColor: "$input",
  borderRadius: "$md",
  height: "$9",
  minWidth: "$0",
  width: "100%",
  paddingHorizontal: "$2.5",
  paddingVertical: "$1",
  fontSize: "$sm",
  lineHeight: "$sm",
  placeholderTextColor: "$mutedForeground",

  hoverStyle: {
    borderColor: "$ring",
  },

  focusStyle: {
    borderColor: "$ring",
    outlineColor: "$ring",
    outlineWidth: "$0.5",
    outlineStyle: "solid",
  },

  focusVisibleStyle: {
    borderColor: "$ring",
    outlineColor: "$ring",
    outlineWidth: "$0.5",
    outlineStyle: "solid",
  },

  variants: {
    invalid: {
      true: {
        borderColor: "$destructive",
        focusStyle: {
          borderColor: "$destructive",
          outlineColor: "$destructiveRing",
          outlineWidth: "$0.5",
          outlineStyle: "solid",
        },
        focusVisibleStyle: {
          borderColor: "$destructive",
          outlineColor: "$destructiveRing",
          outlineWidth: "$0.5",
          outlineStyle: "solid",
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
});

Input.displayName = "Input";
export type InputProps = GetProps<typeof Input>;
