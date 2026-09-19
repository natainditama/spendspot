import React from "react";
import type { VariantProps } from "@gluestack-ui/utils/nativewind-utils";
import { hstackStyle } from "./styles";

type IHStackProps = React.ComponentPropsWithoutRef<"div"> & VariantProps<typeof hstackStyle>;

/**
 * Web horizontal flexbox container arranging child elements along a row. Offers
 * predefined spacing tokens and reversible layout ordering.
 */
const HStack = React.forwardRef<React.ComponentRef<"div">, IHStackProps>(function HStack(
  { className, space, reversed, ...props },
  ref
) {
  return (
    <div
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
