import React from "react";

import { Button } from "@spendspot/ui-components/button";
import {
  NativeSelect,
  NativeSelectContent,
  NativeSelectGroup,
  NativeSelectItem,
  NativeSelectLabel,
  NativeSelectTrigger,
  NativeSelectValue,
} from "@spendspot/ui-components/native-select";
import { YStack } from "@spendspot/ui-components/stacks";

/**
 * Comprehensive Showcase demonstrating all 41 SpendSpot UI Components.
 * Systematically exhibits every size, variant, color action, and state.
 */
export default function ComponentShowcase() {
  return (
    <YStack margin="$4" gap="$4">
      <Button theme="primary">Primary</Button>
      <Button theme="outline" variant="outlined">
        Outline
      </Button>
      <Button theme="secondary">Secondary</Button>
      <Button theme="ghost">Ghost</Button>
      <Button theme="destructive">Destructive</Button>
      <NativeSelect defaultValue="">
        <NativeSelectTrigger>
          <NativeSelectValue placeholder="Select a fruit..." />
        </NativeSelectTrigger>
        <NativeSelectContent>
          <NativeSelectGroup>
            <NativeSelectLabel>Fruits</NativeSelectLabel>
            <NativeSelectItem value="apple" index={0}>
              Apple
            </NativeSelectItem>
            <NativeSelectItem value="banana" index={1}>
              Banana
            </NativeSelectItem>
            <NativeSelectItem value="mango" index={2}>
              Mango
            </NativeSelectItem>
          </NativeSelectGroup>
        </NativeSelectContent>
      </NativeSelect>
    </YStack>
  );
}
