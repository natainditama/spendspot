import { Tabs } from "expo-router";
import React from "react";

import { Map, Navigation } from "@spendspot/ui-components/icons";
import { XStack, YStack } from "@spendspot/ui-components/stacks";
import { Paragraph, SizableText } from "@spendspot/ui-components/typography";

import { dashboardScreenOptions } from "./_layout";

/**
 * Spots & Transit Map route tab (Screen 05).
 * Geofence transit spots, radar radius definitions, and location awareness.
 * Inherits standard screenOptions and native header styling from root _layout.tsx.
 */
export default function SpotsRoute() {
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
          <Map size={32} color="$foreground" />
        </YStack>

        <YStack gap="$1.5" alignItems="center">
          <SizableText size="$6" fontWeight="800" color="$foreground" textAlign="center">
            Transit Spots & Geofencing
          </SizableText>
          <Paragraph size="$2" color="$mutedForeground" textAlign="center" maxWidth={300}>
            Explore active commute spots with 30m to 300m arrival radiuses and automatic transit tracking.
          </Paragraph>
        </YStack>

        <XStack
          backgroundColor="$secondary"
          borderRadius="$full"
          paddingHorizontal="$3.5"
          paddingVertical="$1.5"
          gap="$2"
          alignItems="center"
        >
          <Navigation size={14} color="$foreground" />
          <SizableText size="$1" fontWeight="700" color="$foreground">
            MRT Bundaran HI • Lebak Bulus
          </SizableText>
        </XStack>
      </YStack>
    </>
  );
}
