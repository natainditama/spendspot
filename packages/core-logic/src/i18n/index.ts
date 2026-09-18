import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import enUSAuth from "./en-US/auth.json";
import enUSCommon from "./en-US/common.json";
import idIDAuth from "./id-ID/auth.json";
import idIDCommon from "./id-ID/common.json";

/** BCP 47 locale codes supported by SpendSpot. */
export type SupportedLocale = "en-US" | "id-ID";

/** Default locale when no preference is set. */
export const DEFAULT_LOCALE: SupportedLocale = "id-ID";

/** Fallback locale used when a translation key is missing in the active locale. */
export const FALLBACK_LOCALE: SupportedLocale = "en-US";

/**
 * I18next resource bundle. Each locale maps to a record of { [namespace]: translationObject }. Add new namespaces here
 * as the app grows (e.g. "auth", "settings").
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

/** Default namespace used when no namespace is specified in t() calls. */
export const defaultNS = "common" as const;

/**
 * Initializes the i18next instance with React integration. Call this once at app startup before rendering any
 * component.
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
