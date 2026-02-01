# Tane (種) - Project Plan

**Concept:** Your "Idea Incubator." You drop a one-sentence "seed." The agent works in the background (scraping, researching, competitor analysis) to grow it into a full dossier.

**Tech Stack:**
- Runtime: Bun v1.3.8
- Framework: SvelteKit 2.x + Svelte 5 (Runes)
- Database: Bun SQLite (`bun:sqlite`)
- LLM/Search: OpenCode Server + External Search API
- Styling: TailwindCSS
- Markdown: Bun.markdown

---

## Architecture Overview

### Web Search Strategy
We use a custom research pipeline:
1. LLM generates search queries based on seed content
2. External search API executes queries (Serper/Brave/SerpAPI)
3. OpenCode's `webfetch` tool fetches and analyzes top results
4. Results parsed and stored in database

### OpenCode Integration
- Connects to local OpenCode server at `localhost:4096`
- Uses user's authenticated providers (Zen subscription or external like Gemini)
- Fetches available providers from OpenCode config
- No hardcoded API keys in Tane

### Provider Management
- Fetch available providers from OpenCode (`/config/providers`)
- Use OpenCode's default provider or let user select
- All authentication handled by OpenCode

---

## MVP Scope (Weeks 1-3)

### Week 1: Foundation & OpenCode Integration

**Day 1-2: Project Setup**
- [x] Initialize SvelteKit 2.x + Svelte 5 with Bun
- [x] Setup TailwindCSS
- [x] Configure `bun:sqlite` database
- [x] Install `@opencode-ai/sdk`

**Day 3-4: Database Schema**
```sql
CREATE TABLE seeds (
  id TEXT PRIMARY KEY,
  content TEXT NOT NULL,
  status TEXT DEFAULT 'planted',
  growth_score REAL DEFAULT 0,
  position_x REAL,
  position_y REAL,
  created_at INTEGER DEFAULT (unixepoch()),
  updated_at INTEGER DEFAULT (unixepoch())
);

CREATE TABLE research_jobs (
  id TEXT PRIMARY KEY,
  seed_id TEXT REFERENCES seeds(id),
  job_type TEXT CHECK(job_type IN ('market', 'competitor', 'failure')),
  status TEXT DEFAULT 'pending',
  result TEXT,
  error TEXT,
  created_at INTEGER DEFAULT (unixepoch())
);

CREATE TABLE research_data (
  id TEXT PRIMARY KEY,
  seed_id TEXT REFERENCES seeds(id),
  data_type TEXT CHECK(data_type IN ('market', 'competitor', 'failure', 'trend')),
  title TEXT,
  content TEXT,
  source_url TEXT,
  relevance_score REAL,
  created_at INTEGER DEFAULT (unixepoch())
);

CREATE TABLE settings (
  key TEXT PRIMARY KEY,
  value TEXT
);
```

**Day 5-7: OpenCode Client & Provider Discovery**
- Create OpenCode client wrapper
- Implement provider discovery
- Create research session management
- Generate search queries via LLM

### Week 2: Research Pipeline & Background Jobs

**Day 8-10: Search Integration**
- External search API integration
- Query generation via OpenCode
- Result fetching via webfetch tool
- Data parsing and storage

**Day 11-12: Background Job System**
- Bun Workers for job processing
- SQLite job queue
- SSE for real-time updates

**Day 13-14: Garden Visualization**
- Canvas-based automatic layout (force-directed)
- 4 growth stages: Planted → Sprouting → Growing → Tree
- Real-time updates via SSE

### Week 3: UI, Settings & Export

**Day 15-17: Web Interface**
- Seed input form
- Seed list with status
- Garden view (automatic layout)
- Dossier view with markdown rendering (Bun.markdown)

**Day 18-19: Settings & Configuration**
- OpenCode connection status
- Display available providers from OpenCode
- Research depth settings

**Day 20-21: Export & Polish**
- Export to markdown button (for Obsidian sync)
- Error handling
- Documentation

---

## Post-MVP Roadmap

### Phase 2: Advanced Garden + Skills (Weeks 4-6)

#### Week 4: Enhanced Garden
- [ ] Zoom/pan capabilities
- [ ] Filter by status/data type
- [ ] Garden themes (seasonal, night mode)
- [ ] Seed categories/tags
- [ ] Search and filter in garden

#### Week 5: Skills System
Skills are reusable AI capabilities using SKILL.md format:

