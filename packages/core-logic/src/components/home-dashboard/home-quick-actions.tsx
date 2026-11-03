import React from "react";
import { useTranslation } from "react-i18next";

import { Button } from "@spendspot/ui-components/button";
import { MapPin, Plus, Receipt, Sparkles } from "@spendspot/ui-components/icons";
import { XStack, YStack, ZStack } from "@spendspot/ui-components/stacks";
import { Paragraph, SizableText } from "@spendspot/ui-components/typography";

interface HomeQuickActionsProps {
  onAddExpensePress?: () => void;
  onScanReceiptPress?: () => void;
  onAskAIPress?: () => void;
  onNewSpotPress?: () => void;
}

/**
 * 4 Quick Action circular shortcuts on Screen 04 Home Dashboard:
 * 1. Add Exp (+)
 * 2. Scan (Receipt)
 * 3. Ask AI (Sparkles with 16 query badge)
 * 4. New Spot (MapPin)
 * Powered by Design System Button component.
 */
export const HomeQuickActions = ({
  onAddExpensePress,
  onScanReceiptPress,
  onAskAIPress,
  onNewSpotPress,
}: HomeQuickActionsProps) => {
  const { t } = useTranslation("home-dashboard");

  return (
    <XStack width="100%" alignItems="center" justifyContent="space-between">
      {/* Add Expense */}
      <YStack gap="$2" flex={1} alignItems="center" justifyContent="center">
        <Button
          variant="secondary"
          buttonSize="icon-lg"
          width={56}
          height={56}
          borderWidth="$px"
          borderRadius="$full"
          borderColor="$border"
          onPress={onAddExpensePress}
          accessibilityLabel="Add Expense"
          marginHorizontal="auto"
        >
          <Plus size={24} color="$foreground" />
        </Button>
        <Paragraph
          size="$2"
          fontWeight="800"
          color="$foreground"
          letterSpacing={0}
          numberOfLines={1}
          textAlign="center"
          width="100%"
        >
          {t("quickActions.addExpense")}
        </Paragraph>
      </YStack>

      {/* Scan Receipt */}
      <YStack gap="$2" flex={1} alignItems="center" justifyContent="center">
        <Button
          variant="secondary"
          buttonSize="icon-lg"
          width={56}
          height={56}
          borderWidth="$px"
          borderRadius="$full"
          borderColor="$border"
          onPress={onScanReceiptPress}
          accessibilityLabel="Scan Receipt"
          marginHorizontal="auto"
        >
          <Receipt size={24} color="$foreground" />
        </Button>
        <Paragraph
          size="$2"
          fontWeight="800"
          color="$foreground"
          letterSpacing={0}
          numberOfLines={1}
          textAlign="center"
          width="100%"
        >
          {t("quickActions.scanReceipt")}
        </Paragraph>
      </YStack>

      {/* Ask AI with Quota Badge */}
      <YStack gap="$2" flex={1} alignItems="center" justifyContent="center">
        <ZStack width={56} height={56}>
          <Button
            variant="secondary"
            buttonSize="icon-lg"
            width={56}
            height={56}
            borderWidth="$px"
            borderRadius="$full"
            borderColor="$border"
            onPress={onAskAIPress}
            accessibilityLabel="Ask AI"
            marginHorizontal="auto"
          >
            <Sparkles size={24} color="$foreground" />
          </Button>

          {/* AI Query Badge */}
          <YStack
            top={-2}
            right={-2}
            position="absolute"
            borderRadius="$full"
            paddingHorizontal={5}
            paddingVertical={1}
            borderWidth="$px"
            alignItems="center"
            justifyContent="center"
            borderColor="$background"
            backgroundColor="$foreground"
          >
            <SizableText size="$1" fontWeight="800" color="$background" letterSpacing={0} numberOfLines={1}>
              {t("quickActions.aiBadge", "16")}
            </SizableText>
          </YStack>
        </ZStack>
        <Paragraph
          size="$2"
          fontWeight="800"
          color="$foreground"
          letterSpacing={0}
          numberOfLines={1}
          textAlign="center"
          width="100%"
        >
          {t("quickActions.askAI")}
        </Paragraph>
      </YStack>

      {/* 4. New Spot */}
      <YStack gap="$2" flex={1} alignItems="center" justifyContent="center">
        <Button
          variant="secondary"
          buttonSize="icon-lg"
          width={56}
          height={56}
          borderWidth="$px"
          borderRadius="$full"
          borderColor="$border"
          onPress={onNewSpotPress}
          accessibilityLabel="New Spot"
          marginHorizontal="auto"
        >
          <MapPin size={24} color="$foreground" />
        </Button>
        <Paragraph
          size="$2"
          fontWeight="800"
          color="$foreground"
          letterSpacing={0}
          numberOfLines={1}
          textAlign="center"
          width="100%"
        >
          {t("quickActions.newSpot")}
        </Paragraph>
      </YStack>
    </XStack>
  );
};

HomeQuickActions.displayName = "HomeQuickActions";
