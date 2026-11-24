import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { z } from "zod";

import { Button } from "@spendspot/ui-components/button";
import { Dialog } from "@spendspot/ui-components/dialog";
import { Input } from "@spendspot/ui-components/input";
import { Label } from "@spendspot/ui-components/label";
import { YStack } from "@spendspot/ui-components/stacks";
import { SizableText } from "@spendspot/ui-components/typography";

import type { AuthForgotDialogProps } from "./types";

/**
 * Creates dynamic localized Zod validation schema for password recovery email.
 */
export const createForgotSchema = (translate: (key: string, fallback?: string) => string) =>
  z.object({
    email: z
      .email({ message: translate("validation.emailInvalid") })
      .min(1, { message: translate("validation.emailRequired") })
      .trim(),
  });

/**
 * Password Recovery modal dialog (Screen 02 / Auth Flow).
 * Allows users to request password reset instructions via their registered email address.
 * Conforms to spendspot design system tokens, Zod validation, and accessible dialog specifications.
 */
export const AuthForgotDialog = ({ open, onOpenChange, onSubmit, isLoading = false }: AuthForgotDialogProps) => {
  const { t } = useTranslation(["auth", "common"]);
  const translate = (key: string, fallback?: string) => String(fallback !== undefined ? t(key, fallback) : t(key));

  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | undefined>();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleEmailChange = (text: string) => {
    setEmail(text);
    if (error) {
      const emailFieldSchema = createForgotSchema(translate).shape.email;
      const res = emailFieldSchema.safeParse(text);
      setError(res.success ? undefined : res.error.issues[0]?.message);
    }
  };

  const handleClose = (nextOpen: boolean) => {
    if (!nextOpen) {
      setError(undefined);
      setEmail("");
    }
    onOpenChange(nextOpen);
  };

  const handleSubmit = async () => {
    const schema = createForgotSchema(translate);
    const result = schema.safeParse({ email });

    if (!result.success) {
      setError(result.error.issues[0]?.message);
      return;
    }

    setError(undefined);
    setIsSubmitting(true);
    try {
      const success = await onSubmit(email.trim());
      if (success !== false) {
        handleClose(false);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const isBusy = isLoading || isSubmitting;

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <Dialog.Content showCloseButton={!isBusy} width="92%" maxWidth="$80">
        <Dialog.Header>
          <Dialog.Title fontSize="$5" fontWeight="700" color="$foreground" letterSpacing={-0.3} numberOfLines={1}>
            {t("forgotPassword.title")}
          </Dialog.Title>
          <Dialog.Description fontSize="$2" color="$mutedForeground" lineHeight={20} numberOfLines={1}>
            {t("forgotPassword.subtitle")}
          </Dialog.Description>
        </Dialog.Header>

        <YStack gap="$2">
          <Label
            htmlFor="forgot-email"
            size="$2"
            fontWeight="600"
            color="$foreground"
            letterSpacing={0.2}
            numberOfLines={1}
          >
            {t("signIn.emailLabel")}
          </Label>
          <Input
            id="forgot-email"
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
            invalid={Boolean(error)}
            disabled={isBusy}
            accessibilityLabel={t("signIn.emailLabel")}
          />
          {error ? (
            <SizableText size="$1" fontWeight="500" color="$destructive" letterSpacing={0.2} numberOfLines={1}>
              {error}
            </SizableText>
          ) : null}
        </YStack>

        <Dialog.Footer gap="$2">
          <Button
            variant="primary"
            buttonSize="lg"
            width="100%"
            borderRadius="$4"
            disabled={isBusy}
            onPress={handleSubmit}
            accessibilityRole="button"
            accessibilityLabel={t("forgotPassword.submitButton")}
          >
            {isBusy ? t("common:actions.loading", "Sending...") : t("forgotPassword.submitButton")}
          </Button>

          <Dialog.Close asChild>
            <Button
              variant="outline"
              buttonSize="lg"
              width="100%"
              borderRadius="$4"
              disabled={isBusy}
              accessibilityRole="button"
              accessibilityLabel={t("forgotPassword.backToSignIn")}
            >
              {t("forgotPassword.backToSignIn")}
            </Button>
          </Dialog.Close>
        </Dialog.Footer>
      </Dialog.Content>
    </Dialog>
  );
};

AuthForgotDialog.displayName = "AuthForgotDialog";
