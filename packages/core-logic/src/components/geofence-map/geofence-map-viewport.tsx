import React, { forwardRef, useImperativeHandle, useRef, useState } from "react";
import { Platform } from "react-native";
import MapView, { Circle, Marker, PROVIDER_DEFAULT } from "react-native-maps";

import { Button } from "@spendspot/ui-components/button";
import { Building2, Coffee, Home, Minus, Plus, Train } from "@spendspot/ui-components/icons";
import { Skeleton } from "@spendspot/ui-components/skeleton";
import { XStack, YStack } from "@spendspot/ui-components/stacks";
import { SizableText } from "@spendspot/ui-components/typography";

import type { GeofenceMapViewportProps, GeofenceMapViewportRef, MapCoordinate, MapRegion, TransitSpot } from "./types";

export const DEFAULT_JAKARTA_REGION: MapRegion = {
  latitude: -6.195,
  longitude: 106.822,
  latitudeDelta: 0.045,
  longitudeDelta: 0.045,
};

export const TRANSIT_CORRIDOR_LINE: MapCoordinate[] = [
  { latitude: -6.1754, longitude: 106.8272 }, // Monas
  { latitude: -6.185, longitude: 106.824 }, // Sarinah
  { latitude: -6.1925, longitude: 106.8229 }, // Bundaran HI
  { latitude: -6.2088, longitude: 106.822 }, // Dukuh Atas
  { latitude: -6.22, longitude: 106.815 }, // Benhil
  { latitude: -6.2255, longitude: 106.8095 }, // SCBD / Istora
  { latitude: -6.238, longitude: 106.801 }, // Senayan
];

const MAX_LATITUDE_DELTA = 0.18;
const MIN_LATITUDE_DELTA = 0.0008;
const FOCUSED_LATITUDE_DELTA = 0.0018;

/**
 * Native Map Viewport component powered by react-native-maps (Screen 05).
 * Renders real-time vector transit map, interactive geofence radius rings,
 * Jakarta transit corridor polyline, custom station markers, and floating camera controls.
 * Features zoom-responsive marker scaling, camera lock focus on spots, and synchronized single-active state.
 */
