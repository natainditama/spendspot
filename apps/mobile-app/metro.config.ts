import path from "path";
import { getDefaultConfig } from "expo/metro-config";

// Find the project and monorepo workspace directories
const projectRoot = __dirname;
const monorepoRoot = path.resolve(projectRoot, "../..");
const config = getDefaultConfig(projectRoot);

// Watch all files within the monorepo
config.watchFolders = [monorepoRoot];

// Let Metro know where to resolve packages
config.resolver.nodeModulesPaths = [
  path.resolve(projectRoot, "node_modules"),
  path.resolve(monorepoRoot, "node_modules"),
  path.resolve(monorepoRoot, "packages/ui-components/node_modules"),
];

// Ensure singleton resolution for react and tamagui packages to prevent duplicate contexts
const SINGLETON_PACKAGES = ["react", "react-native", "tamagui", "@tamagui/core", "@tamagui/web", "@tamagui/config"];

const extraNodeModules: Record<string, string> = {};
for (const pkg of SINGLETON_PACKAGES) {
  try {
    extraNodeModules[pkg] = path.dirname(
      require.resolve(`${pkg}/package.json`, {
        paths: [projectRoot, monorepoRoot, path.resolve(monorepoRoot, "packages/ui-components")],
      })
    );
  } catch {
    // Package not found or non-standard export
  }
}

(config.resolver as any).extraNodeModules = {
  ...((config.resolver as any).extraNodeModules || {}),
  ...extraNodeModules,
};

/**
 * Customized Metro bundler configuration for SpendSpot monorepo workspace.
 * Resolves shared dependencies and handles cross-package module requests.
 */
export default config;
