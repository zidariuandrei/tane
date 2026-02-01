# AGENTS.md - Coding Guidelines for Tane

## Build & Development Commands

```bash
# Development
bun run dev              # Start dev server with hot reload
bun run build            # Production build
bun run preview          # Preview production build

# Type Checking
bun run check            # Run Svelte type check once
bun run check:watch      # Run Svelte type check in watch mode

# Database
bun run db:init          # Initialize SQLite database schema
```

**Note:** This project uses Bun as the runtime. All npm scripts use `bun --bun vite` prefix.

## Project Structure

```
src/
├── routes/           # SvelteKit routes (pages & API)
│   ├── +page.svelte  # Home page
│   ├── +layout.svelte # Root layout
│   └── api/          # API endpoints (+server.ts)
├── lib/
│   ├── types/        # TypeScript interfaces
│   └── server/       # Server-side utilities (db, opencode)
├── app.css           # Global styles with Tailwind v4
└── app.html          # HTML template
```

## Technology Stack

- **Framework:** SvelteKit 2.5+ with Svelte 5 (runes syntax)
- **Runtime:** Bun (v1.3.8+)
- **Styling:** Tailwind CSS 4.0+ with CSS-based configuration
- **Database:** Bun SQLite (better-sqlite3 compatible)
- **TypeScript:** Strict mode enabled
- **Build Tool:** Vite 6
- **UI Components:** shadcn-svelte ready (clsx, tailwind-merge installed)

## Code Style Guidelines

### TypeScript

- **Strict mode:** Always enabled. No implicit any.
- **Types:** Define interfaces in `src/lib/types/`.
- **Return types:** Explicit on public functions.
- **Null checks:** Use optional chaining (`?.`) and nullish coalescing (`??`).

### Imports

```typescript
// Order: external libs → SvelteKit → $lib aliases → local
import { json } from '@sveltejs/kit';
import type { Database } from 'bun:sqlite';
import type { Seed } from '$lib/types';
import { TaneOpenCodeClient } from '$lib/server/opencode/client';
```

### Naming Conventions

- **Files:** kebab-case (`+server.ts`, `opencode-client.ts`)
- **Components:** PascalCase for Svelte components
- **Variables/functions:** camelCase
- **Classes:** PascalCase
- **Constants:** UPPER_SNAKE_CASE
- **Interfaces:** PascalCase with no prefix

### Svelte 5 Runes

Use the new runes syntax (not legacy `$:` reactive statements):

```svelte
<script>
  let seedInput = $state('');
  let isPlanting = $state(false);
  
  function plantSeed() {
    if (!seedInput.trim()) return;
    // ...
  }
</script>
```

### API Endpoints

Structure in `src/routes/api/[resource]/+server.ts`:

```typescript
import { json } from '@sveltejs/kit';

export async function GET() {
  // Return json(data)
}

export async function POST({ request }) {
  const body = await request.json();
  // Validate, process, return json(result, { status: 201 })
}
```

### Error Handling

```typescript
// Server endpoints: return JSON error with status
try {
  const result = await riskyOperation();
  return json(result);
} catch (error) {
  return json({ error: 'Descriptive message' }, { status: 500 });
}

// Client-side: try/catch with console.error
try {
  await fetch('/api/seeds', { method: 'POST', body });
} catch (error) {
  console.error('Failed to plant seed:', error);
}
```

### Database

- Use Bun's native SQLite (`bun:sqlite`).
- SQL parameters: Always use parameterized queries (`?` placeholders).
- UUIDs: Use `randomUUID()` from `crypto`.
- Timestamps: Use `unixepoch()` in SQLite.

### Styling (Tailwind v4)

- **Configuration:** CSS-based in `app.css` using `@theme` directive.
- **No tailwind.config.js:** Tailwind v4 uses CSS-based config only.
- **Colors:** Use stone-*, emerald-* palette (nature theme).
- **Custom components:** Define in `app.css` with `@layer components`.

```css
@theme {
  --color-stone-50: #fafaf9;
  --color-emerald-600: #059669;
}

@layer components {
  .btn-primary {
    padding: 0.5rem 1rem;
    background-color: var(--color-emerald-600);
  }
}
```

### Comments

- Use `// TODO:` for temporary notes.
- Explain complex business logic.
- Keep comments concise and current.

### Environment Variables

Required for full functionality:
```bash
export SERPER_API_KEY=your_key     # Or BRAVE_API_KEY
export OPENCODE_URL=http://localhost:4096  # Default OpenCode server
```

## Testing

**No test framework currently configured.**
When adding tests:
- Consider Vitest (already used by Vite ecosystem)
- Place tests alongside source files or in `tests/` directory
- Run single test: `bun vitest run -t "test name"`

## Linting

**No ESLint/Prettier configured.**
Before committing, run:
```bash
bun run check    # Type check all files
```

## OpenCode Integration

The app integrates with OpenCode server for AI research:
- Client: `src/lib/server/opencode/client.ts`
- Health check endpoint: `GET /api/opencode/status`
- Ensure `opencode serve` is running on localhost:4096

## shadcn-svelte

Ready for shadcn-svelte components. Install with:
```bash
npx shadcn-svelte@next add button
```

Dependencies already installed: `clsx`, `tailwind-merge`.

Allways run `bun run check` to verify that there are no compile time errors.
