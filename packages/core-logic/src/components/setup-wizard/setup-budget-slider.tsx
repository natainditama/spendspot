import React from "react";
import { useTranslation } from "react-i18next";

import { Slider } from "@spendspot/ui-components/slider";
import { XStack, YStack } from "@spendspot/ui-components/stacks";
import { Paragraph, SizableText } from "@spendspot/ui-components/typography";

import { formatCurrency, type CurrencyCode } from "../../lib/utils/format-currency";

interface SetupBudgetSliderProps {
  currency: CurrencyCode;
  dailyCap: number;
  minCap?: number;
  maxCap?: number;
  stepCap?: number;
  onChangeDailyCap: (value: number) => void;
}

/**
 * Streamlined Commute & Daily Spending Limit card.
 * Summarized to essential elements: daily limit display, interactive slider,
 * and estimated monthly cap preview without cognitive overwhelm.
 */
export const SetupBudgetSlider = ({
  currency,
  dailyCap,
  minCap = 20000,
  maxCap = 500000,
  stepCap = 5000,
  onChangeDailyCap,
}: SetupBudgetSliderProps) => {
  const { t } = useTranslation("setup-wizard");

  const monthlyCap = dailyCap * 25;
  const formattedDaily = formatCurrency(dailyCap, currency);
  const formattedMonthly = formatCurrency(monthlyCap, currency);

  const handleValueChange = (values: number[]) => {
    if (values && values.length > 0 && typeof values[0] === "number") {
      onChangeDailyCap(values[0]);
    }
  };

  return (
    <YStack
      gap="$3.5"
      width="100%"
      padding="$4"
      borderWidth="$px"
      borderRadius="$4"
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
        min={minCap}
        max={maxCap}
        step={stepCap}
        width="100%"
      />

      {/* Estimated Monthly Cap Summary */}
      <XStack justifyContent="space-between" alignItems="center" width="100%" paddingTop="$1">
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
