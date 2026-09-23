import React from "react";
import { Paragraph as TamaguiParagraph, styled } from "tamagui";

export const Text = styled(TamaguiParagraph, {
  name: "Text",
  fontFamily: "$body",
  color: "$color",
  variants: {
    size: {
      "2xs": { fontSize: 10, lineHeight: 14 },
      xs: { fontSize: "$1", lineHeight: "$1" },
      sm: { fontSize: "$2", lineHeight: "$2" },
      md: { fontSize: "$3", lineHeight: "$3" },
      lg: { fontSize: "$4", lineHeight: "$4" },
      xl: { fontSize: "$5", lineHeight: "$5" },
      "2xl": { fontSize: "$6", lineHeight: "$6" },
      "3xl": { fontSize: "$7", lineHeight: "$7" },
      "4xl": { fontSize: "$8", lineHeight: "$8" },
      "5xl": { fontSize: "$9", lineHeight: "$9" },
      "6xl": { fontSize: "$10", lineHeight: "$10" },
    },
    bold: {
      true: { fontWeight: "bold" },
    },
    italic: {
      true: { fontStyle: "italic" },
    },
    underline: {
      true: { textDecorationLine: "underline" },
    },
    strikeThrough: {
      true: { textDecorationLine: "line-through" },
    },
    highlight: {
      true: { backgroundColor: "$yellow4" },
    },
    sub: {
      true: { fontSize: 10, lineHeight: 12 },
    },
    isTruncated: {
      true: {
        numberOfLines: 1,
        ellipsizeMode: "tail",
      },
    },
  } as const,
  defaultVariants: {
    size: "md",
  },
});

export type TextProps = React.ComponentProps<typeof Text>;
export default Text;
