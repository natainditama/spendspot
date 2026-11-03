import React from "react";
import { useTranslation } from "react-i18next";

import { YStack } from "@spendspot/ui-components/stacks";
import { Paragraph, SizableText } from "@spendspot/ui-components/typography";

/**
 * Privacy disclosure card explaining geofence radius awareness
 * and zero location tracking compliance. Matches 03_setup_wizard.png.
 */
export const SetupPrivacyCard = () => {
  const { t } = useTranslation("setup-wizard");

  return (
    <YStack
      gap="$1.5"
      padding="$4"
      width="100%"
      borderRadius="$5"
      borderWidth="$px"
      borderColor="$border"
      backgroundColor="$secondary"
    >
      <SizableText size="$3" fontWeight="700" color="$foreground" letterSpacing={0.2} numberOfLines={1}>
        {t("privacy.title")}
      </SizableText>
      <Paragraph
        size="$2"
        fontWeight="300"
        color="$mutedForeground"
        letterSpacing={0}
        numberOfLines={3}
        lineHeight={20}
      >
        {t("privacy.description")}
      </Paragraph>
    </YStack>
  );
};

SetupPrivacyCard.displayName = "SetupPrivacyCard";
