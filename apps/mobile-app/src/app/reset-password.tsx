import { useRouter } from "expo-router";
import React, { useState } from "react";

import { AuthResetScreen } from "@spendspot/core-logic/components/auth/auth-reset-screen";
import type { ResetPasswordFormValues } from "@spendspot/core-logic/components/auth/types";
import i18n from "@spendspot/core-logic/i18n";
import { useAuthSession } from "@spendspot/core-logic/providers/auth-session-provider";
import { toast } from "@spendspot/ui-components/toast";

/**
 * Reset Password route screen (`/reset-password`).
 * Accessed when the user clicks the recovery link from their reset password email.
 * Authenticates the user in recovery state, captures their new password, updates it in Supabase,
 * and seamlessly transitions them to the dashboard (or setup wizard if incomplete).
 */
export default function ResetPasswordRoute() {
  const router = useRouter();
  const { updatePassword, checkSetupStatus } = useAuthSession();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (values: ResetPasswordFormValues) => {
    setIsLoading(true);
    const result = await updatePassword(values.password);
    setIsLoading(false);

    if (result.success) {
      toast.success(i18n.t("auth:resetPassword.title", "Set New Password"), {
        description: i18n.t("auth:resetPassword.successMessage", "Password updated successfully!"),
      });

      // Check whether user baseline profile & permissions are configured
      const setupStatus = await checkSetupStatus();
      if (setupStatus.isCompleted) {
        router.replace("/(dashboard)" as never);
      } else {
        router.replace("/(setup)" as never);
      }
    } else {
      toast.error(i18n.t("auth:resetPassword.title", "Set New Password"), {
        description: result.error ?? "Failed to update password. Please try again.",
      });
    }
  };

  const handleNavigateToLogin = () => {
    router.replace("/(auth)/login" as never);
  };

  return <AuthResetScreen isLoading={isLoading} onSubmit={handleSubmit} onNavigateToLogin={handleNavigateToLogin} />;
}
