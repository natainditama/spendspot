import rootConfig from "../../eslint.config.mjs";
import { defineConfig } from "eslint/config";

/**
 * Filters monorepo root ESLint rules for the edge-api workspace. Strips out
 * workspace exclusion patterns and frontend React plugins.
 */
const filteredRootConfig = rootConfig.filter(
  (entry) =>
    !entry.ignores?.includes("apps/edge-api/**") &&
    !entry.plugins?.react &&
    !entry.plugins?.["react-hooks"] &&
    !entry.settings?.react
);

/**
 * Edge API ESLint configuration integrating Deno and Supabase runtime rules.
 * Defines environment-specific linting standards and workspace exclusions.
 */
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
