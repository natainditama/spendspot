import * as Location from "expo-location";
import * as Notifications from "expo-notifications";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Linking } from "react-native";

import { SetupWizardScreen } from "@spendspot/core-logic/components/setup-wizard/setup-wizard-screen";
import type { SetupWizardSubmitData } from "@spendspot/core-logic/components/setup-wizard/types";
import i18n from "@spendspot/core-logic/i18n";
import { CurrencyCode } from "@spendspot/core-logic/lib/utils/format-currency";
import { useAuthSession } from "@spendspot/core-logic/providers/auth-session-provider";
import { saveSetupPreferences } from "@spendspot/core-logic/services/setup-service";
import { AlertDialog } from "@spendspot/ui-components/alert-dialog";
import { Button } from "@spendspot/ui-components/button";
import { Bell, MapPin } from "@spendspot/ui-components/icons";
import { toast } from "@spendspot/ui-components/toast";

type PermissionDialogType = "location" | "notification" | null;

interface PermissionDialogState {
  isOpen: boolean;
  type: PermissionDialogType;
  canAskAgain: boolean;
}

/**
 * Setup Wizard route screen (Screen 03).
 * Captures initial budget baseline, preferred currency, and location & notification permissions.
 * Enforces mandatory Location and Notification permissions to support background geofencing and budget alerts.
 * Uses AlertDialog to allow users to retry requesting permissions or open device settings if rejected.
 * Persists settings via setup-service and navigates to the dashboard upon successful completion.
 */
