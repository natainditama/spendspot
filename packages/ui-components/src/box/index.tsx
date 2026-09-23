import React from "react";
import { styled, View } from "tamagui";

export const Box = styled(View, {
  name: "Box",
});

export type BoxProps = React.ComponentProps<typeof Box>;
export default Box;
