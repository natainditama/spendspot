"use client";
import { createLink } from "@gluestack-ui/core/link/creator";
import { Pressable, Text } from "react-native";
import { type VariantProps, tva, withStyleContext } from "@gluestack-ui/utils/nativewind-utils";
import React from "react";
export const UILink = createLink({
  Root: withStyleContext(Pressable),
  Text: Text,
});

/**
 * Interactive pressable anchor container styles handling focus rings and
 * disabled states. Formats focus-visible outlines and dimmed opacity levels for
 * web and mobile.
 */
const linkStyle = tva({
  base: "group/link web:outline-0 data-[disabled=true]:web:cursor-not-allowed data-[focus-visible=true]:web:ring-2 data-[focus-visible=true]:web:ring-indicator-primary data-[focus-visible=true]:web:outline-0 data-[disabled=true]:opacity-4 ",
});

/**
 * Text styling variant generator for hyperlinks across diverse font size
 * scales. Applies underline decorations, hover color transitions, and
 * typography variants.
 */
const linkTextStyle = tva({
  base: "underline text-primary data-[hover=true]:text-primary/80 data-[hover=true]:no-underline data-[active=true]:text-destructive/80 font-normal font-body web:font-sans web:tracking-sm web:my-0 web:bg-transparent web:border-0 web:box-border web:inline web:list-none web:m-0 web:p-0 web:relative web:text-start web:whitespace-pre-wrap web:break-words",

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
    size: {
      "2xs": "text-2xs",
      xs: "text-xs",
      sm: "text-sm",
      md: "text-base",
      lg: "text-lg",
      xl: "text-xl",
      "2xl": "text-2xl",
      "3xl": "text-3xl",
      "4xl": "text-4xl",
      "5xl": "text-5xl",
      "6xl": "text-6xl",
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

type ILinkProps = React.ComponentProps<typeof UILink> & VariantProps<typeof linkStyle> & { className?: string };

/**
 * Accessible navigational link container forwarding press and navigation
 * gestures. Integrates style contexts for interactive states across web and
 * mobile platforms.
 */
const Link = React.forwardRef<React.ComponentRef<typeof UILink>, ILinkProps>(function Link(
  { className, ...props },
  ref
) {
  return <UILink ref={ref} {...props} className={linkStyle({ class: className })} />;
});

type ILinkTextProps = React.ComponentProps<typeof UILink.Text> &
  VariantProps<typeof linkTextStyle> & { className?: string };

/**
 * Hyperlink text component rendering accessible anchored typography. Supports
 * theme-aware color variants, size tiers, and interactive hover feedback.
 */
const LinkText = React.forwardRef<React.ComponentRef<typeof UILink.Text>, ILinkTextProps>(function LinkText(
  { className, size = "md", ...props },
  ref
) {
  return (
    <UILink.Text
      ref={ref}
      {...props}
      className={linkTextStyle({
        class: className,
        size,
      })}
    />
  );
});

Link.displayName = "Link";
LinkText.displayName = "LinkText";

export { Link, LinkText };
