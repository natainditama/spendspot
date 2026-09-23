import React, { forwardRef } from "react";
import { Separator, styled } from "tamagui";

const StyledSeparator = styled(Separator, {
  name: "Divider",
  borderColor: "$borderColor",
  marginVertical: "$2",
});

export interface DividerProps extends React.ComponentPropsWithoutRef<typeof StyledSeparator> {
  orientation?: "horizontal" | "vertical";
  className?: string;
}

export const Divider = forwardRef<React.ElementRef<typeof StyledSeparator>, DividerProps>(function Divider(
  { orientation = "horizontal", vertical, ...props },
  ref
) {
  const isVertical = vertical ?? orientation === "vertical";
  return <StyledSeparator ref={ref} vertical={isVertical} {...props} />;
});

export default Divider;
