import { json, error } from '@sveltejs/kit';
import { Database } from 'bun:sqlite';
import { randomUUID } from 'node:crypto';
import { TaneOpenCodeClient } from '$lib/server/opencode/client';
import type { RequestEvent } from '@sveltejs/kit';

const db = new Database('tane.db');
const opencodeClient = new TaneOpenCodeClient();

// POST /api/seeds/[id]/research - Start research
export async function POST(event: RequestEvent) {
	const { id } = event.params;

	// Verify seed exists
	const seed = db.query('SELECT * FROM seeds WHERE id = ?').get(id) as {
		id: string;
		content: string;
	} | null;

	if (!seed) {
		throw error(404, 'Seed not found');
	}

	// Check if research is already in progress
	const existingJob = db
		.query(
			"SELECT * FROM research_jobs WHERE seed_id = ? AND status IN ('pending', 'running') AND job_type = 'webfetch'"
		)
		.get(id) as { id: string; status: string } | null;

	if (existingJob) {
		return json(
			{
				jobId: existingJob.id,
				status: existingJob.status,
				message: 'Research already in progress',
			},
			{ status: 200 }
		);
	}

	// Create OpenCode session
	let sessionId: string;
	try {
		const session = await opencodeClient.createResearchSession({
			id: seed.id,
			content: seed.content,
			status: 'planted',
			growth_score: 0,
			position_x: 0,
			position_y: 0,
			created_at: Date.now(),
			updated_at: Date.now(),
		});
		sessionId = session?.id || randomUUID();
	} catch (_err) {
		console.error('[Research] Failed to create OpenCode session:', _err);
		throw error(503, 'OpenCode service unavailable');
	}

	// Create research job record
	const jobId = randomUUID();
	db.run(
		'INSERT INTO research_jobs (id, seed_id, job_type, status, session_id, opencode_session_id, created_at) VALUES (?, ?, ?, ?, ?, ?, ?)',
		[jobId, id, 'webfetch', 'pending', sessionId, sessionId, Math.floor(Date.now() / 1000)]
	);

	// Start background research (don't await)
	startResearchJob(jobId, id, seed.content, sessionId).catch((err) => {
		console.error(`[Research] Background job ${jobId} failed:`, err);
	});

	return json(
		{
			jobId,
			status: 'pending',
			message: 'Research started',
		},
		{ status: 202 }
	);
}

// GET /api/seeds/[id]/research - Check research status
export async function GET(event: RequestEvent) {
	const { id } = event.params;

	// Get latest research job for this seed
	const job = db
		.query(
			'SELECT * FROM research_jobs WHERE seed_id = ? AND job_type = ? ORDER BY created_at DESC LIMIT 1'
		)
		.get(id, 'webfetch') as {
		id: string;
		status: string;
		result?: string;
		error?: string;
		created_at: number;
		started_at?: number;
		completed_at?: number;
	} | null;

	if (!job) {
		return json({ status: 'none', message: 'No research found for this seed' });
	}

	// Get research data if completed
	let researchData: Array<{
		data_type: string;
		content: string;
	}> = [];
	if (job.status === 'completed') {
		researchData = db
			.query(
				'SELECT data_type, content FROM research_data WHERE seed_id = ? ORDER BY created_at DESC'
			)
			.all(id) as Array<{ data_type: string; content: string }>;
	}

	return json({
		jobId: job.id,
		status: job.status,
		result: job.result,
		error: job.error,
		researchData: researchData.length > 0 ? researchData : undefined,
		timestamps: {
			created: job.created_at,
			started: job.started_at,
			completed: job.completed_at,
		},
	});
}

// Background research job
async function startResearchJob(jobId: string, seedId: string, content: string, sessionId: string) {
	console.log(`[Research] Starting job ${jobId} for seed ${seedId}`);

	// Update job status to running
	db.run("UPDATE research_jobs SET status = 'running', started_at = ? WHERE id = ?", [
		Math.floor(Date.now() / 1000),
		jobId,
	]);

	try {
		// Perform research using OpenCode webfetch
		const researchMarkdown = await opencodeClient.researchSeed(content, sessionId);

		// Store research result
		db.run(
			'INSERT INTO research_data (id, seed_id, data_type, content, created_at) VALUES (?, ?, ?, ?, ?)',
			[randomUUID(), seedId, 'webfetch', researchMarkdown, Math.floor(Date.now() / 1000)]
		);

		// Update job as completed
		db.run(
			"UPDATE research_jobs SET status = 'completed', result = ?, completed_at = ? WHERE id = ?",
			[researchMarkdown, Math.floor(Date.now() / 1000), jobId]
		);

		// Update seed status from 'planted' to 'sprouting'
		db.run(
			"UPDATE seeds SET status = 'sprouting', updated_at = ? WHERE id = ? AND status = 'planted'",
			[Math.floor(Date.now() / 1000), seedId]
		);

		console.log(`[Research] Job ${jobId} completed successfully`);
	} catch (err) {
		const errorMessage = err instanceof Error ? err.message : String(err);

		// Update job as failed
		db.run("UPDATE research_jobs SET status = 'failed', error = ?, completed_at = ? WHERE id = ?", [
			errorMessage,
			Math.floor(Date.now() / 1000),
			jobId,
		]);

		console.error(`[Research] Job ${jobId} failed:`, errorMessage);
		throw err;
	}
}
