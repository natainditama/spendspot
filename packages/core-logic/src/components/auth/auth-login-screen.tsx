import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { KeyboardAvoidingView, Platform, Pressable, ScrollView } from "react-native";
import { z } from "zod";

import { Button } from "@spendspot/ui-components/button";
import { Eye, EyeOff } from "@spendspot/ui-components/icons";
import { Input } from "@spendspot/ui-components/input";
import { Label } from "@spendspot/ui-components/label";
import { XStack, YStack, ZStack } from "@spendspot/ui-components/stacks";
import { Paragraph, SizableText } from "@spendspot/ui-components/typography";

import { AuthLegalNoticeFooter } from "./auth-legal-notice-footer";
import { AuthSocialDivider } from "./auth-social-divider";
import type { AuthLoginScreenProps, LoginFormErrors, LoginFormValues } from "./types";

/**
 * Creates dynamic localized Zod validation schema for user login credentials.
 */
export const createLoginSchema = (translate: (key: string, fallback?: string) => string) =>
  z.object({
    email: z
      .email({ message: translate("validation.emailInvalid") })
      .min(1, { message: translate("validation.emailRequired") }),
    password: z
      .string()
      .min(1, { message: translate("validation.passwordRequired") })
      .min(8, { message: translate("validation.passwordMinLength") }),
  });

/**
 * Production-ready Login authentication screen based on Google Stitch screen 02_auth_login.png.
 * Features centered airy layout, secure credential inputs, Google SSO, password toggle,
 * fluid keyboard avoidance with persistent scroll capability, and Zod validation.
 */
