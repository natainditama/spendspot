import React, { forwardRef } from "react";
import { Linking } from "react-native";
import { Paragraph, styled, View } from "tamagui";

const StyledLinkView = styled(View, {
  name: "Link",
  role: "link",
  pressStyle: {
    opacity: 0.7,
  },
});

export interface LinkProps extends Omit<React.ComponentPropsWithoutRef<typeof StyledLinkView>, "role"> {
  href?: string;
  isExternal?: boolean;
  className?: string;
}

export const Link = forwardRef<React.ElementRef<typeof StyledLinkView>, LinkProps>(function Link(
  { href, isExternal, onPress, children, ...props },
  ref
) {
  const handlePress = (e: any) => {
    if (href) {
      Linking.openURL(href).catch(() => {});
    }
    onPress?.(e);
  };

  return (
    <StyledLinkView ref={ref} onPress={handlePress} {...props}>
      {children}
    </StyledLinkView>
  );
});

export interface LinkTextProps extends Omit<React.ComponentPropsWithoutRef<typeof Paragraph>, "size"> {
  size?: "2xs" | "xs" | "sm" | "md" | "lg" | "xl" | string;
  className?: string;
}

const LINK_TEXT_SIZE_MAP: Record<string, number> = {
  "2xs": 10,
  xs: 12,
  sm: 14,
  md: 16,
  lg: 18,
  xl: 20,
};

export const LinkText = forwardRef<React.ElementRef<typeof Paragraph>, LinkTextProps>(function LinkText(
  { size = "md", children, color = "$primary", ...props },
  ref
) {
  const fontSize = typeof size === "number" ? size : (LINK_TEXT_SIZE_MAP[size] ?? 14);

  return (
    <Paragraph ref={ref} color={color as any} fontSize={fontSize} textDecorationLine="underline" {...props}>
      {children}
    </Paragraph>
  );
});

export default Link;
