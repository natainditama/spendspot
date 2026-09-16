import { getDefaultConfig } from "expo/metro-config";
import path from "path";

// Find the project and monorepo workspace directories
const projectRoot = __dirname;
const monorepoRoot = path.resolve(projectRoot, "../..");

const config = getDefaultConfig(projectRoot);

// Watch all files within the monorepo (apps/* and packages/*)
config.watchFolders = [monorepoRoot];
config.resolver.sourceExts = ["ts", "tsx", "js", "jsx", "json", "cjs"];
config.resolver.assetExts = ["glb", "gltf", "png", "jpg", "svg"];

// Let Metro know where to resolve packages (local and hoisted root node_modules)
config.resolver.nodeModulesPaths = [
  path.resolve(projectRoot, "node_modules"),
  path.resolve(monorepoRoot, "node_modules"),
];

export default config;
