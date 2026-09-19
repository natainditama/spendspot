import { View, ViewProps } from "react-native";
import React from "react";
import { centerStyle } from "./styles";
import type { VariantProps } from "@gluestack-ui/utils/nativewind-utils";

type ICenterProps = ViewProps & VariantProps<typeof centerStyle>;

/**
 * Layout primitive centering children horizontally and vertically via flexbox.
 * Useful for loading states, empty state banners, and focal graphical
 * elements.
 */
const Center = React.forwardRef<React.ComponentRef<typeof View>, ICenterProps>(function Center(
  { className, ...props },
  ref
) {
  return <View className={centerStyle({ class: className })} {...props} ref={ref} />;
});

Center.displayName = "Center";

export { Center };
