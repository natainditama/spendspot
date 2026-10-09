import { styled, withStaticProperties } from "@tamagui/core";
import type { GetProps } from "@tamagui/core";
import { XStack, YStack } from "@tamagui/stacks";
import { SizableText } from "@tamagui/text";
import React from "react";

import { Separator } from "../separator";

const ItemGroupFrame = styled(YStack, {
  name: "ItemGroup",
  width: "100%",
  flexDirection: "column",
  gap: "$4",

  variants: {
    size: {
      default: {
        gap: "$4",
      },
      sm: {
        gap: "$2.5",
      },
      xs: {
        gap: "$2",
      },
    },
  } as const,

  defaultVariants: {
    size: "default",
  },
});
ItemGroupFrame.displayName = "ItemGroup";

/**
 * Vertical list container grouping related Item components with uniform spacing.
 * Supports default, small, and extra-small gap tokens matching list density.
 */
export const ItemGroup = (props: ItemGroupProps) => {
  return <ItemGroupFrame {...props} />;
};

ItemGroup.displayName = "ItemGroup";
export type ItemGroupProps = GetProps<typeof ItemGroupFrame>;

const ItemSeparatorFrame = styled(Separator, {
  name: "ItemSeparator",
  marginVertical: "$2",
});
ItemSeparatorFrame.displayName = "ItemSeparator";

/**
 * Horizontal rule dividing structured items within an ItemGroup container.
 * Inherits standard separator border color and compact vertical margins.
 */
export const ItemSeparator = (props: ItemSeparatorProps) => {
  return <ItemSeparatorFrame {...props} />;
};

ItemSeparator.displayName = "ItemSeparator";
export type ItemSeparatorProps = GetProps<typeof ItemSeparatorFrame>;

const ItemFrame = styled(XStack, {
  name: "Item",
  width: "100%",
  flexDirection: "row",
  alignItems: "center",
  borderRadius: "$md",
  borderWidth: "$px",
  outlineStyle: "none",

  variants: {
    variant: {
      default: {
        borderColor: "transparent",
        backgroundColor: "transparent",
      },
      outline: {
        borderColor: "$border",
        backgroundColor: "transparent",
      },
      muted: {
        borderColor: "transparent",
        backgroundColor: "$muted",
      },
    },
    size: {
      default: {
        gap: "$2.5",
        paddingHorizontal: "$3",
        paddingVertical: "$2.5",
      },
      sm: {
        gap: "$2.5",
        paddingHorizontal: "$3",
        paddingVertical: "$2",
      },
      xs: {
        gap: "$2",
        paddingHorizontal: "$2.5",
        paddingVertical: "$1.5",
      },
    },
  } as const,

  defaultVariants: {
    variant: "default",
    size: "default",
  },
});
ItemFrame.displayName = "Item";

/**
 * Standard structured row container organizing media, content, titles, and actions.
 * Supports default, outline, and muted surface styling with size variants.
 */
export const ItemRoot = (props: ItemProps) => {
  return <ItemFrame {...props} />;
};

ItemRoot.displayName = "ItemRoot";
export type ItemProps = GetProps<typeof ItemFrame>;

const ItemMediaFrame = styled(XStack, {
  name: "ItemMedia",
  flexShrink: 0,
  alignItems: "center",
  justifyContent: "center",
  gap: "$2",

  variants: {
    variant: {
      default: {
        backgroundColor: "transparent",
      },
      icon: {
        width: "$4",
        height: "$4",
      },
      image: {
        width: "$10",
        height: "$10",
        borderRadius: "$sm",
        overflow: "hidden",
      },
    },
  } as const,

  defaultVariants: {
    variant: "default",
  },
});
ItemMediaFrame.displayName = "ItemMedia";

/**
 * Leading media container for icons, avatars, or thumbnail illustrations.
 * Provides standardized sizing variants for icon and image presentation.
 */
export const ItemMedia = (props: ItemMediaProps) => {
  return <ItemMediaFrame {...props} />;
};

ItemMedia.displayName = "ItemMedia";
export type ItemMediaProps = GetProps<typeof ItemMediaFrame>;

