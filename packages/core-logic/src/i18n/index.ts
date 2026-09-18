import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import enUSAuth from "./en-US/auth.json";
import enUSCommon from "./en-US/common.json";
import idIDAuth from "./id-ID/auth.json";
import idIDCommon from "./id-ID/common.json";

/**
 * BCP 47 locale code identifiers supported by the SpendSpot platform. Restricts
 * supported application languages to English and Indonesian.
 */
export type SupportedLocale = "en-US" | "id-ID";

/**
 * Default locale identifier applied when no user preference is configured.
 * Establishes Bahasa Indonesia as primary target regional setting.
 */
export const DEFAULT_LOCALE: SupportedLocale = "id-ID";

/**
 * Secondary fallback locale applied when missing translations occur. Guarantees
 * content availability by reverting missing keys to US English.
 */
export const FALLBACK_LOCALE: SupportedLocale = "en-US";

/**
 * Static i18next translation resource catalog grouped by locale and namespace.
 * Aggregates localized authentication and common interface messaging.
 */
export const resources = {
  "en-US": {
    common: enUSCommon,
    auth: enUSAuth,
  },
  "id-ID": {
    common: idIDCommon,
    auth: idIDAuth,
  },
} as const satisfies Record<SupportedLocale, Record<string, unknown>>;

/**
 * Default translation namespace accessed during standard lookup calls. Targets
 * shared common interface strings when explicit scope is omitted.
 */
export const defaultNS = "common" as const;

/**
 * Bootstraps the i18next localization engine with React framework bindings.
 * Initializes language detection, fallback chains, and default namespaces.
 */
export function initializeI18n(locale: SupportedLocale = DEFAULT_LOCALE) {
  i18n.use(initReactI18next).init({
    lng: locale,
    fallbackLng: FALLBACK_LOCALE,
    defaultNS,
    ns: Object.keys(resources[DEFAULT_LOCALE]),
    resources,
    interpolation: {
      // React already escapes output, no need for i18next double-escaping.
      escapeValue: false,
    },
  });

  return i18n;
}

export default i18n;
