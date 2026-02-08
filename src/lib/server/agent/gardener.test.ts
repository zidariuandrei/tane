import { describe, it, expect, beforeAll, afterAll, mock } from 'bun:test';
import { Database } from 'bun:sqlite';

// Mock the DB module to use an in-memory database for tests
// This ensures we don't touch the real 'tane.sqlite' and have isolation
mock.module('../db', () => {
	const testDb = new Database(':memory:');
	testDb.query('PRAGMA journal_mode = WAL;').run();
	
	testDb.run(`
		CREATE TABLE IF NOT EXISTS seeds (
			id TEXT PRIMARY KEY,
			content TEXT NOT NULL,
			status TEXT NOT NULL CHECK(status IN ('pending', 'processing', 'completed', 'failed')),
			created_at INTEGER NOT NULL
		);
	`);

	testDb.run(`
		CREATE TABLE IF NOT EXISTS reports (
			seed_id TEXT PRIMARY KEY REFERENCES seeds(id),
			content TEXT NOT NULL,
			logs TEXT,
			updated_at INTEGER NOT NULL
		);
	`);
	
	return {
		db: testDb
	};
});

// Import the code under test AFTER mocking
import { Gardener } from './gardener';
import { db } from '../db';

describe('Gardener (Business Logic)', () => {
	// Reset DB state before each test if needed, or just insert new unique IDs
	
	it('should grow a seed into a report', async () => {
		// 1. Arrange: Plant a seed
		const seedId = 'test-seed-1';
		const content = 'Uber for Dog Walking';
		
		db.query(`
			INSERT INTO seeds (id, content, status, created_at)
			VALUES ($id, $content, 'pending', $created_at)
		`).run({
			$id: seedId,
			$content: content,
			$created_at: Date.now()
		});

		// 2. Act: Grow the seed
		// We are testing the core business logic: "Does calling grow() result in a report?"
		await Gardener.grow(seedId);

		// 3. Assert: Verify the outcome (Business Value)
		
		// Check Status Update
		const updatedSeed = db.query('SELECT status FROM seeds WHERE id = $id').get({ $id: seedId }) as { status: string };
		expect(updatedSeed.status).toBe('completed');

		// Check Report Generation
		const report = db.query('SELECT content FROM reports WHERE seed_id = $id').get({ $id: seedId }) as { content: string };
		expect(report).toBeDefined();
		expect(report.content).toContain('Growth Report');
		expect(report.content).toContain(content); // Should mention the topic
		expect(report.content).toContain('Market Analysis'); // Should have the sections
	});

	it('should handle missing seeds gracefully', async () => {
		// Business Logic: If a seed doesn't exist, it shouldn't crash the worker
		const result = await Gardener.grow('non-existent-id');
		expect(result).toBeUndefined(); // Or however it handles it, just ensure no throw
	});

	it('should reflect research content in the report', async () => {
		// Test that the "Research" actually happened and influenced the output
		const seedId = 'test-seed-risk';
		const content = 'High risk venture';

		db.query(`
			INSERT INTO seeds (id, content, status, created_at)
			VALUES ($id, $content, 'pending', $created_at)
		`).run({
			$id: seedId,
			$content: content,
			$created_at: Date.now()
		});

		await Gardener.grow(seedId);

		const report = db.query('SELECT content FROM reports WHERE seed_id = $id').get({ $id: seedId }) as { content: string };
		
		// The mock tool returns specific risk info for "risk" queries
		// This verifies the agent actually "used" the tool data
		expect(report.content).toContain('Regulatory Challenges'); 
	});
});
