import React, { createContext, forwardRef, useContext } from "react";
import { Paragraph, View, XStack } from "tamagui";

interface CheckboxGroupContextValue {
  value?: string[];
  onChange?: (values: string[]) => void;
  isDisabled?: boolean;
}

const CheckboxGroupContext = createContext<CheckboxGroupContextValue | null>(null);

interface CheckboxContextValue {
  isChecked: boolean;
  isDisabled: boolean;
  toggle: () => void;
}

const CheckboxContext = createContext<CheckboxContextValue>({
  isChecked: false,
  isDisabled: false,
  toggle: () => {},
});

export interface CheckboxGroupProps {
  value?: string[];
  onChange?: (values: string[]) => void;
  isDisabled?: boolean;
  children?: React.ReactNode;
  className?: string;
}

/** Group container managing multi-select state across child Checkbox elements. */
export const CheckboxGroup = forwardRef<any, CheckboxGroupProps>(function CheckboxGroup(
  { value = [], onChange, isDisabled = false, children, ...props },
  ref
) {
  return (
    <CheckboxGroupContext.Provider value={{ value, onChange, isDisabled }}>
      <View ref={ref} gap={8} {...props}>
        {children}
      </View>
    </CheckboxGroupContext.Provider>
  );
});

export interface CheckboxProps extends Omit<React.ComponentPropsWithoutRef<typeof XStack>, "onChange"> {
  value?: string;
  isChecked?: boolean;
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  isDisabled?: boolean;
  isInvalid?: boolean;
  className?: string;
}

/**
 * Accessible checkbox input allowing selection of individual or grouped
 * options.
 */
export const Checkbox = forwardRef<React.ElementRef<typeof XStack>, CheckboxProps>(function Checkbox(
  {
    value,
    isChecked: explicitChecked,
    checked: explicitCheckedAlt,
    onChange,
    isDisabled: explicitDisabled,
    isInvalid,
    children,
    ...props
  },
  ref
) {
  const groupContext = useContext(CheckboxGroupContext);

  const isChecked =
    groupContext && value !== undefined
      ? Boolean(groupContext.value?.includes(value))
      : Boolean(explicitChecked ?? explicitCheckedAlt ?? false);

  const isDisabled = Boolean(groupContext?.isDisabled || explicitDisabled);

  const toggle = () => {
    if (isDisabled) return;
    if (groupContext && value !== undefined && groupContext.onChange) {
      const current = groupContext.value ?? [];
      const next = current.includes(value) ? current.filter((v) => v !== value) : [...current, value];
      groupContext.onChange(next);
    } else {
      onChange?.(!isChecked);
    }
  };

  return (
    <CheckboxContext.Provider value={{ isChecked, isDisabled, toggle }}>
      <XStack
        ref={ref}
        alignItems="center"
        gap={8}
        cursor={isDisabled ? "not-allowed" : "pointer"}
        opacity={isDisabled ? 0.5 : 1}
        onPress={toggle}
        role="checkbox"
        aria-checked={isChecked}
        {...props}
      >
        {children}
      </XStack>
    </CheckboxContext.Provider>
  );
});

export interface CheckboxIndicatorProps extends React.ComponentPropsWithoutRef<typeof View> {
  className?: string;
}

/** Visual box displaying check state and border focus outline. */
export const CheckboxIndicator = forwardRef<React.ElementRef<typeof View>, CheckboxIndicatorProps>(
  function CheckboxIndicator({ children, ...props }, ref) {
    const { isChecked } = useContext(CheckboxContext);

    return (
      <View
        ref={ref}
        width={18}
        height={18}
        borderRadius={4}
        borderWidth={1}
        borderColor={isChecked ? "$color" : "$borderColor"}
        backgroundColor={isChecked ? "$color" : "$background"}
        alignItems="center"
        justifyContent="center"
        {...props}
      >
        {children}
      </View>
    );
  }
);

export interface CheckboxLabelProps extends React.ComponentPropsWithoutRef<typeof Paragraph> {
  className?: string;
}

/** Descriptive label accompanying the Checkbox input. */
export const CheckboxLabel = forwardRef<React.ElementRef<typeof Paragraph>, CheckboxLabelProps>(function CheckboxLabel(
  { children, ...props },
  ref
) {
  return (
    <Paragraph ref={ref} fontSize={14} fontWeight="500" userSelect="none" {...props}>
      {children}
    </Paragraph>
  );
});

export interface CheckboxIconProps {
  as?: React.ElementType;
  size?: number | string;
  height?: number;
  width?: number;
  color?: string;
  className?: string;
  [key: string]: any;
}

/** Checkmark icon displayed inside the CheckboxIndicator when checked. */
export const CheckboxIcon = forwardRef<any, CheckboxIconProps>(function CheckboxIcon(
  { as: Component, size = 12, height, width, color = "$background", ...props },
  ref
) {
  const { isChecked } = useContext(CheckboxContext);
  if (!isChecked) return null;

  const dim = height ?? width ?? (typeof size === "number" ? size : 12);
  if (Component) {
    return <Component ref={ref} size={dim} width={dim} height={dim} color={color} {...props} />;
  }
  return null;
});

Checkbox.displayName = "Checkbox";
CheckboxIndicator.displayName = "CheckboxIndicator";
CheckboxLabel.displayName = "CheckboxLabel";
CheckboxIcon.displayName = "CheckboxIcon";
CheckboxGroup.displayName = "CheckboxGroup";
