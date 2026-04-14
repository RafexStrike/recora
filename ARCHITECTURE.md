# Recora Technical Architecture Audit

## The Blueprint
Recora is built as a monorepo consisting of a Next.js frontend (`client`) and an Express.js backend (`server`).

### Backend Architecture (`/server`)
The backend follows a **Modular Layered Architecture**, ensuring a clean separation of concerns.

- **Entry Points**: `server.ts` initializes the server, while `app.ts` configures the Express middleware stack, authentication, and global routing.
- **Modular Structure**: Business logic is partitioned into domain-specific modules under `src/module/` (e.g., `ai`, `auth`, `project`, `recording`). Each module typically follows this flow:
  - **Routes** (`*.route.ts`): Define API endpoints and attach validation middleware.
  - **Controllers** (`*.controller.ts`): Handle HTTP requests/responses and orchestrate service calls.
  - **Services** (`*.service.ts`): Contain core business logic and interact with the data layer.
  - **Interfaces** (`*.interface.ts`): Define type contracts for requests and responses.
- **Data Layer**: Uses **Prisma ORM** for type-safe interactions with a PostgreSQL database.
- **AI Strategy**: Implements a **Strategy Pattern** for AI providers. A `ProviderRegistry` manages various provider adapters (Anthropic, Gemini, Groq, etc.), allowing the system to switch AI backends dynamically without changing core logic.
- **Error Handling**: A centralized `globalErrorHandler` and `notFoundHandler` ensure consistent API error responses.

### Frontend Architecture (`/client`)
The frontend is a modern **Next.js App Router** application.

- **UI Layer**: Built with **React**, **Tailwind CSS**, and **Shadcn UI**.
- **State & Logic**: Business logic is extracted into **Custom Hooks** (e.g., `useAIChat.ts`, `useRecordingEngine.ts`), keeping components lean and focused on presentation.
- **API Integration**: A centralized `fetchApi` utility in `lib/api.ts` handles base URLs, authentication tokens, and response standardization.
- **Real-time Studio**: Integration with **LiveKit** for low-latency audio/video streaming and room management.

---

## The Life of a Request: AI Chat Generation
Tracing a prompt from the UI to the AI provider and back:

1. **UI Trigger**: The user submits a prompt in the `ChatComposer` component.
2. **Hook Orchestration**: `useAIChat.ts` captures the input and calls `generateAIChat()` from `lib/api.ts`.
3. **API Transport**: `fetchApi` sends a `POST` request to `/api/ai/chat` with the prompt, provider, and API key.
4. **Backend Routing**:
   - `app.ts` $\rightarrow$ `routes/index.ts` $\rightarrow$ `module/ai/ai.route.ts`.
5. **Controller Handling**: `ai.controller.ts` extracts the payload and calls `aiService.generateText()`.
6. **Strategy Execution**:
   - `ai.service.ts` queries the `ProviderRegistry` to retrieve the specific provider instance (e.g., `GeminiProvider`).
   - The provider executes the external API call to the AI service.
7. **Response Cycle**: The generated text flows back through the Service $\rightarrow$ Controller $\rightarrow$ API Route $\rightarrow$ `fetchApi` $\rightarrow$ `useAIChat` hook.
8. **UI Update**: The hook updates the `messages` state, triggering a re-render in the `ChatCanvas` to display the assistant's response.

---

## The Tech Stack in Action

| Technology | Role | Integration Detail |
| :--- | :--- | :--- |
| **Next.js (App Router)** | Framework | Handles routing, server-side rendering, and client-side interactivity. |
| **Express.js** | Backend Server | Provides a scalable REST API with a modular route structure. |
| **Prisma** | ORM | Serves as the "Source of Truth" for data modeling and database queries. |
| **Better Auth** | Authentication | Integrated as a Node handler in `app.ts` to manage sessions and secure routes. |
| **LiveKit** | Real-time Media | Used in the `/studio` route to facilitate multi-user recording and streaming. |
| **Zod** | Validation | Used in `*.validation.ts` files to ensure request payloads meet required schemas before reaching controllers. |
| **Strategy Pattern** | AI Architecture | Decouples the AI service from specific vendor APIs, enabling easy addition of new LLM providers. |
