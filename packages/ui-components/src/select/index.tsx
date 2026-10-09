import { styled } from "@tamagui/core";
import { Check, ChevronDown, ChevronUp } from "@tamagui/lucide-icons-2";
import { Select as TamaguiSelect, SelectSeparator as TamaguiSelectSeparator } from "@tamagui/select";
import type { SelectProps as TamaguiSelectProps } from "@tamagui/select";
import { Sheet, SheetProps } from "@tamagui/sheet";
import React from "react";

/**
 * Native-first select root that adapts to a bottom Sheet on touch platforms.
 * Internally handles Sheet animation, dark overlay, handle bar, and content portal.
 */
export const Select = <T extends string = string>({
  children,
  sheetProps,
  ...props
}: TamaguiSelectProps<T> & { sheetProps?: SheetProps }) => {
  return (
    <TamaguiSelect lazyMount={true} {...props}>
      {children}
      <TamaguiSelect.Adapt platform="touch">
        <Sheet
          modal
          snapPointsMode="fit"
          unmountChildrenWhenHidden
          {...sheetProps}
          {...({
            animation: "quickerLessBouncy",
            transition: "quickerLessBouncy",
          } as any)}
        >
          <Sheet.Frame
            paddingBottom="$4"
            paddingVertical="$2"
            paddingHorizontal="$2"
            backgroundColor="$background"
            borderTopRightRadius="$5"
            borderTopLeftRadius="$5"
            borderColor="$border"
            borderBottomWidth={0}
            borderWidth="$px"
            elevation="$3"
            zIndex={10_000}
          >
            <Sheet.Handle
              width="$10"
              height="$1"
              borderRadius="$xs"
              alignSelf="center"
              marginVertical="$2"
              backgroundColor="$border"
            />
            <Sheet.ScrollView paddingBottom="$6">
              <TamaguiSelect.Adapt.Contents />
            </Sheet.ScrollView>
          </Sheet.Frame>
          <Sheet.Overlay
            {...({
              animation: "quickerLessBouncy",
              transition: "quickerLessBouncy",
              enterStyle: { opacity: 0 },
              exitStyle: { opacity: 0 },
            } as any)}
            backgroundColor="$overlay"
          />
        </Sheet>
      </TamaguiSelect.Adapt>
    </TamaguiSelect>
  );
};

Select.displayName = "Select";
export type SelectProps = React.ComponentProps<typeof Select>;

const SelectTriggerFrame = styled(TamaguiSelect.Trigger, {
  name: "SelectTrigger",
  minHeight: "$9",
  height: "$9",
  borderWidth: "$px",
  borderRadius: "$md",
  paddingVertical: "$2",
  borderColor: "$input",
  paddingHorizontal: "$2.5",
  backgroundColor: "transparent",

  hoverStyle: {
    borderColor: "$ring",
  },
  pressStyle: {
    backgroundColor: "$accent",
    borderColor: "$input",
  },
  focusStyle: {
    borderColor: "$ring",
    outlineColor: "$ring",
    outlineWidth: "$0.5",
    outlineStyle: "solid",
  },
  focusVisibleStyle: {
    borderColor: "$ring",
    outlineColor: "$ring",
    outlineWidth: "$0.5",
    outlineStyle: "solid",
  },

  variants: {
    invalid: {
      true: {
        borderColor: "$destructive",
        focusStyle: {
          borderColor: "$destructive",
          outlineColor: "$destructiveRing",
          outlineWidth: "$0.5",
          outlineStyle: "solid",
        },
        focusVisibleStyle: {
          borderColor: "$destructive",
          outlineColor: "$destructiveRing",
          outlineWidth: "$0.5",
          outlineStyle: "solid",
        },
      },
    },
    size: {
      default: {
        minHeight: "$9",
        height: "$9",
      },
      sm: {
        minHeight: "$8",
        height: "$8",
        paddingHorizontal: "$2",
        paddingVertical: "$1.5",
      },
    },
    disabled: {
      true: {
        opacity: 0.5,
        pointerEvents: "none",
      },
    },
  } as const,

  defaultVariants: {
    size: "default",
  },
});
SelectTriggerFrame.displayName = "SelectTrigger";

/**
 * Trigger button styled after shadcn border-input with transparent background.
 * Features hover/focus border highlights, validation states, and muted-foreground chevron indicator.
 */
export const SelectTrigger = ({ children, invalid, ...props }: SelectTriggerProps) => {
  const isInvalid = invalid || (props as any)["aria-invalid"];

  return (
    <SelectTriggerFrame invalid={isInvalid} {...props}>
      {children}
      <TamaguiSelect.Icon>
        <ChevronDown size="$4" color="$mutedForeground" />
      </TamaguiSelect.Icon>
    </SelectTriggerFrame>
  );
};

SelectTrigger.displayName = "SelectTrigger";
export type SelectTriggerProps = React.ComponentPropsWithoutRef<typeof SelectTriggerFrame> & {
  invalid?: boolean;
  size?: "default" | "sm";
};

