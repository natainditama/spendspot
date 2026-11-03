import type { CurrencyCode } from "../../lib/utils/format-currency";

export interface SetupCurrencyOption {
  code: CurrencyCode;
  symbol: string;
  nameKey: string;
}

export interface SetupWizardSubmitData {
  currency: CurrencyCode;
  dailyCap: number;
  monthlyCap: number;
}

export interface SetupWizardScreenProps {
  /** Initial selected currency code */
  initialCurrency?: CurrencyCode;
  /** Initial daily cap budget value */
  initialDailyCap?: number;
  /** Minimum slider value */
  minCap?: number;
  /** Maximum slider value */
  maxCap?: number;
  /** Slider step increment */
  stepCap?: number;
  /** Callback fired when user selects a different currency */
  onCurrencyChange?: (currency: CurrencyCode) => void;
  /** Callback fired when user adjusts the daily budget cap */
  onDailyCapChange?: (cap: number) => void;
  /** Callback fired when user taps the primary CTA button */
  onContinue?: (data: SetupWizardSubmitData) => void;
  /** Callback fired when user taps the top-left back chevron button */
  onBack?: () => void;
  /** Loading state during asynchronous permissions or persistence */
  isLoading?: boolean;
  /** Automated testing identifier */
  testID?: string;
}
