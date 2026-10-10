import { useRouter } from "expo-router";
import React from "react";

import { OnboardingScreen } from "@spendspot/core-logic/components/onboarding/onboarding-screen";

/**
 * Onboarding route for the mobile application.
 * Displays the high-converting introduction carousel based on Google Stitch screen 01.
 */
export default function OnboardingRoute() {
  const router = useRouter();

  const handleFinish = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace("/");
    }
  };

  return (
    <OnboardingScreen
      onBack={handleFinish}
      onReadyToRide={handleFinish}
      onAlreadyHaveAccount={handleFinish}
      onSkip={handleFinish}
    />
  );
}
