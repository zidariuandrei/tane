import { createOpencodeClient } from '@opencode-ai/sdk';
import type { Seed } from '$lib/types';

export class TaneOpenCodeClient {
  private client;
  private baseUrl: string;

  constructor(baseUrl = 'http://localhost:4096') {
    this.baseUrl = baseUrl;
    this.client = createOpencodeClient({ baseUrl });
  }

  async health() {
    // Use config.get as a health check since there's no dedicated health endpoint
    const result = await this.client.config.get();
    return result.data;
  }

  async getAvailableProviders() {
    const result = await this.client.config.providers();
    const data = result.data;
    if (!data) {
      return { providers: [], defaults: {} };
    }
    return {
      providers: data.providers,
      defaults: data.default
    };
  }

  async createResearchSession(seed: Seed) {
    const result = await this.client.session.create({
      body: { 
        title: `Research: ${seed.content.substring(0, 50)}...` 
      }
    });
    return result.data;
  }

  async generateSearchQueries(seedContent: string, sessionId: string) {
    const prompt = `For this startup idea: "${seedContent}"

Generate 3 specific web search queries to find:
1. Market size data (TAM/SAM/SOM)
2. Direct and indirect competitors
3. Similar startups that failed and why they failed

Return only the search queries, one per line, no numbering or bullets.`;

    const result = await this.client.session.prompt({
      path: { id: sessionId },
      body: {
        parts: [{ type: 'text', text: prompt }]
      }
    });

    const data = result.data;
    if (!data) {
      return [];
    }

    // Parse text parts to extract queries
    const text = data.parts
      .filter(p => p.type === 'text')
      .map(p => p.text)
      .join('\n');
    
    return text.split('\n').filter(q => q.trim().length > 0);
  }

  async fetchAndAnalyze(url: string, context: string, sessionId: string) {
    const prompt = `Fetch the content from ${url} and extract relevant information about: "${context}"

Provide a structured analysis with:
- Key findings
- Relevant data points
- Source credibility assessment`;

    const result = await this.client.session.prompt({
      path: { id: sessionId },
      body: {
        parts: [{ type: 'text', text: prompt }],
        tools: { webfetch: true }
      }
    });

    return result.data?.parts ?? [];
  }

  async synthesizeResearch(
    seedContent: string, 
    researchData: any[], 
    sessionId: string
  ) {
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
        parts: [{ type: 'text', text: prompt }]
      }
    });

    const data = result.data;
    if (!data) {
      return '';
    }

    return data.parts
      .filter(p => p.type === 'text')
      .map(p => p.text)
      .join('\n');
  }
}
