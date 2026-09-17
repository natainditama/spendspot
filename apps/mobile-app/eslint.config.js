// https://docs.expo.dev/guides/using-eslint/
const { defineConfig } = require("eslint/config");
const rootConfig = require("../../eslint.config.mjs").default;

/**
 * Mobile-app ESLint configuration extending the SpendSpot monorepo root config.
 * Workspace-specific overrides and exclusions can be defined here.
 */
module.exports = defineConfig([
  ...rootConfig,

  // Mobile-app specific exclusions
  {
    ignores: ["ios/**", "android/**", ".expo/**"],
  },
]);
