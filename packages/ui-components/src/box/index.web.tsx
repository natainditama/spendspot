import React from "react";
import { boxStyle } from "./styles";

import type { VariantProps } from "@gluestack-ui/utils/nativewind-utils";

type IBoxProps = React.ComponentPropsWithoutRef<"div"> & VariantProps<typeof boxStyle> & { className?: string };

/**
 * Web-optimized Box primitive rendering an accessible semantic HTML div
 * element. Applies normalized layout resets and Tailwind styling for browser
 * environments.
 */
const Box = React.forwardRef<HTMLDivElement, IBoxProps>(function Box({ className, ...props }, ref) {
  return <div ref={ref} className={boxStyle({ class: className })} {...props} />;
});

Box.displayName = "Box";
export { Box };
