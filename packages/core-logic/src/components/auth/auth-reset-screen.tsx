import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { KeyboardAvoidingView, Platform, Pressable, ScrollView } from "react-native";
import { z } from "zod";

import { Button } from "@spendspot/ui-components/button";
import { Heading } from "@spendspot/ui-components/heading";
import { Eye, EyeOff } from "@spendspot/ui-components/icons";
import { Input } from "@spendspot/ui-components/input";
import { Label } from "@spendspot/ui-components/label";
import { XStack, YStack, ZStack } from "@spendspot/ui-components/stacks";
import { Paragraph, SizableText } from "@spendspot/ui-components/typography";

import type { AuthResetScreenProps, ResetPasswordFormErrors, ResetPasswordFormValues } from "./types";

/**
 * Creates localized Zod schema for password reset and confirmation.
 */
export const createResetPasswordSchema = (translate: (key: string, fallback?: string) => string) =>
  z
    .object({
      password: z
        .string()
        .min(1, { message: translate("validation.passwordRequired", "Password is required") })
        .min(8, { message: translate("validation.passwordMinLength", "Password must be at least 8 characters") }),
      confirmPassword: z.string().min(1, { message: translate("validation.required", "Please confirm your password") }),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: translate("validation.passwordMismatch", "Passwords do not match"),
      path: ["confirmPassword"],
    });

/**
 * Reset Password Screen component (Screen 02 / Auth Recovery).
 * Allows users arriving via email recovery deep link to establish a new password.
 * Follows the 3-word filename convention (auth-reset-screen.tsx) and design tokens.
 */
