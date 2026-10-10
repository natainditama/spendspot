import { styled, withStaticProperties } from "@tamagui/core";
import type { GetProps } from "@tamagui/core";
import { Menu } from "@tamagui/menu";
import { SizableText } from "@tamagui/text";
import React from "react";

import "@tamagui/native/setup-expo-ui-menu";

/**
 * Portaled container rendering the floating menu content above screen hierarchy.
 * Coordinates stacking context and portal z-index layering.
 */
export const DropdownMenuPortal = ({ children, ...props }: DropdownMenuPortalProps) => {
  return <Menu.Portal {...props}>{children}</Menu.Portal>;
};

DropdownMenuPortal.displayName = (Menu.Portal as any).displayName || "DropdownMenuPortal";
export type DropdownMenuPortalProps = React.ComponentPropsWithoutRef<typeof Menu.Portal>;

/**
 * Root container coordinating selectable list and nested submenus in a popover.
 * Manages open state, placement, and keyboard navigation across platforms.
 */
export const DropdownMenuRoot = ({ children, ...props }: DropdownMenuRootProps) => {
  const unwrappedChildren = React.Children.toArray(children).flatMap((child) => {
    if (
      React.isValidElement(child) &&
      (child.type === DropdownMenuPortal ||
        child.type === Menu.Portal ||
        (child.type as any)?.displayName === "DropdownMenuPortal" ||
        (child.type as any)?.displayName === "MenuPortal")
    ) {
      return React.Children.toArray((child.props as any).children);
    }
    return child;
  });

  return <Menu {...props}>{unwrappedChildren}</Menu>;
};

DropdownMenuRoot.displayName = "DropdownMenuRoot";
export type DropdownMenuRootProps = React.ComponentPropsWithoutRef<typeof Menu>;

/**
 * Interactive button or element triggering the menu on press or long-press.
 * Automatically coordinates focus and press styling with parent pressables.
 */
export const DropdownMenuTrigger = (props: React.ComponentPropsWithoutRef<typeof Menu.Trigger>) => {
  return <Menu.Trigger {...props} />;
};

DropdownMenuTrigger.displayName = (Menu.Trigger as any).displayName || "ExpoUITrigger";
export type DropdownMenuTriggerProps = React.ComponentPropsWithoutRef<typeof Menu.Trigger>;

/**
 * Floating surface panel containing menu items, groups, separators, and submenus.
 * Styled with theme border, popover background, and rounded corners.
 */
export const DropdownMenuContent = (props: React.ComponentPropsWithoutRef<typeof Menu.Content>) => {
  return (
    <Menu.Content
      backgroundColor="$popover"
      borderRadius="$md"
      borderWidth="$px"
      borderColor="$border"
      elevation="$3"
      padding="$1"
      minWidth={200}
      {...props}
    />
  );
};

DropdownMenuContent.displayName = (Menu.Content as any).displayName || "ExpoUIContent";
export type DropdownMenuContentProps = React.ComponentPropsWithoutRef<typeof Menu.Content>;

/**
 * Section title label grouping related options within a dropdown menu.
 * Non-focusable typography element formatted for scannability.
 */
export const DropdownMenuLabel = (props: React.ComponentPropsWithoutRef<typeof Menu.Label>) => {
  return (
    <Menu.Label
      fontSize="$xs"
      fontWeight="600"
      color="$mutedForeground"
      paddingHorizontal="$2"
      paddingVertical="$1.5"
      {...props}
    />
  );
};

DropdownMenuLabel.displayName = (Menu.Label as any).displayName || "ExpoUILabel";
export type DropdownMenuLabelProps = React.ComponentPropsWithoutRef<typeof Menu.Label>;

/**
 * Selectable menu item that executes an action when selected.
 * Automatically wraps string children in Menu.ItemTitle for convenience.
 */
export const DropdownMenuItem = ({ children, textValue: textValueProp, ...props }: DropdownMenuItemProps) => {
  const textValue =
    textValueProp ??
    (typeof children === "string"
      ? children
      : React.Children.toArray(children)
          .filter((child) => typeof child === "string" || typeof child === "number")
          .join(""));

  return (
    <Menu.Item
      textValue={textValue}
      borderRadius="$sm"
      paddingHorizontal="$2"
      paddingVertical="$1.5"
      focusStyle={{
        backgroundColor: "$accent",
      }}
      pressStyle={{
        backgroundColor: "$accent",
        opacity: 0.9,
      }}
      {...props}
    >
      {React.Children.map(children, (child) => {
        if (typeof child === "string" || typeof child === "number") {
          return <Menu.ItemTitle fontSize="$sm">{child}</Menu.ItemTitle>;
        }
        return child;
      })}
    </Menu.Item>
  );
};