export const AuthLoginScreen = ({
  initialEmail = "",
  onLogin,
  onGoogleLogin,
  onForgotPassword,
  onNavigateToRegister,
  onTermsPress,
  onPrivacyPress,
  onValidationError,
  isLoading = false,
  testID = "auth-login-screen",
}: AuthLoginScreenProps) => {
  const { t } = useTranslation(["auth", "common"]);
  const translate = (key: string, fallback?: string) => String(fallback !== undefined ? t(key, fallback) : t(key));

  const [email, setEmail] = useState(initialEmail);
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [errors, setErrors] = useState<LoginFormErrors>({});
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const handleEmailChange = (text: string) => {
    setEmail(text);
    if (hasSubmitted || errors.email) {
      const emailSchema = createLoginSchema(translate).shape.email;
      const res = emailSchema.safeParse(text);
      setErrors((prev) => ({
        ...prev,
        email: res.success ? undefined : res.error.issues[0]?.message,
      }));
    }
  };

  const handlePasswordChange = (text: string) => {
    setPassword(text);
    if (hasSubmitted || errors.password) {
      const passwordSchema = createLoginSchema(translate).shape.password;
      const res = passwordSchema.safeParse(text);
      setErrors((prev) => ({
        ...prev,
        password: res.success ? undefined : res.error.issues[0]?.message,
      }));
    }
  };

  const handleSubmit = async () => {
    setHasSubmitted(true);
    const schema = createLoginSchema(translate);
    const result = schema.safeParse({ email, password });

    if (!result.success) {
      const nextErrors: LoginFormErrors = {};
      for (const issue of result.error.issues) {
        const field = issue.path[0] as keyof LoginFormValues;
        if (!nextErrors[field]) {
          nextErrors[field] = issue.message;
        }
      }
      setErrors(nextErrors);
      onValidationError?.(nextErrors);
      return;
    }

    setErrors({});
    await onLogin?.({ email: email.trim(), password });
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      keyboardVerticalOffset={Platform.OS === "ios" ? 12 : 0}
      style={{ flex: 1 }}
      testID={testID}
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag"
        automaticallyAdjustKeyboardInsets={Platform.OS === "ios"}
        showsVerticalScrollIndicator={false}
        nestedScrollEnabled={true}
        scrollEnabled={true}
      >
        <YStack
          flex={1}
          gap="$6"
          paddingVertical="$6"
          paddingHorizontal="$6"
          backgroundColor="$background"
          justifyContent="center"
          alignItems="stretch"
          width="100%"
        >
          {/* Header Section */}
          <YStack gap="$1.5">
            <SizableText size="$8" fontWeight="800" color="$foreground" letterSpacing={0} numberOfLines={1}>
              {t("signIn.title")}
            </SizableText>
            <Paragraph size="$3" fontWeight="400" color="$mutedForeground" letterSpacing={0.2} numberOfLines={1}>
              {t("signIn.subtitle")}
            </Paragraph>
          </YStack>

          <YStack gap="$4">
            {/* Email Address Input */}
            <YStack gap="$1.5">
              <Label
                htmlFor="login-email"
                size="$2"
                fontWeight="600"
                color="$foreground"
                letterSpacing={0.2}
                numberOfLines={1}
              >
                {t("signIn.emailLabel")}
              </Label>
              <Input
                id="login-email"
                value={email}
                onChangeText={handleEmailChange}
                placeholder={t("signIn.emailPlaceholder")}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                autoComplete="email"
                height={48}
                borderRadius="$4"
                backgroundColor="$secondary"
                borderColor={errors.email ? "$destructive" : "$border"}
                invalid={Boolean(errors.email)}
                paddingHorizontal="$3.5"
                paddingRight="$3.5"
                accessibilityLabel={t("signIn.emailLabel")}
              />
              {errors.email ? (
                <SizableText size="$1" fontWeight="500" color="$destructive" letterSpacing={0.2} numberOfLines={1}>
                  {errors.email}
                </SizableText>
              ) : null}
            </YStack>

            {/* Password Input with Visibility Toggle */}
            <YStack gap="$1.5">
              <XStack justifyContent="space-between" alignItems="center">
                <Label
                  htmlFor="login-password"
                  size="$2"
                  fontWeight="600"
                  color="$foreground"
                  letterSpacing={0.2}
                  numberOfLines={1}
                >
                  {t("signIn.passwordLabel")}
                </Label>
                <Pressable
                  onPress={onForgotPassword}
                  accessibilityRole="button"
                  accessibilityLabel={t("signIn.forgotPassword")}
                  hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                >
                  <SizableText
                    size="$2"
                    color="$mutedForeground"
                    fontWeight="500"
                    letterSpacing={0.2}
                    numberOfLines={1}
                  >
                    {t("signIn.forgotPassword")}
                  </SizableText>
                </Pressable>
              </XStack>

              <ZStack width="100%" alignItems="center" justifyContent="center">
                <Input
                  id="login-password"
                  value={password}
                  onChangeText={handlePasswordChange}
                  placeholder={t("signIn.passwordPlaceholder")}
                  secureTextEntry={!isPasswordVisible}
                  autoCapitalize="none"
                  autoCorrect={false}
                  autoComplete="password"
                  height={48}
                  borderRadius="$4"
                  backgroundColor="$secondary"
                  borderColor={errors.password ? "$destructive" : "$border"}
                  invalid={Boolean(errors.password)}
                  paddingHorizontal="$3.5"
                  paddingRight={46}
                  accessibilityLabel={t("signIn.passwordLabel")}
                />
                <YStack position="absolute" right={12} top={14}>
                  <Pressable
                    onPress={() => setIsPasswordVisible(!isPasswordVisible)}
                    accessibilityRole="button"
                    accessibilityLabel="Toggle password visibility"
                    hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
                  >
                    {isPasswordVisible ? (
                      <EyeOff size={20} color="$mutedForeground" />
                    ) : (
                      <Eye size={20} color="$mutedForeground" />
                    )}
                  </Pressable>
                </YStack>
              </ZStack>
              {errors.password ? (
                <SizableText size="$1" fontWeight="500" color="$destructive" letterSpacing={0.2} numberOfLines={1}>
                  {errors.password}
                </SizableText>
              ) : null}
            </YStack>

            {/* Primary Submit Button */}
            <Button
              width="100%"
              height={50}
              buttonSize="lg"
              variant="primary"
              borderRadius="$4"
              borderColor="$border"
              borderWidth="$px"
              onPress={handleSubmit}
              disabled={isLoading}
              accessibilityRole="button"
              accessibilityLabel={t("signIn.submitButton")}
            >
              {t("signIn.submitButton")}
            </Button>

            {/* Social Authentication Divider */}
            <AuthSocialDivider labelKey="signIn.orContinueWith" />

            {/* Google SSO Button */}
            <Button
              width="100%"
              height={50}
              buttonSize="lg"
              variant="secondary"
              borderRadius="$4"
              borderColor="$border"
              borderWidth="$px"
              onPress={onGoogleLogin}
              disabled={isLoading}
              accessibilityRole="button"
              accessibilityLabel={t("signIn.continueWithGoogle")}
            >
              {t("signIn.continueWithGoogle")}
            </Button>
          </YStack>

          <YStack gap="$4" marginTop="$4">
            <XStack alignItems="center" justifyContent="center" gap="$1.5">
              <Paragraph size="$2" fontWeight="300" color="$mutedForeground" letterSpacing={0.2} numberOfLines={1}>
                {t("signIn.noAccount")}
              </Paragraph>
              <Pressable
                onPress={onNavigateToRegister}
                accessibilityRole="button"
                accessibilityLabel={t("signIn.signUpLink")}
                hitSlop={{ top: 8, bottom: 8, left: 4, right: 4 }}
              >
                <SizableText
                  size="$2"
                  fontWeight="700"
                  color="$foreground"
                  letterSpacing={0.2}
                  numberOfLines={1}
                  textDecorationLine="underline"
                >
                  {t("signIn.signUpLink")}
                </SizableText>
              </Pressable>
            </XStack>

            <AuthLegalNoticeFooter mode="signIn" onTermsPress={onTermsPress} onPrivacyPress={onPrivacyPress} />
          </YStack>
        </YStack>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

AuthLoginScreen.displayName = "AuthLoginScreen";
