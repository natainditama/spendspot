import React from "react";
import { centerStyle } from "./styles";

import type { VariantProps } from "@gluestack-ui/utils/nativewind-utils";

type ICenterProps = React.ComponentPropsWithoutRef<"div"> & VariantProps<typeof centerStyle>;

/**
 * Web-optimized Center primitive rendering an HTML div with centered flexbox
 * alignment. Normalizes browser box-sizing and centers inner content across
 * both axes.
 */
const Center = React.forwardRef<HTMLDivElement, ICenterProps>(function Center({ className, ...props }, ref) {
  return <div className={centerStyle({ class: className })} {...props} ref={ref} />;
});

Center.displayName = "Center";

export { Center };
