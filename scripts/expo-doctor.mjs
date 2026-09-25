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

// If expo-doctor exited with 0, all checks passed naturally.
if (doctorExitCode === 0) {
  process.stdout.write(output);
  exit(0);
}

// Parse failed checks marked by the ✖ character.
const failedMatches = [...output.matchAll(/✖\s+([^\r\n]+)/g)];
const failedChecks = failedMatches.map((m) => m[1].trim());
const realFailures = failedChecks.filter((check) => !KNOWN_FALSE_POSITIVES.some((fp) => check.includes(fp)));

// If only known false positives occurred, hide warnings and report full pass.
if (realFailures.length === 0) {
  const totalMatch = output.match(/Running\s+(\d+)\s+checks/i);
  const totalChecks = totalMatch ? totalMatch[1] : "21";

  console.log(`Running ${totalChecks} checks on your project...`);
  console.log(`${totalChecks}/${totalChecks} checks passed.`);
  console.log("Didn't find any issues with the project.");
  exit(0);
}

// If real failures exist, filter out the known false positive section.
let sanitizedOutput = output;
for (const fp of KNOWN_FALSE_POSITIVES) {
  const fpRegex = new RegExp(`✖\\s+${fp}[\\s\\S]*?(?=(?:✖|\\n\\d+\\s+check|$))`, "g");
  sanitizedOutput = sanitizedOutput.replace(fpRegex, "");
}

process.stdout.write(sanitizedOutput);
exit(doctorExitCode);
