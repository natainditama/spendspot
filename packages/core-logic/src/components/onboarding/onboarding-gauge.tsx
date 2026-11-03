import React from "react";

import { YStack, ZStack } from "@spendspot/ui-components/stacks";
import { SizableText } from "@spendspot/ui-components/typography";

export interface OnboardingGaugeProps {
  percentage: string;
  label: string;
}

/**
 * Grouped circular progress meter rendering a 65% active progress arc along the bottom and sides,
 * leaving the 35% empty gap centered at the TOP of the circle as requested in Google Stitch slide 2.
 * Uses pure Stacks with theme tokens from themes.ts without any hardcoded colors or StyleSheet.create.
 */
export const OnboardingGauge = ({ percentage, label }: OnboardingGaugeProps) => {
  const GAUGE_SIZE = 136;
  const STROKE_WIDTH = 12;
  const RADIUS = GAUGE_SIZE / 2;

  return (
    <ZStack
      width={GAUGE_SIZE}
      height={GAUGE_SIZE}
      alignItems="center"
      justifyContent="center"
      accessibilityRole="progressbar"
      accessibilityValue={{ min: 0, max: 100, now: 65 }}
    >
      {/* Background full circular track (reveals 35% empty gap at the top) */}
      <YStack
        position="absolute"
        width={GAUGE_SIZE}
        height={GAUGE_SIZE}
        borderRadius={RADIUS}
        borderWidth={STROKE_WIDTH}
        borderColor="$gaugeBackground"
      />

      {/* Active progress arc segment 1: Right and bottom arc rotated to cover 63° to 243° */}
      <YStack
        position="absolute"
        width={GAUGE_SIZE}
        height={GAUGE_SIZE}
        borderRadius={RADIUS}
        borderWidth={STROKE_WIDTH}
        borderColor="transparent"
        borderRightColor="$gaugeProgress"
        borderBottomColor="$gaugeProgress"
        transform={[{ rotate: "18deg" }]}
      />

      {/* Active progress arc segment 2: Bottom and left arc rotated to cover 117° to 297° */}
      <YStack
        position="absolute"
        width={GAUGE_SIZE}
        height={GAUGE_SIZE}
        borderRadius={RADIUS}
        borderWidth={STROKE_WIDTH}
        borderColor="transparent"
        borderBottomColor="$gaugeProgress"
        borderLeftColor="$gaugeProgress"
        transform={[{ rotate: "-18deg" }]}
      />

      {/* Center percentage and metric label */}
      <YStack gap={0} alignItems="center" justifyContent="center">
        <SizableText size="$8" fontWeight="800" color="$foreground" numberOfLines={1}>
          {percentage}
        </SizableText>
        <SizableText size="$1" fontWeight="600" color="$mutedForeground" numberOfLines={1}>
          {label}
        </SizableText>
      </YStack>
    </ZStack>
  );
};

OnboardingGauge.displayName = "OnboardingGauge";
