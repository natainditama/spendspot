import React from "react";

import { YStack, ZStack } from "@spendspot/ui-components/stacks";

interface AuthGoogleIconProps {
  size?: number;
}

/**
 * Clean vector-based Google 'G' brand mark rendered with Tamagui Stacks and theme tokens.
 * Accurately represents Google's 4 brand colors without requiring external SVG dependencies.
 */
export const AuthGoogleIcon = ({ size = 18 }: AuthGoogleIconProps) => {
  const stroke = Math.round(size * 0.16);
  const radius = size / 2;

  return (
    <ZStack
      width={size}
      height={size}
      alignItems="center"
      justifyContent="center"
      accessibilityLabel="Google"
      accessibilityRole="image"
    >
      {/* 4-color segmented outer circle */}
      <YStack
        position="absolute"
        width={size}
        height={size}
        borderRadius={radius}
        borderWidth={stroke}
        borderTopColor="$googleRed"
        borderRightColor="$googleBlue"
        borderBottomColor="$googleGreen"
        borderLeftColor="$googleYellow"
      />

      {/* Horizontal crossbar for the 'G' in Google Blue */}
      <YStack
        position="absolute"
        right={1}
        top="50%"
        marginTop={-stroke / 2}
        width={Math.round(size * 0.44)}
        height={stroke}
        backgroundColor="$googleBlue"
        borderRadius={1}
      />
    </ZStack>
  );
};

AuthGoogleIcon.displayName = "AuthGoogleIcon";
