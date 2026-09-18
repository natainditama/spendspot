import rootConfig from "../../eslint.config.mjs";
import { defineConfig } from "eslint/config";

/**
 * Edge API ESLint configuration extending the SpendSpot monorepo root config. Removes the global apps/edge-api/**
 * ignore from root so files in this workspace are linted.
 */
const filteredRootConfig = rootConfig.filter(
  (entry) =>
    !entry.ignores?.includes("apps/edge-api/**") &&
    !entry.plugins?.react &&
    !entry.plugins?.["react-hooks"] &&
    !entry.settings?.react
);

export default defineConfig([
  ...filteredRootConfig,
  // Deno + Supabase Edge Runtime overrides
  {
    files: ["supabase/functions/**/*.ts"],
    rules: {
      "import/no-unresolved": "off",
    },
  },
  // Edge API specific exclusions
  {
    ignores: ["dist/**", ".cache/**", "supabase/.branches/**", "supabase/.temp/**"],
  },
]);
