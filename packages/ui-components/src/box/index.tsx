import React from "react";
import { View, ViewProps } from "react-native";

import type { VariantProps } from "@gluestack-ui/utils/nativewind-utils";
import { boxStyle } from "./styles";

type IBoxProps = ViewProps & VariantProps<typeof boxStyle> & { className?: string };

/**
 * Universal layout container primitive rendering a styled React Native View.
 * Provides a standardized baseline for flex alignments, padding, and theme
 * classes.
 */
const Box = React.forwardRef<React.ComponentRef<typeof View>, IBoxProps>(function Box({ className, ...props }, ref) {
  return <View ref={ref} {...props} className={boxStyle({ class: className })} />;
});

Box.displayName = "Box";
export { Box };
