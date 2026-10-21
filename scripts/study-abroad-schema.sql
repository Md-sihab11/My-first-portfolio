-- Study Abroad Research Hub schema
-- Run after setting DATABASE_URL:
--   psql "$DATABASE_URL" -f scripts/study-abroad-schema.sql
-- Or paste this file into your managed Postgres SQL editor.
--
-- The application never creates tables automatically. If the schema is
-- missing, the hub shows a setup notice and all write endpoints return 503.

CREATE TABLE IF NOT EXISTS study_abroad_countries (
  id text PRIMARY KEY,
  slug text NOT NULL UNIQUE,
  name text NOT NULL UNIQUE,
  flag text NOT NULL DEFAULT '',
  region text NOT NULL,
  overview text NOT NULL,
  location_summary text NOT NULL,
  info jsonb NOT NULL DEFAULT '[]'::jsonb,
  sources jsonb NOT NULL DEFAULT '[]'::jsonb,
  sample boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS study_abroad_cities (
  id text PRIMARY KEY,
  country_id text NOT NULL REFERENCES study_abroad_countries(id) ON DELETE CASCADE,
  name text NOT NULL,
  location_type text NOT NULL,
  summary text NOT NULL,
  campus_areas text NOT NULL DEFAULT '',
  nearby_cities text NOT NULL DEFAULT '',
  nearest_airport text NOT NULL DEFAULT '',
  public_transport text NOT NULL DEFAULT '',
  bus_train_metro text NOT NULL DEFAULT '',
  nearest_station text NOT NULL DEFAULT '',
  monthly_rent text NOT NULL DEFAULT '',
  food_cost text NOT NULL DEFAULT '',
  transport_cost text NOT NULL DEFAULT '',
  facilities text NOT NULL DEFAULT '',
  student_lifestyle text NOT NULL DEFAULT '',
  sources jsonb NOT NULL DEFAULT '[]'::jsonb,
  last_verified_at timestamptz,
  sample boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (country_id, name)
);

CREATE TABLE IF NOT EXISTS study_abroad_universities (
  id text PRIMARY KEY,
  country_id text NOT NULL REFERENCES study_abroad_countries(id) ON DELETE CASCADE,
  city_id text NOT NULL REFERENCES study_abroad_cities(id) ON DELETE RESTRICT,
  slug text NOT NULL,
  name text NOT NULL,
  short_name text NOT NULL DEFAULT '',
  logo_url text NOT NULL DEFAULT '',
  summary text NOT NULL,
  website text NOT NULL,
  address text NOT NULL,
  region text NOT NULL,
  campus_name text NOT NULL,
  campus_setting text NOT NULL,
  city_classification text NOT NULL,
  nearby_cities text NOT NULL DEFAULT '',
  nearest_airport text NOT NULL DEFAULT '',
  public_transport text NOT NULL DEFAULT '',
  courses text[] NOT NULL DEFAULT '{}',
  degree_levels text[] NOT NULL DEFAULT '{}',
  admission_requirements text NOT NULL DEFAULT '',
  gpa_requirements text NOT NULL DEFAULT '',
  english_requirements text NOT NULL DEFAULT '',
  study_gap_policy text NOT NULL DEFAULT '',
  intakes text NOT NULL DEFAULT '',
  application_deadlines text NOT NULL DEFAULT '',
  application_fee text NOT NULL DEFAULT '',
  tuition_fees text NOT NULL DEFAULT '',
  course_duration text NOT NULL DEFAULT '',
  required_documents text[] NOT NULL DEFAULT '{}',
  scholarships text NOT NULL DEFAULT '',
  application_portal text NOT NULL,
  admissions_contact text NOT NULL,
  dormitories text NOT NULL DEFAULT '',
  private_accommodation text NOT NULL DEFAULT '',
  estimated_rent text NOT NULL DEFAULT '',
  monthly_living_cost text NOT NULL DEFAULT '',
  food_cost text NOT NULL DEFAULT '',
  transport_cost text NOT NULL DEFAULT '',
  essential_facilities text NOT NULL DEFAULT '',
  public_transport_access text NOT NULL DEFAULT '',
  part_time_work text NOT NULL DEFAULT '',
  student_life text NOT NULL DEFAULT '',
  safety text NOT NULL DEFAULT '',
  climate text NOT NULL DEFAULT '',
  sources jsonb NOT NULL DEFAULT '[]'::jsonb,
  last_verified_at timestamptz,
  sample boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (country_id, slug),
  UNIQUE (country_id, name)
);

-- One-time, action-scoped authorization grants. The raw grant token is stored
-- only in an HttpOnly, SameSite=Strict cookie; the database stores its hash.
CREATE TABLE IF NOT EXISTS study_abroad_action_grants (
  id uuid PRIMARY KEY,
  token_hash text NOT NULL UNIQUE,
  scope text NOT NULL,
  expires_at timestamptz NOT NULL,
  used_at timestamptz,
  revoked_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- Durable rate-limit events. This replaces per-process memory so limits work
-- across serverless invocations and multiple instances.
CREATE TABLE IF NOT EXISTS study_abroad_rate_events (
  id uuid PRIMARY KEY,
  kind text NOT NULL,
  client_key text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE UNIQUE INDEX IF NOT EXISTS study_abroad_countries_name_lower_idx
  ON study_abroad_countries (lower(name));

CREATE UNIQUE INDEX IF NOT EXISTS study_abroad_cities_country_name_lower_idx
  ON study_abroad_cities (country_id, lower(name));

CREATE UNIQUE INDEX IF NOT EXISTS study_abroad_universities_country_name_lower_idx
  ON study_abroad_universities (country_id, lower(name));

CREATE INDEX IF NOT EXISTS study_abroad_cities_country_id_idx
  ON study_abroad_cities (country_id);

CREATE INDEX IF NOT EXISTS study_abroad_universities_country_id_idx
  ON study_abroad_universities (country_id);

CREATE INDEX IF NOT EXISTS study_abroad_universities_city_id_idx
  ON study_abroad_universities (city_id);

CREATE INDEX IF NOT EXISTS study_abroad_action_grants_expires_at_idx
  ON study_abroad_action_grants (expires_at);

CREATE INDEX IF NOT EXISTS study_abroad_rate_events_key_time_idx
  ON study_abroad_rate_events (kind, client_key, created_at DESC);

CREATE INDEX IF NOT EXISTS study_abroad_rate_events_time_idx
  ON study_abroad_rate_events (created_at);
