import { useRouter } from "expo-router";
import React, { useState } from "react";

import { AuthRegisterScreen } from "@spendspot/core-logic/components/auth/auth-register-screen";
import { toast } from "@spendspot/ui-components/toast";

/**
 * Registration route screen within the (auth) group.
 * Orchestrates user sign up actions, social onboarding, and navigation to login.
 */
export default function RegisterRoute() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = ({ fullName, email }: { fullName: string; email: string; password: string }) => {
    setIsLoading(true);
    // Simulating registration flow
    setTimeout(() => {
      setIsLoading(false);
      toast.success("Account Created!", {
        description: `Welcome to SpendSpot, ${fullName}! Confirmation sent to ${email}.`,
      });
      router.replace("/");
    }, 600);
  };

  const handleGoogleRegister = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      toast.success("Google Sign-Up", {
        description: "Registered successfully with Google",
      });
      router.replace("/");
    }, 600);
  };

  const handleNavigateToLogin = () => {
    router.push("/(auth)/login");
  };

  const handleTermsPress = () => {
    toast("Terms of Service", {
      description: "Opening Terms of Service...",
    });
  };

  const handlePrivacyPress = () => {
    toast("Privacy Policy", {
      description: "Opening Privacy Policy...",
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
