# Pi Agent
Use this skill when you need to integrate the `@mariozechner/pi-coding-agent` SDK into an application.

## Usage
The SDK allows you to embed the Pi Agent into your Node.js application.

## Core Concepts

### 1. Initialization
You need to set up `AuthStorage` and `ModelRegistry` before creating a session.

```typescript
import { AuthStorage, createAgentSession, ModelRegistry, SessionManager } from "@mariozechner/pi-coding-agent";

// 1. Setup Auth & Models
const authStorage = new AuthStorage(); // Loads from ~/.pi/agent/auth.json
const modelRegistry = new ModelRegistry(authStorage);

// 2. Create Session
const { session } = await createAgentSession({
    sessionManager: SessionManager.inMemory(), // Don't save history to disk
    authStorage,
    modelRegistry,
    // Optional: model: getModel("anthropic", "claude-3-5-sonnet-20241022"),
});
```

### 2. Custom Tools
You can define custom tools and pass them to the session.

```typescript
import type { Tool } from '@mariozechner/pi-coding-agent/src/pi/tools/tool';

const myTool: Tool = {
    name: 'my_tool',
    description: 'Does something.',
    arguments: {
        arg1: { type: 'string', description: 'Argument 1', required: true }
    },
    handler: async ({ arg1 }) => {
        return "Result";
    }
};

// Pass to session
const { session } = await createAgentSession({
    // ...
    tools: [myTool] // Overrides default tools. Use [...codingTools, myTool] to keep defaults.
});
```

### 3. Prompting
Use `session.prompt(text)` to send a message.

```typescript
await session.prompt("Research this topic: " + topic);
```

### 4. Handling Responses
The agent streams responses. You can subscribe to events to capture the output.

```typescript
session.subscribe((event) => {
    if (event.type === "message_update" && event.assistantMessageEvent.type === "text_delta") {
        process.stdout.write(event.assistantMessageEvent.delta);
    }
});
```

However, for backend integrations where you just want the final result or want to process the conversation history programmatically, you can inspect `session.messages` after `session.prompt` resolves.

## Common Pitfalls
*   **Env Vars**: Ensure `ANTHROPIC_API_KEY` (or other provider keys) are set in `.env`.
*   **Tools**: If you provide a `tools` array, it *replaces* the default tools. If you want the agent to have file access, you must include `codingTools` or specific tools like `readTool`.
*   **Session Persistence**: Use `SessionManager.inMemory()` for ephemeral tasks (like a backend worker) to avoid cluttering the `.pi/sessions` directory.
