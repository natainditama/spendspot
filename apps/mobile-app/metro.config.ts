import { getDefaultConfig } from "expo/metro-config";

import { withUIComponents } from "@spendspot/ui-components/metro";

const projectRoot = __dirname;
const config = getDefaultConfig(projectRoot);

/**
 * Customized Metro bundler configuration for SpendSpot mobile application.
 * Extends workspace and Tamagui configurations from @spendspot/ui-components.
 */
export default withUIComponents(config, {
  projectRoot,
});
