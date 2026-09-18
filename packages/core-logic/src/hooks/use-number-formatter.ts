import { useCallback, useMemo } from "react";
import { useTranslation } from "react-i18next";

import { formatCompactNumber, formatNumber, formatPercent } from "../lib/utils/format-number";

/**
 * Custom React hook for locale-aware number formatting. Automatically synchronizes with the active i18next language or
 * accepts an optional override.
 */
export function useNumberFormatter(customLocale?: string) {
  const { i18n } = useTranslation();
  const locale = customLocale || i18n.language || "id-ID";

  const format = useCallback(
    (value: number, options?: Intl.NumberFormatOptions): string => formatNumber(value, locale, options),
    [locale]
  );

  const percent = useCallback(
    (value: number, fractionDigits: number = 0): string => formatPercent(value, locale, fractionDigits),
    [locale]
  );

  const compact = useCallback((value: number): string => formatCompactNumber(value, locale), [locale]);

  return useMemo(
    () => ({
      locale,
      format,
      percent,
      compact,
    }),
    [locale, format, percent, compact]
  );
}
