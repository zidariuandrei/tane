import { fail, redirect } from '@sveltejs/kit';
import { db } from '$lib/server/db';
import { getAvailableModels } from '$lib/server/models';
import { determinePlantType } from '$lib/server/seed-classifier';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	try {
		const seeds = db.query('SELECT * FROM seeds ORDER BY created_at DESC LIMIT 50').all() as Array<{
			id: string;
			content: string;
			status: string;
			created_at: number;
			plant_type: string;
			model: string;
		}>;
		const models = getAvailableModels();
		return { seeds, models };
	} catch (err) {
		console.error('Failed to load garden:', err);
		return { seeds: [] };
	}
};

export const actions = {
	plant: async ({ request }) => {
		const data = await request.formData();
		const idea = data.get('idea');
		// Default to 'gpt-4o' if not provided
		const model = (data.get('model') as string) || 'gpt-4o';

		if (!idea || typeof idea !== 'string' || idea.trim().length === 0) {
			return fail(400, { missing: true });
		}

		const id = crypto.randomUUID();
		const now = Date.now();
		const plantType = determinePlantType(idea.trim());

		try {
			// Using db.query with explicit column names
			// The migration script added 'model' to existing DBs
			db.query(
				'INSERT INTO seeds (id, content, status, created_at, plant_type, model) VALUES (?, ?, ?, ?, ?, ?)'
			).run(id, idea.trim(), 'pending', now, plantType, model);
		} catch (error) {
			console.error('Failed to plant seed:', error);
			// Fallback for DBs that might have failed migration (rare)
			try {
				db.query(
					'INSERT INTO seeds (id, content, status, created_at, plant_type) VALUES (?, ?, ?, ?, ?)'
				).run(id, idea.trim(), 'pending', now, plantType);
			} catch (e2) {
				console.error('Retry failed:', e2);
				return fail(500, { error: 'Failed to plant seed in the garden.' });
			}
		}

		redirect(303, `/seed/${id}`);
	},
} satisfies Actions;