/**
 * Displays the currently selected value or placeholder text when empty.
 * Accepts all Tamagui Select.Value props for placeholder customization.
 */
export const SelectValue = ({ children, ...props }: React.ComponentPropsWithoutRef<typeof TamaguiSelect.Value>) => {
  return (
    <TamaguiSelect.Value fontSize="$sm" lineHeight="$sm" color="$foreground" {...props} padding={0} margin={0}>
      {children}
    </TamaguiSelect.Value>
  );
};

SelectValue.displayName = "SelectValue";
export type SelectValueProps = React.ComponentPropsWithoutRef<typeof TamaguiSelect.Value>;

/**
 * Content container that auto-wraps items with scroll buttons and a viewport.
 * Encapsulates popover background styling, border outlines, and elevation.
 */
export const SelectContent = ({ children, ...props }: React.ComponentPropsWithoutRef<typeof TamaguiSelect.Content>) => {
  return (
    <TamaguiSelect.FocusScope>
      <TamaguiSelect.Content {...props}>
        <TamaguiSelect.ScrollUpButton
          alignItems="center"
          paddingVertical="$1"
          justifyContent="center"
          backgroundColor="transparent"
        >
          <ChevronUp size="$4" color="$mutedForeground" />
        </TamaguiSelect.ScrollUpButton>
        <TamaguiSelect.Viewport maxHeight={"$20"}>{children}</TamaguiSelect.Viewport>
        <TamaguiSelect.ScrollDownButton
          alignItems="center"
          paddingVertical="$1"
          justifyContent="center"
          backgroundColor="transparent"
        >
          <ChevronDown size="$4" color="$mutedForeground" />
        </TamaguiSelect.ScrollDownButton>
      </TamaguiSelect.Content>
    </TamaguiSelect.FocusScope>
  );
};

SelectContent.displayName = "SelectContent";
export type SelectContentProps = React.ComponentPropsWithoutRef<typeof TamaguiSelect.Content>;

/**
 * Groups related SelectItem elements under an optional section label.
 * Accepts all Tamagui Select.Group props for spacing and layout control.
 */
export const SelectGroup = ({ children, ...props }: React.ComponentPropsWithoutRef<typeof TamaguiSelect.Group>) => {
  return <TamaguiSelect.Group {...props}>{children}</TamaguiSelect.Group>;
};

SelectGroup.displayName = "SelectGroup";
export type SelectGroupProps = React.ComponentPropsWithoutRef<typeof TamaguiSelect.Group>;

/**
 * Section header label styled with muted typography matching shadcn specifications.
 * Rendered above an option group to provide semantic categorization.
 */
export const SelectLabel = ({ children, ...props }: React.ComponentPropsWithoutRef<typeof TamaguiSelect.Label>) => {
  return (
    <TamaguiSelect.Label
      fontSize="$xs"
      lineHeight="$xs"
      fontWeight="600"
      paddingVertical="$1"
      paddingHorizontal="$1.5"
      color="$mutedForeground"
      {...props}
    >
      {children}
    </TamaguiSelect.Label>
  );
};

SelectLabel.displayName = "SelectLabel";
export type SelectLabelProps = React.ComponentPropsWithoutRef<typeof TamaguiSelect.Label>;

/**
 * Selectable option styled after shadcn UI item states and accent feedback.
 * Automatically aligns checkmark indicator and applies hover/press accent fills.
 */
export const SelectItem = ({ children, ...props }: React.ComponentPropsWithoutRef<typeof TamaguiSelect.Item>) => {
  return (
    <TamaguiSelect.Item
      borderRadius="$md"
      paddingHorizontal="$1.5"
      paddingVertical="$2.5"
      backgroundColor="transparent"
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
      <TamaguiSelect.ItemText
        color="$foreground"
        fontSize="$base"
        lineHeight="$base"
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
      </TamaguiSelect.ItemText>

      <TamaguiSelect.ItemIndicator marginLeft="auto">
        <Check size="$4" color="$foreground" />
      </TamaguiSelect.ItemIndicator>
    </TamaguiSelect.Item>
  );
};

SelectItem.displayName = "SelectItem";
export type SelectItemProps = React.ComponentPropsWithoutRef<typeof TamaguiSelect.Item>;

/**
 * Horizontal rule that visually separates groups or items inside the sheet.
 * Styled with shadcn border color and standardized compact vertical margins.
 */
export const SelectSeparator = ({ ...props }: React.ComponentPropsWithoutRef<typeof TamaguiSelectSeparator>) => {
  return (
    <TamaguiSelectSeparator
      borderWidth="$px"
      borderColor="$border"
      marginVertical="$1.5"
      marginHorizontal="$-4"
      backgroundColor="$border"
      {...props}
    />
  );
};

SelectSeparator.displayName = "SelectSeparator";
export type SelectSeparatorProps = React.ComponentPropsWithoutRef<typeof TamaguiSelectSeparator>;
