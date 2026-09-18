import rootConfig from "../../eslint.config.mjs";
import { defineConfig } from "eslint/config";

/**
 * UI Components ESLint configuration extending the SpendSpot monorepo root config. Workspace-specific overrides and
 * exclusions can be defined here.
 */
export default defineConfig([
  ...rootConfig,
  // UI Components specific exclusions
  {
    ignores: ["dist/**", ".cache/**"],
  },
]);
