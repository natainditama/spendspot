/** SpendSpot Database Definitions 1:1 Mapping with Supabase PostgreSQL Schema */

export type PaymentMethodType = "CASH" | "QRIS" | "DEBIT_CARD" | "CREDIT_CARD" | "E_WALLET" | "BANK_TRANSFER" | "OTHER";

export type ExpenseCategoryType =
  | "FOOD_AND_BEVERAGE"
  | "TRANSPORTATION"
  | "HOUSING_AND_UTILITIES"
  | "EDUCATION"
  | "HEALTHCARE"
  | "ENTERTAINMENT"
  | "SHOPPING"
  | "FINANCIAL"
  | "OTHER";

export interface UserProfile {
  user_id: string;
  email: string;
  phone_number: string | null;
  full_name: string;
  avatar_url: string | null;
  preferred_currency: "IDR" | "USD" | "SGD" | "EUR";
  preferred_language: "id" | "en";
  daily_limit: number;
  weekly_limit: number;
  monthly_limit: number;
  daily_ai_limit: number;
  created_at: string;
  updated_at: string;
}

export interface GeoPoint {
  latitude: number;
  longitude: number;
}

export interface SavedSpot {
  id: string;
  user_id: string;
  spot_name: string;
  category: ExpenseCategoryType;
  default_payment_method: PaymentMethodType;
  default_payment_provider: string | null;
  radius_meters: number;
  address: string | null;
  location: GeoPoint;
  visit_count: number;
  last_visited_at: string;
  deleted_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface Transaction {
  id: string;
  user_id: string;
  spot_id: string | null;
  amount: number;
  category: ExpenseCategoryType;
  payment_method: PaymentMethodType;
  payment_provider: string | null;
  notes: string | null;
  receipt_url: string | null;
  tags: string[];
  transaction_location: GeoPoint | null;
  transaction_time: string;
  deleted_at: string | null;
  created_at: string;
  updated_at: string;
  spot?: SavedSpot;
}

export interface AiQueryLog {
  id: string;
  user_id: string;
  prompt: string;
  response: string;
  tokens_used: number;
  is_out_of_scope: boolean;
  created_at: string;
}
