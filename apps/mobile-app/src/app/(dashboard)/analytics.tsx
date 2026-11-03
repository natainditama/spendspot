import { Tabs } from "expo-router";
import React from "react";

import { TrendingUp } from "@spendspot/ui-components/icons";
import { YStack } from "@spendspot/ui-components/stacks";
import { Paragraph, SizableText } from "@spendspot/ui-components/typography";

import { dashboardScreenOptions } from "./_layout";

/**
 * Budget Analytics Trends route tab (Screen 07).
 * Commute vs general spending trends, weekly charts, and AI-driven projections.
 * Inherits standard screenOptions and native header styling from root _layout.tsx.
 */
export default function AnalyticsRoute() {
  return (
    <>
      <Tabs.Screen
        options={{
          ...dashboardScreenOptions,
        }}
      />
      <YStack flex={1} backgroundColor="$background" alignItems="center" justifyContent="center" padding="$6" gap="$4">
        <YStack
          width={72}
          height={72}
          borderRadius="$full"
          backgroundColor="$secondary"
          alignItems="center"
          justifyContent="center"
          borderWidth="$px"
          borderColor="$border"
        >
          <TrendingUp size={32} color="$foreground" />
        </YStack>

        <YStack gap="$1.5" alignItems="center">
          <SizableText size="$6" fontWeight="800" color="$foreground" textAlign="center">
            Spending & Commute Trends
          </SizableText>
          <Paragraph size="$2" color="$mutedForeground" textAlign="center" maxWidth={300}>
            Detailed weekly analytics comparing commute transit versus lifestyle spending.
          </Paragraph>
        </YStack>
      </YStack>
    </>
  );
}
