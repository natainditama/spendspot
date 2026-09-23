import React from "react";
import { Avatar as TamaguiAvatar, Paragraph, styled, View, XStack } from "tamagui";

export interface AvatarProps extends React.ComponentPropsWithoutRef<typeof TamaguiAvatar> {
  className?: string;
}

/**
 * Avatar component representing user profile images or text initials. Powered
 * by Tamagui styling primitives and circular frames.
 */
export const Avatar = styled(TamaguiAvatar, {
  name: "Avatar",
  position: "relative",
  circular: true,
  overflow: "hidden",
  backgroundColor: "$backgroundHover",
  alignItems: "center",
  justifyContent: "center",
  size: "$4",
});

export const AvatarFallbackText = styled(Paragraph, {
  name: "AvatarFallbackText",
  color: "$color",
  fontWeight: "600",
  textTransform: "uppercase",
  fontSize: "$2",
  userSelect: "none",
});

export const AvatarFallback = AvatarFallbackText;

export const AvatarBadge = styled(View, {
  name: "AvatarBadge",
  position: "absolute",
  right: 0,
  bottom: 0,
  width: 12,
  height: 12,
  borderRadius: 9999,
  borderWidth: 2,
  borderColor: "$background",
  backgroundColor: "$green10",
  zIndex: 10,
});

export const AvatarImage = styled(TamaguiAvatar.Image, {
  name: "AvatarImage",
  width: "100%",
  height: "100%",
});

export const AvatarGroup = styled(XStack, {
  name: "AvatarGroup",
  flexDirection: "row-reverse",
  position: "relative",
  alignItems: "center",
});
