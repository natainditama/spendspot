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
import type { AuthRegisterScreenProps } from "./types";

/**
 * Production-ready Registration screen based on Google Stitch screen 02_auth_register.png.
 * Features centered airy layout, full name, email, and password controls, Google SSO,
 * and pure Tamagui theme tokens without hardcoded colors or StyleSheet.create.
 */
export const AuthRegisterScreen = ({
  initialFullName = "",
  initialEmail = "",
  onRegister,
  onGoogleRegister,
  onNavigateToLogin,
  onTermsPress,
  onPrivacyPress,
  isLoading = false,
  testID = "auth-register-screen",
}: AuthRegisterScreenProps) => {
  const { t } = useTranslation("auth");
  const [fullName, setFullName] = useState(initialFullName);
  const [email, setEmail] = useState(initialEmail);
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const handleSubmit = () => {
    if (!fullName.trim() || !email.trim() || !password) return;
    onRegister?.({
      fullName: fullName.trim(),
      email: email.trim(),
      password,
    });
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
          justifyContent="space-between"
          alignItems="center"
          width="100%"
        >
          {/* Main Form Content with centered max-width constraints */}
          <YStack width="100%" maxWidth={400} gap="$5">
            {/* Header Section */}
            <YStack gap="$1.5" marginTop="$2">
              <SizableText size="$8" fontWeight="800" color="$foreground" letterSpacing={0} numberOfLines={1}>
                {t("signUp.title", "Create account")}
              </SizableText>
              <Paragraph size="$3" color="$mutedForeground" letterSpacing={0.1}>
                {t("signUp.subtitle", "Sign up to track your commute and daily budget.")}
              </Paragraph>
            </YStack>

            {/* Registration Form Controls */}
            <YStack gap="$4" marginTop="$2">
              {/* Full Name Input */}
              <YStack gap="$1.5">
                <Label htmlFor="register-name" size="$2" fontWeight="600" color="$foreground">
                  {t("signUp.fullNameLabel", "Full Name")}
                </Label>
                <Input
                  id="register-name"
                  value={fullName}
                  onChangeText={setFullName}
                  placeholder={t("signUp.fullNamePlaceholder", "Jane Doe")}
                  autoCapitalize="words"
                  autoCorrect={false}
                  autoComplete="name"
                  height={48}
                  borderRadius="$4"
                  backgroundColor="$secondary"
                  borderColor="$border"
                  paddingHorizontal="$3.5"
                  accessibilityLabel={t("signUp.fullNameLabel", "Full Name")}
                />
              </YStack>

              {/* Email Address Input */}
              <YStack gap="$1.5">
                <Label htmlFor="register-email" size="$2" fontWeight="600" color="$foreground">
                  {t("signUp.emailLabel", "Email")}
                </Label>
                <Input
                  id="register-email"
                  value={email}
                  onChangeText={setEmail}
                  placeholder={t("signUp.emailPlaceholder", "name@example.com")}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                  autoComplete="email"
                  height={48}
                  borderRadius="$4"
                  backgroundColor="$secondary"
                  borderColor="$border"
                  paddingHorizontal="$3.5"
                  accessibilityLabel={t("signUp.emailLabel", "Email")}
                />
              </YStack>

              {/* Password Input with Visibility Toggle */}
              <YStack gap="$1.5">
                <Label htmlFor="register-password" size="$2" fontWeight="600" color="$foreground">
                  {t("signUp.passwordLabel", "Password")}
                </Label>

                <ZStack width="100%" alignItems="center" justifyContent="center">
                  <Input
                    id="register-password"
                    value={password}
                    onChangeText={setPassword}
                    placeholder={t("signUp.passwordPlaceholder", "••••••••")}
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
                    accessibilityLabel={t("signUp.passwordLabel", "Password")}
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
                accessibilityLabel={t("signUp.submitButton", "Create Account")}
              >
                <SizableText size="$3" fontWeight="700" color="$primaryForeground">
                  {t("signUp.submitButton", "Create Account")}
                </SizableText>
              </Button>
            </YStack>

            {/* Social Authentication Divider */}
            <AuthDivider labelKey="signUp.orContinueWith" />

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
              onPress={onGoogleRegister}
              disabled={isLoading}
              accessibilityRole="button"
              accessibilityLabel={t("signUp.signUpWithGoogle", "Sign up with Google")}
            >
              <XStack gap="$2.5" alignItems="center" justifyContent="center">
                <AuthGoogleIcon size={18} />
                <SizableText size="$3" fontWeight="600" color="$foreground">
                  {t("signUp.signUpWithGoogle", "Sign up with Google")}
                </SizableText>
              </XStack>
            </Button>
          </YStack>

          {/* Footer Area with Navigation Switch & Legal Compliance */}
          <YStack width="100%" maxWidth={400} gap="$3" marginTop="$6">
            <XStack alignItems="center" justifyContent="center" gap="$1.5">
              <Paragraph size="$2" color="$mutedForeground">
                {t("signUp.hasAccount", "Already have an account?")}
              </Paragraph>
              <Pressable
                onPress={onNavigateToLogin}
                accessibilityRole="button"
                accessibilityLabel={t("signUp.signInLink", "Log in")}
                hitSlop={{ top: 8, bottom: 8, left: 4, right: 4 }}
              >
                <SizableText size="$2" fontWeight="700" color="$foreground">
                  {t("signUp.signInLink", "Log in")}
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
