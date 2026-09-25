import { createRequire } from "node:module";
import path from "node:path";

const req = createRequire(import.meta.url);

export interface WithUIComponentsOptions {
  projectRoot: string;
  disableTamaguiCompiler?: boolean;
}

/**
 * SpendSpot UI Components Metro bundler enhancer and singleton resolver.
 * Wraps metro config with monorepo workspace paths and Tamagui compiler plugin.
 */
export function withUIComponents<T extends { resolver?: any; watchFolders?: any }>(
  config: T,
  options: WithUIComponentsOptions
): T {
  const { projectRoot, disableTamaguiCompiler = false } = options;
  const monorepoRoot = path.resolve(projectRoot, "../..");
  const uiComponentsRoot = path.resolve(monorepoRoot, "packages/ui-components");

  config.watchFolders = Array.from(new Set([...(config.watchFolders || []), monorepoRoot, uiComponentsRoot]));
  const resolver = config.resolver || ({} as any);
  resolver.nodeModulesPaths = Array.from(
    new Set([
      ...(resolver.nodeModulesPaths || []),
      path.resolve(projectRoot, "node_modules"),
      path.resolve(monorepoRoot, "node_modules"),
      path.resolve(uiComponentsRoot, "node_modules"),
    ])
  );

  const SINGLETON_PACKAGES = ["react", "react-native", "@tamagui/core", "@tamagui/web", "@tamagui/config"];
  const extraNodeModules: Record<string, string> = {
    ...(resolver.extraNodeModules || {}),
  };

  for (const pkg of SINGLETON_PACKAGES) {
    try {
      extraNodeModules[pkg] = path.dirname(
        req.resolve(`${pkg}/package.json`, {
          paths: [projectRoot, monorepoRoot, uiComponentsRoot],
        })
      );
    } catch {
      // Package not found or non-standard export
    }
  }

  resolver.extraNodeModules = extraNodeModules;
  config.resolver = resolver;
  if (disableTamaguiCompiler) {
    return config;
  }

  try {
    const { withTamagui } = req("@tamagui/metro-plugin");
    return withTamagui(config as any, {
      components: ["tamagui"],
      config: path.resolve(uiComponentsRoot, "src/config/index.ts"),
    }) as T;
  } catch (err) {
    console.warn("[@spendspot/ui-components] withTamagui compiler fallback to runtime mode:", err);
    return config;
  }
}
