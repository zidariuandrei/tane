import { error, redirect } from '@sveltejs/kit';
import { db } from '$lib/server/db';
import type { PageServerLoad, Actions } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	const { id } = params;

	try {
		const seed = db.query('SELECT * FROM seeds WHERE id = $id').get({ $id: id }) as {
			id: string;
			content: string;
			status: string;
			plant_type: string;
			created_at: number;
		} | null;

		if (!seed) {
			throw error(404, 'Seed not found');
		}

		if (seed.status === 'completed') {
			throw redirect(303, `/report/${id}`);
		}

		const report = db.query('SELECT * FROM reports WHERE seed_id = $id').get({ $id: id }) as {
			content: string;
			logs: string;
			updated_at: number;
		} | null;

		return {
			seed,
			report
		};
	} catch (err) {
		console.error('Database error:', err);
		// Rethrow if it's already a SvelteKit error (like 404)
		if ((err as any)?.status === 404) throw err;
		throw error(500, 'Internal Server Error');
	}
};

export const actions: Actions = {
	delete: async ({ params }) => {
		const { id } = params;
		try {
			// Delete report first (manual cascade)
			db.query('DELETE FROM reports WHERE seed_id = $id').run({ $id: id });
			// Delete seed
			db.query('DELETE FROM seeds WHERE id = $id').run({ $id: id });
		} catch (err) {
			console.error('Delete error:', err);
			return error(500, 'Failed to prune seed');
		}
		
		throw redirect(303, '/');
	}
};
