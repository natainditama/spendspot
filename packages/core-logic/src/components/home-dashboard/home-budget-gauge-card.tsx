import React from "react";
import { useTranslation } from "react-i18next";

import { XStack, YStack, ZStack } from "@spendspot/ui-components/stacks";
import { Paragraph, SizableText } from "@spendspot/ui-components/typography";

import { formatCurrency, type CurrencyCode } from "../../lib/utils/format-currency";

interface HomeBudgetGaugeCardProps {
  spentToday?: number;
  dailyCap?: number;
  currency?: CurrencyCode;
  onDismissWarning?: () => void;
}

/**
 * Hero Card for Screen 04 Home Dashboard displaying the real-time circular budget ring,
 * spent vs limit metrics, and remaining daily allowance pill badge.
 * Streamlined to core financial metrics without cognitive overload.
 */
export const HomeBudgetGaugeCard = ({
  spentToday = 68000,
  dailyCap = 100000,
  currency = "IDR",
}: HomeBudgetGaugeCardProps) => {
  const { t } = useTranslation("home-dashboard");

  const remaining = Math.max(0, dailyCap - spentToday);
  const formattedSpent = formatCurrency(spentToday, currency);
  const formattedCap = formatCurrency(dailyCap, currency);
  const formattedRemaining = formatCurrency(remaining, currency);

  const GAUGE_SIZE = 180;
  const STROKE_WIDTH = 14;
  const RADIUS = GAUGE_SIZE / 2;

  // Dynamic circular progress angles calculated from spentToday and dailyCap
  const clampedPercent = Math.max(0, Math.min(100, dailyCap > 0 ? (spentToday / dailyCap) * 100 : 0));
  const firstHalfRotation = clampedPercent > 50 ? 180 : (clampedPercent / 50) * 180;
  const secondHalfRotation = clampedPercent > 50 ? ((clampedPercent - 50) / 50) * 180 : 0;

  return (
    <YStack
      gap="$4"
      padding="$5"
      width="100%"
      borderRadius="$5"
      borderWidth="$px"
      borderColor="$border"
      backgroundColor="$card"
      alignItems="center"
    >
      {/* Circular Budget Ring Meter */}
      <ZStack
        width={GAUGE_SIZE}
        height={GAUGE_SIZE}
        alignItems="center"
        justifyContent="center"
        accessibilityRole="progressbar"
        accessibilityValue={{ min: 0, max: dailyCap, now: spentToday }}
      >
        {/* Background Track Circle */}
        <YStack
          position="absolute"
          width={GAUGE_SIZE}
          height={GAUGE_SIZE}
          borderRadius={RADIUS}
          borderWidth={STROKE_WIDTH}
          borderColor="$gaugeBackground"
        />

        {/* Right Semicircle Progress Clip (0% - 50%) */}
        {clampedPercent > 0 && (
          <YStack position="absolute" top={0} left={RADIUS} width={RADIUS} height={GAUGE_SIZE} overflow="hidden">
            <YStack
              position="absolute"
              top={0}
              left={-RADIUS}
              width={GAUGE_SIZE}
              height={GAUGE_SIZE}
              borderRadius={RADIUS}
              borderWidth={STROKE_WIDTH}
              borderColor="transparent"
              borderTopColor="$foreground"
              borderLeftColor="$foreground"
              transform={[{ rotate: `${firstHalfRotation - 45}deg` }]}
            />
          </YStack>
        )}

        {/* Left Semicircle Progress Clip (50% - 100%) */}
        {clampedPercent > 50 && (
          <YStack position="absolute" top={0} left={0} width={RADIUS} height={GAUGE_SIZE} overflow="hidden">
            <YStack
              position="absolute"
              top={0}
              left={0}
              width={GAUGE_SIZE}
              height={GAUGE_SIZE}
              borderRadius={RADIUS}
              borderWidth={STROKE_WIDTH}
              borderColor="transparent"
              borderTopColor="$foreground"
              borderRightColor="$foreground"
              transform={[{ rotate: `${45 + secondHalfRotation}deg` }]}
            />
          </YStack>
        )}

        {/* Center Spending Metric Display */}
        <YStack gap={1} alignItems="center" justifyContent="center">
          <Paragraph size="$1" fontWeight="700" color="$mutedForeground" letterSpacing={1} numberOfLines={1}>
            {t("hero.spentTodayLabel")}
          </Paragraph>
          <SizableText size="$7" fontWeight="800" color="$foreground" letterSpacing={-0.5} numberOfLines={1}>
            {formattedSpent}
          </SizableText>
          <Paragraph size="$1" fontWeight="600" color="$mutedForeground" letterSpacing={0} numberOfLines={1}>
            {t("hero.dailyCapLabel", { amount: formattedCap, defaultValue: `Daily Cap: ${formattedCap}` })}
          </Paragraph>
        </YStack>
      </ZStack>

      {/* Remaining Daily Allowance Pill Badge */}
      <XStack
        gap="$2"
        alignItems="center"
        borderRadius="$full"
        paddingVertical="$1.5"
        paddingHorizontal="$3.5"
        backgroundColor="$secondary"
      >
        {/* <YStack width={6} height={6} borderRadius="$full" backgroundColor="$foreground" /> */}
        <SizableText size="$2" fontWeight="600" color="$foreground">
          {t("hero.remainingToday", {
            amount: formattedRemaining,
            defaultValue: `${formattedRemaining} remaining today`,
          })}
        </SizableText>
      </XStack>
    </YStack>
  );
};

HomeBudgetGaugeCard.displayName = "HomeBudgetGaugeCard";
