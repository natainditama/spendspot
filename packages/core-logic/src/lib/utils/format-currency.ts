import { SUPPORTED_CURRENCIES } from "../../constants/supported-currencies";

export type CurrencyCode = keyof typeof SUPPORTED_CURRENCIES;

/** Formats a numeric amount as a localized currency string based on the given currency code. */
export function formatCurrency(amount: number, currencyCode: CurrencyCode = "IDR"): string {
  const config = SUPPORTED_CURRENCIES[currencyCode] || SUPPORTED_CURRENCIES.IDR;

  try {
    return new Intl.NumberFormat(config.locale, {
      style: "currency",
      currency: config.code,
      minimumFractionDigits: config.fractionDigits,
      maximumFractionDigits: config.fractionDigits,
    }).format(amount);
  } catch {
    return `${config.symbol} ${amount.toLocaleString()}`;
  }
}

/**
 * Formats a currency amount into a compact human-readable representation. Ideal for dashboard KPI cards, summary
 * charts, and mobile constrained spaces.
 */
export function formatCompactCurrency(amount: number, currencyCode: CurrencyCode = "IDR"): string {
  const config = SUPPORTED_CURRENCIES[currencyCode] || SUPPORTED_CURRENCIES.IDR;

  try {
    return new Intl.NumberFormat(config.locale, {
      style: "currency",
      currency: config.code,
      notation: "compact",
      compactDisplay: "short",
      maximumFractionDigits: 1,
    }).format(amount);
  } catch {
    return `${config.symbol} ${amount.toLocaleString()}`;
  }
}

/**
 * Parses a user-typed or formatted currency string back into a clean numeric value. Strips non-numeric characters,
 * currency symbols, and normalizes decimal separators.
 */
export function parseCurrencyToNumber(formattedAmount: string): number {
  if (!formattedAmount || typeof formattedAmount !== "string") {
    return 0;
  }

  // Remove currency symbols, non-breaking spaces, and whitespace
  const sanitized = formattedAmount.replace(/[^\d.,-]/g, "").trim();

  if (!sanitized) {
    return 0;
  }

  // Handle Indonesian / European notation: 150.000,50 -> 150000.50
  if (sanitized.includes(",") && sanitized.includes(".")) {
    const lastComma = sanitized.lastIndexOf(",");
    const lastDot = sanitized.lastIndexOf(".");

    if (lastComma > lastDot) {
      // European / Indonesian decimal: 1.250,50 -> 1250.50
      const normalized = sanitized.replace(/\./g, "").replace(",", ".");
      const parsed = parseFloat(normalized);
      return isNaN(parsed) ? 0 : parsed;
    }
  }

  // Standard notation with comma thousands separator: 1,250.50 -> 1250.50
  const normalized = sanitized.replace(/,/g, "");
  const parsed = parseFloat(normalized);
  return isNaN(parsed) ? 0 : parsed;
}
