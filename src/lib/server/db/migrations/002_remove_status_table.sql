-- Migration 002: Remove status table, use CHECK constraint
-- This migration is for databases created before the schema change

-- Step 1: Add new status column with CHECK constraint to seeds table
-- Note: SQLite doesn't support ALTER TABLE ADD COLUMN with CHECK, so we need to recreate the table

-- Create new seeds table with CHECK constraint
CREATE TABLE seeds_new (
  id TEXT PRIMARY KEY,
  content TEXT NOT NULL,
  status TEXT DEFAULT 'planted' CHECK(status IN ('planted', 'sprouting', 'growing', 'tree')),
  growth_score REAL DEFAULT 0 CHECK(growth_score >= 0 AND growth_score <= 100),
  position_x REAL DEFAULT 0,
  position_y REAL DEFAULT 0,
  created_at INTEGER DEFAULT (unixepoch()) NOT NULL,
  updated_at INTEGER DEFAULT (unixepoch()) NOT NULL
);

-- Copy data from old seeds table
INSERT INTO seeds_new (id, content, status, growth_score, position_x, position_y, created_at, updated_at)
SELECT id, content, status_id, growth_score, position_x, position_y, created_at, updated_at
FROM seeds;

-- Drop old table and rename new one
DROP TABLE seeds;
ALTER TABLE seeds_new RENAME TO seeds;

-- Recreate index
CREATE INDEX idx_seeds_status ON seeds(status);
CREATE INDEX idx_seeds_created ON seeds(created_at);

-- Drop status lookup table (no longer needed)
DROP TABLE IF EXISTS status;

-- Note: This is a destructive migration that recreates the seeds table.
-- For production databases with data, consider a more careful migration approach.
