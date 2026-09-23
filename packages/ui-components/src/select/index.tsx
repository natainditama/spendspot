import React, { createContext, forwardRef, useContext, useState } from "react";
import { Modal, Pressable, ScrollView } from "react-native";
import { Paragraph, styled, View, XStack, YStack } from "tamagui";

interface SelectContextValue {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  selectedValue?: string;
  onValueChange?: (value: string) => void;
  selectedLabel?: string;
  setSelectedLabel: (label: string) => void;
}

const SelectContext = createContext<SelectContextValue>({
  isOpen: false,
  setIsOpen: () => {},
  selectedLabel: "",
  setSelectedLabel: () => {},
});

export interface SelectProps {
  selectedValue?: string;
  onValueChange?: (val: string) => void;
  children?: React.ReactNode;
  className?: string;
}

/**
 * Accessible select input dropdown component coordinating trigger button and
 * sheet options.
 */
export const Select = forwardRef<any, SelectProps>(function Select(
  { selectedValue, onValueChange, children, ...props },
  ref
) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLabel, setSelectedLabel] = useState<string>("");

  return (
    <SelectContext.Provider
      value={{
        isOpen,
        setIsOpen,
        selectedValue,
        onValueChange,
        selectedLabel,
        setSelectedLabel,
      }}
    >
      <View ref={ref} width="100%" {...props}>
        {children}
      </View>
    </SelectContext.Provider>
  );
});

export interface SelectTriggerProps extends React.ComponentPropsWithoutRef<typeof XStack> {
  size?: "sm" | "md" | "lg" | "xl";
  variant?: "outline" | "rounded" | "underlined";
  className?: string;
}

/** Interactive surface triggering selection sheet expansion. */
export const SelectTrigger = forwardRef<React.ElementRef<typeof XStack>, SelectTriggerProps>(function SelectTrigger(
  { size = "md", variant = "outline", children, ...props },
  ref
) {
  const { setIsOpen } = useContext(SelectContext);

  const height = size === "sm" ? 36 : size === "lg" ? 48 : size === "xl" ? 52 : 42;
  const borderRadius = variant === "rounded" ? 9999 : variant === "underlined" ? 0 : 6;
  const borderWidth = variant === "underlined" ? 0 : 1;
  const borderBottomWidth = 1;

  return (
    <XStack
      ref={ref}
      height={height}
      borderRadius={borderRadius}
      borderWidth={borderWidth}
      borderBottomWidth={borderBottomWidth}
      borderColor="$borderColor"
      backgroundColor="$background"
      paddingHorizontal={12}
      alignItems="center"
      justifyContent="space-between"
      cursor="pointer"
      onPress={() => setIsOpen(true)}
      {...props}
    >
      {children}
    </XStack>
  );
});

export interface SelectInputProps extends React.ComponentPropsWithoutRef<typeof Paragraph> {
  placeholder?: string;
  className?: string;
}

/** Text node displaying the selected option label or fallback placeholder. */
export const SelectInput = forwardRef<React.ElementRef<typeof Paragraph>, SelectInputProps>(function SelectInput(
  { placeholder = "Select an option", ...props },
  ref
) {
  const { selectedLabel, selectedValue } = useContext(SelectContext);
  const textToShow = selectedLabel || selectedValue || placeholder;
  const isPlaceholder = !selectedLabel && !selectedValue;

  return (
    <Paragraph ref={ref} color={isPlaceholder ? "$colorHover" : "$color"} fontSize={14} numberOfLines={1} {...props}>
      {textToShow}
    </Paragraph>
  );
});

export interface SelectIconProps {
  as?: React.ElementType;
  size?: number | string;
  height?: number;
  width?: number;
  color?: string;
  className?: string;
  [key: string]: any;
}

/** Dropdown indicator icon displayed on the select trigger edge. */
export const SelectIcon = forwardRef<any, SelectIconProps>(function SelectIcon(
  { as: Component, size = 16, height, width, color = "$color", ...props },
  ref
) {
  const dim = height ?? width ?? (typeof size === "number" ? size : 16);
  if (Component) {
    return <Component ref={ref} size={dim} width={dim} height={dim} color={color} {...props} />;
  }
  return null;
});

