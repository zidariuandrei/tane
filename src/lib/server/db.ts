let db: any;

// Use a dynamic import wrapped in a condition to prevent build-time crashes in Node
if (typeof Bun !== 'undefined') {
    // We use a variable to prevent static analysis from trying to resolve 'bun:sqlite'
    const sqliteModule = 'bun:sqlite';
    const { Database } = await import(sqliteModule);
    
    db = new Database('tane.sqlite', { create: true });

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
} else {
    // Mock implementation for build time (Node.js environment)
    const noop = () => ({ get: () => null, all: () => [], run: () => {} });
    db = {
        query: noop,
        prepare: noop,
        run: () => {},
        transaction: (fn: any) => fn,
    };
    console.warn('⚠️  Database mocked (Non-Bun environment detected). App functionality will be disabled.');
}

export { db };
