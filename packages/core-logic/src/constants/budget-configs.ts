import type { CurrencyCode } from "../lib/utils/format-currency";

export type { CurrencyCode };

/**
 * Configuration contract for currency-specific budget limits and step increments.
 * Follows global financial standards and purchasing power parity (PPP) norms.
 */
export interface CurrencyBudgetConfig {
  /** Minimum allowable daily spending cap for the currency */
  minCap: number;
  /** Maximum allowable daily spending cap for the currency */
  maxCap: number;
  /** Step increment for the slider adjustment */
  stepCap: number;
  /** Default recommended daily budget cap */
  defaultDailyCap: number;
}

/**
 * Standard working days per month used for estimating monthly expenditure.
 * Industry baseline for commute and daily spending budgeting (5 days/week * 5 weeks).
 */
export const DEFAULT_WORKING_DAYS_PER_MONTH = 25;

/**
 * Default proactive warning alert threshold (80% of daily limit).
 */
export const BUDGET_ALERT_THRESHOLD_RATIO = 0.8;

/**
 * Default global base currency.
 */
export const DEFAULT_CURRENCY: CurrencyCode = "IDR";

/**
 * Global and localized daily budget constraints across supported fiat currencies.
 *
 * Rationales & Economic Baselines:
 * - IDR (Indonesia): Baseline daily commute (MRT/KRL/TransJakarta) + lunch in Greater Jakarta
 *   typically ranges from Rp 20.000 to Rp 150.000. Default daily cap of Rp 100.000 yields
 *   a monthly estimate of Rp 2.500.000, aligning with Screen 03 design specifications.
 *   Max cap of Rp 2.000.000 accommodates executive ride-hailing, parking, and dining.
 *
 * - USD (United States): Standard metro/subway roundtrip ($5-$7) + fast-casual lunch ($15-$25).
 *   Daily allowance typically $30-$80. Default daily cap of $50 yields $1,250/month.
 *   Max cap of $500 covers rideshare surge, parking, and metropolitan travel expenses.
 *
 * - SGD (Singapore): Roundtrip MRT/bus (S$3.50-S$5.00) + hawker/food court meals (S$15-S$30).
 *   Daily average S$35-S$80. Default daily cap of S$60 yields S$1,500/month.
 *   Max cap of S$500 covers taxi/Grab and business dining.
 *
 * - EUR (Eurozone): Public transit daily pass (€6-€10) + lunch & espresso (€15-€25).
 *   Daily average €30-€70. Default daily cap of €50 yields €1,250/month.
 *   Max cap of €500 accommodates metropolitan dining and commuting.
 */
export const CURRENCY_BUDGET_CONFIG: Record<CurrencyCode, CurrencyBudgetConfig> = {
  IDR: {
    minCap: 20000,
    maxCap: 2000000,
    stepCap: 5000,
    defaultDailyCap: 100000,
  },
  USD: {
    minCap: 10,
    maxCap: 500,
    stepCap: 5,
    defaultDailyCap: 50,
  },
  SGD: {
    minCap: 10,
    maxCap: 500,
    stepCap: 5,
    defaultDailyCap: 60,
  },
  EUR: {
    minCap: 10,
    maxCap: 500,
    stepCap: 5,
    defaultDailyCap: 50,
  },
};

/**
 * Default daily spending cap based on global default currency.
 */
export const DEFAULT_DAILY_CAP = CURRENCY_BUDGET_CONFIG[DEFAULT_CURRENCY].defaultDailyCap;
