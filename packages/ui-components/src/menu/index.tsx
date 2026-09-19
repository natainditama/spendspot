"use client";
import { createMenu } from "@gluestack-ui/core/menu/creator";
import { type VariantProps, tva } from "@gluestack-ui/utils/nativewind-utils";
import { styled } from "nativewind";
import React from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import Animated, { FadeOut, ZoomIn } from "react-native-reanimated";

const AnimatedView = Animated.createAnimatedComponent(ScrollView);

/**
 * Popover container styles defining surface elevations and border boundaries.
 * Provides floating menu background colors, rounded radii, and max height
 * constraints.
 */
const menuStyle = tva({
  base: "rounded-md bg-popover text-popover-foreground border border-border p-1 shadow-hard-5 max-h-[300px] overflow-y-auto",
});

/**
 * Interactive menu row styles configuring hover, active, and focus highlights.
 * Enforces minimum width targets and accessible focus-visible outlines.
 */
const menuItemStyle = tva({
  base: "min-w-[200px] p-3 flex-row items-center rounded data-[hover=true]:bg-accent data-[hover=true]:text-accent-foreground data-[active=true]:bg-accent data-[active=true]:text-accent-foreground data-[focus=true]:bg-accent data-[focus=true]:text-accent-foreground data-[focus=true]:web:outline-none data-[focus=true]:web:outline-0 data-[disabled=true]:opacity-40 data-[disabled=true]:web:cursor-not-allowed data-[focus-visible=true]:web:outline-2 data-[focus-visible=true]:web:outline-ring data-[focus-visible=true]:web:outline data-[focus-visible=true]:web:cursor-pointer data-[disabled=true]:data-[focus=true]:bg-transparent",
});

/**
 * Full-screen backdrop touch responder style generator for dismissable menus.
 * Spans viewport dimensions to capture outside clicks and touch interactions.
 */
const menuBackdropStyle = tva({
  base: "absolute top-0 bottom-0 left-0 right-0 web:cursor-default",
});

/**
 * Hairline divider style variant generator separating menu groups. Renders a
 * subtle 1px border dividing functional sections of menu items.
 */
const menuSeparatorStyle = tva({
  base: "bg-border h-px w-full",
});

/**
 * Typography style variant generator for menu item label text. Configures font
 * weights, truncation behaviors, and thematic colors.
 */
const menuItemLabelStyle = tva({
  base: "text-popover-foreground font-normal font-body",

  variants: {
    isTruncated: {
      true: "web:truncate",
    },
    bold: {
      true: "font-bold",
    },
    underline: {
      true: "underline",
    },
    strikeThrough: {
      true: "line-through",
    },
    sub: {
      true: "text-xs",
    },
    italic: {
      true: "italic",
    },
    highlight: {
      true: "bg-yellow-500",
    },
  },
});

const BackdropPressable = React.forwardRef<
  React.ComponentRef<typeof Pressable>,
  React.ComponentPropsWithoutRef<typeof Pressable> & VariantProps<typeof menuBackdropStyle>
>(function BackdropPressable({ className, ...props }, ref) {
  return (
    <Pressable
      ref={ref}
      className={menuBackdropStyle({
        class: className,
      })}
      {...props}
    />
  );
});

type IMenuItemProps = VariantProps<typeof menuItemStyle> & {
  className?: string;
} & React.ComponentPropsWithoutRef<typeof Pressable>;

const Item = React.forwardRef<React.ComponentRef<typeof Pressable>, IMenuItemProps>(function Item(
  { className, ...props },
  ref
) {
  return (
    <Pressable
      ref={ref}
      className={menuItemStyle({
        class: className,
      })}
      {...props}
    />
  );
});

const Separator = React.forwardRef<
  React.ComponentRef<typeof View>,
  React.ComponentPropsWithoutRef<typeof View> & VariantProps<typeof menuSeparatorStyle>
>(function Separator({ className, ...props }, ref) {
  return <View ref={ref} className={menuSeparatorStyle({ class: className })} {...props} />;
});

const StyledAnimatedView = styled(AnimatedView as any, {
  className: "style",
});
export const UIMenu = createMenu({
  Root: StyledAnimatedView,
  Item: Item,
  Label: Text,
  Backdrop: BackdropPressable,
  Separator: Separator,
});

type IMenuProps = React.ComponentProps<typeof UIMenu> & VariantProps<typeof menuStyle> & { className?: string };
type IMenuItemLabelProps = React.ComponentProps<typeof UIMenu.ItemLabel> &
  VariantProps<typeof menuItemLabelStyle> & { className?: string };

/**
 * Floating dropdown menu container animating entrance zoom and exit fades.
 * Houses contextual list items with scrolling boundaries and keyboard
 * navigation.
 */
const Menu = React.forwardRef<React.ComponentRef<typeof UIMenu>, IMenuProps>(function Menu(
  { className, ...props },
  ref
) {
  return (
    <UIMenu
      entering={ZoomIn.duration(150).withInitialValues({
        transform: [{ scale: 0.9 }],
        opacity: 0,
      } as any)}
      exiting={FadeOut.duration(150)}
      ref={ref}
      className={menuStyle({
        class: className,
      })}
      {...(props as any)}
    />
  );
});

/**
 * Interactive menu option item responding to hover, selection, and keyboard
 * focus. Supports active selection indicators, custom icons, and disabled
 * states.
 */
const MenuItem = UIMenu.Item;

/**
 * Label text component displayed within an individual menu selection row.
 * Formats typographic weight, truncation, and highlighted styling modifiers.
 */
const MenuItemLabel = React.forwardRef<React.ComponentRef<typeof UIMenu.ItemLabel>, IMenuItemLabelProps>(
  function MenuItemLabel(
    { className, isTruncated, bold, underline, strikeThrough, sub, italic, highlight, ...props },
    ref
  ) {
    return (
      <UIMenu.ItemLabel
        ref={ref}
        className={menuItemLabelStyle({
          isTruncated: isTruncated as boolean,
          bold: bold as boolean,
          underline: underline as boolean,
          strikeThrough: strikeThrough as boolean,
          sub: sub as boolean,
          italic: italic as boolean,
          highlight: highlight as boolean,
          class: className,
        })}
        {...props}
      />
    );
  }
);

/**
 * Visual horizontal hairline divider separating discrete groups of menu
 * options. Renders a subtle divider stroke across the entire width of the
 * dropdown menu.
 */
const MenuSeparator = UIMenu.Separator;

Menu.displayName = "Menu";
MenuItem.displayName = "MenuItem";
MenuItemLabel.displayName = "MenuItemLabel";
MenuSeparator.displayName = "MenuSeparator";
export { Menu, MenuItem, MenuItemLabel, MenuSeparator };