DropdownMenuItem.displayName = (Menu.Item as any).displayName || "ExpoUIItem";
export type DropdownMenuItemProps = React.ComponentPropsWithoutRef<typeof Menu.Item>;

/**
 * Title label typography component rendered inside a Menu.Item.
 * Uses standard typography tokens for unified appearance.
 */
export const DropdownMenuItemTitle = (props: React.ComponentPropsWithoutRef<typeof Menu.ItemTitle>) => {
  return <Menu.ItemTitle fontSize="$sm" color="$foreground" {...props} />;
};

DropdownMenuItemTitle.displayName = (Menu.ItemTitle as any).displayName || "ExpoUIItemTitle";
export type DropdownMenuItemTitleProps = React.ComponentPropsWithoutRef<typeof Menu.ItemTitle>;

/**
 * Secondary subtitle label rendered below the main menu item title.
 * Provides supplementary descriptive details for selected options.
 */
export const DropdownMenuItemSubtitle = (props: React.ComponentPropsWithoutRef<typeof Menu.ItemSubtitle>) => {
  return <Menu.ItemSubtitle fontSize="$xs" color="$mutedForeground" {...props} />;
};

DropdownMenuItemSubtitle.displayName = (Menu.ItemSubtitle as any).displayName || "ExpoUIItemSubtitle";
export type DropdownMenuItemSubtitleProps = React.ComponentPropsWithoutRef<typeof Menu.ItemSubtitle>;

/**
 * Leading or trailing icon element associated with a dropdown menu option.
 * Coordinates sizing and color tokens across native and web menus.
 */
export const DropdownMenuItemIcon = (props: React.ComponentPropsWithoutRef<typeof Menu.ItemIcon>) => {
  return <Menu.ItemIcon {...props} />;
};

DropdownMenuItemIcon.displayName = (Menu.ItemIcon as any).displayName || "ExpoUIItemIcon";
export type DropdownMenuItemIconProps = React.ComponentPropsWithoutRef<typeof Menu.ItemIcon>;

/**
 * Optional image asset rendered inside an item option on supported platforms.
 * Accepts image source and custom styling options.
 */
export const DropdownMenuItemImage = (props: React.ComponentPropsWithoutRef<typeof Menu.ItemImage>) => {
  return <Menu.ItemImage {...props} />;
};

DropdownMenuItemImage.displayName = (Menu.ItemImage as any).displayName || "ExpoUIItemImage";
export type DropdownMenuItemImageProps = React.ComponentPropsWithoutRef<typeof Menu.ItemImage>;

/**
 * Semantic grouping container organizing related menu choices together.
 * Groups choices without adding visual borders or external margins.
 */
export const DropdownMenuGroup = (props: React.ComponentPropsWithoutRef<typeof Menu.Group>) => {
  return <Menu.Group {...props} />;
};

DropdownMenuGroup.displayName = (Menu.Group as any).displayName || "ExpoUIGroup";
export type DropdownMenuGroupProps = React.ComponentPropsWithoutRef<typeof Menu.Group>;

/**
 * Toggleable boolean checkbox option item within a dropdown menu.
 * Displays stateful selection state with indicator feedback.
 */
export const DropdownMenuCheckboxItem = ({
  children,
  textValue: textValueProp,
  ...props
}: DropdownMenuCheckboxItemProps) => {
  const textValue =
    textValueProp ??
    (typeof children === "string"
      ? children
      : React.Children.toArray(children)
          .filter((child) => typeof child === "string" || typeof child === "number")
          .join(""));

  return (
    <Menu.CheckboxItem
      textValue={textValue}
      borderRadius="$sm"
      paddingHorizontal="$2"
      paddingVertical="$1.5"
      focusStyle={{
        backgroundColor: "$accent",
      }}
      pressStyle={{
        backgroundColor: "$accent",
      }}
      {...props}
    >
      {React.Children.map(children, (child) => {
        if (typeof child === "string" || typeof child === "number") {
          return <Menu.ItemTitle fontSize="$sm">{child}</Menu.ItemTitle>;
        }
        return child;
      })}
    </Menu.CheckboxItem>
  );
};

