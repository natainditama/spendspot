import React from "react";
import { Card as TamaguiCard, styled } from "tamagui";

export const Card = styled(TamaguiCard, {
  name: "Card",
  backgroundColor: "$card",
  borderColor: "$borderColor",
  borderWidth: 1,
  borderRadius: "$4",
  padding: "$4",
  variants: {
    size: {
      sm: { padding: "$2", borderRadius: "$2" },
      md: { padding: "$4", borderRadius: "$4" },
      lg: { padding: "$6", borderRadius: "$6" },
      default: { padding: "$4", borderRadius: "$4" },
    },
    variant: {
      default: {
        shadowColor: "$shadowColor",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 2,
      },
      elevated: {
        shadowColor: "$shadowColor",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 2,
      },
      outline: {
        borderWidth: 1,
      },
      ghost: {
        borderWidth: 0,
        backgroundColor: "transparent",
      },
      filled: {
        backgroundColor: "$secondary",
      },
    },
  } as const,
  defaultVariants: {
    size: "default",
    variant: "default",
  },
});

export type CardProps = React.ComponentProps<typeof Card>;
export default Card;
