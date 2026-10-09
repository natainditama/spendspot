import { styled, withStaticProperties } from "@tamagui/core";
import type { GetProps } from "@tamagui/core";
import { RadioGroup as TamaguiRadioGroup } from "@tamagui/radio-group";
import type { RadioGroupItemProps as TamaguiRadioGroupItemProps } from "@tamagui/radio-group";
import React from "react";

const RadioGroupFrame = styled(TamaguiRadioGroup, {
  name: "RadioGroup",
  gap: "$2",
  flexDirection: "column",
});
RadioGroupFrame.displayName = "RadioGroupFrame";

/**
 * Root container for coordinating a set of mutually exclusive radio choices.
 * Organizes radio options in a standard vertical stack with token gap spacing.
 */
export const RadioGroupRoot = ({ children, ...props }: RadioGroupProps) => {
  return <RadioGroupFrame {...props}>{children}</RadioGroupFrame>;
};

RadioGroupRoot.displayName = "RadioGroupRoot";
export type RadioGroupRootProps = GetProps<typeof RadioGroupFrame>;

/**
 * Single selectable radio option button within a RadioGroup container.
 * Automatically renders a filled center dot indicator when selected.
 */
export const RadioGroupItem = ({ value, id, invalid, disabled, children, ...props }: RadioGroupItemProps) => {
  return (
    <TamaguiRadioGroup.Item
      unstyled
      value={value}
      id={id}
      disabled={disabled}
      width="$4"
      height="$4"
      borderRadius="$full"
      // borderWidth={invalid ? "$px" : 0}
      // borderColor={invalid ? "$destructive" : "transparent"}
      outlineWidth="$px"
      outlineColor={invalid ? "$destructive" : "$input"}
      outlineOffset={0}
      outlineStyle="solid"
      backgroundColor="transparent"
      alignItems="center"
      justifyContent="center"
      opacity={disabled ? 0.5 : 1}
      pointerEvents={disabled ? "none" : undefined}
      // focusVisibleStyle={{
      //   borderColor: invalid ? "$destructive" : "$ring",
      //   outlineColor: invalid ? "$destructiveRing" : "$ring",
      //   outlineWidth: "$0.5",
      //   outlineStyle: "solid",
      // }}
      {...props}
    >
      {children || <RadioGroupIndicator disabled={disabled} />}
    </TamaguiRadioGroup.Item>
  );
};

RadioGroupItem.displayName = "RadioGroupItem";
export type RadioGroupItemProps = TamaguiRadioGroupItemProps & {
  invalid?: boolean;
};

/**
 * Indicator slot inside a RadioGroupItem rendering the inner active circle.
 * Displays a solid primary-foreground dot when the radio item is selected.
 */
// export const RadioGroupIndicator = TamaguiRadioGroup.Indicator;
export const RadioGroupIndicator = ({ disabled, children, ...props }: RadioGroupIndicatorProps) => {
  return (
    <TamaguiRadioGroup.Indicator
      disabled={disabled}
      width="$1.5"
      height="$1.5"
      alignItems="center"
      justifyContent="center"
      backgroundColor="transparent"
      outlineColor={disabled ? "transparent" : "$primary"}
      outlineStyle="solid"
      outlineOffset="$px"
      outlineWidth="$1"
      borderRadius="$full"
      {...props}
    >
      {children}
    </TamaguiRadioGroup.Indicator>
  );
};

RadioGroupIndicator.displayName = "RadioGroupIndicator";
export type RadioGroupIndicatorProps = GetProps<typeof TamaguiRadioGroup.Indicator>;

/**
 * Radio group container for selecting a single option from a list of items.
 * Styled after shadcn UI specification with token-based colors and focus rings.
 */
export const RadioGroup = withStaticProperties(RadioGroupRoot, {
  Item: RadioGroupItem,
  Indicator: RadioGroupIndicator,
});

RadioGroup.displayName = "RadioGroup";
export type RadioGroupProps = GetProps<typeof RadioGroupFrame>;
