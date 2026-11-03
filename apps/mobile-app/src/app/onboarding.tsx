import { useRouter } from "expo-router";
import React from "react";

import { OnboardingScreen } from "@spendspot/core-logic/components/onboarding/onboarding-screen";

/**
 * Onboarding route for the mobile application.
 * Displays the high-converting introduction carousel based on Google Stitch screen 01.
 */
export default function OnboardingRoute() {
  const router = useRouter();

  const handleBack = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace("/");
    }
  };

  const handleReadyToRide = () => {
    router.push("/(auth)/register");
  };

  const handleAlreadyHaveAccount = () => {
    router.push("/(auth)/login");
  };

  return (
    <OnboardingScreen
      onBack={handleBack}
      onReadyToRide={handleReadyToRide}
      onAlreadyHaveAccount={handleAlreadyHaveAccount}
      onSkip={handleBack}
    />
  );
}
