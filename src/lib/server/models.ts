import path from 'node:path';
import { AuthStorage, getAgentDir, ModelRegistry } from '@mariozechner/pi-coding-agent';

let registry: any = null;

export function getAvailableModels() {
	// If we are in a build environment (Node) where Pi might fail to load due to native deps or other issues,
	// we should have a robust fallback.
	// Also, during 'vite build', we might not want to access the filesystem for Pi config.

	// We use a try-catch block for the whole initialization
	if (!registry) {
		try {
			const agentDir = getAgentDir();
			// Manually construct paths since they aren't exported from index
			const authPath = path.join(agentDir, 'auth.json');
			// models.json is in agent dir? Or root? usually agent dir.
			// But ModelRegistry constructor signature is (authStorage, modelsJsonPath)
			// Let's assume standard location.
			const modelsPath = path.join(agentDir, 'models.json');

			const authStorage = new AuthStorage(authPath);
			registry = new ModelRegistry(authStorage, modelsPath);
			registry.refresh();
		} catch (e) {
			console.warn('⚠️ Failed to initialize Pi Model Registry:', e);
			// Fallback registry object
			registry = {
				getAvailable: () => [
					{ id: 'gpt-4o', provider: 'openai', contextWindow: 128000, name: 'GPT-4o (Fallback)' },
					{
						id: 'claude-3-5-sonnet',
						provider: 'anthropic',
						contextWindow: 200000,
						name: 'Claude 3.5 Sonnet (Fallback)',
					},
				],
			};
		}
	}

	try {
		const models = registry.getAvailable();

		// If no models are authenticated, fall back to all models (so the user sees options)
		if (models.length === 0) {
			console.warn('No user-authenticated models found (ignoring internal dev providers).');
			// Return fallback list for UI development
			return [
				{ id: 'gpt-4o', name: 'GPT-4o (Key Missing)', description: 'OpenAI' },
				{
					id: 'claude-3-5-sonnet',
					name: 'Claude 3.5 Sonnet (Key Missing)',
					description: 'Anthropic',
				},
				{ id: 'gemini-1.5-pro', name: 'Gemini 1.5 Pro (Key Missing)', description: 'Google' },
			];
		}

		// Sort by provider, then name
		models.sort((a: any, b: any) => {
			if (a.provider !== b.provider) return a.provider.localeCompare(b.provider);
			return a.id.localeCompare(b.id);
		});

		return models.map((m: any) => ({
			id: m.id,
			name: `${m.name ?? m.id} (${m.provider})`,
			description: `Context: ${Math.round((m.contextWindow || 0) / 1000)}k`,
		}));
	} catch (e) {
		console.error('Error fetching models:', e);
		return [];
	}
}
