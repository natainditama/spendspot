import React from "react";
import { Slider as TamaguiSlider, styled } from "tamagui";

export interface SliderProps extends React.ComponentPropsWithoutRef<typeof TamaguiSlider> {
  className?: string;
  orientation?: "horizontal" | "vertical";
  isReversed?: boolean;
}

/**
 * Interactive slider allowing users to select numeric values across a bounded
 * range.
 */
export const Slider = styled(TamaguiSlider, {
  name: "Slider",
  defaultValue: [0],
  max: 100,
  step: 1,
  orientation: "horizontal",
  width: "100%",
});

export const SliderTrack = styled(TamaguiSlider.Track, {
  name: "SliderTrack",
  backgroundColor: "$backgroundHover",
  borderRadius: 9999,
  height: 6,
});

export const SliderFilledTrack = styled(TamaguiSlider.TrackActive, {
  name: "SliderFilledTrack",
  backgroundColor: "$color",
  borderRadius: 9999,
});

export const SliderThumb = styled(TamaguiSlider.Thumb, {
  name: "SliderThumb",
  index: 0,
  circular: true,
  size: "$2",
  backgroundColor: "$background",
  borderWidth: 2,
  borderColor: "$color",
});

Slider.displayName = "Slider";
SliderTrack.displayName = "SliderTrack";
SliderFilledTrack.displayName = "SliderFilledTrack";
SliderThumb.displayName = "SliderThumb";
