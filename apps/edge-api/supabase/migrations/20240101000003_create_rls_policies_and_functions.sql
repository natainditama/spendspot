-- =============================================================================
-- Migration: 20240101000003_create_rls_policies_and_functions
-- Description: Enable RLS on all tables, define per-user access policies, and create the AI quota function.
-- =============================================================================

-- Row Level Security: (SELECT auth.uid()) subquery is used to cache the auth UID within the query plan
ALTER TABLE users         ENABLE ROW LEVEL SECURITY;

ALTER TABLE saved_spots   ENABLE ROW LEVEL SECURITY;

ALTER TABLE transactions  ENABLE ROW LEVEL SECURITY;

ALTER TABLE ai_query_logs ENABLE ROW LEVEL SECURITY;

-- users: full CRUD access restricted to the authenticated user's own profile row
DROP POLICY IF EXISTS "users: owner full access" ON users;

CREATE POLICY "users: owner full access" ON users
  FOR ALL USING ((SELECT auth.uid()) = user_id);

-- saved_spots: full CRUD access restricted to the authenticated user's own spots
DROP POLICY IF EXISTS "saved_spots: owner full access" ON saved_spots;

CREATE POLICY "saved_spots: owner full access" ON saved_spots
  FOR ALL USING ((SELECT auth.uid()) = user_id);

-- transactions: full CRUD access restricted to the authenticated user's own transactions
DROP POLICY IF EXISTS "transactions: owner full access" ON transactions;

CREATE POLICY "transactions: owner full access" ON transactions
  FOR ALL USING ((SELECT auth.uid()) = user_id);

-- ai_query_logs: read-only; all inserts are performed exclusively via the SECURITY DEFINER function below
DROP POLICY IF EXISTS "ai_query_logs: owner read only" ON ai_query_logs;

CREATE POLICY "ai_query_logs: owner read only" ON ai_query_logs
  FOR SELECT USING ((SELECT auth.uid()) = user_id);

-- check_and_record_ai_query(): atomically checks the user's remaining daily quota then records the query as SECURITY DEFINER
CREATE OR REPLACE FUNCTION check_and_record_ai_query(
  p_user_id      UUID,
  p_prompt       TEXT,
  p_response     TEXT,
  p_tokens       INT,
  p_out_of_scope BOOLEAN
)
RETURNS JSONB AS $$
DECLARE
  v_today_count INT;
  v_limit       INT;

BEGIN
  SELECT daily_ai_limit INTO v_limit
  FROM users
  WHERE user_id = p_user_id;

-- Default to 20 queries per day when the user row is not yet present
  IF v_limit IS NULL THEN
    v_limit := 20;
  END IF;

  SELECT COUNT(*) INTO v_today_count
  FROM ai_query_logs
  WHERE user_id  = p_user_id
    AND created_at >= CURRENT_DATE;

  IF v_today_count >= v_limit THEN
    RETURN jsonb_build_object(
      'allowed', FALSE,
'message',
'Daily AI quota of ' || v_limit || ' queries has been reached. Please try again tomorrow.'
    );
  END IF;

  INSERT INTO ai_query_logs (user_id, prompt, response, tokens_used, is_out_of_scope)
  VALUES (p_user_id, p_prompt, p_response, p_tokens, p_out_of_scope);

  RETURN jsonb_build_object(
    'allowed',         TRUE,
    'remaining_quota', v_limit - (v_today_count + 1)
  );
END;

$$ LANGUAGE plpgsql SECURITY DEFINER;
