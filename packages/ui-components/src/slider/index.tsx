import { styled, withStaticProperties } from "@tamagui/core";
import { Slider as TamaguiSlider } from "@tamagui/slider";
import type { SliderProps as TamaguiSliderProps } from "@tamagui/slider";
import React from "react";

export type SliderSize = "sm" | "default" | "lg";

/**
 * Base slider root coordinating range values, track layout, and thumb positions.
 * Supports horizontal or vertical orientation with default and custom sizes.
 */
export const SliderRoot = ({
  size = "default",
  value,
  defaultValue,
  min = 0,
  max = 100,
  disabled,
  children,
  ...props
}: SliderProps) => {
  const values = React.useMemo(() => {
    if (Array.isArray(value)) return value;
    if (Array.isArray(defaultValue)) return defaultValue;
    if (typeof value === "number") return [value];
    if (typeof defaultValue === "number") return [defaultValue];
    return [min];
  }, [value, defaultValue, min]);

  return (
    <TamaguiSlider value={value} defaultValue={defaultValue} min={min} max={max} disabled={disabled} {...props}>
      {children || (
        <>
          <SliderTrack size={size} disabled={disabled}>
            <SliderTrackActive />
          </SliderTrack>
          {values.map((_, index) => (
            <SliderThumb key={index} index={index} size={"$3"} />
          ))}
        </>
      )}
    </TamaguiSlider>
  );
};

SliderRoot.displayName = "SliderRoot";
export type SliderRootProps = React.ComponentProps<typeof SliderRoot>;

const SliderTrackFrame = styled(TamaguiSlider.Track, {
  name: "SliderTrack",
  backgroundColor: "$muted",
  borderRadius: "$full",
  overflow: "hidden",
  width: "100%",
  height: "$1",

  variants: {
    size: {
      default: {
        height: "$1",
      },
      sm: {
        height: "$0.5",
      },
      lg: {
        height: "$1.5",
      },
    },
  } as const,

  defaultVariants: {
    size: "default",
  },
});
SliderTrackFrame.displayName = "SliderTrack";

export const SliderTrack = ({ disabled, ...props }: SliderTrackProps) => {
  return <SliderTrackFrame disabled={disabled} opacity={disabled ? 0.5 : 1} {...props} />;
};

SliderTrack.displayName = "SliderTrack";
export type SliderTrackProps = React.ComponentPropsWithoutRef<typeof SliderTrackFrame>;

const SliderTrackActiveFrame = styled(TamaguiSlider.TrackActive, {
  name: "SliderTrackActive",
  backgroundColor: "$primary",
  height: "100%",
});
SliderTrackActiveFrame.displayName = "SliderTrackActive";

export const SliderTrackActive = ({ ...props }: SliderTrackActiveProps) => {
  return <SliderTrackActiveFrame {...props} />;
};

SliderTrackActive.displayName = "SliderTrackActive";
export type SliderTrackActiveProps = React.ComponentPropsWithoutRef<typeof SliderTrackActiveFrame>;

const SliderThumbFrame = styled(TamaguiSlider.Thumb, {
  name: "SliderThumb",
  circular: true,
  width: "$3",
  height: "$3",
  backgroundColor: "$white",
  borderWidth: "$px",
  borderColor: "$ring",
  elevation: "$1",

  focusVisibleStyle: {
    borderColor: "$ring",
    outlineColor: "$ring",
    outlineWidth: "$0.5",
    outlineStyle: "solid",
  },
});
SliderThumbFrame.displayName = "SliderThumb";

export const SliderThumb = ({ ...props }: SliderThumbProps) => {
  return <SliderThumbFrame {...props} />;
};

SliderThumb.displayName = "SliderThumb";
export type SliderThumbProps = React.ComponentPropsWithoutRef<typeof SliderThumbFrame>;

/**
 * Range slider component styled after shadcn UI specification.
 * Automatically renders track, active range, and thumb elements for values.
 */
export const Slider = withStaticProperties(SliderRoot, {
  Track: SliderTrack,
  TrackActive: SliderTrackActive,
  Thumb: SliderThumb,
});

Slider.displayName = "Slider";
export type SliderProps = Omit<TamaguiSliderProps, "size"> & {
  size?: SliderSize;
};
