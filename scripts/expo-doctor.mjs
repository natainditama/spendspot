#!/usr/bin/env node
/**
 * Expo-doctor wrapper for Bun monorepos.
 *
 * Runs expo-doctor and suppresses false-positive duplicate dependency warnings
 * from Bun's isolated linker while preserving real compatibility failures.
 */

import { execSync } from "node:child_process";
import { exit } from "node:process";

const KNOWN_FALSE_POSITIVES = [
  // Bun isolated-linker false positive: same version, different symlink path
  "Check that no duplicate dependencies are installed",
];

let output = "";
let doctorExitCode = 0;

try {
  output = execSync("npx expo-doctor", {
    cwd: process.cwd(),
    stdio: "pipe",
    encoding: "utf8",
  });
} catch (err) {
  output = (err.stdout ?? "") + (err.stderr ?? "");
  doctorExitCode = err.status ?? 1;
}

// Always print the full output so developers can see the raw results.
process.stdout.write(output);
if (doctorExitCode === 0) {
  exit(0);
}

// Parse failed checks from the output.
// expo-doctor marks failures with the ✖ character.
const failedLines = output
  .split("\n")
  .filter((line) => line.includes("✖"))
  .map((line) => line.replace("✖", "").trim());

const realFailures = failedLines.filter((line) => !KNOWN_FALSE_POSITIVES.some((fp) => line.includes(fp)));
if (realFailures.length === 0) {
  console.log("expo-doctor: all real checks passed.");
  exit(0);
}

console.error(
  `expo-doctor: ${realFailures.length} real issue(s) found:\n` + realFailures.map((f) => `  • ${f}`).join("\n")
);
exit(1);
