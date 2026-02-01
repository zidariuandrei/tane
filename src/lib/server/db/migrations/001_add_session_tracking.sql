-- Migration 001: Add session tracking to research_jobs
-- For existing databases that need to add new columns

ALTER TABLE research_jobs ADD COLUMN session_id TEXT;
ALTER TABLE research_jobs ADD COLUMN opencode_session_id TEXT;

-- Add 'webfetch' job type to existing enum (SQLite doesn't support ALTER TABLE for CHECK constraints)
-- For new databases, this is handled in init.ts

-- Note: For existing databases, you'll need to recreate the table to add 'webfetch' to the job_type CHECK constraint
-- Or just use 'synthesis' type for webfetch jobs as a workaround
