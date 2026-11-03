import React from "react";
import { useTranslation } from "react-i18next";
import { Linking, Pressable } from "react-native";

import { XStack, YStack } from "@spendspot/ui-components/stacks";
import { Paragraph, SizableText } from "@spendspot/ui-components/typography";

import { PRIVACY_URL, TERMS_URL } from "../../constants/compliance-policies";

export interface AuthLegalNoticeFooterProps {
  mode: "signIn" | "signUp";
  onTermsPress?: () => void;
  onPrivacyPress?: () => void;
}

const handleDefaultTerms = () => {
  Linking.openURL(TERMS_URL).catch(() => {});
};

const handleDefaultPrivacy = () => {
  Linking.openURL(PRIVACY_URL).catch(() => {});
};

/**
 * Centered legal compliance disclosure caption with interactive terms and privacy links.
 */
export const AuthLegalNoticeFooter = ({ mode, onTermsPress, onPrivacyPress }: AuthLegalNoticeFooterProps) => {
  const { t } = useTranslation("auth");
  const prefixKey = mode === "signIn" ? "signIn.termsNotice" : "signUp.termsNotice";

  return (
    <YStack alignItems="center" justifyContent="center" width="100%">
      <XStack flexWrap="wrap" alignItems="center" justifyContent="center" gap="$1">
        <Paragraph
          size="$2"
          fontWeight="300"
          color="$mutedForeground"
          letterSpacing={0.1}
          numberOfLines={1}
          textAlign="center"
        >
          {t(prefixKey)}
        </Paragraph>
        <Pressable
          accessibilityRole="link"
          onPress={onTermsPress ?? handleDefaultTerms}
          accessibilityLabel={t("signIn.termsOfService")}
          hitSlop={{ top: 8, bottom: 8, left: 4, right: 4 }}
        >
          <SizableText
            size="$2"
            fontWeight="600"
            color="$foreground"
            numberOfLines={1}
            letterSpacing={0.1}
            textDecorationLine="underline"
          >
            {t("signIn.termsOfService")}
          </SizableText>
        </Pressable>
        <Paragraph
          size="$2"
          fontWeight="300"
          color="$mutedForeground"
          letterSpacing={0.1}
          numberOfLines={1}
          textAlign="center"
        >
          {t("signIn.and")}
        </Paragraph>
        <Pressable
          accessibilityRole="link"
          onPress={onPrivacyPress ?? handleDefaultPrivacy}
          accessibilityLabel={t("signIn.privacyPolicy")}
          hitSlop={{ top: 8, bottom: 8, left: 4, right: 4 }}
        >
          <SizableText
            size="$2"
            fontWeight="600"
            color="$foreground"
            numberOfLines={1}
            letterSpacing={0.1}
            textDecorationLine="underline"
          >
            {t("signIn.privacyPolicy")}
          </SizableText>
        </Pressable>
      </XStack>
    </YStack>
  );
};

AuthLegalNoticeFooter.displayName = "AuthLegalNoticeFooter";
