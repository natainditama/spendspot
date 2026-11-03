import React from "react";
import { useTranslation } from "react-i18next";

import { CheckCircle2 } from "@spendspot/ui-components/icons";
import { Item, ItemActions, ItemContent, ItemDescription, ItemMedia, ItemTitle } from "@spendspot/ui-components/item";
import { XStack, YStack } from "@spendspot/ui-components/stacks";
import { SizableText } from "@spendspot/ui-components/typography";

import { SUPPORTED_CURRENCIES } from "../../constants/supported-currencies";
import type { CurrencyCode } from "../../lib/utils/format-currency";

interface SetupCurrencySelectorProps {
  selectedCurrency: CurrencyCode;
  onSelectCurrency: (code: CurrencyCode) => void;
}

/**
 * 2x2 Grid selector for choosing preferred base currency.
 * Consumes currencies dynamically from supported-currencies configuration and
 * uses design-system Item component primitives with single-selection radio semantics.
 */
export const SetupCurrencySelector = ({ selectedCurrency, onSelectCurrency }: SetupCurrencySelectorProps) => {
  const { t } = useTranslation("setup-wizard");

  const currencyList = Object.values(SUPPORTED_CURRENCIES);
  const row1 = currencyList.slice(0, 2);
  const row2 = currencyList.slice(2, 4);

  const renderCurrencyCard = (curr: (typeof currencyList)[number]) => {
    const isSelected = selectedCurrency === curr.code;

    return (
      <Item
        key={curr.code}
        flex={1}
        height={64}
        borderRadius="$4"
        backgroundColor={isSelected ? "$foreground" : "$secondary"}
        borderColor={isSelected ? "$foreground" : "$border"}
        borderWidth="$px"
        paddingHorizontal="$3.5"
        paddingVertical="$2.5"
        alignItems="center"
        justifyContent="space-between"
        pressStyle={{ opacity: 0.85 }}
        onPress={() => onSelectCurrency(curr.code as CurrencyCode)}
        accessibilityRole="radio"
        accessibilityState={{ selected: isSelected }}
        accessibilityLabel={`${curr.code} ${curr.name}`}
      >
        <ItemMedia>
          <SizableText
            size="$6"
            fontWeight="800"
            color={isSelected ? "$primaryForeground" : "$foreground"}
            letterSpacing={-0.5}
            numberOfLines={1}
          >
            {curr.symbol}
          </SizableText>
        </ItemMedia>

        <ItemContent gap="$0" marginLeft="$2">
          <ItemTitle
            size="$2"
            fontWeight="700"
            color={isSelected ? "$primaryForeground" : "$foreground"}
            letterSpacing={0.5}
            numberOfLines={1}
          >
            {curr.code}
          </ItemTitle>
          <ItemDescription
            size="$1"
            fontWeight="400"
            color={isSelected ? "$primaryForeground" : "$mutedForeground"}
            letterSpacing={0.2}
            numberOfLines={1}
            opacity={isSelected ? 0.8 : 1}
          >
            {t(`currency.${curr.code.toLowerCase()}Name`, curr.name)}
          </ItemDescription>
        </ItemContent>

        {isSelected && (
          <ItemActions>
            <CheckCircle2 size={18} color="$primaryForeground" />
          </ItemActions>
        )}
      </Item>
    );
  };

  return (
    <YStack gap="$2.5" width="100%">
      <SizableText size="$1" fontWeight="700" color="$mutedForeground" letterSpacing={1} numberOfLines={1}>
        {t("currency.sectionTitle")}
      </SizableText>

      <XStack gap="$2.5" width="100%">
        {row1.map(renderCurrencyCard)}
      </XStack>

      <XStack gap="$2.5" width="100%">
        {row2.map(renderCurrencyCard)}
      </XStack>
    </YStack>
  );
};

SetupCurrencySelector.displayName = "SetupCurrencySelector";
