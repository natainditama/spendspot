/** Formats a raw number using standard decimal notation based on the provided or default locale. */
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

/** Formats a decimal ratio as a localized percentage string. */
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

/** Formats large numbers into short human-readable representations. */
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
