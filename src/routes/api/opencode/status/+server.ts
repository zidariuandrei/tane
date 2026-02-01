import { json } from '@sveltejs/kit';
import { TaneOpenCodeClient } from '$lib/server/opencode/client';

export async function GET() {
  const client = new TaneOpenCodeClient();
  
  try {
    const config = await client.health();
    const providers = await client.getAvailableProviders();
    
    if (!config) {
      return json({
        connected: false,
        error: 'OpenCode server returned empty response'
      }, { status: 503 });
    }
    
    return json({
      connected: true,
      model: config.model,
      providers: providers.providers,
      defaults: providers.defaults
    });
  } catch (error) {
    return json({
      connected: false,
      error: 'OpenCode server not available'
    }, { status: 503 });
  }
}
