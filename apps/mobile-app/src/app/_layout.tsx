import { Stack } from "expo-router";
import { Provider as UIProvider } from "@spendspot/ui-components/provider";

import "../../global.css";

export default function RootLayout() {
  return (
    <UIProvider mode="light">
      <Stack />
    </UIProvider>
  );
}