const ItemContentFrame = styled(YStack, {
  name: "ItemContent",
  flex: 1,
  flexDirection: "column",
  gap: "$0.5",
});
ItemContentFrame.displayName = "ItemContent";

/**
 * Middle flexible content stack containing item title and descriptive text.
 * Expands to take available horizontal space between media and actions.
 */
export const ItemContent = (props: ItemContentProps) => {
  return <ItemContentFrame {...props} />;
};

ItemContent.displayName = "ItemContent";
export type ItemContentProps = GetProps<typeof ItemContentFrame>;

const ItemTitleFrame = styled(SizableText, {
  name: "ItemTitle",
  fontSize: "$sm",
  lineHeight: "$sm",
  fontWeight: "500",
  color: "$foreground",
  numberOfLines: 1,
});
ItemTitleFrame.displayName = "ItemTitleFrame";

/**
 * Primary single-line title text identifying the item or setting row.
 * Styled with medium font weight and foreground color typography.
 */
export const ItemTitle = (props: ItemTitleProps) => {
  return <ItemTitleFrame {...props} />;
};

ItemTitle.displayName = "ItemTitle";
export type ItemTitleProps = GetProps<typeof ItemTitleFrame>;

const ItemDescriptionFrame = styled(SizableText, {
  name: "ItemDescription",
  fontSize: "$sm",
  lineHeight: "$sm",
  color: "$mutedForeground",
  numberOfLines: 2,
});
ItemDescriptionFrame.displayName = "ItemDescriptionFrame";

/**
 * Secondary summary text explaining details or status of the item.
 * Supports truncation at two lines with muted-foreground color.
 */
export const ItemDescription = (props: ItemDescriptionProps) => {
  return <ItemDescriptionFrame {...props} />;
};

ItemDescription.displayName = "ItemDescription";
export type ItemDescriptionProps = GetProps<typeof ItemDescriptionFrame>;

const ItemActionsFrame = styled(XStack, {
  name: "ItemActions",
  alignItems: "center",
  gap: "$2",
  marginLeft: "auto",
});
ItemActionsFrame.displayName = "ItemActionsFrame";

/**
 * Trailing actions container for switches, chevrons, badges, or buttons.
 * Aligns horizontally to the right end of the item row container.
 */
export const ItemActions = (props: ItemActionsProps) => {
  return <ItemActionsFrame {...props} />;
};

ItemActions.displayName = "ItemActions";
export type ItemActionsProps = GetProps<typeof ItemActionsFrame>;

const ItemHeaderFrame = styled(XStack, {
  name: "ItemHeader",
  width: "100%",
  alignItems: "center",
  justifyContent: "space-between",
  gap: "$2",
});
ItemHeaderFrame.displayName = "ItemHeaderFrame";

/**
 * Top row within a multi-row item layout for metadata and section badges.
 * Stretches across the item width with space-between distribution.
 */
export const ItemHeader = (props: ItemHeaderProps) => {
  return <ItemHeaderFrame {...props} />;
};

ItemHeader.displayName = "ItemHeader";
export type ItemHeaderProps = GetProps<typeof ItemHeaderFrame>;

const ItemFooterFrame = styled(XStack, {
  name: "ItemFooter",
  width: "100%",
  alignItems: "center",
  justifyContent: "space-between",
  gap: "$2",
});
ItemFooterFrame.displayName = "ItemFooterFrame";

/**
 * Bottom row within a multi-row item layout for timestamps or footer links.
 * Stretches across the item width with space-between distribution.
 */
export const ItemFooter = (props: ItemFooterProps) => {
  return <ItemFooterFrame {...props} />;
};

ItemFooter.displayName = "ItemFooter";
export type ItemFooterProps = GetProps<typeof ItemFooterFrame>;

/**
 * Composite Item component for structured lists, settings rows, and cards.
 * Supports compound syntax as well as flat individual named sub-component exports.
 */
export const Item = withStaticProperties(ItemRoot, {
  Media: ItemMedia,
  Content: ItemContent,
  Title: ItemTitle,
  Description: ItemDescription,
  Actions: ItemActions,
  Group: ItemGroup,
  Separator: ItemSeparator,
  Header: ItemHeader,
  Footer: ItemFooter,
});
Item.displayName = "Item";
