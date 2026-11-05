import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { ScrollView } from "react-native";

import { Button } from "@spendspot/ui-components/button";
import { YStack } from "@spendspot/ui-components/stacks";
import { Paragraph, SizableText } from "@spendspot/ui-components/typography";

import {
  CURRENCY_BUDGET_CONFIG,
  DEFAULT_CURRENCY,
  DEFAULT_WORKING_DAYS_PER_MONTH,
} from "../../constants/budget-configs";
import type { CurrencyCode } from "../../lib/utils/format-currency";
import { SetupBudgetSlider } from "./setup-budget-slider";
import { SetupCurrencySelector } from "./setup-currency-selector";
import { SetupPrivacyCard } from "./setup-privacy-card";
import type { SetupWizardScreenProps } from "./types";

/**
 * Production-ready Financial Setup Wizard screen based on 03_setup_wizard.png.
 * Configures base currency, daily and commute budget baseline, and background geofencing awareness.
 * Follows industry-standard Tamagui tokens without StyleSheet.create or hardcoded colors.
 */
export const SetupWizardScreen = ({
  initialCurrency = DEFAULT_CURRENCY,
  initialDailyCap,
  onCurrencyChange,
  onDailyCapChange,
  onContinue,
  isLoading = false,
  testID = "setup-wizard-screen",
}: SetupWizardScreenProps) => {
  const { t } = useTranslation("setup-wizard");
  const [currency, setCurrency] = useState<CurrencyCode>(initialCurrency);
  const currentConfig = CURRENCY_BUDGET_CONFIG[currency] ?? CURRENCY_BUDGET_CONFIG.IDR;
  const [dailyCap, setDailyCap] = useState<number>(initialDailyCap ?? currentConfig.defaultDailyCap);

  const handleCurrencySelect = (code: CurrencyCode) => {
    setCurrency(code);
    const newConfig = CURRENCY_BUDGET_CONFIG[code] ?? CURRENCY_BUDGET_CONFIG.IDR;
    setDailyCap(newConfig.defaultDailyCap);
    onCurrencyChange?.(code);
    onDailyCapChange?.(newConfig.defaultDailyCap);
  };

  const handleDailyCapChange = (value: number) => {
    setDailyCap(value);
    onDailyCapChange?.(value);
  };

  const handleContinuePress = () => {
    onContinue?.({
      currency,
      dailyCap,
      monthlyCap: dailyCap * DEFAULT_WORKING_DAYS_PER_MONTH,
    });
  };

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
      nestedScrollEnabled={true}
      keyboardShouldPersistTaps="handled"
      testID={testID}
    >
      <YStack
        flex={1}
        gap="$6"
        paddingVertical="$6"
        paddingHorizontal="$6"
        backgroundColor="$background"
        justifyContent="center"
        alignItems="stretch"
        width="100%"
      >
        {/* Header Section */}
        <YStack gap="$1.5">
          <SizableText
            size="$7"
            fontWeight="800"
            color="$foreground"
            maxWidth="90%"
            letterSpacing={0}
            numberOfLines={1}
          >
            {t("header.title")}
          </SizableText>
          <Paragraph size="$3" fontWeight="400" color="$mutedForeground" letterSpacing={0.2} numberOfLines={2}>
            {t("header.subtitle")}
          </Paragraph>
        </YStack>

        {/* Section 1: Preferred Currency Selector */}
        <SetupCurrencySelector selectedCurrency={currency} onSelectCurrency={handleCurrencySelect} />

        {/* Section 2: Commute & Daily Spending Limit Card */}
        <SetupBudgetSlider
          currency={currency}
          dailyCap={dailyCap}
          minCap={currentConfig.minCap}
          maxCap={currentConfig.maxCap}
          stepCap={currentConfig.stepCap}
          onChangeDailyCap={handleDailyCapChange}
        />

        {/* Section 3: Geofence Privacy Awareness Rationale */}
        <SetupPrivacyCard />

        {/* Bottom Sticky Action Area */}
        <YStack width="100%" marginTop="$2">
          <Button
            width="100%"
            height={50}
            buttonSize="lg"
            variant="primary"
            borderRadius="$4"
            onPress={handleContinuePress}
            disabled={isLoading}
            accessibilityRole="button"
            accessibilityLabel={t("actions.continue")}
          >
            {t("actions.continue")}
          </Button>
        </YStack>
      </YStack>
    </ScrollView>
  );
};

SetupWizardScreen.displayName = "SetupWizardScreen";