```yaml
---
name: market-sizing
description: Advanced market size analysis with TAM/SAM/SOM calculations
version: 1.0.0
---

# Market Sizing Analysis

## Instructions
1. Search for industry reports on {idea}
2. Calculate TAM based on total market value
3. Identify SAM (geographic/demographic constraints)
4. Estimate SOM (first 3-5 year target)
5. Find comparable companies and valuations
```

Features:
- [ ] SKILL.md parser
- [ ] Skill enable/disable UI
- [ ] Apply skills during research
- [ ] Skill marketplace (GitHub repos)

#### Week 6: Markdown Editor & Archive
- [ ] TipTap markdown editor for dossiers
- [ ] Bun.Archive integration for exports
- [ ] Import/export functionality
- [ ] Batch export multiple seeds

### Phase 3: CLI Tool (Weeks 7-8)

Terminal tool with Bun.wrapAnsi() formatting:

```bash
$ tane plant "AI-powered plant care app"
✓ Seed planted with ID: seed_abc123

$ tane grow seed_abc123
✓ Research started

$ tane list
ID          Status    Growth    Content
seed_abc123 growing   45%       AI-powered plant care app

$ tane export seed_abc123 --format markdown
✓ Exported to ./seed_abc123-dossier.md

$ tane garden --watch
# Terminal garden view with live updates
```

Features:
- [ ] CLI argument parsing
- [ ] Terminal UI with ANSI formatting
- [ ] Terminal garden visualization
- [ ] API client for local server

### Phase 4: Scale & Auth (Weeks 9-12)

#### Week 9-10: Authentication (OpenAuth)
- [ ] OpenAuth integration
- [ ] User accounts
- [ ] Private/public seeds
- [ ] Team workspaces

#### Week 11-12: Netlify & Production
- [ ] Edge function compatibility
- [ ] Database migration strategy
- [ ] Environment configuration
- [ ] Deployment automation

---

## Key Technical Decisions

1. **OpenCode Server**: Assumed running at `localhost:4096`
2. **Web Search**: External API (Serper/Brave) + OpenCode webfetch tool
3. **Garden Layout**: Automatic force-directed layout
4. **Providers**: Use OpenCode's authenticated providers
5. **Export**: Simple markdown file download
6. **Real-time**: SSE for updates
7. **Skills**: Moved to Phase 2 (Week 5)

---

## Project Structure

```
tane/
├── src/
│   ├── lib/
│   │   ├── components/
│   │   │   ├── garden/
│   │   │   │   ├── Garden.svelte
│   │   │   │   ├── Seedling.svelte
│   │   │   │   └── layout.ts
│   │   │   ├── dossier/
│   │   │   │   ├── DossierView.svelte
│   │   │   │   └── ExportButton.svelte
│   │   │   └── seeds/
│   │   │       ├── SeedInput.svelte
│   │   │       └── SeedList.svelte
│   │   ├── server/
│   │   │   ├── db.ts
│   │   │   ├── queue.ts
│   │   │   ├── opencode/
│   │   │   │   └── client.ts
│   │   │   └── research/
│   │   │       └── pipeline.ts
│   │   └── types/
│   ├── routes/
│   │   ├── +page.svelte
│   │   ├── api/
│   │   │   ├── seeds/+server.ts
│   │   │   ├── jobs/+server.ts
│   │   │   └── stream/+server.ts
│   │   └── seed/[id]/+page.svelte
│   └── cli/
│       └── (Phase 3)
├── static/
├── package.json
└── README.md
```

---

## Open Questions

1. **External Search API**: Which service?
   - Serper.dev (Google Search API)
   - Brave Search API
   - SerpAPI
   - Other?

2. **Provider Selection**:
   - Auto-use OpenCode's default provider?
   - Let user pick per seed?
   - Show in UI or keep transparent?

3. **Search Results Limit**: How many URLs per query?
   - Top 3?
   - Top 5?
   - Configurable?

---

## Notes

- **Bun v1.3.8 Features Used**:
  - `Bun.markdown` for rendering dossiers
  - `Bun.Archive` (Phase 2) for exports
  - `Bun.wrapAnsi()` (Phase 3) for CLI
  - `bun:sqlite` for database
  - Bun Workers for background jobs

- **OpenCode Tools Used**:
  - `webfetch` for fetching URLs
  - Session management
  - Provider discovery
  - Prompt API for LLM queries

- **Skills**: Moved to Phase 2, Week 5
  - SKILL.md format from skills.sh
  - Enable/disable per seed
  - GitHub-based marketplace