export const GeofenceMapViewport = forwardRef<GeofenceMapViewportRef, GeofenceMapViewportProps>(
  (
    {
      spots,
      activeSpotId,
      selectedSpotId,
      onSelectSpot,
      onRecenterPress,
      onZoomInPress,
      onZoomOutPress,
      onToggle3DPress,
      is3D = false,
      isLoading = false,
    },
    ref
  ) => {
    const mapRef = useRef<MapView>(null);
    const [currentRegion, setCurrentRegion] = useState<MapRegion>(DEFAULT_JAKARTA_REGION);
    const [internal3D, setInternal3D] = useState(is3D);
    const [isMapReady, setIsMapReady] = useState(false);

    const showSkeleton = isLoading || !isMapReady;
    const currentActiveId = activeSpotId ?? selectedSpotId;

    // Scalable multiplier for markers (0.92x to 1.0x) capped at 1.0 to guarantee native bitmap bounds never clip
    const getMarkerScale = (delta: number) => {
      if (delta <= 0.045) {
        return 1.0;
      }

      const outScale = 1.0 - (delta - 0.045) * 0.8;
      return Math.max(0.92, outScale);
    };

    const markerScale = getMarkerScale(currentRegion.latitudeDelta);
    const activeMarkerScale = markerScale;

    // When zoomed out far, condense to clean circular icon pins to avoid text collisions
    const isZoomedOutFar = currentRegion.latitudeDelta > 0.06;

    const handleZoom = (factor: number) => {
      const newLatDelta = Math.min(
        MAX_LATITUDE_DELTA,
        Math.max(MIN_LATITUDE_DELTA, currentRegion.latitudeDelta * factor)
      );

      const newLngDelta = Math.min(
        MAX_LATITUDE_DELTA,
        Math.max(MIN_LATITUDE_DELTA, currentRegion.longitudeDelta * factor)
      );

      const newRegion: MapRegion = {
        ...currentRegion,
        latitudeDelta: newLatDelta,
        longitudeDelta: newLngDelta,
      };

      setCurrentRegion(newRegion);
      mapRef.current?.animateToRegion(newRegion, 300);

      if (factor < 1) onZoomInPress?.();
      else onZoomOutPress?.();
    };

    const handleToggle3D = () => {
      const nextState = !internal3D;
      setInternal3D(nextState);

      mapRef.current?.animateCamera({
        pitch: nextState ? 55 : 0,
        heading: nextState ? 20 : 0,
      });

      onToggle3DPress?.();
    };

    const focusSpot = (spot: TransitSpot) => {
      // Offset latitude slightly south so the spot is perfectly centered in the visible area above the bottom sheet
      // Dynamic close-up zoom: deep zoom-in for tight spots (30m geofence -> 0.0018), fitted for wider spots
      const targetDelta = Math.max(FOCUSED_LATITUDE_DELTA, Math.min(0.004, (spot.radiusMeters / 111320) * 3.5));
      const verticalOffset = targetDelta * 0.25;
      const targetRegion: MapRegion = {
        latitude: spot.coordinate.latitude - verticalOffset,
        longitude: spot.coordinate.longitude,
        latitudeDelta: targetDelta,
        longitudeDelta: targetDelta,
      };

      mapRef.current?.animateToRegion(targetRegion, 500);
    };

    const handleRecenter = () => {
      const activeSpot = spots.find((s) => s.id === currentActiveId) ?? spots[0];
      if (activeSpot) {
        focusSpot(activeSpot);
      }

      onRecenterPress?.();
    };

    useImperativeHandle(ref, () => ({
      recenter: handleRecenter,
      focusSpot,
      zoomIn: () => handleZoom(0.6),
      zoomOut: () => handleZoom(1.5),
    }));

    const renderSpotMarkerIcon = (type: TransitSpot["iconType"], color: string) => {
      switch (type) {
        case "train":
          return <Train size={12} color="#ffffff" />;
        case "building":
          return <Building2 size={12} color={color as any} />;
        case "coffee":
          return <Coffee size={12} color={color as any} />;
        case "home":
          return <Home size={12} color={color as any} />;
        default:
          return <Train size={12} color="#ffffff" />;
      }
    };

    // Graceful Web fallback if native MapView is not bound in browser
    if (Platform.OS === "web") {
      return (
        <YStack flex={1} width="100%" height="100%" alignItems="center" justifyContent="center">
          <SizableText size="$3" fontWeight="700" color="$mutedForeground" letterSpacing={0.2} numberOfLines={1}>
            Interactive Map Preview
          </SizableText>
        </YStack>
      );
    }

    return (
      <YStack flex={1} width="100%" height="100%" position="relative">
        {/* Animated Loading Skeleton State */}
        {showSkeleton && (
          <YStack
            top={0}
            left={0}
            right={0}
            bottom={0}
            zIndex={16}
            position="absolute"
            pointerEvents="none"
            backgroundColor="$background"
          >
            {/* Base Map Canvas Skeleton */}
            <Skeleton width="100%" height="100%" borderRadius={0} />

            {/* Center Simulated Geofence Radar Pulse Skeleton */}
            <YStack position="absolute" top="32%" alignSelf="center" alignItems="center" justifyContent="center">
              <Skeleton width={180} height={180} circle />
              <YStack position="absolute" alignItems="center" gap="$1.5">
                <Skeleton width={140} height={38} borderRadius="$full" />
                <Skeleton width={60} height={12} borderRadius="$full" />
              </YStack>
            </YStack>

            {/* Floating Right Map Controls Skeleton */}
            <YStack position="absolute" right={16} top={76} gap="$2.5" alignItems="center">
              <Skeleton width={40} height={90} borderRadius="$full" />
              <Skeleton width={40} height={40} circle />
            </YStack>
          </YStack>
        )}

        <MapView
          ref={mapRef}
          mapType="standard"
          showsScale={false}
          showsCompass={false}
          showsUserLocation={true}
          userInterfaceStyle="light"
          provider={PROVIDER_DEFAULT}
          showsMyLocationButton={false}
          style={{ width: "100%", height: "100%" }}
          initialRegion={DEFAULT_JAKARTA_REGION}
          onMapReady={() => setIsMapReady(true)}
          onRegionChangeComplete={(r) => setCurrentRegion(r)}
        >
          {/* Transit Corridor Polyline */}
          {/* <Polyline
            strokeWidth={3}
            strokeColor="#2563eb"
            lineDashPattern={[6, 4]}
            coordinates={TRANSIT_CORRIDOR_LINE}
          /> */}

          {/* Geofence Radius Circles */}
          {spots.map((spot) => {
            const isActive = spot.id === currentActiveId;

            return (
              <Circle
                strokeWidth={isActive ? 2 : 1.2}
                strokeColor={spot.color}
                key={`circle-${spot.id}`}
                center={spot.coordinate}
                radius={spot.radiusMeters}
                fillColor={spot.fillColor}
                zIndex={isActive ? 2 : 1}
              />
            );
          })}

          {/* Interactive Custom Markers */}
          {spots.map((spot) => {
            const isActive = spot.id === currentActiveId;

            return (
              <Marker
                tracksViewChanges={false}
                key={`marker-${spot.id}-${isActive ? "active" : "inactive"}-${isZoomedOutFar ? "far" : "near"}`}
                coordinate={spot.coordinate}
                anchor={{ x: 0.5, y: 0.5 }}
                onPress={() => onSelectSpot?.(spot)}
              >
                {isZoomedOutFar ? (
                  <YStack backgroundColor="transparent" alignItems="center" justifyContent="center" padding={12}>
                    {isActive ? (
                      <YStack
                        width={38}
                        height={38}
                        borderRadius={19}
                        overflow="hidden"
                        borderWidth="$0.5"
                        borderColor="#38bdf8"
                        alignItems="center"
                        justifyContent="center"
                        backgroundColor="#18181b"
                        transform={[{ scale: activeMarkerScale }]}
                      >
                        {renderSpotMarkerIcon(spot.iconType, "#ffffff")}
                      </YStack>
                    ) : (
                      <YStack
                        width={32}
                        height={32}
                        borderRadius={16}
                        overflow="hidden"
                        borderWidth="$0.5"
                        borderColor="#e4e4e7"
                        alignItems="center"
                        justifyContent="center"
                        backgroundColor="#ffffff"
                        transform={[{ scale: markerScale }]}
                      >
                        {renderSpotMarkerIcon(spot.iconType, spot.color)}
                      </YStack>
                    )}
                  </YStack>
                ) : isActive ? (
                  <YStack
                    alignItems="center"
                    paddingVertical="$4"
                    paddingHorizontal="$9"
                    justifyContent="center"
                    backgroundColor="transparent"
                  >
                    <YStack alignItems="center" justifyContent="center" transform={[{ scale: activeMarkerScale }]}>
                      <XStack
                        gap="$2"
                        height={38}
                        borderRadius={19}
                        overflow="hidden"
                        borderWidth="$0.5"
                        borderColor="#38bdf8"
                        paddingHorizontal="$4"
                        alignItems="center"
                        justifyContent="center"
                        backgroundColor="#18181b"
                      >
                        {renderSpotMarkerIcon(spot.iconType, spot.color)}
                        <SizableText
                          size="$2"
                          fontSize="$3"
                          fontWeight="700"
                          color="#ffffff"
                          letterSpacing={0}
                          numberOfLines={1}
                          includeFontPadding={false}
                        >
                          {spot.name}
                        </SizableText>
                      </XStack>
                      <SizableText
                        size="$1"
                        fontSize="$2"
                        fontWeight="600"
                        color="#2563eb"
                        letterSpacing={0}
                        numberOfLines={1}
                        marginTop={2}
                      >
                        {spot.radiusMeters}m zone
                      </SizableText>
                    </YStack>
                  </YStack>
                ) : (
                  <YStack
                    alignItems="center"
                    paddingVertical="$2"
                    paddingHorizontal="$6"
                    justifyContent="center"
                    backgroundColor="transparent"
                  >
                    <YStack alignItems="center" justifyContent="center" transform={[{ scale: markerScale }]}>
                      <XStack
                        gap="$2"
                        height={38}
                        borderRadius={19}
                        overflow="hidden"
                        borderWidth="$0.5"
                        borderColor="#ffffff"
                        paddingHorizontal="$2"
                        alignItems="center"
                        justifyContent="center"
                        backgroundColor="#ffffff"
                      >
                        <YStack
                          width={24}
                          height={24}
                          borderRadius={11}
                          alignItems="center"
                          justifyContent="center"
                          backgroundColor={spot.fillColor as any}
                        >
                          {renderSpotMarkerIcon(spot.iconType, spot.color)}
                        </YStack>
                        <SizableText
                          size="$2"
                          fontSize="$3"
                          fontWeight="700"
                          color="#18181b"
                          letterSpacing={0}
                          numberOfLines={1}
                          includeFontPadding={false}
                        >
                          {spot.name}
                        </SizableText>
                      </XStack>
                    </YStack>
                  </YStack>
                )}
              </Marker>
            );
          })}
        </MapView>

        {/* Floating Right Map Controls (Zoom In/Out, 3D Tilt) */}
        <YStack
          gap="$2"
          top={76}
          right={16}
          zIndex={24}
          position="absolute"
          alignItems="center"
          justifyContent="center"
        >
          {/* Zoom Controls Pill */}
          <YStack
            elevation={3}
            borderWidth="$px"
            borderRadius="$full"
            borderColor="$border"
            backgroundColor="$card"
            overflow="hidden"
            shadowColor="#000"
            shadowRadius={8}
            shadowOpacity={0.08}
            shadowOffset={{ width: 0, height: 2 }}
          >
            <Button
              width={40}
              height={40}
              variant="ghost"
              buttonSize="icon"
              borderRadius="$full"
              onPress={() => handleZoom(0.6)}
              accessibilityLabel="Zoom In"
            >
              <Plus size={20} color="$foreground" />
            </Button>

            <Button
              width={40}
              height={40}
              variant="ghost"
              buttonSize="icon"
              borderRadius="$full"
              onPress={() => handleZoom(1.5)}
              accessibilityLabel="Zoom Out"
            >
              <Minus size={20} color="$foreground" />
            </Button>
          </YStack>

          {/* 3D Perspective Toggle Button */}
          <Button
            width={40}
            height={40}
            elevation={3}
            variant="secondary"
            buttonSize="icon-lg"
            borderWidth="$px"
            borderRadius="$full"
            borderColor="$border"
            onPress={handleToggle3D}
            backgroundColor="$card"
            shadowColor="#000"
            shadowRadius={8}
            shadowOpacity={0.08}
            shadowOffset={{ width: 0, height: 2 }}
            accessibilityLabel="Toggle 3D View"
          >
            3D
          </Button>
        </YStack>
      </YStack>
    );
  }
);

GeofenceMapViewport.displayName = "GeofenceMapViewport";
