"use client";
import React from "react";
import { Platform, View } from "react-native";
import { type VariantProps, tva } from "@gluestack-ui/utils/nativewind-utils";

/**
 * Visual separator style variant generator supporting horizontal and vertical
 * orientations. Sets 1px hairline dimensions and theme-aware muted background
 * coloring.
 */
const dividerStyle = tva({
  base: "bg-border",
  variants: {
    orientation: {
      vertical: "w-px h-full",
      horizontal: "h-px w-auto",
    },
  },
});

type IUIDividerProps = React.ComponentPropsWithoutRef<typeof View> & VariantProps<typeof dividerStyle>;

/**
 * Accessible hairline separator element for segmenting interface sections.
 * Configures role separator semantics and directional orientation styles.
 */
const Divider = React.forwardRef<React.ComponentRef<typeof View>, IUIDividerProps>(function Divider(
  { className, orientation = "horizontal", ...props },
  ref
) {
  return (
    <View
      ref={ref}
      {...props}
      aria-orientation={orientation}
      role={Platform.OS === "web" ? "separator" : undefined}
      className={dividerStyle({
        orientation,
        class: className,
      })}
    />
  );
});

Divider.displayName = "Divider";

export { Divider };
