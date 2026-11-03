import { useRouter } from "expo-router";
import React, { useState } from "react";

import { AuthLoginScreen } from "@spendspot/core-logic/components/auth/auth-login-screen";
import { toast } from "@spendspot/ui-components/toast";

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
      router.replace("/");
    }, 600);
  };

  const handleGoogleLogin = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      toast.success("Google Sign-In", {
        description: "Authenticated successfully with Google",
      });
      router.replace("/");
    }, 600);
  };

  const handleForgotPassword = () => {
    toast("Password Reset", {
      description: "Password reset instructions have been sent.",
    });
  };

  const handleNavigateToRegister = () => {
    router.push("/(auth)/register");
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
