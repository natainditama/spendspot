-- =============================================================================
-- Migration: 20240101000002_create_enums_tables_and_triggers
-- Description: Define domain enums, core tables, spatial/btree indexes, and updated_at triggers.
-- =============================================================================

-- Domain enums: payment_method_type and expense_category_type
DO $$ BEGIN
  CREATE TYPE payment_method_type AS ENUM (
    'CASH',
    'QRIS',
    'DEBIT_CARD',
    'CREDIT_CARD',
    'E_WALLET',
    'BANK_TRANSFER',
    'OTHER'
  );
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
  CREATE TYPE expense_category_type AS ENUM (
    'FOOD_AND_BEVERAGE',
    'TRANSPORTATION',
    'HOUSING_AND_UTILITIES',
    'EDUCATION',
    'HEALTHCARE',
    'ENTERTAINMENT',
    'SHOPPING',
    'FINANCIAL',
    'OTHER'
  );
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

-- users: public profile table with a 1-to-1 mapping to Supabase auth.users
CREATE TABLE IF NOT EXISTS users (
  user_id            UUID           REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email              TEXT           NOT NULL UNIQUE,
  phone_number       TEXT,
  full_name          TEXT           NOT NULL,
  avatar_url         TEXT,
  preferred_currency VARCHAR(5)     DEFAULT 'IDR',
  preferred_language VARCHAR(5)     DEFAULT 'en',
  daily_limit        NUMERIC(12, 2) DEFAULT 0     CHECK (daily_limit >= 0),
  weekly_limit       NUMERIC(12, 2) DEFAULT 0     CHECK (weekly_limit >= 0),
  monthly_limit      NUMERIC(12, 2) DEFAULT 0     CHECK (monthly_limit >= 0),
  daily_ai_limit     INT            DEFAULT 20    CHECK (daily_ai_limit >= 0),
  created_at         TIMESTAMPTZ    DEFAULT NOW() NOT NULL,
  updated_at         TIMESTAMPTZ    DEFAULT NOW() NOT NULL
);

DROP TRIGGER IF EXISTS trigger_users_updated_at ON users;

CREATE TRIGGER trigger_users_updated_at
  BEFORE UPDATE ON users
  FOR EACH ROW EXECUTE FUNCTION handle_updated_at();

-- saved_spots: user-registered locations used for geofence-triggered expense context
CREATE TABLE IF NOT EXISTS saved_spots (
  id                       UUID                   DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id                  UUID                   REFERENCES users(user_id) ON DELETE CASCADE NOT NULL,
  spot_name                TEXT                   NOT NULL,
  category                 expense_category_type  NOT NULL,
  default_payment_method   payment_method_type    DEFAULT 'QRIS',
  default_payment_provider TEXT,
  radius_meters            INT                    DEFAULT 75 CHECK (radius_meters BETWEEN 30 AND 300),
  address                  TEXT,
  location                 GEOGRAPHY(Point, 4326) NOT NULL,
  visit_count              INT                    DEFAULT 1,
  last_visited_at          TIMESTAMPTZ            DEFAULT NOW(),
  deleted_at               TIMESTAMPTZ            DEFAULT NULL,
  created_at               TIMESTAMPTZ            DEFAULT NOW() NOT NULL,
  updated_at               TIMESTAMPTZ            DEFAULT NOW() NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_saved_spots_location ON saved_spots
USING gist (location);

CREATE INDEX IF NOT EXISTS idx_saved_spots_user ON saved_spots
USING btree (user_id) WHERE deleted_at IS NULL;

DROP TRIGGER IF EXISTS trigger_saved_spots_updated_at ON saved_spots;

CREATE TRIGGER trigger_saved_spots_updated_at
  BEFORE UPDATE ON saved_spots
  FOR EACH ROW EXECUTE FUNCTION handle_updated_at();

-- transactions: financial expense records, optionally linked to a saved_spot
CREATE TABLE IF NOT EXISTS transactions (
  id                   UUID                   DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id              UUID                   REFERENCES users(user_id) ON DELETE CASCADE NOT NULL,
  spot_id              UUID                   REFERENCES saved_spots(id) ON DELETE SET NULL,
  amount               NUMERIC(12, 2)         NOT NULL CHECK (amount > 0),
  category             expense_category_type  NOT NULL,
  payment_method       payment_method_type    NOT NULL DEFAULT 'CASH',
  payment_provider     TEXT,
  notes                TEXT,
  receipt_url          TEXT,
  tags                 TEXT[]                 DEFAULT '{}',
  transaction_location GEOGRAPHY(Point, 4326),
  transaction_time     TIMESTAMPTZ            DEFAULT NOW(),
  deleted_at           TIMESTAMPTZ            DEFAULT NULL,
  created_at           TIMESTAMPTZ            DEFAULT NOW() NOT NULL,
  updated_at           TIMESTAMPTZ            DEFAULT NOW() NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_transactions_user_date ON transactions
USING btree (user_id, transaction_time) WHERE deleted_at IS NULL;

CREATE INDEX IF NOT EXISTS idx_transactions_category ON transactions
USING btree (user_id, category) WHERE deleted_at IS NULL;

DROP TRIGGER IF EXISTS trigger_transactions_updated_at ON transactions;

CREATE TRIGGER trigger_transactions_updated_at
  BEFORE UPDATE ON transactions
  FOR EACH ROW EXECUTE FUNCTION handle_updated_at();

-- ai_query_logs: append-only audit log for AI interactions, used for per-user rate limiting
CREATE TABLE IF NOT EXISTS ai_query_logs (
  id              UUID        DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id         UUID        REFERENCES users(user_id) ON DELETE CASCADE NOT NULL,
  prompt          TEXT        NOT NULL,
  response        TEXT        NOT NULL,
  tokens_used     INT         DEFAULT 0,
  is_out_of_scope BOOLEAN     DEFAULT FALSE,
  created_at      TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_ai_logs_user_date ON ai_query_logs
USING btree (user_id, created_at);
