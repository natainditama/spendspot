import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Linking } from "react-native";

import { AuthLoginScreen } from "@spendspot/core-logic/components/auth/auth-login-screen";
import { toast } from "@spendspot/ui-components/toast";

const TERMS_URL = "https://spendspot.natatama.com/terms";
const PRIVACY_URL = "https://spendspot.natatama.com/privacy";

/**
 * Login route screen within the (auth) group.
 * Orchestrates sign-in actions, social authentication, and navigation to registration.
 */
export default function LoginRoute() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = ({ email }: { email: string; password: string }) => {
    setIsLoading(true);
    // Simulating authentication flow
    setTimeout(() => {
      setIsLoading(false);
      toast.success("Welcome back!", {
        description: `Logged in as ${email}`,
      });

      router.replace("/(dashboard)" as never);
    }, 600);
  };

  const handleGoogleLogin = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      toast.success("Google Sign-In", {
        description: "Authenticated successfully with Google",
      });

      router.replace("/(dashboard)" as never);
    }, 600);
  };

  const handleForgotPassword = () => {
    toast("Password Reset", {
      description: "Password reset instructions have been sent.",
    });
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
    <AuthLoginScreen
      isLoading={isLoading}
      onLogin={handleLogin}
      onGoogleLogin={handleGoogleLogin}
      onForgotPassword={handleForgotPassword}
      onNavigateToRegister={handleNavigateToRegister}
      onTermsPress={handleTermsPress}
      onPrivacyPress={handlePrivacyPress}
    />
  );
}
