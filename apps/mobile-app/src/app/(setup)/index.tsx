import { useRouter } from "expo-router";
import React, { useState } from "react";

import { SetupWizardScreen } from "@spendspot/core-logic/components/setup-wizard/setup-wizard-screen";
import type { SetupWizardSubmitData } from "@spendspot/core-logic/components/setup-wizard/types";
import { toast } from "@spendspot/ui-components/toast";

/**
 * Setup Wizard route screen (Screen 03).
 * Captures initial budget baseline, preferred currency, and location permissions.
 */
export default function SetupWizardRoute() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleContinue = (data: SetupWizardSubmitData) => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      toast.success("Preferences Saved!", {
        description: `Daily limit set to ${data.currency} ${data.dailyCap.toLocaleString()}`,
      });

      router.replace("/(dashboard)/index");
    }, 600);
  };

  return <SetupWizardScreen isLoading={isLoading} onContinue={handleContinue} />;
}
