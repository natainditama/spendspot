import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Linking } from "react-native";

import { AuthRegisterScreen } from "@spendspot/core-logic/components/auth/auth-register-screen";
import { PRIVACY_URL, TERMS_URL } from "@spendspot/core-logic/constants/compliance-policies";
import { signUpWithEmail } from "@spendspot/core-logic/services/auth-service";
import { toast } from "@spendspot/ui-components/toast";

/**
 * Registration route screen within the (auth) group.
 * Orchestrates user sign up actions, social onboarding, and navigation to login.
 */
export default function RegisterRoute() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = async ({
    fullName,
    email,
    password,
  }: {
    fullName: string;
    email: string;
    password: string;
  }) => {
    setIsLoading(true);
    const result = await signUpWithEmail({ fullName, email, password });
    setIsLoading(false);

    if (result.success) {
      toast.success("Account Created!", {
        description: `Welcome to SpendSpot, ${fullName}!`,
      });

      router.replace("/(setup)" as never);
    } else {
      toast.error("Registration Failed", {
        description: result.message ?? "Could not create account",
      });
    }
  };

  const handleGoogleRegister = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      toast.success("Google Sign-Up", {
        description: "Registered successfully with Google",
      });

      router.replace("/(setup)" as never);
    }, 600);
  };

  const handleNavigateToLogin = () => {
    router.replace("/(auth)/login");
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
    <AuthRegisterScreen
      isLoading={isLoading}
      onRegister={handleRegister}
      onGoogleRegister={handleGoogleRegister}
      onNavigateToLogin={handleNavigateToLogin}
      onTermsPress={handleTermsPress}
      onPrivacyPress={handlePrivacyPress}
    />
  );
}
