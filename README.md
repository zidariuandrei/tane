# Tane (種)

Your Idea Incubator. Drop a one-sentence seed and watch it grow into a full research dossier.

## Prerequisites

- [Bun](https://bun.sh) v1.3.8+
- [OpenCode](https://opencode.ai) server running locally
- Search API key (Serper, Brave, or SerpAPI)

## Quick Start

```bash
# Install dependencies
bun install

# Initialize database
bun run db:init

# Start development server
bun run dev
```

## OpenCode Setup

Make sure you have OpenCode server running:

```bash
opencode serve
```

Default URL: http://localhost:4096

## Configuration

Set your search API key in environment variables:

```bash
export SERPER_API_KEY=your_key_here
# or
export BRAVE_API_KEY=your_key_here
```

## Features

- 🌱 **Seed Management**: Plant ideas as one-sentence seeds
- 🔍 **Automated Research**: Background market, competitor, and failure analysis
- 🌳 **Garden Visualization**: Watch seeds grow from seedlings to trees
- 📄 **Dossier Export**: Export research as Markdown for Obsidian
- 🤖 **OpenCode Integration**: Uses your authenticated LLM providers

## Project Structure

See [PLAN.md](./PLAN.md) for detailed architecture and roadmap.

## License

MIT
