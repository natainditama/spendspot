import React from "react";
import { cardStyle } from "./styles";
import type { VariantProps } from "@gluestack-ui/utils/nativewind-utils";

type ICardProps = React.ComponentPropsWithoutRef<"div"> &
  VariantProps<typeof cardStyle> & {
    className?: string;
    size?: "default" | "sm";
  };

/**
 * Web-optimized surface Card rendering a semantic HTML div with card styling.
 * Establishes consistent borders, corner rounding, and responsive padding on
 * web.
 */
const Card = React.forwardRef<HTMLDivElement, ICardProps>(function Card(
  { className, size = "default", ...props },
  ref
) {
  return <div className={cardStyle({ size, class: className })} {...props} ref={ref} />;
});

Card.displayName = "Card";

export { Card };
