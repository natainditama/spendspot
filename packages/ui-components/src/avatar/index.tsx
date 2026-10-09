import {
  Avatar as TamaguiAvatar,
  AvatarFallback as TamaguiAvatarFallback,
  AvatarImage as TamaguiAvatarImage,
} from "@tamagui/avatar";
import { styled, withStaticProperties } from "@tamagui/core";
import { XStack } from "@tamagui/stacks";
import { SizableText } from "@tamagui/text";
import React from "react";

export type AvatarSize = "sm" | "default" | "lg";
interface AvatarContextValue {
  size: AvatarSize;
}

const AvatarContext = React.createContext<AvatarContextValue>({ size: "default" });
const AVATAR_SIZES = {
  sm: "$6", // size-6 = 24px
  default: "$8", // size-8 = 32px
  lg: "$10", // size-10 = 40px
} as const;

/**
 * Circular avatar container with size variants matching shadcn UI sizing scale.
 * Renders children (AvatarImage + AvatarFallback) within a clipped rounded frame.
 */
export const AvatarRoot = ({ size = "default", children, ...props }: AvatarProps) => {
  const dim = AVATAR_SIZES[size];

  return (
    <AvatarContext.Provider value={{ size }}>
      <TamaguiAvatar
        circular
        size={dim}
        borderWidth="$px"
        borderColor="$border"
        overflow="visible"
        borderRadius="$full"
        {...props}
      >
        {children}
      </TamaguiAvatar>
    </AvatarContext.Provider>
  );
};

AvatarRoot.displayName = "AvatarRoot";
export type AvatarRootProps = React.ComponentPropsWithoutRef<typeof TamaguiAvatar>;

/**
 * Avatar image that fills the circular container with aspect-square cover fit.
 * Falls back to AvatarFallback when the image source fails to load.
 */
export const AvatarImage = ({ ...props }: AvatarImageProps) => {
  return <TamaguiAvatarImage width="100%" height="100%" borderRadius="$full" {...props} />;
};

AvatarImage.displayName = "AvatarImage";
export type AvatarImageProps = React.ComponentPropsWithoutRef<typeof TamaguiAvatarImage>;

const AvatarFallbackFrame = styled(TamaguiAvatarFallback, {
  name: "AvatarFallback",
  width: "100%",
  height: "100%",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "$muted",
  borderRadius: "$full",
});
AvatarFallbackFrame.displayName = "AvatarFallbackFrame";

/**
 * Fallback content displayed when the avatar image cannot be loaded.
 * Shows initials or an icon with muted background and foreground text color.
 */
export const AvatarFallback = ({ children, ...props }: AvatarFallbackProps) => {
  const { size } = React.useContext(AvatarContext);
  const fontSize = size === "sm" ? "$xs" : "$sm";

  const renderedChildren = React.Children.map(children, (child) => {
    if (typeof child === "string" || typeof child === "number") {
      return (
        <SizableText
          color="$mutedForeground"
          fontSize={fontSize}
          lineHeight={fontSize}
          fontWeight="500"
          userSelect="none"
        >
          {child}
        </SizableText>
      );
    }
    return child;
  });

  return <AvatarFallbackFrame {...props}>{renderedChildren}</AvatarFallbackFrame>;
};

AvatarFallback.displayName = "AvatarFallback";
export type AvatarFallbackProps = React.ComponentPropsWithoutRef<typeof AvatarFallbackFrame>;

/**
 * Status badge overlaid at the bottom-right of an Avatar.
 * Sized proportionally to the parent Avatar size token.
 */
export const AvatarBadge = ({ children, ...props }: AvatarBadgeProps) => {
  const { size } = React.useContext(AvatarContext);
  const badgeDim = size === "sm" ? ("$2" as const) : size === "lg" ? ("$3" as const) : ("$2.5" as const);

  return (
    <XStack
      position="absolute"
      right={0}
      bottom={0}
      zIndex={10}
      width={badgeDim}
      height={badgeDim}
      borderRadius="$full"
      backgroundColor="$primary"
      alignItems="center"
      justifyContent="center"
      borderWidth="$0.5"
      borderColor="$background"
      {...props}
    >
      {children}
    </XStack>
  );
};

AvatarBadge.displayName = "AvatarBadge";
export type AvatarBadgeProps = React.ComponentPropsWithoutRef<typeof XStack>;

/**
 * Horizontally overlapping group of Avatar components with negative spacing.
 * Each child Avatar renders a ring border to separate them visually.
 */
export const AvatarGroup = ({ children, ...props }: AvatarGroupProps) => {
  return (
    <XStack flexDirection="row" alignItems="center" {...props}>
      {React.Children.map(children, (child, index) => {
        if (!React.isValidElement(child)) return child;
        return React.cloneElement(child as React.ReactElement<any>, {
          ...(index > 0 && { marginLeft: "$-2" }),
          borderWidth: "$0.5",
          borderColor: "$background",
        });
      })}
    </XStack>
  );
};

AvatarGroup.displayName = "AvatarGroup";
export type AvatarGroupProps = React.ComponentPropsWithoutRef<typeof XStack>;

/**
 * Overflow count badge shown when an AvatarGroup has more members than visible.
 * Matches the size of sibling Avatar components in the group.
 */
export const AvatarGroupCount = ({ size = "default", children, ...props }: AvatarGroupCountProps) => {
  const dim = AVATAR_SIZES[size];
  const fontSize = size === "sm" ? "$xs" : "$sm";

  return (
    <XStack
      width={dim}
      height={dim}
      borderRadius="$full"
      backgroundColor="$muted"
      alignItems="center"
      justifyContent="center"
      borderWidth="$0.5"
      borderColor="$background"
      marginLeft="$-2"
      {...props}
    >
      {typeof children === "string" || typeof children === "number" ? (
        <SizableText
          color="$mutedForeground"
          fontSize={fontSize}
          lineHeight={fontSize}
          fontWeight="500"
          userSelect="none"
        >
          {children}
        </SizableText>
      ) : (
        children
      )}
    </XStack>
  );
};

AvatarGroupCount.displayName = "AvatarGroupCount";
export type AvatarGroupCountProps = React.ComponentPropsWithoutRef<typeof XStack> & {
  size?: AvatarSize;
};

/**
 * Composite Avatar component with Image, Fallback, Badge, Group, and GroupCount sub-components.
 * Follows shadcn UI Avatar specification with token-based sizing and theming.
 */
export const Avatar = withStaticProperties(AvatarRoot, {
  Image: AvatarImage,
  Fallback: AvatarFallback,
  Badge: AvatarBadge,
  Group: AvatarGroup,
  GroupCount: AvatarGroupCount,
});

Avatar.displayName = "Avatar";
export type AvatarProps = Omit<React.ComponentPropsWithoutRef<typeof TamaguiAvatar>, "size"> & {
  size?: AvatarSize;
};
