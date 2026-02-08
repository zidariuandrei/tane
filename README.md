# Tane (種) - The Digital Idea Garden

> "A master builder never starts without a drawing. To build, first you must see."

**Tane** (Japanese for *Seed*) is an AI-powered incubator that helps you validate startup ideas before you write a single line of code. It acts as the "Chief Product Officer" in your AI co-founding team.

## 🌿 The Concept

In Tane, ideas are treated like seeds.
1.  **Plant**: You drop a raw idea (e.g., "Uber for Dog Walking") into the soil.
2.  **Grow**: An autonomous AI agent researches the market, analyzes competitors, and identifies risks.
3.  **Harvest**: You receive a structured **Validation Report**—a document that tells you *why* (or why not) you should build this.

## 🚀 The "Generative Pipeline" Vision

Tane is **Phase 1** of a larger ecosystem designed to build software autonomously:

1.  **Phase 1: Tane (Ideation)** 🟢 *Current*
    *   Input: Abstract Idea.
    *   Output: `validation.md` (Market Research & Core Value Prop).
    *   *Agent Personality:* Creative, inquisitive, critical.

2.  **Phase 2: Zu. (Architecture)** 🔵 *Planned*
    *   Input: Tane's Validation Report.
    *   Output: `blueprint.json` (DB Schema, API Spec, UI Flows).
    *   *Agent Personality:* Structural, logical, precise.

3.  **Phase 3: The Factory (Execution)** 🔴 *Planned*
    *   Input: Zu's Blueprint.
    *   Output: Production Code (`src/`).
    *   *Agent Personality:* Efficient, task-oriented.

## 🛠 Tech Stack

Built for speed and beauty using the modern web stack:

*   **Framework**: [SvelteKit](https://kit.svelte.dev/) (Svelte 5 Runes)
*   **Runtime**: [Bun](https://bun.sh/)
*   **Database**: SQLite (via `bun:sqlite`)
*   **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
*   **Design System**: "Herbarium" (Custom CSS Variables for theming)
*   **AI Engine**: [@mariozechner/pi-coding-agent](https://github.com/mariozechner/pi-coding-agent)

## 🎨 The "Herbarium" Design System

Tane features a unique aesthetic inspired by botanical journals and pressed plants.
*   **Fonts**: *Caveat* (Handwritten) & *Crimson Text* (Serif).
*   **Theme**: Deep organic greens, paper textures, and warm earth tones.
*   **Philosophy**: "Digital Gardening"—slow, thoughtful, organic growth.

## ⚡ Quick Start

### Prerequisites
*   [Bun](https://bun.sh/) (v1.1+)
*   An LLM Provider Key (Anthropic/OpenAI) configured in your environment.

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/yourusername/tane.git
cd tane

# 2. Install dependencies
bun install

# 3. Initialize the database
# (Happens automatically on first run via hooks.server.ts)

# 4. Start the development server
bun dev
```

## 📂 Project Structure

```text
/src
├── lib/
│   ├── components/    # UI Components (SeedCard, ResearchButton)
│   ├── server/        # Backend Logic (Database, AI Agent)
│   └── styles/        # Tailwind & Herbarium Theme
├── routes/            # SvelteKit Pages
│   ├── +page.svelte   # The Garden (Dashboard)
│   └── seed/[id]/     # The Report (Harvest View)
└── app.css            # Global Theme Variables
```

## 🤝 Contributing

This project is an experiment in **Agentic Workflow**.
*   We use `bi` (Bun Install) and `bv` (Bun Vite).
*   We prefer **Composition over Inheritance**.
*   We treat **Documentation as Code** (see `DESIGN_SYSTEM.md`).

---

*Part of the [Tane Suite]().*
