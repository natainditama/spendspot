import React from "react";
import { useTranslation } from "react-i18next";
import { FlatList, Pressable } from "react-native";

import { Coffee, Fuel, Train } from "@spendspot/ui-components/icons";
import { Item } from "@spendspot/ui-components/item";
import { XStack, YStack } from "@spendspot/ui-components/stacks";
import { SizableText } from "@spendspot/ui-components/typography";

import { formatCurrency, type CurrencyCode } from "../../lib/utils/format-currency";
import type { DashboardExpenseItem } from "./types";

interface HomeRecentExpensesProps {
  expenses?: DashboardExpenseItem[];
  currency?: CurrencyCode;
  onSeeAllPress?: () => void;
}

const DEFAULT_EXPENSES: DashboardExpenseItem[] = [
  {
    id: "exp-1",
    title: "Kopi Kenangan",
    amount: 24000,
    iconType: "coffee",
    timeText: "08:15 AM",
    paymentMethod: "QRIS",
  },
  {
    id: "exp-2",
    title: "TransJakarta Commute",
    amount: 3500,
    iconType: "train",
    timeText: "07:30 AM",
    paymentMethod: "Transit Card",
  },
  {
    id: "exp-3",
    title: "Pertamina Gas Station",
    amount: 50000,
    iconType: "fuel",
    timeText: "Yesterday",
    paymentMethod: "Debit Card",
  },
];

/**
 * Recent Transactions list card on Screen 04 Home Dashboard.
 * Displays formatted expenses, category icons, payment details, and "See All" link.
 * Built with FlatList and Design System Item compound components.
 */
export const HomeRecentExpenses = ({
  expenses = DEFAULT_EXPENSES,
  currency = "IDR",
  onSeeAllPress,
}: HomeRecentExpensesProps) => {
  const { t } = useTranslation("home-dashboard");

  const renderIcon = (type: DashboardExpenseItem["iconType"]) => {
    switch (type) {
      case "coffee":
        return <Coffee size={16} color="$foreground" />;
      case "train":
        return <Train size={16} color="$foreground" />;
      case "fuel":
        return <Fuel size={16} color="$foreground" />;
      default:
        return <Coffee size={16} color="$foreground" />;
    }
  };

  return (
    <YStack gap="$2" width="100%">
      {/* Section Header */}
      <XStack justifyContent="space-between" alignItems="center" width="100%">
        <SizableText size="$4" fontWeight="800" color="$foreground" letterSpacing={-0.3} numberOfLines={1}>
          {t("recent.title")}
        </SizableText>

        <Pressable
          onPress={onSeeAllPress}
          accessibilityRole="button"
          accessibilityLabel={t("recent.seeAll")}
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
        >
          <SizableText size="$2" fontWeight="600" color="$mutedForeground" letterSpacing={0} numberOfLines={1}>
            {t("recent.seeAll")}
          </SizableText>
        </Pressable>
      </XStack>

      {/* Inset Grouped Expenses Card with FlatList */}
      <YStack
        width="100%"
        borderRadius="$5"
        borderWidth="$px"
        borderColor="$border"
        backgroundColor="$card"
        overflow="hidden"
      >
        <FlatList
          data={expenses}
          scrollEnabled={false}
          keyExtractor={(item) => item.id}
          ItemSeparatorComponent={() => <Item.Separator borderColor="$border" marginVertical={0} />}
          renderItem={({ item }) => {
            const formattedAmount = `-${formatCurrency(item.amount, currency)}`;

            return (
              <Item size="default" paddingVertical="$3" paddingHorizontal="$3.5">
                <Item.Media>
                  <YStack
                    width={40}
                    height={40}
                    alignItems="center"
                    borderRadius="$full"
                    justifyContent="center"
                    backgroundColor="$secondary"
                  >
                    {renderIcon(item.iconType)}
                  </YStack>
                </Item.Media>

                <Item.Content gap={2}>
                  <Item.Title fontWeight="700" color="$foreground" letterSpacing={-0.2} numberOfLines={1}>
                    {item.title}
                  </Item.Title>
                  <Item.Description
                    size="$2"
                    fontWeight="100"
                    color="$mutedForeground"
                    letterSpacing={-0.3}
                    numberOfLines={1}
                  >
                    {item.timeText} - {item.paymentMethod}
                  </Item.Description>
                </Item.Content>

                <Item.Actions>
                  <SizableText size="$3" fontWeight="700" color="$foreground" letterSpacing={0} numberOfLines={1}>
                    {formattedAmount}
                  </SizableText>
                </Item.Actions>
              </Item>
            );
          }}
        />
      </YStack>
    </YStack>
  );
};

HomeRecentExpenses.displayName = "HomeRecentExpenses";
