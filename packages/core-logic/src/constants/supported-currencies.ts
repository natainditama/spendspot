export interface CurrencyConfig {
  code: "IDR" | "USD" | "SGD" | "EUR";
  symbol: string;
  name: string;
  locale: string;
  fractionDigits: number;
}

export const SUPPORTED_CURRENCIES: Record<string, CurrencyConfig> = {
  IDR: {
    code: "IDR",
    symbol: "Rp",
    name: "Indonesian Rupiah",
    locale: "id-ID",
    fractionDigits: 0,
  },
  USD: {
    code: "USD",
    symbol: "$",
    name: "US Dollar",
    locale: "en-US",
    fractionDigits: 2,
  },
  SGD: {
    code: "SGD",
    symbol: "S$",
    name: "Singapore Dollar",
    locale: "en-SG",
    fractionDigits: 2,
  },
  EUR: {
    code: "EUR",
    symbol: "€",
    name: "Euro",
    locale: "de-DE",
    fractionDigits: 2,
  },
};
