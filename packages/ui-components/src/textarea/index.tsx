import { styled } from "@tamagui/core";
import type { GetProps } from "@tamagui/core";
import { TextArea as TamaguiTextArea } from "@tamagui/input";

/**
 * Shadcn UI styled Textarea component built on top of Tamagui's TextArea.
 * Supports zinc design tokens, multiline content, and validation states.
 */
export const Textarea = styled(TamaguiTextArea, {
  name: "Textarea",
  backgroundColor: "transparent",
  color: "$foreground",
  borderWidth: "$px",
  borderColor: "$input",
  borderRadius: "$md",
  minHeight: "$18",
  width: "100%",
  paddingHorizontal: "$2.5",
  paddingVertical: "$2",
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

Textarea.displayName = "Textarea";
export type TextareaProps = GetProps<typeof Textarea>;
