import React from "react";
import { styled, YStack } from "tamagui";

export const Center = styled(YStack, {
  name: "Center",
  alignItems: "center",
  justifyContent: "center",
});

export type CenterProps = React.ComponentProps<typeof Center>;
export default Center;
