import { db } from '$lib/server/db';
import { 
	AuthStorage, 
	createAgentSession, 
	ModelRegistry, 
	SessionManager
} from '@mariozechner/pi-coding-agent';
import { webSearchTool } from './tools';
import path from 'path';
import os from 'os';

export class Gardener {
	static async grow(seedId: string) {
		console.log(`🌱 Gardener: Picking up seed ${seedId}`);
		
		const seed = db.query('SELECT * FROM seeds WHERE id = $id').get({ $id: seedId }) as { content: string, id: string };
		if (!seed) return;

		// 1. Update Status: Processing
		this.updateStatus(seedId, 'processing');

		try {
			// Initialize Pi Agent
			// Use in-memory auth storage initialized with environment variables
			const authStorage = new AuthStorage();
			
			// Inject API keys from environment
			if (process.env.ZAI_API_KEY) {
				console.log('[Gardener] Found ZAI_API_KEY in environment');
				authStorage.setRuntimeApiKey("zai", process.env.ZAI_API_KEY);
			}
			
			// Add other providers here if needed
			if (process.env.GOOGLE_API_KEY) {
				authStorage.setRuntimeApiKey("google", process.env.GOOGLE_API_KEY);
			}

			const modelRegistry = new ModelRegistry(authStorage); 
			const sessionManager = SessionManager.inMemory();

			// Select Model: Prefer glm-4.7-flash (ZAI), fallback to Gemini Flash
			const models = await modelRegistry.getAvailable();
			
			// Log available models for debugging
			console.log('[Gardener] Available models:', models.map(m => m.id));

			const selectedModel = models.find(m => m.id === 'glm-4.7-flash') ||
								  models.find(m => m.id === 'gemini-3-flash') || 
								  models.find(m => m.id.includes('flash')) || 
								  models[0];

			if (!selectedModel) {
				throw new Error("No models available. Please ensure ZAI_API_KEY is set in your environment.");
			}
			
			console.log(`[Gardener] Using model: ${selectedModel.id} (${selectedModel.provider})`);

			// Create a session with our tools
			const { session } = await createAgentSession({
				sessionManager,
				authStorage,
				modelRegistry,
				model: selectedModel,
				// specific model can be passed here, otherwise it picks default or first available
				customTools: [webSearchTool],
				// We don't need coding tools for this agent, just research
				tools: [] 
			});

			// Subscribe to logs to update the database with "thinking" status
			// For now, we just log to console, but we could update a 'logs' column
			session.subscribe((event) => {
				if (event.type === 'tool_execution_start') {
					this.log(seedId, `Using tool: ${event.toolName}`);
				}
			});

			// 2. prompt the agent
			this.log(seedId, `Starting research on: ${seed.content}`);
			
			const prompt = `
You are an expert Venture Capital Researcher.
Your task is to analyze the following startup idea/concept and write a comprehensive research report.

Startup Idea: "${seed.content}"

Please perform the following steps:
1. Search for existing competitors and similar products.
2. Analyze the market size and trends.
3. Identify potential risks and opportunities.
4. Synthesize all findings into a structured Markdown report.

The report MUST follow this format:
# Research Report: [Idea Name]

## Executive Summary
[Brief overview]

## Market Analysis
[Market size, trends, growth drivers]

## Competitive Landscape
[Major players, gaps, your advantage]

## Strategic Advice
[Recommendations for MVP, go-to-market, etc.]

Do not include any conversational filler. Just output the report.
`;

			await session.prompt(prompt);

			// 3. Extract the report from the last assistant message
			const messages = session.messages;
			const lastMessage = messages[messages.length - 1];
			
			if (lastMessage.role !== 'assistant') {
				// If the last message is not from assistant, try to find the last assistant message
				const lastAssistant = [...messages].reverse().find(m => m.role === 'assistant');
				if (!lastAssistant) {
					throw new Error("Agent did not return a final report.");
				}
				// Use the found assistant message
				// (But actually, session.prompt should end with assistant message unless error occurred)
			}

			// extract text content
			let reportContent = '';
			if (typeof lastMessage.content === 'string') {
				reportContent = lastMessage.content;
			} else if (Array.isArray(lastMessage.content)) {
				reportContent = lastMessage.content
					.filter((c: any) => c.type === 'text')
					.map((c: any) => c.text)
					.join('');
			}

			if (!reportContent.trim()) {
				throw new Error("Agent finished but produced no text content.");
			}

			// 4. Save Report
			const now = Date.now();
			db.query(`
				INSERT OR REPLACE INTO reports (seed_id, content, logs, updated_at)
				VALUES ($seed_id, $content, $logs, $updated_at)
			`).run({
				$seed_id: seedId,
				$content: reportContent,
				$logs: JSON.stringify(['Research complete']), 
				$updated_at: now
			});

			// 5. Update Status: Completed
			this.updateStatus(seedId, 'completed');
			console.log(`🌳 Gardener: Seed ${seedId} has grown into a tree!`);

		} catch (error) {
			console.error(`🍂 Gardener: Seed ${seedId} withered. Details:`, 
				error instanceof Error ? error.message : String(error), 
				error instanceof Error ? error.stack : ''
			);
			if (error && (error as any).cause) {
				console.error('Cause:', (error as any).cause);
			}
			this.updateStatus(seedId, 'failed');
		}
	}

	private static updateStatus(id: string, status: string) {
		db.query('UPDATE seeds SET status = $status WHERE id = $id').run({ $status: status, $id: id });
	}

	private static log(id: string, message: string) {
		console.log(`[Seed ${id}] ${message}`);
	}

	private static delay(ms: number) {
		return new Promise(resolve => setTimeout(resolve, ms));
	}
}
