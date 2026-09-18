import { execSync } from "node:child_process";

try {
  execSync("bun run typecheck", { stdio: "inherit" });
} catch (error) {
  process.exit(error.status ?? 1);
}
