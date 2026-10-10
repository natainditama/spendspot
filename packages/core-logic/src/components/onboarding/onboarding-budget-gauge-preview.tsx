import React from "react";
import { useTranslation } from "react-i18next";

import { Badge } from "@spendspot/ui-components/badge";
import { XStack, YStack, ZStack } from "@spendspot/ui-components/stacks";
import { SizableText } from "@spendspot/ui-components/typography";

interface CircularGaugeGroupProps {
  percentage: string;
  label: string;
}

/**
 * Grouped circular progress meter rendering a 65% active progress arc along the bottom and sides,
 * leaving the 35% empty gap centered at the TOP of the circle as requested.
 * Uses pure Stacks with theme tokens from themes.ts without any hardcoded colors or StyleSheet.create.
 */
const CircularGaugeGroup = ({ percentage, label }: CircularGaugeGroupProps) => {
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

/**
 * Visual card for Slide 2 illustrating daily commute limits with a circular gauge meter.
 * Features top-centered 35% empty gap and 65% active progress arc around the bottom.
 */
export const OnboardingBudgetGaugePreview = () => {
  const { t } = useTranslation("onboarding");

  return (
    <YStack
      padding="$4"
      width="100%"
      height="100%"
      borderWidth="$px"
      overflow="hidden"
      borderRadius="$6"
      position="relative"
      alignItems="center"
      borderColor="$border"
      justifyContent="space-between"
      backgroundColor="$secondary"
      testID="onboarding-budget-gauge-preview"
    >
      {/* Header section with cap indicator & status badge */}
      <YStack gap="$1" alignItems="flex-start" justifyContent="space-between" width="100%" marginTop="$2">
        <XStack gap="$2" alignItems="center" justifyContent="flex-start">
          <YStack width="$2" height="$2" borderRadius="$full" backgroundColor="$success" />
          <SizableText size="$1" fontWeight="700" color="$mutedForeground" letterSpacing={0.2} numberOfLines={1}>
            {t("slides.budget.capLabel")}
          </SizableText>
        </XStack>

        <XStack gap="$0.5" alignItems="baseline" justifyContent="flex-start">
          <SizableText size="$7" fontWeight="800" color="$foreground" numberOfLines={1}>
            {t("slides.budget.spentDisplay")}
          </SizableText>
          <SizableText size="$5" fontWeight="500" color="$mutedForeground" numberOfLines={1}>
            {t("slides.budget.limitDisplay")}
          </SizableText>
        </XStack>
      </YStack>

      {/* Grouped 65% Circular Progress Gauge with top empty gap */}
      <YStack alignItems="center" justifyContent="center" paddingVertical="$2">
        <CircularGaugeGroup percentage={t("slides.budget.gaugePercentage")} label={t("slides.budget.gaugeLabel")} />
      </YStack>

      {/* Safe Buffer Card */}
      <XStack
        gap="$3"
        width="100%"
        padding="$3"
        borderWidth="$px"
        borderRadius="$5"
        alignItems="center"
        borderColor="$border"
        backgroundColor="$card"
        justifyContent="center"
      >
        <YStack flex={1} alignItems="flex-start" justifyContent="center">
          <SizableText size="$2" color="$mutedForeground" letterSpacing={0.2} numberOfLines={1}>
            {t("slides.budget.safeBufferLabel", "Safe Buffer")}
          </SizableText>
          <SizableText size="$4" fontWeight="700" color="$foreground" letterSpacing={0} numberOfLines={1}>
            {t("slides.budget.safeBufferCurrency")}
            {t("slides.budget.safeBufferAmount")}
          </SizableText>
        </YStack>
        <YStack alignItems="center" justifyContent="center">
          <Badge variant="secondary" numberOfLines={1}>
            {t("slides.budget.safeBufferBadge")}
          </Badge>
        </YStack>
      </XStack>
    </YStack>
  );
};

OnboardingBudgetGaugePreview.displayName = "OnboardingBudgetGaugePreview";
