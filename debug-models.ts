import { ModelRegistry, AuthStorage, getAgentDir } from '@mariozechner/pi-coding-agent';
import path from 'path';

const agentDir = getAgentDir();
const authPath = path.join(agentDir, 'auth.json');
const modelsPath = path.join(agentDir, 'models.json');

console.log('Agent Dir:', agentDir);
console.log('Auth Path:', authPath);

const authStorage = new AuthStorage(authPath);
// Force reload to ensure we have latest keys
authStorage.reload();

console.log('Configured Providers:', authStorage.list());

const registry = new ModelRegistry(authStorage, modelsPath);
registry.refresh();

const available = registry.getAvailable().filter(m => m.provider !== 'google-antigravity');
console.log('\nAvailable Models (Filtered):');
available.forEach(m => console.log(`- ${m.id} (${m.provider})`));