export const AuthResetScreen = ({
  onSubmit,
  onNavigateToLogin,
  isLoading = false,
  testID = "auth-reset-screen",
}: AuthResetScreenProps) => {
  const { t } = useTranslation(["auth", "common"]);
  const translate = (key: string, fallback?: string) => String(fallback !== undefined ? t(key, fallback) : t(key));

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);
  const [errors, setErrors] = useState<ResetPasswordFormErrors>({});

  const validateField = (field: keyof ResetPasswordFormValues, value: string) => {
    const nextValues: ResetPasswordFormValues = {
      password: field === "password" ? value : password,
      confirmPassword: field === "confirmPassword" ? value : confirmPassword,
    };

    const schema = createResetPasswordSchema(translate);
    const result = schema.safeParse(nextValues);

    if (result.success) {
      setErrors({});
    } else {
      const fieldError = result.error.issues.find((issue) => issue.path[0] === field);
      setErrors((prev) => ({
        ...prev,
        [field]: fieldError?.message,
      }));
    }
  };

  const handlePasswordChange = (text: string) => {
    setPassword(text);
    if (errors.password) {
      validateField("password", text);
    }
  };

  const handleConfirmPasswordChange = (text: string) => {
    setConfirmPassword(text);
    if (errors.confirmPassword) {
      validateField("confirmPassword", text);
    }
  };

  const handleSubmit = async () => {
    const values: ResetPasswordFormValues = { password, confirmPassword };
    const schema = createResetPasswordSchema(translate);
    const result = schema.safeParse(values);

    if (!result.success) {
      const fieldErrors: ResetPasswordFormErrors = {};
      result.error.issues.forEach((issue) => {
        const fieldName = issue.path[0] as keyof ResetPasswordFormValues;
        if (!fieldErrors[fieldName]) {
          fieldErrors[fieldName] = issue.message;
        }
      });
      setErrors(fieldErrors);
      return;
    }

    setErrors({});
    await onSubmit(values);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 12 : 0}
      style={{ flex: 1, backgroundColor: "$background" }}
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
            <Heading size="$8" fontWeight="800" color="$foreground" letterSpacing={0} numberOfLines={1}>
              {t("resetPassword.title")}
            </Heading>

            <Paragraph
              size="$3"
              fontWeight="400"
              color="$mutedForeground"
              textAlign="center"
              maxWidth={380}
              letterSpacing={0.2}
              numberOfLines={2}
            >
              {t("resetPassword.subtitle")}
            </Paragraph>
          </YStack>

          {/* Form Fields */}
          <YStack gap="$4">
            {/* New Password */}
            <YStack gap="$1.5">
              <Label
                htmlFor="reset-new-password"
                size="$2"
                fontWeight="600"
                color="$foreground"
                letterSpacing={0.2}
                numberOfLines={1}
              >
                {t("resetPassword.newPasswordLabel")}
              </Label>
              <ZStack width="100%" alignItems="center" justifyContent="center">
                <Input
                  id="reset-new-password"
                  value={password}
                  onChangeText={handlePasswordChange}
                  placeholder={t("resetPassword.newPasswordPlaceholder")}
                  secureTextEntry={!isPasswordVisible}
                  autoCapitalize="none"
                  autoCorrect={false}
                  autoComplete="new-password"
                  height={48}
                  borderRadius="$4"
                  backgroundColor="$secondary"
                  borderColor={errors.password ? "$destructive" : "$border"}
                  invalid={Boolean(errors.password)}
                  paddingHorizontal="$3.5"
                  paddingRight={46}
                  disabled={isLoading}
                  accessibilityLabel={t("resetPassword.newPasswordLabel")}
                />
                <YStack position="absolute" right={12} top={14}>
                  <Pressable
                    onPress={() => setIsPasswordVisible(!isPasswordVisible)}
                    accessibilityRole="button"
                    accessibilityLabel="Toggle new password visibility"
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

            {/* Confirm New Password */}
            <YStack gap="$1.5">
              <Label
                htmlFor="reset-confirm-password"
                size="$2"
                fontWeight="600"
                color="$foreground"
                letterSpacing={0.2}
                numberOfLines={1}
              >
                {t("resetPassword.confirmPasswordLabel")}
              </Label>
              <ZStack width="100%" alignItems="center" justifyContent="center">
                <Input
                  id="reset-confirm-password"
                  value={confirmPassword}
                  onChangeText={handleConfirmPasswordChange}
                  placeholder={t("resetPassword.confirmPasswordPlaceholder")}
                  secureTextEntry={!isConfirmPasswordVisible}
                  autoCapitalize="none"
                  autoCorrect={false}
                  autoComplete="new-password"
                  height={48}
                  borderRadius="$4"
                  backgroundColor="$secondary"
                  borderColor={errors.confirmPassword ? "$destructive" : "$border"}
                  invalid={Boolean(errors.confirmPassword)}
                  paddingHorizontal="$3.5"
                  paddingRight={46}
                  disabled={isLoading}
                  accessibilityLabel={t("resetPassword.confirmPasswordLabel")}
                />
                <YStack position="absolute" right={12} top={14}>
                  <Pressable
                    onPress={() => setIsConfirmPasswordVisible(!isConfirmPasswordVisible)}
                    accessibilityRole="button"
                    accessibilityLabel="Toggle confirm password visibility"
                    hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
                  >
                    {isConfirmPasswordVisible ? (
                      <EyeOff size={20} color="$mutedForeground" />
                    ) : (
                      <Eye size={20} color="$mutedForeground" />
                    )}
                  </Pressable>
                </YStack>
              </ZStack>
              {errors.confirmPassword ? (
                <SizableText size="$1" fontWeight="500" color="$destructive" letterSpacing={0.2} numberOfLines={1}>
                  {errors.confirmPassword}
                </SizableText>
              ) : null}
            </YStack>

            {/* Submit Button */}
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
              accessibilityLabel={t("resetPassword.submitButton")}
            >
              {isLoading ? t("common:actions.loading", "Updating...") : t("resetPassword.submitButton")}
            </Button>

            {/* Back to sign in link */}
            {onNavigateToLogin ? (
              <XStack alignItems="center" justifyContent="center" marginTop="$2">
                <Pressable
                  onPress={onNavigateToLogin}
                  accessibilityRole="button"
                  accessibilityLabel={t("resetPassword.backToSignIn")}
                  hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                >
                  <SizableText
                    size="$2"
                    fontWeight="600"
                    color="$foreground"
                    letterSpacing={0.2}
                    numberOfLines={1}
                    textDecorationLine="underline"
                  >
                    {t("resetPassword.backToSignIn")}
                  </SizableText>
                </Pressable>
              </XStack>
            ) : null}
          </YStack>
        </YStack>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

AuthResetScreen.displayName = "AuthResetScreen";
