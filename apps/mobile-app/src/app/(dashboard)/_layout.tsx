import { Tabs } from "expo-router";
import React from "react";
import { Platform, Pressable } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import i18n from "@spendspot/core-logic/i18n";
import { UserOnlyProvider } from "@spendspot/core-logic/providers/user-only-provider";
import { lightTheme } from "@spendspot/ui-components/config";
import { Bell, Home, Map, Sliders, Sparkles, TrendingUp, User } from "@spendspot/ui-components/icons";
import { XStack, YStack } from "@spendspot/ui-components/stacks";
import { toast } from "@spendspot/ui-components/toast";

import { screenOptions } from "../_layout";

/**
 * Shared dashboard screen options inheriting standard header styling from root _layout.tsx
 * Compatible with React Navigation Bottom Tabs contract.
 */
export const dashboardScreenOptions = {
  headerShown: screenOptions.headerShown,
  headerShadowVisible: screenOptions.headerShadowVisible,
  headerTitleAlign: "left",
  headerStyle: screenOptions.headerStyle,
  headerTintColor: screenOptions.headerTintColor,
  headerTitleStyle: screenOptions.headerTitleStyle,
} as const;

/**
 * Header right action buttons: Notifications bell & User profile shortcut.
 * Disables Android wave animation in favor of subtle iOS-style opacity press.
 */
function DashboardHeaderRight() {
  return (
    <XStack gap="$4" alignItems="center" marginRight="$6">
      <Pressable
        onPress={() => toast("Notifications", { description: "No new budget notifications." })}
        accessibilityRole="button"
        accessibilityLabel="Notifications"
        android_ripple={{ color: "transparent" }}
        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        style={({ pressed }) => ({ opacity: pressed ? 0.7 : 1 })}
      >
        <Bell size={20} color="$foreground" />
      </Pressable>

      <Pressable
        onPress={() => toast("User Profile", { description: "Account: Nata (IDR)" })}
        accessibilityRole="button"
        accessibilityLabel="User Profile"
        android_ripple={{ color: "transparent" }}
        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        style={({ pressed }) => ({ opacity: pressed ? 0.7 : 1 })}
      >
        <YStack
          width={32}
          height={32}
          alignItems="center"
          borderRadius="$full"
          justifyContent="center"
          backgroundColor="$foreground"
        >
          <User size={16} color="$background" />
        </YStack>
      </Pressable>
    </XStack>
  );
}

/**
 * Route group layout for the authenticated Home Dashboard experience.
 * Inherits standard screenOptions and header configuration from root _layout.tsx.
 * Provides safe-area bottom elevation and disables Android ripple wave animations.
 */
export default function DashboardLayout() {
  const insets = useSafeAreaInsets();
  const bottomPadding = Math.max(insets.bottom, Platform.OS === "android" ? 20 : 16);
  const tabHeight = 60 + bottomPadding;

  return (
    <UserOnlyProvider>
      <Tabs
        screenOptions={{
          ...dashboardScreenOptions,
          headerRight: () => <DashboardHeaderRight />,
          tabBarActiveTintColor: lightTheme.foreground,
          tabBarInactiveTintColor: lightTheme.mutedForeground,
          tabBarStyle: {
            backgroundColor: lightTheme.background,
            borderTopColor: lightTheme.border,
            borderTopWidth: 1,
            height: tabHeight,
            paddingBottom: bottomPadding,
            paddingTop: 8,
            elevation: 0,
            shadowOffset: {
              width: 0,
              height: 0,
            },
          },
          tabBarButton: (props) => {
            const { ref: _ref, ...rest } = props as any;

            return (
              <Pressable
                {...rest}
                android_ripple={{ color: "transparent" }}
                style={({ pressed }) => [rest.style, { opacity: pressed ? 0.7 : 1 }]}
              />
            );
          },
          tabBarLabelStyle: {
            fontSize: 10,
            fontWeight: "600",
          },
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            ...dashboardScreenOptions,
            title: i18n.t("home-dashboard:header.title", "Home"),
            tabBarLabel: i18n.t("home-dashboard:nav.home", "Home"),
            tabBarIcon: ({ color, size }) => <Home size={size} color={color as any} />,
          }}
        />
        <Tabs.Screen
          name="spots"
          options={{
            ...dashboardScreenOptions,
            title: i18n.t("geofence-map:header.title", "Spot and Map"),
            tabBarLabel: i18n.t("home-dashboard:nav.spots", "Spots & Map"),
            tabBarIcon: ({ color, size }) => <Map size={size} color={color as any} />,
          }}
        />
        <Tabs.Screen
          name="analytics"
          options={{
            ...dashboardScreenOptions,
            title: i18n.t("home-dashboard:nav.analytics", "Analytics"),
            tabBarLabel: i18n.t("home-dashboard:nav.analytics", "Analytics"),
            tabBarIcon: ({ color, size }) => <TrendingUp size={size} color={color as any} />,
          }}
        />
        <Tabs.Screen
          name="advisor"
          options={{
            ...dashboardScreenOptions,
            title: i18n.t("home-dashboard:nav.advisor", "AI Advisor"),
            tabBarLabel: i18n.t("home-dashboard:nav.advisor", "Advisor"),
            tabBarIcon: ({ color, size }) => <Sparkles size={size} color={color as any} />,
          }}
        />
        <Tabs.Screen
          name="settings"
          options={{
            ...dashboardScreenOptions,
            title: i18n.t("home-dashboard:nav.settings", "Settings"),
            tabBarLabel: i18n.t("home-dashboard:nav.settings", "Settings"),
            tabBarIcon: ({ color, size }) => <Sliders size={size} color={color as any} />,
          }}
        />
      </Tabs>
    </UserOnlyProvider>
  );
}
