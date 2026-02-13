# Tane (種) - The Digital Idea Garden

> "A master builder never starts without a drawing. To build, first you must see."

**Tane** (Japanese for *Seed*) is an AI-powered incubator that helps you validate startup ideas before you write a single line of code. It acts as the "Chief Product Officer" in your AI co-founding team.

![Tane Screenshot](https://via.placeholder.com/1200x600?text=Tane+Screenshot+Placeholder)

## 🌿 The Concept

In Tane, ideas are treated like seeds.
1.  **Plant**: You drop a raw idea (e.g., "Uber for Dog Walking") into the soil.
2.  **Grow**: An autonomous AI agent researches the market, analyzes competitors, and identifies risks.
3.  **Harvest**: You receive a structured **Validation Report**—a document that tells you *why* (or why not) you should build this.

## 🚀 Features
- **Botanical Design System**: A unique "Herbarium" aesthetic with organic textures and paper feel.
- **Autonomous Research Agent**: Powered by `@mariozechner/pi-coding-agent`, Tane performs deep web research using your preferred LLM.
- **Model Agnostic**: Automatically detects and uses models configured in your Pi environment (OpenAI, Anthropic, Gemini, Z.ai, etc.).
- **Local-First**: Data is stored in a local SQLite database (`tane.sqlite`) for privacy and speed.

## ⚡ Quick Start

### Prerequisites
- **[Bun](https://bun.sh/)** (v1.1+)
- **Pi Agent Configuration**: Tane uses the Pi Agent SDK to discover models and keys.

### 1. Installation

```bash
# Clone the repository
git clone https://github.com/zidariuandrei/tane.git
cd tane

# Install dependencies
bun install
```

### 2. Configuration (API Keys)

Tane looks for API keys in two places:
1.  **Pi Config (Recommended)**: `~/.pi/agent/auth.json`. If you already use `pi`, Tane will automatically detect your configured models.
2.  **Environment Variables**: You can set keys directly in a `.env` file for specific providers.

**Example `.env`:**
```bash
# Optional: Explicit keys if not using ~/.pi/agent/auth.json
ZAI_API_KEY=your_z_ai_key
GOOGLE_API_KEY=your_gemini_key
OPENAI_API_KEY=your_openai_key
```

### 3. Running Tane

```bash
# Start the development server
bun run dev
```

Open your browser to `http://localhost:5173`.
- **/**: The App (Plant seeds, view reports).
- **/landing**: The Marketing/Showcase page.

## 🏗 Architecture & Development

### The Stack
- **Framework**: SvelteKit (Svelte 5 Runes)
- **Runtime**: Bun
- **Database**: SQLite (`bun:sqlite`)
- **Agent SDK**: `@mariozechner/pi-coding-agent`

### The "Gardener" (Background Worker)
Tane uses a simple polling mechanism in `src/hooks.server.ts` to check for pending seeds.
1.  When a seed is planted, it is saved with `status: pending` and your selected `model`.
2.  The background worker (`Gardener.grow`) picks it up.
3.  It instantiates a **Headless Pi Agent**.
4.  The agent performs web searches and synthesizes a Markdown report.
5.  The report is saved to the `reports` table.

### Model Selection
Tane dynamically lists models available in your environment.
- It queries the `ModelRegistry` from the Pi SDK.
- It filters for models that have valid authentication.
- The default selection is the **last** model in the list (usually the most capable/SOTA).

## 🚢 Deployment

### Static Landing Page (GitHub Pages)
To deploy the `/landing` page as a static site:
```bash
# Builds the app and copies static assets to /docs
./publish-landing.sh
```
Then commit the `docs/` folder and enable GitHub Pages in your repository settings.

### Full Application (Self-Hosted)
To run the full app with the database and agent:
1.  **Docker**: Use the provided `Dockerfile` (create one based on `oven/bun`).
2.  **VPS**: Deploy to a VPS (Hetzner, DigitalOcean).
3.  **Volume**: Mount a volume for `tane.sqlite` and `~/.pi/agent/` to persist data and auth.

**Note**: Serverless platforms (Vercel/Netlify) are **NOT supported** for the full app because:
1.  The agent requires long-running processes (1-3 mins).
2.  `bun:sqlite` requires a persistent filesystem.

---

*Part of the [Tane Suite]().*
