import { styled } from "@tamagui/core";
import type { GetProps } from "@tamagui/core";
import { Switch as TamaguiSwitch } from "@tamagui/switch";
import React from "react";

const SwitchFrame = styled(TamaguiSwitch, {
  name: "Switch",
  borderRadius: "$full",
  borderWidth: "$px",
  borderColor: "transparent",
  backgroundColor: "$input",

  focusVisibleStyle: {
    borderColor: "$ring",
    outlineColor: "$ring",
    outlineWidth: "$0.5",
    outlineStyle: "solid",
  },

  variants: {
    checked: {
      true: {
        backgroundColor: "$primary",
      },
      false: {
        backgroundColor: "$input",
      },
    },
    invalid: {
      true: {
        borderColor: "$destructive",
        focusVisibleStyle: {
          borderColor: "$destructive",
          outlineColor: "$destructiveRing",
          outlineWidth: "$0.5",
          outlineStyle: "solid",
        },
      },
    },
    size: {
      default: {
        height: "$5.5",
        width: "$11",
        minHeight: "$5.5",
      },
      sm: {
        height: "$4.5",
        width: "$9",
        minHeight: "$4.5",
      },
    },
    disabled: {
      true: {
        opacity: 0.5,
        pointerEvents: "none",
      },
    },
  } as const,

  defaultVariants: {
    size: "default",
  },
});
SwitchFrame.displayName = "Switch";

const SwitchThumbFrame = styled(TamaguiSwitch.Thumb, {
  name: "SwitchThumb",
  backgroundColor: "$background",
  borderRadius: "$full",

  variants: {
    size: {
      default: {
        width: "$5",
        height: "$5",
      },
      sm: {
        width: "$4",
        height: "$4",
      },
    },
  } as const,

  defaultVariants: {
    size: "default",
  },
});
SwitchThumbFrame.displayName = "SwitchThumb";

/**
 * Toggle switch component styled after shadcn UI specification.
 * Supports default and sm sizes, invalid/disabled states, and token-based theming.
 */
export const Switch = ({ size = "default", invalid, checked, defaultChecked, ...props }: SwitchProps) => {
  return (
    <SwitchFrame size={size} invalid={invalid} checked={checked} defaultChecked={defaultChecked} {...props}>
      <SwitchThumbFrame size={size} />
    </SwitchFrame>
  );
};

Switch.displayName = "Switch";
export type SwitchProps = GetProps<typeof SwitchFrame> & {
  invalid?: boolean;
  size?: "default" | "sm";
};
