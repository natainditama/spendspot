import { useCallback, useMemo } from "react";
import { useTranslation } from "react-i18next";

import { formatDate, formatDateRange, formatRelativeTime } from "../lib/utils/format-date";

/**
 * Custom React hook for locale-aware date and time formatting utilities.
 * Synchronizes with active i18next language or applies an explicit override.
 */
export function useDateFormatter(customLocale?: string) {
  const { i18n } = useTranslation();
  const locale = customLocale || i18n.language || "id-ID";

  const format = useCallback(
    (date: Date | string | number, options?: Intl.DateTimeFormatOptions): string => formatDate(date, locale, options),
    [locale]
  );

  const relative = useCallback((date: Date | string | number): string => formatRelativeTime(date, locale), [locale]);

  const range = useCallback(
    (startDate: Date | string | number, endDate: Date | string | number): string =>
      formatDateRange(startDate, endDate, locale),
    [locale]
  );

  return useMemo(
    () => ({
      locale,
      format,
      relative,
      range,
    }),
    [locale, format, relative, range]
  );
}