export interface SelectPortalProps {
  children?: React.ReactNode;
  className?: string;
}

/** Portaled overlay boundary presenting sheet options in modal hierarchy. */
export const SelectPortal = function SelectPortal({ children }: SelectPortalProps) {
  const { isOpen, setIsOpen } = useContext(SelectContext);

  if (!isOpen) return null;

  return (
    <Modal visible={isOpen} transparent animationType="slide" onRequestClose={() => setIsOpen(false)}>
      <View flex={1} justifyContent="flex-end">
        {children}
      </View>
    </Modal>
  );
};

export interface SelectBackdropProps extends React.ComponentPropsWithoutRef<typeof Pressable> {
  className?: string;
}

/** Dimmed scrim backdrop capturing taps outside the options sheet. */
export const SelectBackdrop = forwardRef<any, SelectBackdropProps>(function SelectBackdrop(props, ref) {
  const { setIsOpen } = useContext(SelectContext);

  return (
    <Pressable
      ref={ref}
      style={{ position: "absolute", top: 0, bottom: 0, left: 0, right: 0, backgroundColor: "rgba(0,0,0,0.5)" }}
      onPress={() => setIsOpen(false)}
      {...props}
    />
  );
});

export interface SelectContentProps extends React.ComponentPropsWithoutRef<typeof YStack> {
  className?: string;
}

/** Sliding bottom sheet surface container holding selection options. */
export const SelectContent = forwardRef<React.ElementRef<typeof YStack>, SelectContentProps>(function SelectContent(
  { children, ...props },
  ref
) {
  return (
    <YStack
      ref={ref}
      backgroundColor="$background"
      borderTopLeftRadius={16}
      borderTopRightRadius={16}
      borderWidth={1}
      borderColor="$borderColor"
      paddingHorizontal={16}
      paddingBottom={32}
      paddingTop={8}
      maxHeight="60%"
      gap={4}
      {...props}
    >
      {children}
    </YStack>
  );
});

export const SelectDragIndicatorWrapper = styled(XStack, {
  name: "SelectDragIndicatorWrapper",
  width: "100%",
  alignItems: "center",
  justifyContent: "center",
  paddingVertical: 8,
});

export const SelectDragIndicator = styled(View, {
  name: "SelectDragIndicator",
  width: 36,
  height: 4,
  borderRadius: 2,
  backgroundColor: "$borderColor",
});

export interface SelectItemProps extends React.ComponentPropsWithoutRef<typeof XStack> {
  label: string;
  value: string;
  className?: string;
}

/** Selectable item row inside the select options list. */
export const SelectItem = forwardRef<React.ElementRef<typeof XStack>, SelectItemProps>(function SelectItem(
  { label, value, ...props },
  ref
) {
  const { onValueChange, setSelectedLabel, setIsOpen, selectedValue } = useContext(SelectContext);
  const isSelected = selectedValue === value;

  const handleSelect = () => {
    setSelectedLabel(label);
    onValueChange?.(value);
    setIsOpen(false);
  };

  return (
    <XStack
      ref={ref}
      paddingVertical={12}
      paddingHorizontal={8}
      borderRadius={6}
      backgroundColor={isSelected ? "$backgroundHover" : "transparent"}
      cursor="pointer"
      onPress={handleSelect}
      alignItems="center"
      justifyContent="space-between"
      {...props}
    >
      <Paragraph fontWeight={isSelected ? "600" : "400"} fontSize={15} color="$color">
        {label}
      </Paragraph>
    </XStack>
  );
});

export const SelectScrollView = ScrollView;
export const SelectFlatList = View;
export const SelectVirtualizedList = View;
export const SelectSectionList = View;
export const SelectSectionHeaderText = Paragraph;

Select.displayName = "Select";
SelectTrigger.displayName = "SelectTrigger";
SelectInput.displayName = "SelectInput";
SelectIcon.displayName = "SelectIcon";
SelectPortal.displayName = "SelectPortal";
SelectBackdrop.displayName = "SelectBackdrop";
SelectContent.displayName = "SelectContent";
SelectDragIndicatorWrapper.displayName = "SelectDragIndicatorWrapper";
SelectDragIndicator.displayName = "SelectDragIndicator";
SelectItem.displayName = "SelectItem";
