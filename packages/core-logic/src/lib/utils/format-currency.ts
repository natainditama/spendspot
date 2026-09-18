import { SUPPORTED_CURRENCIES } from "../../constants/supported-currencies";

/**
 * Unique ISO currency code identifiers configured in the application.
 * Constrains supported monetary currency keys to predefined standards.
 */
export type CurrencyCode = keyof typeof SUPPORTED_CURRENCIES;

/**
 * Formats numeric currency amounts into localized monetary strings. Applies
 * currency decimal precisions and standard regional symbols.
 */
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
 * Formats monetary values into compact notations for compact views. Abbreviates
 * large numbers for financial dashboards and metric cards.
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
 * Parses localized currency and numeric text strings into raw numbers. Removes
 * currency symbols and normalizes varied decimal separators.
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
