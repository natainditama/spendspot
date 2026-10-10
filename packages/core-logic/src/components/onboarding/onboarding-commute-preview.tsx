import React from "react";
import { useTranslation } from "react-i18next";

import { Navigation, Train } from "@spendspot/ui-components/icons";
import { XStack, YStack, ZStack } from "@spendspot/ui-components/stacks";
import { SizableText } from "@spendspot/ui-components/typography";

/**
 * Visual illustration card for Slide 1 demonstrating geofenced commute detection.
 * Features realistic map street grid lines, transit route path, radar pulse, and arrival card.
 * Uses pure Tamagui theme tokens without any hardcoded colors or StyleSheet.create.
 */
export const OnboardingCommutePreview = () => {
  const { t } = useTranslation("onboarding");

  return (
    <YStack
      padding="$4"
      width="100%"
      height="100%"
      borderWidth="$px"
      overflow="hidden"
      borderRadius="$6"
      position="relative"
      alignItems="center"
      borderColor="$border"
      justifyContent="center"
      backgroundColor="$secondary"
      testID="onboarding-commute-preview"
    >
      {/* Background Street Map Grid: Thin intersecting street lines */}
      <ZStack position="absolute" top={0} left={0} right={0} bottom={0} pointerEvents="none">
        {/* Horizontal street grid lines */}
        <YStack position="absolute" top="18%" left={0} right={0} height={1} backgroundColor="$gridLine" opacity={0.7} />
        <YStack position="absolute" top="48%" left={0} right={0} height={1} backgroundColor="$gridLine" opacity={0.6} />
        <YStack position="absolute" top="68%" left={0} right={0} height={1} backgroundColor="$gridLine" opacity={0.7} />
        <YStack position="absolute" top="84%" left={0} right={0} height={1} backgroundColor="$gridLine" opacity={0.5} />

        {/* Vertical street grid lines */}
        <YStack position="absolute" left="15%" top={0} bottom={0} width={1} backgroundColor="$gridLine" opacity={0.7} />
        <YStack position="absolute" left="38%" top={0} bottom={0} width={1} backgroundColor="$gridLine" opacity={0.6} />
        <YStack position="absolute" left="62%" top={0} bottom={0} width={1} backgroundColor="$gridLine" opacity={0.7} />
        <YStack position="absolute" left="85%" top={0} bottom={0} width={1} backgroundColor="$gridLine" opacity={0.6} />
      </ZStack>

      {/* Main transit route line */}
      <YStack position="absolute" top="36%" left={0} right={0} height="$1" backgroundColor="$routeLine" opacity={0.9} />
      <YStack
        position="absolute"
        top="35%"
        left="70%"
        width="$3"
        height="$3"
        borderRadius="$full"
        borderWidth={1}
        borderColor="$foreground"
        backgroundColor="$card"
      />

      {/* Radar ripple rings and location pin */}
      <YStack position="absolute" top="8%" alignItems="center" justifyContent="center">
        <YStack
          width="$48"
          height="$48"
          borderWidth="$px"
          borderRadius="$full"
          alignItems="center"
          justifyContent="center"
          backgroundColor="$mapOverlayOuter"
          borderColor="$border"
        >
          <YStack
            width="$24"
            height="$24"
            borderWidth="$px"
            borderRadius="$full"
            alignItems="center"
            justifyContent="center"
            backgroundColor="$mapOverlay"
            borderColor="$border"
          >
            {/* Center Location Pin */}
            <YStack
              width="$8"
              height="$8"
              alignItems="center"
              borderRadius="$full"
              justifyContent="center"
              backgroundColor="$foreground"
            >
              <Navigation size="$4" marginLeft={-2} marginBottom={-2} color="$background" />
            </YStack>
          </YStack>
        </YStack>

        {/* Accuracy indicator pill badge */}
        <YStack
          elevation="$1"
          marginTop={-64}
          borderRadius="$6"
          borderWidth="$px"
          paddingVertical="$1"
          borderColor="$border"
          backgroundColor="$card"
          paddingHorizontal="$2.5"
        >
          <SizableText size="$1" fontWeight="600" color="$foreground" letterSpacing={0.1} numberOfLines={1}>
            {t("slides.commute.map.accuracy")}
          </SizableText>
        </YStack>
      </YStack>

      {/* Floating transit arrival prompt card */}
      <XStack
        gap="$3"
        left="$4"
        right="$4"
        bottom="$4"
        padding="$3"
        borderWidth="$px"
        borderRadius="$5"
        position="absolute"
        alignItems="center"
        borderColor="$border"
        backgroundColor="$card"
        justifyContent="center"
      >
        <YStack
          height="100%"
          aspectRatio={1}
          borderRadius="$4"
          alignItems="center"
          justifyContent="center"
          backgroundColor="$secondary"
        >
          <Train size={24} color="$foreground" />
        </YStack>

        <YStack flex={1} alignItems="flex-start" justifyContent="center">
          <SizableText size="$4" fontWeight="700" color="$foreground" letterSpacing={0} numberOfLines={1}>
            {t("slides.commute.map.station")}
          </SizableText>
          <SizableText size="$2" color="$mutedForeground" letterSpacing={0.2} numberOfLines={1}>
            {t("slides.commute.map.arrivalStatus")}
          </SizableText>
        </YStack>
      </XStack>
    </YStack>
  );
};

OnboardingCommutePreview.displayName = "OnboardingCommutePreview";
