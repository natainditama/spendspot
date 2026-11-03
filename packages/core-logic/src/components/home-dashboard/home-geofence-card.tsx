import React from "react";
import { useTranslation } from "react-i18next";

import { Button } from "@spendspot/ui-components/button";
import { Train } from "@spendspot/ui-components/icons";
import { XStack, YStack } from "@spendspot/ui-components/stacks";
import { Paragraph, SizableText } from "@spendspot/ui-components/typography";

import { formatCurrency, type CurrencyCode } from "../../lib/utils/format-currency";
import type { DashboardGeofenceStatus } from "./types";

interface HomeGeofenceCardProps {
  geofence?: DashboardGeofenceStatus;
  currency?: CurrencyCode;
  onLogTicketPress?: () => void;
}

const DEFAULT_GEOFENCE: DashboardGeofenceStatus = {
  spotName: "MRT Bundaran HI Station",
  isSaved: true,
  radiusText: "45m radius",
  paymentMethod: "QRIS",
  platformText: "Platform 2 • Lebak Bulus",
  loggedAmount: 14000,
  isLogged: true,
};

/**
 * Active Geofence Status card for Screen 04 Home Dashboard.
 * Displays real-time location detection at saved transit spots,
 * detected radar radius, default payment method, and one-tap commute ticket logging.
 * Streamlined to core detection status and quick action without visual clutter.
 */
export const HomeGeofenceCard = ({
  geofence = DEFAULT_GEOFENCE,
  currency = "IDR",
  onLogTicketPress,
}: HomeGeofenceCardProps) => {
  const { t } = useTranslation("home-dashboard");
  const formattedTicket = formatCurrency(geofence.loggedAmount, currency);

  return (
    <XStack
      gap="$3"
      width="100%"
      padding="$3.5"
      borderRadius="$5"
      borderWidth="$px"
      alignItems="center"
      borderColor="$border"
      backgroundColor="$card"
      justifyContent="space-between"
    >
      {/* Transit Icon Squircle */}
      <YStack
        width={42}
        height={42}
        flexShrink={0}
        borderRadius="$3"
        alignItems="center"
        justifyContent="center"
        backgroundColor="$foreground"
      >
        <Train size={20} color="$background" />
      </YStack>

      {/* Spot Details */}
      <YStack flex={1}>
        <SizableText size="$3" fontWeight="700" color="$foreground" letterSpacing={-0.3} numberOfLines={1}>
          {geofence.spotName}
        </SizableText>
        <Paragraph size="$2" fontWeight="300" color="$mutedForeground" letterSpacing={0} numberOfLines={1}>
          {t("geofence.detectedDetails", {
            radius: geofence.radiusText,
            payment: geofence.paymentMethod,
            defaultValue: `Detected: ${geofence.radiusText} • ${geofence.paymentMethod}`,
          })}
        </Paragraph>
      </YStack>

      {/* Quick Ticket Log Action Button */}
      <YStack>
        <Button
          buttonSize="sm"
          borderRadius="$3"
          variant="secondary"
          onPress={onLogTicketPress}
          accessibilityLabel={`Ticket ${formattedTicket}`}
        >
          <SizableText size="$2" fontWeight="600" color="$foreground">
            {t("geofence.loggedTicket", {
              amount: formattedTicket,
              defaultValue: `Logged (${formattedTicket})`,
            })}
          </SizableText>
        </Button>
      </YStack>
    </XStack>
  );
};

HomeGeofenceCard.displayName = "HomeGeofenceCard";
