import React, { createContext, forwardRef, useContext } from "react";
import { TextInput, type TextInputProps } from "react-native";
import { styled, XStack } from "tamagui";

type InputSize = "sm" | "md" | "lg";

interface InputContextValue {
  size: InputSize;
  isDisabled?: boolean;
  isInvalid?: boolean;
}

const InputContext = createContext<InputContextValue>({
  size: "md",
  isDisabled: false,
  isInvalid: false,
});

const InputContainer = styled(XStack, {
  name: "Input",
  flexDirection: "row",
  alignItems: "center",
  borderWidth: 1,
  borderColor: "$borderColor",
  backgroundColor: "$background",
  borderRadius: 6,
  paddingHorizontal: 12,
  gap: 8,

  variants: {
    size: {
      sm: {
        height: 32,
      },
      md: {
        height: 40,
      },
      lg: {
        height: 48,
      },
    },
    isInvalid: {
      true: {
        borderColor: "$red10",
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

export interface InputProps extends React.ComponentPropsWithoutRef<typeof InputContainer> {
  className?: string;
  size?: InputSize;
  isDisabled?: boolean;
  isInvalid?: boolean;
}

/** Compound container wrapping text inputs with accessory slots and icons. */
export const Input = forwardRef<React.ElementRef<typeof InputContainer>, InputProps>(function Input(
  { size = "md", isDisabled = false, isInvalid = false, children, ...props },
  ref
) {
  return (
    <InputContext.Provider value={{ size, isDisabled, isInvalid }}>
      <InputContainer ref={ref} size={size} isDisabled={isDisabled} isInvalid={isInvalid} {...props}>
        {children}
      </InputContainer>
    </InputContext.Provider>
  );
});

export interface InputFieldProps extends TextInputProps {
  className?: string;
}

/**
 * Core text input field forwarding native keyboard events and placeholder
 * colors.
 */
export const InputField = forwardRef<TextInput, InputFieldProps>(function InputField(
  { placeholderTextColor = "#9ca3af", style, ...props },
  ref
) {
  const { size, isDisabled } = useContext(InputContext);
  const fontSize = size === "sm" ? 13 : size === "lg" ? 16 : 14;

  return (
    <TextInput
      ref={ref}
      editable={!isDisabled}
      placeholderTextColor={placeholderTextColor}
      style={[
        {
          flex: 1,
          height: "100%",
          padding: 0,
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

export interface InputSlotProps extends React.ComponentPropsWithoutRef<typeof XStack> {
  className?: string;
  onPress?: (e?: any) => void;
}

/**
 * Interactive or decorative accessory slot at the leading or trailing input
 * edge.
 */
export const InputSlot = forwardRef<React.ElementRef<typeof XStack>, InputSlotProps>(function InputSlot(
  { children, ...props },
  ref
) {
  return (
    <XStack ref={ref} alignItems="center" justifyContent="center" {...props}>
      {children}
    </XStack>
  );
});

export interface InputIconProps {
  as?: React.ElementType;
  size?: number | string;
  height?: number;
  width?: number;
  color?: string;
  className?: string;
  [key: string]: any;
}

/** Accessory icon component placed inside an Input container or slot. */
export const InputIcon = forwardRef<any, InputIconProps>(function InputIcon(
  { as: Component, size = 16, height, width, color = "#9ca3af", ...props },
  ref
) {
  const dim = height ?? width ?? (typeof size === "number" ? size : 16);
  if (Component) {
    return <Component ref={ref} size={dim} width={dim} height={dim} color={color} {...props} />;
  }
  return null;
});

Input.displayName = "Input";
InputField.displayName = "InputField";
InputSlot.displayName = "InputSlot";
InputIcon.displayName = "InputIcon";
