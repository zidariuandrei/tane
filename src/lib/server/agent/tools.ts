import { Type } from "@sinclair/typebox";
import type { ToolDefinition } from "@mariozechner/pi-coding-agent";

// Get SearXNG URL from env or default to the dev container service name
// In Docker Compose, the service name is 'searxng', so http://searxng:8080 works.
// Outside Docker (local dev), it might be http://localhost:8080.
const SEARXNG_URL = process.env.SEARXNG_URL || 'http://searxng:8080';

export const webSearchTool: ToolDefinition = {
	name: 'web_search',
	label: 'Web Search',
	description: 'Search the web for information about a topic using SearXNG.',
	parameters: Type.Object({
		query: Type.String({ description: "The search query to perform." }),
	}),
	execute: async (toolCallId, { query }, onUpdate, ctx, signal) => {
		console.log(`[Search Tool] Querying: "${query}" at ${SEARXNG_URL}`);
		
		try {
			const url = new URL(`${SEARXNG_URL}/search`);
			url.searchParams.append('q', query);
			url.searchParams.append('format', 'json');
			url.searchParams.append('categories', 'general');
			url.searchParams.append('language', 'en-US');

			const controller = new AbortController();
			const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 second timeout

			const response = await fetch(url.toString(), {
				method: 'GET',
				headers: {
					'Accept': 'application/json'
				},
				signal: controller.signal
			});
			
			clearTimeout(timeoutId);

			if (!response.ok) {
				throw new Error(`SearXNG returned ${response.status}: ${response.statusText}`);
			}

			const data = await response.json();

			if (!data.results || data.results.length === 0) {
				console.warn('[Search Tool] No results found.');
				return {
					content: [{ type: "text", text: JSON.stringify([]) }],
					details: {}
				};
			}

			// Format results for the LLM
			// We take the top 5 results to keep context small
			const results = data.results.slice(0, 5).map((r: any) => ({
				title: r.title,
				url: r.url,
				snippet: r.content || r.snippet || ''
			}));

			return {
				content: [{ type: "text", text: JSON.stringify(results) }],
				details: {}
			};

		} catch (error) {
			console.error('[Search Tool] Error querying SearXNG:', error);
			
			// Fallback to Mock if SearXNG fails (so development doesn't stall)
			console.log('[Search Tool] Falling back to Mock Data...');
			await new Promise(resolve => setTimeout(resolve, 1000));
			
			let mockResults: any[] = [];
			if (query.toLowerCase().includes('competitor') || query.toLowerCase().includes('market')) {
				mockResults = [
					{ title: "[MOCK] Top Competitors (SearXNG Failed)", snippet: "Major players include Company A and Startup B. Market is growing." },
					{ title: "[MOCK] Market Analysis", snippet: "Global market size estimated at $5B." }
				];
			} else {
				mockResults = [
					{ title: "[MOCK] General Info about " + query, snippet: "This is a rapidly evolving field." }
				];
			}
			
			return {
				content: [{ type: "text", text: JSON.stringify(mockResults) }],
				details: {}
			};
		}
	}
};
