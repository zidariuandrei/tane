// src/lib/server/seed-classifier.ts

export type PlantType = 'pine' | 'sakura' | 'bamboo' | 'fern' | 'oak';

export function determinePlantType(content: string): PlantType {
	const text = content.toLowerCase();

	// Sakura (Art, Design, Fleeting)
	if (
		matches(text, [
			'art',
			'design',
			'beauty',
			'color',
			'music',
			'style',
			'dream',
			'creative',
			'logo',
			'ui',
			'ux',
			'sketch',
			'draw',
			'paint',
			'image',
			'picture',
			'photo',
		])
	) {
		return 'sakura';
	}

	// Bamboo (Productivity, Fast, Tools)
	if (
		matches(text, [
			'fast',
			'growth',
			'mvp',
			'hack',
			'tool',
			'productivity',
			'agile',
			'sprint',
			'code',
			'dev',
			'script',
			'cli',
			'build',
			'quick',
			'app',
		])
	) {
		return 'bamboo';
	}

	// Fern (Research, History, Complexity)
	if (
		matches(text, [
			'research',
			'history',
			'ancient',
			'science',
			'complex',
			'study',
			'learn',
			'read',
			'book',
			'deep',
			'theory',
			'math',
			'philosophy',
			'analysis',
			'investigate',
		])
	) {
		return 'fern';
	}

	// Oak (Business, Strategy, Foundations)
	if (
		matches(text, [
			'business',
			'money',
			'finance',
			'strategy',
			'foundation',
			'long-term',
			'structure',
			'architecture',
			'plan',
			'company',
			'startup',
			'invest',
			'wealth',
			'management',
		])
	) {
		return 'oak';
	}

	// Pine (Resilience, Default)
	return 'pine';
}

function matches(text: string, keywords: string[]): boolean {
	return keywords.some((keyword) => text.includes(keyword));
}
