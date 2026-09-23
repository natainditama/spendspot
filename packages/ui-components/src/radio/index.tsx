import React, { createContext, forwardRef, useContext } from "react";
import { Paragraph, View, XStack, YStack } from "tamagui";

interface RadioGroupContextValue {
  value?: string;
  onChange?: (value: string) => void;
  isDisabled?: boolean;
}

const RadioGroupContext = createContext<RadioGroupContextValue | null>(null);

interface RadioContextValue {
  isSelected: boolean;
  isDisabled: boolean;
  size: "sm" | "md" | "lg";
  select: () => void;
}

const RadioContext = createContext<RadioContextValue>({
  isSelected: false,
  isDisabled: false,
  size: "md",
  select: () => {},
});

export interface RadioGroupProps {
  value?: string;
  onChange?: (value: string) => void;
  isDisabled?: boolean;
  children?: React.ReactNode;
  className?: string;
}

/**
 * Container component that manages selection state across a collection of Radio
 * options.
 */
export const RadioGroup = forwardRef<React.ElementRef<typeof YStack>, RadioGroupProps>(function RadioGroup(
  { value, onChange, isDisabled, children, ...props },
  ref
) {
  return (
    <RadioGroupContext.Provider value={{ value, onChange, isDisabled }}>
      <YStack ref={ref} gap={8} {...props}>
        {children}
      </YStack>
    </RadioGroupContext.Provider>
  );
});

export interface RadioProps extends Omit<React.ComponentPropsWithoutRef<typeof XStack>, "size"> {
  value: string;
  isDisabled?: boolean;
  size?: "sm" | "md" | "lg";
  className?: string;
}

/** Individual radio option item. */
export const Radio = forwardRef<React.ElementRef<typeof XStack>, RadioProps>(function Radio(
  { value, isDisabled: explicitDisabled, size = "md", children, ...props },
  ref
) {
  const groupContext = useContext(RadioGroupContext);
  const isSelected = groupContext ? groupContext.value === value : false;
  const isDisabled = Boolean(groupContext?.isDisabled || explicitDisabled);

  const select = () => {
    if (isDisabled) return;
    groupContext?.onChange?.(value);
  };

  return (
    <RadioContext.Provider value={{ isSelected, isDisabled, size, select }}>
      <XStack
        ref={ref}
        alignItems="center"
        gap={8}
        cursor={isDisabled ? "not-allowed" : "pointer"}
        opacity={isDisabled ? 0.5 : 1}
        onPress={select}
        role="radio"
        aria-checked={isSelected}
        {...props}
      >
        {children}
      </XStack>
    </RadioContext.Provider>
  );
});

export interface RadioIndicatorProps extends React.ComponentPropsWithoutRef<typeof View> {
  className?: string;
}

/** Circular outer frame visual indicator for a radio input. */
export const RadioIndicator = forwardRef<React.ElementRef<typeof View>, RadioIndicatorProps>(function RadioIndicator(
  { children, ...props },
  ref
) {
  const { isSelected } = useContext(RadioContext);

  return (
    <View
      ref={ref}
      width={18}
      height={18}
      borderRadius={9999}
      borderWidth={1}
      borderColor={isSelected ? "$color" : "$borderColor"}
      backgroundColor="$background"
      alignItems="center"
      justifyContent="center"
      {...props}
    >
      {children}
    </View>
  );
});

export interface RadioLabelProps extends React.ComponentPropsWithoutRef<typeof Paragraph> {
  className?: string;
}

/** Descriptive label accompanying the Radio component. */
export const RadioLabel = forwardRef<React.ElementRef<typeof Paragraph>, RadioLabelProps>(function RadioLabel(
  { children, ...props },
  ref
) {
  return (
    <Paragraph ref={ref} fontSize={14} fontWeight="500" userSelect="none" {...props}>
      {children}
    </Paragraph>
  );
});

export interface RadioIconProps {
  as?: React.ElementType;
  size?: number | string;
  height?: number;
  width?: number;
  color?: string;
  className?: string;
  [key: string]: any;
}

/** Inner indicator dot displayed when a radio option is active. */
export const RadioIcon = forwardRef<any, RadioIconProps>(function RadioIcon(
  { as: Component, size = 8, height, width, color = "$color", ...props },
  ref
) {
  const { isSelected } = useContext(RadioContext);
  if (!isSelected) return null;

  const dim = height ?? width ?? (typeof size === "number" ? size : 8);

  if (Component) {
    return <Component ref={ref} size={dim} width={dim} height={dim} color={color} {...props} />;
  }

  return <View ref={ref} width={dim} height={dim} borderRadius={9999} backgroundColor={color as any} {...props} />;
});

Radio.displayName = "Radio";
RadioIndicator.displayName = "RadioIndicator";
RadioLabel.displayName = "RadioLabel";
RadioIcon.displayName = "RadioIcon";
RadioGroup.displayName = "RadioGroup";
