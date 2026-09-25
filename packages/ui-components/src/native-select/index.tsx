import { Check, ChevronDown, ChevronUp } from "@tamagui/lucide-icons-2";
import { Select, SelectSeparator } from "@tamagui/select";
import type { SelectProps } from "@tamagui/select";
import { Sheet } from "@tamagui/sheet";
import React from "react";

/**
 * Native-first select root that adapts to a bottom Sheet on touch platforms.
 * Internally handles Sheet animation, dark overlay, handle bar, and content portal.
 */
export function NativeSelect<T extends string = string>({ children, native = true, ...props }: SelectProps<T>) {
  return (
    <Select {...props} native={native}>
      {children}
      <Select.Adapt platform="touch">
        <Sheet
          modal
          dismissOnSnapToBottom
          snapPointsMode="fit"
          unmountChildrenWhenHidden
          {...({ animation: "quickerLessBouncy", transition: "quickerLessBouncy" } as any)}
        >
          <Sheet.Frame
            paddingVertical="$2"
            paddingBottom="$6"
            paddingHorizontal="$2"
            backgroundColor="$background"
            borderTopLeftRadius="$5"
            borderTopRightRadius="$5"
            borderColor="$border"
            borderWidth={1}
            borderBottomWidth={0}
            elevation={12}
          >
            <Sheet.Handle
              backgroundColor="$border"
              marginVertical="$2"
              width={40}
              height={4}
              borderRadius={2}
              alignSelf="center"
            />
            <Sheet.ScrollView>
              <Select.Adapt.Contents />
            </Sheet.ScrollView>
          </Sheet.Frame>
          <Sheet.Overlay
            {...({
              animation: "quickerLessBouncy",
              transition: "quickerLessBouncy",
              enterStyle: { opacity: 0 },
              exitStyle: { opacity: 0 },
            } as any)}
            opacity={0.5}
            backgroundColor="rgba(0,0,0,0.5)"
          />
        </Sheet>
      </Select.Adapt>
    </Select>
  );
}

/**
 * Trigger button styled after shadcn border-input with transparent background.
 * Features hover/focus border highlights and muted-foreground chevron indicator.
 */
export function NativeSelectTrigger({ children, ...props }: React.ComponentPropsWithoutRef<typeof Select.Trigger>) {
  return (
    <Select.Trigger
      borderWidth={1}
      borderColor="$input"
      backgroundColor="transparent"
      borderRadius="$4"
      paddingVertical="$2"
      paddingHorizontal="$3"
      minHeight={40}
      hoverStyle={{
        borderColor: "$ring",
      }}
      pressStyle={{
        backgroundColor: "$accent",
        borderColor: "$input",
      }}
      focusStyle={{
        borderColor: "$ring",
      }}
      {...props}
    >
      {children}
      <Select.Icon>
        <ChevronDown size="$1" color="$mutedForeground" />
      </Select.Icon>
    </Select.Trigger>
  );
}

/**
 * Displays the currently selected value or placeholder text when empty.
 * Accepts all Tamagui Select.Value props for placeholder customization.
 */
export const NativeSelectValue = Select.Value;

/**
 * Content container that auto-wraps items with scroll buttons and a viewport.
 * Encapsulates popover background styling, border outlines, and elevation.
 */
export function NativeSelectContent({ children, ...props }: React.ComponentPropsWithoutRef<typeof Select.Content>) {
  return (
    <Select.Content {...props}>
      <Select.ScrollUpButton
        alignItems="center"
        justifyContent="center"
        paddingVertical="$1"
        backgroundColor="transparent"
      >
        <ChevronUp size="$1" color="$mutedForeground" />
      </Select.ScrollUpButton>
      <Select.Viewport>{children}</Select.Viewport>
      <Select.ScrollDownButton
        alignItems="center"
        justifyContent="center"
        paddingVertical="$1"
        backgroundColor="transparent"
      >
        <ChevronDown size="$1" color="$mutedForeground" />
      </Select.ScrollDownButton>
    </Select.Content>
  );
}

/**
 * Groups related NativeSelectItem elements under an optional section label.
 * Accepts all Tamagui Select.Group props for spacing and layout control.
 */
export const NativeSelectGroup = Select.Group;

/**
 * Section header label styled with muted typography matching shadcn specifications.
 * Rendered above an option group to provide semantic categorization.
 */
export function NativeSelectLabel({ children, ...props }: React.ComponentPropsWithoutRef<typeof Select.Label>) {
  return (
    <Select.Label
      color="$mutedForeground"
      fontSize="$3"
      fontWeight="600"
      paddingHorizontal="$3"
      paddingVertical="$1"
      {...props}
    >
      {children}
    </Select.Label>
  );
}

/**
 * Selectable option styled after shadcn UI item states and accent feedback.
 * Automatically aligns checkmark indicator and applies hover/press accent fills.
 */
export function NativeSelectItem({ children, ...props }: React.ComponentPropsWithoutRef<typeof Select.Item>) {
  return (
    <Select.Item
      backgroundColor="transparent"
      borderRadius="$2"
      paddingVertical="$2.5"
      paddingHorizontal="$3"
      hoverStyle={{
        backgroundColor: "$accent",
      }}
      pressStyle={{
        backgroundColor: "$accent",
      }}
      focusStyle={{
        backgroundColor: "$accent",
      }}
      {...props}
    >
      <Select.ItemText
        color="$color"
        hoverStyle={{
          color: "$accentForeground",
        }}
        pressStyle={{
          color: "$accentForeground",
        }}
        focusStyle={{
          color: "$accentForeground",
        }}
      >
        {children}
      </Select.ItemText>
      <Select.ItemIndicator marginLeft="auto">
        <Check size="$1" color="$color" />
      </Select.ItemIndicator>
    </Select.Item>
  );
}

/**
 * Horizontal rule that visually separates groups or items inside the sheet.
 * Styled with shadcn border color and standardized compact vertical margins.
 */
export function NativeSelectSeparator({ ...props }: React.ComponentPropsWithoutRef<typeof SelectSeparator>) {
  return (
    <SelectSeparator
      borderColor="$border"
      borderWidth={0.5}
      backgroundColor="$border"
      marginVertical="$1.5"
      marginHorizontal="$-2"
      {...props}
    />
  );
}

export type { SelectProps as NativeSelectProps } from "@tamagui/select";
