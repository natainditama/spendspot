/**
 * Native intent interceptor for SpendSpot mobile application.
 * Intercepts incoming deep links and Android system intents before Expo Router attempts matching.
 * Resolves malformed scheme roots such as `spendspot:///` or `spendspot://` directly to `/`.
 * Preserves authentication query parameters and fragments for `/auth/callback`.
 */
export async function redirectSystemPath({ path }: { path: string; initial: boolean }): Promise<string> {
  try {
    if (!path || path === "/" || path === "///") {
      return "/";
    }

    // Handle custom application scheme (spendspot://...)
    if (path.startsWith("spendspot://")) {
      const stripped = path.replace(/^spendspot:\/*/, "/");

      if (!stripped || stripped === "/") {
        return "/";
      }

      return stripped;
    }

    // Normalize multiple leading slashes (e.g. ///path -> /path)
    const normalized = path.replace(/^\/+/, "/");

    return normalized || "/";
  } catch {
    return "/";
  }
}
