import React, { useCallback, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Dimensions, FlatList, NativeScrollEvent, NativeSyntheticEvent } from "react-native";

import { Button } from "@spendspot/ui-components/button";
import { YStack } from "@spendspot/ui-components/stacks";
import { Paragraph, SizableText } from "@spendspot/ui-components/typography";

import { OnboardingBudgetGaugePreview } from "./onboarding-budget-gauge-preview";
import { OnboardingCommutePreview } from "./onboarding-commute-preview";
import { OnboardingCopilotPreview } from "./onboarding-copilot-preview";
import { OnboardingPagination } from "./onboarding-pagination";
import type { OnboardingScreenProps } from "./types";

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const ITEM_SPACING = 16;
const CARD_HORIZONTAL_MARGIN = 24;
const SLIDE_ITEM_WIDTH = SCREEN_WIDTH - CARD_HORIZONTAL_MARGIN * 2;
const SIDE_INSET = (SCREEN_WIDTH - SLIDE_ITEM_WIDTH) / 2;

/**
 * Production-ready Onboarding screen matching Google Stitch 01_onboarding_intro.png.
 * Features centered auto-snapping carousel with exact cross-platform snap offsets,
 * progressive CTA swipe transitions, and pure theme tokens without StyleSheet.create.
 */
export const OnboardingScreen = ({
  initialSlideIndex = 0,
  onReadyToRide,
  onAlreadyHaveAccount,
  testID = "onboarding-screen",
}: OnboardingScreenProps) => {
  const { t } = useTranslation("onboarding");
  const [activeIndex, setActiveIndex] = useState(initialSlideIndex);
  const flatListRef = useRef<FlatList>(null);

  const slides = useMemo(
    () => [
      {
        id: "commute",
        preview: <OnboardingCommutePreview />,
        title: t("slides.commute.title"),
        description: t("slides.commute.description"),
      },
      {
        id: "budget",
        preview: <OnboardingBudgetGaugePreview />,
        title: t("slides.budget.title"),
        description: t("slides.budget.description"),
      },
      {
        id: "copilot",
        preview: <OnboardingCopilotPreview />,
        title: t("slides.copilot.title"),
        description: t("slides.copilot.description"),
      },
    ],
    [t]
  );

  const snapOffsets = useMemo(() => slides.map((_, i) => i * (SLIDE_ITEM_WIDTH + ITEM_SPACING)), [slides]);
  const currentSlide = slides[activeIndex] ?? slides[0];
  const isProgrammaticScrollRef = useRef(false);

  const handleSelectIndex = useCallback((index: number) => {
    setActiveIndex(index);
    isProgrammaticScrollRef.current = true;
    flatListRef.current?.scrollToOffset({
      offset: index * (SLIDE_ITEM_WIDTH + ITEM_SPACING),
      animated: true,
    });
  }, []);

  const handleScroll = useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      if (isProgrammaticScrollRef.current) return;
      const offsetX = event.nativeEvent.contentOffset.x;
      const index = Math.round(offsetX / (SLIDE_ITEM_WIDTH + ITEM_SPACING));
      if (index >= 0 && index < slides.length && index !== activeIndex) {
        setActiveIndex(index);
      }
    },
    [activeIndex, slides.length]
  );

  const handleMomentumScrollEnd = useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      isProgrammaticScrollRef.current = false;
      const offsetX = event.nativeEvent.contentOffset.x;
      const index = Math.round(offsetX / (SLIDE_ITEM_WIDTH + ITEM_SPACING));
      if (index >= 0 && index < slides.length && index !== activeIndex) {
        setActiveIndex(index);
      }
    },
    [activeIndex, slides.length]
  );

  const handleReadyToRidePress = useCallback(() => {
    if (activeIndex < slides.length - 1) {
      handleSelectIndex(activeIndex + 1);
    } else {
      onReadyToRide?.();
    }
  }, [activeIndex, slides.length, handleSelectIndex, onReadyToRide]);

  return (
    <YStack flex={1} paddingVertical="$4" backgroundColor="$background" justifyContent="space-between" testID={testID}>
      {/* Centered Carousel Visual Previews Area */}
      <YStack gap="$2" width="100%">
        <FlatList
          ref={flatListRef}
          data={slides}
          bounces={false}
          horizontal={true}
          keyExtractor={(item) => item.id}
          showsHorizontalScrollIndicator={false}
          onScroll={handleScroll}
          onMomentumScrollEnd={handleMomentumScrollEnd}
          scrollEventThrottle={16}
          snapToOffsets={snapOffsets}
          snapToAlignment="center"
          decelerationRate="fast"
          disableIntervalMomentum={true}
          contentContainerStyle={{
            paddingHorizontal: SIDE_INSET,
            alignItems: "center",
          }}
          ItemSeparatorComponent={() => <YStack width={ITEM_SPACING} />}
          getItemLayout={(_, index) => ({
            length: SLIDE_ITEM_WIDTH + ITEM_SPACING,
            offset: (SLIDE_ITEM_WIDTH + ITEM_SPACING) * index,
            index,
          })}
          renderItem={({ item }) => (
            <YStack width={SLIDE_ITEM_WIDTH} height={340}>
              {item.preview}
            </YStack>
          )}
        />
        {/* Animated Pagination Capsule Indicator */}
        <OnboardingPagination totalSlides={slides.length} activeIndex={activeIndex} onSelectIndex={handleSelectIndex} />
      </YStack>

      {/* Dynamic Value Proposition Typography */}
      <YStack gap="$2.5" paddingHorizontal="$6" marginBottom="$4">
        <SizableText size="$8" fontWeight="800" color="$foreground" maxWidth="90%" letterSpacing={0} numberOfLines={2}>
          {currentSlide.title}
        </SizableText>
        <Paragraph size="$3" fontWeight="400" color="$mutedForeground" letterSpacing={0.2} numberOfLines={2}>
          {currentSlide.description}
        </Paragraph>
      </YStack>

      {/* Bottom Call-to-Action Buttons */}
      <YStack gap="$2.5" paddingHorizontal="$6" marginBottom="$8">
        <Button
          width="100%"
          buttonSize="lg"
          variant="primary"
          onPress={handleReadyToRidePress}
          accessibilityRole="button"
          accessibilityLabel={t("actions.readyToRide")}
        >
          {t("actions.readyToRide")}
        </Button>

        <Button
          width="100%"
          buttonSize="lg"
          variant="secondary"
          onPress={onAlreadyHaveAccount}
          accessibilityRole="button"
          accessibilityLabel={t("actions.alreadyHaveAccount")}
        >
          {t("actions.alreadyHaveAccount")}
        </Button>
      </YStack>
    </YStack>
  );
};

OnboardingScreen.displayName = "OnboardingScreen";
