import React from "react";
import { useTranslation } from "react-i18next";

import { Separator } from "@spendspot/ui-components/separator";
import { XStack } from "@spendspot/ui-components/stacks";
import { SizableText } from "@spendspot/ui-components/typography";

export interface AuthSocialDividerProps {
  labelKey?: string;
}

/**
 * Hairline horizontal divider with centered localized text matching shadcn UI specifications.
 */
export const AuthSocialDivider = ({ labelKey = "signIn.orContinueWith" }: AuthSocialDividerProps) => {
  const { t } = useTranslation("auth");

  return (
    <XStack alignItems="center" justifyContent="center" width="100%" gap="$2" marginVertical="$2">
      <Separator flex={1} borderColor="$border" />
      <SizableText size="$1" fontWeight="600" color="$mutedForeground" letterSpacing={1} numberOfLines={1}>
        {t(labelKey, "OR CONTINUE WITH")}
      </SizableText>
      <Separator flex={1} borderColor="$border" />
    </XStack>
  );
};

AuthSocialDivider.displayName = "AuthSocialDivider";
