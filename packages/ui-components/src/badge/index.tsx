import React, { forwardRef } from "react";
import { styled, Text as TamaguiText, View, XStack } from "tamagui";

export const Badge = styled(XStack, {
  name: "Badge",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: 9999,
  paddingHorizontal: "$2.5",
  paddingVertical: "$1",
  variants: {
    size: {
      sm: { paddingHorizontal: "$2", paddingVertical: "$0.5" },
      md: { paddingHorizontal: "$2.5", paddingVertical: "$1" },
      lg: { paddingHorizontal: "$3", paddingVertical: "$1.5" },
    },
    variant: {
      default: { backgroundColor: "$primary" },
      solid: { backgroundColor: "$primary" },
      secondary: { backgroundColor: "$secondary" },
      destructive: { backgroundColor: "$red9" },
      outline: { borderWidth: 1, borderColor: "$borderColor", backgroundColor: "transparent" },
      subtle: { backgroundColor: "$secondary" },
    },
    action: {
      primary: { backgroundColor: "$primary" },
      secondary: { backgroundColor: "$secondary" },
      success: { backgroundColor: "$green9" },
      warning: { backgroundColor: "$yellow9" },
      error: { backgroundColor: "$red9" },
      info: { backgroundColor: "$blue9" },
      muted: { backgroundColor: "$gray5" },
    },
  } as const,
  defaultVariants: {
    size: "md",
    variant: "subtle",
  },
});

export const BadgeText = styled(TamaguiText, {
  name: "BadgeText",
  fontSize: "$2",
  fontWeight: "600",
  color: "$color",
});

export interface BadgeIconProps extends Omit<React.ComponentPropsWithoutRef<typeof View>, "as"> {
  as?: React.ComponentType<any>;
  size?: number | string;
  color?: string;
  className?: string;
}

export const BadgeIcon = forwardRef<React.ElementRef<typeof View>, BadgeIconProps>(function BadgeIcon(
  { as: Component, size = 12, color, children, ...props },
  ref
) {
  const numericSize = typeof size === "number" ? size : 12;

  if (Component) {
    return (
      <View ref={ref} marginRight="$1" {...props}>
        <Component size={numericSize} width={numericSize} height={numericSize} color={color} />
      </View>
    );
  }

  return (
    <View ref={ref} marginRight="$1" {...props}>
      {children}
    </View>
  );
});

export type BadgeProps = React.ComponentProps<typeof Badge>;
export default Badge;
