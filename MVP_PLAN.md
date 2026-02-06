# MVP Plan - Tane (Reborn)

## Core Value Proposition
Tane is an AI-powered startup idea validator. Users plant a "seed" (idea), and Tane "grows" it into a research report using an autonomous agent.

## Features

### 1. Seed Planting (Input)
- **UI**: specialized, focused input experience.
- **Action**: User types an idea (e.g., "Uber for dog walking").
- **Backend**: Creates a `Seed` record in SQLite.
- **Feedback**: Immediate redirection to the "Growth" (Status) page.

### 2. The Growth Process (Research Agent)
- **Technology**: `@mariozechner/pi-coding-agent` embedded SDK.
- **Trigger**: Background worker picks up new Seeds.
- **Workflow**:
  1.  **Understand**: Agent analyzes the idea.
  2.  **Plan**: Agent decides what to search for (Market Size, Competitors, Risks).
  3.  **Act**: Agent uses a `web_search` tool (Brave/Serper) to gather data.
  4.  **Synthesize**: Agent writes a structured Markdown report.
- **Tools**:
  - `web_search`: Custom tool injected into Pi session.
  - `fetch_page`: Tool to read content of specific URLs (optional, for deep dive).

### 3. Real-time Feedback (Status)
- **UI**: A "Status Page" for a specific Seed.
- **Mechanism**: Polling or SSE (Server-Sent Events).
- **States**: `queued` -> `researching` (with detailed logs like "Searching for competitors...") -> `completed` -> `failed`.

### 4. Harvest (Report View)
- **UI**: Beautiful Markdown rendering of the final report.
- **Sections**:
  - Executive Summary.
  - Market Analysis.
  - Competitors.
  - Strategic Advice.

## Roadmap (MVP)
1.  **Project Scaffolding**: Bun + SvelteKit + Tailwind v4 + shadcn-svelte.
2.  **Database**: Setup `bun:sqlite` with schema (`seeds`, `reports`).
3.  **UI Implementation**: Home page and Result page skeleton.
4.  **Agent Integration**: Setup Pi SDK with a `search` tool.
5.  **Queue System**: Simple `setInterval` loop in `hooks.server.ts` to process seeds.
6.  **Polishing**: Transitions, loading states, error handling.

## Lessons Learned & Applied
- **Persistence**: Using SQLite for the queue ensures we don't lose tasks on restart.
- **Agent Autonomy**: Using Pi SDK allows more complex reasoning than a simple chain.
- **Feedback**: Users need to see *what* the AI is doing, not just a spinner.
