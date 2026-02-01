// Main seed entity representing startup ideas
export interface Seed {
	id: string;
	content: string;
	status: 'planted' | 'sprouting' | 'growing' | 'tree';
	growth_score: number;
	position_x: number;
	position_y: number;
	created_at: number;
	updated_at: number;
}

// Async research job tracking
export interface ResearchJob {
	id: string;
	seed_id: string;
	job_type: 'market' | 'competitor' | 'failure' | 'synthesis' | 'webfetch';
	status: 'pending' | 'running' | 'completed' | 'failed' | 'cancelled';
	result?: string;
	error?: string;
	created_at: number;
	started_at?: number;
	completed_at?: number;
}

// Research findings and data
export interface ResearchData {
	id: string;
	seed_id: string;
	data_type: 'market' | 'competitor' | 'failure' | 'trend' | 'insight';
	title?: string;
	content: string;
	source_url?: string;
	relevance_score: number;
	created_at: number;
}

// KV settings storage
export interface Setting {
	key: string;
	value: string;
	created_at: number;
	updated_at: number;
}
