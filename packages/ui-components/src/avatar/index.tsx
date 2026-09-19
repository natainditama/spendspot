"use client";

import React from "react";
import { createAvatar } from "@gluestack-ui/core/avatar/creator";
import { Image, Text, View } from "react-native";
import { tva, withStyleContext, VariantProps } from "@gluestack-ui/utils/nativewind-utils";

const SCOPE = "AVATAR";

/**
 * Core avatar generator wiring circular wrappers, fallback initials, badges,
 * and image layers. Provides accessible visual representation primitives for
 * user profiles and entities.
 */
const UIAvatar = createAvatar({
  Root: withStyleContext(View, SCOPE),
  Badge: View,
  Group: View,
  Image: Image,
  FallbackText: Text,
});

/**
 * Base style definitions for circular avatar bounding containers. Centers inner
 * fallbacks or photos while enabling overlapping negative margins in groups.
 */
const avatarStyle = tva({
  base: "relative flex h-12 w-12 shrink-0 rounded-full bg-muted items-center justify-center group-[.avatar-group]/avatar-group:-ml-2.5",
});

/**
 * Typographic styling for textual fallback initials displayed when photos fail
 * or load. Formats uppercase alphanumeric glyphs with centered font weight and
 * balanced contrast.
 */
const avatarFallbackTextStyle = tva({
  base: "text-foreground text-xs font-medium text-transform:uppercase",
});

/**
 * Horizontal layout container grouping multiple overlapping avatars in
 * sequence. Establishes a reverse z-index stack displaying collective
 * participants or team members.
 */
const avatarGroupStyle = tva({
  base: "group/avatar-group flex-row-reverse relative avatar-group",
});

/**
 * Corner badge indicator styling indicating online presence or active user
 * status. Anchors a prominent indicator ring at the bottom-right perimeter of
 * the avatar circle.
 */
const avatarBadgeStyle = tva({
  base: "absolute h-3 w-3 rounded-full border-2 border-background right-0 bottom-0 bg-green-500",
});

/**
 * Absolute image positioning styles ensuring profile photographs fill the
 * circular frame. Clamps image bounds to match container dimensions with clean
 * border-radius curvature.
 */
const avatarImageStyle = tva({
  base: "h-full w-full rounded-full absolute",
});

type IAvatarProps = Omit<React.ComponentPropsWithoutRef<typeof UIAvatar>, "context"> & VariantProps<typeof avatarStyle>;

/**
 * Root avatar component presenting user profile pictures or initials.
 * Encapsulates responsive sizing, presence indicators, and fallback
 * typography.
 */
const Avatar = React.forwardRef<React.ComponentRef<typeof UIAvatar>, IAvatarProps>(function Avatar(
  { className, ...props },
  ref
) {
  return <UIAvatar ref={ref} {...props} className={avatarStyle({ class: className })} context={{}} />;
});

type IAvatarBadgeProps = React.ComponentPropsWithoutRef<typeof UIAvatar.Badge> & VariantProps<typeof avatarBadgeStyle>;

/**
 * Status indicator badge pinned to the bottom-right corner of the avatar frame.
 * Signals active availability, offline state, or notifications with high
 * contrast.
 */
const AvatarBadge = React.forwardRef<React.ComponentRef<typeof UIAvatar.Badge>, IAvatarBadgeProps>(function AvatarBadge(
  { className, ...props },
  ref
) {
  return <UIAvatar.Badge ref={ref} {...props} className={avatarBadgeStyle({ class: className })} />;
});

type IAvatarFallbackTextProps = React.ComponentPropsWithoutRef<typeof UIAvatar.FallbackText> &
  VariantProps<typeof avatarFallbackTextStyle>;

/**
 * Text node displaying user initials when photo assets are unavailable or
 * loading. Provides accessible, legible text fallbacks rendered in uppercase
 * formatting.
 */
const AvatarFallbackText = React.forwardRef<React.ComponentRef<typeof UIAvatar.FallbackText>, IAvatarFallbackTextProps>(
  function AvatarFallbackText({ className, ...props }, ref) {
    return <UIAvatar.FallbackText ref={ref} {...props} className={avatarFallbackTextStyle({ class: className })} />;
  }
);

type IAvatarImageProps = React.ComponentPropsWithoutRef<typeof UIAvatar.Image> & VariantProps<typeof avatarImageStyle>;

/**
 * Visual bitmap image element displaying user or entity photography. Stretches
 * across the avatar viewport with aspect ratio preservation and rounded
 * masking.
 */
const AvatarImage = React.forwardRef<React.ComponentRef<typeof UIAvatar.Image>, IAvatarImageProps>(function AvatarImage(
  { className, ...props },
  ref
) {
  return (
    <UIAvatar.Image
      ref={ref}
      {...props}
      className={avatarImageStyle({
        class: className,
      })}
      resizeMode="cover"
    />
  );
});

type IAvatarGroupProps = React.ComponentPropsWithoutRef<typeof UIAvatar.Group> & VariantProps<typeof avatarGroupStyle>;

/**
 * Overlapping container grouping multiple avatars into a compact stack layout.
 * Enforces standardized negative margins and reverse z-indexing for neat visual
 * stacking.
 */
const AvatarGroup = React.forwardRef<React.ComponentRef<typeof UIAvatar.Group>, IAvatarGroupProps>(function AvatarGroup(
  { className, ...props },
  ref
) {
  return (
    <UIAvatar.Group
      ref={ref}
      {...props}
      className={avatarGroupStyle({
        class: className,
      })}
    />
  );
});

/**
 * Shadcn compatibility alias mapping AvatarFallback to AvatarFallbackText.
 * Simplifies cross-platform adoption for codebases migrating from web UI
 * standards.
 */
const AvatarFallback = AvatarFallbackText;

export { Avatar, AvatarBadge, AvatarFallback, AvatarFallbackText, AvatarGroup, AvatarImage };
