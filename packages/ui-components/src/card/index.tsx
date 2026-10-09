import {
  CardBackground as TamaguiCardBackground,
  CardFooter as TamaguiCardFooter,
  CardFrame as TamaguiCardFrame,
  CardHeader as TamaguiCardHeader,
} from "@tamagui/card";
import { styled, withStaticProperties } from "@tamagui/core";
import type { GetProps } from "@tamagui/core";
import { YStack } from "@tamagui/stacks";
import { SizableText } from "@tamagui/text";
import React from "react";

const CardHeaderFrame = styled(TamaguiCardHeader, {
  name: "CardHeader",
  margin: 0,
  flexDirection: "row",
  alignItems: "flex-start",
  justifyContent: "space-between",
  paddingHorizontal: "$4",
  paddingTop: "$4",
  paddingBottom: "$2",
  gap: "$2",
});
CardHeaderFrame.displayName = "CardHeaderFrame";

/**
 * Top-level card header that automatically arranges CardTitle and CardDescription on
 * the left column while placing optional CardAction in the top-right position.
 */
export const CardHeader = CardHeaderFrame.styleable((props, ref) => {
  const { children, ...rest } = props;
  let actionChild: React.ReactNode = null;
  const otherChildren: React.ReactNode[] = [];

  React.Children.forEach(children, (child) => {
    if (
      React.isValidElement(child) &&
      (child.type === CardAction ||
        (child.type as any)?.displayName === "CardAction" ||
        (child.type as any)?.name === "CardAction")
    ) {
      actionChild = child;
    } else {
      otherChildren.push(child);
    }
  });

  return (
    <CardHeaderFrame ref={ref} {...rest}>
      <YStack flex={1} gap="$1">
        {wrapTextChildren(otherChildren)}
      </YStack>
      {actionChild}
    </CardHeaderFrame>
  );
});

CardHeader.displayName = "CardHeader";
export type CardHeaderProps = GetProps<typeof CardHeader>;

/**
 * Primary title text element inside CardHeader styled with medium-weight typography
 * and aligned with SpendSpot card foreground color definitions.
 */
export const CardTitle = styled(SizableText, {
  name: "CardTitle",
  fontSize: "$base",
  lineHeight: "$base",
  fontWeight: "600",
  color: "$cardForeground",
});

CardTitle.displayName = "CardTitle";
export type CardTitleProps = GetProps<typeof CardTitle>;

/**
 * Secondary descriptive text element beneath CardTitle featuring muted typography
 * and standardized line-height for legible card introductions.
 */
export const CardDescription = styled(SizableText, {
  name: "CardDescription",
  fontSize: "$sm",
  lineHeight: "$sm",
  color: "$mutedForeground",
});

CardDescription.displayName = "CardDescription";
export type CardDescriptionProps = GetProps<typeof CardDescription>;

const CardActionFrame = styled(YStack, {
  name: "CardAction",
  alignSelf: "flex-start",
  justifyContent: "center",
  alignItems: "flex-end",
});
CardActionFrame.displayName = "CardActionFrame";

/**
 * Action slot placed in the top-right corner of CardHeader for buttons or controls.
 * Integrates with CardHeader layout to remain top-aligned and right-justified.
 */
export const CardAction = CardActionFrame.styleable((props, ref) => {
  return (
    <CardActionFrame ref={ref} {...props}>
      {wrapTextChildren(props.children, { color: "$mutedForeground" })}
    </CardActionFrame>
  );
});

CardAction.displayName = "CardAction";
export type CardActionProps = GetProps<typeof CardAction>;

const CardContentFrame = styled(YStack, {
  name: "CardContent",
  margin: 0,
  paddingHorizontal: "$4",
  paddingVertical: "$2",
  paddingBottom: "$4",
});
CardContentFrame.displayName = "CardContentFrame";

/**
 * Primary content body of the card providing standardized horizontal and vertical padding.
 * Automatically wraps raw strings into SizableText nodes to prevent native text crashes.
 */
export const CardContent = CardContentFrame.styleable((props, ref) => {
  return (
    <CardContentFrame ref={ref} {...props}>
      {wrapTextChildren(props.children)}
    </CardContentFrame>
  );
});

CardContent.displayName = "CardContent";
export type CardContentProps = GetProps<typeof CardContent>;

const CardFooterFrame = styled(TamaguiCardFooter, {
  name: "CardFooter",
  opacity: 0.95,
  paddingHorizontal: "$4",
  paddingTop: "$3",
  paddingBottom: "$3",
  borderTopWidth: "$px",
  borderTopColor: "$border",
  alignItems: "center",
  backgroundColor: "$muted",
  flexDirection: "row",
  gap: "$2",
});
CardFooterFrame.displayName = "CardFooterFrame";

/**
 * Bottom action and summary bar featuring a subtle top border and muted background fill.
 * Organizes action buttons, links, or metadata horizontally at the bottom of the card.
 */
export const CardFooter = CardFooterFrame.styleable((props, ref) => {
  return (
    <CardFooterFrame ref={ref} {...props}>
      {wrapTextChildren(props.children, { color: "$mutedForeground" })}
    </CardFooterFrame>
  );
});

CardFooter.displayName = "CardFooter";
export type CardFooterProps = GetProps<typeof CardFooter>;

/**
 * Background layer slot positioned absolutely behind all card content and header elements.
 * Inherits Tamagui CardBackground behavior for images, maps, or decorative gradients.
 */
export const CardBackground = styled(TamaguiCardBackground, {
  name: "CardBackground",
  zIndex: 0,
  padding: 0,
  fullscreen: true,
  overflow: "hidden",
  pointerEvents: "none",
});

CardBackground.displayName = "CardBackground";
export type CardBackgroundProps = GetProps<typeof CardBackground>;

const CardFrame = styled(TamaguiCardFrame, {
  name: "CardFrame",
  margin: 0,
  padding: 0,
  backgroundColor: "$card",
  borderRadius: "$lg",
  borderWidth: "$px",
  borderColor: "$border",
  overflow: "hidden",
  position: "relative",

  variants: {
    size: {
      default: {
        paddingVertical: "$4",
      },
      sm: {
        paddingVertical: "$3",
      },
    },
  } as const,

  defaultVariants: {
    size: "default",
  },
});
CardFrame.displayName = "CardFrame";

const CardComponent = CardFrame.styleable((props, ref) => {
  return (
    <CardFrame ref={ref} {...props} padding={0}>
      {wrapTextChildren(props.children)}
    </CardFrame>
  );
});
CardComponent.displayName = "CardComponent";

/**
 * Composite Card component providing both flat named exports and compound component syntax.
 * Built on top of @tamagui/card and styled according to SpendSpot shadcn UI guidelines.
 */
export const Card = withStaticProperties(CardComponent, {
  Header: CardHeader,
  Title: CardTitle,
  Description: CardDescription,
  Action: CardAction,
  Content: CardContent,
  Footer: CardFooter,
  Background: CardBackground,
});

Card.displayName = "Card";
export type CardProps = GetProps<typeof Card>;

const wrapTextChildren = (children: React.ReactNode, textProps?: React.ComponentProps<typeof SizableText>) => {
  return React.Children.map(children, (child) => {
    if (typeof child === "string" || typeof child === "number") {
      return (
        <SizableText color="$cardForeground" fontSize="$sm" {...textProps}>
          {child}
        </SizableText>
      );
    }

    return child;
  });
};
