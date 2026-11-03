import React from "react";
import { useTranslation } from "react-i18next";
import { Pressable } from "react-native";

import { XStack, YStack } from "@spendspot/ui-components/stacks";
import { Paragraph, SizableText } from "@spendspot/ui-components/typography";

interface AuthLegalFooterProps {
  mode: "signIn" | "signUp";
  onTermsPress?: () => void;
  onPrivacyPress?: () => void;
}

/**
 * Centered legal compliance disclosure caption with interactive terms and privacy links.
 */
export const AuthLegalFooter = ({ mode, onTermsPress, onPrivacyPress }: AuthLegalFooterProps) => {
  const { t } = useTranslation("auth");
  const prefixKey = mode === "signIn" ? "signIn.termsNotice" : "signUp.termsNotice";

  return (
    <YStack alignItems="center" justifyContent="center" width="100%" marginTop="$2">
      <XStack flexWrap="wrap" alignItems="center" justifyContent="center" gap="$1">
        <Paragraph size="$2" color="$mutedForeground" textAlign="center" letterSpacing={0.1} numberOfLines={1}>
          {t(prefixKey, "By signing in, you agree to our")}{" "}
        </Paragraph>
        <Pressable
          accessibilityRole="link"
          onPress={onTermsPress}
          accessibilityLabel={t("signIn.termsOfService", "Terms of Service")}
          hitSlop={{ top: 8, bottom: 8, left: 4, right: 4 }}
        >
          <SizableText
            size="$2"
            fontWeight="600"
            numberOfLines={1}
            letterSpacing={0.1}
            color="$foreground"
            textDecorationLine="underline"
          >
            {t("signIn.termsOfService", "Terms of Service")}
          </SizableText>
        </Pressable>
        <Paragraph size="$2" color="$mutedForeground" textAlign="center" letterSpacing={0.1} numberOfLines={1}>
          {" "}
          {t("signIn.and", "and")}{" "}
        </Paragraph>
        <Pressable
          accessibilityRole="link"
          onPress={onPrivacyPress}
          accessibilityLabel={t("signIn.privacyPolicy", "Privacy Policy")}
          hitSlop={{ top: 8, bottom: 8, left: 4, right: 4 }}
        >
          <SizableText
            size="$2"
            fontWeight="600"
            numberOfLines={1}
            letterSpacing={0.1}
            color="$foreground"
            textDecorationLine="underline"
          >
            {t("signIn.privacyPolicy", "Privacy Policy")}
          </SizableText>
        </Pressable>
      </XStack>
    </YStack>
  );
};

AuthLegalFooter.displayName = "AuthLegalFooter";