export default function SetupWizardRoute() {
  const router = useRouter();
  const { user, profile, refreshProfile } = useAuthSession();
  const [isLoading, setIsLoading] = useState(false);

  const [pendingData, setPendingData] = useState<SetupWizardSubmitData | null>(null);
  const [permissionDialog, setPermissionDialog] = useState<PermissionDialogState>({
    isOpen: false,
    type: null,
    canAskAgain: true,
  });

  const handleContinue = async (data: SetupWizardSubmitData) => {
    setIsLoading(true);
    setPendingData(data);

    try {
      // 1. Enforce foreground location permission
      let locationPermission: Location.LocationPermissionResponse;

      try {
        locationPermission = await Location.requestForegroundPermissionsAsync();
      } catch {
        toast.error(i18n.t("setup-wizard:permissions.permissionErrorTitle", "Permission Request Failed"), {
          description: i18n.t(
            "setup-wizard:permissions.permissionErrorDesc",
            "Could not request location permission. Please check your device settings."
          ),
        });

        setIsLoading(false);
        setPermissionDialog({
          isOpen: true,
          type: "location",
          canAskAgain: false,
        });
        return;
      }

      if (locationPermission.status !== "granted") {
        toast.error(i18n.t("setup-wizard:permissions.locationDeniedTitle", "Location Access Required"), {
          description: i18n.t(
            "setup-wizard:permissions.locationDeniedDesc",
            "SpendSpot requires location permission to detect saved transit spots and log expenses automatically."
          ),
        });

        setIsLoading(false);
        setPermissionDialog({
          isOpen: true,
          type: "location",
          canAskAgain: locationPermission.canAskAgain,
        });
        return;
      }

      // 2. Enforce push notification permission
      let notifPermission: Notifications.NotificationPermissionsStatus;

      try {
        notifPermission = await Notifications.requestPermissionsAsync();
      } catch {
        toast.error(i18n.t("setup-wizard:permissions.permissionErrorTitle", "Permission Request Failed"), {
          description: i18n.t(
            "setup-wizard:permissions.permissionErrorDesc",
            "Could not request notification permission. Please check your device settings."
          ),
        });

        setIsLoading(false);
        setPermissionDialog({
          isOpen: true,
          type: "notification",
          canAskAgain: false,
        });
        return;
      }

      if (notifPermission.status !== "granted") {
        toast.error(i18n.t("setup-wizard:permissions.notificationDeniedTitle", "Notification Access Required"), {
          description: i18n.t(
            "setup-wizard:permissions.notificationDeniedDesc",
            "SpendSpot requires notification permission to alert you when reaching your daily budget threshold."
          ),
        });

        setIsLoading(false);
        setPermissionDialog({
          isOpen: true,
          type: "notification",
          canAskAgain: notifPermission.canAskAgain,
        });
        return;
      }

      // 3. Validate financial parameters
      if (!data.currency || !data.dailyCap || data.dailyCap <= 0 || !data.monthlyCap || data.monthlyCap <= 0) {
        toast.error("Invalid Budget Configuration", {
          description: "Please specify a valid currency and budget cap greater than zero.",
        });

        setIsLoading(false);
        return;
      }

      // 4. Persist preferences to database if user is authenticated
      if (user?.id) {
        const result = await saveSetupPreferences({
          userId: user.id,
          currency: data.currency,
          dailyCap: data.dailyCap,
          monthlyCap: data.monthlyCap,
        });

        if (!result.success) {
          toast.error(i18n.t("setup-wizard:permissions.saveFailedTitle", "Failed to Save Preferences"), {
            description: result.message,
          });

          setIsLoading(false);
          return;
        }

        await refreshProfile();
      }

      // 5. Success toast & navigation to dashboard
      toast.success(i18n.t("setup-wizard:permissions.successTitle", "Preferences Saved!"), {
        description: `Daily limit set to ${data.currency} ${data.dailyCap.toLocaleString()}`,
      });

      router.replace("/(dashboard)");
    } catch {
      toast.error(i18n.t("setup-wizard:permissions.saveFailedTitle", "Failed to Save Preferences"), {
        description: "An unexpected error occurred while saving your preferences. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDialogAction = async () => {
    const dialogType = permissionDialog.type;
    const canAskAgain = permissionDialog.canAskAgain;
    setPermissionDialog((prev) => ({ ...prev, isOpen: false }));

    if (!canAskAgain) {
      try {
        await Linking.openSettings();
      } catch {
        toast.error("Could not open device settings");
      }
      return;
    }

    if (pendingData) {
      await handleContinue(pendingData);
    } else {
      if (dialogType === "location") {
        await Location.requestForegroundPermissionsAsync();
      } else if (dialogType === "notification") {
        await Notifications.requestPermissionsAsync();
      }
    }
  };

  const handleDialogCancel = () => {
    setPermissionDialog((prev) => ({ ...prev, isOpen: false }));
  };

  const initialCurrency = (profile?.preferred_currency as CurrencyCode) || undefined;
  const initialDailyCap = profile?.daily_limit ?? undefined;

  return (
    <>
      <SetupWizardScreen
        initialCurrency={initialCurrency}
        initialDailyCap={initialDailyCap}
        isLoading={isLoading}
        onContinue={handleContinue}
      />

      <AlertDialog
        open={permissionDialog.isOpen}
        onOpenChange={(open) => setPermissionDialog((prev) => ({ ...prev, isOpen: open }))}
      >
        <AlertDialog.Content>
          <AlertDialog.Header>
            <AlertDialog.Media>
              {permissionDialog.type === "location" ? (
                <MapPin size={24} color="$primary" />
              ) : (
                <Bell size={24} color="$primary" />
              )}
            </AlertDialog.Media>
            <AlertDialog.Title>
              {permissionDialog.type === "location"
                ? i18n.t("setup-wizard:permissions.locationDeniedTitle", "Location Access Required")
                : i18n.t("setup-wizard:permissions.notificationDeniedTitle", "Notification Access Required")}
            </AlertDialog.Title>
            <AlertDialog.Description>
              {permissionDialog.type === "location"
                ? i18n.t(
                    "setup-wizard:permissions.locationDeniedDesc",
                    "SpendSpot requires location permission to detect saved transit spots and log expenses automatically."
                  )
                : i18n.t(
                    "setup-wizard:permissions.notificationDeniedDesc",
                    "SpendSpot requires notification permission to alert you when reaching your daily budget threshold."
                  )}
            </AlertDialog.Description>
          </AlertDialog.Header>
          <AlertDialog.Footer>
            <AlertDialog.Action asChild>
              <Button variant="primary" width="100%" onPress={handleDialogAction}>
                {permissionDialog.canAskAgain
                  ? i18n.t("setup-wizard:permissions.requestAgain", "Grant Permission")
                  : i18n.t("setup-wizard:permissions.openSettings", "Open Settings")}
              </Button>
            </AlertDialog.Action>
            <AlertDialog.Cancel asChild>
              <Button variant="outline" width="100%" onPress={handleDialogCancel}>
                {i18n.t("setup-wizard:permissions.cancel", "Cancel")}
              </Button>
            </AlertDialog.Cancel>
          </AlertDialog.Footer>
        </AlertDialog.Content>
      </AlertDialog>
    </>
  );
}
