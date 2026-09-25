#!/usr/bin/env node
/**
 * Typecheck runner for Bun monorepos.
 *
 * Executes workspace-wide TypeScript checks for staged files and exits with a
 * non-zero status code when type errors occur.
 */
import { execSync } from "node:child_process";

try {
  execSync("bun run typecheck", { stdio: "inherit" });
} catch (error) {
  process.exit(error.status ?? 1);
}
