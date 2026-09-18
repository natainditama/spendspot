/**
 * Formats numeric values into localized decimal strings with separators. Falls
 * back to system locale defaults when formatting operation fails.
 */
export function formatNumber(value: number, locale: string = "id-ID", options?: Intl.NumberFormatOptions): string {
  if (typeof value !== "number" || isNaN(value)) {
    return "0";
  }

  try {
    return new Intl.NumberFormat(locale, options).format(value);
  } catch {
    return value.toLocaleString();
  }
}

/**
 * Formats decimal ratio values into localized percentage strings. Applies
 * specified decimal fraction precision to scaled values.
 */
export function formatPercent(value: number, locale: string = "id-ID", fractionDigits: number = 0): string {
  if (typeof value !== "number" || isNaN(value)) {
    return "0%";
  }

  try {
    return new Intl.NumberFormat(locale, {
      style: "percent",
      minimumFractionDigits: fractionDigits,
      maximumFractionDigits: fractionDigits,
    }).format(value);
  } catch {
    return `${(value * 100).toFixed(fractionDigits)}%`;
  }
}

/**
 * Formats numbers into compact notations with short unit suffixes. Optimizes
 * numeric display for metric widgets and summary tables.
 */
export function formatCompactNumber(value: number, locale: string = "id-ID"): string {
  if (typeof value !== "number" || isNaN(value)) {
    return "0";
  }

  try {
    return new Intl.NumberFormat(locale, {
      notation: "compact",
      compactDisplay: "short",
      maximumFractionDigits: 1,
    }).format(value);
  } catch {
    return value.toLocaleString();
  }
}
