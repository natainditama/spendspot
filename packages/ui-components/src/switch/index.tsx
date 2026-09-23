import React, { forwardRef } from "react";
import { Switch as TamaguiSwitch, styled } from "tamagui";

const StyledTamaguiSwitch = styled(TamaguiSwitch, {
  name: "Switch",
  backgroundColor: "$backgroundHover",
  borderWidth: 2,
  borderColor: "transparent",
  focusStyle: {
    outlineWidth: 2,
    outlineColor: "$color",
  },

  variants: {
    checked: {
      true: {
        backgroundColor: "$color",
      },
    },
  } as const,
});

export interface SwitchProps extends Omit<
  React.ComponentPropsWithoutRef<typeof StyledTamaguiSwitch>,
  "value" | "size"
> {
  className?: string;
  value?: boolean;
  onValueChange?: (val: boolean) => void;
  size?: "sm" | "md" | "lg";
}

const SIZE_MAP = {
  sm: "$2",
  md: "$3",
  lg: "$4",
} as const;

/** Accessible toggle switch allowing users to alternate between binary states. */
export const Switch = forwardRef<React.ElementRef<typeof StyledTamaguiSwitch>, SwitchProps>(function Switch(
  { value, onValueChange, checked, onCheckedChange, size = "md", ...props },
  ref
) {
  const isChecked = value !== undefined ? value : checked;
  const handleCheckedChange = (next: boolean) => {
    onCheckedChange?.(next);
    onValueChange?.(next);
  };

  const tamaguiSize = SIZE_MAP[size] ?? "$3";

  return (
    <StyledTamaguiSwitch
      ref={ref}
      size={tamaguiSize as any}
      checked={isChecked}
      onCheckedChange={handleCheckedChange}
      {...props}
    >
      <TamaguiSwitch.Thumb backgroundColor="$background" />
    </StyledTamaguiSwitch>
  );
});

Switch.displayName = "Switch";
