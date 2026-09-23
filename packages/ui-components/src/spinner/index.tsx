import React from "react";
import { Spinner as TamaguiSpinner, styled } from "tamagui";

export interface SpinnerProps extends React.ComponentPropsWithoutRef<typeof TamaguiSpinner> {
  className?: string;
}

/**
 * Spinner component indicating asynchronous operations in progress. Powered by
 * Tamagui Spinner primitive.
 */
export const Spinner = styled(TamaguiSpinner, {
  name: "Spinner",
  size: "small",
  color: "$color",
});

export default Spinner;
