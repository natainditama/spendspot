import { withStaticProperties } from "@tamagui/core";
import { SizableText } from "@tamagui/text";
import { ToggleGroup as TamaguiToggleGroup } from "@tamagui/toggle-group";
import type { ToggleGroupMultipleProps, ToggleGroupSingleProps } from "@tamagui/toggle-group";
import React from "react";

export type ToggleGroupVariant = "default" | "outline";
export type ToggleGroupSize = "sm" | "default" | "lg";

interface ToggleGroupContextValue {
  variant: ToggleGroupVariant;
  size: ToggleGroupSize;
}

const ToggleGroupContext = React.createContext<ToggleGroupContextValue>({
  variant: "default",
  size: "default",
});

/**
 * Coordinating container for grouped sets of related two-state toggle buttons.
 * Enforces single or multiple selection rules across child toggle items.
 */
export const ToggleGroupRoot = ({
  variant = "default",
  size = "default",
  orientation = "horizontal",
  children,
  type = "single",
  ...props
}: ToggleGroupProps) => {
  return (
    <ToggleGroupContext.Provider value={{ variant, size }}>
      <TamaguiToggleGroup
        unstyled
        type={type as any}
        orientation={orientation}
        flexDirection={orientation === "vertical" ? "column" : "row"}
        gap="$1"
        alignItems="center"
        {...(props as any)}
      >
        {children}
      </TamaguiToggleGroup>
    </ToggleGroupContext.Provider>
  );
};

ToggleGroupRoot.displayName = "ToggleGroupRoot";
export type ToggleGroupRootProps = React.ComponentPropsWithoutRef<typeof TamaguiToggleGroup>;

/**
 * Individual toggle button item within a ToggleGroup container.
 * Toggles active selection state and inherits container variant styling.
 */
export const ToggleGroupItem = ({ variant: itemVariant, size: itemSize, children, ...props }: ToggleGroupItemProps) => {
  const context = React.useContext(ToggleGroupContext);
  const variant = itemVariant || context.variant;
  const size = itemSize || context.size;

  const isSm = size === "sm";
  const isLg = size === "lg";
  const height = isSm ? "$7" : isLg ? "$10" : "$9";
  const paddingHorizontal = isSm ? "$2" : isLg ? "$3.5" : "$3";

  return (
    <TamaguiToggleGroup.Item
      unstyled
      height={height}
      minHeight={height}
      paddingHorizontal={paddingHorizontal}
      borderRadius="$md"
      borderWidth={variant === "outline" ? "$px" : 0}
      borderColor={variant === "outline" ? "$border" : "transparent"}
      backgroundColor="transparent"
      alignItems="center"
      justifyContent="center"
      cursor="pointer"
      hoverStyle={{
        backgroundColor: "$accent",
      }}
      pressStyle={{
        backgroundColor: "$accent",
      }}
      activeStyle={{
        backgroundColor: "$accent",
        borderColor: variant === "outline" ? "$border" : "transparent",
      }}
      focusVisibleStyle={{
        outlineColor: "$ring",
        outlineWidth: "$0.5",
        outlineStyle: "solid",
      }}
      {...props}
    >
      {React.Children.map(children, (child) => {
        if (typeof child === "string" || typeof child === "number") {
          return (
            <SizableText
              size={isSm ? "$1" : isLg ? "$3" : "$2"}
              fontSize={isSm ? "$xs" : isLg ? "$base" : "$sm"}
              lineHeight={isSm ? "$xs" : isLg ? "$base" : "$sm"}
              fontWeight="500"
              color="$foreground"
            >
              {child}
            </SizableText>
          );
        }
        return child;
      })}
    </TamaguiToggleGroup.Item>
  );
};

ToggleGroupItem.displayName = "ToggleGroupItem";
export type ToggleGroupItemProps = Omit<React.ComponentPropsWithoutRef<typeof TamaguiToggleGroup.Item>, "size"> & {
  variant?: ToggleGroupVariant;
  size?: ToggleGroupSize;
};

/**
 * Composite ToggleGroup component coordinating sets of toggleable button options.
 * Supports compound syntax as well as flat individual named sub-component exports.
 */
export const ToggleGroup = withStaticProperties(ToggleGroupRoot, {
  Item: ToggleGroupItem,
});

ToggleGroup.displayName = "ToggleGroup";
export type ToggleGroupProps = (
  | (Omit<ToggleGroupSingleProps, "size"> & { type?: "single" })
  | (Omit<ToggleGroupMultipleProps, "size"> & { type: "multiple" })
) & {
  variant?: ToggleGroupVariant;
  size?: ToggleGroupSize;
};

export { useToggleGroupItem } from "@tamagui/toggle-group";
