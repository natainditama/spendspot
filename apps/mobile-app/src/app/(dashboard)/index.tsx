import { Tabs } from "expo-router";
import React from "react";

import { HomeDashboardScreen } from "@spendspot/core-logic/components/home-dashboard/home-dashboard-screen";
import { toast } from "@spendspot/ui-components/toast";

import { dashboardScreenOptions } from "./_layout";

/**
 * Home Dashboard route screen (Screen 04).
 * Real-time daily budget ring, geofence detection, quick actions, and expense feeds.
 * Inherits standard screenOptions and native header styling from root _layout.tsx.
 */
export default function HomeDashboardRoute() {
  const handleLogTicketPress = () => {
    toast.success("Ticket Logged!", {
      description: "MRT Bundaran HI (Rp 14.000) recorded to daily commute.",
    });
  };

  const handleAddExpensePress = () => {
    toast("Add Expense", {
      description: "Opening quick expense modal...",
    });
  };

  const handleScanReceiptPress = () => {
    toast("Scan Receipt", {
      description: "Opening camera receipt scanner...",
    });
  };

  const handleAskAIPress = () => {
    toast("SpendSpot AI", {
      description: "AI Advisor: You have 16 queries remaining today.",
    });
  };

  const handleNewSpotPress = () => {
    toast("New Spot", {
      description: "Add new transit spot with 30m-300m radius.",
    });
  };

  const handleSeeAllExpensesPress = () => {
    toast("Today's Expenses", {
      description: "Showing all recorded expenses for today.",
    });
  };

  const handleDismissWarning = () => {
    toast("Alert Dismissed", {
      description: "Commute warning hidden for today.",
    });
  };

  return (
    <>
      <Tabs.Screen
        options={{
          ...dashboardScreenOptions,
        }}
      />
      <HomeDashboardScreen
        userName="Nata"
        currency="IDR"
        spentToday={100000}
        dailyCap={100000}
        onLogTicketPress={handleLogTicketPress}
        onAddExpensePress={handleAddExpensePress}
        onScanReceiptPress={handleScanReceiptPress}
        onAskAIPress={handleAskAIPress}
        onNewSpotPress={handleNewSpotPress}
        onSeeAllExpensesPress={handleSeeAllExpensesPress}
        onDismissWarning={handleDismissWarning}
      />
    </>
  );
}
