import React from "react";
import { useTranslation } from "react-i18next";
import { Pressable } from "react-native";

import { XStack, YStack } from "@spendspot/ui-components/stacks";

import type { OnboardingPaginationProps } from "./types";

/**
 * Capsule indicator displaying current slide position within the onboarding carousel.
 * Smoothly animates capsule width using Tamagui's built-in 'quickerLessBouncy' transition preset
 * and standard theme tokens without hardcoded colors or React Native Animated boilerplate.
 */
export const OnboardingPagination = ({ totalSlides, activeIndex, onSelectIndex }: OnboardingPaginationProps) => {
  const { t } = useTranslation("onboarding");

  return (
    <XStack
      gap="$2"
      marginVertical="$4"
      alignItems="center"
      justifyContent="center"
      accessibilityRole="tablist"
      accessibilityLabel={t("pagination.tablistLabel")}
    >
      {Array.from({ length: totalSlides }).map((_, index) => {
        const isActive = index === activeIndex;

        return (
          <Pressable
            key={`pagination-dot-${index}`}
            accessibilityRole="tab"
            accessibilityState={{ selected: isActive }}
            accessibilityLabel={t("pagination.slideLabel", {
              current: index + 1,
              total: totalSlides,
              defaultValue: `Slide ${index + 1} of ${totalSlides}`,
            })}
            onPress={() => onSelectIndex(index)}
            hitSlop={{ top: 12, bottom: 12, left: 8, right: 8 }}
          >
            <YStack
              height="$2"
              borderRadius="$full"
              transition="150ms"
              width={isActive ? "$6" : "$2"}
              backgroundColor={isActive ? "$foreground" : "$border"}
            />
          </Pressable>
        );
      })}
    </XStack>
  );
};

OnboardingPagination.displayName = "OnboardingPagination";
