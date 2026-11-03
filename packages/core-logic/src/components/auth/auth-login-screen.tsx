import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { KeyboardAvoidingView, Platform, Pressable, ScrollView } from "react-native";

import { Button } from "@spendspot/ui-components/button";
import { Eye, EyeOff } from "@spendspot/ui-components/icons";
import { Input } from "@spendspot/ui-components/input";
import { Label } from "@spendspot/ui-components/label";
import { XStack, YStack, ZStack } from "@spendspot/ui-components/stacks";
import { Paragraph, SizableText } from "@spendspot/ui-components/typography";

import { AuthDivider } from "./auth-divider";
import { AuthGoogleIcon } from "./auth-google-icon";
import { AuthLegalFooter } from "./auth-legal-footer";
import type { AuthLoginScreenProps } from "./types";

/**
 * Production-ready Login authentication screen based on Google Stitch screen 02_auth_login.png.
 * Features centered airy layout, secure credential inputs, Google SSO, password toggle,
 * and pure Tamagui theme tokens without hardcoded colors or StyleSheet.create.
 */
export const AuthLoginScreen = ({
  initialEmail = "",
  onLogin,
  onGoogleLogin,
  onForgotPassword,
  onNavigateToRegister,
  onTermsPress,
  onPrivacyPress,
  isLoading = false,
  testID = "auth-login-screen",
}: AuthLoginScreenProps) => {
  const { t } = useTranslation("auth");
  const [email, setEmail] = useState(initialEmail);
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const handleSubmit = () => {
    if (!email.trim() || !password) return;
    onLogin?.({ email: email.trim(), password });
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : undefined} style={{ flex: 1 }} testID={testID}>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <YStack
          flex={1}
          paddingVertical="$6"
          paddingHorizontal="$6"
          backgroundColor="$background"
          justifyContent="center"
          alignItems="center"
          width="100%"
        >
          {/* Main Form Content with centered max-width constraints */}
          <YStack width="100%" maxWidth={400} gap="$5">
            {/* Header Section */}
            <YStack gap="$1.5" marginTop="$2">
              <SizableText size="$8" fontWeight="800" color="$foreground" letterSpacing={0} numberOfLines={1}>
                {t("signIn.title", "Welcome back")}
              </SizableText>
              <Paragraph size="$3" color="$mutedForeground" letterSpacing={0.1}>
                {t("signIn.subtitle", "Log in to continue tracking your commute and daily budget.")}
              </Paragraph>
            </YStack>

            {/* Credential Input Fields */}
            <YStack gap="$4" marginTop="$2">
              {/* Email Input */}
              <YStack gap="$1.5">
                <Label htmlFor="login-email" size="$2" fontWeight="600" color="$foreground">
                  {t("signIn.emailLabel", "Email")}
                </Label>
                <Input
                  id="login-email"
                  value={email}
                  onChangeText={setEmail}
                  placeholder={t("signIn.emailPlaceholder", "name@example.com")}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                  autoComplete="email"
                  height={48}
                  borderRadius="$4"
                  backgroundColor="$secondary"
                  borderColor="$border"
                  paddingHorizontal="$3.5"
                  accessibilityLabel={t("signIn.emailLabel", "Email")}
                />
              </YStack>

              {/* Password Input with Visibility Toggle */}
              <YStack gap="$1.5">
                <XStack justifyContent="space-between" alignItems="center">
                  <Label htmlFor="login-password" size="$2" fontWeight="600" color="$foreground">
                    {t("signIn.passwordLabel", "Password")}
                  </Label>
                  <Pressable
                    onPress={onForgotPassword}
                    accessibilityRole="button"
                    accessibilityLabel={t("signIn.forgotPassword", "Forgot password?")}
                    hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                  >
                    <SizableText size="$2" color="$mutedForeground" fontWeight="500">
                      {t("signIn.forgotPassword", "Forgot password?")}
                    </SizableText>
                  </Pressable>
                </XStack>

                <ZStack width="100%" alignItems="center" justifyContent="center">
                  <Input
                    id="login-password"
                    value={password}
                    onChangeText={setPassword}
                    placeholder={t("signIn.passwordPlaceholder", "••••••••")}
                    secureTextEntry={!isPasswordVisible}
                    autoCapitalize="none"
                    autoCorrect={false}
                    autoComplete="password"
                    height={48}
                    borderRadius="$4"
                    backgroundColor="$secondary"
                    borderColor="$border"
                    paddingHorizontal="$3.5"
                    paddingRight={46}
                    width="100%"
                    accessibilityLabel={t("signIn.passwordLabel", "Password")}
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
              </YStack>

              {/* Primary Submit Button */}
              <Button
                width="100%"
                height={50}
                buttonSize="lg"
                variant="primary"
                borderRadius="$4"
                onPress={handleSubmit}
                disabled={isLoading}
                marginTop="$2"
                accessibilityRole="button"
                accessibilityLabel={t("signIn.submitButton", "Log In")}
              >
                <SizableText size="$3" fontWeight="700" color="$primaryForeground">
                  {t("signIn.submitButton", "Log In")}
                </SizableText>
              </Button>
            </YStack>

            {/* Social Authentication Divider */}
            <AuthDivider labelKey="signIn.orContinueWith" />

            {/* Google SSO Button */}
            <Button
              width="100%"
              height={50}
              buttonSize="lg"
              variant="secondary"
              borderRadius="$4"
              backgroundColor="$secondary"
              borderColor="$border"
              borderWidth="$px"
              onPress={onGoogleLogin}
              disabled={isLoading}
              accessibilityRole="button"
              accessibilityLabel={t("signIn.continueWithGoogle", "Continue with Google")}
            >
              <XStack gap="$2.5" alignItems="center" justifyContent="center">
                <AuthGoogleIcon size={18} />
                <SizableText size="$3" fontWeight="600" color="$foreground">
                  {t("signIn.continueWithGoogle", "Continue with Google")}
                </SizableText>
              </XStack>
            </Button>
          </YStack>

          {/* Footer Area with Navigation Switch & Legal Compliance */}
          <YStack width="100%" maxWidth={400} gap="$3" marginTop="$6">
            <XStack alignItems="center" justifyContent="center" gap="$1.5">
              <Paragraph size="$2" color="$mutedForeground">
                {t("signIn.noAccount")}
              </Paragraph>
              <Pressable
                onPress={onNavigateToRegister}
                accessibilityRole="button"
                accessibilityLabel={t("signIn.signUpLink")}
                hitSlop={{ top: 8, bottom: 8, left: 4, right: 4 }}
              >
                <SizableText size="$2" fontWeight="700" color="$foreground">
                  {t("signIn.signUpLink")}
                </SizableText>
              </Pressable>
            </XStack>

            <AuthLegalFooter mode="signIn" onTermsPress={onTermsPress} onPrivacyPress={onPrivacyPress} />
          </YStack>
        </YStack>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

AuthLoginScreen.displayName = "AuthLoginScreen";
