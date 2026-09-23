import React from "react";
import { Heading as TamaguiHeading, styled } from "tamagui";

export const Heading = styled(TamaguiHeading, {
  name: "Heading",
  fontFamily: "$heading",
  color: "$color",
  variants: {
    size: {
      xs: { fontSize: "$2", lineHeight: "$2" },
      sm: { fontSize: "$3", lineHeight: "$3" },
      md: { fontSize: "$4", lineHeight: "$4" },
      lg: { fontSize: "$5", lineHeight: "$5" },
      xl: { fontSize: "$6", lineHeight: "$6" },
      "2xl": { fontSize: "$7", lineHeight: "$7" },
      "3xl": { fontSize: "$8", lineHeight: "$8" },
      "4xl": { fontSize: "$9", lineHeight: "$9" },
      "5xl": { fontSize: "$10", lineHeight: "$10" },
      "6xl": { fontSize: "$11", lineHeight: "$11" },
    },
  } as const,
  defaultVariants: {
    size: "xl",
  },
});

export type HeadingProps = React.ComponentProps<typeof Heading>;
export default Heading;
