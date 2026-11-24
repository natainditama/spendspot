import { setIsRecoveryFlow } from "@spendspot/core-logic/services/auth-service";

/**
 * Native intent interceptor for SpendSpot mobile application.
 * Intercepts incoming deep links and system intents before Expo Router attempts matching.
 * Resolves scheme roots and normalizes Expo Go paths (`/--/auth/callback` -> `/auth/callback`).
 * Converts URL hash fragments (`#access_token=...`) into query parameters (`?access_token=...`)
 * so that Supabase authentication tokens are cleanly parsed by Expo Router and route handlers.
 */
export async function redirectSystemPath({ path }: { path: string; initial: boolean }): Promise<string> {
  try {
    if (!path || path === "/" || path === "///") {
      return "/";
    }

    // Immediately detect recovery deep link intent synchronously
    if (path.includes("type=recovery") || path.includes("type%3Drecovery")) {
      setIsRecoveryFlow(true);
    }

    let target = path;

    // 1. Handle standalone custom application scheme (spendspot://...)
    if (target.startsWith("spendspot://")) {
      target = target.replace(/^spendspot:\/*/, "/");
    } else if (target.startsWith("exp://")) {
      // 2. Handle Expo Go development scheme (exp://<ip>:<port>/--/<path>)
      if (target.includes("/--/")) {
        target = target.substring(target.indexOf("/--/") + 4);
      } else {
        target = target.replace(/^exp:\/\/[^/]+/, "");
      }
    }

    // 3. Strip Expo Go deep link prefixes (/--/ or --/)
    if (target.startsWith("/--/")) {
      target = target.replace(/^\/--\//, "/");
    } else if (target.startsWith("/--")) {
      target = target.replace(/^\/--/, "");
    } else if (target.startsWith("--/")) {
      target = target.replace(/^--\//, "/");
    }

    // 4. Convert fragment (#) to query parameter (?) for Supabase OAuth / recovery tokens
    if (target.includes("#")) {
      target = target.includes("?") ? target.replace("#", "&") : target.replace("#", "?");
    }

    // 5. Ensure leading slash and normalize multiple slashes
    if (!target.startsWith("/")) {
      target = "/" + target;
    }
    target = target.replace(/^\/+/, "/");

    if (!target || target === "/") {
      return "/";
    }

    return target;
  } catch {
    return "/";
  }
}
