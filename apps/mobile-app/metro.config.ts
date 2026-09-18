import path from "path";
import { getDefaultConfig, type MetroConfig } from "expo/metro-config";
import { withNativewind } from "nativewind/metro";

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
];

const nativewindConfig = withNativewind(config as any) as MetroConfig;
const originalResolveRequest = nativewindConfig.resolver?.resolveRequest;

if (nativewindConfig.resolver) {
  (nativewindConfig.resolver as { resolveRequest?: any }).resolveRequest = (
    context: any,
    moduleName: string,
    platform: string
  ) => {
    // Guard against circular dependency: when react-native-css/components internal modules
    // import 'react-native', resolve to the actual react-native package instead of intercepting
    if (
      moduleName === "react-native" &&
      context.originModulePath &&
      context.originModulePath.includes("react-native-css")
    ) {
      return context.resolveRequest(context, moduleName, platform);
    }

    return originalResolveRequest
      ? originalResolveRequest(context, moduleName, platform)
      : context.resolveRequest(context, moduleName, platform);
  };
}

export default nativewindConfig;
