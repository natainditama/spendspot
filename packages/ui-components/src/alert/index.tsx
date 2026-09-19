"use client";

import React from "react";
import { createAlert } from "@gluestack-ui/core/alert/creator";
import { UIIcon } from "@gluestack-ui/core/icon/creator";
import { tva, useStyleContext, withStyleContext, VariantProps } from "@gluestack-ui/utils/nativewind-utils";
import { styled } from "nativewind";
import { Text, View } from "react-native";

const SCOPE = "ALERT";

/**
 * Variant style configuration for the root Alert container box. Establishes
 * status color treatments, borders, and flex layout alignments.
 */
const alertStyle = tva({
  base: "rounded-lg border px-2.5 py-2 flex-row gap-2 items-start ",
  variants: {
    variant: {
      default: "bg-card border-border",
      destructive: "bg-card border-destructive",
    },
  },
});

/**
 * Typographic style configuration for Alert message descriptions. Applies
 * high-contrast foreground colors tailored to the active variant.
 */
const alertTextStyle = tva({
  base: "font-medium tracking-tight text-sm flex-1",
  parentVariants: {
    variant: {
      default: "text-card-foreground",
      destructive: "text-destructive",
    },
  },
});

/**
 * Dimension and color variant styling for Alert status icons. Enforces
 * standardized glyph sizing and semantic palette coordination.
 */
const alertIconStyle = tva({
  base: "fill-none w-4 h-4 mt-0.5",
  parentVariants: {
    variant: {
      default: "text-card-foreground",
      destructive: "text-destructive",
    },
  },
});

const StyledUIIcon = styled(UIIcon, {
  className: "style",
});

/**
 * Primitive core alert component generator bound to styling contexts. Composes
 * the primitive root layout, typography, and icon slot primitives.
 */
export const UIAlert = createAlert({
  Root: withStyleContext(View, SCOPE),
  Text: Text,
  Icon: StyledUIIcon,
});

type IAlertProps = Omit<React.ComponentPropsWithoutRef<typeof UIAlert>, "context"> & VariantProps<typeof alertStyle>;

/**
 * Semantic alert banner communicating system feedback or status alerts. Wraps
 * content in accessible containers with default or destructive styling.
 */
const Alert = React.forwardRef<React.ComponentRef<typeof UIAlert>, IAlertProps>(function Alert(
  { className, variant = "default", ...props },
  ref
) {
  return <UIAlert className={alertStyle({ variant, class: className })} context={{ variant }} ref={ref} {...props} />;
});

type IAlertTextProps = React.ComponentPropsWithoutRef<typeof UIAlert.Text> & VariantProps<typeof alertTextStyle>;

/**
 * Text node rendering the primary descriptive message inside an Alert banner.
 * Inherits parent alert variant styles to render matching contextual foreground
 * tones.
 */
const AlertText = React.forwardRef<React.ComponentRef<typeof UIAlert.Text>, IAlertTextProps>(function AlertText(
  { className, ...props },
  ref
) {
  const { variant: parentVariant } = useStyleContext(SCOPE);
  return (
    <UIAlert.Text
      className={alertTextStyle({
        class: className,
        parentVariants: {
          variant: parentVariant,
        },
      })}
      {...props}
      ref={ref}
    />
  );
});

type IAlertIconProps = React.ComponentPropsWithoutRef<typeof UIAlert.Icon> &
  VariantProps<typeof alertIconStyle> & {
    height?: number;
    width?: number;
  };

/**
 * Visual status indicator icon displayed alongside Alert banner text.
 * Automatically synchronizes glyph fill colors with the surrounding alert
 * theme.
 */
const AlertIcon = React.forwardRef<React.ComponentRef<typeof UIAlert.Icon>, IAlertIconProps>(function AlertIcon(
  { className, ...props },
  ref
) {
  const { variant: parentVariant } = useStyleContext(SCOPE);
  return (
    <UIAlert.Icon
      className={alertIconStyle({
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

Alert.displayName = "Alert";
AlertText.displayName = "AlertText";
AlertIcon.displayName = "AlertIcon";

export { Alert, AlertIcon, AlertText };
