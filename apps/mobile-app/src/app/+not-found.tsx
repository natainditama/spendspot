import { Link, Stack } from "expo-router";
import React from "react";

import { Button } from "@spendspot/ui-components/button";
import { Heading } from "@spendspot/ui-components/heading";
import { Compass } from "@spendspot/ui-components/icons";
import { YStack } from "@spendspot/ui-components/stacks";
import { Paragraph } from "@spendspot/ui-components/typography";

/**
 * Modern iOS HIG compliant 404 / Unmatched Route fallback screen.
 * Follows SpendSpot design system tokens and airy centered layout.
 */
export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: "Not Found", headerShown: false }} />
      <YStack
        flex={1}
        gap="$5"
        alignItems="center"
        paddingHorizontal="$6"
        justifyContent="center"
        backgroundColor="$background"
      >
        <YStack
          width={80}
          height={80}
          borderWidth="$px"
          borderRadius="$full"
          borderColor="$border"
          alignItems="center"
          justifyContent="center"
          backgroundColor="$secondary"
        >
          <Compass size={40} color="$mutedForeground" />
        </YStack>

        <YStack gap="$2" alignItems="center" justifyContent="center">
          <Heading
            size="$7"
            fontWeight="700"
            color="$foreground"
            letterSpacing={0.2}
            numberOfLines={1}
            textAlign="center"
          >
            Screen Not Found
          </Heading>
          <Paragraph
            size="$3"
            fontWeight="500"
            color="$mutedForeground"
            letterSpacing={0.2}
            numberOfLines={2}
            textAlign="center"
            lineHeight={22}
          >
            The destination you were looking for does not exist or has been moved.
          </Paragraph>
        </YStack>

        <Link href="/" asChild>
          <Button
            variant="primary"
            buttonSize="lg"
            marginTop="$2"
            minWidth="$32"
            borderRadius="$4"
            marginHorizontal="auto"
            accessibilityRole="button"
            accessibilityLabel="Back to Safety"
          >
            Back to Safety
          </Button>
        </Link>
      </YStack>
    </>
  );
}
