# System Architecture

## Stack
-   **Runtime**: Bun
-   **Framework**: SvelteKit (Server-Side Rendering + API Routes)
-   **Language**: TypeScript
-   **Database**: SQLite (`bun:sqlite`)
-   **Styling**: Tailwind CSS v4
-   **AI Engine**: Pi Coding Agent SDK (`@mariozechner/pi-coding-agent`)

## Data Model

### `seeds`
| Column | Type | Description |
|--------|------|-------------|
| `id` | TEXT (UUID) | Primary Key |
| `content` | TEXT | The startup idea |
| `status` | TEXT | `pending`, `processing`, `completed`, `failed` |
| `created_at` | INTEGER | Unix timestamp |

### `reports`
| Column | Type | Description |
|--------|------|-------------|
| `seed_id` | TEXT | Foreign Key -> seeds.id |
| `content` | TEXT | Markdown report |
| `logs` | TEXT | JSON array of processing logs/steps |
| `updated_at` | INTEGER | Unix timestamp |

## Server-Side Architecture

### 1. The Queue Worker (`src/lib/server/worker.ts`)
A singleton process initialized in `hooks.server.ts`.
-   Polls SQLite for `status = 'pending'` seeds.
-   Instantiates a Pi Agent Session for each seed.
-   Updates `status` to `processing`.

### 2. The Agent Wrapper (`src/lib/server/agent.ts`)
Wraps `@mariozechner/pi-coding-agent`.
-   Configures the agent with a `system_prompt` defining its role as a "Startup Researcher".
-   Registers custom tools:
    -   `search(query: string)`: Calls a search API (e.g., Brave Search or Google via Serper).
    -   `visit(url: string)`: Fetches page text.

### 3. API Routes
-   `POST /api/seeds`: Creates a new seed.
-   `GET /api/seeds/[id]`: Returns seed status and report.
-   `GET /api/seeds/[id]/stream`: SSE endpoint for real-time logs (optional).

## Pi SDK Integration
We use the SDK in "headless" mode.
```typescript
import { createAgentSession } from '@mariozechner/pi-coding-agent';

// In the worker
const session = await createAgentSession({ ... });
await session.prompt(`Research this idea: ${seed.content}`);
```

## Deployment
-   **Environment**: Docker or VPS (needs persistent disk for SQLite).
-   **Environment Variables**:
    -   `ANTHROPIC_API_KEY` (or other provider for Pi).
    -   `SEARCH_API_KEY` (Brave/Serper).
