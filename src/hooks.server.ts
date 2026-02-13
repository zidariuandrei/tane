import { Gardener } from '$lib/server/agent/gardener';
import { db } from '$lib/server/db';

let _interval: ReturnType<typeof setInterval>;

export async function handle({ event, resolve }) {
	return await resolve(event);
}

// Simple background worker loop
// This runs once when the server starts
if (typeof setInterval !== 'undefined') {
	console.log('🌱 Tane Nursery is open.');

	_interval = setInterval(async () => {
		try {
			// Find ONE pending seed
			const seed = db.query("SELECT * FROM seeds WHERE status = 'pending' LIMIT 1").get() as {
				id: string;
			} | null;

			if (seed) {
				console.log(`🌿 Nursery: Found pending seed ${seed.id}. Calling Gardener...`);
				// Run in background (do not await) so the interval keeps ticking
				Gardener.grow(seed.id).catch((err) => {
					console.error('Failed to grow seed:', err);
				});
			}
		} catch (error) {
			console.error('Nursery error:', error);
		}
	}, 2000); // Check every 2 seconds
}
