import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Linking } from "react-native";

import { AuthForgotDialog } from "@spendspot/core-logic/components/auth/auth-forgot-dialog";
import { AuthLoginScreen } from "@spendspot/core-logic/components/auth/auth-login-screen";
import { PRIVACY_URL, TERMS_URL } from "@spendspot/core-logic/constants/compliance-policies";
import i18n from "@spendspot/core-logic/i18n";
import { useAuthSession } from "@spendspot/core-logic/providers/auth-session-provider";
import { toast } from "@spendspot/ui-components/toast";

/**
 * Login route screen within the (auth) group.
 * Orchestrates sign-in actions, social authentication, and navigation to registration.
 * Manages modal password reset recovery dialog using AuthForgotDialog.
 */
export default function LoginRoute() {
  const router = useRouter();
  const { signIn, signInWithGoogle, sendPasswordReset } = useAuthSession();
  const [isLoading, setIsLoading] = useState(false);
  const [isForgotOpen, setIsForgotOpen] = useState(false);

  const handleLogin = async ({ email, password }: { email: string; password: string }) => {
    setIsLoading(true);
    const result = await signIn({ email, password });
    setIsLoading(false);

    if (result.success) {
      toast.success("Welcome back!", {
        description: `Logged in as ${email}`,
      });

      if (result.isSetupCompleted) {
        router.replace("/(dashboard)" as never);
      } else {
        router.replace("/(setup)" as never);
      }
    } else {
      toast.error("Sign In Failed", {
        description: result.error ?? "Invalid email or password",
      });
    }
  };

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    const result = await signInWithGoogle();
    setIsLoading(false);

    if (result.success) {
      toast.success("Google Sign-In", {
        description: "Authenticated successfully with Google",
      });

      if (result.isSetupCompleted) {
        router.replace("/(dashboard)" as never);
      } else {
        router.replace("/(setup)" as never);
      }
    } else {
      if (result.error && !result.error.toLowerCase().includes("cancel")) {
        toast.error("Google Sign-In Failed", {
          description: result.error,
        });
      }
    }
  };

  const handleForgotPassword = () => {
    setIsForgotOpen(true);
  };

  const handleForgotSubmit = async (forgotEmail: string) => {
    const result = await sendPasswordReset(forgotEmail);
    if (result.success) {
      toast.success(i18n.t("auth:forgotPassword.title", "Reset Password"), {
        description: i18n.t("auth:forgotPassword.successMessage", "Check your email for the reset instructions"),
      });
      setIsForgotOpen(false);
      return true;
    } else {
      toast.error(i18n.t("auth:forgotPassword.title", "Reset Password"), {
        description: result.error ?? "Failed to send reset email.",
      });
      return false;
    }
  };

  const handleNavigateToRegister = () => {
    router.replace("/(auth)/register");
  };

  const handleTermsPress = () => {
    Linking.openURL(TERMS_URL).catch(() => {
      toast.error("Could not open Terms of Service URL", {
        description: "Please check your internet connection or try again later.",
      });
    });
  };

  const handlePrivacyPress = () => {
    Linking.openURL(PRIVACY_URL).catch(() => {
      toast.error("Could not open Privacy Policy URL", {
        description: "Please check your internet connection or try again later.",
      });
    });
  };

  return (
    <>
      <AuthLoginScreen
        isLoading={isLoading}
        onLogin={handleLogin}
        onGoogleLogin={handleGoogleLogin}
        onForgotPassword={handleForgotPassword}
        onNavigateToRegister={handleNavigateToRegister}
        onTermsPress={handleTermsPress}
        onPrivacyPress={handlePrivacyPress}
      />
      <AuthForgotDialog open={isForgotOpen} onOpenChange={setIsForgotOpen} onSubmit={handleForgotSubmit} />
    </>
  );
}