DropdownMenuCheckboxItem.displayName = (Menu.CheckboxItem as any).displayName || "ExpoUICheckboxItem";
export type DropdownMenuCheckboxItemProps = React.ComponentPropsWithoutRef<typeof Menu.CheckboxItem>;

/**
 * Container coordinating mutually exclusive radio item choices within a menu.
 * Enforces single selection behavior across all child radio item options.
 */
export const DropdownMenuRadioGroup = (props: React.ComponentPropsWithoutRef<typeof Menu.RadioGroup>) => {
  return <Menu.RadioGroup {...props} />;
};

DropdownMenuRadioGroup.displayName = (Menu.RadioGroup as any).displayName || "DropdownMenuRadioGroup";
export type DropdownMenuRadioGroupProps = React.ComponentPropsWithoutRef<typeof Menu.RadioGroup>;

/**
 * Radio selection option inside a DropdownMenuRadioGroup container.
 * Displays active checkmark state when its value matches the group value.
 */
export const DropdownMenuRadioItem = ({
  children,
  ...props
}: React.ComponentPropsWithoutRef<typeof Menu.RadioItem>) => {
  return (
    <Menu.RadioItem
      borderRadius="$sm"
      paddingHorizontal="$2"
      paddingVertical="$1.5"
      focusStyle={{
        backgroundColor: "$accent",
      }}
      pressStyle={{
        backgroundColor: "$accent",
      }}
      {...props}
    >
      {React.Children.map(children, (child) => {
        if (typeof child === "string" || typeof child === "number") {
          return <Menu.ItemTitle fontSize="$sm">{child}</Menu.ItemTitle>;
        }
        return child;
      })}
    </Menu.RadioItem>
  );
};

DropdownMenuRadioItem.displayName = (Menu.RadioItem as any).displayName || "DropdownMenuRadioItem";
export type DropdownMenuRadioItemProps = React.ComponentPropsWithoutRef<typeof Menu.RadioItem>;

/**
 * Visual indicator element indicating whether an item option is currently checked.
 * Renders conditionally based on checkbox or radio selection state.
 */
export const DropdownMenuItemIndicator = (props: React.ComponentPropsWithoutRef<typeof Menu.ItemIndicator>) => {
  return <Menu.ItemIndicator {...props} />;
};

DropdownMenuItemIndicator.displayName = (Menu.ItemIndicator as any).displayName || "ExpoUIItemIndicator";
export type DropdownMenuItemIndicatorProps = React.ComponentPropsWithoutRef<typeof Menu.ItemIndicator>;

/**
 * Thin dividing line visually separating groups of items within the menu.
 * Uses standard theme border token and vertical padding margins.
 */
export const DropdownMenuSeparator = (props: React.ComponentPropsWithoutRef<typeof Menu.Separator>) => {
  return <Menu.Separator height="$px" backgroundColor="$border" marginVertical="$1" {...props} />;
};

DropdownMenuSeparator.displayName = (Menu.Separator as any).displayName || "ExpoUISeparator";
export type DropdownMenuSeparatorProps = React.ComponentPropsWithoutRef<typeof Menu.Separator>;

/**
 * Directional pointer arrow extending toward the triggering target element.
 * Styled with standard border and surface background tokens.
 */
export const DropdownMenuArrow = (props: React.ComponentPropsWithoutRef<typeof Menu.Arrow>) => {
  return <Menu.Arrow borderColor="$border" backgroundColor="$popover" {...props} />;
};

DropdownMenuArrow.displayName = (Menu.Arrow as any).displayName || "DropdownMenuArrow";
export type DropdownMenuArrowProps = React.ComponentPropsWithoutRef<typeof Menu.Arrow>;

/**
 * Scrollable container accommodating large lists of options that overflow.
 * Constrains height within viewport space and manages smooth scrolling.
 */
export const DropdownMenuScrollView = (
  props: React.ComponentPropsWithoutRef<typeof Menu.ScrollView> & { children: React.ReactNode }
) => {
  return <Menu.ScrollView {...props} />;
};

DropdownMenuScrollView.displayName = (Menu.ScrollView as any).displayName || "DropdownMenuScrollView";
export type DropdownMenuScrollViewProps = React.ComponentPropsWithoutRef<typeof Menu.ScrollView> & {
  children: React.ReactNode;
};

