import React from "react";
import { useTranslation } from "react-i18next";
import { ScrollView, useWindowDimensions } from "react-native";

import { Badge } from "@spendspot/ui-components/badge";
import { Button } from "@spendspot/ui-components/button";
import { Item } from "@spendspot/ui-components/item";
import { XStack, YStack } from "@spendspot/ui-components/stacks";
import { SizableText } from "@spendspot/ui-components/typography";

import { GeofenceSpotItem } from "./geofence-spot-item";
import type { GeofenceBottomSheetProps } from "./types";

/**
 * Bottom Sheet card displaying saved transit spots with "+ Add Spot" action button (Screen 05).
 * Built with pure XStack and YStack layout primitives.
 * Features bounded pixel-height container and responsive native vertical scrolling.
 */
export const GeofenceBottomSheet = ({
  spots,
  activeSpotId,
  selectedSpotId,
  onSelectSpot,
  onAddSpotPress,
  open = true,
}: GeofenceBottomSheetProps) => {
  const { t } = useTranslation("geofence-map");
  const { height: screenHeight } = useWindowDimensions();
  const currentActiveId = activeSpotId ?? selectedSpotId;

  if (!open) {
    return null;
  }

  // Exact pixel height to guarantee bounded flex layout for child ScrollView on Android & iOS
  const sheetHeight = Math.min(420, Math.max(340, Math.round(screenHeight * 0.46)));

  return (
    <YStack
      gap="$4"
      left={0}
      right={0}
      bottom={0}
      zIndex={50}
      elevation={8}
      pointerEvents="auto"
      position="absolute"
      borderWidth="$px"
      borderColor="$border"
      height={sheetHeight}
      borderTopLeftRadius="$6"
      borderTopRightRadius="$6"
      borderBottomWidth={0}
      paddingTop="$6"
      paddingBottom="$6"
      paddingHorizontal="$4"
      backgroundColor="$card"
      shadowColor="#000"
      shadowRadius={12}
      shadowOpacity={0.1}
      shadowOffset={{ width: 0, height: -3 }}
    >
      {/* Header Row: Title, Count Badge, Description, and Add Spot Action */}
      <XStack gap="$2" width="100%" alignItems="center" justifyContent="space-between">
        <YStack flex={1} gap={0} alignItems="flex-start" justifyContent="flex-start">
          <XStack gap="$2" alignItems="center" justifyContent="flex-start">
            <SizableText size="$6" fontWeight="800" color="$foreground" letterSpacing={-0.3} numberOfLines={1}>
              {t("bottomSheet.title")}
            </SizableText>
            <Badge variant="secondary" fontSize="$1" borderRadius="$full">
              {spots.length}
            </Badge>
          </XStack>

          <SizableText size="$2" fontWeight="400" color="$mutedForeground" letterSpacing={-0.2} numberOfLines={1}>
            {t("bottomSheet.description")}
          </SizableText>
        </YStack>

        <YStack gap={0} alignItems="center" justifyContent="center">
          <Button
            fontSize="$2"
            buttonSize="sm"
            variant="primary"
            borderRadius="$full"
            onPress={onAddSpotPress}
            accessibilityLabel={t("bottomSheet.addSpot")}
          >
            {t("bottomSheet.addSpot")}
          </Button>
        </YStack>
      </XStack>

      {/* Grouped Spots List Card with native ScrollView */}
      <YStack
        flex={1}
        width="100%"
        borderRadius="$4"
        borderWidth="$px"
        overflow="hidden"
        borderColor="$border"
        backgroundColor="$secondary"
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1, paddingVertical: 4 }}
          showsVerticalScrollIndicator={true}
          keyboardShouldPersistTaps="handled"
          style={{ flex: 1, width: "100%" }}
          canCancelContentTouches={true}
          alwaysBounceVertical={true}
          scrollEventThrottle={16}
          overScrollMode="always"
          scrollEnabled={true}
          bounces={true}
        >
          {spots.map((item, index) => (
            <React.Fragment key={item.id}>
              <GeofenceSpotItem
                spot={item}
                isActive={item.id === currentActiveId}
                onPress={() => onSelectSpot?.(item)}
              />
              {index < spots.length - 1 && <Item.Separator borderColor="$border" marginVertical={0} />}
            </React.Fragment>
          ))}
        </ScrollView>
      </YStack>
    </YStack>
  );
};

GeofenceBottomSheet.displayName = "GeofenceBottomSheet";
