import { styled } from "@tamagui/core";
import type { GetProps } from "@tamagui/core";
import { Label as TamaguiLabel } from "@tamagui/label";

/**
 * Accessible text label paired with input controls, switches, or checkboxes.
 * Styled with medium typography, foreground color, and disabled opacity state.
 */
export const Label = styled(TamaguiLabel, {
  name: "Label",
  color: "$foreground",
  fontSize: "$sm",
  lineHeight: "$sm",
  fontWeight: "500",
  userSelect: "none",
  cursor: "pointer",

  variants: {
    disabled: {
      true: {
        opacity: 0.5,
        pointerEvents: "none",
      },
    },
  } as const,
});

Label.displayName = "Label";
export type LabelProps = GetProps<typeof Label>;
