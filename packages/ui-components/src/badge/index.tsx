"use client";

import React from "react";
import { PrimitiveIcon, UIIcon } from "@gluestack-ui/core/icon/creator";
import { tva, useStyleContext, withStyleContext, VariantProps } from "@gluestack-ui/utils/nativewind-utils";
import { styled } from "nativewind";
import { Text, View } from "react-native";
import { Svg } from "react-native-svg";

const SCOPE = "BADGE";

/**
 * Root badge container variants configuring pill background and border colors.
 * Standardizes semantic status indicators across default, secondary,
 * destructive, and outline modes.
 */
const badgeStyle = tva({
  base: "flex-row items-center justify-center rounded-sm px-2 py-0.5",
  variants: {
    variant: {
      default: "bg-primary",
      secondary: "bg-secondary",
      destructive: "bg-destructive dark:bg-destructive/60",
      outline: "border border-border dark:border-border/90 bg-transparent",
    },
  },
});

/**
 * Typographic style configuration for badge label copy. Enforces uppercase
 * micro-copy with contextual high-contrast font colors.
 */
const badgeTextStyle = tva({
  base: "text-xs font-medium tracking-normal uppercase",
  parentVariants: {
    variant: {
      default: "text-primary-foreground",
      secondary: "text-secondary-foreground",
      destructive: "text-white",
      outline: "text-foreground",
    },
  },
});

/**
 * Icon container styles for glyphs embedded alongside badge text. Sets
 * standardized micro-dimensions and synchronizes glyph fills with parent
 * variants.
 */
const badgeIconStyle = tva({
  base: "fill-none h-3 w-3 pointer-events-none",
  parentVariants: {
    variant: {
      default: "text-primary-foreground",
      secondary: "text-secondary-foreground",
      destructive: "text-white",
      outline: "text-foreground",
    },
  },
});

const ContextView = withStyleContext(View, SCOPE);

type IBadgeProps = React.ComponentPropsWithoutRef<typeof ContextView> & VariantProps<typeof badgeStyle>;

/**
 * Compact pill badge highlighting status, counts, or entity categories.
 * Encapsulates color variants and coordinates style contexts for inner labels
 * and icons.
 */
function Badge({ children, variant = "default", className, ...props }: { className?: string } & IBadgeProps) {
  return (
    <ContextView className={badgeStyle({ variant, class: className })} {...props} context={{ variant }}>
      {children}
    </ContextView>
  );
}

type IBadgeTextProps = React.ComponentPropsWithoutRef<typeof Text> & VariantProps<typeof badgeTextStyle>;

/**
 * Text node rendering the informational label inside a Badge container. Applies
 * uppercase micro-typography styled in accordance with the parent badge
 * variant.
 */
const BadgeText = React.forwardRef<React.ComponentRef<typeof Text>, IBadgeTextProps>(function BadgeText(
  { children, className, ...props },
  ref
) {
  const { variant: parentVariant } = useStyleContext(SCOPE);
  return (
    <Text
      ref={ref}
      className={badgeTextStyle({
        parentVariants: {
          variant: parentVariant,
        },
        class: className,
      })}
      {...props}
    >
      {children}
    </Text>
  );
});

type IBadgeIconProps = React.ComponentPropsWithoutRef<typeof PrimitiveIcon> &
  VariantProps<typeof badgeIconStyle> & {
    size?: number;
  };

const StyledUIIcon = styled(UIIcon, {
  className: {
    target: "style",
    nativeStyleToProp: {
      height: true,
      width: true,
      fill: true,
      color: "classNameColor",
      stroke: true,
    } as any,
  },
});

/**
 * Graphic icon adornment displayed within a Badge pill. Automatically aligns
 * glyph dimensions and inherits contextual foreground tones.
 */
const BadgeIcon = React.forwardRef<React.ComponentRef<typeof Svg>, IBadgeIconProps>(function BadgeIcon(
  { className, size, ...props },
  ref
) {
  const { variant: parentVariant } = useStyleContext(SCOPE);

  if (typeof size === "number") {
    return <StyledUIIcon ref={ref} {...props} className={badgeIconStyle({ class: className })} size={size} />;
  } else if ((props?.height !== undefined || props?.width !== undefined) && size === undefined) {
    return <StyledUIIcon ref={ref} {...props} className={badgeIconStyle({ class: className })} />;
  }

  return (
    <StyledUIIcon
      className={badgeIconStyle({
        parentVariants: {
          variant: parentVariant,
        },
        class: className,
      })}
      {...props}
      ref={ref}
    />
  );
});

Badge.displayName = "Badge";
BadgeText.displayName = "BadgeText";
BadgeIcon.displayName = "BadgeIcon";

export { Badge, BadgeIcon, BadgeText };
