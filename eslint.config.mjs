import path from "node:path";
import { fileURLToPath } from "node:url";
import expoConfig from "eslint-config-expo/flat.js";
import gitignore from "eslint-config-flat-gitignore";
import prettierConfig from "eslint-config-prettier";
import turboConfig from "eslint-config-turbo/flat";
import { defineConfig } from "eslint/config";
import tseslint from "typescript-eslint";

const rootDir = path.dirname(fileURLToPath(import.meta.url));

/**
 * Shared strict ruleset for SpendSpot: enforces correctness, immutability, and
 * clean imports to suppress the unused-vars error.
 */
const strictRules = {
  // Unused variables / parameters / imports
  "no-unused-vars": "off",
  "@typescript-eslint/no-unused-vars": [
    "error",
    {
      args: "all",
      argsIgnorePattern: "^_",
      vars: "all",
      varsIgnorePattern: "^_",
      caughtErrors: "all",
      caughtErrorsIgnorePattern: "^_",
      destructuredArrayIgnorePattern: "^_",
      ignoreRestSiblings: true,
    },
  ],
  // Mandatory curly braces on every block
  curly: ["error", "all"],
  // Dead code & constant conditions
  "no-unreachable": "error",
  "no-constant-condition": ["error", { checkLoops: false }],
  "no-unused-expressions": [
    "error",
    {
      allowShortCircuit: true,
      allowTernary: true,
      allowTaggedTemplates: true,
    },
  ],
  // Single import per module, no duplicates
  // "no-duplicate-imports": "error",
  // "import/no-duplicates": "error",
  "import/no-named-as-default-member": "off",
  // Immutability & strict equality
  "prefer-const": ["error", { destructuring: "all" }],
  "no-var": "error",
  eqeqeq: ["error", "always", { null: "ignore" }],
  // No implicit switch fallthrough
  "no-fallthrough": "error",
  // Error-handling & self-assignment guardrails
  "no-self-assign": "error",
  "no-self-compare": "error",
  "no-shadow-restricted-names": "error",
  "no-useless-catch": "error",
  "no-useless-rename": "error",
  "no-empty": ["error", { allowEmptyCatch: false }],
  // Prevent undeclared env-var access across workspaces
  "turbo/no-undeclared-env-vars": [
    "error",
    {
      allowList: ["NODE_ENV", "EXPO_PUBLIC_*", "CI", "npm_*", "BUN_*", "PORT"],
    },
  ],
};

/**
 * SpendSpot ESLint flat config: composed from expo, turbo, prettier, gitignore.
 * Workspace-level configs can import and extend this array directly.
 */
export default defineConfig([
  // Reads .gitignore from the repo root and propagates ignores into ESLint
  gitignore({ files: [path.resolve(rootDir, ".gitignore")], strict: false }),
  expoConfig,
  ...turboConfig,
  // SpendSpot strict rules with the @typescript-eslint plugin registered
  {
    files: ["**/*.{js,jsx,ts,tsx,mjs,cjs}"],
    plugins: {
      "@typescript-eslint": tseslint.plugin,
    },
    rules: strictRules,
  },
  // Paths excluded from all linting
  {
    ignores: [
      "**/node_modules/**",
      "**/dist/**",
      "**/.expo/**",
      "**/.bun/**",
      "**/build/**",
      "**/coverage/**",
      "**/*.min.js",
      "**/*.d.ts",
      "scratch/**",
      "apps/edge-api/**",
    ],
  },
  prettierConfig,
]);
