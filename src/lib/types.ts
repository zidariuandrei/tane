export interface Seed {
	id: string;
	content: string;
	status: 'pending' | 'processing' | 'completed' | 'failed';
	created_at: number;
}

export interface Report {
	seed_id: string;
	content: string;
	logs: string[]; // JSON parsed
	updated_at: number;
}
