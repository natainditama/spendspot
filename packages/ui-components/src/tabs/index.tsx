import React, { createContext, forwardRef, useContext } from "react";
import { ScrollView } from "react-native";
import { Paragraph, View, XStack, YStack } from "tamagui";

interface TabsContextValue {
  value?: string;
  onValueChange?: (val: string) => void;
  variant: "underlined" | "filled";
}

const TabsContext = createContext<TabsContextValue>({
  variant: "filled",
});

export interface TabsProps extends React.ComponentPropsWithoutRef<typeof YStack> {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  variant?: "underlined" | "filled";
  className?: string;
}

/**
 * Tabs navigation container coordinating segmented list triggers and active
 * views.
 */
export const Tabs = forwardRef<React.ElementRef<typeof YStack>, TabsProps>(function Tabs(
  { value, defaultValue, onValueChange, variant = "filled", children, ...props },
  ref
) {
  const [internalVal, setInternalVal] = React.useState(defaultValue || "");
  const activeValue = value !== undefined ? value : internalVal;
  const handleValueChange = (next: string) => {
    setInternalVal(next);
    onValueChange?.(next);
  };

  return (
    <TabsContext.Provider value={{ value: activeValue, onValueChange: handleValueChange, variant }}>
      <YStack ref={ref} width="100%" gap={8} {...props}>
        {children}
      </YStack>
    </TabsContext.Provider>
  );
});

export interface TabsListProps extends React.ComponentPropsWithoutRef<typeof XStack> {
  className?: string;
}

/** Horizontal row holding tab triggers with optional scrollability. */
export const TabsList = forwardRef<React.ElementRef<typeof XStack>, TabsListProps>(function TabsList(
  { children, ...props },
  ref
) {
  const { variant } = useContext(TabsContext);

  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      <XStack
        ref={ref}
        backgroundColor={variant === "filled" ? "$backgroundHover" : "transparent"}
        borderRadius={8}
        padding={4}
        gap={4}
        borderBottomWidth={variant === "underlined" ? 1 : 0}
        borderBottomColor="$borderColor"
        alignItems="center"
        {...props}
      >
        {children}
      </XStack>
    </ScrollView>
  );
});

export interface TabsTriggerProps extends React.ComponentPropsWithoutRef<typeof XStack> {
  value: string;
  className?: string;
}

/** Interactive button triggering selection of an active tab. */
export const TabsTrigger = forwardRef<React.ElementRef<typeof XStack>, TabsTriggerProps>(function TabsTrigger(
  { value, children, ...props },
  ref
) {
  const { value: selectedValue, onValueChange, variant } = useContext(TabsContext);
  const isSelected = selectedValue === value;

  const bg = variant === "filled" && isSelected ? "$background" : "transparent";

  const borderBottom = variant === "underlined" && isSelected ? 2 : 0;

  return (
    <XStack
      ref={ref}
      paddingVertical={6}
      paddingHorizontal={12}
      borderRadius={variant === "filled" ? 6 : 0}
      backgroundColor={bg}
      borderBottomWidth={borderBottom}
      borderBottomColor="$color"
      cursor="pointer"
      alignItems="center"
      justifyContent="center"
      gap={6}
      onPress={() => onValueChange?.(value)}
      {...props}
    >
      {children}
    </XStack>
  );
});

export interface TabsTriggerTextProps extends React.ComponentPropsWithoutRef<typeof Paragraph> {
  className?: string;
}

/** Label text displayed within a Tab trigger. */
export const TabsTriggerText = forwardRef<React.ElementRef<typeof Paragraph>, TabsTriggerTextProps>(
  function TabsTriggerText({ children, ...props }, ref) {
    return (
      <Paragraph ref={ref} fontSize={13} fontWeight="600" color="$color" userSelect="none" {...props}>
        {children}
      </Paragraph>
    );
  }
);

export interface TabsTriggerIconProps {
  as?: React.ElementType;
  size?: number | string;
  height?: number;
  width?: number;
  color?: string;
  className?: string;
  [key: string]: any;
}

/** Leading icon inside a Tab trigger. */
export const TabsTriggerIcon = forwardRef<any, TabsTriggerIconProps>(function TabsTriggerIcon(
  { as: Component, size = 14, height, width, color = "currentColor", ...props },
  ref
) {
  const dim = height ?? width ?? (typeof size === "number" ? size : 14);
  if (Component) {
    return <Component ref={ref} size={dim} width={dim} height={dim} color={color} {...props} />;
  }
  return null;
});

export interface TabsContentProps extends React.ComponentPropsWithoutRef<typeof YStack> {
  value: string;
  className?: string;
}

/** Tab view pane displayed when its matching tab trigger is active. */
export const TabsContent = forwardRef<React.ElementRef<typeof YStack>, TabsContentProps>(function TabsContent(
  { value, children, ...props },
  ref
) {
  const { value: selectedValue } = useContext(TabsContext);
  if (selectedValue !== value) return null;

  return (
    <YStack ref={ref} width="100%" paddingVertical={8} {...props}>
      {children}
    </YStack>
  );
});

export const TabsContentWrapper = YStack;
export const TabsIndicator = View;

Tabs.displayName = "Tabs";
TabsList.displayName = "TabsList";
TabsTrigger.displayName = "TabsTrigger";
TabsTriggerText.displayName = "TabsTriggerText";
TabsTriggerIcon.displayName = "TabsTriggerIcon";
TabsContent.displayName = "TabsContent";
TabsContentWrapper.displayName = "TabsContentWrapper";
TabsIndicator.displayName = "TabsIndicator";
