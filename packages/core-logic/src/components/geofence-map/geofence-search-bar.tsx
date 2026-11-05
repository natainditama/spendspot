import React from "react";
import { useTranslation } from "react-i18next";
import { Pressable } from "react-native";

import { Button } from "@spendspot/ui-components/button";
import { Navigation, Search } from "@spendspot/ui-components/icons";
import { Input } from "@spendspot/ui-components/input";
import { XStack } from "@spendspot/ui-components/stacks";

import type { GeofenceSearchBarProps } from "./types";

/**
 * Floating search bar with pressable search icon and GPS recalibrate button overlaying the map viewport (Screen 05).
 * Features rounded-full search input without focus border/ring, and single GPS target lock button.
 */
export const GeofenceSearchBar = ({ value, onChangeText, onSearchPress, onRecenterPress }: GeofenceSearchBarProps) => {
  const { t } = useTranslation("geofence-map");

  return (
    <XStack
      gap="$2"
      top={16}
      left={16}
      right={16}
      zIndex={32}
      position="absolute"
      alignItems="center"
      justifyContent="center"
    >
      <XStack
        flex={1}
        gap="$2"
        height={40}
        elevation={3}
        borderWidth="$px"
        alignItems="center"
        borderRadius="$full"
        borderColor="$border"
        backgroundColor="$card"
        paddingHorizontal="$3.5"
        shadowColor="#000"
        shadowRadius={8}
        shadowOpacity={0.08}
        shadowOffset={{ width: 0, height: 2 }}
      >
        <Input
          flex={1}
          height={40}
          borderWidth={0}
          value={value}
          fontSize="$3"
          paddingHorizontal={0}
          onChangeText={onChangeText}
          backgroundColor="transparent"
          placeholder={t("search.placeholder")}
          placeholderTextColor="$mutedForeground"
          focusStyle={{
            outlineWidth: 0,
            outlineStyle: "none",
            borderColor: "transparent",
            outlineColor: "transparent",
          }}
          focusVisibleStyle={{
            outlineWidth: 0,
            outlineStyle: "none",
            borderColor: "transparent",
            outlineColor: "transparent",
          }}
          hoverStyle={{
            borderColor: "transparent",
          }}
        />

        <Pressable
          onPress={onSearchPress}
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          accessibilityRole="button"
          accessibilityLabel={t("search.placeholder")}
        >
          <Search size={16} color="$mutedForeground" />
        </Pressable>
      </XStack>

      {/* Recenter GPS Floating Button */}
      <Button
        width={40}
        height={40}
        elevation={3}
        variant="secondary"
        buttonSize="icon-lg"
        borderWidth="$px"
        borderRadius="$full"
        borderColor="$border"
        onPress={onRecenterPress}
        backgroundColor="$card"
        shadowColor="#000"
        shadowRadius={8}
        shadowOpacity={0.08}
        shadowOffset={{ width: 0, height: 2 }}
        accessibilityLabel={t("search.recenter")}
      >
        <Navigation size={20} marginLeft={-2} marginBottom={-2} color="$foreground" />
      </Button>
    </XStack>
  );
};

GeofenceSearchBar.displayName = "GeofenceSearchBar";
