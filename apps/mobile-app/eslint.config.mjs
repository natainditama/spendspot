// https://docs.expo.dev/guides/using-eslint/
import { defineConfig } from "eslint/config";

import rootConfig from "../../eslint.config.mjs";

/**
 * Mobile-app ESLint configuration extending the SpendSpot monorepo root config.
 * Applies shared linting rules while excluding native build artifact folders.
 */
export default defineConfig([
  ...rootConfig,
  // Mobile-app specific exclusions
  {
    ignores: ["ios/**", "android/**", ".expo/**"],
  },
]);
