-- =============================================================================
-- Migration: 20240101000001_create_extensions_and_functions
-- Description: Enable PostGIS and define shared trigger functions used by all tables.
-- =============================================================================

-- PostGIS: required for GEOGRAPHY column type and spatial index support
CREATE EXTENSION IF NOT EXISTS postgis;

-- handle_updated_at(): trigger function that stamps updated_at with the current time on every row update
CREATE OR REPLACE FUNCTION handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;

$$ LANGUAGE plpgsql;
