import React, { createContext, forwardRef, useContext } from "react";
import { TextInput, type TextInputProps } from "react-native";
import { styled, YStack } from "tamagui";

type TextareaSize = "sm" | "md" | "lg" | "xl";

interface TextareaContextValue {
  size: TextareaSize;
  isDisabled?: boolean;
}

const TextareaContext = createContext<TextareaContextValue>({
  size: "md",
  isDisabled: false,
});

const TextareaFrame = styled(YStack, {
  name: "Textarea",
  borderWidth: 1,
  borderColor: "$borderColor",
  backgroundColor: "$background",
  borderRadius: 6,
  minHeight: 100,
  padding: 8,

  variants: {
    size: {
      sm: {
        minHeight: 80,
      },
      md: {
        minHeight: 100,
      },
      lg: {
        minHeight: 120,
      },
      xl: {
        minHeight: 150,
      },
    },
    isDisabled: {
      true: {
        opacity: 0.5,
        pointerEvents: "none",
      },
    },
  } as const,

  defaultVariants: {
    size: "md",
  },
});

export interface TextareaProps extends React.ComponentPropsWithoutRef<typeof TextareaFrame> {
  className?: string;
  size?: TextareaSize;
  variant?: "default";
  isDisabled?: boolean;
}

/**
 * Multi-line text entry container providing border boundaries and focus
 * styling.
 */
export const Textarea = forwardRef<React.ElementRef<typeof TextareaFrame>, TextareaProps>(function Textarea(
  { size = "md", isDisabled = false, children, ...props },
  ref
) {
  return (
    <TextareaContext.Provider value={{ size, isDisabled }}>
      <TextareaFrame ref={ref} size={size} isDisabled={isDisabled} {...props}>
        {children}
      </TextareaFrame>
    </TextareaContext.Provider>
  );
});

export interface TextareaInputProps extends TextInputProps {
  className?: string;
}

/** Multi-line text field component handling multi-line typing and scrolling. */
export const TextareaInput = forwardRef<TextInput, TextareaInputProps>(function TextareaInput(
  { placeholderTextColor = "#9ca3af", style, ...props },
  ref
) {
  const { size, isDisabled } = useContext(TextareaContext);
  const fontSize = size === "sm" ? 13 : size === "lg" ? 16 : 14;

  return (
    <TextInput
      ref={ref}
      multiline
      textAlignVertical="top"
      editable={!isDisabled}
      placeholderTextColor={placeholderTextColor}
      style={[
        {
          flex: 1,
          width: "100%",
          height: "100%",
          padding: 4,
          margin: 0,
          color: "currentColor",
          fontSize,
          outlineWidth: 0,
        } as any,
        style,
      ]}
      {...props}
    />
  );
});

Textarea.displayName = "Textarea";
TextareaInput.displayName = "TextareaInput";
