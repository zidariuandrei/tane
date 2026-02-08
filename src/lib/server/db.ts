import { Database } from 'bun:sqlite';

const db = new Database('tane.sqlite', { create: true });

// Enable WAL mode for better concurrency
db.query('PRAGMA journal_mode = WAL;').run();

// Create tables
db.run(`
  CREATE TABLE IF NOT EXISTS seeds (
    id TEXT PRIMARY KEY,
    content TEXT NOT NULL,
    status TEXT NOT NULL CHECK(status IN ('pending', 'processing', 'completed', 'failed')),
    created_at INTEGER NOT NULL,
    plant_type TEXT NOT NULL DEFAULT 'pine' CHECK(plant_type IN ('pine', 'sakura', 'bamboo', 'fern', 'oak'))
  );
`);

db.run(`
  CREATE TABLE IF NOT EXISTS reports (
    seed_id TEXT PRIMARY KEY REFERENCES seeds(id),
    content TEXT NOT NULL,
    logs TEXT,
    updated_at INTEGER NOT NULL
  );
`);

export { db };
