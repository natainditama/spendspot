import rootConfig from "../../eslint.config.mjs";
import { defineConfig } from "eslint/config";

/**
 * UI components ESLint configuration extending the root config. Applies shared
 * linting rules while excluding build directories.
 */
export default defineConfig([
  ...rootConfig,
  // UI Components specific exclusions
  {
    ignores: ["dist/**", ".cache/**"],
  },
]);
