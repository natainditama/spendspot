import React from "react";
import type { VariantProps } from "@gluestack-ui/utils/nativewind-utils";
import { View, type ViewProps } from "react-native";
import { hstackStyle } from "./styles";

type IHStackProps = ViewProps & VariantProps<typeof hstackStyle>;

/**
 * Mobile horizontal flexbox container aligning child views in a row. Handles
 * gap spacing scales and reverse order layout transitions.
 */
const HStack = React.forwardRef<React.ComponentRef<typeof View>, IHStackProps>(function HStack(
  { className, space, reversed, ...props },
  ref
) {
  return (
    <View
      className={hstackStyle({
        space,
        reversed: reversed as boolean,
        class: className,
      })}
      {...props}
      ref={ref}
    />
  );
});

HStack.displayName = "HStack";

export { HStack };
