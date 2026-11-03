import type { SupportedLocale } from "../../i18n";

/**
 * Resolves the device's system locale and maps it to a valid SpendSpot SupportedLocale ("en-US" | "id-ID").
 * Falls back to "en-US" if the detected locale is unsupported.
 */
export function resolveDeviceLocale(): SupportedLocale {
  try {
    const systemLocale =
      Intl.DateTimeFormat().resolvedOptions().locale ||
      (typeof navigator !== "undefined" && navigator.language) ||
      "en-US";

    const normalized = systemLocale.toLowerCase();
    if (normalized.startsWith("id") || normalized.includes("-id")) {
      return "id-ID";
    }
  } catch {
    // Gracefully degrade to standard default locale
  }

  return "en-US";
}

/**
 * Resolves the device's preferred currency code based on system locale, country, or timezone.
 * Returns one of the platform supported currencies: "IDR", "USD", "SGD", or "EUR".
 */
export function resolveDeviceCurrency(): "IDR" | "USD" | "SGD" | "EUR" {
  try {
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone || "";
    const systemLocale =
      Intl.DateTimeFormat().resolvedOptions().locale ||
      (typeof navigator !== "undefined" && navigator.language) ||
      "en-US";

    const normalizedLocale = systemLocale.toLowerCase();
    const normalizedZone = timeZone.toLowerCase();

    // Check Indonesia indicators
    if (
      normalizedLocale.includes("id") ||
      normalizedLocale.endsWith("-id") ||
      normalizedZone.includes("jakarta") ||
      normalizedZone.includes("makassar") ||
      normalizedZone.includes("jayapura") ||
      normalizedZone.includes("pontianak")
    ) {
      return "IDR";
    }

    // Check Singapore indicators
    if (normalizedLocale.includes("sg") || normalizedLocale.endsWith("-sg") || normalizedZone.includes("singapore")) {
      return "SGD";
    }

    // Check Eurozone indicators
    if (
      normalizedLocale.includes("de") ||
      normalizedLocale.includes("fr") ||
      normalizedLocale.includes("it") ||
      normalizedLocale.includes("es") ||
      normalizedLocale.includes("nl") ||
      normalizedZone.includes("europe") ||
      normalizedZone.includes("berlin") ||
      normalizedZone.includes("paris") ||
      normalizedZone.includes("amsterdam")
    ) {
      return "EUR";
    }
  } catch {
    // Gracefully degrade to USD standard fallback
  }

  return "USD";
}
