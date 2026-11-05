import React from "react";

import { Badge } from "@spendspot/ui-components/badge";
import { Building2, ChevronRight, Coffee, Home, Train } from "@spendspot/ui-components/icons";
import { Item } from "@spendspot/ui-components/item";
import { XStack, YStack } from "@spendspot/ui-components/stacks";
import { Paragraph, SizableText } from "@spendspot/ui-components/typography";

import type { GeofenceSpotItemProps } from "./types";

/**
 * Individual saved transit spot list item based on Screen 05 bottom sheet design.
 * Summarized to essential commute information (name, category, radius, and active badge).
 * Eliminates redundant secondary metadata to avoid visual overload.
 */
export const GeofenceSpotItem = ({ spot, isActive = false, onPress }: GeofenceSpotItemProps) => {
  const renderIcon = () => {
    switch (spot.iconType) {
      case "train":
        return <Train size={18} color="$background" />;
      case "building":
        return <Building2 size={18} color="#10b981" />;
      case "coffee":
        return <Coffee size={18} color="#f59e0b" />;
      case "home":
        return <Home size={18} color="#8b5cf6" />;
      default:
        return <Train size={18} color="$background" />;
    }
  };

  const getMediaBg = () => {
    switch (spot.iconType) {
      case "train":
        return "$foreground";
      case "building":
        return "rgba(16, 185, 129, 0.12)";
      case "coffee":
        return "rgba(245, 158, 11, 0.12)";
      case "home":
        return "rgba(139, 92, 246, 0.12)";
      default:
        return "$secondary";
    }
  };

  return (
    <Item size="default" paddingVertical="$3" paddingHorizontal="$4" onPress={onPress}>
      {/* Category Icon */}
      <Item.Media>
        <YStack
          width={40}
          height={40}
          alignItems="center"
          borderRadius="$full"
          justifyContent="center"
          backgroundColor={getMediaBg()}
        >
          {renderIcon()}
        </YStack>
      </Item.Media>

      {/* Spot Information Details */}
      <Item.Content gap={0}>
        <XStack alignItems="center" gap="$2">
          <Item.Title fontWeight="700" color="$foreground" letterSpacing={0} numberOfLines={1}>
            {spot.name}
          </Item.Title>

          {isActive && (
            <Badge
              variant="secondary"
              paddingVertical={1}
              paddingHorizontal="$2"
              borderRadius="$full"
              borderColor="transparent"
              backgroundColor="rgba(37, 99, 235, 0.12)"
            >
              <SizableText size="$1" fontWeight="700" color="#2563eb" letterSpacing={0.1} numberOfLines={1}>
                Active Now
              </SizableText>
            </Badge>
          )}
        </XStack>

        <Paragraph size="$2" color="$mutedForeground" letterSpacing={0} numberOfLines={1}>
          {spot.categoryLabel} • {spot.radiusMeters}m radius
        </Paragraph>
      </Item.Content>

      {/* Trailing Chevron Action */}
      <Item.Actions>
        <ChevronRight size={20} color="$mutedForeground" />
      </Item.Actions>
    </Item>
  );
};

GeofenceSpotItem.displayName = "GeofenceSpotItem";
