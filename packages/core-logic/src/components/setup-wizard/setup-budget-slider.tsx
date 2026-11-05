import React from "react";
import { useTranslation } from "react-i18next";

import { Slider } from "@spendspot/ui-components/slider";
import { XStack, YStack } from "@spendspot/ui-components/stacks";
import { Paragraph, SizableText } from "@spendspot/ui-components/typography";

import {
  BUDGET_ALERT_THRESHOLD_RATIO,
  CURRENCY_BUDGET_CONFIG,
  DEFAULT_WORKING_DAYS_PER_MONTH,
} from "../../constants/budget-configs";
import { formatCurrency, type CurrencyCode } from "../../lib/utils/format-currency";

export interface SetupBudgetSliderProps {
  currency: CurrencyCode;
  dailyCap: number;
  minCap?: number;
  maxCap?: number;
  stepCap?: number;
  onChangeDailyCap: (value: number) => void;
}

/**
 * Commute & Daily Spending Limit card based on 03_setup_wizard.png.
 * Features large styled daily limit headline, interactive range slider,
 * smart 80% threshold reminder, and estimated monthly cap preview.
 */
export const SetupBudgetSlider = ({
  currency,
  dailyCap,
  minCap,
  maxCap,
  stepCap,
  onChangeDailyCap,
}: SetupBudgetSliderProps) => {
  const { t } = useTranslation("setup-wizard");
  const fallbackConfig = CURRENCY_BUDGET_CONFIG[currency] ?? CURRENCY_BUDGET_CONFIG.IDR;
  const effectiveMinCap = minCap ?? fallbackConfig.minCap;
  const effectiveMaxCap = maxCap ?? fallbackConfig.maxCap;
  const effectiveStepCap = stepCap ?? fallbackConfig.stepCap;

  const monthlyCap = dailyCap * DEFAULT_WORKING_DAYS_PER_MONTH;
  const alertThreshold = dailyCap * BUDGET_ALERT_THRESHOLD_RATIO;
  const formattedDaily = formatCurrency(dailyCap, currency);
  const formattedMonthly = formatCurrency(monthlyCap, currency);
  const formattedThreshold = formatCurrency(alertThreshold, currency);

  const handleValueChange = (values: number[]) => {
    if (values && values.length > 0 && typeof values[0] === "number") {
      onChangeDailyCap(values[0]);
    }
  };

  return (
    <YStack
      gap="$3.5"
      width="100%"
      padding="$5"
      borderWidth="$px"
      borderRadius="$5"
      borderColor="$border"
      backgroundColor="$background"
    >
      {/* Daily Cap & Formatted Amount */}
      <XStack justifyContent="space-between" alignItems="baseline" width="100%">
        <SizableText size="$3" fontWeight="700" color="$foreground" letterSpacing={0.2} numberOfLines={1}>
          {t("budget.dailyCap")}
        </SizableText>
        <XStack alignItems="baseline" gap="$1">
          <SizableText size="$6" fontWeight="800" color="$foreground" letterSpacing={-0.5} numberOfLines={1}>
            {formattedDaily}
          </SizableText>
          <Paragraph size="$2" fontWeight="400" color="$mutedForeground" letterSpacing={0.2} numberOfLines={1}>
            {t("budget.perDay")}
          </Paragraph>
        </XStack>
      </XStack>

      {/* Interactive Range Slider */}
      <Slider
        value={[dailyCap]}
        onValueChange={handleValueChange}
        min={effectiveMinCap}
        max={effectiveMaxCap}
        step={effectiveStepCap}
        width="100%"
        marginTop="$1"
      />

      {/* 80% and 100% Threshold Notice */}
      <Paragraph size="$1" fontWeight="400" color="$mutedForeground" letterSpacing={0.1} numberOfLines={1}>
        {t("budget.alertThreshold", { threshold: formattedThreshold })}
      </Paragraph>

      {/* Estimated Monthly Cap Summary */}
      <XStack
        justifyContent="space-between"
        alignItems="center"
        width="100%"
        paddingTop="$3"
        borderTopWidth="$px"
        borderColor="$border"
      >
        <Paragraph size="$2" fontWeight="400" color="$mutedForeground" letterSpacing={0.1} numberOfLines={1}>
          {t("budget.estimatedMonthlyCap")}
        </Paragraph>
        <SizableText size="$2" fontWeight="700" color="$foreground" letterSpacing={0.2} numberOfLines={1}>
          {formattedMonthly} {t("budget.perMonth")}
        </SizableText>
      </XStack>
    </YStack>
  );
};

SetupBudgetSlider.displayName = "SetupBudgetSlider";
