import { Database } from 'bun:sqlite';

const schema = `
-- Status lookup table
CREATE TABLE IF NOT EXISTS status (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL UNIQUE
);

-- Seed statuses
INSERT OR IGNORE INTO status (id, name) VALUES 
  ('planted', 'Planted'),
  ('sprouting', 'Sprouting'),
  ('growing', 'Growing'),
  ('tree', 'Tree');

-- Main seeds table
CREATE TABLE IF NOT EXISTS seeds (
  id TEXT PRIMARY KEY,
  content TEXT NOT NULL,
  status_id TEXT DEFAULT 'planted' REFERENCES status(id),
  growth_score REAL DEFAULT 0 CHECK(growth_score >= 0 AND growth_score <= 100),
  position_x REAL DEFAULT 0,
  position_y REAL DEFAULT 0,
  created_at INTEGER DEFAULT (unixepoch()) NOT NULL,
  updated_at INTEGER DEFAULT (unixepoch()) NOT NULL
);

-- Research jobs for async processing
CREATE TABLE IF NOT EXISTS research_jobs (
  id TEXT PRIMARY KEY,
  seed_id TEXT NOT NULL REFERENCES seeds(id) ON DELETE CASCADE,
  job_type TEXT NOT NULL CHECK(job_type IN ('market', 'competitor', 'failure', 'synthesis')),
  status TEXT NOT NULL DEFAULT 'pending' CHECK(status IN ('pending', 'running', 'completed', 'failed', 'cancelled')),
  result TEXT,
  error TEXT,
  created_at INTEGER DEFAULT (unixepoch()) NOT NULL,
  started_at INTEGER,
  completed_at INTEGER
);

-- Research data storage
CREATE TABLE IF NOT EXISTS research_data (
  id TEXT PRIMARY KEY,
  seed_id TEXT NOT NULL REFERENCES seeds(id) ON DELETE CASCADE,
  data_type TEXT NOT NULL CHECK(data_type IN ('market', 'competitor', 'failure', 'trend', 'insight')),
  title TEXT,
  content TEXT NOT NULL,
  source_url TEXT,
  relevance_score REAL DEFAULT 0 CHECK(relevance_score >= 0 AND relevance_score <= 100),
  created_at INTEGER DEFAULT (unixepoch()) NOT NULL
);

-- KV settings table
CREATE TABLE IF NOT EXISTS settings (
  key TEXT PRIMARY KEY,
  value TEXT NOT NULL,
  created_at INTEGER DEFAULT (unixepoch()) NOT NULL,
  updated_at INTEGER DEFAULT (unixepoch()) NOT NULL
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_seeds_status ON seeds(status_id);
CREATE INDEX IF NOT EXISTS idx_seeds_created ON seeds(created_at);
CREATE INDEX IF NOT EXISTS idx_research_jobs_seed ON research_jobs(seed_id);
CREATE INDEX IF NOT EXISTS idx_research_jobs_status ON research_jobs(status);
CREATE INDEX IF NOT EXISTS idx_research_data_seed ON research_data(seed_id);
CREATE INDEX IF NOT EXISTS idx_research_data_type ON research_data(data_type);

-- Insert default settings
INSERT OR IGNORE INTO settings (key, value) VALUES 
  ('opencode_url', 'http://localhost:4096'),
  ('research_depth', 'standard'),
  ('auto_research', 'true'),
  ('theme', 'forest');
`;

const db = new Database('tane.db');
db.exec(schema);

console.log('✓ Database initialized successfully');
console.log('  - status table created (with seed statuses)');
console.log('  - seeds table created');
console.log('  - research_jobs table created');
console.log('  - research_data table created');
console.log('  - settings table created');
console.log('  - indexes created');

db.close();
