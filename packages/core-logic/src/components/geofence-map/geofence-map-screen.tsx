import React, { useRef, useState } from "react";
import { ScrollView } from "react-native";

import { YStack } from "@spendspot/ui-components/stacks";

import { GeofenceBottomSheet } from "./geofence-bottom-sheet";
import { GeofenceMapViewport } from "./geofence-map-viewport";
import { GeofenceSearchBar } from "./geofence-search-bar";
import type { GeofenceMapScreenProps, GeofenceMapViewportRef, TransitSpot } from "./types";

export const DEFAULT_TRANSIT_SPOTS: TransitSpot[] = [
  {
    id: "spot-mrt",
    name: "MRT Bundaran HI",
    category: "transit",
    categoryLabel: "Transit",
    defaultPayment: "QRIS Auto",
    radiusMeters: 75,
    visitedCount: 42,
    lastVisitText: "Last today, 08:14",
    coordinate: { latitude: -6.1925, longitude: 106.8229 },
    color: "#2563eb",
    fillColor: "rgba(37, 99, 235, 0.18)",
    iconType: "train",
  },
  {
    id: "spot-scbd",
    name: "SCBD Office Tower",
    category: "workplace",
    categoryLabel: "Workplace",
    defaultPayment: "E-Wallet",
    radiusMeters: 150,
    visitedCount: 128,
    lastVisitText: "Yesterday",
    coordinate: { latitude: -6.2255, longitude: 106.8095 },
    color: "#10b981",
    fillColor: "rgba(16, 185, 129, 0.18)",
    iconType: "building",
  },
  {
    id: "spot-tuku",
    name: "Kopi Tuku Cipete",
    category: "foodAndBeverage",
    categoryLabel: "Food & Beverage",
    defaultPayment: "Cash",
    radiusMeters: 30,
    visitedCount: 15,
    lastVisitText: "3 days ago",
    coordinate: { latitude: -6.278, longitude: 106.7995 },
    color: "#f59e0b",
    fillColor: "rgba(245, 158, 11, 0.18)",
    iconType: "coffee",
  },
  {
    id: "spot-home",
    name: "Home",
    category: "home",
    categoryLabel: "Home",
    defaultPayment: "N/A",
    radiusMeters: 50,
    visitedCount: 340,
    lastVisitText: "Daily",
    coordinate: { latitude: -6.185, longitude: 106.815 },
    color: "#8b5cf6",
    fillColor: "rgba(139, 92, 246, 0.18)",
    iconType: "home",
  },
  {
    id: "spot-starbucks",
    name: "Starbucks Thamrin",
    category: "foodAndBeverage",
    categoryLabel: "Food & Beverage",
    defaultPayment: "Card",
    radiusMeters: 30,
    visitedCount: 24,
    lastVisitText: "2 days ago",
    coordinate: { latitude: -6.198, longitude: 106.8235 },
    color: "#f59e0b",
    fillColor: "rgba(245, 158, 11, 0.18)",
    iconType: "coffee",
  },
];

/**
 * Screen 05 Geofence Spots Map container component.
 * Integrates real-time vector transit map viewport, interactive geofences,
 * floating search/recenter controls, and expandable bottom sheet spot management.
 * Manages single-active spot state synchronized across map markers and list badges.
 */
export const GeofenceMapScreen = ({
  spots = DEFAULT_TRANSIT_SPOTS,
  activeSpotId: propActiveSpotId,
  onSelectSpot,
  onAddSpotPress,
  onRecenterPress,
  onSearchChange,
  testID = "geofence-map-screen",
}: GeofenceMapScreenProps) => {
  const viewportRef = useRef<GeofenceMapViewportRef>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeSpotId, setActiveSpotId] = useState(propActiveSpotId ?? "spot-mrt");

  const handleSearchText = (text: string) => {
    setSearchQuery(text);
    onSearchChange?.(text);
  };

  const handleSpotPress = (spot: TransitSpot) => {
    setActiveSpotId(spot.id);
    viewportRef.current?.focusSpot(spot);
    onSelectSpot?.(spot);
  };

  const handleRecenter = () => {
    viewportRef.current?.recenter();
    onRecenterPress?.();
  };

  const filteredSpots = searchQuery.trim()
    ? spots.filter((s) => s.name.toLowerCase().includes(searchQuery.toLowerCase()))
    : spots;

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
        paddingVertical="$0"
        paddingHorizontal="$0"
        backgroundColor="$background"
        justifyContent="center"
        alignItems="stretch"
        width="100%"
      >
        {/* Top Floating Search & Recenter Bar */}
        <GeofenceSearchBar value={searchQuery} onChangeText={handleSearchText} onRecenterPress={handleRecenter} />

        {/* Main Map Viewport Layer */}
        <GeofenceMapViewport
          ref={viewportRef}
          spots={filteredSpots}
          activeSpotId={activeSpotId}
          onSelectSpot={handleSpotPress}
          onRecenterPress={onRecenterPress}
        />

        {/* Expandable Bottom Sheet with Saved Spots */}
        <GeofenceBottomSheet
          spots={filteredSpots}
          activeSpotId={activeSpotId}
          onSelectSpot={handleSpotPress}
          onAddSpotPress={onAddSpotPress}
        />
      </YStack>
    </ScrollView>
  );
};

GeofenceMapScreen.displayName = "GeofenceMapScreen";
