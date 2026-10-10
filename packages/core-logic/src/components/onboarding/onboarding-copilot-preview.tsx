import React from "react";
import { useTranslation } from "react-i18next";

import { XStack, YStack } from "@spendspot/ui-components/stacks";
import { Paragraph, SizableText } from "@spendspot/ui-components/typography";

/**
 * Visual illustration card for Slide 3 showcasing the on-device AI Copilot assistant.
 * Built with pure Tamagui stacks and typography, free of hardcoded colors and StyleSheet.create.
 */
export const OnboardingCopilotPreview = () => {
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
      justifyContent="space-between"
      backgroundColor="$secondary"
      testID="onboarding-copilot-preview"
    >
      {/* Header section with advisor title & AI query budget badge */}
      <YStack gap="$1" alignItems="flex-start" justifyContent="space-between" width="100%" marginTop="$2">
        <YStack gap="$0.5">
          <SizableText size="$1" fontWeight="700" color="$mutedForeground" letterSpacing={0.2} numberOfLines={1}>
            {t("slides.copilot.headerLabel", "PRIVATE AI ADVISOR")}
          </SizableText>
          <SizableText size="$7" fontWeight="800" color="$foreground" numberOfLines={1}>
            {t("slides.copilot.copilotTitle", "Transit Copilot")}
          </SizableText>
        </YStack>
      </YStack>

      {/* Interactive conversational exchange mockup */}
      <YStack gap="$2.5" marginVertical="$1">
        {/* User query speech bubble */}
        <YStack
          gap="$1.5"
          width="100%"
          padding="$3"
          borderWidth="$px"
          borderRadius="$5"
          borderColor="$border"
          backgroundColor="$primary"
          alignSelf="flex-end"
          maxWidth="90%"
        >
          <Paragraph size="$2" fontWeight="400" color="$primaryForeground" letterSpacing={0.1} numberOfLines={2}>
            {t("slides.copilot.userMessage")}
          </Paragraph>
        </YStack>

        {/* AI response card */}
        <YStack
          gap="$1.5"
          width="100%"
          padding="$3"
          borderWidth="$px"
          borderRadius="$5"
          borderColor="$border"
          backgroundColor="$card"
          alignSelf="flex-start"
        >
          <XStack alignItems="center" gap="$1">
            <SizableText size="$2" fontWeight="700" color="$cardForeground" letterSpacing={0.1} numberOfLines={1}>
              {t("slides.copilot.aiName")}
            </SizableText>
          </XStack>

          <Paragraph size="$2" fontWeight="400" color="$cardForeground" letterSpacing={0.1} numberOfLines={3}>
            {t("slides.copilot.aiResponse")}
          </Paragraph>
        </YStack>
      </YStack>

      {/* Security & on-device privacy guarantee footer pill */}
      <XStack
        gap="$3"
        width="100%"
        padding="$1.5"
        borderWidth="$px"
        borderRadius="$5"
        alignItems="center"
        borderColor="$border"
        backgroundColor="$card"
        justifyContent="center"
      >
        <SizableText size="$1" color="$mutedForeground" letterSpacing={0} numberOfLines={1}>
          {t("slides.copilot.securityBadge")}
        </SizableText>
      </XStack>
    </YStack>
  );
};

OnboardingCopilotPreview.displayName = "OnboardingCopilotPreview";
