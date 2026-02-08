import { db } from './src/lib/server/db';

console.log('Resetting failed seeds...');

// Find seeds with empty reports
const ghostReports = db.query("SELECT seed_id FROM reports WHERE content = '' OR content IS NULL").all() as { seed_id: string }[];

if (ghostReports.length > 0) {
    console.log(`Found ${ghostReports.length} ghost reports.`);
    for (const report of ghostReports) {
        console.log(`Resetting seed: ${report.seed_id}`);
        // Delete the empty report
        db.query("DELETE FROM reports WHERE seed_id = $id").run({ $id: report.seed_id });
        // Reset seed to pending
        db.query("UPDATE seeds SET status = 'pending' WHERE id = $id").run({ $id: report.seed_id });
    }
} else {
    console.log('No ghost reports found.');
}

// Also check for 'completed' seeds that have NO report at all
const orphans = db.query("SELECT id FROM seeds WHERE status = 'completed' AND id NOT IN (SELECT seed_id FROM reports)").all() as { id: string }[];
if (orphans.length > 0) {
    console.log(`Found ${orphans.length} orphan seeds (completed but no report).`);
    for (const seed of orphans) {
        console.log(`Resetting seed: ${seed.id}`);
        db.query("UPDATE seeds SET status = 'pending' WHERE id = $id").run({ $id: seed.id });
    }
}

console.log('Done.');
