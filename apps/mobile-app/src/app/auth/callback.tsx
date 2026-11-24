import * as Linking from "expo-linking";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useRef, useState } from "react";

import i18n from "@spendspot/core-logic/i18n";
import { useAuthSession } from "@spendspot/core-logic/providers/auth-session-provider";
import { extractParamsFromUrl } from "@spendspot/core-logic/services/auth-service";
import { Button } from "@spendspot/ui-components/button";
import { Heading } from "@spendspot/ui-components/heading";
import { Spinner } from "@spendspot/ui-components/spinner";
import { YStack } from "@spendspot/ui-components/stacks";
import { Paragraph } from "@spendspot/ui-components/typography";

interface CallbackErrorState {
  title: string;
  description: string;
}

/**
 * Route handler for OAuth, Magic Link, and Password Recovery deep link callbacks (`/auth/callback`).
 * Extracts tokens/codes from deep link query params or hash fragments.
 * Establishes Supabase session, navigates to `/reset-password` for recovery links,
 * or transitions to the dashboard/setup wizard for authentication logins.
 * If the link has expired or is invalid (e.g. otp_expired), renders a user-friendly error UI.
 */
export default function AuthCallbackRoute() {
  const router = useRouter();
  const rawUrl = Linking.useURL();
  const searchParams = useLocalSearchParams<Record<string, string | string[]>>();
  const { isAuthenticated, isSetupCompleted, processAuthCallback, setIsRecoveryMode } = useAuthSession();
  const [errorState, setErrorState] = useState<CallbackErrorState | null>(null);
  const isHandledRef = useRef(false);
  const authStateRef = useRef({ isAuthenticated, isSetupCompleted });
  const isMountedRef = useRef(true);

  useEffect(() => {
    authStateRef.current = { isAuthenticated, isSetupCompleted };
  }, [isAuthenticated, isSetupCompleted]);

  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  useEffect(() => {
    if (isHandledRef.current) return;

    const handleCallback = async () => {
      // 1. Gather all parameters from searchParams
      const combinedParams: Record<string, string> = {};

      Object.entries(searchParams).forEach(([key, val]) => {
        if (typeof val === "string") {
          combinedParams[key] = val;
        } else if (Array.isArray(val) && val.length > 0 && typeof val[0] === "string") {
          combinedParams[key] = val[0];
        }
      });

      // 2. Also extract params from raw deep link URL (in case hash fragment wasn't converted or for fallback)
      if (rawUrl) {
        const urlParams = extractParamsFromUrl(rawUrl);
        Object.assign(combinedParams, urlParams);
      }

      const hasAuthData = Boolean(
        combinedParams.access_token ||
        combinedParams.code ||
        combinedParams.error ||
        combinedParams.error_description ||
        combinedParams.type
      );

      // 3. Fallback if route was opened directly without auth query/hash
      if (!hasAuthData) {
        if (authStateRef.current.isAuthenticated) {
          router.replace(authStateRef.current.isSetupCompleted ? ("/(dashboard)" as never) : ("/(setup)" as never));
        } else {
          router.replace("/onboarding" as never);
        }
        return;
      }

      isHandledRef.current = true;

      // 4. Pre-activate recovery mode if type=recovery is detected
      if (combinedParams.type === "recovery") {
        setIsRecoveryMode(true);
      }

      // Process tokens with Supabase
      const result = await processAuthCallback(combinedParams);

      if (!result.success) {
        const isOtpExpired =
          combinedParams.error_code === "otp_expired" ||
          (result.error && result.error.toLowerCase().includes("expired"));

        const title = isOtpExpired
          ? i18n.t("auth:errors.otpExpiredTitle", "Link Expired or Invalid")
          : i18n.t("auth:errors.authFailed", "Authentication Failed");

        const description = isOtpExpired
          ? i18n.t(
              "auth:errors.otpExpired",
              "This link has expired or has already been used. Please request a new one."
            )
          : (result.error ?? i18n.t("auth:errors.authFailed", "Authentication failed."));

        if (isMountedRef.current) {
          setErrorState({ title, description });
        }
        return;
      }

      // 5. Handle password recovery flow specifically
      if (result.isRecovery) {
        router.replace("/reset-password" as never);
        return;
      }

      // 6. Handle standard sign in / sign up callback
      router.replace(result.isSetupCompleted ? ("/(dashboard)" as never) : ("/(setup)" as never));
    };

    void handleCallback();
  }, [rawUrl, searchParams, processAuthCallback, setIsRecoveryMode, router]);

  if (errorState) {
    return (
      <YStack
        flex={1}
        gap="$4"
        alignItems="center"
        paddingHorizontal="$6"
        justifyContent="center"
        backgroundColor="$background"
      >
        <Heading
          fontSize="$6"
          fontWeight="800"
          color="$foreground"
          textAlign="center"
          letterSpacing={-0.3}
          numberOfLines={1}
        >
          {errorState.title}
        </Heading>

        <Paragraph
          fontSize="$3"
          fontWeight="400"
          color="$mutedForeground"
          textAlign="center"
          lineHeight={22}
          maxWidth={280}
          letterSpacing={0.1}
          numberOfLines={2}
        >
          {errorState.description}
        </Paragraph>

        <Button
          width="100%"
          height={50}
          maxWidth={340}
          buttonSize="lg"
          variant="primary"
          borderRadius="$4"
          accessibilityRole="button"
          onPress={() => router.replace("/(auth)/login" as never)}
          accessibilityLabel={i18n.t("auth:forgotPassword.backToSignIn", "Back to Sign In")}
        >
          {i18n.t("auth:forgotPassword.backToSignIn", "Back to Sign In")}
        </Button>
      </YStack>
    );
  }

  return (
    <YStack flex={1} alignItems="center" justifyContent="center" backgroundColor="$background">
      <Spinner size="large" color="$primary" />
    </YStack>
  );
}
