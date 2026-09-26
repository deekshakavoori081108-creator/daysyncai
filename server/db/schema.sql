-- DaySync AI Production PostgreSQL Schema

CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    name TEXT NOT NULL,
    timezone TEXT NOT NULL DEFAULT 'Asia/Kolkata',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS user_preferences (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL UNIQUE REFERENCES users(id) ON DELETE CASCADE,
    wake_time TIME,
    typical_sleep_minutes INTEGER DEFAULT 420,
    work_or_study TEXT,
    destination TEXT,
    typical_commute_minutes INTEGER DEFAULT 30,
    preferred_departure_buffer_minutes INTEGER NOT NULL DEFAULT 15,
    morning_style TEXT NOT NULL DEFAULT 'balanced',
    onboarding_completed BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS routine_tasks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    category TEXT NOT NULL,
    duration_minutes INTEGER NOT NULL,
    priority TEXT NOT NULL DEFAULT 'MEDIUM',
    flexibility TEXT NOT NULL DEFAULT 'FLEXIBLE',
    ai_behavior TEXT NOT NULL DEFAULT 'COMPRESSIBLE',
    preferred_start_time TIME,
    active_days INTEGER[] NOT NULL DEFAULT '{1,2,3,4,5}',
    sort_order INTEGER NOT NULL DEFAULT 0,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS calendar_events (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    external_id TEXT,
    title TEXT NOT NULL,
    starts_at TIMESTAMPTZ NOT NULL,
    ends_at TIMESTAMPTZ,
    location TEXT,
    importance TEXT NOT NULL DEFAULT 'MEDIUM',
    meeting_type TEXT NOT NULL DEFAULT 'IN_PERSON',
    provider TEXT NOT NULL DEFAULT 'demo',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS morning_sessions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    session_date DATE NOT NULL,
    planned_wake_time TIMESTAMPTZ,
    actual_wake_time TIMESTAMPTZ,
    sleep_minutes INTEGER,
    mode TEXT NOT NULL,
    available_minutes INTEGER,
    completion_percentage NUMERIC(5,2) DEFAULT 0,
    departure_target TIMESTAMPTZ,
    departure_status TEXT,
    weather_context JSONB,
    traffic_context JSONB,
    calendar_context JSONB,
    ai_summary TEXT,
    ai_advisories JSONB DEFAULT '[]',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE(user_id, session_date)
);

CREATE TABLE IF NOT EXISTS morning_tasks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    session_id UUID NOT NULL REFERENCES morning_sessions(id) ON DELETE CASCADE,
    routine_task_id UUID REFERENCES routine_tasks(id) ON DELETE SET NULL,
    name TEXT NOT NULL,
    category TEXT NOT NULL,
    priority TEXT NOT NULL,
    planned_duration_minutes INTEGER NOT NULL,
    actual_duration_minutes INTEGER,
    planned_start_at TIMESTAMPTZ,
    planned_end_at TIMESTAMPTZ,
    actual_start_at TIMESTAMPTZ,
    actual_end_at TIMESTAMPTZ,
    status TEXT NOT NULL DEFAULT 'PENDING',
    ai_reason TEXT,
    sort_order INTEGER NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS behavior_events (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    session_id UUID REFERENCES morning_sessions(id) ON DELETE CASCADE,
    task_id UUID REFERENCES morning_tasks(id) ON DELETE CASCADE,
    event_type TEXT NOT NULL,
    event_data JSONB,
    occurred_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS morning_dna (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL UNIQUE REFERENCES users(id) ON DELETE CASCADE,
    avg_prep_minutes NUMERIC(8,2) DEFAULT 0,
    avg_wake_delay_minutes NUMERIC(8,2) DEFAULT 0,
    avg_completion_percentage NUMERIC(5,2) DEFAULT 0,
    average_departure_buffer_minutes NUMERIC(8,2) DEFAULT 0,
    normal_mode_percentage NUMERIC(5,2) DEFAULT 0,
    rush_mode_percentage NUMERIC(5,2) DEFAULT 0,
    rescue_mode_percentage NUMERIC(5,2) DEFAULT 0,
    frequently_skipped_tasks JSONB DEFAULT '[]',
    reliable_tasks JSONB DEFAULT '[]',
    behavioral_insights JSONB DEFAULT '[]',
    last_calculated_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Indexes for performance & query speed
CREATE INDEX IF NOT EXISTS idx_routine_tasks_user_id ON routine_tasks(user_id);
CREATE INDEX IF NOT EXISTS idx_calendar_events_user_starts ON calendar_events(user_id, starts_at);
CREATE INDEX IF NOT EXISTS idx_morning_sessions_user_date ON morning_sessions(user_id, session_date);
CREATE INDEX IF NOT EXISTS idx_morning_tasks_session ON morning_tasks(session_id);
CREATE INDEX IF NOT EXISTS idx_behavior_events_user_time ON behavior_events(user_id, occurred_at);
