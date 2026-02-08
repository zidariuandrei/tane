import { fail, redirect } from '@sveltejs/kit';
import { db } from '$lib/server/db';
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
		}>;
		return { seeds };
	} catch (err) {
		console.error('Failed to load garden:', err);
		return { seeds: [] };
	}
};

export const actions = {
	plant: async ({ request }) => {
		const data = await request.formData();
		const idea = data.get('idea');

		if (!idea || typeof idea !== 'string' || idea.trim().length === 0) {
			return fail(400, { missing: true });
		}

		const id = crypto.randomUUID();
		const now = Date.now();
		const plantType = determinePlantType(idea.trim());

		try {
			db.query('INSERT INTO seeds (id, content, status, created_at, plant_type) VALUES (?, ?, ?, ?, ?)').run(
				id,
				idea.trim(),
				'pending',
				now,
				plantType
			);
		} catch (error) {
			console.error('Failed to plant seed:', error);
			return fail(500, { error: 'Failed to plant seed in the garden.' });
		}

		redirect(303, `/seed/${id}`);
	},
} satisfies Actions;
