import React from "react";
import { ScrollView } from "react-native";

import { YStack } from "@spendspot/ui-components/stacks";

import { SUPPORTED_CURRENCIES } from "../../constants/supported-currencies";
import { HomeBudgetGaugeCard } from "./home-budget-gauge-card";
import { HomeDashboardHeader } from "./home-dashboard-header";
import { HomeGeofenceCard } from "./home-geofence-card";
import { HomeQuickActions } from "./home-quick-actions";
import { HomeRecentExpenses } from "./home-recent-expenses";
import type { HomeDashboardScreenProps } from "./types";

/**
 * Production-ready Screen 04 Home Dashboard component based on 04_home_dashboard.png.
 * Features real-time budget ring gauge, active geofence arrival detection card,
 * 4 quick actions, today's expenses list, with header and bottom tabs powered natively by Expo Router.
 */
export const HomeDashboardScreen = ({
  userName = "Nata",
  currency = "IDR",
  spentToday = 68000,
  dailyCap = 100000,
  activeGeofence,
  recentExpenses,
  onNotificationPress,
  onProfilePress,
  onLogTicketPress,
  onAddExpensePress,
  onScanReceiptPress,
  onAskAIPress,
  onNewSpotPress,
  onSeeAllExpensesPress,
  onDismissWarning,
  testID = "home-dashboard-screen",
}: HomeDashboardScreenProps) => {
  const currencySymbol = SUPPORTED_CURRENCIES[currency]?.symbol ?? "Rp";

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
        {/* Header Greeting & Live Presence */}
        <HomeDashboardHeader
          userName={userName}
          currencyCode={currency}
          currencySymbol={currencySymbol}
          onNotificationPress={onNotificationPress}
          onProfilePress={onProfilePress}
        />

        <YStack gap="$3" width="100%">
          {/* Hero Circular Budget Gauge Card */}
          <HomeBudgetGaugeCard
            spentToday={spentToday}
            dailyCap={dailyCap}
            currency={currency}
            onDismissWarning={onDismissWarning}
          />

          {/* Active Geofence Detection Status Card */}
          <HomeGeofenceCard geofence={activeGeofence} currency={currency} onLogTicketPress={onLogTicketPress} />
        </YStack>

        {/* 4 Quick Actions Row */}
        <HomeQuickActions
          onAddExpensePress={onAddExpensePress}
          onScanReceiptPress={onScanReceiptPress}
          onAskAIPress={onAskAIPress}
          onNewSpotPress={onNewSpotPress}
        />

        <YStack gap="$6" width="100%" marginTop="$2">
          {/* Today's Expenses List */}
          <HomeRecentExpenses expenses={recentExpenses} currency={currency} onSeeAllPress={onSeeAllExpensesPress} />
        </YStack>
      </YStack>
    </ScrollView>
  );
};

HomeDashboardScreen.displayName = "HomeDashboardScreen";
