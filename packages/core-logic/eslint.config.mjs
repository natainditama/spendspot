import rootConfig from "../../eslint.config.mjs";
import { defineConfig } from "eslint/config";

/**
 * Core logic ESLint configuration extending the root config. Enforces shared
 * linting standards while ignoring build artifacts.
 */
export default defineConfig([
  ...rootConfig,
  // Core Logic specific exclusions
  {
    ignores: ["dist/**", ".cache/**", "coverage/**"],
  },
]);