/**
 * Submenu container managing nested flyout menu state and interaction.
 * Coordinates secondary popovers attached to cascading submenu triggers.
 */
export const DropdownMenuSub = (props: React.ComponentPropsWithoutRef<typeof Menu.Sub>) => {
  return <Menu.Sub {...props} />;
};

DropdownMenuSub.displayName = (Menu.Sub as any).displayName || "ExpoUISub";
export type DropdownMenuSubProps = React.ComponentPropsWithoutRef<typeof Menu.Sub>;

/**
 * Menu item triggering the opening of a cascading nested submenu.
 * Opens nested submenu content on hover or keyboard selection.
 */
export const DropdownMenuSubTrigger = ({
  children,
  textValue: textValueProp,
  ...props
}: DropdownMenuSubTriggerProps) => {
  const textValue =
    textValueProp ??
    (typeof children === "string"
      ? children
      : React.Children.toArray(children)
          .filter((child) => typeof child === "string" || typeof child === "number")
          .join(""));

  return (
    <Menu.SubTrigger
      textValue={textValue}
      borderRadius="$sm"
      paddingHorizontal="$2"
      paddingVertical="$1.5"
      focusStyle={{
        backgroundColor: "$accent",
      }}
      pressStyle={{
        backgroundColor: "$accent",
      }}
      {...props}
    >
      {children}
    </Menu.SubTrigger>
  );
};

DropdownMenuSubTrigger.displayName = (Menu.SubTrigger as any).displayName || "ExpoUISubTrigger";
export type DropdownMenuSubTriggerProps = React.ComponentPropsWithoutRef<typeof Menu.SubTrigger>;

/**
 * Flyout content card rendering nested submenu items and actions.
 * Positioned relative to its triggering sub-menu entry.
 */
export const DropdownMenuSubContent = (props: React.ComponentPropsWithoutRef<typeof Menu.SubContent>) => {
  return (
    <Menu.SubContent
      backgroundColor="$popover"
      borderRadius="$md"
      borderWidth="$px"
      borderColor="$border"
      elevation="$3"
      padding="$1"
      minWidth={180}
      {...props}
    />
  );
};

DropdownMenuSubContent.displayName = (Menu.SubContent as any).displayName || "ExpoUISubContent";
export type DropdownMenuSubContentProps = React.ComponentPropsWithoutRef<typeof Menu.SubContent>;

/**
 * Text indicator displaying keyboard shortcuts aligned to the right of menu items.
 * Rendered with muted typography and wide tracking for quick scanning.
 */
export const DropdownMenuShortcut = styled(SizableText, {
  name: "DropdownMenuShortcut",
  marginLeft: "auto",
  fontSize: "$xs",
  color: "$mutedForeground",
  letterSpacing: 1,
});

DropdownMenuShortcut.displayName = "DropdownMenuShortcut";
export type DropdownMenuShortcutProps = GetProps<typeof DropdownMenuShortcut>;

/**
 * Composite DropdownMenu component wrapping @tamagui/menu according to Tamagui docs.
 * Provides selectable list in a popover with nested submenus and keyboard navigation.
 */
export const DropdownMenu = withStaticProperties(DropdownMenuRoot, {
  Trigger: DropdownMenuTrigger,
  Portal: DropdownMenuPortal,
  Content: DropdownMenuContent,
  Item: DropdownMenuItem,
  ItemTitle: DropdownMenuItemTitle,
  ItemSubtitle: DropdownMenuItemSubtitle,
  ItemIcon: DropdownMenuItemIcon,
  ItemImage: DropdownMenuItemImage,
  Group: DropdownMenuGroup,
  CheckboxItem: DropdownMenuCheckboxItem,
  RadioGroup: DropdownMenuRadioGroup,
  RadioItem: DropdownMenuRadioItem,
  ItemIndicator: DropdownMenuItemIndicator,
  Label: DropdownMenuLabel,
  Separator: DropdownMenuSeparator,
  Arrow: DropdownMenuArrow,
  ScrollView: DropdownMenuScrollView,
  Sub: DropdownMenuSub,
  SubTrigger: DropdownMenuSubTrigger,
  SubContent: DropdownMenuSubContent,
  Shortcut: DropdownMenuShortcut,
});

DropdownMenu.displayName = "DropdownMenu";
export type DropdownMenuProps = React.ComponentPropsWithoutRef<typeof DropdownMenuRoot>;
