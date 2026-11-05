import { Tabs } from "expo-router";
import React from "react";

import { GeofenceMapScreen } from "@spendspot/core-logic/components/geofence-map/geofence-map-screen";
import type { TransitSpot } from "@spendspot/core-logic/components/geofence-map/types";
import i18n from "@spendspot/core-logic/i18n";
import { toast } from "@spendspot/ui-components/toast";

import { dashboardScreenOptions } from "./_layout";

/**
 * Spots & Transit Map route tab (Screen 05).
 * Real-time map viewport, geofence radius rings, and expandable bottom sheet list.
 * Inherits standard screenOptions and native header styling from root _layout.tsx.
 */
export default function SpotsRoute() {
  const handleSelectSpot = (spot: TransitSpot) => {
    toast(spot.name, {
      description: `${spot.categoryLabel} • ${spot.radiusMeters}m geofence • ${spot.defaultPayment}`,
    });
  };

  const handleAddSpotPress = () => {
    toast("Add Transit Spot", {
      description: "Define a new commute location with 30m–300m radius.",
    });
  };

  const handleRecenterPress = () => {
    toast("GPS Locked", {
      description: "Centered on MRT Bundaran HI Station corridor.",
    });
  };

  return (
    <>
      <Tabs.Screen
        options={{
          ...dashboardScreenOptions,
          title: i18n.t("geofence-map:header.title", "Spot and Map"),
        }}
      />
      <GeofenceMapScreen
        onSelectSpot={handleSelectSpot}
        onAddSpotPress={handleAddSpotPress}
        onRecenterPress={handleRecenterPress}
      />
    </>
  );
}
