import React from "react";
import { styled, View } from "tamagui";

export const Pressable = styled(View, {
  name: "Pressable",
  pressStyle: {
    opacity: 0.8,
  },
});

export type PressableProps = React.ComponentProps<typeof Pressable>;
export default Pressable;
