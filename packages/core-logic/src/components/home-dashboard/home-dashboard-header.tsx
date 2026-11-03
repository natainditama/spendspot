import React from "react";
import { useTranslation } from "react-i18next";

import { Avatar } from "@spendspot/ui-components/avatar";
import { Badge } from "@spendspot/ui-components/badge";
import { XStack, YStack } from "@spendspot/ui-components/stacks";
import { Paragraph, SizableText } from "@spendspot/ui-components/typography";

interface HomeDashboardHeaderProps {
  userName?: string;
  currencyCode?: string;
  currencySymbol?: string;
  onNotificationPress?: () => void;
  onProfilePress?: () => void;
}

/**
 * Screen 04 User Greeting & Live Status header section.
 * Top action bar (Screen title, notification bell, profile button) is handled
 * natively by Expo Router header in _layout.tsx.
 * Uses the Design System Avatar component with live status badge.
 */
export const HomeDashboardHeader = ({
  userName = "Nata",
  currencyCode = "IDR",
  currencySymbol = "Rp",
  onProfilePress,
}: HomeDashboardHeaderProps) => {
  const { t } = useTranslation("home-dashboard");

  const initials = userName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <XStack width="100%" alignItems="flex-end" justifyContent="space-between">
      <XStack gap="$2" alignItems="center">
        {/* User Presence Avatar */}
        <Avatar size="lg" onPress={onProfilePress}>
          <Avatar.Fallback>{initials}</Avatar.Fallback>
          <Avatar.Badge />
        </Avatar>

        {/* Category & Greeting Text */}
        <YStack>
          <Paragraph size="$1" fontWeight="700" color="$mutedForeground" letterSpacing={0.8} numberOfLines={1}>
            {t("header.category")}
          </Paragraph>
          <SizableText size="$5" fontWeight="700" color="$foreground" letterSpacing={-0.2} numberOfLines={1}>
            {t("header.greeting", { name: userName, defaultValue: `Good morning, ${userName}` })}
          </SizableText>
        </YStack>
      </XStack>

      <XStack>
        {/* Currency Pill Badge */}
        <Badge variant="secondary" borderRadius="$full">
          {currencyCode} ({currencySymbol})
        </Badge>
      </XStack>
    </XStack>
  );
};

HomeDashboardHeader.displayName = "HomeDashboardHeader";
