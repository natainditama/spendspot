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

import { AuthDivider } from "./auth-divider";
import { AuthLegalFooter } from "./auth-legal-footer";
import type { AuthRegisterScreenProps, RegisterFormErrors, RegisterFormValues } from "./types";

/**
 * Creates dynamic localized Zod validation schema for user account registration.
 */
const createRegisterSchema = (translate: (key: string, fallback?: string) => string) =>
  z.object({
    fullName: z
      .string()
      .min(1, { message: translate("validation.fullNameRequired") })
      .min(2, { message: translate("validation.fullNameMinLength") }),
    email: z
      .email({ message: translate("validation.emailInvalid") })
      .min(1, { message: translate("validation.emailRequired") }),
    password: z
      .string()
      .min(1, { message: translate("validation.passwordRequired") })
      .min(8, { message: translate("validation.passwordMinLength") }),
  });

/**
 * Production-ready Registration screen based on Google Stitch screen 02_auth_register.png.
 * Features centered airy layout, full name, email, and password controls, Google SSO,
 * fluid keyboard avoidance with persistent scroll capability, and Zod validation.
 */
export const AuthRegisterScreen = ({
  initialFullName = "",
  initialEmail = "",
  onRegister,
  onGoogleRegister,
  onNavigateToLogin,
  onTermsPress,
  onPrivacyPress,
  onValidationError,
  isLoading = false,
  testID = "auth-register-screen",
}: AuthRegisterScreenProps) => {
  const { t } = useTranslation(["auth", "common"]);
  const translate = (key: string, fallback?: string) => String(fallback !== undefined ? t(key, fallback) : t(key));

  const [fullName, setFullName] = useState(initialFullName);
  const [email, setEmail] = useState(initialEmail);
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [errors, setErrors] = useState<RegisterFormErrors>({});
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const handleFullNameChange = (text: string) => {
    setFullName(text);
    if (hasSubmitted || errors.fullName) {
      const nameSchema = createRegisterSchema(translate).shape.fullName;
      const res = nameSchema.safeParse(text);
      setErrors((prev) => ({
        ...prev,
        fullName: res.success ? undefined : res.error.issues[0]?.message,
      }));
    }
  };

  const handleEmailChange = (text: string) => {
    setEmail(text);
    if (hasSubmitted || errors.email) {
      const emailSchema = createRegisterSchema(translate).shape.email;
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
      const passwordSchema = createRegisterSchema(translate).shape.password;
      const res = passwordSchema.safeParse(text);
      setErrors((prev) => ({
        ...prev,
        password: res.success ? undefined : res.error.issues[0]?.message,
      }));
    }
  };

  const handleSubmit = () => {
    setHasSubmitted(true);
    const schema = createRegisterSchema(translate);
    const result = schema.safeParse({ fullName, email, password });

    if (!result.success) {
      const nextErrors: RegisterFormErrors = {};
      for (const issue of result.error.issues) {
        const field = issue.path[0] as keyof RegisterFormValues;
        if (!nextErrors[field]) {
          nextErrors[field] = issue.message;
        }
      }
      setErrors(nextErrors);
      onValidationError?.(nextErrors);
      return;
    }

    setErrors({});
    onRegister?.({
      fullName: fullName.trim(),
      email: email.trim(),
      password,
    });
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
              {t("signUp.title")}
            </SizableText>
            <Paragraph size="$3" fontWeight="400" color="$mutedForeground" letterSpacing={0.2} numberOfLines={1}>
              {t("signUp.subtitle")}
            </Paragraph>
          </YStack>

          <YStack gap="$4">
            {/* Full Name Input */}
            <YStack gap="$1.5">
              <Label
                htmlFor="register-name"
                size="$2"
                fontWeight="600"
                color="$foreground"
                letterSpacing={0.2}
                numberOfLines={1}
              >
                {t("signUp.fullNameLabel")}
              </Label>
              <Input
                id="register-name"
                value={fullName}
                onChangeText={handleFullNameChange}
                placeholder={t("signUp.fullNamePlaceholder")}
                autoCapitalize="words"
                autoCorrect={false}
                autoComplete="name"
                height={48}
                borderRadius="$4"
                backgroundColor="$secondary"
                borderColor={errors.fullName ? "$destructive" : "$border"}
                invalid={Boolean(errors.fullName)}
                paddingHorizontal="$3.5"
                accessibilityLabel={t("signUp.fullNameLabel")}
              />
              {errors.fullName ? (
                <SizableText size="$1" fontWeight="500" color="$destructive" letterSpacing={0.2} numberOfLines={1}>
                  {errors.fullName}
                </SizableText>
              ) : null}
            </YStack>

            {/* Email Address Input */}
            <YStack gap="$1.5">
              <Label
                htmlFor="register-email"
                size="$2"
                fontWeight="600"
                color="$foreground"
                letterSpacing={0.2}
                numberOfLines={1}
              >
                {t("signUp.emailLabel")}
              </Label>
              <Input
                id="register-email"
                value={email}
                onChangeText={handleEmailChange}
                placeholder={t("signUp.emailPlaceholder")}
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
                accessibilityLabel={t("signUp.emailLabel")}
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
                  htmlFor="register-password"
                  size="$2"
                  fontWeight="600"
                  color="$foreground"
                  letterSpacing={0.2}
                  numberOfLines={1}
                >
                  {t("signUp.passwordLabel")}
                </Label>
              </XStack>

              <ZStack width="100%" alignItems="center" justifyContent="center">
                <Input
                  id="register-password"
                  value={password}
                  onChangeText={handlePasswordChange}
                  placeholder={t("signUp.passwordPlaceholder")}
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
                  accessibilityLabel={t("signUp.passwordLabel")}
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
              accessibilityLabel={t("signUp.submitButton")}
            >
              {t("signUp.submitButton")}
            </Button>

            {/* Social Authentication Divider */}
            <AuthDivider labelKey="signUp.orContinueWith" />

            {/* Google SSO Button */}
            <Button
              width="100%"
              height={50}
              buttonSize="lg"
              variant="secondary"
              borderRadius="$4"
              borderColor="$border"
              borderWidth="$px"
              onPress={onGoogleRegister}
              disabled={isLoading}
              accessibilityRole="button"
              accessibilityLabel={t("signUp.signUpWithGoogle")}
            >
              {t("signUp.signUpWithGoogle")}
            </Button>
          </YStack>

          <YStack gap="$4" marginTop="$4">
            <XStack alignItems="center" justifyContent="center" gap="$1.5">
              <Paragraph size="$2" fontWeight="300" color="$mutedForeground" letterSpacing={0.2} numberOfLines={1}>
                {t("signUp.hasAccount")}
              </Paragraph>
              <Pressable
                onPress={onNavigateToLogin}
                accessibilityRole="button"
                accessibilityLabel={t("signUp.signInLink")}
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
                  {t("signUp.signInLink")}
                </SizableText>
              </Pressable>
            </XStack>

            <AuthLegalFooter mode="signUp" onTermsPress={onTermsPress} onPrivacyPress={onPrivacyPress} />
          </YStack>
        </YStack>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

AuthRegisterScreen.displayName = "AuthRegisterScreen";
