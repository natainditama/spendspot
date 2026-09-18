import { Stack } from "expo-router";
import { UIProvider } from "@spendspot/ui-components/ui-provider";

import "../../global.css";

export default function RootLayout() {
  return (
    <UIProvider mode="light">
      <Stack />
    </UIProvider>
  );
}
