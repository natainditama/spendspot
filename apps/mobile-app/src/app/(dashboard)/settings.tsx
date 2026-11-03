import { Tabs } from "expo-router";
import React from "react";

import { Sliders } from "@spendspot/ui-components/icons";
import { YStack } from "@spendspot/ui-components/stacks";
import { Paragraph, SizableText } from "@spendspot/ui-components/typography";

import { dashboardScreenOptions } from "./_layout";

/**
 * Settings & Preferences route tab.
 * Currency switcher, geofence radius settings, and account management.
 * Inherits standard screenOptions and native header styling from root _layout.tsx.
 */
export default function SettingsRoute() {
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
          <Sliders size={32} color="$foreground" />
        </YStack>

        <YStack gap="$1.5" alignItems="center">
          <SizableText size="$6" fontWeight="800" color="$foreground" textAlign="center">
            Settings & Preferences
          </SizableText>
          <Paragraph size="$2" color="$mutedForeground" textAlign="center" maxWidth={300}>
            Manage your base currency, commute baseline, geofencing permissions, and notification thresholds.
          </Paragraph>
        </YStack>
      </YStack>
    </>
  );
}
