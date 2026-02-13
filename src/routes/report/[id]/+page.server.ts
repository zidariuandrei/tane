import { error, redirect } from '@sveltejs/kit';
import { db } from '$lib/server/db';

export async function load({ params }) {
	const seedId = params.id;

	// Fetch seed details
	const seed = db.query('SELECT * FROM seeds WHERE id = $id').get({ $id: seedId }) as
		| {
				id: string;
				content: string;
				status: string;
				plant_type: string;
				created_at: number;
		  }
		| undefined;

	if (!seed) {
		throw error(404, 'Seed not found');
	}

	if (seed.status !== 'completed' && seed.status !== 'failed') {
		throw redirect(303, `/seed/${seedId}`);
	}

	// Fetch report if it exists
	const report = db.query('SELECT * FROM reports WHERE seed_id = $id').get({ $id: seedId }) as
		| {
				content: string;
				updated_at: number;
				logs: string;
		  }
		| undefined;

	return {
		seed,
		report,
	};
}

export const actions = {
	delete: async ({ params }) => {
		const seedId = params.id;

		// Delete report first (foreign key constraint usually handles this if cascading, but let's be safe)
		db.query('DELETE FROM reports WHERE seed_id = $id').run({ $id: seedId });

		// Delete seed
		db.query('DELETE FROM seeds WHERE id = $id').run({ $id: seedId });

		throw redirect(303, '/');
	},

	regenerate: async ({ params }) => {
		const seedId = params.id;

		// Delete existing report
		db.query('DELETE FROM reports WHERE seed_id = $id').run({ $id: seedId });

		// Update seed status to 'pending' to trigger the Gardener
		db.query("UPDATE seeds SET status = 'pending' WHERE id = $id").run({ $id: seedId });

		// Redirect back to the nursery view
		throw redirect(303, `/seed/${seedId}`);
	},
};
