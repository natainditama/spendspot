import rootConfig from "../../eslint.config.mjs";
import { defineConfig } from "eslint/config";

/**
 * Core Logic ESLint configuration extending the SpendSpot monorepo root config. Workspace-specific overrides and
 * exclusions can be defined here.
 */
export default defineConfig([
  ...rootConfig,
  // Core Logic specific exclusions
  {
    ignores: ["dist/**", ".cache/**", "coverage/**"],
  },
]);
