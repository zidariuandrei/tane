import { createOpencodeClient } from '@opencode-ai/sdk';
import type { Seed } from '$lib/types';

interface RetryConfig {
	maxAttempts: number;
	baseDelayMs: number;
	maxDelayMs: number;
}

const defaultRetryConfig: RetryConfig = {
	maxAttempts: 3,
	baseDelayMs: 1000,
	maxDelayMs: 8000,
};

export class TaneOpenCodeClient {
	private client;
	private baseUrl: string;
	private retryConfig: RetryConfig;

	constructor(baseUrl = 'http://localhost:4096', retryConfig: Partial<RetryConfig> = {}) {
		this.baseUrl = baseUrl;
		this.retryConfig = { ...defaultRetryConfig, ...retryConfig };
		this.client = createOpencodeClient({ baseUrl });
	}

	private async withRetry<T>(operation: () => Promise<T>, context: string): Promise<T> {
		let lastError: Error | undefined;

		for (let attempt = 1; attempt <= this.retryConfig.maxAttempts; attempt++) {
			try {
				return await operation();
			} catch (error) {
				lastError = error instanceof Error ? error : new Error(String(error));

				if (attempt === this.retryConfig.maxAttempts) {
					console.error(
						`[OpenCode] ${context} failed after ${attempt} attempts:`,
						lastError.message
					);
					throw lastError;
				}

				const delay = Math.min(
					this.retryConfig.baseDelayMs * 2 ** (attempt - 1),
					this.retryConfig.maxDelayMs
				);

				console.warn(
					`[OpenCode] ${context} failed (attempt ${attempt}/${this.retryConfig.maxAttempts}), retrying in ${delay}ms...`
				);
				await new Promise((resolve) => setTimeout(resolve, delay));
			}
		}

		throw lastError;
	}

	async health() {
		return this.withRetry(async () => {
			const result = await this.client.config.get();
			return result.data;
		}, 'Health check');
	}

	async getAvailableProviders() {
		return this.withRetry(async () => {
			const result = await this.client.config.providers();
			const data = result.data;
			if (!data) {
				return { providers: [], defaults: {} };
			}
			return {
				providers: data.providers,
				defaults: data.default,
			};
		}, 'Get providers');
	}

	async createResearchSession(seed: Seed) {
		return this.withRetry(async () => {
			const result = await this.client.session.create({
				body: {
					title: `Research: ${seed.content.substring(0, 50)}...`,
				},
			});
			return result.data;
		}, 'Create research session');
	}

	async generateSearchQueries(seedContent: string, sessionId: string) {
		return this.withRetry(async () => {
			const prompt = `For this startup idea: "${seedContent}"

Generate 3 specific web search queries to find:
1. Market size data (TAM/SAM/SOM)
2. Direct and indirect competitors
3. Similar startups that failed and why they failed

Return only the search queries, one per line, no numbering or bullets.`;

			const result = await this.client.session.prompt({
				path: { id: sessionId },
				body: {
					parts: [{ type: 'text', text: prompt }],
				},
			});

			const data = result.data;
			if (!data) {
				return [];
			}

			// Parse text parts to extract queries
			const text = data.parts
				.filter((p) => p.type === 'text')
				.map((p) => p.text)
				.join('\n');

			return text.split('\n').filter((q) => q.trim().length > 0);
		}, 'Generate search queries');
	}

	async fetchAndAnalyze(url: string, context: string, sessionId: string) {
		return this.withRetry(async () => {
			const prompt = `Fetch the content from ${url} and extract relevant information about: "${context}"

Provide a structured analysis with:
- Key findings
- Relevant data points
- Source credibility assessment`;

			const result = await this.client.session.prompt({
				path: { id: sessionId },
				body: {
					parts: [{ type: 'text', text: prompt }],
					tools: { webfetch: true },
				},
			});

			return result.data?.parts ?? [];
		}, 'Fetch and analyze');
	}

	async synthesizeResearch(seedContent: string, researchData: unknown[], sessionId: string) {
		return this.withRetry(async () => {
			const prompt = `Based on the following research data about "${seedContent}",

${JSON.stringify(researchData, null, 2)}

Synthesize this into a structured dossier with:
1. Executive Summary
2. Market Analysis (TAM/SAM/SOM if available)
3. Competitor Landscape
4. Failure Case Studies & Lessons
5. Key Insights & Recommendations
6. Data Sources

Format as markdown.`;

			const result = await this.client.session.prompt({
				path: { id: sessionId },
				body: {
					parts: [{ type: 'text', text: prompt }],
				},
			});

			const data = result.data;
			if (!data) {
				return '';
			}

			return data.parts
				.filter((p) => p.type === 'text')
				.map((p) => p.text)
				.join('\n');
		}, 'Synthesize research');
	}

	/**
	 * Research a seed idea using webfetch tool
	 * Single call that generates queries, searches web, and synthesizes findings
	 */
	async researchSeed(seedContent: string, sessionId: string): Promise<string> {
		return this.withRetry(async () => {
			const prompt = `Research this startup idea: "${seedContent}"

Use webfetch to search for and analyze:
1. Market size, TAM/SAM/SOM data, and growth trends
2. Direct and indirect competitors (2-4 key players)
3. Similar startups that failed, and why they failed
4. Key opportunities and risks

For each section, include:
- Summary of findings
- Specific data points with numbers where available
- Source URLs you fetched
- Confidence level (high/medium/low) based on source quality

Format as markdown with these sections:
## Market Analysis
## Competitor Landscape
## Failure Case Studies
## Key Insights
## Sources

Be thorough but concise. Include actual URLs from webfetch results.`;

			console.log(`[OpenCode] Starting webfetch research for session ${sessionId}`);
			const startTime = Date.now();

			const result = await this.client.session.prompt({
				path: { id: sessionId },
				body: {
					parts: [{ type: 'text', text: prompt }],
					tools: { webfetch: true },
				},
			});

			const duration = Date.now() - startTime;
			console.log(`[OpenCode] Research completed in ${duration}ms for session ${sessionId}`);

			const data = result.data;
			if (!data) {
				throw new Error('OpenCode returned empty response');
			}

			const markdown = data.parts
				.filter((p) => p.type === 'text')
				.map((p) => p.text)
				.join('\n\n');

			return markdown;
		}, 'Research seed with webfetch');
	}
}
