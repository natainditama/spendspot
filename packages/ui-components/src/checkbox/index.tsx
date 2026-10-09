import { Checkbox as TamaguiCheckbox } from "@tamagui/checkbox";
import type { CheckboxProps as TamaguiCheckboxProps } from "@tamagui/checkbox";
import { withStaticProperties } from "@tamagui/core";
import { Check } from "@tamagui/lucide-icons-2";
import React from "react";

export type CheckboxSize = "default" | "sm";

/**
 * Checkbox root component styled after shadcn UI specification.
 * Renders a compact rounded square with primary fill on active state.
 */
export const CheckboxRoot = ({
  size = "default",
  invalid,
  disabled,
  children,
  checked,
  defaultChecked,
  ...props
}: CheckboxProps) => {
  const isSm = size === "sm";
  const boxDim = isSm ? "$3.5" : "$4";
  const iconSize = isSm ? "$3" : "$3.5";

  return (
    <TamaguiCheckbox
      unstyled
      checked={checked}
      defaultChecked={defaultChecked}
      disabled={disabled}
      width={boxDim}
      height={boxDim}
      minWidth={boxDim}
      minHeight={boxDim}
      borderRadius="$sm"
      // borderWidth="$px"
      // borderColor={invalid ? "$destructive" : "$input"}
      outlineWidth="$px"
      outlineColor={invalid ? "$destructive" : "$input"}
      outlineOffset={0}
      outlineStyle="solid"
      backgroundColor="transparent"
      alignItems="center"
      justifyContent="center"
      opacity={disabled ? 0.5 : 1}
      pointerEvents={disabled ? "none" : undefined}
      activeStyle={{
        backgroundColor: "$primary",
        borderColor: "$primary",
      }}
      // focusVisibleStyle={{
      //   borderColor: invalid ? "$destructive" : "$ring",
      //   outlineColor: invalid ? "$destructiveRing" : "$ring",
      //   outlineWidth: "$0.5",
      //   outlineStyle: "solid",
      // }}
      {...props}
    >
      {children || (
        <CheckboxIndicator>
          <Check size={iconSize} color="$primaryForeground" />
        </CheckboxIndicator>
      )}
    </TamaguiCheckbox>
  );
};

CheckboxRoot.displayName = "Checkbox";
export type CheckboxRootProps = React.ComponentPropsWithoutRef<typeof CheckboxRoot>;

/**
 * Indicator slot inside Checkbox rendering the checkmark icon when checked.
 * Inherits primary-foreground color matching shadcn UI specification.
 */
export const CheckboxIndicator = ({ children, ...props }: CheckboxIndicatorProps) => {
  return (
    <TamaguiCheckbox.Indicator alignItems="center" justifyContent="center" {...props}>
      {children}
    </TamaguiCheckbox.Indicator>
  );
};

CheckboxIndicator.displayName = "CheckboxIndicator";
export type CheckboxIndicatorProps = React.ComponentPropsWithoutRef<typeof TamaguiCheckbox.Indicator>;

/**
 * Checkbox component supporting default and sm sizes, invalid states, and compound syntax.
 * Automatically renders a checkmark indicator when no custom children are provided.
 */
export const Checkbox = withStaticProperties(CheckboxRoot, {
  Indicator: CheckboxIndicator,
});

Checkbox.displayName = "Checkbox";
export type CheckboxProps = Omit<TamaguiCheckboxProps, "size"> & {
  invalid?: boolean;
  size?: CheckboxSize;
};
