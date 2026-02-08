import { Gardener } from './src/lib/server/agent/gardener';
import { db } from './src/lib/server/db';

const seedId = 'manual-test-seed';
const content = 'AI-powered gardening assistant';

// 1. Insert seed
db.query(`
    INSERT OR REPLACE INTO seeds (id, content, status, created_at)
    VALUES ($id, $content, 'pending', $created_at)
`).run({
    $id: seedId,
    $content: content,
    $created_at: Date.now()
});

console.log(`Inserted seed: ${seedId}`);

// 2. Run Gardener
await Gardener.grow(seedId);

// 3. Check result
const report = db.query('SELECT * FROM reports WHERE seed_id = $id').get({ $id: seedId });
console.log('Report generated:', report);
