import { styled } from "@tamagui/core";
import { Sheet } from "@tamagui/sheet";
import type { SheetProps } from "@tamagui/sheet";
import { YStack } from "@tamagui/stacks";
import { SizableText } from "@tamagui/text";
import React from "react";

/**
 * Shadcn UI styled Drawer built on top of Tamagui's Sheet primitive.
 * Bottom sheet with handle, overlay, and composite sub-components.
 */
export const Drawer = ({ children, ...props }: DrawerProps) => {
  return (
    <Sheet
      modal={true}
      position="0"
      zIndex={100_000}
      snapPointsMode="fit"
      unmountChildrenWhenHidden
      {...({
        animation: "quickerLessBouncy",
        transition: "quickerLessBouncy",
      } as any)}
      {...props}
    >
      <Sheet.Overlay
        {...({
          animation: "quickerLessBouncy",
          transition: "quickerLessBouncy",
          enterStyle: { opacity: 0 },
          exitStyle: { opacity: 0 },
        } as any)}
        backgroundColor="$overlay"
        {...props}
      />
      {children}
    </Sheet>
  );
};

Drawer.displayName = "Drawer";
export type DrawerProps = SheetProps;

/**
 * Main content frame of the Drawer with handle, header, body, and footer slots.
 * Renders rounded top corners and a standard drag handle bar.
 */
export const DrawerContent = ({ children, ...props }: React.ComponentPropsWithoutRef<typeof Sheet.Frame>) => {
  return (
    <Sheet.Frame
      backgroundColor="$background"
      borderTopRightRadius="$5"
      borderTopLeftRadius="$5"
      borderColor="$border"
      borderBottomWidth={0}
      paddingBottom="$4"
      borderWidth="$px"
      {...props}
    >
      <Sheet.Handle
        width="$10"
        height="$1"
        alignSelf="center"
        marginVertical="$2"
        borderRadius="$full"
        backgroundColor="$border"
      />
      {children}
    </Sheet.Frame>
  );
};

DrawerContent.displayName = "DrawerContent";
export type DrawerContentProps = React.ComponentPropsWithoutRef<typeof Sheet.Frame>;

/**
 * Header section inside the DrawerContent with vertical padding.
 * Typically contains DrawerTitle and DrawerDescription.
 */
export const DrawerHeader = styled(YStack, {
  name: "DrawerHeader",
  gap: "$0.5",
  paddingHorizontal: "$4",
  paddingVertical: "$4",
});

DrawerHeader.displayName = "DrawerHeader";
export type DrawerHeaderProps = React.ComponentPropsWithoutRef<typeof YStack>;

/**
 * Footer section inside the DrawerContent with vertical padding.
 * Typically contains action buttons stacked vertically.
 */
export const DrawerFooter = styled(YStack, {
  name: "DrawerFooter",
  gap: "$2",
  paddingHorizontal: "$4",
  paddingBottom: "$4",
  marginTop: "auto",
});

DrawerFooter.displayName = "DrawerFooter";
export type DrawerFooterProps = React.ComponentPropsWithoutRef<typeof YStack>;

/**
 * Title text inside the DrawerHeader with base font weight.
 * Styled with foreground color at base font size.
 */
export const DrawerTitle = styled(SizableText, {
  name: "DrawerTitle",
  color: "$foreground",
  fontSize: "$base",
  fontWeight: "500",
  lineHeight: "$base",
});

DrawerTitle.displayName = "DrawerTitle";
export type DrawerTitleProps = React.ComponentPropsWithoutRef<typeof SizableText>;

/**
 * Description text inside the DrawerHeader with muted styling.
 * Styled with muted-foreground color at sm font size.
 */
export const DrawerDescription = styled(SizableText, {
  name: "DrawerDescription",
  color: "$mutedForeground",
  fontSize: "$sm",
  lineHeight: "$sm",
});

DrawerDescription.displayName = "DrawerDescription";
export type DrawerDescriptionProps = React.ComponentPropsWithoutRef<typeof SizableText>;

/**
 * Scrollable area within the Drawer for longer content lists.
 * Inherits Sheet.ScrollView gesture coordination with the sheet.
 */
export const DrawerScrollView = ({ children, ...props }: React.ComponentPropsWithoutRef<typeof Sheet.ScrollView>) => {
  return <Sheet.ScrollView {...props}>{children}</Sheet.ScrollView>;
};

DrawerScrollView.displayName = "DrawerScrollView";
export type DrawerScrollViewProps = React.ComponentPropsWithoutRef<typeof Sheet.ScrollView>;
