# Codebase Dump



---
## FILE: AGENTS.md

```md
Recora (Riverside.fm clone) Project Overview
Riverside.fm is a browser-based studio for podcasting, video interviews, live streams and webinars. Its key selling point is local high‑quality recording: each participant’s audio and video are captured on their own device (up to 4K video, uncompressed audio) and only then uploaded, so poor internet doesn’t degrade the recording
. The platform then provides multi-track editing (with a text-based transcript), branding tools (logos/overlays), AI enhancements (noise removal, filler-word cleanup, speaker framing), and distribution (live streaming, podcast hosting, auto show notes, transcripts, etc). Our goal is to “clone” these features in a free, self‑hosted system.

Below we detail Riverside’s user‑visible features (with citations), lesser‑known features under the hood, competing products (including open‑source options), architecture patterns for local recording, and finally cost‐saving / free components and a roadmap with trade‑offs.

Key Riverside.fm Features
Studio‑quality local recording: Riverside records locally on each guest’s machine, capturing up to 4K video and uncompressed 48kHz WAV audio for every participant
. This means recordings are unaffected by internet fluctuations. The platform automatically uploads each chunk of the recording to the cloud as you record (“progressive upload”) so nothing is lost
. After recording, you can download separate audio and video tracks per person
 (or a combined mix).

Multi‑track editing: Once recorded, sessions open in a web editor that shows the transcript of every speaker. You can cut/copy/paste directly in the text, and Riverside will splice the media for you
. Because tracks are separated, you can mute one person, remove crosstalk, or switch layouts easily
. The editor also lets you add logos, colors, intros/outros, and generates animated captions for social clips
. (In short: editing is like editing a document, not a timeline.)

AI‑powered enhancements: Riverside includes several AI “wizard” tools. For example, an audio clean‑up feature “polishes your sound, removes noise, and makes any mic sound professional”
. There are one-click tools to remove filler words or long silences (the “magic silence” tool)
. It can fix eye contact (by subtly zooming/cropping video when you look away) and even generate B-roll video clips from text prompts
. It offers auto-translation and dubbing into 30+ languages
. And it creates “Magic Clips” – short social videos and thumbnails pulled from your content – plus automated show notes, titles, descriptions and chapters
.

Live streaming & Webinars: Riverside isn’t just for recording; it can simulcast your session live to social platforms. You can go live in full HD to LinkedIn, YouTube, Instagram, Twitch, and others all at once
. During live events, hosts can manage audience Q&A and call‑ins, run polls, and moderate live chat—all within the same dashboard
. It supports webinar features like registration pages with email reminders and HubSpot integration for leads
. Every webinar is also recorded in high quality so you can later repurpose it into clips or a podcast
.

Built‑in podcast hosting & analytics: After you finish editing, Riverside can publish your podcast directly. It auto-generates podcast feeds and metadata so your episode can appear on Spotify, Apple Podcasts, YouTube, and all major directories with just a few clicks
. The platform provides basic podcast analytics (downloads, listener trends, episode success) to help you grow your show
. All of this is integrated: transcripts, descriptions, chapter markers and show notes can be auto-created or edited in one place
.

Mobile support: Riverside offers iOS/Android apps so guests can join from their phones and still record in HD
.

Together, these features make Riverside an “all-in-one studio”
 for creators. In our Recora project, we would aim to replicate each of these capabilities.

Lesser-Known / Backend Features
Beyond the above user-facing features, Riverside has some additional capabilities and behind-the-scenes mechanisms worth noting:

Async recording: Guests can record their part off-line and upload later. For example, if a guest can’t join live, they record themselves separately (on the Riverside site/app) and it automatically syncs with the main session
. This “record on your own time” feature is rare in live‑recording tools.

Teleprompter & Presenter tools: The host/producer can load a script into an on-screen teleprompter, so speakers stay on track
. Producers can also upload presentation slides; Riverside will record the slides locally in sync with the video
.

Producer Mode & Media Board: Riverside lets one person join as a producer, separate from on-camera hosts. The producer can manage technical details: adjust audio levels, hide/show guests, add lower-third titles, and play pre-recorded clips (via the “Media Board”) into the live studio
. (For example, a producer could drop in a jingle or video ad mid-show.)

Audience/Backstage Mode: In webinars, you can admit up to 1,000 viewers (Riverside mentions “1000 audience members”
). Riverside supports an “audience” or “backstage” mode: people in this mode can chat and call in, but are not on camera until promoted. (A similar concept appears in SquadCast’s Backstage feature for people waiting to go on-air
.)

Progressive cloud upload: As noted, each local recording is automatically chunk‑uploaded to Riverside’s cloud during the session
. That means even if someone’s computer crashes, the already-recorded parts are safe. Implementing this ourselves means breaking the MediaRecorder output into small blobs and sending them via HTTPS or WebSocket to the server as we go.

Security & Compliance: Riverside is SOC 2 certified
. If Recora needs security guarantees, we may also aim for end‑to‑end encryption of streams, secure storage, and user auth.

Competitors and Alternatives
Several other platforms and tools cover similar ground. Surveying them helps inspire feature ideas and potential shortcuts:

Zencastr – A browser podcast recorder. Like Riverside, it uses local recording. It offers separate tracks for each guest (audio and video), up to 11 participants (10 guests + host)
, and records up to 4K video. It guarantees “distortion-free” audio by recording high-bitrate (16‑bit 48kHz) WAVs
. It has a free tier and is easy to use via a join link. (However, it lacks Riverside’s advanced editing or live-streaming features.)

SquadCast – A cloud recording studio popular with podcasters. It also records each user locally on the browser with separate tracks, then auto‑uploads them
. SquadCast’s FAQ confirms it supports up to 10 total people (1 host + 9 guests)
. It focuses on reliability: video is optional, audio is always 48kHz WAV, and sessions auto-save to cloud storage. SquadCast adds features like a “green room” for testing, team roles/permissions, and a “backstage” area for waiting participants
.

StreamYard – A browser-based live streaming studio. StreamYard emphasizes ease of use: guests join by link or even from a mobile device, and up to 6 people can be on camera. It shines at multistreaming: going live to Facebook, YouTube, LinkedIn, Twitter, Twitch, etc. simultaneously
. It also produces local recordings in the browser with separate audio/video files (so it, too, does local recording for quality). StreamYard includes branding tools (custom overlays, intro/outro videos, logos)
 and supports on-screen comments. It’s simpler than Riverside, focusing on live production; it does not auto-edit or host podcasts itself.

Podcastle / Castbox / Others – These tools combine some recording and hosting features. Podcastle, for example, offers browser recording and AI transcription. However, many are limited to audio or are phone-only.

OBS Studio – Open Broadcaster Software is a free desktop app for high-quality recording and streaming. It isn’t a multi-user platform, but as an open-source tool it’s often mentioned. OBS can record local sources (screen, mic, webcam) and stream to services via RTMP. Riverside’s blog even lists OBS as an example of local recording software
. For Recora, OBS itself isn’t a competitor (since it’s desktop-based), but the architecture idea (record locally, stream/record) is relevant.

Open-source WebRTC frameworks: For building Recora’s backend, tools like OpenVidu (commercial/open-source hybrid) or Janus/mediasoup SFUs can provide scalable WebRTC. OpenVidu (community edition) is an open-source WebRTC platform for video calls and recording
. Jitsi Meet is 100% open-source and can do conferencing (with Jibri it can record to a file or live-stream to YouTube). A relatively new project, plugNmeet, advertises AI features and scalability (built on modern WebRTC) – it’s fully open-source.

Podcast hosting platforms: On the hosting side, fully free solutions include Castopod
 – a self‑hosted podcast platform that supports RSS distribution, analytics, even micropayments. It’s open-source (AGPL) and lets you control your feed. Using Castopod (or software like Podcast Generator) could replace Riverside’s built-in host if we need a no-cost option.

Object storage and CDN: If we need to store large media files cheaply, open-source S3 alternatives like MinIO can be self‑hosted
. MinIO is a high-performance, S3-compatible object store under AGPLv3
. For free content delivery, a CDN like Cloudflare (free tier) can cache and serve video.

By studying these alternatives, we see that separate local tracks, easy guest access (no downloads), multi-destination streaming, and integrated editing are competitive advantages. We should at minimum match separate-track recording and multi‑stream, and consider linking to open platforms (e.g. allow streaming to any RTMP endpoint or to platforms via APIs).

Architecture Patterns (Local Recording & Uploads)
Riverside’s core innovation is its recording architecture. One write-up (by a WebRTC engineer) describes a typical pattern: send a low-latency stream over UDP for the live studio (no retransmission, so minimal delay) while simultaneously sending a high-quality stream over TCP to ensure no frames are lost
. In practice, we might simplify: each client’s browser uses the MediaRecorder API to capture local audio/video. In many designs:

P2P vs SFU: With few participants (2–3), you could do pure peer-to-peer, but that scales poorly. For 4–10 participants or 100+ viewers, an SFU (Selective Forwarding Unit) is needed. Tools like Janus or mediasoup relay all streams to each client. In our case, since we also do local recording, the SFU’s role is mostly to handle the live preview and streaming. For local recording, we may not rely on the SFU.

Local recording: Each client records itself (e.g. using two MediaRecorders: one for webcam + mic, one for screen share if any). As the session goes on, the browser generates chunks (blobs). We implement “progressive upload”: send each chunk to our server (via WebSocket or XHR) as soon as it’s ready. This matches Riverside’s description of uploading during recording
. On stop, ensure all chunks have arrived. The server (e.g. a Node.js backend) stitches the chunks together and stores the raw files.

Uploads and storage: For zero cost, we might let clients optionally upload recordings to a free tier (e.g. AWS S3 Free Tier or a self-hosted MinIO). Or we could store on our own disk. If the service scales, a cloud storage (S3 or MinIO) and CDN are smart.

Live streaming (simulcast): To let Recora “stream everywhere”, we can integrate RTMP. The browser can send a combined stream to an RTMP server (like Nginx+RTMP module or a service). Alternatively, our backend could receive individual tracks and use FFmpeg to mix and push to a given stream key. Tools like OBS do this in desktop apps, but in-browser RTMP is trickier. There exist JS libraries (or one can use WebRTC to ingest and then transcode with FFmpeg on server). In any case, enabling arbitrary RTMP destinations will allow multi-platform live.

Synchronization: After recording, the tracks from each participant must be synchronized in time. If we rely on the same “start recording” event, all browsers start at (approximately) the same time. We should also record timestamps or use syncing beacons. Riverside “automatically syncs tracks”
, likely using either timecodes or an initial sync handshake.

Backend tools: We will need a signalling server (for WebRTC), probably using WebSockets. If using a ready SFU (OpenVidu/Janus), that includes signaling. We may also need an STUN/TURN server (to traverse NATs). For free hosting, Coturn (open source) can act as a TURN server to avoid connection issues.

Editing backend: If we offer a web editor, transcripts can be generated via a speech-to-text library (e.g. OpenAI’s Whisper or a Hugging Face model). This is computation-heavy but could be done offline (or skip if out of scope). For simpler MVP, allow downloading the raw tracks and use external editors.

Scalability: Supporting hundreds or thousands of live viewers (as in a webinar) likely means having a separate live-broadcast architecture (e.g. stream to YouTube and embed it, rather than actually sending 1000 WebRTC streams). For Recora, we might primarily enable up to ~10 presenters and rely on social platforms for audience.

This architecture emphasizes open-source components (Node.js, coturn, Janus/mediasoup, FFmpeg, etc.) so we avoid licensing costs.

Cost-Saving Self-Hosted Components
Since Recora must be free to users (and likely low-cost to run), we should leverage as many free/open technologies as possible:

WebRTC and SFU: Use free/open SFUs like Janus or mediasoup, or even OpenVidu (CE)
. These let you run multi-party video with recording and are self-hostable (no per-minute fees). Coturn (free) for TURN.

Object Storage: For storing recordings, use an S3-compatible open source solution like MinIO
. MinIO can run on your server or a cloud VM, giving you scalable object storage at no extra cost beyond your server. If using cloud, the first ~5GB or some free tiers (AWS/GCP) might suffice for prototyping.

Podcast Hosting: Instead of paying for podcast hosting, Castopod
 is an open-source podcast publishing platform. It handles RSS feeds, directory submission, and even has analytics (IABv2) built-in. We could integrate Recora with Castopod: after recording/editing an episode, push it to Castopod (self-hosted) to distribute on Spotify/Apple/etc.

Server and CDN: Use a free-tier VPS (e.g. AWS/GCP/Azure free credits, Oracle Cloud always‑free, or even a low-cost DigitalOcean droplet). For static assets and videos, use Cloudflare’s free CDN.

Transcription/AI: Heavy AI (speech-to-text, translation) usually costs money. For a free solution, one could use open models like Whisper or DeepSpeech running on our own server/GPU (if available). This is optional; at minimum we could let users download and run their own transcripts. Text-based editing itself doesn’t require cloud AI; it’s just a UI feature.

Development Tools: Frameworks like React, Node.js, FFmpeg, and others are free. Leverage existing open libraries for WebRTC (e.g. Simple-Peer or PeerJS if building from scratch).

Avoid Proprietary APIs: For streaming, use generic RTMP (open standard). For scheduling emails (webinar reminders), we could use a free Mailgun/Twilio SendGrid trial. If integration with CRMs (like HubSpot) is needed, either skip or only integrate with their free APIs.

Web Server and Database: A simple Postgres or SQLite (open source) can manage user accounts, session info, and metadata. SQLite could even run serverless (files only) if the scale is tiny.

In short, Recora should be built on open protocols and self-hosted software, minimizing any per‑minute or per-use charges. All major features (WebRTC, media storage, RSS feeds) have free implementations available
.
```


---
## FILE: ARCHITECTURE.md

```md
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

```


---
## FILE: client/README.md

```md
# FlatMotion Client

A modern, next-generation frontend built with Next.js and React for AI-powered animation generation.

## Overview

FlatMotion Client is a sophisticated Next.js 16 application that provides real-time animation generation using AI. It features an intuitive interface for interacting with multiple AI providers, managing animation projects, and browsing a gallery of generated animations.

## Live Links

- Live Demo  : https://flat-motion.vercel.app
- Frontend   : https://flat-motion.vercel.app
- Backend    : https://flatmotion-server.onrender.com


## Features

- Multi-provider AI integration (Anthropic, Groq, Gemini, OpenRouter, HuggingFace)
- Real-time animation generation with progress tracking
- Project management with full CRUD operations
- Animation gallery with filtering and organization
- User authentication and profile management
- Admin dashboard for system monitoring
- Responsive design for mobile and desktop
- Dark theme with purple/cyan color gradient aesthetic
- Custom loading spinners and visual feedback

## Tech Stack

- Next.js 16 (React 19)
- TypeScript
- Tailwind CSS v4
- Shadcn/ui Component Library
- Lucide React Icons
- Better Auth for authentication
- Prisma (ORM, client-side queries)

## Getting Started

### Prerequisites

- Node.js 18.0 or higher
- npm or yarn package manager
- Backend server running on http://localhost:5000

### Installation

1. Navigate to the client directory:
```bash
cd client
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env.local` file with the following variables:
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

4. Start the development server:
```bash
npm run dev
```

5. Open http://localhost:3000 in your browser.

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `NEXT_PUBLIC_API_URL` | Backend API endpoint (must include /api) | Yes |
| `NEXT_PUBLIC_APP_URL` | Frontend application URL | No |

## Project Structure

```
client/
├── src/
│   ├── app/              # Next.js App Router pages
│   ├── components/       # React components
│   │   ├── ui/          # Shadcn/ui base components
│   │   ├── ai/          # AI chat and generation components
│   │   └── gallery/     # Gallery-related components
│   ├── hooks/           # Custom React hooks
│   ├── lib/             # Utilities and API client
│   └── styles/          # Global styles and CSS
├── public/              # Static assets
├── tsconfig.json        # TypeScript configuration
├── tailwind.config.ts   # Tailwind CSS configuration
└── next.config.ts       # Next.js configuration
```

## Key Pages and Routes

- `/` - Landing page with feature showcase
- `/login` - User authentication
- `/register` - Account creation
- `/dashboard` - Main AI animation generation canvas
- `/gallery` - Public animation gallery
- `/admin` - Admin dashboard (admin only)

## Core Components

- `ChatCanvas` - Main animation generation interface
- `ChatComposer` - Input form with AI provider and model selection
- `ProjectSidebar` - Project navigation and management
- `FlatMotionLogo` - Reusable branding logo component
- `LoadingSpinnerCustom` - Custom animated loading indicators
- `ProjectCreateDialog` - Modal for creating new projects

## Custom Hooks

- `useAuth()` - Authentication and user session management
- `useProjects()` - Project CRUD operations
- `useAnimationJobs()` - Animation generation and job tracking
- `useAIChat()` - AI provider and model selection state
- `useAPIKeyPersistence()` - Persist API keys in local storage

## API Integration

The client communicates with the backend through REST API endpoints defined in `src/lib/api.ts`.

### Authentication Endpoints

- `POST /auth/sign-up/email` - Register new user
- `POST /auth/sign-in/email` - Login user
- `GET /auth/get-session` - Fetch current user session

### AI Provider Endpoints

- `GET /ai/providers` - List all available AI providers
- `GET /ai/models?provider={name}` - Get models for specific provider
- `POST /ai/chat` - Generate animation from prompt

### Project Endpoints

- `POST /projects` - Create new project
- `GET /projects/user/{userId}` - Get user's projects
- `GET /projects/{id}` - Get specific project
- `PATCH /projects/{id}` - Update project
- `DELETE /projects/{id}` - Delete project

### Animation Endpoints

- `POST /animations/generate` - Start animation generation
- `GET /animations/{jobId}` - Get animation job status
- `GET /animations/project/{projectId}` - Get project animations
- `GET /animations/user/{userId}` - Get user's animations
- `DELETE /animations/{jobId}` - Delete animation job
- `PATCH /animations/{jobId}/regenerate` - Regenerate animation

### Admin Endpoints

- `GET /admin/stats` - Get system statistics
- `GET /admin/users` - List all users
- `GET /admin/projects` - List all projects
- `DELETE /admin/users/{id}` - Remove user
- `DELETE /admin/projects/{id}` - Remove project

## Design System

### Color Palette

- Primary: #7C3AED (Purple)
- Secondary: #06B6D4 (Cyan)
- Background: #0A0A0A
- Surface: #111111
- Success: #22C55E
- Warning: #F59E0B
- Error: #EF4444

### Custom Animations

- `animate-glowPulse` - Pulsing glow effect
- `animate-ctaGlowSoft` - Soft call-to-action glow
- `animate-ctaSweepSoft` - Sweep animation
- `animate-slow-drift` - Drifting animation
- `animate-bounce` - Bouncing dots for loading

### Typography

- Font Family: Plus Jakarta Sans (primary), Inter (fallback)
- Weights: 400, 500, 600, 700

## Building for Production

Compile the application:

```bash
npm run build
```

Start production server:

```bash
npm run start
```

Deploy to Vercel:

```bash
vercel deploy --prod
```

## Production Environment Variables

Set in your Vercel dashboard:

- `NEXT_PUBLIC_API_URL`: Production backend endpoint (e.g., https://api.flatmotion.com/api)
- `NEXT_PUBLIC_APP_URL`: Production frontend URL

## Performance Features

- Image optimization with Next.js Image component
- Automatic code splitting
- Tailwind CSS optimization
- API response caching
- Lazy-loaded components
- Optimized font loading

## Browser Compatibility

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Troubleshooting

### API Connection Errors

Verify:
1. Backend server is running
2. `NEXT_PUBLIC_API_URL` is correctly set
3. CORS is configured on backend
4. Network tab shows requests being made

### Authentication Issues

- Clear browser cookies and localStorage
- Restart development server
- Check token storage in localStorage
- Verify session is active

### Build Issues

Clear cache and reinstall:
```bash
rm -rf .next node_modules
npm install
npm run build
```

## Contributing

1. Create feature branch from `main`
2. Make changes with proper TypeScript types
3. Test locally before committing
4. Submit pull request

## License

Proprietary software. All rights reserved.

## Support

Contact: support@flatmotion.com

```


---
## FILE: client/components.json

```json
{
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "base-nova",
  "rsc": true,
  "tsx": true,
  "tailwind": {
    "config": "",
    "css": "src/app/globals.css",
    "baseColor": "neutral",
    "cssVariables": true,
    "prefix": ""
  },
  "iconLibrary": "lucide",
  "rtl": false,
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils",
    "ui": "@/components/ui",
    "lib": "@/lib",
    "hooks": "@/hooks"
  },
  "menuColor": "default",
  "menuAccent": "subtle",
  "registries": {}
}

```


---
## FILE: client/next-env.d.ts

```ts
/// <reference types="next" />
/// <reference types="next/image-types/global" />
import "./.next/dev/types/routes.d.ts";

// NOTE: This file should not be edited
// see https://nextjs.org/docs/app/api-reference/config/typescript for more information.

```


---
## FILE: client/next.config.ts

```ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
};

export default nextConfig;

```


---
## FILE: client/package-lock.json

```json
{
  "name": "client",
  "version": "0.1.0",
  "lockfileVersion": 3,
  "requires": true,
  "packages": {
    "": {
      "name": "client",
      "version": "0.1.0",
      "dependencies": {
        "@base-ui/react": "^1.3.0",
        "@livekit/components-react": "^2.9.20",
        "@livekit/components-styles": "^1.2.0",
        "@radix-ui/react-dialog": "^1.1.15",
        "better-auth": "^1.5.5",
        "class-variance-authority": "^0.7.1",
        "clsx": "^2.1.1",
        "dexie": "^4.4.2",
        "livekit-client": "^2.18.1",
        "lucide-react": "^1.6.0",
        "next": "16.2.0",
        "react": "19.2.4",
        "react-dom": "19.2.4",
        "shadcn": "^4.1.0",
        "sweetalert2": "^11.26.24",
        "tailwind-merge": "^3.5.0",
        "tw-animate-css": "^1.4.0"
      },
      "devDependencies": {
        "@tailwindcss/postcss": "^4",
        "@types/node": "^20",
        "@types/react": "^19",
        "@types/react-dom": "^19",
        "eslint": "^9",
        "eslint-config-next": "16.2.0",
        "tailwindcss": "^4",
        "typescript": "^5"
      }
    },
    "node_modules/@alloc/quick-lru": {
      "version": "5.2.0",
      "resolved": "https://registry.npmjs.org/@alloc/quick-lru/-/quick-lru-5.2.0.tgz",
      "integrity": "sha512-UrcABB+4bUrFABwbluTIBErXwvbsU/V7TZWfmbgJfbkwiBuziS9gxdODUyuiecfdGQ85jglMW6juS3+z5TsKLw==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=10"
      },
      "funding": {
        "url": "https://github.com/sponsors/sindresorhus"
      }
    },
    "node_modules/@babel/code-frame": {
      "version": "7.29.0",
      "resolved": "https://registry.npmjs.org/@babel/code-frame/-/code-frame-7.29.0.tgz",
      "integrity": "sha512-9NhCeYjq9+3uxgdtp20LSiJXJvN0FeCtNGpJxuMFZ1Kv3cWUNb6DOhJwUvcVCzKGR66cw4njwM6hrJLqgOwbcw==",
      "license": "MIT",
      "dependencies": {
        "@babel/helper-validator-identifier": "^7.28.5",
        "js-tokens": "^4.0.0",
        "picocolors": "^1.1.1"
      },
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/@babel/compat-data": {
      "version": "7.29.0",
      "resolved": "https://registry.npmjs.org/@babel/compat-data/-/compat-data-7.29.0.tgz",
      "integrity": "sha512-T1NCJqT/j9+cn8fvkt7jtwbLBfLC/1y1c7NtCeXFRgzGTsafi68MRv8yzkYSapBnFA6L3U2VSc02ciDzoAJhJg==",
      "license": "MIT",
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/@babel/core": {
      "version": "7.29.0",
      "resolved": "https://registry.npmjs.org/@babel/core/-/core-7.29.0.tgz",
      "integrity": "sha512-CGOfOJqWjg2qW/Mb6zNsDm+u5vFQ8DxXfbM09z69p5Z6+mE1ikP2jUXw+j42Pf1XTYED2Rni5f95npYeuwMDQA==",
      "license": "MIT",
      "dependencies": {
        "@babel/code-frame": "^7.29.0",
        "@babel/generator": "^7.29.0",
        "@babel/helper-compilation-targets": "^7.28.6",
        "@babel/helper-module-transforms": "^7.28.6",
        "@babel/helpers": "^7.28.6",
        "@babel/parser": "^7.29.0",
        "@babel/template": "^7.28.6",
        "@babel/traverse": "^7.29.0",
        "@babel/types": "^7.29.0",
        "@jridgewell/remapping": "^2.3.5",
        "convert-source-map": "^2.0.0",
        "debug": "^4.1.0",
        "gensync": "^1.0.0-beta.2",
        "json5": "^2.2.3",
        "semver": "^6.3.1"
      },
      "engines": {
        "node": ">=6.9.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/babel"
      }
    },
    "node_modules/@babel/generator": {
      "version": "7.29.1",
      "resolved": "https://registry.npmjs.org/@babel/generator/-/generator-7.29.1.tgz",
      "integrity": "sha512-qsaF+9Qcm2Qv8SRIMMscAvG4O3lJ0F1GuMo5HR/Bp02LopNgnZBC/EkbevHFeGs4ls/oPz9v+Bsmzbkbe+0dUw==",
      "license": "MIT",
      "dependencies": {
        "@babel/parser": "^7.29.0",
        "@babel/types": "^7.29.0",
        "@jridgewell/gen-mapping": "^0.3.12",
        "@jridgewell/trace-mapping": "^0.3.28",
        "jsesc": "^3.0.2"
      },
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/@babel/helper-annotate-as-pure": {
      "version": "7.27.3",
      "resolved": "https://registry.npmjs.org/@babel/helper-annotate-as-pure/-/helper-annotate-as-pure-7.27.3.tgz",
      "integrity": "sha512-fXSwMQqitTGeHLBC08Eq5yXz2m37E4pJX1qAU1+2cNedz/ifv/bVXft90VeSav5nFO61EcNgwr0aJxbyPaWBPg==",
      "license": "MIT",
      "dependencies": {
        "@babel/types": "^7.27.3"
      },
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/@babel/helper-compilation-targets": {
      "version": "7.28.6",
      "resolved": "https://registry.npmjs.org/@babel/helper-compilation-targets/-/helper-compilation-targets-7.28.6.tgz",
      "integrity": "sha512-JYtls3hqi15fcx5GaSNL7SCTJ2MNmjrkHXg4FSpOA/grxK8KwyZ5bubHsCq8FXCkua6xhuaaBit+3b7+VZRfcA==",
      "license": "MIT",
      "dependencies": {
        "@babel/compat-data": "^7.28.6",
        "@babel/helper-validator-option": "^7.27.1",
        "browserslist": "^4.24.0",
        "lru-cache": "^5.1.1",
        "semver": "^6.3.1"
      },
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/@babel/helper-create-class-features-plugin": {
      "version": "7.28.6",
      "resolved": "https://registry.npmjs.org/@babel/helper-create-class-features-plugin/-/helper-create-class-features-plugin-7.28.6.tgz",
      "integrity": "sha512-dTOdvsjnG3xNT9Y0AUg1wAl38y+4Rl4sf9caSQZOXdNqVn+H+HbbJ4IyyHaIqNR6SW9oJpA/RuRjsjCw2IdIow==",
      "license": "MIT",
      "dependencies": {
        "@babel/helper-annotate-as-pure": "^7.27.3",
        "@babel/helper-member-expression-to-functions": "^7.28.5",
        "@babel/helper-optimise-call-expression": "^7.27.1",
        "@babel/helper-replace-supers": "^7.28.6",
        "@babel/helper-skip-transparent-expression-wrappers": "^7.27.1",
        "@babel/traverse": "^7.28.6",
        "semver": "^6.3.1"
      },
      "engines": {
        "node": ">=6.9.0"
      },
      "peerDependencies": {
        "@babel/core": "^7.0.0"
      }
    },
    "node_modules/@babel/helper-globals": {
      "version": "7.28.0",
      "resolved": "https://registry.npmjs.org/@babel/helper-globals/-/helper-globals-7.28.0.tgz",
      "integrity": "sha512-+W6cISkXFa1jXsDEdYA8HeevQT/FULhxzR99pxphltZcVaugps53THCeiWA8SguxxpSp3gKPiuYfSWopkLQ4hw==",
      "license": "MIT",
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/@babel/helper-member-expression-to-functions": {
      "version": "7.28.5",
      "resolved": "https://registry.npmjs.org/@babel/helper-member-expression-to-functions/-/helper-member-expression-to-functions-7.28.5.tgz",
      "integrity": "sha512-cwM7SBRZcPCLgl8a7cY0soT1SptSzAlMH39vwiRpOQkJlh53r5hdHwLSCZpQdVLT39sZt+CRpNwYG4Y2v77atg==",
      "license": "MIT",
      "dependencies": {
        "@babel/traverse": "^7.28.5",
        "@babel/types": "^7.28.5"
      },
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/@babel/helper-module-imports": {
      "version": "7.28.6",
      "resolved": "https://registry.npmjs.org/@babel/helper-module-imports/-/helper-module-imports-7.28.6.tgz",
      "integrity": "sha512-l5XkZK7r7wa9LucGw9LwZyyCUscb4x37JWTPz7swwFE/0FMQAGpiWUZn8u9DzkSBWEcK25jmvubfpw2dnAMdbw==",
      "license": "MIT",
      "dependencies": {
        "@babel/traverse": "^7.28.6",
        "@babel/types": "^7.28.6"
      },
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/@babel/helper-module-transforms": {
      "version": "7.28.6",
      "resolved": "https://registry.npmjs.org/@babel/helper-module-transforms/-/helper-module-transforms-7.28.6.tgz",
      "integrity": "sha512-67oXFAYr2cDLDVGLXTEABjdBJZ6drElUSI7WKp70NrpyISso3plG9SAGEF6y7zbha/wOzUByWWTJvEDVNIUGcA==",
      "license": "MIT",
      "dependencies": {
        "@babel/helper-module-imports": "^7.28.6",
        "@babel/helper-validator-identifier": "^7.28.5",
        "@babel/traverse": "^7.28.6"
      },
      "engines": {
        "node": ">=6.9.0"
      },
      "peerDependencies": {
        "@babel/core": "^7.0.0"
      }
    },
    "node_modules/@babel/helper-optimise-call-expression": {
      "version": "7.27.1",
      "resolved": "https://registry.npmjs.org/@babel/helper-optimise-call-expression/-/helper-optimise-call-expression-7.27.1.tgz",
      "integrity": "sha512-URMGH08NzYFhubNSGJrpUEphGKQwMQYBySzat5cAByY1/YgIRkULnIy3tAMeszlL/so2HbeilYloUmSpd7GdVw==",
      "license": "MIT",
      "dependencies": {
        "@babel/types": "^7.27.1"
      },
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/@babel/helper-plugin-utils": {
      "version": "7.28.6",
      "resolved": "https://registry.npmjs.org/@babel/helper-plugin-utils/-/helper-plugin-utils-7.28.6.tgz",
      "integrity": "sha512-S9gzZ/bz83GRysI7gAD4wPT/AI3uCnY+9xn+Mx/KPs2JwHJIz1W8PZkg2cqyt3RNOBM8ejcXhV6y8Og7ly/Dug==",
      "license": "MIT",
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/@babel/helper-replace-supers": {
      "version": "7.28.6",
      "resolved": "https://registry.npmjs.org/@babel/helper-replace-supers/-/helper-replace-supers-7.28.6.tgz",
      "integrity": "sha512-mq8e+laIk94/yFec3DxSjCRD2Z0TAjhVbEJY3UQrlwVo15Lmt7C2wAUbK4bjnTs4APkwsYLTahXRraQXhb1WCg==",
      "license": "MIT",
      "dependencies": {
        "@babel/helper-member-expression-to-functions": "^7.28.5",
        "@babel/helper-optimise-call-expression": "^7.27.1",
        "@babel/traverse": "^7.28.6"
      },
      "engines": {
        "node": ">=6.9.0"
      },
      "peerDependencies": {
        "@babel/core": "^7.0.0"
      }
    },
    "node_modules/@babel/helper-skip-transparent-expression-wrappers": {
      "version": "7.27.1",
      "resolved": "https://registry.npmjs.org/@babel/helper-skip-transparent-expression-wrappers/-/helper-skip-transparent-expression-wrappers-7.27.1.tgz",
      "integrity": "sha512-Tub4ZKEXqbPjXgWLl2+3JpQAYBJ8+ikpQ2Ocj/q/r0LwE3UhENh7EUabyHjz2kCEsrRY83ew2DQdHluuiDQFzg==",
      "license": "MIT",
      "dependencies": {
        "@babel/traverse": "^7.27.1",
        "@babel/types": "^7.27.1"
      },
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/@babel/helper-string-parser": {
      "version": "7.27.1",
      "resolved": "https://registry.npmjs.org/@babel/helper-string-parser/-/helper-string-parser-7.27.1.tgz",
      "integrity": "sha512-qMlSxKbpRlAridDExk92nSobyDdpPijUq2DW6oDnUqd0iOGxmQjyqhMIihI9+zv4LPyZdRje2cavWPbCbWm3eA==",
      "license": "MIT",
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/@babel/helper-validator-identifier": {
      "version": "7.28.5",
      "resolved": "https://registry.npmjs.org/@babel/helper-validator-identifier/-/helper-validator-identifier-7.28.5.tgz",
      "integrity": "sha512-qSs4ifwzKJSV39ucNjsvc6WVHs6b7S03sOh2OcHF9UHfVPqWWALUsNUVzhSBiItjRZoLHx7nIarVjqKVusUZ1Q==",
      "license": "MIT",
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/@babel/helper-validator-option": {
      "version": "7.27.1",
      "resolved": "https://registry.npmjs.org/@babel/helper-validator-option/-/helper-validator-option-7.27.1.tgz",
      "integrity": "sha512-YvjJow9FxbhFFKDSuFnVCe2WxXk1zWc22fFePVNEaWJEu8IrZVlda6N0uHwzZrUM1il7NC9Mlp4MaJYbYd9JSg==",
      "license": "MIT",
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/@babel/helpers": {
      "version": "7.29.2",
      "resolved": "https://registry.npmjs.org/@babel/helpers/-/helpers-7.29.2.tgz",
      "integrity": "sha512-HoGuUs4sCZNezVEKdVcwqmZN8GoHirLUcLaYVNBK2J0DadGtdcqgr3BCbvH8+XUo4NGjNl3VOtSjEKNzqfFgKw==",
      "license": "MIT",
      "dependencies": {
        "@babel/template": "^7.28.6",
        "@babel/types": "^7.29.0"
      },
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/@babel/parser": {
      "version": "7.29.2",
      "resolved": "https://registry.npmjs.org/@babel/parser/-/parser-7.29.2.tgz",
      "integrity": "sha512-4GgRzy/+fsBa72/RZVJmGKPmZu9Byn8o4MoLpmNe1m8ZfYnz5emHLQz3U4gLud6Zwl0RZIcgiLD7Uq7ySFuDLA==",
      "license": "MIT",
      "dependencies": {
        "@babel/types": "^7.29.0"
      },
      "bin": {
        "parser": "bin/babel-parser.js"
      },
      "engines": {
        "node": ">=6.0.0"
      }
    },
    "node_modules/@babel/plugin-syntax-jsx": {
      "version": "7.28.6",
      "resolved": "https://registry.npmjs.org/@babel/plugin-syntax-jsx/-/plugin-syntax-jsx-7.28.6.tgz",
      "integrity": "sha512-wgEmr06G6sIpqr8YDwA2dSRTE3bJ+V0IfpzfSY3Lfgd7YWOaAdlykvJi13ZKBt8cZHfgH1IXN+CL656W3uUa4w==",
      "license": "MIT",
      "dependencies": {
        "@babel/helper-plugin-utils": "^7.28.6"
      },
      "engines": {
        "node": ">=6.9.0"
      },
      "peerDependencies": {
        "@babel/core": "^7.0.0-0"
      }
    },
    "node_modules/@babel/plugin-syntax-typescript": {
      "version": "7.28.6",
      "resolved": "https://registry.npmjs.org/@babel/plugin-syntax-typescript/-/plugin-syntax-typescript-7.28.6.tgz",
      "integrity": "sha512-+nDNmQye7nlnuuHDboPbGm00Vqg3oO8niRRL27/4LYHUsHYh0zJ1xWOz0uRwNFmM1Avzk8wZbc6rdiYhomzv/A==",
      "license": "MIT",
      "dependencies": {
        "@babel/helper-plugin-utils": "^7.28.6"
      },
      "engines": {
        "node": ">=6.9.0"
      },
      "peerDependencies": {
        "@babel/core": "^7.0.0-0"
      }
    },
    "node_modules/@babel/plugin-transform-modules-commonjs": {
      "version": "7.28.6",
      "resolved": "https://registry.npmjs.org/@babel/plugin-transform-modules-commonjs/-/plugin-transform-modules-commonjs-7.28.6.tgz",
      "integrity": "sha512-jppVbf8IV9iWWwWTQIxJMAJCWBuuKx71475wHwYytrRGQ2CWiDvYlADQno3tcYpS/T2UUWFQp3nVtYfK/YBQrA==",
      "license": "MIT",
      "dependencies": {
        "@babel/helper-module-transforms": "^7.28.6",
        "@babel/helper-plugin-utils": "^7.28.6"
      },
      "engines": {
        "node": ">=6.9.0"
      },
      "peerDependencies": {
        "@babel/core": "^7.0.0-0"
      }
    },
    "node_modules/@babel/plugin-transform-typescript": {
      "version": "7.28.6",
      "resolved": "https://registry.npmjs.org/@babel/plugin-transform-typescript/-/plugin-transform-typescript-7.28.6.tgz",
      "integrity": "sha512-0YWL2RFxOqEm9Efk5PvreamxPME8OyY0wM5wh5lHjF+VtVhdneCWGzZeSqzOfiobVqQaNCd2z0tQvnI9DaPWPw==",
      "license": "MIT",
      "dependencies": {
        "@babel/helper-annotate-as-pure": "^7.27.3",
        "@babel/helper-create-class-features-plugin": "^7.28.6",
        "@babel/helper-plugin-utils": "^7.28.6",
        "@babel/helper-skip-transparent-expression-wrappers": "^7.27.1",
        "@babel/plugin-syntax-typescript": "^7.28.6"
      },
      "engines": {
        "node": ">=6.9.0"
      },
      "peerDependencies": {
        "@babel/core": "^7.0.0-0"
      }
    },
    "node_modules/@babel/preset-typescript": {
      "version": "7.28.5",
      "resolved": "https://registry.npmjs.org/@babel/preset-typescript/-/preset-typescript-7.28.5.tgz",
      "integrity": "sha512-+bQy5WOI2V6LJZpPVxY+yp66XdZ2yifu0Mc1aP5CQKgjn4QM5IN2i5fAZ4xKop47pr8rpVhiAeu+nDQa12C8+g==",
      "license": "MIT",
      "dependencies": {
        "@babel/helper-plugin-utils": "^7.27.1",
        "@babel/helper-validator-option": "^7.27.1",
        "@babel/plugin-syntax-jsx": "^7.27.1",
        "@babel/plugin-transform-modules-commonjs": "^7.27.1",
        "@babel/plugin-transform-typescript": "^7.28.5"
      },
      "engines": {
        "node": ">=6.9.0"
      },
      "peerDependencies": {
        "@babel/core": "^7.0.0-0"
      }
    },
    "node_modules/@babel/runtime": {
      "version": "7.29.2",
      "resolved": "https://registry.npmjs.org/@babel/runtime/-/runtime-7.29.2.tgz",
      "integrity": "sha512-JiDShH45zKHWyGe4ZNVRrCjBz8Nh9TMmZG1kh4QTK8hCBTWBi8Da+i7s1fJw7/lYpM4ccepSNfqzZ/QvABBi5g==",
      "license": "MIT",
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/@babel/template": {
      "version": "7.28.6",
      "resolved": "https://registry.npmjs.org/@babel/template/-/template-7.28.6.tgz",
      "integrity": "sha512-YA6Ma2KsCdGb+WC6UpBVFJGXL58MDA6oyONbjyF/+5sBgxY/dwkhLogbMT2GXXyU84/IhRw/2D1Os1B/giz+BQ==",
      "license": "MIT",
      "dependencies": {
        "@babel/code-frame": "^7.28.6",
        "@babel/parser": "^7.28.6",
        "@babel/types": "^7.28.6"
      },
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/@babel/traverse": {
      "version": "7.29.0",
      "resolved": "https://registry.npmjs.org/@babel/traverse/-/traverse-7.29.0.tgz",
      "integrity": "sha512-4HPiQr0X7+waHfyXPZpWPfWL/J7dcN1mx9gL6WdQVMbPnF3+ZhSMs8tCxN7oHddJE9fhNE7+lxdnlyemKfJRuA==",
      "license": "MIT",
      "dependencies": {
        "@babel/code-frame": "^7.29.0",
        "@babel/generator": "^7.29.0",
        "@babel/helper-globals": "^7.28.0",
        "@babel/parser": "^7.29.0",
        "@babel/template": "^7.28.6",
        "@babel/types": "^7.29.0",
        "debug": "^4.3.1"
      },
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/@babel/types": {
      "version": "7.29.0",
      "resolved": "https://registry.npmjs.org/@babel/types/-/types-7.29.0.tgz",
      "integrity": "sha512-LwdZHpScM4Qz8Xw2iKSzS+cfglZzJGvofQICy7W7v4caru4EaAmyUuO6BGrbyQ2mYV11W0U8j5mBhd14dd3B0A==",
      "license": "MIT",
      "dependencies": {
        "@babel/helper-string-parser": "^7.27.1",
        "@babel/helper-validator-identifier": "^7.28.5"
      },
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/@base-ui/react": {
      "version": "1.3.0",
      "resolved": "https://registry.npmjs.org/@base-ui/react/-/react-1.3.0.tgz",
      "integrity": "sha512-FwpKqZbPz14AITp1CVgf4AjhKPe1OeeVKSBMdgD10zbFlj3QSWelmtCMLi2+/PFZZcIm3l87G7rwtCZJwHyXWA==",
      "license": "MIT",
      "dependencies": {
        "@babel/runtime": "^7.28.6",
        "@base-ui/utils": "0.2.6",
        "@floating-ui/react-dom": "^2.1.8",
        "@floating-ui/utils": "^0.2.11",
        "tabbable": "^6.4.0",
        "use-sync-external-store": "^1.6.0"
      },
      "engines": {
        "node": ">=14.0.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/mui-org"
      },
      "peerDependencies": {
        "@types/react": "^17 || ^18 || ^19",
        "react": "^17 || ^18 || ^19",
        "react-dom": "^17 || ^18 || ^19"
      },
      "peerDependenciesMeta": {
        "@types/react": {
          "optional": true
        }
      }
    },
    "node_modules/@base-ui/utils": {
      "version": "0.2.6",
      "resolved": "https://registry.npmjs.org/@base-ui/utils/-/utils-0.2.6.tgz",
      "integrity": "sha512-yQ+qeuqohwhsNpoYDqqXaLllYAkPCP4vYdDrVo8FQXaAPfHWm1pG/Vm+jmGTA5JFS0BAIjookyapuJFY8F9PIw==",
      "license": "MIT",
      "dependencies": {
        "@babel/runtime": "^7.28.6",
        "@floating-ui/utils": "^0.2.11",
        "reselect": "^5.1.1",
        "use-sync-external-store": "^1.6.0"
      },
      "peerDependencies": {
        "@types/react": "^17 || ^18 || ^19",
        "react": "^17 || ^18 || ^19",
        "react-dom": "^17 || ^18 || ^19"
      },
      "peerDependenciesMeta": {
        "@types/react": {
          "optional": true
        }
      }
    },
    "node_modules/@better-auth/core": {
      "version": "1.5.5",
      "resolved": "https://registry.npmjs.org/@better-auth/core/-/core-1.5.5.tgz",
      "integrity": "sha512-1oR/2jAp821Dcf67kQYHUoyNcdc1TcShfw4QMK0YTVntuRES5mUOyvEJql5T6eIuLfaqaN4LOF78l0FtF66HXA==",
      "license": "MIT",
      "dependencies": {
        "@standard-schema/spec": "^1.1.0",
        "zod": "^4.3.6"
      },
      "peerDependencies": {
        "@better-auth/utils": "0.3.1",
        "@better-fetch/fetch": "1.1.21",
        "@cloudflare/workers-types": ">=4",
        "better-call": "1.3.2",
        "jose": "^6.1.0",
        "kysely": "^0.28.5",
        "nanostores": "^1.0.1"
      },
      "peerDependenciesMeta": {
        "@cloudflare/workers-types": {
          "optional": true
        }
      }
    },
    "node_modules/@better-auth/drizzle-adapter": {
      "version": "1.5.5",
      "resolved": "https://registry.npmjs.org/@better-auth/drizzle-adapter/-/drizzle-adapter-1.5.5.tgz",
      "integrity": "sha512-HAi9xAP40oDt48QZeYBFTcmg3vt1Jik90GwoRIfangd7VGbxesIIDBJSnvwMbZ52GBIc6+V4FRw9lasNiNrPfw==",
      "license": "MIT",
      "peerDependencies": {
        "@better-auth/core": "1.5.5",
        "@better-auth/utils": "^0.3.0",
        "drizzle-orm": ">=0.41.0"
      },
      "peerDependenciesMeta": {
        "drizzle-orm": {
          "optional": true
        }
      }
    },
    "node_modules/@better-auth/kysely-adapter": {
      "version": "1.5.5",
      "resolved": "https://registry.npmjs.org/@better-auth/kysely-adapter/-/kysely-adapter-1.5.5.tgz",
      "integrity": "sha512-LmHffIVnqbfsxcxckMOoE8MwibWrbVFch+kwPKJ5OFDFv6lin75ufN7ZZ7twH0IMPLT/FcgzaRjP8jRrXRef9g==",
      "license": "MIT",
      "peerDependencies": {
        "@better-auth/core": "1.5.5",
        "@better-auth/utils": "^0.3.0",
        "kysely": "^0.27.0 || ^0.28.0"
      }
    },
    "node_modules/@better-auth/memory-adapter": {
      "version": "1.5.5",
      "resolved": "https://registry.npmjs.org/@better-auth/memory-adapter/-/memory-adapter-1.5.5.tgz",
      "integrity": "sha512-4X0j1/2L+nsgmObjmy9xEGUFWUv38Qjthp558fwS3DAp6ueWWyCaxaD6VJZ7m5qPNMrsBStO5WGP8CmJTEWm7g==",
      "license": "MIT",
      "peerDependencies": {
        "@better-auth/core": "1.5.5",
        "@better-auth/utils": "^0.3.0"
      }
    },
    "node_modules/@better-auth/mongo-adapter": {
      "version": "1.5.5",
      "resolved": "https://registry.npmjs.org/@better-auth/mongo-adapter/-/mongo-adapter-1.5.5.tgz",
      "integrity": "sha512-P1J9ljL5X5k740I8Rx1esPWNgWYPdJR5hf2CY7BwDSrQFPUHuzeCg0YhtEEP55niNateTXhBqGAcy0fVOeamZg==",
      "license": "MIT",
      "peerDependencies": {
        "@better-auth/core": "1.5.5",
        "@better-auth/utils": "^0.3.0",
        "mongodb": "^6.0.0 || ^7.0.0"
      }
    },
    "node_modules/@better-auth/prisma-adapter": {
      "version": "1.5.5",
      "resolved": "https://registry.npmjs.org/@better-auth/prisma-adapter/-/prisma-adapter-1.5.5.tgz",
      "integrity": "sha512-CliDd78CXHzzwQIXhCdwGr5Ml53i6JdCHWV7PYwTIJz9EAm6qb2RVBdpP3nqEfNjINGM22A6gfleCgCdZkTIZg==",
      "license": "MIT",
      "peerDependencies": {
        "@better-auth/core": "1.5.5",
        "@better-auth/utils": "^0.3.0",
        "@prisma/client": "^5.0.0 || ^6.0.0 || ^7.0.0",
        "prisma": "^5.0.0 || ^6.0.0 || ^7.0.0"
      },
      "peerDependenciesMeta": {
        "@prisma/client": {
          "optional": true
        },
        "prisma": {
          "optional": true
        }
      }
    },
    "node_modules/@better-auth/telemetry": {
      "version": "1.5.5",
      "resolved": "https://registry.npmjs.org/@better-auth/telemetry/-/telemetry-1.5.5.tgz",
      "integrity": "sha512-1+lklxArn4IMHuU503RcPdXrSG2tlXt4jnGG3omolmspQ7tktg/Y9XO/yAkYDurtvMn1xJ8X1Ov01Ji/r5s9BQ==",
      "license": "MIT",
      "dependencies": {
        "@better-auth/utils": "0.3.1",
        "@better-fetch/fetch": "1.1.21"
      },
      "peerDependencies": {
        "@better-auth/core": "1.5.5"
      }
    },
    "node_modules/@better-auth/utils": {
      "version": "0.3.1",
      "resolved": "https://registry.npmjs.org/@better-auth/utils/-/utils-0.3.1.tgz",
      "integrity": "sha512-+CGp4UmZSUrHHnpHhLPYu6cV+wSUSvVbZbNykxhUDocpVNTo9uFFxw/NqJlh1iC4wQ9HKKWGCKuZ5wUgS0v6Kg==",
      "license": "MIT"
    },
    "node_modules/@better-fetch/fetch": {
      "version": "1.1.21",
      "resolved": "https://registry.npmjs.org/@better-fetch/fetch/-/fetch-1.1.21.tgz",
      "integrity": "sha512-/ImESw0sskqlVR94jB+5+Pxjf+xBwDZF/N5+y2/q4EqD7IARUTSpPfIo8uf39SYpCxyOCtbyYpUrZ3F/k0zT4A=="
    },
    "node_modules/@bufbuild/protobuf": {
      "version": "1.10.1",
      "resolved": "https://registry.npmjs.org/@bufbuild/protobuf/-/protobuf-1.10.1.tgz",
      "integrity": "sha512-wJ8ReQbHxsAfXhrf9ixl0aYbZorRuOWpBNzm8pL8ftmSxQx/wnJD5Eg861NwJU/czy2VXFIebCeZnZrI9rktIQ==",
      "license": "(Apache-2.0 AND BSD-3-Clause)"
    },
    "node_modules/@dotenvx/dotenvx": {
      "version": "1.57.2",
      "resolved": "https://registry.npmjs.org/@dotenvx/dotenvx/-/dotenvx-1.57.2.tgz",
      "integrity": "sha512-lv9+UZPnl/KOvShepevLWm3+/wc1It5kgO5Q580evnvOFMZcgKVEYFwxlL7Ohl9my1yjTsWo28N3PJYUEO8wFQ==",
      "license": "BSD-3-Clause",
      "dependencies": {
        "commander": "^11.1.0",
        "dotenv": "^17.2.1",
        "eciesjs": "^0.4.10",
        "execa": "^5.1.1",
        "fdir": "^6.2.0",
        "ignore": "^5.3.0",
        "object-treeify": "1.1.33",
        "picomatch": "^4.0.2",
        "which": "^4.0.0"
      },
      "bin": {
        "dotenvx": "src/cli/dotenvx.js"
      },
      "funding": {
        "url": "https://dotenvx.com"
      }
    },
    "node_modules/@dotenvx/dotenvx/node_modules/commander": {
      "version": "11.1.0",
      "resolved": "https://registry.npmjs.org/commander/-/commander-11.1.0.tgz",
      "integrity": "sha512-yPVavfyCcRhmorC7rWlkHn15b4wDVgVmBA7kV4QVBsF7kv/9TKJAbAXVTxvTnwP8HHKjRCJDClKbciiYS7p0DQ==",
      "license": "MIT",
      "engines": {
        "node": ">=16"
      }
    },
    "node_modules/@dotenvx/dotenvx/node_modules/execa": {
      "version": "5.1.1",
      "resolved": "https://registry.npmjs.org/execa/-/execa-5.1.1.tgz",
      "integrity": "sha512-8uSpZZocAZRBAPIEINJj3Lo9HyGitllczc27Eh5YYojjMFMn8yHMDMaUHE2Jqfq05D/wucwI4JGURyXt1vchyg==",
      "license": "MIT",
      "dependencies": {
        "cross-spawn": "^7.0.3",
        "get-stream": "^6.0.0",
        "human-signals": "^2.1.0",
        "is-stream": "^2.0.0",
        "merge-stream": "^2.0.0",
        "npm-run-path": "^4.0.1",
        "onetime": "^5.1.2",
        "signal-exit": "^3.0.3",
        "strip-final-newline": "^2.0.0"
      },
      "engines": {
        "node": ">=10"
      },
      "funding": {
        "url": "https://github.com/sindresorhus/execa?sponsor=1"
      }
    },
    "node_modules/@dotenvx/dotenvx/node_modules/fdir": {
      "version": "6.5.0",
      "resolved": "https://registry.npmjs.org/fdir/-/fdir-6.5.0.tgz",
      "integrity": "sha512-tIbYtZbucOs0BRGqPJkshJUYdL+SDH7dVM8gjy+ERp3WAUjLEFJE+02kanyHtwjWOnwrKYBiwAmM0p4kLJAnXg==",
      "license": "MIT",
      "engines": {
        "node": ">=12.0.0"
      },
      "peerDependencies": {
        "picomatch": "^3 || ^4"
      },
      "peerDependenciesMeta": {
        "picomatch": {
          "optional": true
        }
      }
    },
    "node_modules/@dotenvx/dotenvx/node_modules/get-stream": {
      "version": "6.0.1",
      "resolved": "https://registry.npmjs.org/get-stream/-/get-stream-6.0.1.tgz",
      "integrity": "sha512-ts6Wi+2j3jQjqi70w5AlN8DFnkSwC+MqmxEzdEALB2qXZYV3X/b1CTfgPLGJNMeAWxdPfU8FO1ms3NUfaHCPYg==",
      "license": "MIT",
      "engines": {
        "node": ">=10"
      },
      "funding": {
        "url": "https://github.com/sponsors/sindresorhus"
      }
    },
    "node_modules/@dotenvx/dotenvx/node_modules/human-signals": {
      "version": "2.1.0",
      "resolved": "https://registry.npmjs.org/human-signals/-/human-signals-2.1.0.tgz",
      "integrity": "sha512-B4FFZ6q/T2jhhksgkbEW3HBvWIfDW85snkQgawt07S7J5QXTk6BkNV+0yAeZrM5QpMAdYlocGoljn0sJ/WQkFw==",
      "license": "Apache-2.0",
      "engines": {
        "node": ">=10.17.0"
      }
    },
    "node_modules/@dotenvx/dotenvx/node_modules/is-stream": {
      "version": "2.0.1",
      "resolved": "https://registry.npmjs.org/is-stream/-/is-stream-2.0.1.tgz",
      "integrity": "sha512-hFoiJiTl63nn+kstHGBtewWSKnQLpyb155KHheA1l39uvtO9nWIop1p3udqPcUd/xbF1VLMO4n7OI6p7RbngDg==",
      "license": "MIT",
      "engines": {
        "node": ">=8"
      },
      "funding": {
        "url": "https://github.com/sponsors/sindresorhus"
      }
    },
    "node_modules/@dotenvx/dotenvx/node_modules/isexe": {
      "version": "3.1.5",
      "resolved": "https://registry.npmjs.org/isexe/-/isexe-3.1.5.tgz",
      "integrity": "sha512-6B3tLtFqtQS4ekarvLVMZ+X+VlvQekbe4taUkf/rhVO3d/h0M2rfARm/pXLcPEsjjMsFgrFgSrhQIxcSVrBz8w==",
      "license": "BlueOak-1.0.0",
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/@dotenvx/dotenvx/node_modules/npm-run-path": {
      "version": "4.0.1",
      "resolved": "https://registry.npmjs.org/npm-run-path/-/npm-run-path-4.0.1.tgz",
      "integrity": "sha512-S48WzZW777zhNIrn7gxOlISNAqi9ZC/uQFnRdbeIHhZhCA6UqpkOT8T1G7BvfdgP4Er8gF4sUbaS0i7QvIfCWw==",
      "license": "MIT",
      "dependencies": {
        "path-key": "^3.0.0"
      },
      "engines": {
        "node": ">=8"
      }
    },
    "node_modules/@dotenvx/dotenvx/node_modules/onetime": {
      "version": "5.1.2",
      "resolved": "https://registry.npmjs.org/onetime/-/onetime-5.1.2.tgz",
      "integrity": "sha512-kbpaSSGJTWdAY5KPVeMOKXSrPtr8C8C7wodJbcsd51jRnmD+GZu8Y0VoU6Dm5Z4vWr0Ig/1NKuWRKf7j5aaYSg==",
      "license": "MIT",
      "dependencies": {
        "mimic-fn": "^2.1.0"
      },
      "engines": {
        "node": ">=6"
      },
      "funding": {
        "url": "https://github.com/sponsors/sindresorhus"
      }
    },
    "node_modules/@dotenvx/dotenvx/node_modules/picomatch": {
      "version": "4.0.4",
      "resolved": "https://registry.npmjs.org/picomatch/-/picomatch-4.0.4.tgz",
      "integrity": "sha512-QP88BAKvMam/3NxH6vj2o21R6MjxZUAd6nlwAS/pnGvN9IVLocLHxGYIzFhg6fUQ+5th6P4dv4eW9jX3DSIj7A==",
      "license": "MIT",
      "engines": {
        "node": ">=12"
      },
      "funding": {
        "url": "https://github.com/sponsors/jonschlinkert"
      }
    },
    "node_modules/@dotenvx/dotenvx/node_modules/signal-exit": {
      "version": "3.0.7",
      "resolved": "https://registry.npmjs.org/signal-exit/-/signal-exit-3.0.7.tgz",
      "integrity": "sha512-wnD2ZE+l+SPC/uoS0vXeE9L1+0wuaMqKlfz9AMUo38JsyLSBWSFcHR1Rri62LZc12vLr1gb3jl7iwQhgwpAbGQ==",
      "license": "ISC"
    },
    "node_modules/@dotenvx/dotenvx/node_modules/strip-final-newline": {
      "version": "2.0.0",
      "resolved": "https://registry.npmjs.org/strip-final-newline/-/strip-final-newline-2.0.0.tgz",
      "integrity": "sha512-BrpvfNAE3dcvq7ll3xVumzjKjZQ5tI1sEUIKr3Uoks0XUl45St3FlatVqef9prk4jRDzhW6WZg+3bk93y6pLjA==",
      "license": "MIT",
      "engines": {
        "node": ">=6"
      }
    },
    "node_modules/@dotenvx/dotenvx/node_modules/which": {
      "version": "4.0.0",
      "resolved": "https://registry.npmjs.org/which/-/which-4.0.0.tgz",
      "integrity": "sha512-GlaYyEb07DPxYCKhKzplCWBJtvxZcZMrL+4UkrTSJHHPyZU4mYYTv3qaOe77H7EODLSSopAUFAc6W8U4yqvscg==",
      "license": "ISC",
      "dependencies": {
        "isexe": "^3.1.1"
      },
      "bin": {
        "node-which": "bin/which.js"
      },
      "engines": {
        "node": "^16.13.0 || >=18.0.0"
      }
    },
    "node_modules/@emnapi/core": {
      "version": "1.9.0",
      "resolved": "https://registry.npmjs.org/@emnapi/core/-/core-1.9.0.tgz",
      "integrity": "sha512-0DQ98G9ZQZOxfUcQn1waV2yS8aWdZ6kJMbYCJB3oUBecjWYO1fqJ+a1DRfPF3O5JEkwqwP1A9QEN/9mYm2Yd0w==",
      "dev": true,
      "license": "MIT",
      "optional": true,
      "dependencies": {
        "@emnapi/wasi-threads": "1.2.0",
        "tslib": "^2.4.0"
      }
    },
    "node_modules/@emnapi/runtime": {
      "version": "1.9.0",
      "resolved": "https://registry.npmjs.org/@emnapi/runtime/-/runtime-1.9.0.tgz",
      "integrity": "sha512-QN75eB0IH2ywSpRpNddCRfQIhmJYBCJ1x5Lb3IscKAL8bMnVAKnRg8dCoXbHzVLLH7P38N2Z3mtulB7W0J0FKw==",
      "license": "MIT",
      "optional": true,
      "dependencies": {
        "tslib": "^2.4.0"
      }
    },
    "node_modules/@emnapi/wasi-threads": {
      "version": "1.2.0",
      "resolved": "https://registry.npmjs.org/@emnapi/wasi-threads/-/wasi-threads-1.2.0.tgz",
      "integrity": "sha512-N10dEJNSsUx41Z6pZsXU8FjPjpBEplgH24sfkmITrBED1/U2Esum9F3lfLrMjKHHjmi557zQn7kR9R+XWXu5Rg==",
      "dev": true,
      "license": "MIT",
      "optional": true,
      "dependencies": {
        "tslib": "^2.4.0"
      }
    },
    "node_modules/@eslint-community/eslint-utils": {
      "version": "4.9.1",
      "resolved": "https://registry.npmjs.org/@eslint-community/eslint-utils/-/eslint-utils-4.9.1.tgz",
      "integrity": "sha512-phrYmNiYppR7znFEdqgfWHXR6NCkZEK7hwWDHZUjit/2/U0r6XvkDl0SYnoM51Hq7FhCGdLDT6zxCCOY1hexsQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "eslint-visitor-keys": "^3.4.3"
      },
      "engines": {
        "node": "^12.22.0 || ^14.17.0 || >=16.0.0"
      },
      "funding": {
        "url": "https://opencollective.com/eslint"
      },
      "peerDependencies": {
        "eslint": "^6.0.0 || ^7.0.0 || >=8.0.0"
      }
    },
    "node_modules/@eslint-community/eslint-utils/node_modules/eslint-visitor-keys": {
      "version": "3.4.3",
      "resolved": "https://registry.npmjs.org/eslint-visitor-keys/-/eslint-visitor-keys-3.4.3.tgz",
      "integrity": "sha512-wpc+LXeiyiisxPlEkUzU6svyS1frIO3Mgxj1fdy7Pm8Ygzguax2N3Fa/D/ag1WqbOprdI+uY6wMUl8/a2G+iag==",
      "dev": true,
      "license": "Apache-2.0",
      "engines": {
        "node": "^12.22.0 || ^14.17.0 || >=16.0.0"
      },
      "funding": {
        "url": "https://opencollective.com/eslint"
      }
    },
    "node_modules/@eslint-community/regexpp": {
      "version": "4.12.2",
      "resolved": "https://registry.npmjs.org/@eslint-community/regexpp/-/regexpp-4.12.2.tgz",
      "integrity": "sha512-EriSTlt5OC9/7SXkRSCAhfSxxoSUgBm33OH+IkwbdpgoqsSsUg7y3uh+IICI/Qg4BBWr3U2i39RpmycbxMq4ew==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": "^12.0.0 || ^14.0.0 || >=16.0.0"
      }
    },
    "node_modules/@eslint/config-array": {
      "version": "0.21.2",
      "resolved": "https://registry.npmjs.org/@eslint/config-array/-/config-array-0.21.2.tgz",
      "integrity": "sha512-nJl2KGTlrf9GjLimgIru+V/mzgSK0ABCDQRvxw5BjURL7WfH5uoWmizbH7QB6MmnMBd8cIC9uceWnezL1VZWWw==",
      "dev": true,
      "license": "Apache-2.0",
      "dependencies": {
        "@eslint/object-schema": "^2.1.7",
        "debug": "^4.3.1",
        "minimatch": "^3.1.5"
      },
      "engines": {
        "node": "^18.18.0 || ^20.9.0 || >=21.1.0"
      }
    },
    "node_modules/@eslint/config-helpers": {
      "version": "0.4.2",
      "resolved": "https://registry.npmjs.org/@eslint/config-helpers/-/config-helpers-0.4.2.tgz",
      "integrity": "sha512-gBrxN88gOIf3R7ja5K9slwNayVcZgK6SOUORm2uBzTeIEfeVaIhOpCtTox3P6R7o2jLFwLFTLnC7kU/RGcYEgw==",
      "dev": true,
      "license": "Apache-2.0",
      "dependencies": {
        "@eslint/core": "^0.17.0"
      },
      "engines": {
        "node": "^18.18.0 || ^20.9.0 || >=21.1.0"
      }
    },
    "node_modules/@eslint/core": {
      "version": "0.17.0",
      "resolved": "https://registry.npmjs.org/@eslint/core/-/core-0.17.0.tgz",
      "integrity": "sha512-yL/sLrpmtDaFEiUj1osRP4TI2MDz1AddJL+jZ7KSqvBuliN4xqYY54IfdN8qD8Toa6g1iloph1fxQNkjOxrrpQ==",
      "dev": true,
      "license": "Apache-2.0",
      "dependencies": {
        "@types/json-schema": "^7.0.15"
      },
      "engines": {
        "node": "^18.18.0 || ^20.9.0 || >=21.1.0"
      }
    },
    "node_modules/@eslint/eslintrc": {
      "version": "3.3.5",
      "resolved": "https://registry.npmjs.org/@eslint/eslintrc/-/eslintrc-3.3.5.tgz",
      "integrity": "sha512-4IlJx0X0qftVsN5E+/vGujTRIFtwuLbNsVUe7TO6zYPDR1O6nFwvwhIKEKSrl6dZchmYBITazxKoUYOjdtjlRg==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "ajv": "^6.14.0",
        "debug": "^4.3.2",
        "espree": "^10.0.1",
        "globals": "^14.0.0",
        "ignore": "^5.2.0",
        "import-fresh": "^3.2.1",
        "js-yaml": "^4.1.1",
        "minimatch": "^3.1.5",
        "strip-json-comments": "^3.1.1"
      },
      "engines": {
        "node": "^18.18.0 || ^20.9.0 || >=21.1.0"
      },
      "funding": {
        "url": "https://opencollective.com/eslint"
      }
    },
    "node_modules/@eslint/js": {
      "version": "9.39.4",
      "resolved": "https://registry.npmjs.org/@eslint/js/-/js-9.39.4.tgz",
      "integrity": "sha512-nE7DEIchvtiFTwBw4Lfbu59PG+kCofhjsKaCWzxTpt4lfRjRMqG6uMBzKXuEcyXhOHoUp9riAm7/aWYGhXZ9cw==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": "^18.18.0 || ^20.9.0 || >=21.1.0"
      },
      "funding": {
        "url": "https://eslint.org/donate"
      }
    },
    "node_modules/@eslint/object-schema": {
      "version": "2.1.7",
      "resolved": "https://registry.npmjs.org/@eslint/object-schema/-/object-schema-2.1.7.tgz",
      "integrity": "sha512-VtAOaymWVfZcmZbp6E2mympDIHvyjXs/12LqWYjVw6qjrfF+VK+fyG33kChz3nnK+SU5/NeHOqrTEHS8sXO3OA==",
      "dev": true,
      "license": "Apache-2.0",
      "engines": {
        "node": "^18.18.0 || ^20.9.0 || >=21.1.0"
      }
    },
    "node_modules/@eslint/plugin-kit": {
      "version": "0.4.1",
      "resolved": "https://registry.npmjs.org/@eslint/plugin-kit/-/plugin-kit-0.4.1.tgz",
      "integrity": "sha512-43/qtrDUokr7LJqoF2c3+RInu/t4zfrpYdoSDfYyhg52rwLV6TnOvdG4fXm7IkSB3wErkcmJS9iEhjVtOSEjjA==",
      "dev": true,
      "license": "Apache-2.0",
      "dependencies": {
        "@eslint/core": "^0.17.0",
        "levn": "^0.4.1"
      },
      "engines": {
        "node": "^18.18.0 || ^20.9.0 || >=21.1.0"
      }
    },
    "node_modules/@floating-ui/core": {
      "version": "1.7.5",
      "resolved": "https://registry.npmjs.org/@floating-ui/core/-/core-1.7.5.tgz",
      "integrity": "sha512-1Ih4WTWyw0+lKyFMcBHGbb5U5FtuHJuujoyyr5zTaWS5EYMeT6Jb2AuDeftsCsEuchO+mM2ij5+q9crhydzLhQ==",
      "license": "MIT",
      "dependencies": {
        "@floating-ui/utils": "^0.2.11"
      }
    },
    "node_modules/@floating-ui/dom": {
      "version": "1.7.6",
      "resolved": "https://registry.npmjs.org/@floating-ui/dom/-/dom-1.7.6.tgz",
      "integrity": "sha512-9gZSAI5XM36880PPMm//9dfiEngYoC6Am2izES1FF406YFsjvyBMmeJ2g4SAju3xWwtuynNRFL2s9hgxpLI5SQ==",
      "license": "MIT",
      "dependencies": {
        "@floating-ui/core": "^1.7.5",
        "@floating-ui/utils": "^0.2.11"
      }
    },
    "node_modules/@floating-ui/react-dom": {
      "version": "2.1.8",
      "resolved": "https://registry.npmjs.org/@floating-ui/react-dom/-/react-dom-2.1.8.tgz",
      "integrity": "sha512-cC52bHwM/n/CxS87FH0yWdngEZrjdtLW/qVruo68qg+prK7ZQ4YGdut2GyDVpoGeAYe/h899rVeOVm6Oi40k2A==",
      "license": "MIT",
      "dependencies": {
        "@floating-ui/dom": "^1.7.6"
      },
      "peerDependencies": {
        "react": ">=16.8.0",
        "react-dom": ">=16.8.0"
      }
    },
    "node_modules/@floating-ui/utils": {
      "version": "0.2.11",
      "resolved": "https://registry.npmjs.org/@floating-ui/utils/-/utils-0.2.11.tgz",
      "integrity": "sha512-RiB/yIh78pcIxl6lLMG0CgBXAZ2Y0eVHqMPYugu+9U0AeT6YBeiJpf7lbdJNIugFP5SIjwNRgo4DhR1Qxi26Gg==",
      "license": "MIT"
    },
    "node_modules/@hono/node-server": {
      "version": "1.19.11",
      "resolved": "https://registry.npmjs.org/@hono/node-server/-/node-server-1.19.11.tgz",
      "integrity": "sha512-dr8/3zEaB+p0D2n/IUrlPF1HZm586qgJNXK1a9fhg/PzdtkK7Ksd5l312tJX2yBuALqDYBlG20QEbayqPyxn+g==",
      "license": "MIT",
      "engines": {
        "node": ">=18.14.1"
      },
      "peerDependencies": {
        "hono": "^4"
      }
    },
    "node_modules/@humanfs/core": {
      "version": "0.19.1",
      "resolved": "https://registry.npmjs.org/@humanfs/core/-/core-0.19.1.tgz",
      "integrity": "sha512-5DyQ4+1JEUzejeK1JGICcideyfUbGixgS9jNgex5nqkW+cY7WZhxBigmieN5Qnw9ZosSNVC9KQKyb+GUaGyKUA==",
      "dev": true,
      "license": "Apache-2.0",
      "engines": {
        "node": ">=18.18.0"
      }
    },
    "node_modules/@humanfs/node": {
      "version": "0.16.7",
      "resolved": "https://registry.npmjs.org/@humanfs/node/-/node-0.16.7.tgz",
      "integrity": "sha512-/zUx+yOsIrG4Y43Eh2peDeKCxlRt/gET6aHfaKpuq267qXdYDFViVHfMaLyygZOnl0kGWxFIgsBy8QFuTLUXEQ==",
      "dev": true,
      "license": "Apache-2.0",
      "dependencies": {
        "@humanfs/core": "^0.19.1",
        "@humanwhocodes/retry": "^0.4.0"
      },
      "engines": {
        "node": ">=18.18.0"
      }
    },
    "node_modules/@humanwhocodes/module-importer": {
      "version": "1.0.1",
      "resolved": "https://registry.npmjs.org/@humanwhocodes/module-importer/-/module-importer-1.0.1.tgz",
      "integrity": "sha512-bxveV4V8v5Yb4ncFTT3rPSgZBOpCkjfK0y4oVVVJwIuDVBRMDXrPyXRL988i5ap9m9bnyEEjWfm5WkBmtffLfA==",
      "dev": true,
      "license": "Apache-2.0",
      "engines": {
        "node": ">=12.22"
      },
      "funding": {
        "type": "github",
        "url": "https://github.com/sponsors/nzakas"
      }
    },
    "node_modules/@humanwhocodes/retry": {
      "version": "0.4.3",
      "resolved": "https://registry.npmjs.org/@humanwhocodes/retry/-/retry-0.4.3.tgz",
      "integrity": "sha512-bV0Tgo9K4hfPCek+aMAn81RppFKv2ySDQeMoSZuvTASywNTnVJCArCZE2FWqpvIatKu7VMRLWlR1EazvVhDyhQ==",
      "dev": true,
      "license": "Apache-2.0",
      "engines": {
        "node": ">=18.18"
      },
      "funding": {
        "type": "github",
        "url": "https://github.com/sponsors/nzakas"
      }
    },
    "node_modules/@img/colour": {
      "version": "1.1.0",
      "resolved": "https://registry.npmjs.org/@img/colour/-/colour-1.1.0.tgz",
      "integrity": "sha512-Td76q7j57o/tLVdgS746cYARfSyxk8iEfRxewL9h4OMzYhbW4TAcppl0mT4eyqXddh6L/jwoM75mo7ixa/pCeQ==",
      "license": "MIT",
      "optional": true,
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/@img/sharp-darwin-arm64": {
      "version": "0.34.5",
      "resolved": "https://registry.npmjs.org/@img/sharp-darwin-arm64/-/sharp-darwin-arm64-0.34.5.tgz",
      "integrity": "sha512-imtQ3WMJXbMY4fxb/Ndp6HBTNVtWCUI0WdobyheGf5+ad6xX8VIDO8u2xE4qc/fr08CKG/7dDseFtn6M6g/r3w==",
      "cpu": [
        "arm64"
      ],
      "license": "Apache-2.0",
      "optional": true,
      "os": [
        "darwin"
      ],
      "engines": {
        "node": "^18.17.0 || ^20.3.0 || >=21.0.0"
      },
      "funding": {
        "url": "https://opencollective.com/libvips"
      },
      "optionalDependencies": {
        "@img/sharp-libvips-darwin-arm64": "1.2.4"
      }
    },
    "node_modules/@img/sharp-darwin-x64": {
      "version": "0.34.5",
      "resolved": "https://registry.npmjs.org/@img/sharp-darwin-x64/-/sharp-darwin-x64-0.34.5.tgz",
      "integrity": "sha512-YNEFAF/4KQ/PeW0N+r+aVVsoIY0/qxxikF2SWdp+NRkmMB7y9LBZAVqQ4yhGCm/H3H270OSykqmQMKLBhBJDEw==",
      "cpu": [
        "x64"
      ],
      "license": "Apache-2.0",
      "optional": true,
      "os": [
        "darwin"
      ],
      "engines": {
        "node": "^18.17.0 || ^20.3.0 || >=21.0.0"
      },
      "funding": {
        "url": "https://opencollective.com/libvips"
      },
      "optionalDependencies": {
        "@img/sharp-libvips-darwin-x64": "1.2.4"
      }
    },
    "node_modules/@img/sharp-libvips-darwin-arm64": {
      "version": "1.2.4",
      "resolved": "https://registry.npmjs.org/@img/sharp-libvips-darwin-arm64/-/sharp-libvips-darwin-arm64-1.2.4.tgz",
      "integrity": "sha512-zqjjo7RatFfFoP0MkQ51jfuFZBnVE2pRiaydKJ1G/rHZvnsrHAOcQALIi9sA5co5xenQdTugCvtb1cuf78Vf4g==",
      "cpu": [
        "arm64"
      ],
      "license": "LGPL-3.0-or-later",
      "optional": true,
      "os": [
        "darwin"
      ],
      "funding": {
        "url": "https://opencollective.com/libvips"
      }
    },
    "node_modules/@img/sharp-libvips-darwin-x64": {
      "version": "1.2.4",
      "resolved": "https://registry.npmjs.org/@img/sharp-libvips-darwin-x64/-/sharp-libvips-darwin-x64-1.2.4.tgz",
      "integrity": "sha512-1IOd5xfVhlGwX+zXv2N93k0yMONvUlANylbJw1eTah8K/Jtpi15KC+WSiaX/nBmbm2HxRM1gZ0nSdjSsrZbGKg==",
      "cpu": [
        "x64"
      ],
      "license": "LGPL-3.0-or-later",
      "optional": true,
      "os": [
        "darwin"
      ],
      "funding": {
        "url": "https://opencollective.com/libvips"
      }
    },
    "node_modules/@img/sharp-libvips-linux-arm": {
      "version": "1.2.4",
      "resolved": "https://registry.npmjs.org/@img/sharp-libvips-linux-arm/-/sharp-libvips-linux-arm-1.2.4.tgz",
      "integrity": "sha512-bFI7xcKFELdiNCVov8e44Ia4u2byA+l3XtsAj+Q8tfCwO6BQ8iDojYdvoPMqsKDkuoOo+X6HZA0s0q11ANMQ8A==",
      "cpu": [
        "arm"
      ],
      "license": "LGPL-3.0-or-later",
      "optional": true,
      "os": [
        "linux"
      ],
      "funding": {
        "url": "https://opencollective.com/libvips"
      }
    },
    "node_modules/@img/sharp-libvips-linux-arm64": {
      "version": "1.2.4",
      "resolved": "https://registry.npmjs.org/@img/sharp-libvips-linux-arm64/-/sharp-libvips-linux-arm64-1.2.4.tgz",
      "integrity": "sha512-excjX8DfsIcJ10x1Kzr4RcWe1edC9PquDRRPx3YVCvQv+U5p7Yin2s32ftzikXojb1PIFc/9Mt28/y+iRklkrw==",
      "cpu": [
        "arm64"
      ],
      "license": "LGPL-3.0-or-later",
      "optional": true,
      "os": [
        "linux"
      ],
      "funding": {
        "url": "https://opencollective.com/libvips"
      }
    },
    "node_modules/@img/sharp-libvips-linux-ppc64": {
      "version": "1.2.4",
      "resolved": "https://registry.npmjs.org/@img/sharp-libvips-linux-ppc64/-/sharp-libvips-linux-ppc64-1.2.4.tgz",
      "integrity": "sha512-FMuvGijLDYG6lW+b/UvyilUWu5Ayu+3r2d1S8notiGCIyYU/76eig1UfMmkZ7vwgOrzKzlQbFSuQfgm7GYUPpA==",
      "cpu": [
        "ppc64"
      ],
      "license": "LGPL-3.0-or-later",
      "optional": true,
      "os": [
        "linux"
      ],
      "funding": {
        "url": "https://opencollective.com/libvips"
      }
    },
    "node_modules/@img/sharp-libvips-linux-riscv64": {
      "version": "1.2.4",
      "resolved": "https://registry.npmjs.org/@img/sharp-libvips-linux-riscv64/-/sharp-libvips-linux-riscv64-1.2.4.tgz",
      "integrity": "sha512-oVDbcR4zUC0ce82teubSm+x6ETixtKZBh/qbREIOcI3cULzDyb18Sr/Wcyx7NRQeQzOiHTNbZFF1UwPS2scyGA==",
      "cpu": [
        "riscv64"
      ],
      "license": "LGPL-3.0-or-later",
      "optional": true,
      "os": [
        "linux"
      ],
      "funding": {
        "url": "https://opencollective.com/libvips"
      }
    },
    "node_modules/@img/sharp-libvips-linux-s390x": {
      "version": "1.2.4",
      "resolved": "https://registry.npmjs.org/@img/sharp-libvips-linux-s390x/-/sharp-libvips-linux-s390x-1.2.4.tgz",
      "integrity": "sha512-qmp9VrzgPgMoGZyPvrQHqk02uyjA0/QrTO26Tqk6l4ZV0MPWIW6LTkqOIov+J1yEu7MbFQaDpwdwJKhbJvuRxQ==",
      "cpu": [
        "s390x"
      ],
      "license": "LGPL-3.0-or-later",
      "optional": true,
      "os": [
        "linux"
      ],
      "funding": {
        "url": "https://opencollective.com/libvips"
      }
    },
    "node_modules/@img/sharp-libvips-linux-x64": {
      "version": "1.2.4",
      "resolved": "https://registry.npmjs.org/@img/sharp-libvips-linux-x64/-/sharp-libvips-linux-x64-1.2.4.tgz",
      "integrity": "sha512-tJxiiLsmHc9Ax1bz3oaOYBURTXGIRDODBqhveVHonrHJ9/+k89qbLl0bcJns+e4t4rvaNBxaEZsFtSfAdquPrw==",
      "cpu": [
        "x64"
      ],
      "license": "LGPL-3.0-or-later",
      "optional": true,
      "os": [
        "linux"
      ],
      "funding": {
        "url": "https://opencollective.com/libvips"
      }
    },
    "node_modules/@img/sharp-libvips-linuxmusl-arm64": {
      "version": "1.2.4",
      "resolved": "https://registry.npmjs.org/@img/sharp-libvips-linuxmusl-arm64/-/sharp-libvips-linuxmusl-arm64-1.2.4.tgz",
      "integrity": "sha512-FVQHuwx1IIuNow9QAbYUzJ+En8KcVm9Lk5+uGUQJHaZmMECZmOlix9HnH7n1TRkXMS0pGxIJokIVB9SuqZGGXw==",
      "cpu": [
        "arm64"
      ],
      "license": "LGPL-3.0-or-later",
      "optional": true,
      "os": [
        "linux"
      ],
      "funding": {
        "url": "https://opencollective.com/libvips"
      }
    },
    "node_modules/@img/sharp-libvips-linuxmusl-x64": {
      "version": "1.2.4",
      "resolved": "https://registry.npmjs.org/@img/sharp-libvips-linuxmusl-x64/-/sharp-libvips-linuxmusl-x64-1.2.4.tgz",
      "integrity": "sha512-+LpyBk7L44ZIXwz/VYfglaX/okxezESc6UxDSoyo2Ks6Jxc4Y7sGjpgU9s4PMgqgjj1gZCylTieNamqA1MF7Dg==",
      "cpu": [
        "x64"
      ],
      "license": "LGPL-3.0-or-later",
      "optional": true,
      "os": [
        "linux"
      ],
      "funding": {
        "url": "https://opencollective.com/libvips"
      }
    },
    "node_modules/@img/sharp-linux-arm": {
      "version": "0.34.5",
      "resolved": "https://registry.npmjs.org/@img/sharp-linux-arm/-/sharp-linux-arm-0.34.5.tgz",
      "integrity": "sha512-9dLqsvwtg1uuXBGZKsxem9595+ujv0sJ6Vi8wcTANSFpwV/GONat5eCkzQo/1O6zRIkh0m/8+5BjrRr7jDUSZw==",
      "cpu": [
        "arm"
      ],
      "license": "Apache-2.0",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": "^18.17.0 || ^20.3.0 || >=21.0.0"
      },
      "funding": {
        "url": "https://opencollective.com/libvips"
      },
      "optionalDependencies": {
        "@img/sharp-libvips-linux-arm": "1.2.4"
      }
    },
    "node_modules/@img/sharp-linux-arm64": {
      "version": "0.34.5",
      "resolved": "https://registry.npmjs.org/@img/sharp-linux-arm64/-/sharp-linux-arm64-0.34.5.tgz",
      "integrity": "sha512-bKQzaJRY/bkPOXyKx5EVup7qkaojECG6NLYswgktOZjaXecSAeCWiZwwiFf3/Y+O1HrauiE3FVsGxFg8c24rZg==",
      "cpu": [
        "arm64"
      ],
      "license": "Apache-2.0",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": "^18.17.0 || ^20.3.0 || >=21.0.0"
      },
      "funding": {
        "url": "https://opencollective.com/libvips"
      },
      "optionalDependencies": {
        "@img/sharp-libvips-linux-arm64": "1.2.4"
      }
    },
    "node_modules/@img/sharp-linux-ppc64": {
      "version": "0.34.5",
      "resolved": "https://registry.npmjs.org/@img/sharp-linux-ppc64/-/sharp-linux-ppc64-0.34.5.tgz",
      "integrity": "sha512-7zznwNaqW6YtsfrGGDA6BRkISKAAE1Jo0QdpNYXNMHu2+0dTrPflTLNkpc8l7MUP5M16ZJcUvysVWWrMefZquA==",
      "cpu": [
        "ppc64"
      ],
      "license": "Apache-2.0",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": "^18.17.0 || ^20.3.0 || >=21.0.0"
      },
      "funding": {
        "url": "https://opencollective.com/libvips"
      },
      "optionalDependencies": {
        "@img/sharp-libvips-linux-ppc64": "1.2.4"
      }
    },
    "node_modules/@img/sharp-linux-riscv64": {
      "version": "0.34.5",
      "resolved": "https://registry.npmjs.org/@img/sharp-linux-riscv64/-/sharp-linux-riscv64-0.34.5.tgz",
      "integrity": "sha512-51gJuLPTKa7piYPaVs8GmByo7/U7/7TZOq+cnXJIHZKavIRHAP77e3N2HEl3dgiqdD/w0yUfiJnII77PuDDFdw==",
      "cpu": [
        "riscv64"
      ],
      "license": "Apache-2.0",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": "^18.17.0 || ^20.3.0 || >=21.0.0"
      },
      "funding": {
        "url": "https://opencollective.com/libvips"
      },
      "optionalDependencies": {
        "@img/sharp-libvips-linux-riscv64": "1.2.4"
      }
    },
    "node_modules/@img/sharp-linux-s390x": {
      "version": "0.34.5",
      "resolved": "https://registry.npmjs.org/@img/sharp-linux-s390x/-/sharp-linux-s390x-0.34.5.tgz",
      "integrity": "sha512-nQtCk0PdKfho3eC5MrbQoigJ2gd1CgddUMkabUj+rBevs8tZ2cULOx46E7oyX+04WGfABgIwmMC0VqieTiR4jg==",
      "cpu": [
        "s390x"
      ],
      "license": "Apache-2.0",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": "^18.17.0 || ^20.3.0 || >=21.0.0"
      },
      "funding": {
        "url": "https://opencollective.com/libvips"
      },
      "optionalDependencies": {
        "@img/sharp-libvips-linux-s390x": "1.2.4"
      }
    },
    "node_modules/@img/sharp-linux-x64": {
      "version": "0.34.5",
      "resolved": "https://registry.npmjs.org/@img/sharp-linux-x64/-/sharp-linux-x64-0.34.5.tgz",
      "integrity": "sha512-MEzd8HPKxVxVenwAa+JRPwEC7QFjoPWuS5NZnBt6B3pu7EG2Ge0id1oLHZpPJdn3OQK+BQDiw9zStiHBTJQQQQ==",
      "cpu": [
        "x64"
      ],
      "license": "Apache-2.0",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": "^18.17.0 || ^20.3.0 || >=21.0.0"
      },
      "funding": {
        "url": "https://opencollective.com/libvips"
      },
      "optionalDependencies": {
        "@img/sharp-libvips-linux-x64": "1.2.4"
      }
    },
    "node_modules/@img/sharp-linuxmusl-arm64": {
      "version": "0.34.5",
      "resolved": "https://registry.npmjs.org/@img/sharp-linuxmusl-arm64/-/sharp-linuxmusl-arm64-0.34.5.tgz",
      "integrity": "sha512-fprJR6GtRsMt6Kyfq44IsChVZeGN97gTD331weR1ex1c1rypDEABN6Tm2xa1wE6lYb5DdEnk03NZPqA7Id21yg==",
      "cpu": [
        "arm64"
      ],
      "license": "Apache-2.0",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": "^18.17.0 || ^20.3.0 || >=21.0.0"
      },
      "funding": {
        "url": "https://opencollective.com/libvips"
      },
      "optionalDependencies": {
        "@img/sharp-libvips-linuxmusl-arm64": "1.2.4"
      }
    },
    "node_modules/@img/sharp-linuxmusl-x64": {
      "version": "0.34.5",
      "resolved": "https://registry.npmjs.org/@img/sharp-linuxmusl-x64/-/sharp-linuxmusl-x64-0.34.5.tgz",
      "integrity": "sha512-Jg8wNT1MUzIvhBFxViqrEhWDGzqymo3sV7z7ZsaWbZNDLXRJZoRGrjulp60YYtV4wfY8VIKcWidjojlLcWrd8Q==",
      "cpu": [
        "x64"
      ],
      "license": "Apache-2.0",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": "^18.17.0 || ^20.3.0 || >=21.0.0"
      },
      "funding": {
        "url": "https://opencollective.com/libvips"
      },
      "optionalDependencies": {
        "@img/sharp-libvips-linuxmusl-x64": "1.2.4"
      }
    },
    "node_modules/@img/sharp-wasm32": {
      "version": "0.34.5",
      "resolved": "https://registry.npmjs.org/@img/sharp-wasm32/-/sharp-wasm32-0.34.5.tgz",
      "integrity": "sha512-OdWTEiVkY2PHwqkbBI8frFxQQFekHaSSkUIJkwzclWZe64O1X4UlUjqqqLaPbUpMOQk6FBu/HtlGXNblIs0huw==",
      "cpu": [
        "wasm32"
      ],
      "license": "Apache-2.0 AND LGPL-3.0-or-later AND MIT",
      "optional": true,
      "dependencies": {
        "@emnapi/runtime": "^1.7.0"
      },
      "engines": {
        "node": "^18.17.0 || ^20.3.0 || >=21.0.0"
      },
      "funding": {
        "url": "https://opencollective.com/libvips"
      }
    },
    "node_modules/@img/sharp-win32-arm64": {
      "version": "0.34.5",
      "resolved": "https://registry.npmjs.org/@img/sharp-win32-arm64/-/sharp-win32-arm64-0.34.5.tgz",
      "integrity": "sha512-WQ3AgWCWYSb2yt+IG8mnC6Jdk9Whs7O0gxphblsLvdhSpSTtmu69ZG1Gkb6NuvxsNACwiPV6cNSZNzt0KPsw7g==",
      "cpu": [
        "arm64"
      ],
      "license": "Apache-2.0 AND LGPL-3.0-or-later",
      "optional": true,
      "os": [
        "win32"
      ],
      "engines": {
        "node": "^18.17.0 || ^20.3.0 || >=21.0.0"
      },
      "funding": {
        "url": "https://opencollective.com/libvips"
      }
    },
    "node_modules/@img/sharp-win32-ia32": {
      "version": "0.34.5",
      "resolved": "https://registry.npmjs.org/@img/sharp-win32-ia32/-/sharp-win32-ia32-0.34.5.tgz",
      "integrity": "sha512-FV9m/7NmeCmSHDD5j4+4pNI8Cp3aW+JvLoXcTUo0IqyjSfAZJ8dIUmijx1qaJsIiU+Hosw6xM5KijAWRJCSgNg==",
      "cpu": [
        "ia32"
      ],
      "license": "Apache-2.0 AND LGPL-3.0-or-later",
      "optional": true,
      "os": [
        "win32"
      ],
      "engines": {
        "node": "^18.17.0 || ^20.3.0 || >=21.0.0"
      },
      "funding": {
        "url": "https://opencollective.com/libvips"
      }
    },
    "node_modules/@img/sharp-win32-x64": {
      "version": "0.34.5",
      "resolved": "https://registry.npmjs.org/@img/sharp-win32-x64/-/sharp-win32-x64-0.34.5.tgz",
      "integrity": "sha512-+29YMsqY2/9eFEiW93eqWnuLcWcufowXewwSNIT6UwZdUUCrM3oFjMWH/Z6/TMmb4hlFenmfAVbpWeup2jryCw==",
      "cpu": [
        "x64"
      ],
      "license": "Apache-2.0 AND LGPL-3.0-or-later",
      "optional": true,
      "os": [
        "win32"
      ],
      "engines": {
        "node": "^18.17.0 || ^20.3.0 || >=21.0.0"
      },
      "funding": {
        "url": "https://opencollective.com/libvips"
      }
    },
    "node_modules/@inquirer/ansi": {
      "version": "1.0.2",
      "resolved": "https://registry.npmjs.org/@inquirer/ansi/-/ansi-1.0.2.tgz",
      "integrity": "sha512-S8qNSZiYzFd0wAcyG5AXCvUHC5Sr7xpZ9wZ2py9XR88jUz8wooStVx5M6dRzczbBWjic9NP7+rY0Xi7qqK/aMQ==",
      "license": "MIT",
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/@inquirer/confirm": {
      "version": "5.1.21",
      "resolved": "https://registry.npmjs.org/@inquirer/confirm/-/confirm-5.1.21.tgz",
      "integrity": "sha512-KR8edRkIsUayMXV+o3Gv+q4jlhENF9nMYUZs9PA2HzrXeHI8M5uDag70U7RJn9yyiMZSbtF5/UexBtAVtZGSbQ==",
      "license": "MIT",
      "dependencies": {
        "@inquirer/core": "^10.3.2",
        "@inquirer/type": "^3.0.10"
      },
      "engines": {
        "node": ">=18"
      },
      "peerDependencies": {
        "@types/node": ">=18"
      },
      "peerDependenciesMeta": {
        "@types/node": {
          "optional": true
        }
      }
    },
    "node_modules/@inquirer/core": {
      "version": "10.3.2",
      "resolved": "https://registry.npmjs.org/@inquirer/core/-/core-10.3.2.tgz",
      "integrity": "sha512-43RTuEbfP8MbKzedNqBrlhhNKVwoK//vUFNW3Q3vZ88BLcrs4kYpGg+B2mm5p2K/HfygoCxuKwJJiv8PbGmE0A==",
      "license": "MIT",
      "dependencies": {
        "@inquirer/ansi": "^1.0.2",
        "@inquirer/figures": "^1.0.15",
        "@inquirer/type": "^3.0.10",
        "cli-width": "^4.1.0",
        "mute-stream": "^2.0.0",
        "signal-exit": "^4.1.0",
        "wrap-ansi": "^6.2.0",
        "yoctocolors-cjs": "^2.1.3"
      },
      "engines": {
        "node": ">=18"
      },
      "peerDependencies": {
        "@types/node": ">=18"
      },
      "peerDependenciesMeta": {
        "@types/node": {
          "optional": true
        }
      }
    },
    "node_modules/@inquirer/figures": {
      "version": "1.0.15",
      "resolved": "https://registry.npmjs.org/@inquirer/figures/-/figures-1.0.15.tgz",
      "integrity": "sha512-t2IEY+unGHOzAaVM5Xx6DEWKeXlDDcNPeDyUpsRc6CUhBfU3VQOEl+Vssh7VNp1dR8MdUJBWhuObjXCsVpjN5g==",
      "license": "MIT",
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/@inquirer/type": {
      "version": "3.0.10",
      "resolved": "https://registry.npmjs.org/@inquirer/type/-/type-3.0.10.tgz",
      "integrity": "sha512-BvziSRxfz5Ov8ch0z/n3oijRSEcEsHnhggm4xFZe93DHcUCTlutlq9Ox4SVENAfcRD22UQq7T/atg9Wr3k09eA==",
      "license": "MIT",
      "engines": {
        "node": ">=18"
      },
      "peerDependencies": {
        "@types/node": ">=18"
      },
      "peerDependenciesMeta": {
        "@types/node": {
          "optional": true
        }
      }
    },
    "node_modules/@jridgewell/gen-mapping": {
      "version": "0.3.13",
      "resolved": "https://registry.npmjs.org/@jridgewell/gen-mapping/-/gen-mapping-0.3.13.tgz",
      "integrity": "sha512-2kkt/7niJ6MgEPxF0bYdQ6etZaA+fQvDcLKckhy1yIQOzaoKjBBjSj63/aLVjYE3qhRt5dvM+uUyfCg6UKCBbA==",
      "license": "MIT",
      "dependencies": {
        "@jridgewell/sourcemap-codec": "^1.5.0",
        "@jridgewell/trace-mapping": "^0.3.24"
      }
    },
    "node_modules/@jridgewell/remapping": {
      "version": "2.3.5",
      "resolved": "https://registry.npmjs.org/@jridgewell/remapping/-/remapping-2.3.5.tgz",
      "integrity": "sha512-LI9u/+laYG4Ds1TDKSJW2YPrIlcVYOwi2fUC6xB43lueCjgxV4lffOCZCtYFiH6TNOX+tQKXx97T4IKHbhyHEQ==",
      "license": "MIT",
      "dependencies": {
        "@jridgewell/gen-mapping": "^0.3.5",
        "@jridgewell/trace-mapping": "^0.3.24"
      }
    },
    "node_modules/@jridgewell/resolve-uri": {
      "version": "3.1.2",
      "resolved": "https://registry.npmjs.org/@jridgewell/resolve-uri/-/resolve-uri-3.1.2.tgz",
      "integrity": "sha512-bRISgCIjP20/tbWSPWMEi54QVPRZExkuD9lJL+UIxUKtwVJA8wW1Trb1jMs1RFXo1CBTNZ/5hpC9QvmKWdopKw==",
      "license": "MIT",
      "engines": {
        "node": ">=6.0.0"
      }
    },
    "node_modules/@jridgewell/sourcemap-codec": {
      "version": "1.5.5",
      "resolved": "https://registry.npmjs.org/@jridgewell/sourcemap-codec/-/sourcemap-codec-1.5.5.tgz",
      "integrity": "sha512-cYQ9310grqxueWbl+WuIUIaiUaDcj7WOq5fVhEljNVgRfOUhY9fy2zTvfoqWsnebh8Sl70VScFbICvJnLKB0Og==",
      "license": "MIT"
    },
    "node_modules/@jridgewell/trace-mapping": {
      "version": "0.3.31",
      "resolved": "https://registry.npmjs.org/@jridgewell/trace-mapping/-/trace-mapping-0.3.31.tgz",
      "integrity": "sha512-zzNR+SdQSDJzc8joaeP8QQoCQr8NuYx2dIIytl1QeBEZHJ9uW6hebsrYgbz8hJwUQao3TWCMtmfV8Nu1twOLAw==",
      "license": "MIT",
      "dependencies": {
        "@jridgewell/resolve-uri": "^3.1.0",
        "@jridgewell/sourcemap-codec": "^1.4.14"
      }
    },
    "node_modules/@livekit/components-core": {
      "version": "0.12.13",
      "resolved": "https://registry.npmjs.org/@livekit/components-core/-/components-core-0.12.13.tgz",
      "integrity": "sha512-DQmi84afHoHjZ62wm8y+XPNIDHTwFHAltjd3lmyXj8UZHOY7wcza4vFt1xnghJOD5wLRY58L1dkAgAw59MgWvw==",
      "license": "Apache-2.0",
      "dependencies": {
        "@floating-ui/dom": "1.7.4",
        "loglevel": "1.9.1",
        "rxjs": "7.8.2"
      },
      "engines": {
        "node": ">=18"
      },
      "peerDependencies": {
        "livekit-client": "^2.17.2",
        "tslib": "^2.6.2"
      }
    },
    "node_modules/@livekit/components-core/node_modules/@floating-ui/dom": {
      "version": "1.7.4",
      "resolved": "https://registry.npmjs.org/@floating-ui/dom/-/dom-1.7.4.tgz",
      "integrity": "sha512-OOchDgh4F2CchOX94cRVqhvy7b3AFb+/rQXyswmzmGakRfkMgoWVjfnLWkRirfLEfuD4ysVW16eXzwt3jHIzKA==",
      "license": "MIT",
      "dependencies": {
        "@floating-ui/core": "^1.7.3",
        "@floating-ui/utils": "^0.2.10"
      }
    },
    "node_modules/@livekit/components-react": {
      "version": "2.9.20",
      "resolved": "https://registry.npmjs.org/@livekit/components-react/-/components-react-2.9.20.tgz",
      "integrity": "sha512-hjkYOsJj9Jbghb7wM5cI8HoVisKeL6Zcy1VnRWTLm0sqVbto8GJp/17T4Udx85mCPY6Jgh8I1Cv0yVzgz7CQtg==",
      "license": "Apache-2.0",
      "dependencies": {
        "@livekit/components-core": "0.12.13",
        "clsx": "2.1.1",
        "events": "^3.3.0",
        "jose": "^6.0.12",
        "usehooks-ts": "3.1.1"
      },
      "engines": {
        "node": ">=18"
      },
      "peerDependencies": {
        "@livekit/krisp-noise-filter": "^0.2.12 || ^0.3.0",
        "livekit-client": "^2.17.2",
        "react": ">=18",
        "react-dom": ">=18",
        "tslib": "^2.6.2"
      },
      "peerDependenciesMeta": {
        "@livekit/krisp-noise-filter": {
          "optional": true
        }
      }
    },
    "node_modules/@livekit/components-styles": {
      "version": "1.2.0",
      "resolved": "https://registry.npmjs.org/@livekit/components-styles/-/components-styles-1.2.0.tgz",
      "integrity": "sha512-74/rt0lDh6aHmOPmWAeDE9C4OrNW9RIdmhX/YRbovQBVNGNVWojRjl3FgQZ5LPFXO6l1maKB4JhXcBFENVxVvw==",
      "license": "Apache-2.0",
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/@livekit/mutex": {
      "version": "1.1.1",
      "resolved": "https://registry.npmjs.org/@livekit/mutex/-/mutex-1.1.1.tgz",
      "integrity": "sha512-EsshAucklmpuUAfkABPxJNhzj9v2sG7JuzFDL4ML1oJQSV14sqrpTYnsaOudMAw9yOaW53NU3QQTlUQoRs4czw==",
      "license": "Apache-2.0"
    },
    "node_modules/@livekit/protocol": {
      "version": "1.44.0",
      "resolved": "https://registry.npmjs.org/@livekit/protocol/-/protocol-1.44.0.tgz",
      "integrity": "sha512-/vfhDUGcUKO8Q43r6i+5FrDhl5oZjm/X3U4x2Iciqvgn5C8qbj+57YPcWSJ1kyIZm5Cm6AV2nAPjMm3ETD/iyg==",
      "license": "Apache-2.0",
      "dependencies": {
        "@bufbuild/protobuf": "^1.10.0"
      }
    },
    "node_modules/@modelcontextprotocol/sdk": {
      "version": "1.27.1",
      "resolved": "https://registry.npmjs.org/@modelcontextprotocol/sdk/-/sdk-1.27.1.tgz",
      "integrity": "sha512-sr6GbP+4edBwFndLbM60gf07z0FQ79gaExpnsjMGePXqFcSSb7t6iscpjk9DhFhwd+mTEQrzNafGP8/iGGFYaA==",
      "license": "MIT",
      "dependencies": {
        "@hono/node-server": "^1.19.9",
        "ajv": "^8.17.1",
        "ajv-formats": "^3.0.1",
        "content-type": "^1.0.5",
        "cors": "^2.8.5",
        "cross-spawn": "^7.0.5",
        "eventsource": "^3.0.2",
        "eventsource-parser": "^3.0.0",
        "express": "^5.2.1",
        "express-rate-limit": "^8.2.1",
        "hono": "^4.11.4",
        "jose": "^6.1.3",
        "json-schema-typed": "^8.0.2",
        "pkce-challenge": "^5.0.0",
        "raw-body": "^3.0.0",
        "zod": "^3.25 || ^4.0",
        "zod-to-json-schema": "^3.25.1"
      },
      "engines": {
        "node": ">=18"
      },
      "peerDependencies": {
        "@cfworker/json-schema": "^4.1.1",
        "zod": "^3.25 || ^4.0"
      },
      "peerDependenciesMeta": {
        "@cfworker/json-schema": {
          "optional": true
        },
        "zod": {
          "optional": false
        }
      }
    },
    "node_modules/@modelcontextprotocol/sdk/node_modules/ajv": {
      "version": "8.18.0",
      "resolved": "https://registry.npmjs.org/ajv/-/ajv-8.18.0.tgz",
      "integrity": "sha512-PlXPeEWMXMZ7sPYOHqmDyCJzcfNrUr3fGNKtezX14ykXOEIvyK81d+qydx89KY5O71FKMPaQ2vBfBFI5NHR63A==",
      "license": "MIT",
      "dependencies": {
        "fast-deep-equal": "^3.1.3",
        "fast-uri": "^3.0.1",
        "json-schema-traverse": "^1.0.0",
        "require-from-string": "^2.0.2"
      },
      "funding": {
        "type": "github",
        "url": "https://github.com/sponsors/epoberezkin"
      }
    },
    "node_modules/@modelcontextprotocol/sdk/node_modules/json-schema-traverse": {
      "version": "1.0.0",
      "resolved": "https://registry.npmjs.org/json-schema-traverse/-/json-schema-traverse-1.0.0.tgz",
      "integrity": "sha512-NM8/P9n3XjXhIZn1lLhkFaACTOURQXjWhV4BA/RnOv8xvgqtqpAX9IO4mRQxSx1Rlo4tqzeqb0sOlruaOy3dug==",
      "license": "MIT"
    },
    "node_modules/@mongodb-js/saslprep": {
      "version": "1.4.6",
      "resolved": "https://registry.npmjs.org/@mongodb-js/saslprep/-/saslprep-1.4.6.tgz",
      "integrity": "sha512-y+x3H1xBZd38n10NZF/rEBlvDOOMQ6LKUTHqr8R9VkJ+mmQOYtJFxIlkkK8fZrtOiL6VixbOBWMbZGBdal3Z1g==",
      "license": "MIT",
      "peer": true,
      "dependencies": {
        "sparse-bitfield": "^3.0.3"
      }
    },
    "node_modules/@mswjs/interceptors": {
      "version": "0.41.3",
      "resolved": "https://registry.npmjs.org/@mswjs/interceptors/-/interceptors-0.41.3.tgz",
      "integrity": "sha512-cXu86tF4VQVfwz8W1SPbhoRyHJkti6mjH/XJIxp40jhO4j2k1m4KYrEykxqWPkFF3vrK4rgQppBh//AwyGSXPA==",
      "license": "MIT",
      "dependencies": {
        "@open-draft/deferred-promise": "^2.2.0",
        "@open-draft/logger": "^0.3.0",
        "@open-draft/until": "^2.0.0",
        "is-node-process": "^1.2.0",
        "outvariant": "^1.4.3",
        "strict-event-emitter": "^0.5.1"
      },
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/@napi-rs/wasm-runtime": {
      "version": "0.2.12",
      "resolved": "https://registry.npmjs.org/@napi-rs/wasm-runtime/-/wasm-runtime-0.2.12.tgz",
      "integrity": "sha512-ZVWUcfwY4E/yPitQJl481FjFo3K22D6qF0DuFH6Y/nbnE11GY5uguDxZMGXPQ8WQ0128MXQD7TnfHyK4oWoIJQ==",
      "dev": true,
      "license": "MIT",
      "optional": true,
      "dependencies": {
        "@emnapi/core": "^1.4.3",
        "@emnapi/runtime": "^1.4.3",
        "@tybys/wasm-util": "^0.10.0"
      }
    },
    "node_modules/@next/env": {
      "version": "16.2.0",
      "resolved": "https://registry.npmjs.org/@next/env/-/env-16.2.0.tgz",
      "integrity": "sha512-OZIbODWWAi0epQRCRjNe1VO45LOFBzgiyqmTLzIqWq6u1wrxKnAyz1HH6tgY/Mc81YzIjRPoYsPAEr4QV4l9TA==",
      "license": "MIT"
    },
    "node_modules/@next/eslint-plugin-next": {
      "version": "16.2.0",
      "resolved": "https://registry.npmjs.org/@next/eslint-plugin-next/-/eslint-plugin-next-16.2.0.tgz",
      "integrity": "sha512-3D3pEMcGKfENC9Pzlkr67GOm+205+5hRdYPZvHuNIy5sr9k0ybSU8g+sxOO/R/RLEh/gWZ3UlY+5LmEyZ1xgXQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "fast-glob": "3.3.1"
      }
    },
    "node_modules/@next/swc-darwin-arm64": {
      "version": "16.2.0",
      "resolved": "https://registry.npmjs.org/@next/swc-darwin-arm64/-/swc-darwin-arm64-16.2.0.tgz",
      "integrity": "sha512-/JZsqKzKt01IFoiLLAzlNqys7qk2F3JkcUhj50zuRhKDQkZNOz9E5N6wAQWprXdsvjRP4lTFj+/+36NSv5AwhQ==",
      "cpu": [
        "arm64"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "darwin"
      ],
      "engines": {
        "node": ">= 10"
      }
    },
    "node_modules/@next/swc-darwin-x64": {
      "version": "16.2.0",
      "resolved": "https://registry.npmjs.org/@next/swc-darwin-x64/-/swc-darwin-x64-16.2.0.tgz",
      "integrity": "sha512-/hV8erWq4SNlVgglUiW5UmQ5Hwy5EW/AbbXlJCn6zkfKxTy/E/U3V8U1Ocm2YCTUoFgQdoMxRyRMOW5jYy4ygg==",
      "cpu": [
        "x64"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "darwin"
      ],
      "engines": {
        "node": ">= 10"
      }
    },
    "node_modules/@next/swc-linux-arm64-gnu": {
      "version": "16.2.0",
      "resolved": "https://registry.npmjs.org/@next/swc-linux-arm64-gnu/-/swc-linux-arm64-gnu-16.2.0.tgz",
      "integrity": "sha512-GkjL/Q7MWOwqWR9zoxu1TIHzkOI2l2BHCf7FzeQG87zPgs+6WDh+oC9Sw9ARuuL/FUk6JNCgKRkA6rEQYadUaw==",
      "cpu": [
        "arm64"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">= 10"
      }
    },
    "node_modules/@next/swc-linux-arm64-musl": {
      "version": "16.2.0",
      "resolved": "https://registry.npmjs.org/@next/swc-linux-arm64-musl/-/swc-linux-arm64-musl-16.2.0.tgz",
      "integrity": "sha512-1ffhC6KY5qWLg5miMlKJp3dZbXelEfjuXt1qcp5WzSCQy36CV3y+JT7OC1WSFKizGQCDOcQbfkH/IjZP3cdRNA==",
      "cpu": [
        "arm64"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">= 10"
      }
    },
    "node_modules/@next/swc-linux-x64-gnu": {
      "version": "16.2.0",
      "resolved": "https://registry.npmjs.org/@next/swc-linux-x64-gnu/-/swc-linux-x64-gnu-16.2.0.tgz",
      "integrity": "sha512-FmbDcZQ8yJRq93EJSL6xaE0KK/Rslraf8fj1uViGxg7K4CKBCRYSubILJPEhjSgZurpcPQq12QNOJQ0DRJl6Hg==",
      "cpu": [
        "x64"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">= 10"
      }
    },
    "node_modules/@next/swc-linux-x64-musl": {
      "version": "16.2.0",
      "resolved": "https://registry.npmjs.org/@next/swc-linux-x64-musl/-/swc-linux-x64-musl-16.2.0.tgz",
      "integrity": "sha512-HzjIHVkmGAwRbh/vzvoBWWEbb8BBZPxBvVbDQDvzHSf3D8RP/4vjw7MNLDXFF9Q1WEzeQyEj2zdxBtVAHu5Oyw==",
      "cpu": [
        "x64"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">= 10"
      }
    },
    "node_modules/@next/swc-win32-arm64-msvc": {
      "version": "16.2.0",
      "resolved": "https://registry.npmjs.org/@next/swc-win32-arm64-msvc/-/swc-win32-arm64-msvc-16.2.0.tgz",
      "integrity": "sha512-UMiFNQf5H7+1ZsZPxEsA064WEuFbRNq/kEXyepbCnSErp4f5iut75dBA8UeerFIG3vDaQNOfCpevnERPp2V+nA==",
      "cpu": [
        "arm64"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "win32"
      ],
      "engines": {
        "node": ">= 10"
      }
    },
    "node_modules/@next/swc-win32-x64-msvc": {
      "version": "16.2.0",
      "resolved": "https://registry.npmjs.org/@next/swc-win32-x64-msvc/-/swc-win32-x64-msvc-16.2.0.tgz",
      "integrity": "sha512-DRrNJKW+/eimrZgdhVN1uvkN1OI4j6Lpefwr44jKQ0YQzztlmOBUUzHuV5GxOMPK3nmodAYElUVCY8ZXo/IWeA==",
      "cpu": [
        "x64"
      ],
      "license": "MIT",
      "optional": true,
      "os": [
        "win32"
      ],
      "engines": {
        "node": ">= 10"
      }
    },
    "node_modules/@noble/ciphers": {
      "version": "2.1.1",
      "resolved": "https://registry.npmjs.org/@noble/ciphers/-/ciphers-2.1.1.tgz",
      "integrity": "sha512-bysYuiVfhxNJuldNXlFEitTVdNnYUc+XNJZd7Qm2a5j1vZHgY+fazadNFWFaMK/2vye0JVlxV3gHmC0WDfAOQw==",
      "license": "MIT",
      "engines": {
        "node": ">= 20.19.0"
      },
      "funding": {
        "url": "https://paulmillr.com/funding/"
      }
    },
    "node_modules/@noble/curves": {
      "version": "1.9.7",
      "resolved": "https://registry.npmjs.org/@noble/curves/-/curves-1.9.7.tgz",
      "integrity": "sha512-gbKGcRUYIjA3/zCCNaWDciTMFI0dCkvou3TL8Zmy5Nc7sJ47a0jtOeZoTaMxkuqRo9cRhjOdZJXegxYE5FN/xw==",
      "license": "MIT",
      "dependencies": {
        "@noble/hashes": "1.8.0"
      },
      "engines": {
        "node": "^14.21.3 || >=16"
      },
      "funding": {
        "url": "https://paulmillr.com/funding/"
      }
    },
    "node_modules/@noble/curves/node_modules/@noble/hashes": {
      "version": "1.8.0",
      "resolved": "https://registry.npmjs.org/@noble/hashes/-/hashes-1.8.0.tgz",
      "integrity": "sha512-jCs9ldd7NwzpgXDIf6P3+NrHh9/sD6CQdxHyjQI+h/6rDNo88ypBxxz45UDuZHz9r3tNz7N/VInSVoVdtXEI4A==",
      "license": "MIT",
      "engines": {
        "node": "^14.21.3 || >=16"
      },
      "funding": {
        "url": "https://paulmillr.com/funding/"
      }
    },
    "node_modules/@noble/hashes": {
      "version": "2.0.1",
      "resolved": "https://registry.npmjs.org/@noble/hashes/-/hashes-2.0.1.tgz",
      "integrity": "sha512-XlOlEbQcE9fmuXxrVTXCTlG2nlRXa9Rj3rr5Ue/+tX+nmkgbX720YHh0VR3hBF9xDvwnb8D2shVGOwNx+ulArw==",
      "license": "MIT",
      "engines": {
        "node": ">= 20.19.0"
      },
      "funding": {
        "url": "https://paulmillr.com/funding/"
      }
    },
    "node_modules/@nodelib/fs.scandir": {
      "version": "2.1.5",
      "resolved": "https://registry.npmjs.org/@nodelib/fs.scandir/-/fs.scandir-2.1.5.tgz",
      "integrity": "sha512-vq24Bq3ym5HEQm2NKCr3yXDwjc7vTsEThRDnkp2DK9p1uqLR+DHurm/NOTo0KG7HYHU7eppKZj3MyqYuMBf62g==",
      "license": "MIT",
      "dependencies": {
        "@nodelib/fs.stat": "2.0.5",
        "run-parallel": "^1.1.9"
      },
      "engines": {
        "node": ">= 8"
      }
    },
    "node_modules/@nodelib/fs.stat": {
      "version": "2.0.5",
      "resolved": "https://registry.npmjs.org/@nodelib/fs.stat/-/fs.stat-2.0.5.tgz",
      "integrity": "sha512-RkhPPp2zrqDAQA/2jNhnztcPAlv64XdhIp7a7454A5ovI7Bukxgt7MX7udwAu3zg1DcpPU0rz3VV1SeaqvY4+A==",
      "license": "MIT",
      "engines": {
        "node": ">= 8"
      }
    },
    "node_modules/@nodelib/fs.walk": {
      "version": "1.2.8",
      "resolved": "https://registry.npmjs.org/@nodelib/fs.walk/-/fs.walk-1.2.8.tgz",
      "integrity": "sha512-oGB+UxlgWcgQkgwo8GcEGwemoTFt3FIO9ababBmaGwXIoBKZ+GTy0pP185beGg7Llih/NSHSV2XAs1lnznocSg==",
      "license": "MIT",
      "dependencies": {
        "@nodelib/fs.scandir": "2.1.5",
        "fastq": "^1.6.0"
      },
      "engines": {
        "node": ">= 8"
      }
    },
    "node_modules/@nolyfill/is-core-module": {
      "version": "1.0.39",
      "resolved": "https://registry.npmjs.org/@nolyfill/is-core-module/-/is-core-module-1.0.39.tgz",
      "integrity": "sha512-nn5ozdjYQpUCZlWGuxcJY/KpxkWQs4DcbMCmKojjyrYDEAGy4Ce19NN4v5MduafTwJlbKc99UA8YhSVqq9yPZA==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=12.4.0"
      }
    },
    "node_modules/@open-draft/deferred-promise": {
      "version": "2.2.0",
      "resolved": "https://registry.npmjs.org/@open-draft/deferred-promise/-/deferred-promise-2.2.0.tgz",
      "integrity": "sha512-CecwLWx3rhxVQF6V4bAgPS5t+So2sTbPgAzafKkVizyi7tlwpcFpdFqq+wqF2OwNBmqFuu6tOyouTuxgpMfzmA==",
      "license": "MIT"
    },
    "node_modules/@open-draft/logger": {
      "version": "0.3.0",
      "resolved": "https://registry.npmjs.org/@open-draft/logger/-/logger-0.3.0.tgz",
      "integrity": "sha512-X2g45fzhxH238HKO4xbSr7+wBS8Fvw6ixhTDuvLd5mqh6bJJCFAPwU9mPDxbcrRtfxv4u5IHCEH77BmxvXmmxQ==",
      "license": "MIT",
      "dependencies": {
        "is-node-process": "^1.2.0",
        "outvariant": "^1.4.0"
      }
    },
    "node_modules/@open-draft/until": {
      "version": "2.1.0",
      "resolved": "https://registry.npmjs.org/@open-draft/until/-/until-2.1.0.tgz",
      "integrity": "sha512-U69T3ItWHvLwGg5eJ0n3I62nWuE6ilHlmz7zM0npLBRvPRd7e6NYmg54vvRtP5mZG7kZqZCFVdsTWo7BPtBujg==",
      "license": "MIT"
    },
    "node_modules/@radix-ui/primitive": {
      "version": "1.1.3",
      "resolved": "https://registry.npmjs.org/@radix-ui/primitive/-/primitive-1.1.3.tgz",
      "integrity": "sha512-JTF99U/6XIjCBo0wqkU5sK10glYe27MRRsfwoiq5zzOEZLHU3A3KCMa5X/azekYRCJ0HlwI0crAXS/5dEHTzDg==",
      "license": "MIT"
    },
    "node_modules/@radix-ui/react-compose-refs": {
      "version": "1.1.2",
      "resolved": "https://registry.npmjs.org/@radix-ui/react-compose-refs/-/react-compose-refs-1.1.2.tgz",
      "integrity": "sha512-z4eqJvfiNnFMHIIvXP3CY57y2WJs5g2v3X0zm9mEJkrkNv4rDxu+sg9Jh8EkXyeqBkB7SOcboo9dMVqhyrACIg==",
      "license": "MIT",
      "peerDependencies": {
        "@types/react": "*",
        "react": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc"
      },
      "peerDependenciesMeta": {
        "@types/react": {
          "optional": true
        }
      }
    },
    "node_modules/@radix-ui/react-context": {
      "version": "1.1.2",
      "resolved": "https://registry.npmjs.org/@radix-ui/react-context/-/react-context-1.1.2.tgz",
      "integrity": "sha512-jCi/QKUM2r1Ju5a3J64TH2A5SpKAgh0LpknyqdQ4m6DCV0xJ2HG1xARRwNGPQfi1SLdLWZ1OJz6F4OMBBNiGJA==",
      "license": "MIT",
      "peerDependencies": {
        "@types/react": "*",
        "react": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc"
      },
      "peerDependenciesMeta": {
        "@types/react": {
          "optional": true
        }
      }
    },
    "node_modules/@radix-ui/react-dialog": {
      "version": "1.1.15",
      "resolved": "https://registry.npmjs.org/@radix-ui/react-dialog/-/react-dialog-1.1.15.tgz",
      "integrity": "sha512-TCglVRtzlffRNxRMEyR36DGBLJpeusFcgMVD9PZEzAKnUs1lKCgX5u9BmC2Yg+LL9MgZDugFFs1Vl+Jp4t/PGw==",
      "license": "MIT",
      "dependencies": {
        "@radix-ui/primitive": "1.1.3",
        "@radix-ui/react-compose-refs": "1.1.2",
        "@radix-ui/react-context": "1.1.2",
        "@radix-ui/react-dismissable-layer": "1.1.11",
        "@radix-ui/react-focus-guards": "1.1.3",
        "@radix-ui/react-focus-scope": "1.1.7",
        "@radix-ui/react-id": "1.1.1",
        "@radix-ui/react-portal": "1.1.9",
        "@radix-ui/react-presence": "1.1.5",
        "@radix-ui/react-primitive": "2.1.3",
        "@radix-ui/react-slot": "1.2.3",
        "@radix-ui/react-use-controllable-state": "1.2.2",
        "aria-hidden": "^1.2.4",
        "react-remove-scroll": "^2.6.3"
      },
      "peerDependencies": {
        "@types/react": "*",
        "@types/react-dom": "*",
        "react": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc",
        "react-dom": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc"
      },
      "peerDependenciesMeta": {
        "@types/react": {
          "optional": true
        },
        "@types/react-dom": {
          "optional": true
        }
      }
    },
    "node_modules/@radix-ui/react-dismissable-layer": {
      "version": "1.1.11",
      "resolved": "https://registry.npmjs.org/@radix-ui/react-dismissable-layer/-/react-dismissable-layer-1.1.11.tgz",
      "integrity": "sha512-Nqcp+t5cTB8BinFkZgXiMJniQH0PsUt2k51FUhbdfeKvc4ACcG2uQniY/8+h1Yv6Kza4Q7lD7PQV0z0oicE0Mg==",
      "license": "MIT",
      "dependencies": {
        "@radix-ui/primitive": "1.1.3",
        "@radix-ui/react-compose-refs": "1.1.2",
        "@radix-ui/react-primitive": "2.1.3",
        "@radix-ui/react-use-callback-ref": "1.1.1",
        "@radix-ui/react-use-escape-keydown": "1.1.1"
      },
      "peerDependencies": {
        "@types/react": "*",
        "@types/react-dom": "*",
        "react": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc",
        "react-dom": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc"
      },
      "peerDependenciesMeta": {
        "@types/react": {
          "optional": true
        },
        "@types/react-dom": {
          "optional": true
        }
      }
    },
    "node_modules/@radix-ui/react-focus-guards": {
      "version": "1.1.3",
      "resolved": "https://registry.npmjs.org/@radix-ui/react-focus-guards/-/react-focus-guards-1.1.3.tgz",
      "integrity": "sha512-0rFg/Rj2Q62NCm62jZw0QX7a3sz6QCQU0LpZdNrJX8byRGaGVTqbrW9jAoIAHyMQqsNpeZ81YgSizOt5WXq0Pw==",
      "license": "MIT",
      "peerDependencies": {
        "@types/react": "*",
        "react": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc"
      },
      "peerDependenciesMeta": {
        "@types/react": {
          "optional": true
        }
      }
    },
    "node_modules/@radix-ui/react-focus-scope": {
      "version": "1.1.7",
      "resolved": "https://registry.npmjs.org/@radix-ui/react-focus-scope/-/react-focus-scope-1.1.7.tgz",
      "integrity": "sha512-t2ODlkXBQyn7jkl6TNaw/MtVEVvIGelJDCG41Okq/KwUsJBwQ4XVZsHAVUkK4mBv3ewiAS3PGuUWuY2BoK4ZUw==",
      "license": "MIT",
      "dependencies": {
        "@radix-ui/react-compose-refs": "1.1.2",
        "@radix-ui/react-primitive": "2.1.3",
        "@radix-ui/react-use-callback-ref": "1.1.1"
      },
      "peerDependencies": {
        "@types/react": "*",
        "@types/react-dom": "*",
        "react": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc",
        "react-dom": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc"
      },
      "peerDependenciesMeta": {
        "@types/react": {
          "optional": true
        },
        "@types/react-dom": {
          "optional": true
        }
      }
    },
    "node_modules/@radix-ui/react-id": {
      "version": "1.1.1",
      "resolved": "https://registry.npmjs.org/@radix-ui/react-id/-/react-id-1.1.1.tgz",
      "integrity": "sha512-kGkGegYIdQsOb4XjsfM97rXsiHaBwco+hFI66oO4s9LU+PLAC5oJ7khdOVFxkhsmlbpUqDAvXw11CluXP+jkHg==",
      "license": "MIT",
      "dependencies": {
        "@radix-ui/react-use-layout-effect": "1.1.1"
      },
      "peerDependencies": {
        "@types/react": "*",
        "react": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc"
      },
      "peerDependenciesMeta": {
        "@types/react": {
          "optional": true
        }
      }
    },
    "node_modules/@radix-ui/react-portal": {
      "version": "1.1.9",
      "resolved": "https://registry.npmjs.org/@radix-ui/react-portal/-/react-portal-1.1.9.tgz",
      "integrity": "sha512-bpIxvq03if6UNwXZ+HTK71JLh4APvnXntDc6XOX8UVq4XQOVl7lwok0AvIl+b8zgCw3fSaVTZMpAPPagXbKmHQ==",
      "license": "MIT",
      "dependencies": {
        "@radix-ui/react-primitive": "2.1.3",
        "@radix-ui/react-use-layout-effect": "1.1.1"
      },
      "peerDependencies": {
        "@types/react": "*",
        "@types/react-dom": "*",
        "react": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc",
        "react-dom": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc"
      },
      "peerDependenciesMeta": {
        "@types/react": {
          "optional": true
        },
        "@types/react-dom": {
          "optional": true
        }
      }
    },
    "node_modules/@radix-ui/react-presence": {
      "version": "1.1.5",
      "resolved": "https://registry.npmjs.org/@radix-ui/react-presence/-/react-presence-1.1.5.tgz",
      "integrity": "sha512-/jfEwNDdQVBCNvjkGit4h6pMOzq8bHkopq458dPt2lMjx+eBQUohZNG9A7DtO/O5ukSbxuaNGXMjHicgwy6rQQ==",
      "license": "MIT",
      "dependencies": {
        "@radix-ui/react-compose-refs": "1.1.2",
        "@radix-ui/react-use-layout-effect": "1.1.1"
      },
      "peerDependencies": {
        "@types/react": "*",
        "@types/react-dom": "*",
        "react": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc",
        "react-dom": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc"
      },
      "peerDependenciesMeta": {
        "@types/react": {
          "optional": true
        },
        "@types/react-dom": {
          "optional": true
        }
      }
    },
    "node_modules/@radix-ui/react-primitive": {
      "version": "2.1.3",
      "resolved": "https://registry.npmjs.org/@radix-ui/react-primitive/-/react-primitive-2.1.3.tgz",
      "integrity": "sha512-m9gTwRkhy2lvCPe6QJp4d3G1TYEUHn/FzJUtq9MjH46an1wJU+GdoGC5VLof8RX8Ft/DlpshApkhswDLZzHIcQ==",
      "license": "MIT",
      "dependencies": {
        "@radix-ui/react-slot": "1.2.3"
      },
      "peerDependencies": {
        "@types/react": "*",
        "@types/react-dom": "*",
        "react": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc",
        "react-dom": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc"
      },
      "peerDependenciesMeta": {
        "@types/react": {
          "optional": true
        },
        "@types/react-dom": {
          "optional": true
        }
      }
    },
    "node_modules/@radix-ui/react-slot": {
      "version": "1.2.3",
      "resolved": "https://registry.npmjs.org/@radix-ui/react-slot/-/react-slot-1.2.3.tgz",
      "integrity": "sha512-aeNmHnBxbi2St0au6VBVC7JXFlhLlOnvIIlePNniyUNAClzmtAUEY8/pBiK3iHjufOlwA+c20/8jngo7xcrg8A==",
      "license": "MIT",
      "dependencies": {
        "@radix-ui/react-compose-refs": "1.1.2"
      },
      "peerDependencies": {
        "@types/react": "*",
        "react": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc"
      },
      "peerDependenciesMeta": {
        "@types/react": {
          "optional": true
        }
      }
    },
    "node_modules/@radix-ui/react-use-callback-ref": {
      "version": "1.1.1",
      "resolved": "https://registry.npmjs.org/@radix-ui/react-use-callback-ref/-/react-use-callback-ref-1.1.1.tgz",
      "integrity": "sha512-FkBMwD+qbGQeMu1cOHnuGB6x4yzPjho8ap5WtbEJ26umhgqVXbhekKUQO+hZEL1vU92a3wHwdp0HAcqAUF5iDg==",
      "license": "MIT",
      "peerDependencies": {
        "@types/react": "*",
        "react": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc"
      },
      "peerDependenciesMeta": {
        "@types/react": {
          "optional": true
        }
      }
    },
    "node_modules/@radix-ui/react-use-controllable-state": {
      "version": "1.2.2",
      "resolved": "https://registry.npmjs.org/@radix-ui/react-use-controllable-state/-/react-use-controllable-state-1.2.2.tgz",
      "integrity": "sha512-BjasUjixPFdS+NKkypcyyN5Pmg83Olst0+c6vGov0diwTEo6mgdqVR6hxcEgFuh4QrAs7Rc+9KuGJ9TVCj0Zzg==",
      "license": "MIT",
      "dependencies": {
        "@radix-ui/react-use-effect-event": "0.0.2",
        "@radix-ui/react-use-layout-effect": "1.1.1"
      },
      "peerDependencies": {
        "@types/react": "*",
        "react": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc"
      },
      "peerDependenciesMeta": {
        "@types/react": {
          "optional": true
        }
      }
    },
    "node_modules/@radix-ui/react-use-effect-event": {
      "version": "0.0.2",
      "resolved": "https://registry.npmjs.org/@radix-ui/react-use-effect-event/-/react-use-effect-event-0.0.2.tgz",
      "integrity": "sha512-Qp8WbZOBe+blgpuUT+lw2xheLP8q0oatc9UpmiemEICxGvFLYmHm9QowVZGHtJlGbS6A6yJ3iViad/2cVjnOiA==",
      "license": "MIT",
      "dependencies": {
        "@radix-ui/react-use-layout-effect": "1.1.1"
      },
      "peerDependencies": {
        "@types/react": "*",
        "react": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc"
      },
      "peerDependenciesMeta": {
        "@types/react": {
          "optional": true
        }
      }
    },
    "node_modules/@radix-ui/react-use-escape-keydown": {
      "version": "1.1.1",
      "resolved": "https://registry.npmjs.org/@radix-ui/react-use-escape-keydown/-/react-use-escape-keydown-1.1.1.tgz",
      "integrity": "sha512-Il0+boE7w/XebUHyBjroE+DbByORGR9KKmITzbR7MyQ4akpORYP/ZmbhAr0DG7RmmBqoOnZdy2QlvajJ2QA59g==",
      "license": "MIT",
      "dependencies": {
        "@radix-ui/react-use-callback-ref": "1.1.1"
      },
      "peerDependencies": {
        "@types/react": "*",
        "react": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc"
      },
      "peerDependenciesMeta": {
        "@types/react": {
          "optional": true
        }
      }
    },
    "node_modules/@radix-ui/react-use-layout-effect": {
      "version": "1.1.1",
      "resolved": "https://registry.npmjs.org/@radix-ui/react-use-layout-effect/-/react-use-layout-effect-1.1.1.tgz",
      "integrity": "sha512-RbJRS4UWQFkzHTTwVymMTUv8EqYhOp8dOOviLj2ugtTiXRaRQS7GLGxZTLL1jWhMeoSCf5zmcZkqTl9IiYfXcQ==",
      "license": "MIT",
      "peerDependencies": {
        "@types/react": "*",
        "react": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc"
      },
      "peerDependenciesMeta": {
        "@types/react": {
          "optional": true
        }
      }
    },
    "node_modules/@rtsao/scc": {
      "version": "1.1.0",
      "resolved": "https://registry.npmjs.org/@rtsao/scc/-/scc-1.1.0.tgz",
      "integrity": "sha512-zt6OdqaDoOnJ1ZYsCYGt9YmWzDXl4vQdKTyJev62gFhRGKdx7mcT54V9KIjg+d2wi9EXsPvAPKe7i7WjfVWB8g==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/@sec-ant/readable-stream": {
      "version": "0.4.1",
      "resolved": "https://registry.npmjs.org/@sec-ant/readable-stream/-/readable-stream-0.4.1.tgz",
      "integrity": "sha512-831qok9r2t8AlxLko40y2ebgSDhenenCatLVeW/uBtnHPyhHOvG0C7TvfgecV+wHzIm5KUICgzmVpWS+IMEAeg==",
      "license": "MIT"
    },
    "node_modules/@sindresorhus/merge-streams": {
      "version": "4.0.0",
      "resolved": "https://registry.npmjs.org/@sindresorhus/merge-streams/-/merge-streams-4.0.0.tgz",
      "integrity": "sha512-tlqY9xq5ukxTUZBmoOp+m61cqwQD5pHJtFY3Mn8CA8ps6yghLH/Hw8UPdqg4OLmFW3IFlcXnQNmo/dh8HzXYIQ==",
      "license": "MIT",
      "engines": {
        "node": ">=18"
      },
      "funding": {
        "url": "https://github.com/sponsors/sindresorhus"
      }
    },
    "node_modules/@standard-schema/spec": {
      "version": "1.1.0",
      "resolved": "https://registry.npmjs.org/@standard-schema/spec/-/spec-1.1.0.tgz",
      "integrity": "sha512-l2aFy5jALhniG5HgqrD6jXLi/rUWrKvqN/qJx6yoJsgKhblVd+iqqU4RCXavm/jPityDo5TCvKMnpjKnOriy0w==",
      "license": "MIT"
    },
    "node_modules/@swc/helpers": {
      "version": "0.5.15",
      "resolved": "https://registry.npmjs.org/@swc/helpers/-/helpers-0.5.15.tgz",
      "integrity": "sha512-JQ5TuMi45Owi4/BIMAJBoSQoOJu12oOk/gADqlcUL9JEdHB8vyjUSsxqeNXnmXHjYKMi2WcYtezGEEhqUI/E2g==",
      "license": "Apache-2.0",
      "dependencies": {
        "tslib": "^2.8.0"
      }
    },
    "node_modules/@tailwindcss/node": {
      "version": "4.2.2",
      "resolved": "https://registry.npmjs.org/@tailwindcss/node/-/node-4.2.2.tgz",
      "integrity": "sha512-pXS+wJ2gZpVXqFaUEjojq7jzMpTGf8rU6ipJz5ovJV6PUGmlJ+jvIwGrzdHdQ80Sg+wmQxUFuoW1UAAwHNEdFA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@jridgewell/remapping": "^2.3.5",
        "enhanced-resolve": "^5.19.0",
        "jiti": "^2.6.1",
        "lightningcss": "1.32.0",
        "magic-string": "^0.30.21",
        "source-map-js": "^1.2.1",
        "tailwindcss": "4.2.2"
      }
    },
    "node_modules/@tailwindcss/oxide": {
      "version": "4.2.2",
      "resolved": "https://registry.npmjs.org/@tailwindcss/oxide/-/oxide-4.2.2.tgz",
      "integrity": "sha512-qEUA07+E5kehxYp9BVMpq9E8vnJuBHfJEC0vPC5e7iL/hw7HR61aDKoVoKzrG+QKp56vhNZe4qwkRmMC0zDLvg==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">= 20"
      },
      "optionalDependencies": {
        "@tailwindcss/oxide-android-arm64": "4.2.2",
        "@tailwindcss/oxide-darwin-arm64": "4.2.2",
        "@tailwindcss/oxide-darwin-x64": "4.2.2",
        "@tailwindcss/oxide-freebsd-x64": "4.2.2",
        "@tailwindcss/oxide-linux-arm-gnueabihf": "4.2.2",
        "@tailwindcss/oxide-linux-arm64-gnu": "4.2.2",
        "@tailwindcss/oxide-linux-arm64-musl": "4.2.2",
        "@tailwindcss/oxide-linux-x64-gnu": "4.2.2",
        "@tailwindcss/oxide-linux-x64-musl": "4.2.2",
        "@tailwindcss/oxide-wasm32-wasi": "4.2.2",
        "@tailwindcss/oxide-win32-arm64-msvc": "4.2.2",
        "@tailwindcss/oxide-win32-x64-msvc": "4.2.2"
      }
    },
    "node_modules/@tailwindcss/oxide-android-arm64": {
      "version": "4.2.2",
      "resolved": "https://registry.npmjs.org/@tailwindcss/oxide-android-arm64/-/oxide-android-arm64-4.2.2.tgz",
      "integrity": "sha512-dXGR1n+P3B6748jZO/SvHZq7qBOqqzQ+yFrXpoOWWALWndF9MoSKAT3Q0fYgAzYzGhxNYOoysRvYlpixRBBoDg==",
      "cpu": [
        "arm64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "android"
      ],
      "engines": {
        "node": ">= 20"
      }
    },
    "node_modules/@tailwindcss/oxide-darwin-arm64": {
      "version": "4.2.2",
      "resolved": "https://registry.npmjs.org/@tailwindcss/oxide-darwin-arm64/-/oxide-darwin-arm64-4.2.2.tgz",
      "integrity": "sha512-iq9Qjr6knfMpZHj55/37ouZeykwbDqF21gPFtfnhCCKGDcPI/21FKC9XdMO/XyBM7qKORx6UIhGgg6jLl7BZlg==",
      "cpu": [
        "arm64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "darwin"
      ],
      "engines": {
        "node": ">= 20"
      }
    },
    "node_modules/@tailwindcss/oxide-darwin-x64": {
      "version": "4.2.2",
      "resolved": "https://registry.npmjs.org/@tailwindcss/oxide-darwin-x64/-/oxide-darwin-x64-4.2.2.tgz",
      "integrity": "sha512-BlR+2c3nzc8f2G639LpL89YY4bdcIdUmiOOkv2GQv4/4M0vJlpXEa0JXNHhCHU7VWOKWT/CjqHdTP8aUuDJkuw==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "darwin"
      ],
      "engines": {
        "node": ">= 20"
      }
    },
    "node_modules/@tailwindcss/oxide-freebsd-x64": {
      "version": "4.2.2",
      "resolved": "https://registry.npmjs.org/@tailwindcss/oxide-freebsd-x64/-/oxide-freebsd-x64-4.2.2.tgz",
      "integrity": "sha512-YUqUgrGMSu2CDO82hzlQ5qSb5xmx3RUrke/QgnoEx7KvmRJHQuZHZmZTLSuuHwFf0DJPybFMXMYf+WJdxHy/nQ==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "freebsd"
      ],
      "engines": {
        "node": ">= 20"
      }
    },
    "node_modules/@tailwindcss/oxide-linux-arm-gnueabihf": {
      "version": "4.2.2",
      "resolved": "https://registry.npmjs.org/@tailwindcss/oxide-linux-arm-gnueabihf/-/oxide-linux-arm-gnueabihf-4.2.2.tgz",
      "integrity": "sha512-FPdhvsW6g06T9BWT0qTwiVZYE2WIFo2dY5aCSpjG/S/u1tby+wXoslXS0kl3/KXnULlLr1E3NPRRw0g7t2kgaQ==",
      "cpu": [
        "arm"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">= 20"
      }
    },
    "node_modules/@tailwindcss/oxide-linux-arm64-gnu": {
      "version": "4.2.2",
      "resolved": "https://registry.npmjs.org/@tailwindcss/oxide-linux-arm64-gnu/-/oxide-linux-arm64-gnu-4.2.2.tgz",
      "integrity": "sha512-4og1V+ftEPXGttOO7eCmW7VICmzzJWgMx+QXAJRAhjrSjumCwWqMfkDrNu1LXEQzNAwz28NCUpucgQPrR4S2yw==",
      "cpu": [
        "arm64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">= 20"
      }
    },
    "node_modules/@tailwindcss/oxide-linux-arm64-musl": {
      "version": "4.2.2",
      "resolved": "https://registry.npmjs.org/@tailwindcss/oxide-linux-arm64-musl/-/oxide-linux-arm64-musl-4.2.2.tgz",
      "integrity": "sha512-oCfG/mS+/+XRlwNjnsNLVwnMWYH7tn/kYPsNPh+JSOMlnt93mYNCKHYzylRhI51X+TbR+ufNhhKKzm6QkqX8ag==",
      "cpu": [
        "arm64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">= 20"
      }
    },
    "node_modules/@tailwindcss/oxide-linux-x64-gnu": {
      "version": "4.2.2",
      "resolved": "https://registry.npmjs.org/@tailwindcss/oxide-linux-x64-gnu/-/oxide-linux-x64-gnu-4.2.2.tgz",
      "integrity": "sha512-rTAGAkDgqbXHNp/xW0iugLVmX62wOp2PoE39BTCGKjv3Iocf6AFbRP/wZT/kuCxC9QBh9Pu8XPkv/zCZB2mcMg==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">= 20"
      }
    },
    "node_modules/@tailwindcss/oxide-linux-x64-musl": {
      "version": "4.2.2",
      "resolved": "https://registry.npmjs.org/@tailwindcss/oxide-linux-x64-musl/-/oxide-linux-x64-musl-4.2.2.tgz",
      "integrity": "sha512-XW3t3qwbIwiSyRCggeO2zxe3KWaEbM0/kW9e8+0XpBgyKU4ATYzcVSMKteZJ1iukJ3HgHBjbg9P5YPRCVUxlnQ==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">= 20"
      }
    },
    "node_modules/@tailwindcss/oxide-wasm32-wasi": {
      "version": "4.2.2",
      "resolved": "https://registry.npmjs.org/@tailwindcss/oxide-wasm32-wasi/-/oxide-wasm32-wasi-4.2.2.tgz",
      "integrity": "sha512-eKSztKsmEsn1O5lJ4ZAfyn41NfG7vzCg496YiGtMDV86jz1q/irhms5O0VrY6ZwTUkFy/EKG3RfWgxSI3VbZ8Q==",
      "bundleDependencies": [
        "@napi-rs/wasm-runtime",
        "@emnapi/core",
        "@emnapi/runtime",
        "@tybys/wasm-util",
        "@emnapi/wasi-threads",
        "tslib"
      ],
      "cpu": [
        "wasm32"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "dependencies": {
        "@emnapi/core": "^1.8.1",
        "@emnapi/runtime": "^1.8.1",
        "@emnapi/wasi-threads": "^1.1.0",
        "@napi-rs/wasm-runtime": "^1.1.1",
        "@tybys/wasm-util": "^0.10.1",
        "tslib": "^2.8.1"
      },
      "engines": {
        "node": ">=14.0.0"
      }
    },
    "node_modules/@tailwindcss/oxide-win32-arm64-msvc": {
      "version": "4.2.2",
      "resolved": "https://registry.npmjs.org/@tailwindcss/oxide-win32-arm64-msvc/-/oxide-win32-arm64-msvc-4.2.2.tgz",
      "integrity": "sha512-qPmaQM4iKu5mxpsrWZMOZRgZv1tOZpUm+zdhhQP0VhJfyGGO3aUKdbh3gDZc/dPLQwW4eSqWGrrcWNBZWUWaXQ==",
      "cpu": [
        "arm64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "win32"
      ],
      "engines": {
        "node": ">= 20"
      }
    },
    "node_modules/@tailwindcss/oxide-win32-x64-msvc": {
      "version": "4.2.2",
      "resolved": "https://registry.npmjs.org/@tailwindcss/oxide-win32-x64-msvc/-/oxide-win32-x64-msvc-4.2.2.tgz",
      "integrity": "sha512-1T/37VvI7WyH66b+vqHj/cLwnCxt7Qt3WFu5Q8hk65aOvlwAhs7rAp1VkulBJw/N4tMirXjVnylTR72uI0HGcA==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "win32"
      ],
      "engines": {
        "node": ">= 20"
      }
    },
    "node_modules/@tailwindcss/postcss": {
      "version": "4.2.2",
      "resolved": "https://registry.npmjs.org/@tailwindcss/postcss/-/postcss-4.2.2.tgz",
      "integrity": "sha512-n4goKQbW8RVXIbNKRB/45LzyUqN451deQK0nzIeauVEqjlI49slUlgKYJM2QyUzap/PcpnS7kzSUmPb1sCRvYQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@alloc/quick-lru": "^5.2.0",
        "@tailwindcss/node": "4.2.2",
        "@tailwindcss/oxide": "4.2.2",
        "postcss": "^8.5.6",
        "tailwindcss": "4.2.2"
      }
    },
    "node_modules/@ts-morph/common": {
      "version": "0.27.0",
      "resolved": "https://registry.npmjs.org/@ts-morph/common/-/common-0.27.0.tgz",
      "integrity": "sha512-Wf29UqxWDpc+i61k3oIOzcUfQt79PIT9y/MWfAGlrkjg6lBC1hwDECLXPVJAhWjiGbfBCxZd65F/LIZF3+jeJQ==",
      "license": "MIT",
      "dependencies": {
        "fast-glob": "^3.3.3",
        "minimatch": "^10.0.1",
        "path-browserify": "^1.0.1"
      }
    },
    "node_modules/@ts-morph/common/node_modules/balanced-match": {
      "version": "4.0.4",
      "resolved": "https://registry.npmjs.org/balanced-match/-/balanced-match-4.0.4.tgz",
      "integrity": "sha512-BLrgEcRTwX2o6gGxGOCNyMvGSp35YofuYzw9h1IMTRmKqttAZZVU67bdb9Pr2vUHA8+j3i2tJfjO6C6+4myGTA==",
      "license": "MIT",
      "engines": {
        "node": "18 || 20 || >=22"
      }
    },
    "node_modules/@ts-morph/common/node_modules/brace-expansion": {
      "version": "5.0.5",
      "resolved": "https://registry.npmjs.org/brace-expansion/-/brace-expansion-5.0.5.tgz",
      "integrity": "sha512-VZznLgtwhn+Mact9tfiwx64fA9erHH/MCXEUfB/0bX/6Fz6ny5EGTXYltMocqg4xFAQZtnO3DHWWXi8RiuN7cQ==",
      "license": "MIT",
      "dependencies": {
        "balanced-match": "^4.0.2"
      },
      "engines": {
        "node": "18 || 20 || >=22"
      }
    },
    "node_modules/@ts-morph/common/node_modules/fast-glob": {
      "version": "3.3.3",
      "resolved": "https://registry.npmjs.org/fast-glob/-/fast-glob-3.3.3.tgz",
      "integrity": "sha512-7MptL8U0cqcFdzIzwOTHoilX9x5BrNqye7Z/LuC7kCMRio1EMSyqRK3BEAUD7sXRq4iT4AzTVuZdhgQ2TCvYLg==",
      "license": "MIT",
      "dependencies": {
        "@nodelib/fs.stat": "^2.0.2",
        "@nodelib/fs.walk": "^1.2.3",
        "glob-parent": "^5.1.2",
        "merge2": "^1.3.0",
        "micromatch": "^4.0.8"
      },
      "engines": {
        "node": ">=8.6.0"
      }
    },
    "node_modules/@ts-morph/common/node_modules/glob-parent": {
      "version": "5.1.2",
      "resolved": "https://registry.npmjs.org/glob-parent/-/glob-parent-5.1.2.tgz",
      "integrity": "sha512-AOIgSQCepiJYwP3ARnGx+5VnTu2HBYdzbGP45eLw1vr3zB3vZLeyed1sC9hnbcOc9/SrMyM5RPQrkGz4aS9Zow==",
      "license": "ISC",
      "dependencies": {
        "is-glob": "^4.0.1"
      },
      "engines": {
        "node": ">= 6"
      }
    },
    "node_modules/@ts-morph/common/node_modules/minimatch": {
      "version": "10.2.4",
      "resolved": "https://registry.npmjs.org/minimatch/-/minimatch-10.2.4.tgz",
      "integrity": "sha512-oRjTw/97aTBN0RHbYCdtF1MQfvusSIBQM0IZEgzl6426+8jSC0nF1a/GmnVLpfB9yyr6g6FTqWqiZVbxrtaCIg==",
      "license": "BlueOak-1.0.0",
      "dependencies": {
        "brace-expansion": "^5.0.2"
      },
      "engines": {
        "node": "18 || 20 || >=22"
      },
      "funding": {
        "url": "https://github.com/sponsors/isaacs"
      }
    },
    "node_modules/@tybys/wasm-util": {
      "version": "0.10.1",
      "resolved": "https://registry.npmjs.org/@tybys/wasm-util/-/wasm-util-0.10.1.tgz",
      "integrity": "sha512-9tTaPJLSiejZKx+Bmog4uSubteqTvFrVrURwkmHixBo0G4seD0zUxp98E1DzUBJxLQ3NPwXrGKDiVjwx/DpPsg==",
      "dev": true,
      "license": "MIT",
      "optional": true,
      "dependencies": {
        "tslib": "^2.4.0"
      }
    },
    "node_modules/@types/dom-mediacapture-record": {
      "version": "1.0.22",
      "resolved": "https://registry.npmjs.org/@types/dom-mediacapture-record/-/dom-mediacapture-record-1.0.22.tgz",
      "integrity": "sha512-mUMZLK3NvwRLcAAT9qmcK+9p7tpU2FHdDsntR3YI4+GY88XrgG4XiE7u1Q2LAN2/FZOz/tdMDC3GQCR4T8nFuw==",
      "license": "MIT",
      "peer": true
    },
    "node_modules/@types/estree": {
      "version": "1.0.8",
      "resolved": "https://registry.npmjs.org/@types/estree/-/estree-1.0.8.tgz",
      "integrity": "sha512-dWHzHa2WqEXI/O1E9OjrocMTKJl2mSrEolh1Iomrv6U+JuNwaHXsXx9bLu5gG7BUWFIN0skIQJQ/L1rIex4X6w==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/@types/json-schema": {
      "version": "7.0.15",
      "resolved": "https://registry.npmjs.org/@types/json-schema/-/json-schema-7.0.15.tgz",
      "integrity": "sha512-5+fP8P8MFNC+AyZCDxrB2pkZFPGzqQWUzpSeuuVLvm8VMcorNYavBqoFcxK8bQz4Qsbn4oUEEem4wDLfcysGHA==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/@types/json5": {
      "version": "0.0.29",
      "resolved": "https://registry.npmjs.org/@types/json5/-/json5-0.0.29.tgz",
      "integrity": "sha512-dRLjCWHYg4oaA77cxO64oO+7JwCwnIzkZPdrrC71jQmQtlhM556pwKo5bUzqvZndkVbeFLIIi+9TC40JNF5hNQ==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/@types/node": {
      "version": "20.19.37",
      "resolved": "https://registry.npmjs.org/@types/node/-/node-20.19.37.tgz",
      "integrity": "sha512-8kzdPJ3FsNsVIurqBs7oodNnCEVbni9yUEkaHbgptDACOPW04jimGagZ51E6+lXUwJjgnBw+hyko/lkFWCldqw==",
      "devOptional": true,
      "license": "MIT",
      "dependencies": {
        "undici-types": "~6.21.0"
      }
    },
    "node_modules/@types/react": {
      "version": "19.2.14",
      "resolved": "https://registry.npmjs.org/@types/react/-/react-19.2.14.tgz",
      "integrity": "sha512-ilcTH/UniCkMdtexkoCN0bI7pMcJDvmQFPvuPvmEaYA/NSfFTAgdUSLAoVjaRJm7+6PvcM+q1zYOwS4wTYMF9w==",
      "devOptional": true,
      "license": "MIT",
      "dependencies": {
        "csstype": "^3.2.2"
      }
    },
    "node_modules/@types/react-dom": {
      "version": "19.2.3",
      "resolved": "https://registry.npmjs.org/@types/react-dom/-/react-dom-19.2.3.tgz",
      "integrity": "sha512-jp2L/eY6fn+KgVVQAOqYItbF0VY/YApe5Mz2F0aykSO8gx31bYCZyvSeYxCHKvzHG5eZjc+zyaS5BrBWya2+kQ==",
      "devOptional": true,
      "license": "MIT",
      "peerDependencies": {
        "@types/react": "^19.2.0"
      }
    },
    "node_modules/@types/statuses": {
      "version": "2.0.6",
      "resolved": "https://registry.npmjs.org/@types/statuses/-/statuses-2.0.6.tgz",
      "integrity": "sha512-xMAgYwceFhRA2zY+XbEA7mxYbA093wdiW8Vu6gZPGWy9cmOyU9XesH1tNcEWsKFd5Vzrqx5T3D38PWx1FIIXkA==",
      "license": "MIT"
    },
    "node_modules/@types/validate-npm-package-name": {
      "version": "4.0.2",
      "resolved": "https://registry.npmjs.org/@types/validate-npm-package-name/-/validate-npm-package-name-4.0.2.tgz",
      "integrity": "sha512-lrpDziQipxCEeK5kWxvljWYhUvOiB2A9izZd9B2AFarYAkqZshb4lPbRs7zKEic6eGtH8V/2qJW+dPp9OtF6bw==",
      "license": "MIT"
    },
    "node_modules/@types/webidl-conversions": {
      "version": "7.0.3",
      "resolved": "https://registry.npmjs.org/@types/webidl-conversions/-/webidl-conversions-7.0.3.tgz",
      "integrity": "sha512-CiJJvcRtIgzadHCYXw7dqEnMNRjhGZlYK05Mj9OyktqV8uVT8fD2BFOB7S1uwBE3Kj2Z+4UyPmFw/Ixgw/LAlA==",
      "license": "MIT",
      "peer": true
    },
    "node_modules/@types/whatwg-url": {
      "version": "13.0.0",
      "resolved": "https://registry.npmjs.org/@types/whatwg-url/-/whatwg-url-13.0.0.tgz",
      "integrity": "sha512-N8WXpbE6Wgri7KUSvrmQcqrMllKZ9uxkYWMt+mCSGwNc0Hsw9VQTW7ApqI4XNrx6/SaM2QQJCzMPDEXE058s+Q==",
      "license": "MIT",
      "peer": true,
      "dependencies": {
        "@types/webidl-conversions": "*"
      }
    },
    "node_modules/@typescript-eslint/eslint-plugin": {
      "version": "8.57.1",
      "resolved": "https://registry.npmjs.org/@typescript-eslint/eslint-plugin/-/eslint-plugin-8.57.1.tgz",
      "integrity": "sha512-Gn3aqnvNl4NGc6x3/Bqk1AOn0thyTU9bqDRhiRnUWezgvr2OnhYCWCgC8zXXRVqBsIL1pSDt7T9nJUe0oM0kDQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@eslint-community/regexpp": "^4.12.2",
        "@typescript-eslint/scope-manager": "8.57.1",
        "@typescript-eslint/type-utils": "8.57.1",
        "@typescript-eslint/utils": "8.57.1",
        "@typescript-eslint/visitor-keys": "8.57.1",
        "ignore": "^7.0.5",
        "natural-compare": "^1.4.0",
        "ts-api-utils": "^2.4.0"
      },
      "engines": {
        "node": "^18.18.0 || ^20.9.0 || >=21.1.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/typescript-eslint"
      },
      "peerDependencies": {
        "@typescript-eslint/parser": "^8.57.1",
        "eslint": "^8.57.0 || ^9.0.0 || ^10.0.0",
        "typescript": ">=4.8.4 <6.0.0"
      }
    },
    "node_modules/@typescript-eslint/eslint-plugin/node_modules/ignore": {
      "version": "7.0.5",
      "resolved": "https://registry.npmjs.org/ignore/-/ignore-7.0.5.tgz",
      "integrity": "sha512-Hs59xBNfUIunMFgWAbGX5cq6893IbWg4KnrjbYwX3tx0ztorVgTDA6B2sxf8ejHJ4wz8BqGUMYlnzNBer5NvGg==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">= 4"
      }
    },
    "node_modules/@typescript-eslint/parser": {
      "version": "8.57.1",
      "resolved": "https://registry.npmjs.org/@typescript-eslint/parser/-/parser-8.57.1.tgz",
      "integrity": "sha512-k4eNDan0EIMTT/dUKc/g+rsJ6wcHYhNPdY19VoX/EOtaAG8DLtKCykhrUnuHPYvinn5jhAPgD2Qw9hXBwrahsw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@typescript-eslint/scope-manager": "8.57.1",
        "@typescript-eslint/types": "8.57.1",
        "@typescript-eslint/typescript-estree": "8.57.1",
        "@typescript-eslint/visitor-keys": "8.57.1",
        "debug": "^4.4.3"
      },
      "engines": {
        "node": "^18.18.0 || ^20.9.0 || >=21.1.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/typescript-eslint"
      },
      "peerDependencies": {
        "eslint": "^8.57.0 || ^9.0.0 || ^10.0.0",
        "typescript": ">=4.8.4 <6.0.0"
      }
    },
    "node_modules/@typescript-eslint/project-service": {
      "version": "8.57.1",
      "resolved": "https://registry.npmjs.org/@typescript-eslint/project-service/-/project-service-8.57.1.tgz",
      "integrity": "sha512-vx1F37BRO1OftsYlmG9xay1TqnjNVlqALymwWVuYTdo18XuKxtBpCj1QlzNIEHlvlB27osvXFWptYiEWsVdYsg==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@typescript-eslint/tsconfig-utils": "^8.57.1",
        "@typescript-eslint/types": "^8.57.1",
        "debug": "^4.4.3"
      },
      "engines": {
        "node": "^18.18.0 || ^20.9.0 || >=21.1.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/typescript-eslint"
      },
      "peerDependencies": {
        "typescript": ">=4.8.4 <6.0.0"
      }
    },
    "node_modules/@typescript-eslint/scope-manager": {
      "version": "8.57.1",
      "resolved": "https://registry.npmjs.org/@typescript-eslint/scope-manager/-/scope-manager-8.57.1.tgz",
      "integrity": "sha512-hs/QcpCwlwT2L5S+3fT6gp0PabyGk4Q0Rv2doJXA0435/OpnSR3VRgvrp8Xdoc3UAYSg9cyUjTeFXZEPg/3OKg==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@typescript-eslint/types": "8.57.1",
        "@typescript-eslint/visitor-keys": "8.57.1"
      },
      "engines": {
        "node": "^18.18.0 || ^20.9.0 || >=21.1.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/typescript-eslint"
      }
    },
    "node_modules/@typescript-eslint/tsconfig-utils": {
      "version": "8.57.1",
      "resolved": "https://registry.npmjs.org/@typescript-eslint/tsconfig-utils/-/tsconfig-utils-8.57.1.tgz",
      "integrity": "sha512-0lgOZB8cl19fHO4eI46YUx2EceQqhgkPSuCGLlGi79L2jwYY1cxeYc1Nae8Aw1xjgW3PKVDLlr3YJ6Bxx8HkWg==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": "^18.18.0 || ^20.9.0 || >=21.1.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/typescript-eslint"
      },
      "peerDependencies": {
        "typescript": ">=4.8.4 <6.0.0"
      }
    },
    "node_modules/@typescript-eslint/type-utils": {
      "version": "8.57.1",
      "resolved": "https://registry.npmjs.org/@typescript-eslint/type-utils/-/type-utils-8.57.1.tgz",
      "integrity": "sha512-+Bwwm0ScukFdyoJsh2u6pp4S9ktegF98pYUU0hkphOOqdMB+1sNQhIz8y5E9+4pOioZijrkfNO/HUJVAFFfPKA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@typescript-eslint/types": "8.57.1",
        "@typescript-eslint/typescript-estree": "8.57.1",
        "@typescript-eslint/utils": "8.57.1",
        "debug": "^4.4.3",
        "ts-api-utils": "^2.4.0"
      },
      "engines": {
        "node": "^18.18.0 || ^20.9.0 || >=21.1.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/typescript-eslint"
      },
      "peerDependencies": {
        "eslint": "^8.57.0 || ^9.0.0 || ^10.0.0",
        "typescript": ">=4.8.4 <6.0.0"
      }
    },
    "node_modules/@typescript-eslint/types": {
      "version": "8.57.1",
      "resolved": "https://registry.npmjs.org/@typescript-eslint/types/-/types-8.57.1.tgz",
      "integrity": "sha512-S29BOBPJSFUiblEl6RzPPjJt6w25A6XsBqRVDt53tA/tlL8q7ceQNZHTjPeONt/3S7KRI4quk+yP9jK2WjBiPQ==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": "^18.18.0 || ^20.9.0 || >=21.1.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/typescript-eslint"
      }
    },
    "node_modules/@typescript-eslint/typescript-estree": {
      "version": "8.57.1",
      "resolved": "https://registry.npmjs.org/@typescript-eslint/typescript-estree/-/typescript-estree-8.57.1.tgz",
      "integrity": "sha512-ybe2hS9G6pXpqGtPli9Gx9quNV0TWLOmh58ADlmZe9DguLq0tiAKVjirSbtM1szG6+QH6rVXyU6GTLQbWnMY+g==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@typescript-eslint/project-service": "8.57.1",
        "@typescript-eslint/tsconfig-utils": "8.57.1",
        "@typescript-eslint/types": "8.57.1",
        "@typescript-eslint/visitor-keys": "8.57.1",
        "debug": "^4.4.3",
        "minimatch": "^10.2.2",
        "semver": "^7.7.3",
        "tinyglobby": "^0.2.15",
        "ts-api-utils": "^2.4.0"
      },
      "engines": {
        "node": "^18.18.0 || ^20.9.0 || >=21.1.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/typescript-eslint"
      },
      "peerDependencies": {
        "typescript": ">=4.8.4 <6.0.0"
      }
    },
    "node_modules/@typescript-eslint/typescript-estree/node_modules/balanced-match": {
      "version": "4.0.4",
      "resolved": "https://registry.npmjs.org/balanced-match/-/balanced-match-4.0.4.tgz",
      "integrity": "sha512-BLrgEcRTwX2o6gGxGOCNyMvGSp35YofuYzw9h1IMTRmKqttAZZVU67bdb9Pr2vUHA8+j3i2tJfjO6C6+4myGTA==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": "18 || 20 || >=22"
      }
    },
    "node_modules/@typescript-eslint/typescript-estree/node_modules/brace-expansion": {
      "version": "5.0.4",
      "resolved": "https://registry.npmjs.org/brace-expansion/-/brace-expansion-5.0.4.tgz",
      "integrity": "sha512-h+DEnpVvxmfVefa4jFbCf5HdH5YMDXRsmKflpf1pILZWRFlTbJpxeU55nJl4Smt5HQaGzg1o6RHFPJaOqnmBDg==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "balanced-match": "^4.0.2"
      },
      "engines": {
        "node": "18 || 20 || >=22"
      }
    },
    "node_modules/@typescript-eslint/typescript-estree/node_modules/minimatch": {
      "version": "10.2.4",
      "resolved": "https://registry.npmjs.org/minimatch/-/minimatch-10.2.4.tgz",
      "integrity": "sha512-oRjTw/97aTBN0RHbYCdtF1MQfvusSIBQM0IZEgzl6426+8jSC0nF1a/GmnVLpfB9yyr6g6FTqWqiZVbxrtaCIg==",
      "dev": true,
      "license": "BlueOak-1.0.0",
      "dependencies": {
        "brace-expansion": "^5.0.2"
      },
      "engines": {
        "node": "18 || 20 || >=22"
      },
      "funding": {
        "url": "https://github.com/sponsors/isaacs"
      }
    },
    "node_modules/@typescript-eslint/typescript-estree/node_modules/semver": {
      "version": "7.7.4",
      "resolved": "https://registry.npmjs.org/semver/-/semver-7.7.4.tgz",
      "integrity": "sha512-vFKC2IEtQnVhpT78h1Yp8wzwrf8CM+MzKMHGJZfBtzhZNycRFnXsHk6E5TxIkkMsgNS7mdX3AGB7x2QM2di4lA==",
      "dev": true,
      "license": "ISC",
      "bin": {
        "semver": "bin/semver.js"
      },
      "engines": {
        "node": ">=10"
      }
    },
    "node_modules/@typescript-eslint/utils": {
      "version": "8.57.1",
      "resolved": "https://registry.npmjs.org/@typescript-eslint/utils/-/utils-8.57.1.tgz",
      "integrity": "sha512-XUNSJ/lEVFttPMMoDVA2r2bwrl8/oPx8cURtczkSEswY5T3AeLmCy+EKWQNdL4u0MmAHOjcWrqJp2cdvgjn8dQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@eslint-community/eslint-utils": "^4.9.1",
        "@typescript-eslint/scope-manager": "8.57.1",
        "@typescript-eslint/types": "8.57.1",
        "@typescript-eslint/typescript-estree": "8.57.1"
      },
      "engines": {
        "node": "^18.18.0 || ^20.9.0 || >=21.1.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/typescript-eslint"
      },
      "peerDependencies": {
        "eslint": "^8.57.0 || ^9.0.0 || ^10.0.0",
        "typescript": ">=4.8.4 <6.0.0"
      }
    },
    "node_modules/@typescript-eslint/visitor-keys": {
      "version": "8.57.1",
      "resolved": "https://registry.npmjs.org/@typescript-eslint/visitor-keys/-/visitor-keys-8.57.1.tgz",
      "integrity": "sha512-YWnmJkXbofiz9KbnbbwuA2rpGkFPLbAIetcCNO6mJ8gdhdZ/v7WDXsoGFAJuM6ikUFKTlSQnjWnVO4ux+UzS6A==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@typescript-eslint/types": "8.57.1",
        "eslint-visitor-keys": "^5.0.0"
      },
      "engines": {
        "node": "^18.18.0 || ^20.9.0 || >=21.1.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/typescript-eslint"
      }
    },
    "node_modules/@typescript-eslint/visitor-keys/node_modules/eslint-visitor-keys": {
      "version": "5.0.1",
      "resolved": "https://registry.npmjs.org/eslint-visitor-keys/-/eslint-visitor-keys-5.0.1.tgz",
      "integrity": "sha512-tD40eHxA35h0PEIZNeIjkHoDR4YjjJp34biM0mDvplBe//mB+IHCqHDGV7pxF+7MklTvighcCPPZC7ynWyjdTA==",
      "dev": true,
      "license": "Apache-2.0",
      "engines": {
        "node": "^20.19.0 || ^22.13.0 || >=24"
      },
      "funding": {
        "url": "https://opencollective.com/eslint"
      }
    },
    "node_modules/@unrs/resolver-binding-android-arm-eabi": {
      "version": "1.11.1",
      "resolved": "https://registry.npmjs.org/@unrs/resolver-binding-android-arm-eabi/-/resolver-binding-android-arm-eabi-1.11.1.tgz",
      "integrity": "sha512-ppLRUgHVaGRWUx0R0Ut06Mjo9gBaBkg3v/8AxusGLhsIotbBLuRk51rAzqLC8gq6NyyAojEXglNjzf6R948DNw==",
      "cpu": [
        "arm"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "android"
      ]
    },
    "node_modules/@unrs/resolver-binding-android-arm64": {
      "version": "1.11.1",
      "resolved": "https://registry.npmjs.org/@unrs/resolver-binding-android-arm64/-/resolver-binding-android-arm64-1.11.1.tgz",
      "integrity": "sha512-lCxkVtb4wp1v+EoN+HjIG9cIIzPkX5OtM03pQYkG+U5O/wL53LC4QbIeazgiKqluGeVEeBlZahHalCaBvU1a2g==",
      "cpu": [
        "arm64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "android"
      ]
    },
    "node_modules/@unrs/resolver-binding-darwin-arm64": {
      "version": "1.11.1",
      "resolved": "https://registry.npmjs.org/@unrs/resolver-binding-darwin-arm64/-/resolver-binding-darwin-arm64-1.11.1.tgz",
      "integrity": "sha512-gPVA1UjRu1Y/IsB/dQEsp2V1pm44Of6+LWvbLc9SDk1c2KhhDRDBUkQCYVWe6f26uJb3fOK8saWMgtX8IrMk3g==",
      "cpu": [
        "arm64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "darwin"
      ]
    },
    "node_modules/@unrs/resolver-binding-darwin-x64": {
      "version": "1.11.1",
      "resolved": "https://registry.npmjs.org/@unrs/resolver-binding-darwin-x64/-/resolver-binding-darwin-x64-1.11.1.tgz",
      "integrity": "sha512-cFzP7rWKd3lZaCsDze07QX1SC24lO8mPty9vdP+YVa3MGdVgPmFc59317b2ioXtgCMKGiCLxJ4HQs62oz6GfRQ==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "darwin"
      ]
    },
    "node_modules/@unrs/resolver-binding-freebsd-x64": {
      "version": "1.11.1",
      "resolved": "https://registry.npmjs.org/@unrs/resolver-binding-freebsd-x64/-/resolver-binding-freebsd-x64-1.11.1.tgz",
      "integrity": "sha512-fqtGgak3zX4DCB6PFpsH5+Kmt/8CIi4Bry4rb1ho6Av2QHTREM+47y282Uqiu3ZRF5IQioJQ5qWRV6jduA+iGw==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "freebsd"
      ]
    },
    "node_modules/@unrs/resolver-binding-linux-arm-gnueabihf": {
      "version": "1.11.1",
      "resolved": "https://registry.npmjs.org/@unrs/resolver-binding-linux-arm-gnueabihf/-/resolver-binding-linux-arm-gnueabihf-1.11.1.tgz",
      "integrity": "sha512-u92mvlcYtp9MRKmP+ZvMmtPN34+/3lMHlyMj7wXJDeXxuM0Vgzz0+PPJNsro1m3IZPYChIkn944wW8TYgGKFHw==",
      "cpu": [
        "arm"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ]
    },
    "node_modules/@unrs/resolver-binding-linux-arm-musleabihf": {
      "version": "1.11.1",
      "resolved": "https://registry.npmjs.org/@unrs/resolver-binding-linux-arm-musleabihf/-/resolver-binding-linux-arm-musleabihf-1.11.1.tgz",
      "integrity": "sha512-cINaoY2z7LVCrfHkIcmvj7osTOtm6VVT16b5oQdS4beibX2SYBwgYLmqhBjA1t51CarSaBuX5YNsWLjsqfW5Cw==",
      "cpu": [
        "arm"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ]
    },
    "node_modules/@unrs/resolver-binding-linux-arm64-gnu": {
      "version": "1.11.1",
      "resolved": "https://registry.npmjs.org/@unrs/resolver-binding-linux-arm64-gnu/-/resolver-binding-linux-arm64-gnu-1.11.1.tgz",
      "integrity": "sha512-34gw7PjDGB9JgePJEmhEqBhWvCiiWCuXsL9hYphDF7crW7UgI05gyBAi6MF58uGcMOiOqSJ2ybEeCvHcq0BCmQ==",
      "cpu": [
        "arm64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ]
    },
    "node_modules/@unrs/resolver-binding-linux-arm64-musl": {
      "version": "1.11.1",
      "resolved": "https://registry.npmjs.org/@unrs/resolver-binding-linux-arm64-musl/-/resolver-binding-linux-arm64-musl-1.11.1.tgz",
      "integrity": "sha512-RyMIx6Uf53hhOtJDIamSbTskA99sPHS96wxVE/bJtePJJtpdKGXO1wY90oRdXuYOGOTuqjT8ACccMc4K6QmT3w==",
      "cpu": [
        "arm64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ]
    },
    "node_modules/@unrs/resolver-binding-linux-ppc64-gnu": {
      "version": "1.11.1",
      "resolved": "https://registry.npmjs.org/@unrs/resolver-binding-linux-ppc64-gnu/-/resolver-binding-linux-ppc64-gnu-1.11.1.tgz",
      "integrity": "sha512-D8Vae74A4/a+mZH0FbOkFJL9DSK2R6TFPC9M+jCWYia/q2einCubX10pecpDiTmkJVUH+y8K3BZClycD8nCShA==",
      "cpu": [
        "ppc64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ]
    },
    "node_modules/@unrs/resolver-binding-linux-riscv64-gnu": {
      "version": "1.11.1",
      "resolved": "https://registry.npmjs.org/@unrs/resolver-binding-linux-riscv64-gnu/-/resolver-binding-linux-riscv64-gnu-1.11.1.tgz",
      "integrity": "sha512-frxL4OrzOWVVsOc96+V3aqTIQl1O2TjgExV4EKgRY09AJ9leZpEg8Ak9phadbuX0BA4k8U5qtvMSQQGGmaJqcQ==",
      "cpu": [
        "riscv64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ]
    },
    "node_modules/@unrs/resolver-binding-linux-riscv64-musl": {
      "version": "1.11.1",
      "resolved": "https://registry.npmjs.org/@unrs/resolver-binding-linux-riscv64-musl/-/resolver-binding-linux-riscv64-musl-1.11.1.tgz",
      "integrity": "sha512-mJ5vuDaIZ+l/acv01sHoXfpnyrNKOk/3aDoEdLO/Xtn9HuZlDD6jKxHlkN8ZhWyLJsRBxfv9GYM2utQ1SChKew==",
      "cpu": [
        "riscv64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ]
    },
    "node_modules/@unrs/resolver-binding-linux-s390x-gnu": {
      "version": "1.11.1",
      "resolved": "https://registry.npmjs.org/@unrs/resolver-binding-linux-s390x-gnu/-/resolver-binding-linux-s390x-gnu-1.11.1.tgz",
      "integrity": "sha512-kELo8ebBVtb9sA7rMe1Cph4QHreByhaZ2QEADd9NzIQsYNQpt9UkM9iqr2lhGr5afh885d/cB5QeTXSbZHTYPg==",
      "cpu": [
        "s390x"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ]
    },
    "node_modules/@unrs/resolver-binding-linux-x64-gnu": {
      "version": "1.11.1",
      "resolved": "https://registry.npmjs.org/@unrs/resolver-binding-linux-x64-gnu/-/resolver-binding-linux-x64-gnu-1.11.1.tgz",
      "integrity": "sha512-C3ZAHugKgovV5YvAMsxhq0gtXuwESUKc5MhEtjBpLoHPLYM+iuwSj3lflFwK3DPm68660rZ7G8BMcwSro7hD5w==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ]
    },
    "node_modules/@unrs/resolver-binding-linux-x64-musl": {
      "version": "1.11.1",
      "resolved": "https://registry.npmjs.org/@unrs/resolver-binding-linux-x64-musl/-/resolver-binding-linux-x64-musl-1.11.1.tgz",
      "integrity": "sha512-rV0YSoyhK2nZ4vEswT/QwqzqQXw5I6CjoaYMOX0TqBlWhojUf8P94mvI7nuJTeaCkkds3QE4+zS8Ko+GdXuZtA==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ]
    },
    "node_modules/@unrs/resolver-binding-wasm32-wasi": {
      "version": "1.11.1",
      "resolved": "https://registry.npmjs.org/@unrs/resolver-binding-wasm32-wasi/-/resolver-binding-wasm32-wasi-1.11.1.tgz",
      "integrity": "sha512-5u4RkfxJm+Ng7IWgkzi3qrFOvLvQYnPBmjmZQ8+szTK/b31fQCnleNl1GgEt7nIsZRIf5PLhPwT0WM+q45x/UQ==",
      "cpu": [
        "wasm32"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "dependencies": {
        "@napi-rs/wasm-runtime": "^0.2.11"
      },
      "engines": {
        "node": ">=14.0.0"
      }
    },
    "node_modules/@unrs/resolver-binding-win32-arm64-msvc": {
      "version": "1.11.1",
      "resolved": "https://registry.npmjs.org/@unrs/resolver-binding-win32-arm64-msvc/-/resolver-binding-win32-arm64-msvc-1.11.1.tgz",
      "integrity": "sha512-nRcz5Il4ln0kMhfL8S3hLkxI85BXs3o8EYoattsJNdsX4YUU89iOkVn7g0VHSRxFuVMdM4Q1jEpIId1Ihim/Uw==",
      "cpu": [
        "arm64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "win32"
      ]
    },
    "node_modules/@unrs/resolver-binding-win32-ia32-msvc": {
      "version": "1.11.1",
      "resolved": "https://registry.npmjs.org/@unrs/resolver-binding-win32-ia32-msvc/-/resolver-binding-win32-ia32-msvc-1.11.1.tgz",
      "integrity": "sha512-DCEI6t5i1NmAZp6pFonpD5m7i6aFrpofcp4LA2i8IIq60Jyo28hamKBxNrZcyOwVOZkgsRp9O2sXWBWP8MnvIQ==",
      "cpu": [
        "ia32"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "win32"
      ]
    },
    "node_modules/@unrs/resolver-binding-win32-x64-msvc": {
      "version": "1.11.1",
      "resolved": "https://registry.npmjs.org/@unrs/resolver-binding-win32-x64-msvc/-/resolver-binding-win32-x64-msvc-1.11.1.tgz",
      "integrity": "sha512-lrW200hZdbfRtztbygyaq/6jP6AKE8qQN2KvPcJ+x7wiD038YtnYtZ82IMNJ69GJibV7bwL3y9FgK+5w/pYt6g==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "win32"
      ]
    },
    "node_modules/accepts": {
      "version": "2.0.0",
      "resolved": "https://registry.npmjs.org/accepts/-/accepts-2.0.0.tgz",
      "integrity": "sha512-5cvg6CtKwfgdmVqY1WIiXKc3Q1bkRqGLi+2W/6ao+6Y7gu/RCwRuAhGEzh5B4KlszSuTLgZYuqFqo5bImjNKng==",
      "license": "MIT",
      "dependencies": {
        "mime-types": "^3.0.0",
        "negotiator": "^1.0.0"
      },
      "engines": {
        "node": ">= 0.6"
      }
    },
    "node_modules/acorn": {
      "version": "8.16.0",
      "resolved": "https://registry.npmjs.org/acorn/-/acorn-8.16.0.tgz",
      "integrity": "sha512-UVJyE9MttOsBQIDKw1skb9nAwQuR5wuGD3+82K6JgJlm/Y+KI92oNsMNGZCYdDsVtRHSak0pcV5Dno5+4jh9sw==",
      "dev": true,
      "license": "MIT",
      "bin": {
        "acorn": "bin/acorn"
      },
      "engines": {
        "node": ">=0.4.0"
      }
    },
    "node_modules/acorn-jsx": {
      "version": "5.3.2",
      "resolved": "https://registry.npmjs.org/acorn-jsx/-/acorn-jsx-5.3.2.tgz",
      "integrity": "sha512-rq9s+JNhf0IChjtDXxllJ7g41oZk5SlXtp0LHwyA5cejwn7vKmKp4pPri6YEePv2PU65sAsegbXtIinmDFDXgQ==",
      "dev": true,
      "license": "MIT",
      "peerDependencies": {
        "acorn": "^6.0.0 || ^7.0.0 || ^8.0.0"
      }
    },
    "node_modules/agent-base": {
      "version": "7.1.4",
      "resolved": "https://registry.npmjs.org/agent-base/-/agent-base-7.1.4.tgz",
      "integrity": "sha512-MnA+YT8fwfJPgBx3m60MNqakm30XOkyIoH1y6huTQvC0PwZG7ki8NacLBcrPbNoo8vEZy7Jpuk7+jMO+CUovTQ==",
      "license": "MIT",
      "engines": {
        "node": ">= 14"
      }
    },
    "node_modules/ajv": {
      "version": "6.14.0",
      "resolved": "https://registry.npmjs.org/ajv/-/ajv-6.14.0.tgz",
      "integrity": "sha512-IWrosm/yrn43eiKqkfkHis7QioDleaXQHdDVPKg0FSwwd/DuvyX79TZnFOnYpB7dcsFAMmtFztZuXPDvSePkFw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "fast-deep-equal": "^3.1.1",
        "fast-json-stable-stringify": "^2.0.0",
        "json-schema-traverse": "^0.4.1",
        "uri-js": "^4.2.2"
      },
      "funding": {
        "type": "github",
        "url": "https://github.com/sponsors/epoberezkin"
      }
    },
    "node_modules/ajv-formats": {
      "version": "3.0.1",
      "resolved": "https://registry.npmjs.org/ajv-formats/-/ajv-formats-3.0.1.tgz",
      "integrity": "sha512-8iUql50EUR+uUcdRQ3HDqa6EVyo3docL8g5WJ3FNcWmu62IbkGUue/pEyLBW8VGKKucTPgqeks4fIU1DA4yowQ==",
      "license": "MIT",
      "dependencies": {
        "ajv": "^8.0.0"
      },
      "peerDependencies": {
        "ajv": "^8.0.0"
      },
      "peerDependenciesMeta": {
        "ajv": {
          "optional": true
        }
      }
    },
    "node_modules/ajv-formats/node_modules/ajv": {
      "version": "8.18.0",
      "resolved": "https://registry.npmjs.org/ajv/-/ajv-8.18.0.tgz",
      "integrity": "sha512-PlXPeEWMXMZ7sPYOHqmDyCJzcfNrUr3fGNKtezX14ykXOEIvyK81d+qydx89KY5O71FKMPaQ2vBfBFI5NHR63A==",
      "license": "MIT",
      "dependencies": {
        "fast-deep-equal": "^3.1.3",
        "fast-uri": "^3.0.1",
        "json-schema-traverse": "^1.0.0",
        "require-from-string": "^2.0.2"
      },
      "funding": {
        "type": "github",
        "url": "https://github.com/sponsors/epoberezkin"
      }
    },
    "node_modules/ajv-formats/node_modules/json-schema-traverse": {
      "version": "1.0.0",
      "resolved": "https://registry.npmjs.org/json-schema-traverse/-/json-schema-traverse-1.0.0.tgz",
      "integrity": "sha512-NM8/P9n3XjXhIZn1lLhkFaACTOURQXjWhV4BA/RnOv8xvgqtqpAX9IO4mRQxSx1Rlo4tqzeqb0sOlruaOy3dug==",
      "license": "MIT"
    },
    "node_modules/ansi-regex": {
      "version": "6.2.2",
      "resolved": "https://registry.npmjs.org/ansi-regex/-/ansi-regex-6.2.2.tgz",
      "integrity": "sha512-Bq3SmSpyFHaWjPk8If9yc6svM8c56dB5BAtW4Qbw5jHTwwXXcTLoRMkpDJp6VL0XzlWaCHTXrkFURMYmD0sLqg==",
      "license": "MIT",
      "engines": {
        "node": ">=12"
      },
      "funding": {
        "url": "https://github.com/chalk/ansi-regex?sponsor=1"
      }
    },
    "node_modules/ansi-styles": {
      "version": "4.3.0",
      "resolved": "https://registry.npmjs.org/ansi-styles/-/ansi-styles-4.3.0.tgz",
      "integrity": "sha512-zbB9rCJAT1rbjiVDb2hqKFHNYLxgtk8NURxZ3IZwD3F6NtxbXZQCnnSi1Lkx+IDohdPlFp222wVALIheZJQSEg==",
      "license": "MIT",
      "dependencies": {
        "color-convert": "^2.0.1"
      },
      "engines": {
        "node": ">=8"
      },
      "funding": {
        "url": "https://github.com/chalk/ansi-styles?sponsor=1"
      }
    },
    "node_modules/argparse": {
      "version": "2.0.1",
      "resolved": "https://registry.npmjs.org/argparse/-/argparse-2.0.1.tgz",
      "integrity": "sha512-8+9WqebbFzpX9OR+Wa6O29asIogeRMzcGtAINdpMHHyAg10f05aSFVBbcEqGf/PXw1EjAZ+q2/bEBg3DvurK3Q==",
      "license": "Python-2.0"
    },
    "node_modules/aria-hidden": {
      "version": "1.2.6",
      "resolved": "https://registry.npmjs.org/aria-hidden/-/aria-hidden-1.2.6.tgz",
      "integrity": "sha512-ik3ZgC9dY/lYVVM++OISsaYDeg1tb0VtP5uL3ouh1koGOaUMDPpbFIei4JkFimWUFPn90sbMNMXQAIVOlnYKJA==",
      "license": "MIT",
      "dependencies": {
        "tslib": "^2.0.0"
      },
      "engines": {
        "node": ">=10"
      }
    },
    "node_modules/aria-query": {
      "version": "5.3.2",
      "resolved": "https://registry.npmjs.org/aria-query/-/aria-query-5.3.2.tgz",
      "integrity": "sha512-COROpnaoap1E2F000S62r6A60uHZnmlvomhfyT2DlTcrY1OrBKn2UhH7qn5wTC9zMvD0AY7csdPSNwKP+7WiQw==",
      "dev": true,
      "license": "Apache-2.0",
      "engines": {
        "node": ">= 0.4"
      }
    },
    "node_modules/array-buffer-byte-length": {
      "version": "1.0.2",
      "resolved": "https://registry.npmjs.org/array-buffer-byte-length/-/array-buffer-byte-length-1.0.2.tgz",
      "integrity": "sha512-LHE+8BuR7RYGDKvnrmcuSq3tDcKv9OFEXQt/HpbZhY7V6h0zlUXutnAD82GiFx9rdieCMjkvtcsPqBwgUl1Iiw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "call-bound": "^1.0.3",
        "is-array-buffer": "^3.0.5"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/array-includes": {
      "version": "3.1.9",
      "resolved": "https://registry.npmjs.org/array-includes/-/array-includes-3.1.9.tgz",
      "integrity": "sha512-FmeCCAenzH0KH381SPT5FZmiA/TmpndpcaShhfgEN9eCVjnFBqq3l1xrI42y8+PPLI6hypzou4GXw00WHmPBLQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "call-bind": "^1.0.8",
        "call-bound": "^1.0.4",
        "define-properties": "^1.2.1",
        "es-abstract": "^1.24.0",
        "es-object-atoms": "^1.1.1",
        "get-intrinsic": "^1.3.0",
        "is-string": "^1.1.1",
        "math-intrinsics": "^1.1.0"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/array.prototype.findlast": {
      "version": "1.2.5",
      "resolved": "https://registry.npmjs.org/array.prototype.findlast/-/array.prototype.findlast-1.2.5.tgz",
      "integrity": "sha512-CVvd6FHg1Z3POpBLxO6E6zr+rSKEQ9L6rZHAaY7lLfhKsWYUBBOuMs0e9o24oopj6H+geRCX0YJ+TJLBK2eHyQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "call-bind": "^1.0.7",
        "define-properties": "^1.2.1",
        "es-abstract": "^1.23.2",
        "es-errors": "^1.3.0",
        "es-object-atoms": "^1.0.0",
        "es-shim-unscopables": "^1.0.2"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/array.prototype.findlastindex": {
      "version": "1.2.6",
      "resolved": "https://registry.npmjs.org/array.prototype.findlastindex/-/array.prototype.findlastindex-1.2.6.tgz",
      "integrity": "sha512-F/TKATkzseUExPlfvmwQKGITM3DGTK+vkAsCZoDc5daVygbJBnjEUCbgkAvVFsgfXfX4YIqZ/27G3k3tdXrTxQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "call-bind": "^1.0.8",
        "call-bound": "^1.0.4",
        "define-properties": "^1.2.1",
        "es-abstract": "^1.23.9",
        "es-errors": "^1.3.0",
        "es-object-atoms": "^1.1.1",
        "es-shim-unscopables": "^1.1.0"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/array.prototype.flat": {
      "version": "1.3.3",
      "resolved": "https://registry.npmjs.org/array.prototype.flat/-/array.prototype.flat-1.3.3.tgz",
      "integrity": "sha512-rwG/ja1neyLqCuGZ5YYrznA62D4mZXg0i1cIskIUKSiqF3Cje9/wXAls9B9s1Wa2fomMsIv8czB8jZcPmxCXFg==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "call-bind": "^1.0.8",
        "define-properties": "^1.2.1",
        "es-abstract": "^1.23.5",
        "es-shim-unscopables": "^1.0.2"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/array.prototype.flatmap": {
      "version": "1.3.3",
      "resolved": "https://registry.npmjs.org/array.prototype.flatmap/-/array.prototype.flatmap-1.3.3.tgz",
      "integrity": "sha512-Y7Wt51eKJSyi80hFrJCePGGNo5ktJCslFuboqJsbf57CCPcm5zztluPlc4/aD8sWsKvlwatezpV4U1efk8kpjg==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "call-bind": "^1.0.8",
        "define-properties": "^1.2.1",
        "es-abstract": "^1.23.5",
        "es-shim-unscopables": "^1.0.2"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/array.prototype.tosorted": {
      "version": "1.1.4",
      "resolved": "https://registry.npmjs.org/array.prototype.tosorted/-/array.prototype.tosorted-1.1.4.tgz",
      "integrity": "sha512-p6Fx8B7b7ZhL/gmUsAy0D15WhvDccw3mnGNbZpi3pmeJdxtWsj2jEaI4Y6oo3XiHfzuSgPwKc04MYt6KgvC/wA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "call-bind": "^1.0.7",
        "define-properties": "^1.2.1",
        "es-abstract": "^1.23.3",
        "es-errors": "^1.3.0",
        "es-shim-unscopables": "^1.0.2"
      },
      "engines": {
        "node": ">= 0.4"
      }
    },
    "node_modules/arraybuffer.prototype.slice": {
      "version": "1.0.4",
      "resolved": "https://registry.npmjs.org/arraybuffer.prototype.slice/-/arraybuffer.prototype.slice-1.0.4.tgz",
      "integrity": "sha512-BNoCY6SXXPQ7gF2opIP4GBE+Xw7U+pHMYKuzjgCN3GwiaIR09UUeKfheyIry77QtrCBlC0KK0q5/TER/tYh3PQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "array-buffer-byte-length": "^1.0.1",
        "call-bind": "^1.0.8",
        "define-properties": "^1.2.1",
        "es-abstract": "^1.23.5",
        "es-errors": "^1.3.0",
        "get-intrinsic": "^1.2.6",
        "is-array-buffer": "^3.0.4"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/ast-types": {
      "version": "0.16.1",
      "resolved": "https://registry.npmjs.org/ast-types/-/ast-types-0.16.1.tgz",
      "integrity": "sha512-6t10qk83GOG8p0vKmaCr8eiilZwO171AvbROMtvvNiwrTly62t+7XkA8RdIIVbpMhCASAsxgAzdRSwh6nw/5Dg==",
      "license": "MIT",
      "dependencies": {
        "tslib": "^2.0.1"
      },
      "engines": {
        "node": ">=4"
      }
    },
    "node_modules/ast-types-flow": {
      "version": "0.0.8",
      "resolved": "https://registry.npmjs.org/ast-types-flow/-/ast-types-flow-0.0.8.tgz",
      "integrity": "sha512-OH/2E5Fg20h2aPrbe+QL8JZQFko0YZaF+j4mnQ7BGhfavO7OpSLa8a0y9sBwomHdSbkhTS8TQNayBfnW5DwbvQ==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/async-function": {
      "version": "1.0.0",
      "resolved": "https://registry.npmjs.org/async-function/-/async-function-1.0.0.tgz",
      "integrity": "sha512-hsU18Ae8CDTR6Kgu9DYf0EbCr/a5iGL0rytQDobUcdpYOKokk8LEjVphnXkDkgpi0wYVsqrXuP0bZxJaTqdgoA==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">= 0.4"
      }
    },
    "node_modules/available-typed-arrays": {
      "version": "1.0.7",
      "resolved": "https://registry.npmjs.org/available-typed-arrays/-/available-typed-arrays-1.0.7.tgz",
      "integrity": "sha512-wvUjBtSGN7+7SjNpq/9M2Tg350UZD3q62IFZLbRAR1bSMlCo1ZaeW+BJ+D090e4hIIZLBcTDWe4Mh4jvUDajzQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "possible-typed-array-names": "^1.0.0"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/axe-core": {
      "version": "4.11.1",
      "resolved": "https://registry.npmjs.org/axe-core/-/axe-core-4.11.1.tgz",
      "integrity": "sha512-BASOg+YwO2C+346x3LZOeoovTIoTrRqEsqMa6fmfAV0P+U9mFr9NsyOEpiYvFjbc64NMrSswhV50WdXzdb/Z5A==",
      "dev": true,
      "license": "MPL-2.0",
      "engines": {
        "node": ">=4"
      }
    },
    "node_modules/axobject-query": {
      "version": "4.1.0",
      "resolved": "https://registry.npmjs.org/axobject-query/-/axobject-query-4.1.0.tgz",
      "integrity": "sha512-qIj0G9wZbMGNLjLmg1PT6v2mE9AH2zlnADJD/2tC6E00hgmhUOfEB6greHPAfLRSufHqROIUTkw6E+M3lH0PTQ==",
      "dev": true,
      "license": "Apache-2.0",
      "engines": {
        "node": ">= 0.4"
      }
    },
    "node_modules/balanced-match": {
      "version": "1.0.2",
      "resolved": "https://registry.npmjs.org/balanced-match/-/balanced-match-1.0.2.tgz",
      "integrity": "sha512-3oSeUO0TMV67hN1AmbXsK4yaqU7tjiHlbxRDZOpH0KW9+CeX4bRAaX0Anxt0tx2MrpRpWwQaPwIlISEJhYU5Pw==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/baseline-browser-mapping": {
      "version": "2.10.8",
      "resolved": "https://registry.npmjs.org/baseline-browser-mapping/-/baseline-browser-mapping-2.10.8.tgz",
      "integrity": "sha512-PCLz/LXGBsNTErbtB6i5u4eLpHeMfi93aUv5duMmj6caNu6IphS4q6UevDnL36sZQv9lrP11dbPKGMaXPwMKfQ==",
      "license": "Apache-2.0",
      "bin": {
        "baseline-browser-mapping": "dist/cli.cjs"
      },
      "engines": {
        "node": ">=6.0.0"
      }
    },
    "node_modules/better-auth": {
      "version": "1.5.5",
      "resolved": "https://registry.npmjs.org/better-auth/-/better-auth-1.5.5.tgz",
      "integrity": "sha512-GpVPaV1eqr3mOovKfghJXXk6QvlcVeFbS3z+n+FPDid5rK/2PchnDtiaVCzWyXA9jH2KkirOfl+JhAUvnja0Eg==",
      "license": "MIT",
      "dependencies": {
        "@better-auth/core": "1.5.5",
        "@better-auth/drizzle-adapter": "1.5.5",
        "@better-auth/kysely-adapter": "1.5.5",
        "@better-auth/memory-adapter": "1.5.5",
        "@better-auth/mongo-adapter": "1.5.5",
        "@better-auth/prisma-adapter": "1.5.5",
        "@better-auth/telemetry": "1.5.5",
        "@better-auth/utils": "0.3.1",
        "@better-fetch/fetch": "1.1.21",
        "@noble/ciphers": "^2.1.1",
        "@noble/hashes": "^2.0.1",
        "better-call": "1.3.2",
        "defu": "^6.1.4",
        "jose": "^6.1.3",
        "kysely": "^0.28.11",
        "nanostores": "^1.1.1",
        "zod": "^4.3.6"
      },
      "peerDependencies": {
        "@lynx-js/react": "*",
        "@prisma/client": "^5.0.0 || ^6.0.0 || ^7.0.0",
        "@sveltejs/kit": "^2.0.0",
        "@tanstack/react-start": "^1.0.0",
        "@tanstack/solid-start": "^1.0.0",
        "better-sqlite3": "^12.0.0",
        "drizzle-kit": ">=0.31.4",
        "drizzle-orm": ">=0.41.0",
        "mongodb": "^6.0.0 || ^7.0.0",
        "mysql2": "^3.0.0",
        "next": "^14.0.0 || ^15.0.0 || ^16.0.0",
        "pg": "^8.0.0",
        "prisma": "^5.0.0 || ^6.0.0 || ^7.0.0",
        "react": "^18.0.0 || ^19.0.0",
        "react-dom": "^18.0.0 || ^19.0.0",
        "solid-js": "^1.0.0",
        "svelte": "^4.0.0 || ^5.0.0",
        "vitest": "^2.0.0 || ^3.0.0 || ^4.0.0",
        "vue": "^3.0.0"
      },
      "peerDependenciesMeta": {
        "@lynx-js/react": {
          "optional": true
        },
        "@prisma/client": {
          "optional": true
        },
        "@sveltejs/kit": {
          "optional": true
        },
        "@tanstack/react-start": {
          "optional": true
        },
        "@tanstack/solid-start": {
          "optional": true
        },
        "better-sqlite3": {
          "optional": true
        },
        "drizzle-kit": {
          "optional": true
        },
        "drizzle-orm": {
          "optional": true
        },
        "mongodb": {
          "optional": true
        },
        "mysql2": {
          "optional": true
        },
        "next": {
          "optional": true
        },
        "pg": {
          "optional": true
        },
        "prisma": {
          "optional": true
        },
        "react": {
          "optional": true
        },
        "react-dom": {
          "optional": true
        },
        "solid-js": {
          "optional": true
        },
        "svelte": {
          "optional": true
        },
        "vitest": {
          "optional": true
        },
        "vue": {
          "optional": true
        }
      }
    },
    "node_modules/better-call": {
      "version": "1.3.2",
      "resolved": "https://registry.npmjs.org/better-call/-/better-call-1.3.2.tgz",
      "integrity": "sha512-4cZIfrerDsNTn3cm+MhLbUePN0gdwkhSXEuG7r/zuQ8c/H7iU0/jSK5TD3FW7U0MgKHce/8jGpPYNO4Ve+4NBw==",
      "license": "MIT",
      "dependencies": {
        "@better-auth/utils": "^0.3.1",
        "@better-fetch/fetch": "^1.1.21",
        "rou3": "^0.7.12",
        "set-cookie-parser": "^3.0.1"
      },
      "peerDependencies": {
        "zod": "^4.0.0"
      },
      "peerDependenciesMeta": {
        "zod": {
          "optional": true
        }
      }
    },
    "node_modules/body-parser": {
      "version": "2.2.2",
      "resolved": "https://registry.npmjs.org/body-parser/-/body-parser-2.2.2.tgz",
      "integrity": "sha512-oP5VkATKlNwcgvxi0vM0p/D3n2C3EReYVX+DNYs5TjZFn/oQt2j+4sVJtSMr18pdRr8wjTcBl6LoV+FUwzPmNA==",
      "license": "MIT",
      "dependencies": {
        "bytes": "^3.1.2",
        "content-type": "^1.0.5",
        "debug": "^4.4.3",
        "http-errors": "^2.0.0",
        "iconv-lite": "^0.7.0",
        "on-finished": "^2.4.1",
        "qs": "^6.14.1",
        "raw-body": "^3.0.1",
        "type-is": "^2.0.1"
      },
      "engines": {
        "node": ">=18"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/express"
      }
    },
    "node_modules/brace-expansion": {
      "version": "1.1.12",
      "resolved": "https://registry.npmjs.org/brace-expansion/-/brace-expansion-1.1.12.tgz",
      "integrity": "sha512-9T9UjW3r0UW5c1Q7GTwllptXwhvYmEzFhzMfZ9H7FQWt+uZePjZPjBP/W1ZEyZ1twGWom5/56TF4lPcqjnDHcg==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "balanced-match": "^1.0.0",
        "concat-map": "0.0.1"
      }
    },
    "node_modules/braces": {
      "version": "3.0.3",
      "resolved": "https://registry.npmjs.org/braces/-/braces-3.0.3.tgz",
      "integrity": "sha512-yQbXgO/OSZVD2IsiLlro+7Hf6Q18EJrKSEsdoMzKePKXct3gvD8oLcOQdIzGupr5Fj+EDe8gO/lxc1BzfMpxvA==",
      "license": "MIT",
      "dependencies": {
        "fill-range": "^7.1.1"
      },
      "engines": {
        "node": ">=8"
      }
    },
    "node_modules/browserslist": {
      "version": "4.28.1",
      "resolved": "https://registry.npmjs.org/browserslist/-/browserslist-4.28.1.tgz",
      "integrity": "sha512-ZC5Bd0LgJXgwGqUknZY/vkUQ04r8NXnJZ3yYi4vDmSiZmC/pdSN0NbNRPxZpbtO4uAfDUAFffO8IZoM3Gj8IkA==",
      "funding": [
        {
          "type": "opencollective",
          "url": "https://opencollective.com/browserslist"
        },
        {
          "type": "tidelift",
          "url": "https://tidelift.com/funding/github/npm/browserslist"
        },
        {
          "type": "github",
          "url": "https://github.com/sponsors/ai"
        }
      ],
      "license": "MIT",
      "dependencies": {
        "baseline-browser-mapping": "^2.9.0",
        "caniuse-lite": "^1.0.30001759",
        "electron-to-chromium": "^1.5.263",
        "node-releases": "^2.0.27",
        "update-browserslist-db": "^1.2.0"
      },
      "bin": {
        "browserslist": "cli.js"
      },
      "engines": {
        "node": "^6 || ^7 || ^8 || ^9 || ^10 || ^11 || ^12 || >=13.7"
      }
    },
    "node_modules/bson": {
      "version": "7.2.0",
      "resolved": "https://registry.npmjs.org/bson/-/bson-7.2.0.tgz",
      "integrity": "sha512-YCEo7KjMlbNlyHhz7zAZNDpIpQbd+wOEHJYezv0nMYTn4x31eIUM2yomNNubclAt63dObUzKHWsBLJ9QcZNSnQ==",
      "license": "Apache-2.0",
      "peer": true,
      "engines": {
        "node": ">=20.19.0"
      }
    },
    "node_modules/bundle-name": {
      "version": "4.1.0",
      "resolved": "https://registry.npmjs.org/bundle-name/-/bundle-name-4.1.0.tgz",
      "integrity": "sha512-tjwM5exMg6BGRI+kNmTntNsvdZS1X8BFYS6tnJ2hdH0kVxM6/eVZ2xy+FqStSWvYmtfFMDLIxurorHwDKfDz5Q==",
      "license": "MIT",
      "dependencies": {
        "run-applescript": "^7.0.0"
      },
      "engines": {
        "node": ">=18"
      },
      "funding": {
        "url": "https://github.com/sponsors/sindresorhus"
      }
    },
    "node_modules/bytes": {
      "version": "3.1.2",
      "resolved": "https://registry.npmjs.org/bytes/-/bytes-3.1.2.tgz",
      "integrity": "sha512-/Nf7TyzTx6S3yRJObOAV7956r8cr2+Oj8AC5dt8wSP3BQAoeX58NoHyCU8P8zGkNXStjTSi6fzO6F0pBdcYbEg==",
      "license": "MIT",
      "engines": {
        "node": ">= 0.8"
      }
    },
    "node_modules/call-bind": {
      "version": "1.0.8",
      "resolved": "https://registry.npmjs.org/call-bind/-/call-bind-1.0.8.tgz",
      "integrity": "sha512-oKlSFMcMwpUg2ednkhQ454wfWiU/ul3CkJe/PEHcTKuiX6RpbehUiFMXu13HalGZxfUwCQzZG747YXBn1im9ww==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "call-bind-apply-helpers": "^1.0.0",
        "es-define-property": "^1.0.0",
        "get-intrinsic": "^1.2.4",
        "set-function-length": "^1.2.2"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/call-bind-apply-helpers": {
      "version": "1.0.2",
      "resolved": "https://registry.npmjs.org/call-bind-apply-helpers/-/call-bind-apply-helpers-1.0.2.tgz",
      "integrity": "sha512-Sp1ablJ0ivDkSzjcaJdxEunN5/XvksFJ2sMBFfq6x0ryhQV/2b/KwFe21cMpmHtPOSij8K99/wSfoEuTObmuMQ==",
      "license": "MIT",
      "dependencies": {
        "es-errors": "^1.3.0",
        "function-bind": "^1.1.2"
      },
      "engines": {
        "node": ">= 0.4"
      }
    },
    "node_modules/call-bound": {
      "version": "1.0.4",
      "resolved": "https://registry.npmjs.org/call-bound/-/call-bound-1.0.4.tgz",
      "integrity": "sha512-+ys997U96po4Kx/ABpBCqhA9EuxJaQWDQg7295H4hBphv3IZg0boBKuwYpt4YXp6MZ5AmZQnU/tyMTlRpaSejg==",
      "license": "MIT",
      "dependencies": {
        "call-bind-apply-helpers": "^1.0.2",
        "get-intrinsic": "^1.3.0"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/callsites": {
      "version": "3.1.0",
      "resolved": "https://registry.npmjs.org/callsites/-/callsites-3.1.0.tgz",
      "integrity": "sha512-P8BjAsXvZS+VIDUI11hHCQEv74YT67YUi5JJFNWIqL235sBmjX4+qx9Muvls5ivyNENctx46xQLQ3aTuE7ssaQ==",
      "license": "MIT",
      "engines": {
        "node": ">=6"
      }
    },
    "node_modules/caniuse-lite": {
      "version": "1.0.30001780",
      "resolved": "https://registry.npmjs.org/caniuse-lite/-/caniuse-lite-1.0.30001780.tgz",
      "integrity": "sha512-llngX0E7nQci5BPJDqoZSbuZ5Bcs9F5db7EtgfwBerX9XGtkkiO4NwfDDIRzHTTwcYC8vC7bmeUEPGrKlR/TkQ==",
      "funding": [
        {
          "type": "opencollective",
          "url": "https://opencollective.com/browserslist"
        },
        {
          "type": "tidelift",
          "url": "https://tidelift.com/funding/github/npm/caniuse-lite"
        },
        {
          "type": "github",
          "url": "https://github.com/sponsors/ai"
        }
      ],
      "license": "CC-BY-4.0"
    },
    "node_modules/chalk": {
      "version": "4.1.2",
      "resolved": "https://registry.npmjs.org/chalk/-/chalk-4.1.2.tgz",
      "integrity": "sha512-oKnbhFyRIXpUuez8iBMmyEa4nbj4IOQyuhc/wy9kY7/WVPcwIO9VA668Pu8RkO7+0G76SLROeyw9CpQ061i4mA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "ansi-styles": "^4.1.0",
        "supports-color": "^7.1.0"
      },
      "engines": {
        "node": ">=10"
      },
      "funding": {
        "url": "https://github.com/chalk/chalk?sponsor=1"
      }
    },
    "node_modules/class-variance-authority": {
      "version": "0.7.1",
      "resolved": "https://registry.npmjs.org/class-variance-authority/-/class-variance-authority-0.7.1.tgz",
      "integrity": "sha512-Ka+9Trutv7G8M6WT6SeiRWz792K5qEqIGEGzXKhAE6xOWAY6pPH8U+9IY3oCMv6kqTmLsv7Xh/2w2RigkePMsg==",
      "license": "Apache-2.0",
      "dependencies": {
        "clsx": "^2.1.1"
      },
      "funding": {
        "url": "https://polar.sh/cva"
      }
    },
    "node_modules/cli-cursor": {
      "version": "5.0.0",
      "resolved": "https://registry.npmjs.org/cli-cursor/-/cli-cursor-5.0.0.tgz",
      "integrity": "sha512-aCj4O5wKyszjMmDT4tZj93kxyydN/K5zPWSCe6/0AV/AA1pqe5ZBIw0a2ZfPQV7lL5/yb5HsUreJ6UFAF1tEQw==",
      "license": "MIT",
      "dependencies": {
        "restore-cursor": "^5.0.0"
      },
      "engines": {
        "node": ">=18"
      },
      "funding": {
        "url": "https://github.com/sponsors/sindresorhus"
      }
    },
    "node_modules/cli-spinners": {
      "version": "2.9.2",
      "resolved": "https://registry.npmjs.org/cli-spinners/-/cli-spinners-2.9.2.tgz",
      "integrity": "sha512-ywqV+5MmyL4E7ybXgKys4DugZbX0FC6LnwrhjuykIjnK9k8OQacQ7axGKnjDXWNhns0xot3bZI5h55H8yo9cJg==",
      "license": "MIT",
      "engines": {
        "node": ">=6"
      },
      "funding": {
        "url": "https://github.com/sponsors/sindresorhus"
      }
    },
    "node_modules/cli-width": {
      "version": "4.1.0",
      "resolved": "https://registry.npmjs.org/cli-width/-/cli-width-4.1.0.tgz",
      "integrity": "sha512-ouuZd4/dm2Sw5Gmqy6bGyNNNe1qt9RpmxveLSO7KcgsTnU7RXfsw+/bukWGo1abgBiMAic068rclZsO4IWmmxQ==",
      "license": "ISC",
      "engines": {
        "node": ">= 12"
      }
    },
    "node_modules/client-only": {
      "version": "0.0.1",
      "resolved": "https://registry.npmjs.org/client-only/-/client-only-0.0.1.tgz",
      "integrity": "sha512-IV3Ou0jSMzZrd3pZ48nLkT9DA7Ag1pnPzaiQhpW7c3RbcqqzvzzVu+L8gfqMp/8IM2MQtSiqaCxrrcfu8I8rMA==",
      "license": "MIT"
    },
    "node_modules/cliui": {
      "version": "8.0.1",
      "resolved": "https://registry.npmjs.org/cliui/-/cliui-8.0.1.tgz",
      "integrity": "sha512-BSeNnyus75C4//NQ9gQt1/csTXyo/8Sb+afLAkzAptFuMsod9HFokGNudZpi/oQV73hnVK+sR+5PVRMd+Dr7YQ==",
      "license": "ISC",
      "dependencies": {
        "string-width": "^4.2.0",
        "strip-ansi": "^6.0.1",
        "wrap-ansi": "^7.0.0"
      },
      "engines": {
        "node": ">=12"
      }
    },
    "node_modules/cliui/node_modules/ansi-regex": {
      "version": "5.0.1",
      "resolved": "https://registry.npmjs.org/ansi-regex/-/ansi-regex-5.0.1.tgz",
      "integrity": "sha512-quJQXlTSUGL2LH9SUXo8VwsY4soanhgo6LNSm84E1LBcE8s3O0wpdiRzyR9z/ZZJMlMWv37qOOb9pdJlMUEKFQ==",
      "license": "MIT",
      "engines": {
        "node": ">=8"
      }
    },
    "node_modules/cliui/node_modules/emoji-regex": {
      "version": "8.0.0",
      "resolved": "https://registry.npmjs.org/emoji-regex/-/emoji-regex-8.0.0.tgz",
      "integrity": "sha512-MSjYzcWNOA0ewAHpz0MxpYFvwg6yjy1NG3xteoqz644VCo/RPgnr1/GGt+ic3iJTzQ8Eu3TdM14SawnVUmGE6A==",
      "license": "MIT"
    },
    "node_modules/cliui/node_modules/string-width": {
      "version": "4.2.3",
      "resolved": "https://registry.npmjs.org/string-width/-/string-width-4.2.3.tgz",
      "integrity": "sha512-wKyQRQpjJ0sIp62ErSZdGsjMJWsap5oRNihHhu6G7JVO/9jIB6UyevL+tXuOqrng8j/cxKTWyWUwvSTriiZz/g==",
      "license": "MIT",
      "dependencies": {
        "emoji-regex": "^8.0.0",
        "is-fullwidth-code-point": "^3.0.0",
        "strip-ansi": "^6.0.1"
      },
      "engines": {
        "node": ">=8"
      }
    },
    "node_modules/cliui/node_modules/strip-ansi": {
      "version": "6.0.1",
      "resolved": "https://registry.npmjs.org/strip-ansi/-/strip-ansi-6.0.1.tgz",
      "integrity": "sha512-Y38VPSHcqkFrCpFnQ9vuSXmquuv5oXOKpGeT6aGrr3o3Gc9AlVa6JBfUSOCnbxGGZF+/0ooI7KrPuUSztUdU5A==",
      "license": "MIT",
      "dependencies": {
        "ansi-regex": "^5.0.1"
      },
      "engines": {
        "node": ">=8"
      }
    },
    "node_modules/cliui/node_modules/wrap-ansi": {
      "version": "7.0.0",
      "resolved": "https://registry.npmjs.org/wrap-ansi/-/wrap-ansi-7.0.0.tgz",
      "integrity": "sha512-YVGIj2kamLSTxw6NsZjoBxfSwsn0ycdesmc4p+Q21c5zPuZ1pl+NfxVdxPtdHvmNVOQ6XSYG4AUtyt/Fi7D16Q==",
      "license": "MIT",
      "dependencies": {
        "ansi-styles": "^4.0.0",
        "string-width": "^4.1.0",
        "strip-ansi": "^6.0.0"
      },
      "engines": {
        "node": ">=10"
      },
      "funding": {
        "url": "https://github.com/chalk/wrap-ansi?sponsor=1"
      }
    },
    "node_modules/clsx": {
      "version": "2.1.1",
      "resolved": "https://registry.npmjs.org/clsx/-/clsx-2.1.1.tgz",
      "integrity": "sha512-eYm0QWBtUrBWZWG0d386OGAw16Z995PiOVo2B7bjWSbHedGl5e0ZWaq65kOGgUSNesEIDkB9ISbTg/JK9dhCZA==",
      "license": "MIT",
      "engines": {
        "node": ">=6"
      }
    },
    "node_modules/code-block-writer": {
      "version": "13.0.3",
      "resolved": "https://registry.npmjs.org/code-block-writer/-/code-block-writer-13.0.3.tgz",
      "integrity": "sha512-Oofo0pq3IKnsFtuHqSF7TqBfr71aeyZDVJ0HpmqB7FBM2qEigL0iPONSCZSO9pE9dZTAxANe5XHG9Uy0YMv8cg==",
      "license": "MIT"
    },
    "node_modules/color-convert": {
      "version": "2.0.1",
      "resolved": "https://registry.npmjs.org/color-convert/-/color-convert-2.0.1.tgz",
      "integrity": "sha512-RRECPsj7iu/xb5oKYcsFHSppFNnsj/52OVTRKb4zP5onXwVF3zVmmToNcOfGC+CRDpfK/U584fMg38ZHCaElKQ==",
      "license": "MIT",
      "dependencies": {
        "color-name": "~1.1.4"
      },
      "engines": {
        "node": ">=7.0.0"
      }
    },
    "node_modules/color-name": {
      "version": "1.1.4",
      "resolved": "https://registry.npmjs.org/color-name/-/color-name-1.1.4.tgz",
      "integrity": "sha512-dOy+3AuW3a2wNbZHIuMZpTcgjGuLU/uBL/ubcZF9OXbDo8ff4O8yVp5Bf0efS8uEoYo5q4Fx7dY9OgQGXgAsQA==",
      "license": "MIT"
    },
    "node_modules/commander": {
      "version": "14.0.3",
      "resolved": "https://registry.npmjs.org/commander/-/commander-14.0.3.tgz",
      "integrity": "sha512-H+y0Jo/T1RZ9qPP4Eh1pkcQcLRglraJaSLoyOtHxu6AapkjWVCy2Sit1QQ4x3Dng8qDlSsZEet7g5Pq06MvTgw==",
      "license": "MIT",
      "engines": {
        "node": ">=20"
      }
    },
    "node_modules/concat-map": {
      "version": "0.0.1",
      "resolved": "https://registry.npmjs.org/concat-map/-/concat-map-0.0.1.tgz",
      "integrity": "sha512-/Srv4dswyQNBfohGpz9o6Yb3Gz3SrUDqBH5rTuhGR7ahtlbYKnVxw2bCFMRljaA7EXHaXZ8wsHdodFvbkhKmqg==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/content-disposition": {
      "version": "1.0.1",
      "resolved": "https://registry.npmjs.org/content-disposition/-/content-disposition-1.0.1.tgz",
      "integrity": "sha512-oIXISMynqSqm241k6kcQ5UwttDILMK4BiurCfGEREw6+X9jkkpEe5T9FZaApyLGGOnFuyMWZpdolTXMtvEJ08Q==",
      "license": "MIT",
      "engines": {
        "node": ">=18"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/express"
      }
    },
    "node_modules/content-type": {
      "version": "1.0.5",
      "resolved": "https://registry.npmjs.org/content-type/-/content-type-1.0.5.tgz",
      "integrity": "sha512-nTjqfcBFEipKdXCv4YDQWCfmcLZKm81ldF0pAopTvyrFGVbcR6P/VAAd5G7N+0tTr8QqiU0tFadD6FK4NtJwOA==",
      "license": "MIT",
      "engines": {
        "node": ">= 0.6"
      }
    },
    "node_modules/convert-source-map": {
      "version": "2.0.0",
      "resolved": "https://registry.npmjs.org/convert-source-map/-/convert-source-map-2.0.0.tgz",
      "integrity": "sha512-Kvp459HrV2FEJ1CAsi1Ku+MY3kasH19TFykTz2xWmMeq6bk2NU3XXvfJ+Q61m0xktWwt+1HSYf3JZsTms3aRJg==",
      "license": "MIT"
    },
    "node_modules/cookie": {
      "version": "0.7.2",
      "resolved": "https://registry.npmjs.org/cookie/-/cookie-0.7.2.tgz",
      "integrity": "sha512-yki5XnKuf750l50uGTllt6kKILY4nQ1eNIQatoXEByZ5dWgnKqbnqmTrBE5B4N7lrMJKQ2ytWMiTO2o0v6Ew/w==",
      "license": "MIT",
      "engines": {
        "node": ">= 0.6"
      }
    },
    "node_modules/cookie-signature": {
      "version": "1.2.2",
      "resolved": "https://registry.npmjs.org/cookie-signature/-/cookie-signature-1.2.2.tgz",
      "integrity": "sha512-D76uU73ulSXrD1UXF4KE2TMxVVwhsnCgfAyTg9k8P6KGZjlXKrOLe4dJQKI3Bxi5wjesZoFXJWElNWBjPZMbhg==",
      "license": "MIT",
      "engines": {
        "node": ">=6.6.0"
      }
    },
    "node_modules/cors": {
      "version": "2.8.6",
      "resolved": "https://registry.npmjs.org/cors/-/cors-2.8.6.tgz",
      "integrity": "sha512-tJtZBBHA6vjIAaF6EnIaq6laBBP9aq/Y3ouVJjEfoHbRBcHBAHYcMh/w8LDrk2PvIMMq8gmopa5D4V8RmbrxGw==",
      "license": "MIT",
      "dependencies": {
        "object-assign": "^4",
        "vary": "^1"
      },
      "engines": {
        "node": ">= 0.10"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/express"
      }
    },
    "node_modules/cosmiconfig": {
      "version": "9.0.1",
      "resolved": "https://registry.npmjs.org/cosmiconfig/-/cosmiconfig-9.0.1.tgz",
      "integrity": "sha512-hr4ihw+DBqcvrsEDioRO31Z17x71pUYoNe/4h6Z0wB72p7MU7/9gH8Q3s12NFhHPfYBBOV3qyfUxmr/Yn3shnQ==",
      "license": "MIT",
      "dependencies": {
        "env-paths": "^2.2.1",
        "import-fresh": "^3.3.0",
        "js-yaml": "^4.1.0",
        "parse-json": "^5.2.0"
      },
      "engines": {
        "node": ">=14"
      },
      "funding": {
        "url": "https://github.com/sponsors/d-fischer"
      },
      "peerDependencies": {
        "typescript": ">=4.9.5"
      },
      "peerDependenciesMeta": {
        "typescript": {
          "optional": true
        }
      }
    },
    "node_modules/cross-spawn": {
      "version": "7.0.6",
      "resolved": "https://registry.npmjs.org/cross-spawn/-/cross-spawn-7.0.6.tgz",
      "integrity": "sha512-uV2QOWP2nWzsy2aMp8aRibhi9dlzF5Hgh5SHaB9OiTGEyDTiJJyx0uy51QXdyWbtAHNua4XJzUKca3OzKUd3vA==",
      "license": "MIT",
      "dependencies": {
        "path-key": "^3.1.0",
        "shebang-command": "^2.0.0",
        "which": "^2.0.1"
      },
      "engines": {
        "node": ">= 8"
      }
    },
    "node_modules/cssesc": {
      "version": "3.0.0",
      "resolved": "https://registry.npmjs.org/cssesc/-/cssesc-3.0.0.tgz",
      "integrity": "sha512-/Tb/JcjK111nNScGob5MNtsntNM1aCNUDipB/TkwZFhyDrrE47SOx/18wF2bbjgc3ZzCSKW1T5nt5EbFoAz/Vg==",
      "license": "MIT",
      "bin": {
        "cssesc": "bin/cssesc"
      },
      "engines": {
        "node": ">=4"
      }
    },
    "node_modules/csstype": {
      "version": "3.2.3",
      "resolved": "https://registry.npmjs.org/csstype/-/csstype-3.2.3.tgz",
      "integrity": "sha512-z1HGKcYy2xA8AGQfwrn0PAy+PB7X/GSj3UVJW9qKyn43xWa+gl5nXmU4qqLMRzWVLFC8KusUX8T/0kCiOYpAIQ==",
      "devOptional": true,
      "license": "MIT"
    },
    "node_modules/damerau-levenshtein": {
      "version": "1.0.8",
      "resolved": "https://registry.npmjs.org/damerau-levenshtein/-/damerau-levenshtein-1.0.8.tgz",
      "integrity": "sha512-sdQSFB7+llfUcQHUQO3+B8ERRj0Oa4w9POWMI/puGtuf7gFywGmkaLCElnudfTiKZV+NvHqL0ifzdrI8Ro7ESA==",
      "dev": true,
      "license": "BSD-2-Clause"
    },
    "node_modules/data-uri-to-buffer": {
      "version": "4.0.1",
      "resolved": "https://registry.npmjs.org/data-uri-to-buffer/-/data-uri-to-buffer-4.0.1.tgz",
      "integrity": "sha512-0R9ikRb668HB7QDxT1vkpuUBtqc53YyAwMwGeUFKRojY/NWKvdZ+9UYtRfGmhqNbRkTSVpMbmyhXipFFv2cb/A==",
      "license": "MIT",
      "engines": {
        "node": ">= 12"
      }
    },
    "node_modules/data-view-buffer": {
      "version": "1.0.2",
      "resolved": "https://registry.npmjs.org/data-view-buffer/-/data-view-buffer-1.0.2.tgz",
      "integrity": "sha512-EmKO5V3OLXh1rtK2wgXRansaK1/mtVdTUEiEI0W8RkvgT05kfxaH29PliLnpLP73yYO6142Q72QNa8Wx/A5CqQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "call-bound": "^1.0.3",
        "es-errors": "^1.3.0",
        "is-data-view": "^1.0.2"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/data-view-byte-length": {
      "version": "1.0.2",
      "resolved": "https://registry.npmjs.org/data-view-byte-length/-/data-view-byte-length-1.0.2.tgz",
      "integrity": "sha512-tuhGbE6CfTM9+5ANGf+oQb72Ky/0+s3xKUpHvShfiz2RxMFgFPjsXuRLBVMtvMs15awe45SRb83D6wH4ew6wlQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "call-bound": "^1.0.3",
        "es-errors": "^1.3.0",
        "is-data-view": "^1.0.2"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/inspect-js"
      }
    },
    "node_modules/data-view-byte-offset": {
      "version": "1.0.1",
      "resolved": "https://registry.npmjs.org/data-view-byte-offset/-/data-view-byte-offset-1.0.1.tgz",
      "integrity": "sha512-BS8PfmtDGnrgYdOonGZQdLZslWIeCGFP9tpan0hi1Co2Zr2NKADsvGYA8XxuG/4UWgJ6Cjtv+YJnB6MM69QGlQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "call-bound": "^1.0.2",
        "es-errors": "^1.3.0",
        "is-data-view": "^1.0.1"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/debug": {
      "version": "4.4.3",
      "resolved": "https://registry.npmjs.org/debug/-/debug-4.4.3.tgz",
      "integrity": "sha512-RGwwWnwQvkVfavKVt22FGLw+xYSdzARwm0ru6DhTVA3umU5hZc28V3kO4stgYryrTlLpuvgI9GiijltAjNbcqA==",
      "license": "MIT",
      "dependencies": {
        "ms": "^2.1.3"
      },
      "engines": {
        "node": ">=6.0"
      },
      "peerDependenciesMeta": {
        "supports-color": {
          "optional": true
        }
      }
    },
    "node_modules/dedent": {
      "version": "1.7.2",
      "resolved": "https://registry.npmjs.org/dedent/-/dedent-1.7.2.tgz",
      "integrity": "sha512-WzMx3mW98SN+zn3hgemf4OzdmyNhhhKz5Ay0pUfQiMQ3e1g+xmTJWp/pKdwKVXhdSkAEGIIzqeuWrL3mV/AXbA==",
      "license": "MIT",
      "peerDependencies": {
        "babel-plugin-macros": "^3.1.0"
      },
      "peerDependenciesMeta": {
        "babel-plugin-macros": {
          "optional": true
        }
      }
    },
    "node_modules/deep-is": {
      "version": "0.1.4",
      "resolved": "https://registry.npmjs.org/deep-is/-/deep-is-0.1.4.tgz",
      "integrity": "sha512-oIPzksmTg4/MriiaYGO+okXDT7ztn/w3Eptv/+gSIdMdKsJo0u4CfYNFJPy+4SKMuCqGw2wxnA+URMg3t8a/bQ==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/deepmerge": {
      "version": "4.3.1",
      "resolved": "https://registry.npmjs.org/deepmerge/-/deepmerge-4.3.1.tgz",
      "integrity": "sha512-3sUqbMEc77XqpdNO7FRyRog+eW3ph+GYCbj+rK+uYyRMuwsVy0rMiVtPn+QJlKFvWP/1PYpapqYn0Me2knFn+A==",
      "license": "MIT",
      "engines": {
        "node": ">=0.10.0"
      }
    },
    "node_modules/default-browser": {
      "version": "5.5.0",
      "resolved": "https://registry.npmjs.org/default-browser/-/default-browser-5.5.0.tgz",
      "integrity": "sha512-H9LMLr5zwIbSxrmvikGuI/5KGhZ8E2zH3stkMgM5LpOWDutGM2JZaj460Udnf1a+946zc7YBgrqEWwbk7zHvGw==",
      "license": "MIT",
      "dependencies": {
        "bundle-name": "^4.1.0",
        "default-browser-id": "^5.0.0"
      },
      "engines": {
        "node": ">=18"
      },
      "funding": {
        "url": "https://github.com/sponsors/sindresorhus"
      }
    },
    "node_modules/default-browser-id": {
      "version": "5.0.1",
      "resolved": "https://registry.npmjs.org/default-browser-id/-/default-browser-id-5.0.1.tgz",
      "integrity": "sha512-x1VCxdX4t+8wVfd1so/9w+vQ4vx7lKd2Qp5tDRutErwmR85OgmfX7RlLRMWafRMY7hbEiXIbudNrjOAPa/hL8Q==",
      "license": "MIT",
      "engines": {
        "node": ">=18"
      },
      "funding": {
        "url": "https://github.com/sponsors/sindresorhus"
      }
    },
    "node_modules/define-data-property": {
      "version": "1.1.4",
      "resolved": "https://registry.npmjs.org/define-data-property/-/define-data-property-1.1.4.tgz",
      "integrity": "sha512-rBMvIzlpA8v6E+SJZoo++HAYqsLrkg7MSfIinMPFhmkorw7X+dOXVJQs+QT69zGkzMyfDnIMN2Wid1+NbL3T+A==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "es-define-property": "^1.0.0",
        "es-errors": "^1.3.0",
        "gopd": "^1.0.1"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/define-lazy-prop": {
      "version": "3.0.0",
      "resolved": "https://registry.npmjs.org/define-lazy-prop/-/define-lazy-prop-3.0.0.tgz",
      "integrity": "sha512-N+MeXYoqr3pOgn8xfyRPREN7gHakLYjhsHhWGT3fWAiL4IkAt0iDw14QiiEm2bE30c5XX5q0FtAA3CK5f9/BUg==",
      "license": "MIT",
      "engines": {
        "node": ">=12"
      },
      "funding": {
        "url": "https://github.com/sponsors/sindresorhus"
      }
    },
    "node_modules/define-properties": {
      "version": "1.2.1",
      "resolved": "https://registry.npmjs.org/define-properties/-/define-properties-1.2.1.tgz",
      "integrity": "sha512-8QmQKqEASLd5nx0U1B1okLElbUuuttJ/AnYmRXbbbGDWh6uS208EjD4Xqq/I9wK7u0v6O08XhTWnt5XtEbR6Dg==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "define-data-property": "^1.0.1",
        "has-property-descriptors": "^1.0.0",
        "object-keys": "^1.1.1"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/defu": {
      "version": "6.1.4",
      "resolved": "https://registry.npmjs.org/defu/-/defu-6.1.4.tgz",
      "integrity": "sha512-mEQCMmwJu317oSz8CwdIOdwf3xMif1ttiM8LTufzc3g6kR+9Pe236twL8j3IYT1F7GfRgGcW6MWxzZjLIkuHIg==",
      "license": "MIT"
    },
    "node_modules/depd": {
      "version": "2.0.0",
      "resolved": "https://registry.npmjs.org/depd/-/depd-2.0.0.tgz",
      "integrity": "sha512-g7nH6P6dyDioJogAAGprGpCtVImJhpPk/roCzdb3fIh61/s/nPsfR6onyMwkCAR/OlC3yBC0lESvUoQEAssIrw==",
      "license": "MIT",
      "engines": {
        "node": ">= 0.8"
      }
    },
    "node_modules/detect-libc": {
      "version": "2.1.2",
      "resolved": "https://registry.npmjs.org/detect-libc/-/detect-libc-2.1.2.tgz",
      "integrity": "sha512-Btj2BOOO83o3WyH59e8MgXsxEQVcarkUOpEYrubB0urwnN10yQ364rsiByU11nZlqWYZm05i/of7io4mzihBtQ==",
      "devOptional": true,
      "license": "Apache-2.0",
      "engines": {
        "node": ">=8"
      }
    },
    "node_modules/detect-node-es": {
      "version": "1.1.0",
      "resolved": "https://registry.npmjs.org/detect-node-es/-/detect-node-es-1.1.0.tgz",
      "integrity": "sha512-ypdmJU/TbBby2Dxibuv7ZLW3Bs1QEmM7nHjEANfohJLvE0XVujisn1qPJcZxg+qDucsr+bP6fLD1rPS3AhJ7EQ==",
      "license": "MIT"
    },
    "node_modules/dexie": {
      "version": "4.4.2",
      "resolved": "https://registry.npmjs.org/dexie/-/dexie-4.4.2.tgz",
      "integrity": "sha512-zMtV8q79EFE5U8FKZvt0Y/77PCU/Hr/RDxv1EDeo228L+m/HTbeN2AjoQm674rhQCX8n3ljK87lajt7UQuZfvw==",
      "license": "Apache-2.0"
    },
    "node_modules/diff": {
      "version": "8.0.4",
      "resolved": "https://registry.npmjs.org/diff/-/diff-8.0.4.tgz",
      "integrity": "sha512-DPi0FmjiSU5EvQV0++GFDOJ9ASQUVFh5kD+OzOnYdi7n3Wpm9hWWGfB/O2blfHcMVTL5WkQXSnRiK9makhrcnw==",
      "license": "BSD-3-Clause",
      "engines": {
        "node": ">=0.3.1"
      }
    },
    "node_modules/doctrine": {
      "version": "2.1.0",
      "resolved": "https://registry.npmjs.org/doctrine/-/doctrine-2.1.0.tgz",
      "integrity": "sha512-35mSku4ZXK0vfCuHEDAwt55dg2jNajHZ1odvF+8SSr82EsZY4QmXfuWso8oEd8zRhVObSN18aM0CjSdoBX7zIw==",
      "dev": true,
      "license": "Apache-2.0",
      "dependencies": {
        "esutils": "^2.0.2"
      },
      "engines": {
        "node": ">=0.10.0"
      }
    },
    "node_modules/dotenv": {
      "version": "17.3.1",
      "resolved": "https://registry.npmjs.org/dotenv/-/dotenv-17.3.1.tgz",
      "integrity": "sha512-IO8C/dzEb6O3F9/twg6ZLXz164a2fhTnEWb95H23Dm4OuN+92NmEAlTrupP9VW6Jm3sO26tQlqyvyi4CsnY9GA==",
      "license": "BSD-2-Clause",
      "engines": {
        "node": ">=12"
      },
      "funding": {
        "url": "https://dotenvx.com"
      }
    },
    "node_modules/dunder-proto": {
      "version": "1.0.1",
      "resolved": "https://registry.npmjs.org/dunder-proto/-/dunder-proto-1.0.1.tgz",
      "integrity": "sha512-KIN/nDJBQRcXw0MLVhZE9iQHmG68qAVIBg9CqmUYjmQIhgij9U5MFvrqkUL5FbtyyzZuOeOt0zdeRe4UY7ct+A==",
      "license": "MIT",
      "dependencies": {
        "call-bind-apply-helpers": "^1.0.1",
        "es-errors": "^1.3.0",
        "gopd": "^1.2.0"
      },
      "engines": {
        "node": ">= 0.4"
      }
    },
    "node_modules/eciesjs": {
      "version": "0.4.18",
      "resolved": "https://registry.npmjs.org/eciesjs/-/eciesjs-0.4.18.tgz",
      "integrity": "sha512-wG99Zcfcys9fZux7Cft8BAX/YrOJLJSZ3jyYPfhZHqN2E+Ffx+QXBDsv3gubEgPtV6dTzJMSQUwk1H98/t/0wQ==",
      "license": "MIT",
      "dependencies": {
        "@ecies/ciphers": "^0.2.5",
        "@noble/ciphers": "^1.3.0",
        "@noble/curves": "^1.9.7",
        "@noble/hashes": "^1.8.0"
      },
      "engines": {
        "bun": ">=1",
        "deno": ">=2",
        "node": ">=16"
      }
    },
    "node_modules/eciesjs/node_modules/@ecies/ciphers": {
      "version": "0.2.5",
      "resolved": "https://registry.npmjs.org/@ecies/ciphers/-/ciphers-0.2.5.tgz",
      "integrity": "sha512-GalEZH4JgOMHYYcYmVqnFirFsjZHeoGMDt9IxEnM9F7GRUUyUksJ7Ou53L83WHJq3RWKD3AcBpo0iQh0oMpf8A==",
      "license": "MIT",
      "engines": {
        "bun": ">=1",
        "deno": ">=2",
        "node": ">=16"
      },
      "peerDependencies": {
        "@noble/ciphers": "^1.0.0"
      }
    },
    "node_modules/eciesjs/node_modules/@noble/ciphers": {
      "version": "1.3.0",
      "resolved": "https://registry.npmjs.org/@noble/ciphers/-/ciphers-1.3.0.tgz",
      "integrity": "sha512-2I0gnIVPtfnMw9ee9h1dJG7tp81+8Ob3OJb3Mv37rx5L40/b0i7djjCVvGOVqc9AEIQyvyu1i6ypKdFw8R8gQw==",
      "license": "MIT",
      "engines": {
        "node": "^14.21.3 || >=16"
      },
      "funding": {
        "url": "https://paulmillr.com/funding/"
      }
    },
    "node_modules/eciesjs/node_modules/@noble/hashes": {
      "version": "1.8.0",
      "resolved": "https://registry.npmjs.org/@noble/hashes/-/hashes-1.8.0.tgz",
      "integrity": "sha512-jCs9ldd7NwzpgXDIf6P3+NrHh9/sD6CQdxHyjQI+h/6rDNo88ypBxxz45UDuZHz9r3tNz7N/VInSVoVdtXEI4A==",
      "license": "MIT",
      "engines": {
        "node": "^14.21.3 || >=16"
      },
      "funding": {
        "url": "https://paulmillr.com/funding/"
      }
    },
    "node_modules/ee-first": {
      "version": "1.1.1",
      "resolved": "https://registry.npmjs.org/ee-first/-/ee-first-1.1.1.tgz",
      "integrity": "sha512-WMwm9LhRUo+WUaRN+vRuETqG89IgZphVSNkdFgeb6sS/E4OrDIN7t48CAewSHXc6C8lefD8KKfr5vY61brQlow==",
      "license": "MIT"
    },
    "node_modules/electron-to-chromium": {
      "version": "1.5.321",
      "resolved": "https://registry.npmjs.org/electron-to-chromium/-/electron-to-chromium-1.5.321.tgz",
      "integrity": "sha512-L2C7Q279W2D/J4PLZLk7sebOILDSWos7bMsMNN06rK482umHUrh/3lM8G7IlHFOYip2oAg5nha1rCMxr/rs6ZQ==",
      "license": "ISC"
    },
    "node_modules/emoji-regex": {
      "version": "9.2.2",
      "resolved": "https://registry.npmjs.org/emoji-regex/-/emoji-regex-9.2.2.tgz",
      "integrity": "sha512-L18DaJsXSUk2+42pv8mLs5jJT2hqFkFE4j21wOmgbUqsZ2hL72NsUU785g9RXgo3s0ZNgVl42TiHp3ZtOv/Vyg==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/encodeurl": {
      "version": "2.0.0",
      "resolved": "https://registry.npmjs.org/encodeurl/-/encodeurl-2.0.0.tgz",
      "integrity": "sha512-Q0n9HRi4m6JuGIV1eFlmvJB7ZEVxu93IrMyiMsGC0lrMJMWzRgx6WGquyfQgZVb31vhGgXnfmPNNXmxnOkRBrg==",
      "license": "MIT",
      "engines": {
        "node": ">= 0.8"
      }
    },
    "node_modules/enhanced-resolve": {
      "version": "5.20.1",
      "resolved": "https://registry.npmjs.org/enhanced-resolve/-/enhanced-resolve-5.20.1.tgz",
      "integrity": "sha512-Qohcme7V1inbAfvjItgw0EaxVX5q2rdVEZHRBrEQdRZTssLDGsL8Lwrznl8oQ/6kuTJONLaDcGjkNP247XEhcA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "graceful-fs": "^4.2.4",
        "tapable": "^2.3.0"
      },
      "engines": {
        "node": ">=10.13.0"
      }
    },
    "node_modules/env-paths": {
      "version": "2.2.1",
      "resolved": "https://registry.npmjs.org/env-paths/-/env-paths-2.2.1.tgz",
      "integrity": "sha512-+h1lkLKhZMTYjog1VEpJNG7NZJWcuc2DDk/qsqSTRRCOXiLjeQ1d1/udrUGhqMxUgAlwKNZ0cf2uqan5GLuS2A==",
      "license": "MIT",
      "engines": {
        "node": ">=6"
      }
    },
    "node_modules/error-ex": {
      "version": "1.3.4",
      "resolved": "https://registry.npmjs.org/error-ex/-/error-ex-1.3.4.tgz",
      "integrity": "sha512-sqQamAnR14VgCr1A618A3sGrygcpK+HEbenA/HiEAkkUwcZIIB/tgWqHFxWgOyDh4nB4JCRimh79dR5Ywc9MDQ==",
      "license": "MIT",
      "dependencies": {
        "is-arrayish": "^0.2.1"
      }
    },
    "node_modules/es-abstract": {
      "version": "1.24.1",
      "resolved": "https://registry.npmjs.org/es-abstract/-/es-abstract-1.24.1.tgz",
      "integrity": "sha512-zHXBLhP+QehSSbsS9Pt23Gg964240DPd6QCf8WpkqEXxQ7fhdZzYsocOr5u7apWonsS5EjZDmTF+/slGMyasvw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "array-buffer-byte-length": "^1.0.2",
        "arraybuffer.prototype.slice": "^1.0.4",
        "available-typed-arrays": "^1.0.7",
        "call-bind": "^1.0.8",
        "call-bound": "^1.0.4",
        "data-view-buffer": "^1.0.2",
        "data-view-byte-length": "^1.0.2",
        "data-view-byte-offset": "^1.0.1",
        "es-define-property": "^1.0.1",
        "es-errors": "^1.3.0",
        "es-object-atoms": "^1.1.1",
        "es-set-tostringtag": "^2.1.0",
        "es-to-primitive": "^1.3.0",
        "function.prototype.name": "^1.1.8",
        "get-intrinsic": "^1.3.0",
        "get-proto": "^1.0.1",
        "get-symbol-description": "^1.1.0",
        "globalthis": "^1.0.4",
        "gopd": "^1.2.0",
        "has-property-descriptors": "^1.0.2",
        "has-proto": "^1.2.0",
        "has-symbols": "^1.1.0",
        "hasown": "^2.0.2",
        "internal-slot": "^1.1.0",
        "is-array-buffer": "^3.0.5",
        "is-callable": "^1.2.7",
        "is-data-view": "^1.0.2",
        "is-negative-zero": "^2.0.3",
        "is-regex": "^1.2.1",
        "is-set": "^2.0.3",
        "is-shared-array-buffer": "^1.0.4",
        "is-string": "^1.1.1",
        "is-typed-array": "^1.1.15",
        "is-weakref": "^1.1.1",
        "math-intrinsics": "^1.1.0",
        "object-inspect": "^1.13.4",
        "object-keys": "^1.1.1",
        "object.assign": "^4.1.7",
        "own-keys": "^1.0.1",
        "regexp.prototype.flags": "^1.5.4",
        "safe-array-concat": "^1.1.3",
        "safe-push-apply": "^1.0.0",
        "safe-regex-test": "^1.1.0",
        "set-proto": "^1.0.0",
        "stop-iteration-iterator": "^1.1.0",
        "string.prototype.trim": "^1.2.10",
        "string.prototype.trimend": "^1.0.9",
        "string.prototype.trimstart": "^1.0.8",
        "typed-array-buffer": "^1.0.3",
        "typed-array-byte-length": "^1.0.3",
        "typed-array-byte-offset": "^1.0.4",
        "typed-array-length": "^1.0.7",
        "unbox-primitive": "^1.1.0",
        "which-typed-array": "^1.1.19"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/es-define-property": {
      "version": "1.0.1",
      "resolved": "https://registry.npmjs.org/es-define-property/-/es-define-property-1.0.1.tgz",
      "integrity": "sha512-e3nRfgfUZ4rNGL232gUgX06QNyyez04KdjFrF+LTRoOXmrOgFKDg4BCdsjW8EnT69eqdYGmRpJwiPVYNrCaW3g==",
      "license": "MIT",
      "engines": {
        "node": ">= 0.4"
      }
    },
    "node_modules/es-errors": {
      "version": "1.3.0",
      "resolved": "https://registry.npmjs.org/es-errors/-/es-errors-1.3.0.tgz",
      "integrity": "sha512-Zf5H2Kxt2xjTvbJvP2ZWLEICxA6j+hAmMzIlypy4xcBg1vKVnx89Wy0GbS+kf5cwCVFFzdCFh2XSCFNULS6csw==",
      "license": "MIT",
      "engines": {
        "node": ">= 0.4"
      }
    },
    "node_modules/es-iterator-helpers": {
      "version": "1.3.1",
      "resolved": "https://registry.npmjs.org/es-iterator-helpers/-/es-iterator-helpers-1.3.1.tgz",
      "integrity": "sha512-zWwRvqWiuBPr0muUG/78cW3aHROFCNIQ3zpmYDpwdbnt2m+xlNyRWpHBpa2lJjSBit7BQ+RXA1iwbSmu5yJ/EQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "call-bind": "^1.0.8",
        "call-bound": "^1.0.4",
        "define-properties": "^1.2.1",
        "es-abstract": "^1.24.1",
        "es-errors": "^1.3.0",
        "es-set-tostringtag": "^2.1.0",
        "function-bind": "^1.1.2",
        "get-intrinsic": "^1.3.0",
        "globalthis": "^1.0.4",
        "gopd": "^1.2.0",
        "has-property-descriptors": "^1.0.2",
        "has-proto": "^1.2.0",
        "has-symbols": "^1.1.0",
        "internal-slot": "^1.1.0",
        "iterator.prototype": "^1.1.5",
        "math-intrinsics": "^1.1.0",
        "safe-array-concat": "^1.1.3"
      },
      "engines": {
        "node": ">= 0.4"
      }
    },
    "node_modules/es-object-atoms": {
      "version": "1.1.1",
      "resolved": "https://registry.npmjs.org/es-object-atoms/-/es-object-atoms-1.1.1.tgz",
      "integrity": "sha512-FGgH2h8zKNim9ljj7dankFPcICIK9Cp5bm+c2gQSYePhpaG5+esrLODihIorn+Pe6FGJzWhXQotPv73jTaldXA==",
      "license": "MIT",
      "dependencies": {
        "es-errors": "^1.3.0"
      },
      "engines": {
        "node": ">= 0.4"
      }
    },
    "node_modules/es-set-tostringtag": {
      "version": "2.1.0",
      "resolved": "https://registry.npmjs.org/es-set-tostringtag/-/es-set-tostringtag-2.1.0.tgz",
      "integrity": "sha512-j6vWzfrGVfyXxge+O0x5sh6cvxAog0a/4Rdd2K36zCMV5eJ+/+tOAngRO8cODMNWbVRdVlmGZQL2YS3yR8bIUA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "es-errors": "^1.3.0",
        "get-intrinsic": "^1.2.6",
        "has-tostringtag": "^1.0.2",
        "hasown": "^2.0.2"
      },
      "engines": {
        "node": ">= 0.4"
      }
    },
    "node_modules/es-shim-unscopables": {
      "version": "1.1.0",
      "resolved": "https://registry.npmjs.org/es-shim-unscopables/-/es-shim-unscopables-1.1.0.tgz",
      "integrity": "sha512-d9T8ucsEhh8Bi1woXCf+TIKDIROLG5WCkxg8geBCbvk22kzwC5G2OnXVMO6FUsvQlgUUXQ2itephWDLqDzbeCw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "hasown": "^2.0.2"
      },
      "engines": {
        "node": ">= 0.4"
      }
    },
    "node_modules/es-to-primitive": {
      "version": "1.3.0",
      "resolved": "https://registry.npmjs.org/es-to-primitive/-/es-to-primitive-1.3.0.tgz",
      "integrity": "sha512-w+5mJ3GuFL+NjVtJlvydShqE1eN3h3PbI7/5LAsYJP/2qtuMXjfL2LpHSRqo4b4eSF5K/DH1JXKUAHSB2UW50g==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "is-callable": "^1.2.7",
        "is-date-object": "^1.0.5",
        "is-symbol": "^1.0.4"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/escalade": {
      "version": "3.2.0",
      "resolved": "https://registry.npmjs.org/escalade/-/escalade-3.2.0.tgz",
      "integrity": "sha512-WUj2qlxaQtO4g6Pq5c29GTcWGDyd8itL8zTlipgECz3JesAiiOKotd8JU6otB3PACgG6xkJUyVhboMS+bje/jA==",
      "license": "MIT",
      "engines": {
        "node": ">=6"
      }
    },
    "node_modules/escape-html": {
      "version": "1.0.3",
      "resolved": "https://registry.npmjs.org/escape-html/-/escape-html-1.0.3.tgz",
      "integrity": "sha512-NiSupZ4OeuGwr68lGIeym/ksIZMJodUGOSCZ/FSnTxcrekbvqrgdUxlJOMpijaKZVjAJrWrGs/6Jy8OMuyj9ow==",
      "license": "MIT"
    },
    "node_modules/escape-string-regexp": {
      "version": "4.0.0",
      "resolved": "https://registry.npmjs.org/escape-string-regexp/-/escape-string-regexp-4.0.0.tgz",
      "integrity": "sha512-TtpcNJ3XAzx3Gq8sWRzJaVajRs0uVxA2YAkdb1jm2YkPz4G6egUFAyA3n5vtEIZefPk5Wa4UXbKuS5fKkJWdgA==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=10"
      },
      "funding": {
        "url": "https://github.com/sponsors/sindresorhus"
      }
    },
    "node_modules/eslint": {
      "version": "9.39.4",
      "resolved": "https://registry.npmjs.org/eslint/-/eslint-9.39.4.tgz",
      "integrity": "sha512-XoMjdBOwe/esVgEvLmNsD3IRHkm7fbKIUGvrleloJXUZgDHig2IPWNniv+GwjyJXzuNqVjlr5+4yVUZjycJwfQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@eslint-community/eslint-utils": "^4.8.0",
        "@eslint-community/regexpp": "^4.12.1",
        "@eslint/config-array": "^0.21.2",
        "@eslint/config-helpers": "^0.4.2",
        "@eslint/core": "^0.17.0",
        "@eslint/eslintrc": "^3.3.5",
        "@eslint/js": "9.39.4",
        "@eslint/plugin-kit": "^0.4.1",
        "@humanfs/node": "^0.16.6",
        "@humanwhocodes/module-importer": "^1.0.1",
        "@humanwhocodes/retry": "^0.4.2",
        "@types/estree": "^1.0.6",
        "ajv": "^6.14.0",
        "chalk": "^4.0.0",
        "cross-spawn": "^7.0.6",
        "debug": "^4.3.2",
        "escape-string-regexp": "^4.0.0",
        "eslint-scope": "^8.4.0",
        "eslint-visitor-keys": "^4.2.1",
        "espree": "^10.4.0",
        "esquery": "^1.5.0",
        "esutils": "^2.0.2",
        "fast-deep-equal": "^3.1.3",
        "file-entry-cache": "^8.0.0",
        "find-up": "^5.0.0",
        "glob-parent": "^6.0.2",
        "ignore": "^5.2.0",
        "imurmurhash": "^0.1.4",
        "is-glob": "^4.0.0",
        "json-stable-stringify-without-jsonify": "^1.0.1",
        "lodash.merge": "^4.6.2",
        "minimatch": "^3.1.5",
        "natural-compare": "^1.4.0",
        "optionator": "^0.9.3"
      },
      "bin": {
        "eslint": "bin/eslint.js"
      },
      "engines": {
        "node": "^18.18.0 || ^20.9.0 || >=21.1.0"
      },
      "funding": {
        "url": "https://eslint.org/donate"
      },
      "peerDependencies": {
        "jiti": "*"
      },
      "peerDependenciesMeta": {
        "jiti": {
          "optional": true
        }
      }
    },
    "node_modules/eslint-config-next": {
      "version": "16.2.0",
      "resolved": "https://registry.npmjs.org/eslint-config-next/-/eslint-config-next-16.2.0.tgz",
      "integrity": "sha512-LlVJrWnjIkgQRECjIOELyAtrWFqzn326ARS5ap7swc1YKL4wkry6/gszn6wi5ZDWKxKe7fanxArvhqMoAzbL7w==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@next/eslint-plugin-next": "16.2.0",
        "eslint-import-resolver-node": "^0.3.6",
        "eslint-import-resolver-typescript": "^3.5.2",
        "eslint-plugin-import": "^2.32.0",
        "eslint-plugin-jsx-a11y": "^6.10.0",
        "eslint-plugin-react": "^7.37.0",
        "eslint-plugin-react-hooks": "^7.0.0",
        "globals": "16.4.0",
        "typescript-eslint": "^8.46.0"
      },
      "peerDependencies": {
        "eslint": ">=9.0.0",
        "typescript": ">=3.3.1"
      },
      "peerDependenciesMeta": {
        "typescript": {
          "optional": true
        }
      }
    },
    "node_modules/eslint-config-next/node_modules/globals": {
      "version": "16.4.0",
      "resolved": "https://registry.npmjs.org/globals/-/globals-16.4.0.tgz",
      "integrity": "sha512-ob/2LcVVaVGCYN+r14cnwnoDPUufjiYgSqRhiFD0Q1iI4Odora5RE8Iv1D24hAz5oMophRGkGz+yuvQmmUMnMw==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=18"
      },
      "funding": {
        "url": "https://github.com/sponsors/sindresorhus"
      }
    },
    "node_modules/eslint-import-resolver-node": {
      "version": "0.3.9",
      "resolved": "https://registry.npmjs.org/eslint-import-resolver-node/-/eslint-import-resolver-node-0.3.9.tgz",
      "integrity": "sha512-WFj2isz22JahUv+B788TlO3N6zL3nNJGU8CcZbPZvVEkBPaJdCV4vy5wyghty5ROFbCRnm132v8BScu5/1BQ8g==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "debug": "^3.2.7",
        "is-core-module": "^2.13.0",
        "resolve": "^1.22.4"
      }
    },
    "node_modules/eslint-import-resolver-node/node_modules/debug": {
      "version": "3.2.7",
      "resolved": "https://registry.npmjs.org/debug/-/debug-3.2.7.tgz",
      "integrity": "sha512-CFjzYYAi4ThfiQvizrFQevTTXHtnCqWfe7x1AhgEscTz6ZbLbfoLRLPugTQyBth6f8ZERVUSyWHFD/7Wu4t1XQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "ms": "^2.1.1"
      }
    },
    "node_modules/eslint-import-resolver-typescript": {
      "version": "3.10.1",
      "resolved": "https://registry.npmjs.org/eslint-import-resolver-typescript/-/eslint-import-resolver-typescript-3.10.1.tgz",
      "integrity": "sha512-A1rHYb06zjMGAxdLSkN2fXPBwuSaQ0iO5M/hdyS0Ajj1VBaRp0sPD3dn1FhME3c/JluGFbwSxyCfqdSbtQLAHQ==",
      "dev": true,
      "license": "ISC",
      "dependencies": {
        "@nolyfill/is-core-module": "1.0.39",
        "debug": "^4.4.0",
        "get-tsconfig": "^4.10.0",
        "is-bun-module": "^2.0.0",
        "stable-hash": "^0.0.5",
        "tinyglobby": "^0.2.13",
        "unrs-resolver": "^1.6.2"
      },
      "engines": {
        "node": "^14.18.0 || >=16.0.0"
      },
      "funding": {
        "url": "https://opencollective.com/eslint-import-resolver-typescript"
      },
      "peerDependencies": {
        "eslint": "*",
        "eslint-plugin-import": "*",
        "eslint-plugin-import-x": "*"
      },
      "peerDependenciesMeta": {
        "eslint-plugin-import": {
          "optional": true
        },
        "eslint-plugin-import-x": {
          "optional": true
        }
      }
    },
    "node_modules/eslint-module-utils": {
      "version": "2.12.1",
      "resolved": "https://registry.npmjs.org/eslint-module-utils/-/eslint-module-utils-2.12.1.tgz",
      "integrity": "sha512-L8jSWTze7K2mTg0vos/RuLRS5soomksDPoJLXIslC7c8Wmut3bx7CPpJijDcBZtxQ5lrbUdM+s0OlNbz0DCDNw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "debug": "^3.2.7"
      },
      "engines": {
        "node": ">=4"
      },
      "peerDependenciesMeta": {
        "eslint": {
          "optional": true
        }
      }
    },
    "node_modules/eslint-module-utils/node_modules/debug": {
      "version": "3.2.7",
      "resolved": "https://registry.npmjs.org/debug/-/debug-3.2.7.tgz",
      "integrity": "sha512-CFjzYYAi4ThfiQvizrFQevTTXHtnCqWfe7x1AhgEscTz6ZbLbfoLRLPugTQyBth6f8ZERVUSyWHFD/7Wu4t1XQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "ms": "^2.1.1"
      }
    },
    "node_modules/eslint-plugin-import": {
      "version": "2.32.0",
      "resolved": "https://registry.npmjs.org/eslint-plugin-import/-/eslint-plugin-import-2.32.0.tgz",
      "integrity": "sha512-whOE1HFo/qJDyX4SnXzP4N6zOWn79WhnCUY/iDR0mPfQZO8wcYE4JClzI2oZrhBnnMUCBCHZhO6VQyoBU95mZA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@rtsao/scc": "^1.1.0",
        "array-includes": "^3.1.9",
        "array.prototype.findlastindex": "^1.2.6",
        "array.prototype.flat": "^1.3.3",
        "array.prototype.flatmap": "^1.3.3",
        "debug": "^3.2.7",
        "doctrine": "^2.1.0",
        "eslint-import-resolver-node": "^0.3.9",
        "eslint-module-utils": "^2.12.1",
        "hasown": "^2.0.2",
        "is-core-module": "^2.16.1",
        "is-glob": "^4.0.3",
        "minimatch": "^3.1.2",
        "object.fromentries": "^2.0.8",
        "object.groupby": "^1.0.3",
        "object.values": "^1.2.1",
        "semver": "^6.3.1",
        "string.prototype.trimend": "^1.0.9",
        "tsconfig-paths": "^3.15.0"
      },
      "engines": {
        "node": ">=4"
      },
      "peerDependencies": {
        "eslint": "^2 || ^3 || ^4 || ^5 || ^6 || ^7.2.0 || ^8 || ^9"
      }
    },
    "node_modules/eslint-plugin-import/node_modules/debug": {
      "version": "3.2.7",
      "resolved": "https://registry.npmjs.org/debug/-/debug-3.2.7.tgz",
      "integrity": "sha512-CFjzYYAi4ThfiQvizrFQevTTXHtnCqWfe7x1AhgEscTz6ZbLbfoLRLPugTQyBth6f8ZERVUSyWHFD/7Wu4t1XQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "ms": "^2.1.1"
      }
    },
    "node_modules/eslint-plugin-jsx-a11y": {
      "version": "6.10.2",
      "resolved": "https://registry.npmjs.org/eslint-plugin-jsx-a11y/-/eslint-plugin-jsx-a11y-6.10.2.tgz",
      "integrity": "sha512-scB3nz4WmG75pV8+3eRUQOHZlNSUhFNq37xnpgRkCCELU3XMvXAxLk1eqWWyE22Ki4Q01Fnsw9BA3cJHDPgn2Q==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "aria-query": "^5.3.2",
        "array-includes": "^3.1.8",
        "array.prototype.flatmap": "^1.3.2",
        "ast-types-flow": "^0.0.8",
        "axe-core": "^4.10.0",
        "axobject-query": "^4.1.0",
        "damerau-levenshtein": "^1.0.8",
        "emoji-regex": "^9.2.2",
        "hasown": "^2.0.2",
        "jsx-ast-utils": "^3.3.5",
        "language-tags": "^1.0.9",
        "minimatch": "^3.1.2",
        "object.fromentries": "^2.0.8",
        "safe-regex-test": "^1.0.3",
        "string.prototype.includes": "^2.0.1"
      },
      "engines": {
        "node": ">=4.0"
      },
      "peerDependencies": {
        "eslint": "^3 || ^4 || ^5 || ^6 || ^7 || ^8 || ^9"
      }
    },
    "node_modules/eslint-plugin-react": {
      "version": "7.37.5",
      "resolved": "https://registry.npmjs.org/eslint-plugin-react/-/eslint-plugin-react-7.37.5.tgz",
      "integrity": "sha512-Qteup0SqU15kdocexFNAJMvCJEfa2xUKNV4CC1xsVMrIIqEy3SQ/rqyxCWNzfrd3/ldy6HMlD2e0JDVpDg2qIA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "array-includes": "^3.1.8",
        "array.prototype.findlast": "^1.2.5",
        "array.prototype.flatmap": "^1.3.3",
        "array.prototype.tosorted": "^1.1.4",
        "doctrine": "^2.1.0",
        "es-iterator-helpers": "^1.2.1",
        "estraverse": "^5.3.0",
        "hasown": "^2.0.2",
        "jsx-ast-utils": "^2.4.1 || ^3.0.0",
        "minimatch": "^3.1.2",
        "object.entries": "^1.1.9",
        "object.fromentries": "^2.0.8",
        "object.values": "^1.2.1",
        "prop-types": "^15.8.1",
        "resolve": "^2.0.0-next.5",
        "semver": "^6.3.1",
        "string.prototype.matchall": "^4.0.12",
        "string.prototype.repeat": "^1.0.0"
      },
      "engines": {
        "node": ">=4"
      },
      "peerDependencies": {
        "eslint": "^3 || ^4 || ^5 || ^6 || ^7 || ^8 || ^9.7"
      }
    },
    "node_modules/eslint-plugin-react-hooks": {
      "version": "7.0.1",
      "resolved": "https://registry.npmjs.org/eslint-plugin-react-hooks/-/eslint-plugin-react-hooks-7.0.1.tgz",
      "integrity": "sha512-O0d0m04evaNzEPoSW+59Mezf8Qt0InfgGIBJnpC0h3NH/WjUAR7BIKUfysC6todmtiZ/A0oUVS8Gce0WhBrHsA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@babel/core": "^7.24.4",
        "@babel/parser": "^7.24.4",
        "hermes-parser": "^0.25.1",
        "zod": "^3.25.0 || ^4.0.0",
        "zod-validation-error": "^3.5.0 || ^4.0.0"
      },
      "engines": {
        "node": ">=18"
      },
      "peerDependencies": {
        "eslint": "^3.0.0 || ^4.0.0 || ^5.0.0 || ^6.0.0 || ^7.0.0 || ^8.0.0-0 || ^9.0.0"
      }
    },
    "node_modules/eslint-plugin-react/node_modules/resolve": {
      "version": "2.0.0-next.6",
      "resolved": "https://registry.npmjs.org/resolve/-/resolve-2.0.0-next.6.tgz",
      "integrity": "sha512-3JmVl5hMGtJ3kMmB3zi3DL25KfkCEyy3Tw7Gmw7z5w8M9WlwoPFnIvwChzu1+cF3iaK3sp18hhPz8ANeimdJfA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "es-errors": "^1.3.0",
        "is-core-module": "^2.16.1",
        "node-exports-info": "^1.6.0",
        "object-keys": "^1.1.1",
        "path-parse": "^1.0.7",
        "supports-preserve-symlinks-flag": "^1.0.0"
      },
      "bin": {
        "resolve": "bin/resolve"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/eslint-scope": {
      "version": "8.4.0",
      "resolved": "https://registry.npmjs.org/eslint-scope/-/eslint-scope-8.4.0.tgz",
      "integrity": "sha512-sNXOfKCn74rt8RICKMvJS7XKV/Xk9kA7DyJr8mJik3S7Cwgy3qlkkmyS2uQB3jiJg6VNdZd/pDBJu0nvG2NlTg==",
      "dev": true,
      "license": "BSD-2-Clause",
      "dependencies": {
        "esrecurse": "^4.3.0",
        "estraverse": "^5.2.0"
      },
      "engines": {
        "node": "^18.18.0 || ^20.9.0 || >=21.1.0"
      },
      "funding": {
        "url": "https://opencollective.com/eslint"
      }
    },
    "node_modules/eslint-visitor-keys": {
      "version": "4.2.1",
      "resolved": "https://registry.npmjs.org/eslint-visitor-keys/-/eslint-visitor-keys-4.2.1.tgz",
      "integrity": "sha512-Uhdk5sfqcee/9H/rCOJikYz67o0a2Tw2hGRPOG2Y1R2dg7brRe1uG0yaNQDHu+TO/uQPF/5eCapvYSmHUjt7JQ==",
      "dev": true,
      "license": "Apache-2.0",
      "engines": {
        "node": "^18.18.0 || ^20.9.0 || >=21.1.0"
      },
      "funding": {
        "url": "https://opencollective.com/eslint"
      }
    },
    "node_modules/espree": {
      "version": "10.4.0",
      "resolved": "https://registry.npmjs.org/espree/-/espree-10.4.0.tgz",
      "integrity": "sha512-j6PAQ2uUr79PZhBjP5C5fhl8e39FmRnOjsD5lGnWrFU8i2G776tBK7+nP8KuQUTTyAZUwfQqXAgrVH5MbH9CYQ==",
      "dev": true,
      "license": "BSD-2-Clause",
      "dependencies": {
        "acorn": "^8.15.0",
        "acorn-jsx": "^5.3.2",
        "eslint-visitor-keys": "^4.2.1"
      },
      "engines": {
        "node": "^18.18.0 || ^20.9.0 || >=21.1.0"
      },
      "funding": {
        "url": "https://opencollective.com/eslint"
      }
    },
    "node_modules/esprima": {
      "version": "4.0.1",
      "resolved": "https://registry.npmjs.org/esprima/-/esprima-4.0.1.tgz",
      "integrity": "sha512-eGuFFw7Upda+g4p+QHvnW0RyTX/SVeJBDM/gCtMARO0cLuT2HcEKnTPvhjV6aGeqrCB/sbNop0Kszm0jsaWU4A==",
      "license": "BSD-2-Clause",
      "bin": {
        "esparse": "bin/esparse.js",
        "esvalidate": "bin/esvalidate.js"
      },
      "engines": {
        "node": ">=4"
      }
    },
    "node_modules/esquery": {
      "version": "1.7.0",
      "resolved": "https://registry.npmjs.org/esquery/-/esquery-1.7.0.tgz",
      "integrity": "sha512-Ap6G0WQwcU/LHsvLwON1fAQX9Zp0A2Y6Y/cJBl9r/JbW90Zyg4/zbG6zzKa2OTALELarYHmKu0GhpM5EO+7T0g==",
      "dev": true,
      "license": "BSD-3-Clause",
      "dependencies": {
        "estraverse": "^5.1.0"
      },
      "engines": {
        "node": ">=0.10"
      }
    },
    "node_modules/esrecurse": {
      "version": "4.3.0",
      "resolved": "https://registry.npmjs.org/esrecurse/-/esrecurse-4.3.0.tgz",
      "integrity": "sha512-KmfKL3b6G+RXvP8N1vr3Tq1kL/oCFgn2NYXEtqP8/L3pKapUA4G8cFVaoF3SU323CD4XypR/ffioHmkti6/Tag==",
      "dev": true,
      "license": "BSD-2-Clause",
      "dependencies": {
        "estraverse": "^5.2.0"
      },
      "engines": {
        "node": ">=4.0"
      }
    },
    "node_modules/estraverse": {
      "version": "5.3.0",
      "resolved": "https://registry.npmjs.org/estraverse/-/estraverse-5.3.0.tgz",
      "integrity": "sha512-MMdARuVEQziNTeJD8DgMqmhwR11BRQ/cBP+pLtYdSTnf3MIO8fFeiINEbX36ZdNlfU/7A9f3gUw49B3oQsvwBA==",
      "dev": true,
      "license": "BSD-2-Clause",
      "engines": {
        "node": ">=4.0"
      }
    },
    "node_modules/esutils": {
      "version": "2.0.3",
      "resolved": "https://registry.npmjs.org/esutils/-/esutils-2.0.3.tgz",
      "integrity": "sha512-kVscqXk4OCp68SZ0dkgEKVi6/8ij300KBWTJq32P/dYeWTSwK41WyTxalN1eRmA5Z9UU/LX9D7FWSmV9SAYx6g==",
      "dev": true,
      "license": "BSD-2-Clause",
      "engines": {
        "node": ">=0.10.0"
      }
    },
    "node_modules/etag": {
      "version": "1.8.1",
      "resolved": "https://registry.npmjs.org/etag/-/etag-1.8.1.tgz",
      "integrity": "sha512-aIL5Fx7mawVa300al2BnEE4iNvo1qETxLrPI/o05L7z6go7fCw1J6EQmbK4FmJ2AS7kgVF/KEZWufBfdClMcPg==",
      "license": "MIT",
      "engines": {
        "node": ">= 0.6"
      }
    },
    "node_modules/events": {
      "version": "3.3.0",
      "resolved": "https://registry.npmjs.org/events/-/events-3.3.0.tgz",
      "integrity": "sha512-mQw+2fkQbALzQ7V0MY0IqdnXNOeTtP4r0lN9z7AAawCXgqea7bDii20AYrIBrFd/Hx0M2Ocz6S111CaFkUcb0Q==",
      "license": "MIT",
      "engines": {
        "node": ">=0.8.x"
      }
    },
    "node_modules/eventsource": {
      "version": "3.0.7",
      "resolved": "https://registry.npmjs.org/eventsource/-/eventsource-3.0.7.tgz",
      "integrity": "sha512-CRT1WTyuQoD771GW56XEZFQ/ZoSfWid1alKGDYMmkt2yl8UXrVR4pspqWNEcqKvVIzg6PAltWjxcSSPrboA4iA==",
      "license": "MIT",
      "dependencies": {
        "eventsource-parser": "^3.0.1"
      },
      "engines": {
        "node": ">=18.0.0"
      }
    },
    "node_modules/eventsource-parser": {
      "version": "3.0.6",
      "resolved": "https://registry.npmjs.org/eventsource-parser/-/eventsource-parser-3.0.6.tgz",
      "integrity": "sha512-Vo1ab+QXPzZ4tCa8SwIHJFaSzy4R6SHf7BY79rFBDf0idraZWAkYrDjDj8uWaSm3S2TK+hJ7/t1CEmZ7jXw+pg==",
      "license": "MIT",
      "engines": {
        "node": ">=18.0.0"
      }
    },
    "node_modules/execa": {
      "version": "9.6.1",
      "resolved": "https://registry.npmjs.org/execa/-/execa-9.6.1.tgz",
      "integrity": "sha512-9Be3ZoN4LmYR90tUoVu2te2BsbzHfhJyfEiAVfz7N5/zv+jduIfLrV2xdQXOHbaD6KgpGdO9PRPM1Y4Q9QkPkA==",
      "license": "MIT",
      "dependencies": {
        "@sindresorhus/merge-streams": "^4.0.0",
        "cross-spawn": "^7.0.6",
        "figures": "^6.1.0",
        "get-stream": "^9.0.0",
        "human-signals": "^8.0.1",
        "is-plain-obj": "^4.1.0",
        "is-stream": "^4.0.1",
        "npm-run-path": "^6.0.0",
        "pretty-ms": "^9.2.0",
        "signal-exit": "^4.1.0",
        "strip-final-newline": "^4.0.0",
        "yoctocolors": "^2.1.1"
      },
      "engines": {
        "node": "^18.19.0 || >=20.5.0"
      },
      "funding": {
        "url": "https://github.com/sindresorhus/execa?sponsor=1"
      }
    },
    "node_modules/express": {
      "version": "5.2.1",
      "resolved": "https://registry.npmjs.org/express/-/express-5.2.1.tgz",
      "integrity": "sha512-hIS4idWWai69NezIdRt2xFVofaF4j+6INOpJlVOLDO8zXGpUVEVzIYk12UUi2JzjEzWL3IOAxcTubgz9Po0yXw==",
      "license": "MIT",
      "dependencies": {
        "accepts": "^2.0.0",
        "body-parser": "^2.2.1",
        "content-disposition": "^1.0.0",
        "content-type": "^1.0.5",
        "cookie": "^0.7.1",
        "cookie-signature": "^1.2.1",
        "debug": "^4.4.0",
        "depd": "^2.0.0",
        "encodeurl": "^2.0.0",
        "escape-html": "^1.0.3",
        "etag": "^1.8.1",
        "finalhandler": "^2.1.0",
        "fresh": "^2.0.0",
        "http-errors": "^2.0.0",
        "merge-descriptors": "^2.0.0",
        "mime-types": "^3.0.0",
        "on-finished": "^2.4.1",
        "once": "^1.4.0",
        "parseurl": "^1.3.3",
        "proxy-addr": "^2.0.7",
        "qs": "^6.14.0",
        "range-parser": "^1.2.1",
        "router": "^2.2.0",
        "send": "^1.1.0",
        "serve-static": "^2.2.0",
        "statuses": "^2.0.1",
        "type-is": "^2.0.1",
        "vary": "^1.1.2"
      },
      "engines": {
        "node": ">= 18"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/express"
      }
    },
    "node_modules/express-rate-limit": {
      "version": "8.3.1",
      "resolved": "https://registry.npmjs.org/express-rate-limit/-/express-rate-limit-8.3.1.tgz",
      "integrity": "sha512-D1dKN+cmyPWuvB+G2SREQDzPY1agpBIcTa9sJxOPMCNeH3gwzhqJRDWCXW3gg0y//+LQ/8j52JbMROWyrKdMdw==",
      "license": "MIT",
      "dependencies": {
        "ip-address": "10.1.0"
      },
      "engines": {
        "node": ">= 16"
      },
      "funding": {
        "url": "https://github.com/sponsors/express-rate-limit"
      },
      "peerDependencies": {
        "express": ">= 4.11"
      }
    },
    "node_modules/fast-deep-equal": {
      "version": "3.1.3",
      "resolved": "https://registry.npmjs.org/fast-deep-equal/-/fast-deep-equal-3.1.3.tgz",
      "integrity": "sha512-f3qQ9oQy9j2AhBe/H9VC91wLmKBCCU/gDOnKNAYG5hswO7BLKj09Hc5HYNz9cGI++xlpDCIgDaitVs03ATR84Q==",
      "license": "MIT"
    },
    "node_modules/fast-glob": {
      "version": "3.3.1",
      "resolved": "https://registry.npmjs.org/fast-glob/-/fast-glob-3.3.1.tgz",
      "integrity": "sha512-kNFPyjhh5cKjrUltxs+wFx+ZkbRaxxmZ+X0ZU31SOsxCEtP9VPgtq2teZw1DebupL5GmDaNQ6yKMMVcM41iqDg==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@nodelib/fs.stat": "^2.0.2",
        "@nodelib/fs.walk": "^1.2.3",
        "glob-parent": "^5.1.2",
        "merge2": "^1.3.0",
        "micromatch": "^4.0.4"
      },
      "engines": {
        "node": ">=8.6.0"
      }
    },
    "node_modules/fast-glob/node_modules/glob-parent": {
      "version": "5.1.2",
      "resolved": "https://registry.npmjs.org/glob-parent/-/glob-parent-5.1.2.tgz",
      "integrity": "sha512-AOIgSQCepiJYwP3ARnGx+5VnTu2HBYdzbGP45eLw1vr3zB3vZLeyed1sC9hnbcOc9/SrMyM5RPQrkGz4aS9Zow==",
      "dev": true,
      "license": "ISC",
      "dependencies": {
        "is-glob": "^4.0.1"
      },
      "engines": {
        "node": ">= 6"
      }
    },
    "node_modules/fast-json-stable-stringify": {
      "version": "2.1.0",
      "resolved": "https://registry.npmjs.org/fast-json-stable-stringify/-/fast-json-stable-stringify-2.1.0.tgz",
      "integrity": "sha512-lhd/wF+Lk98HZoTCtlVraHtfh5XYijIjalXck7saUtuanSDyLMxnHhSXEDJqHxD7msR8D0uCmqlkwjCV8xvwHw==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/fast-levenshtein": {
      "version": "2.0.6",
      "resolved": "https://registry.npmjs.org/fast-levenshtein/-/fast-levenshtein-2.0.6.tgz",
      "integrity": "sha512-DCXu6Ifhqcks7TZKY3Hxp3y6qphY5SJZmrWMDrKcERSOXWQdMhU9Ig/PYrzyw/ul9jOIyh0N4M0tbC5hodg8dw==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/fast-uri": {
      "version": "3.1.0",
      "resolved": "https://registry.npmjs.org/fast-uri/-/fast-uri-3.1.0.tgz",
      "integrity": "sha512-iPeeDKJSWf4IEOasVVrknXpaBV0IApz/gp7S2bb7Z4Lljbl2MGJRqInZiUrQwV16cpzw/D3S5j5Julj/gT52AA==",
      "funding": [
        {
          "type": "github",
          "url": "https://github.com/sponsors/fastify"
        },
        {
          "type": "opencollective",
          "url": "https://opencollective.com/fastify"
        }
      ],
      "license": "BSD-3-Clause"
    },
    "node_modules/fastq": {
      "version": "1.20.1",
      "resolved": "https://registry.npmjs.org/fastq/-/fastq-1.20.1.tgz",
      "integrity": "sha512-GGToxJ/w1x32s/D2EKND7kTil4n8OVk/9mycTc4VDza13lOvpUZTGX3mFSCtV9ksdGBVzvsyAVLM6mHFThxXxw==",
      "license": "ISC",
      "dependencies": {
        "reusify": "^1.0.4"
      }
    },
    "node_modules/fetch-blob": {
      "version": "3.2.0",
      "resolved": "https://registry.npmjs.org/fetch-blob/-/fetch-blob-3.2.0.tgz",
      "integrity": "sha512-7yAQpD2UMJzLi1Dqv7qFYnPbaPx7ZfFK6PiIxQ4PfkGPyNyl2Ugx+a/umUonmKqjhM4DnfbMvdX6otXq83soQQ==",
      "funding": [
        {
          "type": "github",
          "url": "https://github.com/sponsors/jimmywarting"
        },
        {
          "type": "paypal",
          "url": "https://paypal.me/jimmywarting"
        }
      ],
      "license": "MIT",
      "dependencies": {
        "node-domexception": "^1.0.0",
        "web-streams-polyfill": "^3.0.3"
      },
      "engines": {
        "node": "^12.20 || >= 14.13"
      }
    },
    "node_modules/figures": {
      "version": "6.1.0",
      "resolved": "https://registry.npmjs.org/figures/-/figures-6.1.0.tgz",
      "integrity": "sha512-d+l3qxjSesT4V7v2fh+QnmFnUWv9lSpjarhShNTgBOfA0ttejbQUAlHLitbjkoRiDulW0OPoQPYIGhIC8ohejg==",
      "license": "MIT",
      "dependencies": {
        "is-unicode-supported": "^2.0.0"
      },
      "engines": {
        "node": ">=18"
      },
      "funding": {
        "url": "https://github.com/sponsors/sindresorhus"
      }
    },
    "node_modules/file-entry-cache": {
      "version": "8.0.0",
      "resolved": "https://registry.npmjs.org/file-entry-cache/-/file-entry-cache-8.0.0.tgz",
      "integrity": "sha512-XXTUwCvisa5oacNGRP9SfNtYBNAMi+RPwBFmblZEF7N7swHYQS6/Zfk7SRwx4D5j3CH211YNRco1DEMNVfZCnQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "flat-cache": "^4.0.0"
      },
      "engines": {
        "node": ">=16.0.0"
      }
    },
    "node_modules/fill-range": {
      "version": "7.1.1",
      "resolved": "https://registry.npmjs.org/fill-range/-/fill-range-7.1.1.tgz",
      "integrity": "sha512-YsGpe3WHLK8ZYi4tWDg2Jy3ebRz2rXowDxnld4bkQB00cc/1Zw9AWnC0i9ztDJitivtQvaI9KaLyKrc+hBW0yg==",
      "license": "MIT",
      "dependencies": {
        "to-regex-range": "^5.0.1"
      },
      "engines": {
        "node": ">=8"
      }
    },
    "node_modules/finalhandler": {
      "version": "2.1.1",
      "resolved": "https://registry.npmjs.org/finalhandler/-/finalhandler-2.1.1.tgz",
      "integrity": "sha512-S8KoZgRZN+a5rNwqTxlZZePjT/4cnm0ROV70LedRHZ0p8u9fRID0hJUZQpkKLzro8LfmC8sx23bY6tVNxv8pQA==",
      "license": "MIT",
      "dependencies": {
        "debug": "^4.4.0",
        "encodeurl": "^2.0.0",
        "escape-html": "^1.0.3",
        "on-finished": "^2.4.1",
        "parseurl": "^1.3.3",
        "statuses": "^2.0.1"
      },
      "engines": {
        "node": ">= 18.0.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/express"
      }
    },
    "node_modules/find-up": {
      "version": "5.0.0",
      "resolved": "https://registry.npmjs.org/find-up/-/find-up-5.0.0.tgz",
      "integrity": "sha512-78/PXT1wlLLDgTzDs7sjq9hzz0vXD+zn+7wypEe4fXQxCmdmqfGsEPQxmiCSQI3ajFV91bVSsvNtrJRiW6nGng==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "locate-path": "^6.0.0",
        "path-exists": "^4.0.0"
      },
      "engines": {
        "node": ">=10"
      },
      "funding": {
        "url": "https://github.com/sponsors/sindresorhus"
      }
    },
    "node_modules/flat-cache": {
      "version": "4.0.1",
      "resolved": "https://registry.npmjs.org/flat-cache/-/flat-cache-4.0.1.tgz",
      "integrity": "sha512-f7ccFPK3SXFHpx15UIGyRJ/FJQctuKZ0zVuN3frBo4HnK3cay9VEW0R6yPYFHC0AgqhukPzKjq22t5DmAyqGyw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "flatted": "^3.2.9",
        "keyv": "^4.5.4"
      },
      "engines": {
        "node": ">=16"
      }
    },
    "node_modules/flatted": {
      "version": "3.4.2",
      "resolved": "https://registry.npmjs.org/flatted/-/flatted-3.4.2.tgz",
      "integrity": "sha512-PjDse7RzhcPkIJwy5t7KPWQSZ9cAbzQXcafsetQoD7sOJRQlGikNbx7yZp2OotDnJyrDcbyRq3Ttb18iYOqkxA==",
      "dev": true,
      "license": "ISC"
    },
    "node_modules/for-each": {
      "version": "0.3.5",
      "resolved": "https://registry.npmjs.org/for-each/-/for-each-0.3.5.tgz",
      "integrity": "sha512-dKx12eRCVIzqCxFGplyFKJMPvLEWgmNtUrpTiJIR5u97zEhRG8ySrtboPHZXx7daLxQVrl643cTzbab2tkQjxg==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "is-callable": "^1.2.7"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/formdata-polyfill": {
      "version": "4.0.10",
      "resolved": "https://registry.npmjs.org/formdata-polyfill/-/formdata-polyfill-4.0.10.tgz",
      "integrity": "sha512-buewHzMvYL29jdeQTVILecSaZKnt/RJWjoZCF5OW60Z67/GmSLBkOFM7qh1PI3zFNtJbaZL5eQu1vLfazOwj4g==",
      "license": "MIT",
      "dependencies": {
        "fetch-blob": "^3.1.2"
      },
      "engines": {
        "node": ">=12.20.0"
      }
    },
    "node_modules/forwarded": {
      "version": "0.2.0",
      "resolved": "https://registry.npmjs.org/forwarded/-/forwarded-0.2.0.tgz",
      "integrity": "sha512-buRG0fpBtRHSTCOASe6hD258tEubFoRLb4ZNA6NxMVHNw2gOcwHo9wyablzMzOA5z9xA9L1KNjk/Nt6MT9aYow==",
      "license": "MIT",
      "engines": {
        "node": ">= 0.6"
      }
    },
    "node_modules/fresh": {
      "version": "2.0.0",
      "resolved": "https://registry.npmjs.org/fresh/-/fresh-2.0.0.tgz",
      "integrity": "sha512-Rx/WycZ60HOaqLKAi6cHRKKI7zxWbJ31MhntmtwMoaTeF7XFH9hhBp8vITaMidfljRQ6eYWCKkaTK+ykVJHP2A==",
      "license": "MIT",
      "engines": {
        "node": ">= 0.8"
      }
    },
    "node_modules/fs-extra": {
      "version": "11.3.4",
      "resolved": "https://registry.npmjs.org/fs-extra/-/fs-extra-11.3.4.tgz",
      "integrity": "sha512-CTXd6rk/M3/ULNQj8FBqBWHYBVYybQ3VPBw0xGKFe3tuH7ytT6ACnvzpIQ3UZtB8yvUKC2cXn1a+x+5EVQLovA==",
      "license": "MIT",
      "dependencies": {
        "graceful-fs": "^4.2.0",
        "jsonfile": "^6.0.1",
        "universalify": "^2.0.0"
      },
      "engines": {
        "node": ">=14.14"
      }
    },
    "node_modules/function-bind": {
      "version": "1.1.2",
      "resolved": "https://registry.npmjs.org/function-bind/-/function-bind-1.1.2.tgz",
      "integrity": "sha512-7XHNxH7qX9xG5mIwxkhumTox/MIRNcOgDrxWsMt2pAr23WHp6MrRlN7FBSFpCpr+oVO0F744iUgR82nJMfG2SA==",
      "license": "MIT",
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/function.prototype.name": {
      "version": "1.1.8",
      "resolved": "https://registry.npmjs.org/function.prototype.name/-/function.prototype.name-1.1.8.tgz",
      "integrity": "sha512-e5iwyodOHhbMr/yNrc7fDYG4qlbIvI5gajyzPnb5TCwyhjApznQh1BMFou9b30SevY43gCJKXycoCBjMbsuW0Q==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "call-bind": "^1.0.8",
        "call-bound": "^1.0.3",
        "define-properties": "^1.2.1",
        "functions-have-names": "^1.2.3",
        "hasown": "^2.0.2",
        "is-callable": "^1.2.7"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/functions-have-names": {
      "version": "1.2.3",
      "resolved": "https://registry.npmjs.org/functions-have-names/-/functions-have-names-1.2.3.tgz",
      "integrity": "sha512-xckBUXyTIqT97tq2x2AMb+g163b5JFysYk0x4qxNFwbfQkmNZoiRHb6sPzI9/QV33WeuvVYBUIiD4NzNIyqaRQ==",
      "dev": true,
      "license": "MIT",
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/fuzzysort": {
      "version": "3.1.0",
      "resolved": "https://registry.npmjs.org/fuzzysort/-/fuzzysort-3.1.0.tgz",
      "integrity": "sha512-sR9BNCjBg6LNgwvxlBd0sBABvQitkLzoVY9MYYROQVX/FvfJ4Mai9LsGhDgd8qYdds0bY77VzYd5iuB+v5rwQQ==",
      "license": "MIT"
    },
    "node_modules/generator-function": {
      "version": "2.0.1",
      "resolved": "https://registry.npmjs.org/generator-function/-/generator-function-2.0.1.tgz",
      "integrity": "sha512-SFdFmIJi+ybC0vjlHN0ZGVGHc3lgE0DxPAT0djjVg+kjOnSqclqmj0KQ7ykTOLP6YxoqOvuAODGdcHJn+43q3g==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">= 0.4"
      }
    },
    "node_modules/gensync": {
      "version": "1.0.0-beta.2",
      "resolved": "https://registry.npmjs.org/gensync/-/gensync-1.0.0-beta.2.tgz",
      "integrity": "sha512-3hN7NaskYvMDLQY55gnW3NQ+mesEAepTqlg+VEbj7zzqEMBVNhzcGYYeqFo/TlYz6eQiFcp1HcsCZO+nGgS8zg==",
      "license": "MIT",
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/get-caller-file": {
      "version": "2.0.5",
      "resolved": "https://registry.npmjs.org/get-caller-file/-/get-caller-file-2.0.5.tgz",
      "integrity": "sha512-DyFP3BM/3YHTQOCUL/w0OZHR0lpKeGrxotcHWcqNEdnltqFwXVfhEBQ94eIo34AfQpo0rGki4cyIiftY06h2Fg==",
      "license": "ISC",
      "engines": {
        "node": "6.* || 8.* || >= 10.*"
      }
    },
    "node_modules/get-east-asian-width": {
      "version": "1.5.0",
      "resolved": "https://registry.npmjs.org/get-east-asian-width/-/get-east-asian-width-1.5.0.tgz",
      "integrity": "sha512-CQ+bEO+Tva/qlmw24dCejulK5pMzVnUOFOijVogd3KQs07HnRIgp8TGipvCCRT06xeYEbpbgwaCxglFyiuIcmA==",
      "license": "MIT",
      "engines": {
        "node": ">=18"
      },
      "funding": {
        "url": "https://github.com/sponsors/sindresorhus"
      }
    },
    "node_modules/get-intrinsic": {
      "version": "1.3.0",
      "resolved": "https://registry.npmjs.org/get-intrinsic/-/get-intrinsic-1.3.0.tgz",
      "integrity": "sha512-9fSjSaos/fRIVIp+xSJlE6lfwhES7LNtKaCBIamHsjr2na1BiABJPo0mOjjz8GJDURarmCPGqaiVg5mfjb98CQ==",
      "license": "MIT",
      "dependencies": {
        "call-bind-apply-helpers": "^1.0.2",
        "es-define-property": "^1.0.1",
        "es-errors": "^1.3.0",
        "es-object-atoms": "^1.1.1",
        "function-bind": "^1.1.2",
        "get-proto": "^1.0.1",
        "gopd": "^1.2.0",
        "has-symbols": "^1.1.0",
        "hasown": "^2.0.2",
        "math-intrinsics": "^1.1.0"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/get-nonce": {
      "version": "1.0.1",
      "resolved": "https://registry.npmjs.org/get-nonce/-/get-nonce-1.0.1.tgz",
      "integrity": "sha512-FJhYRoDaiatfEkUK8HKlicmu/3SGFD51q3itKDGoSTysQJBnfOcxU5GxnhE1E6soB76MbT0MBtnKJuXyAx+96Q==",
      "license": "MIT",
      "engines": {
        "node": ">=6"
      }
    },
    "node_modules/get-own-enumerable-keys": {
      "version": "1.0.0",
      "resolved": "https://registry.npmjs.org/get-own-enumerable-keys/-/get-own-enumerable-keys-1.0.0.tgz",
      "integrity": "sha512-PKsK2FSrQCyxcGHsGrLDcK0lx+0Ke+6e8KFFozA9/fIQLhQzPaRvJFdcz7+Axg3jUH/Mq+NI4xa5u/UT2tQskA==",
      "license": "MIT",
      "engines": {
        "node": ">=14.16"
      },
      "funding": {
        "url": "https://github.com/sponsors/sindresorhus"
      }
    },
    "node_modules/get-proto": {
      "version": "1.0.1",
      "resolved": "https://registry.npmjs.org/get-proto/-/get-proto-1.0.1.tgz",
      "integrity": "sha512-sTSfBjoXBp89JvIKIefqw7U2CCebsc74kiY6awiGogKtoSGbgjYE/G/+l9sF3MWFPNc9IcoOC4ODfKHfxFmp0g==",
      "license": "MIT",
      "dependencies": {
        "dunder-proto": "^1.0.1",
        "es-object-atoms": "^1.0.0"
      },
      "engines": {
        "node": ">= 0.4"
      }
    },
    "node_modules/get-stream": {
      "version": "9.0.1",
      "resolved": "https://registry.npmjs.org/get-stream/-/get-stream-9.0.1.tgz",
      "integrity": "sha512-kVCxPF3vQM/N0B1PmoqVUqgHP+EeVjmZSQn+1oCRPxd2P21P2F19lIgbR3HBosbB1PUhOAoctJnfEn2GbN2eZA==",
      "license": "MIT",
      "dependencies": {
        "@sec-ant/readable-stream": "^0.4.1",
        "is-stream": "^4.0.1"
      },
      "engines": {
        "node": ">=18"
      },
      "funding": {
        "url": "https://github.com/sponsors/sindresorhus"
      }
    },
    "node_modules/get-symbol-description": {
      "version": "1.1.0",
      "resolved": "https://registry.npmjs.org/get-symbol-description/-/get-symbol-description-1.1.0.tgz",
      "integrity": "sha512-w9UMqWwJxHNOvoNzSJ2oPF5wvYcvP7jUvYzhp67yEhTi17ZDBBC1z9pTdGuzjD+EFIqLSYRweZjqfiPzQ06Ebg==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "call-bound": "^1.0.3",
        "es-errors": "^1.3.0",
        "get-intrinsic": "^1.2.6"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/get-tsconfig": {
      "version": "4.13.6",
      "resolved": "https://registry.npmjs.org/get-tsconfig/-/get-tsconfig-4.13.6.tgz",
      "integrity": "sha512-shZT/QMiSHc/YBLxxOkMtgSid5HFoauqCE3/exfsEcwg1WkeqjG+V40yBbBrsD+jW2HDXcs28xOfcbm2jI8Ddw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "resolve-pkg-maps": "^1.0.0"
      },
      "funding": {
        "url": "https://github.com/privatenumber/get-tsconfig?sponsor=1"
      }
    },
    "node_modules/glob-parent": {
      "version": "6.0.2",
      "resolved": "https://registry.npmjs.org/glob-parent/-/glob-parent-6.0.2.tgz",
      "integrity": "sha512-XxwI8EOhVQgWp6iDL+3b0r86f4d6AX6zSU55HfB4ydCEuXLXc5FcYeOu+nnGftS4TEju/11rt4KJPTMgbfmv4A==",
      "dev": true,
      "license": "ISC",
      "dependencies": {
        "is-glob": "^4.0.3"
      },
      "engines": {
        "node": ">=10.13.0"
      }
    },
    "node_modules/globals": {
      "version": "14.0.0",
      "resolved": "https://registry.npmjs.org/globals/-/globals-14.0.0.tgz",
      "integrity": "sha512-oahGvuMGQlPw/ivIYBjVSrWAfWLBeku5tpPE2fOPLi+WHffIWbuh2tCjhyQhTBPMf5E9jDEH4FOmTYgYwbKwtQ==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=18"
      },
      "funding": {
        "url": "https://github.com/sponsors/sindresorhus"
      }
    },
    "node_modules/globalthis": {
      "version": "1.0.4",
      "resolved": "https://registry.npmjs.org/globalthis/-/globalthis-1.0.4.tgz",
      "integrity": "sha512-DpLKbNU4WylpxJykQujfCcwYWiV/Jhm50Goo0wrVILAv5jOr9d+H+UR3PhSCD2rCCEIg0uc+G+muBTwD54JhDQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "define-properties": "^1.2.1",
        "gopd": "^1.0.1"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/gopd": {
      "version": "1.2.0",
      "resolved": "https://registry.npmjs.org/gopd/-/gopd-1.2.0.tgz",
      "integrity": "sha512-ZUKRh6/kUFoAiTAtTYPZJ3hw9wNxx+BIBOijnlG9PnrJsCcSjs1wyyD6vJpaYtgnzDrKYRSqf3OO6Rfa93xsRg==",
      "license": "MIT",
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/graceful-fs": {
      "version": "4.2.11",
      "resolved": "https://registry.npmjs.org/graceful-fs/-/graceful-fs-4.2.11.tgz",
      "integrity": "sha512-RbJ5/jmFcNNCcDV5o9eTnBLJ/HszWV0P73bc+Ff4nS/rJj+YaS6IGyiOL0VoBYX+l1Wrl3k63h/KrH+nhJ0XvQ==",
      "license": "ISC"
    },
    "node_modules/graphql": {
      "version": "16.13.2",
      "resolved": "https://registry.npmjs.org/graphql/-/graphql-16.13.2.tgz",
      "integrity": "sha512-5bJ+nf/UCpAjHM8i06fl7eLyVC9iuNAjm9qzkiu2ZGhM0VscSvS6WDPfAwkdkBuoXGM9FJSbKl6wylMwP9Ktig==",
      "license": "MIT",
      "engines": {
        "node": "^12.22.0 || ^14.16.0 || ^16.0.0 || >=17.0.0"
      }
    },
    "node_modules/has-bigints": {
      "version": "1.1.0",
      "resolved": "https://registry.npmjs.org/has-bigints/-/has-bigints-1.1.0.tgz",
      "integrity": "sha512-R3pbpkcIqv2Pm3dUwgjclDRVmWpTJW2DcMzcIhEXEx1oh/CEMObMm3KLmRJOdvhM7o4uQBnwr8pzRK2sJWIqfg==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/has-flag": {
      "version": "4.0.0",
      "resolved": "https://registry.npmjs.org/has-flag/-/has-flag-4.0.0.tgz",
      "integrity": "sha512-EykJT/Q1KjTWctppgIAgfSO0tKVuZUjhgMr17kqTumMl6Afv3EISleU7qZUzoXDFTAHTDC4NOoG/ZxU3EvlMPQ==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=8"
      }
    },
    "node_modules/has-property-descriptors": {
      "version": "1.0.2",
      "resolved": "https://registry.npmjs.org/has-property-descriptors/-/has-property-descriptors-1.0.2.tgz",
      "integrity": "sha512-55JNKuIW+vq4Ke1BjOTjM2YctQIvCT7GFzHwmfZPGo5wnrgkid0YQtnAleFSqumZm4az3n2BS+erby5ipJdgrg==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "es-define-property": "^1.0.0"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/has-proto": {
      "version": "1.2.0",
      "resolved": "https://registry.npmjs.org/has-proto/-/has-proto-1.2.0.tgz",
      "integrity": "sha512-KIL7eQPfHQRC8+XluaIw7BHUwwqL19bQn4hzNgdr+1wXoU0KKj6rufu47lhY7KbJR2C6T6+PfyN0Ea7wkSS+qQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "dunder-proto": "^1.0.0"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/has-symbols": {
      "version": "1.1.0",
      "resolved": "https://registry.npmjs.org/has-symbols/-/has-symbols-1.1.0.tgz",
      "integrity": "sha512-1cDNdwJ2Jaohmb3sg4OmKaMBwuC48sYni5HUw2DvsC8LjGTLK9h+eb1X6RyuOHe4hT0ULCW68iomhjUoKUqlPQ==",
      "license": "MIT",
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/has-tostringtag": {
      "version": "1.0.2",
      "resolved": "https://registry.npmjs.org/has-tostringtag/-/has-tostringtag-1.0.2.tgz",
      "integrity": "sha512-NqADB8VjPFLM2V0VvHUewwwsw0ZWBaIdgo+ieHtK3hasLz4qeCRjYcqfB6AQrBggRKppKF8L52/VqdVsO47Dlw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "has-symbols": "^1.0.3"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/hasown": {
      "version": "2.0.2",
      "resolved": "https://registry.npmjs.org/hasown/-/hasown-2.0.2.tgz",
      "integrity": "sha512-0hJU9SCPvmMzIBdZFqNPXWa6dqh7WdH0cII9y+CyS8rG3nL48Bclra9HmKhVVUHyPWNH5Y7xDwAB7bfgSjkUMQ==",
      "license": "MIT",
      "dependencies": {
        "function-bind": "^1.1.2"
      },
      "engines": {
        "node": ">= 0.4"
      }
    },
    "node_modules/headers-polyfill": {
      "version": "4.0.3",
      "resolved": "https://registry.npmjs.org/headers-polyfill/-/headers-polyfill-4.0.3.tgz",
      "integrity": "sha512-IScLbePpkvO846sIwOtOTDjutRMWdXdJmXdMvk6gCBHxFO8d+QKOQedyZSxFTTFYRSmlgSTDtXqqq4pcenBXLQ==",
      "license": "MIT"
    },
    "node_modules/hermes-estree": {
      "version": "0.25.1",
      "resolved": "https://registry.npmjs.org/hermes-estree/-/hermes-estree-0.25.1.tgz",
      "integrity": "sha512-0wUoCcLp+5Ev5pDW2OriHC2MJCbwLwuRx+gAqMTOkGKJJiBCLjtrvy4PWUGn6MIVefecRpzoOZ/UV6iGdOr+Cw==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/hermes-parser": {
      "version": "0.25.1",
      "resolved": "https://registry.npmjs.org/hermes-parser/-/hermes-parser-0.25.1.tgz",
      "integrity": "sha512-6pEjquH3rqaI6cYAXYPcz9MS4rY6R4ngRgrgfDshRptUZIc3lw0MCIJIGDj9++mfySOuPTHB4nrSW99BCvOPIA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "hermes-estree": "0.25.1"
      }
    },
    "node_modules/hono": {
      "version": "4.12.9",
      "resolved": "https://registry.npmjs.org/hono/-/hono-4.12.9.tgz",
      "integrity": "sha512-wy3T8Zm2bsEvxKZM5w21VdHDDcwVS1yUFFY6i8UobSsKfFceT7TOwhbhfKsDyx7tYQlmRM5FLpIuYvNFyjctiA==",
      "license": "MIT",
      "engines": {
        "node": ">=16.9.0"
      }
    },
    "node_modules/http-errors": {
      "version": "2.0.1",
      "resolved": "https://registry.npmjs.org/http-errors/-/http-errors-2.0.1.tgz",
      "integrity": "sha512-4FbRdAX+bSdmo4AUFuS0WNiPz8NgFt+r8ThgNWmlrjQjt1Q7ZR9+zTlce2859x4KSXrwIsaeTqDoKQmtP8pLmQ==",
      "license": "MIT",
      "dependencies": {
        "depd": "~2.0.0",
        "inherits": "~2.0.4",
        "setprototypeof": "~1.2.0",
        "statuses": "~2.0.2",
        "toidentifier": "~1.0.1"
      },
      "engines": {
        "node": ">= 0.8"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/express"
      }
    },
    "node_modules/https-proxy-agent": {
      "version": "7.0.6",
      "resolved": "https://registry.npmjs.org/https-proxy-agent/-/https-proxy-agent-7.0.6.tgz",
      "integrity": "sha512-vK9P5/iUfdl95AI+JVyUuIcVtd4ofvtrOr3HNtM2yxC9bnMbEdp3x01OhQNnjb8IJYi38VlTE3mBXwcfvywuSw==",
      "license": "MIT",
      "dependencies": {
        "agent-base": "^7.1.2",
        "debug": "4"
      },
      "engines": {
        "node": ">= 14"
      }
    },
    "node_modules/human-signals": {
      "version": "8.0.1",
      "resolved": "https://registry.npmjs.org/human-signals/-/human-signals-8.0.1.tgz",
      "integrity": "sha512-eKCa6bwnJhvxj14kZk5NCPc6Hb6BdsU9DZcOnmQKSnO1VKrfV0zCvtttPZUsBvjmNDn8rpcJfpwSYnHBjc95MQ==",
      "license": "Apache-2.0",
      "engines": {
        "node": ">=18.18.0"
      }
    },
    "node_modules/iconv-lite": {
      "version": "0.7.2",
      "resolved": "https://registry.npmjs.org/iconv-lite/-/iconv-lite-0.7.2.tgz",
      "integrity": "sha512-im9DjEDQ55s9fL4EYzOAv0yMqmMBSZp6G0VvFyTMPKWxiSBHUj9NW/qqLmXUwXrrM7AvqSlTCfvqRb0cM8yYqw==",
      "license": "MIT",
      "dependencies": {
        "safer-buffer": ">= 2.1.2 < 3.0.0"
      },
      "engines": {
        "node": ">=0.10.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/express"
      }
    },
    "node_modules/ignore": {
      "version": "5.3.2",
      "resolved": "https://registry.npmjs.org/ignore/-/ignore-5.3.2.tgz",
      "integrity": "sha512-hsBTNUqQTDwkWtcdYI2i06Y/nUBEsNEDJKjWdigLvegy8kDuJAS8uRlpkkcQpyEXL0Z/pjDy5HBmMjRCJ2gq+g==",
      "license": "MIT",
      "engines": {
        "node": ">= 4"
      }
    },
    "node_modules/import-fresh": {
      "version": "3.3.1",
      "resolved": "https://registry.npmjs.org/import-fresh/-/import-fresh-3.3.1.tgz",
      "integrity": "sha512-TR3KfrTZTYLPB6jUjfx6MF9WcWrHL9su5TObK4ZkYgBdWKPOFoSoQIdEuTuR82pmtxH2spWG9h6etwfr1pLBqQ==",
      "license": "MIT",
      "dependencies": {
        "parent-module": "^1.0.0",
        "resolve-from": "^4.0.0"
      },
      "engines": {
        "node": ">=6"
      },
      "funding": {
        "url": "https://github.com/sponsors/sindresorhus"
      }
    },
    "node_modules/imurmurhash": {
      "version": "0.1.4",
      "resolved": "https://registry.npmjs.org/imurmurhash/-/imurmurhash-0.1.4.tgz",
      "integrity": "sha512-JmXMZ6wuvDmLiHEml9ykzqO6lwFbof0GG4IkcGaENdCRDDmMVnny7s5HsIgHCbaq0w2MyPhDqkhTUgS2LU2PHA==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=0.8.19"
      }
    },
    "node_modules/inherits": {
      "version": "2.0.4",
      "resolved": "https://registry.npmjs.org/inherits/-/inherits-2.0.4.tgz",
      "integrity": "sha512-k/vGaX4/Yla3WzyMCvTQOXYeIHvqOKtnqBduzTHpzpQZzAskKMhZ2K+EnBiSM9zGSoIFeMpXKxa4dYeZIQqewQ==",
      "license": "ISC"
    },
    "node_modules/internal-slot": {
      "version": "1.1.0",
      "resolved": "https://registry.npmjs.org/internal-slot/-/internal-slot-1.1.0.tgz",
      "integrity": "sha512-4gd7VpWNQNB4UKKCFFVcp1AVv+FMOgs9NKzjHKusc8jTMhd5eL1NqQqOpE0KzMds804/yHlglp3uxgluOqAPLw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "es-errors": "^1.3.0",
        "hasown": "^2.0.2",
        "side-channel": "^1.1.0"
      },
      "engines": {
        "node": ">= 0.4"
      }
    },
    "node_modules/ip-address": {
      "version": "10.1.0",
      "resolved": "https://registry.npmjs.org/ip-address/-/ip-address-10.1.0.tgz",
      "integrity": "sha512-XXADHxXmvT9+CRxhXg56LJovE+bmWnEWB78LB83VZTprKTmaC5QfruXocxzTZ2Kl0DNwKuBdlIhjL8LeY8Sf8Q==",
      "license": "MIT",
      "engines": {
        "node": ">= 12"
      }
    },
    "node_modules/ipaddr.js": {
      "version": "1.9.1",
      "resolved": "https://registry.npmjs.org/ipaddr.js/-/ipaddr.js-1.9.1.tgz",
      "integrity": "sha512-0KI/607xoxSToH7GjN1FfSbLoU0+btTicjsQSWQlh/hZykN8KpmMf7uYwPW3R+akZ6R/w18ZlXSHBYXiYUPO3g==",
      "license": "MIT",
      "engines": {
        "node": ">= 0.10"
      }
    },
    "node_modules/is-array-buffer": {
      "version": "3.0.5",
      "resolved": "https://registry.npmjs.org/is-array-buffer/-/is-array-buffer-3.0.5.tgz",
      "integrity": "sha512-DDfANUiiG2wC1qawP66qlTugJeL5HyzMpfr8lLK+jMQirGzNod0B12cFB/9q838Ru27sBwfw78/rdoU7RERz6A==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "call-bind": "^1.0.8",
        "call-bound": "^1.0.3",
        "get-intrinsic": "^1.2.6"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/is-arrayish": {
      "version": "0.2.1",
      "resolved": "https://registry.npmjs.org/is-arrayish/-/is-arrayish-0.2.1.tgz",
      "integrity": "sha512-zz06S8t0ozoDXMG+ube26zeCTNXcKIPJZJi8hBrF4idCLms4CG9QtK7qBl1boi5ODzFpjswb5JPmHCbMpjaYzg==",
      "license": "MIT"
    },
    "node_modules/is-async-function": {
      "version": "2.1.1",
      "resolved": "https://registry.npmjs.org/is-async-function/-/is-async-function-2.1.1.tgz",
      "integrity": "sha512-9dgM/cZBnNvjzaMYHVoxxfPj2QXt22Ev7SuuPrs+xav0ukGB0S6d4ydZdEiM48kLx5kDV+QBPrpVnFyefL8kkQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "async-function": "^1.0.0",
        "call-bound": "^1.0.3",
        "get-proto": "^1.0.1",
        "has-tostringtag": "^1.0.2",
        "safe-regex-test": "^1.1.0"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/is-bigint": {
      "version": "1.1.0",
      "resolved": "https://registry.npmjs.org/is-bigint/-/is-bigint-1.1.0.tgz",
      "integrity": "sha512-n4ZT37wG78iz03xPRKJrHTdZbe3IicyucEtdRsV5yglwc3GyUfbAfpSeD0FJ41NbUNSt5wbhqfp1fS+BgnvDFQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "has-bigints": "^1.0.2"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/is-boolean-object": {
      "version": "1.2.2",
      "resolved": "https://registry.npmjs.org/is-boolean-object/-/is-boolean-object-1.2.2.tgz",
      "integrity": "sha512-wa56o2/ElJMYqjCjGkXri7it5FbebW5usLw/nPmCMs5DeZ7eziSYZhSmPRn0txqeW4LnAmQQU7FgqLpsEFKM4A==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "call-bound": "^1.0.3",
        "has-tostringtag": "^1.0.2"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/is-bun-module": {
      "version": "2.0.0",
      "resolved": "https://registry.npmjs.org/is-bun-module/-/is-bun-module-2.0.0.tgz",
      "integrity": "sha512-gNCGbnnnnFAUGKeZ9PdbyeGYJqewpmc2aKHUEMO5nQPWU9lOmv7jcmQIv+qHD8fXW6W7qfuCwX4rY9LNRjXrkQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "semver": "^7.7.1"
      }
    },
    "node_modules/is-bun-module/node_modules/semver": {
      "version": "7.7.4",
      "resolved": "https://registry.npmjs.org/semver/-/semver-7.7.4.tgz",
      "integrity": "sha512-vFKC2IEtQnVhpT78h1Yp8wzwrf8CM+MzKMHGJZfBtzhZNycRFnXsHk6E5TxIkkMsgNS7mdX3AGB7x2QM2di4lA==",
      "dev": true,
      "license": "ISC",
      "bin": {
        "semver": "bin/semver.js"
      },
      "engines": {
        "node": ">=10"
      }
    },
    "node_modules/is-callable": {
      "version": "1.2.7",
      "resolved": "https://registry.npmjs.org/is-callable/-/is-callable-1.2.7.tgz",
      "integrity": "sha512-1BC0BVFhS/p0qtw6enp8e+8OD0UrK0oFLztSjNzhcKA3WDuJxxAPXzPuPtKkjEY9UUoEWlX/8fgKeu2S8i9JTA==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/is-core-module": {
      "version": "2.16.1",
      "resolved": "https://registry.npmjs.org/is-core-module/-/is-core-module-2.16.1.tgz",
      "integrity": "sha512-UfoeMA6fIJ8wTYFEUjelnaGI67v6+N7qXJEvQuIGa99l4xsCruSYOVSQ0uPANn4dAzm8lkYPaKLrrijLq7x23w==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "hasown": "^2.0.2"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/is-data-view": {
      "version": "1.0.2",
      "resolved": "https://registry.npmjs.org/is-data-view/-/is-data-view-1.0.2.tgz",
      "integrity": "sha512-RKtWF8pGmS87i2D6gqQu/l7EYRlVdfzemCJN/P3UOs//x1QE7mfhvzHIApBTRf7axvT6DMGwSwBXYCT0nfB9xw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "call-bound": "^1.0.2",
        "get-intrinsic": "^1.2.6",
        "is-typed-array": "^1.1.13"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/is-date-object": {
      "version": "1.1.0",
      "resolved": "https://registry.npmjs.org/is-date-object/-/is-date-object-1.1.0.tgz",
      "integrity": "sha512-PwwhEakHVKTdRNVOw+/Gyh0+MzlCl4R6qKvkhuvLtPMggI1WAHt9sOwZxQLSGpUaDnrdyDsomoRgNnCfKNSXXg==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "call-bound": "^1.0.2",
        "has-tostringtag": "^1.0.2"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/is-docker": {
      "version": "3.0.0",
      "resolved": "https://registry.npmjs.org/is-docker/-/is-docker-3.0.0.tgz",
      "integrity": "sha512-eljcgEDlEns/7AXFosB5K/2nCM4P7FQPkGc/DWLy5rmFEWvZayGrik1d9/QIY5nJ4f9YsVvBkA6kJpHn9rISdQ==",
      "license": "MIT",
      "bin": {
        "is-docker": "cli.js"
      },
      "engines": {
        "node": "^12.20.0 || ^14.13.1 || >=16.0.0"
      },
      "funding": {
        "url": "https://github.com/sponsors/sindresorhus"
      }
    },
    "node_modules/is-extglob": {
      "version": "2.1.1",
      "resolved": "https://registry.npmjs.org/is-extglob/-/is-extglob-2.1.1.tgz",
      "integrity": "sha512-SbKbANkN603Vi4jEZv49LeVJMn4yGwsbzZworEoyEiutsN3nJYdbO36zfhGJ6QEDpOZIFkDtnq5JRxmvl3jsoQ==",
      "license": "MIT",
      "engines": {
        "node": ">=0.10.0"
      }
    },
    "node_modules/is-finalizationregistry": {
      "version": "1.1.1",
      "resolved": "https://registry.npmjs.org/is-finalizationregistry/-/is-finalizationregistry-1.1.1.tgz",
      "integrity": "sha512-1pC6N8qWJbWoPtEjgcL2xyhQOP491EQjeUo3qTKcmV8YSDDJrOepfG8pcC7h/QgnQHYSv0mJ3Z/ZWxmatVrysg==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "call-bound": "^1.0.3"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/is-fullwidth-code-point": {
      "version": "3.0.0",
      "resolved": "https://registry.npmjs.org/is-fullwidth-code-point/-/is-fullwidth-code-point-3.0.0.tgz",
      "integrity": "sha512-zymm5+u+sCsSWyD9qNaejV3DFvhCKclKdizYaJUuHA83RLjb7nSuGnddCHGv0hk+KY7BMAlsWeK4Ueg6EV6XQg==",
      "license": "MIT",
      "engines": {
        "node": ">=8"
      }
    },
    "node_modules/is-generator-function": {
      "version": "1.1.2",
      "resolved": "https://registry.npmjs.org/is-generator-function/-/is-generator-function-1.1.2.tgz",
      "integrity": "sha512-upqt1SkGkODW9tsGNG5mtXTXtECizwtS2kA161M+gJPc1xdb/Ax629af6YrTwcOeQHbewrPNlE5Dx7kzvXTizA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "call-bound": "^1.0.4",
        "generator-function": "^2.0.0",
        "get-proto": "^1.0.1",
        "has-tostringtag": "^1.0.2",
        "safe-regex-test": "^1.1.0"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/is-glob": {
      "version": "4.0.3",
      "resolved": "https://registry.npmjs.org/is-glob/-/is-glob-4.0.3.tgz",
      "integrity": "sha512-xelSayHH36ZgE7ZWhli7pW34hNbNl8Ojv5KVmkJD4hBdD3th8Tfk9vYasLM+mXWOZhFkgZfxhLSnrwRr4elSSg==",
      "license": "MIT",
      "dependencies": {
        "is-extglob": "^2.1.1"
      },
      "engines": {
        "node": ">=0.10.0"
      }
    },
    "node_modules/is-in-ssh": {
      "version": "1.0.0",
      "resolved": "https://registry.npmjs.org/is-in-ssh/-/is-in-ssh-1.0.0.tgz",
      "integrity": "sha512-jYa6Q9rH90kR1vKB6NM7qqd1mge3Fx4Dhw5TVlK1MUBqhEOuCagrEHMevNuCcbECmXZ0ThXkRm+Ymr51HwEPAw==",
      "license": "MIT",
      "engines": {
        "node": ">=20"
      },
      "funding": {
        "url": "https://github.com/sponsors/sindresorhus"
      }
    },
    "node_modules/is-inside-container": {
      "version": "1.0.0",
      "resolved": "https://registry.npmjs.org/is-inside-container/-/is-inside-container-1.0.0.tgz",
      "integrity": "sha512-KIYLCCJghfHZxqjYBE7rEy0OBuTd5xCHS7tHVgvCLkx7StIoaxwNW3hCALgEUjFfeRk+MG/Qxmp/vtETEF3tRA==",
      "license": "MIT",
      "dependencies": {
        "is-docker": "^3.0.0"
      },
      "bin": {
        "is-inside-container": "cli.js"
      },
      "engines": {
        "node": ">=14.16"
      },
      "funding": {
        "url": "https://github.com/sponsors/sindresorhus"
      }
    },
    "node_modules/is-interactive": {
      "version": "2.0.0",
      "resolved": "https://registry.npmjs.org/is-interactive/-/is-interactive-2.0.0.tgz",
      "integrity": "sha512-qP1vozQRI+BMOPcjFzrjXuQvdak2pHNUMZoeG2eRbiSqyvbEf/wQtEOTOX1guk6E3t36RkaqiSt8A/6YElNxLQ==",
      "license": "MIT",
      "engines": {
        "node": ">=12"
      },
      "funding": {
        "url": "https://github.com/sponsors/sindresorhus"
      }
    },
    "node_modules/is-map": {
      "version": "2.0.3",
      "resolved": "https://registry.npmjs.org/is-map/-/is-map-2.0.3.tgz",
      "integrity": "sha512-1Qed0/Hr2m+YqxnM09CjA2d/i6YZNfF6R2oRAOj36eUdS6qIV/huPJNSEpKbupewFs+ZsJlxsjjPbc0/afW6Lw==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/is-negative-zero": {
      "version": "2.0.3",
      "resolved": "https://registry.npmjs.org/is-negative-zero/-/is-negative-zero-2.0.3.tgz",
      "integrity": "sha512-5KoIu2Ngpyek75jXodFvnafB6DJgr3u8uuK0LEZJjrU19DrMD3EVERaR8sjz8CCGgpZvxPl9SuE1GMVPFHx1mw==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/is-node-process": {
      "version": "1.2.0",
      "resolved": "https://registry.npmjs.org/is-node-process/-/is-node-process-1.2.0.tgz",
      "integrity": "sha512-Vg4o6/fqPxIjtxgUH5QLJhwZ7gW5diGCVlXpuUfELC62CuxM1iHcRe51f2W1FDy04Ai4KJkagKjx3XaqyfRKXw==",
      "license": "MIT"
    },
    "node_modules/is-number": {
      "version": "7.0.0",
      "resolved": "https://registry.npmjs.org/is-number/-/is-number-7.0.0.tgz",
      "integrity": "sha512-41Cifkg6e8TylSpdtTpeLVMqvSBEVzTttHvERD741+pnZ8ANv0004MRL43QKPDlK9cGvNp6NZWZUBlbGXYxxng==",
      "license": "MIT",
      "engines": {
        "node": ">=0.12.0"
      }
    },
    "node_modules/is-number-object": {
      "version": "1.1.1",
      "resolved": "https://registry.npmjs.org/is-number-object/-/is-number-object-1.1.1.tgz",
      "integrity": "sha512-lZhclumE1G6VYD8VHe35wFaIif+CTy5SJIi5+3y4psDgWu4wPDoBhF8NxUOinEc7pHgiTsT6MaBb92rKhhD+Xw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "call-bound": "^1.0.3",
        "has-tostringtag": "^1.0.2"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/is-obj": {
      "version": "3.0.0",
      "resolved": "https://registry.npmjs.org/is-obj/-/is-obj-3.0.0.tgz",
      "integrity": "sha512-IlsXEHOjtKhpN8r/tRFj2nDyTmHvcfNeu/nrRIcXE17ROeatXchkojffa1SpdqW4cr/Fj6QkEf/Gn4zf6KKvEQ==",
      "license": "MIT",
      "engines": {
        "node": ">=12"
      },
      "funding": {
        "url": "https://github.com/sponsors/sindresorhus"
      }
    },
    "node_modules/is-plain-obj": {
      "version": "4.1.0",
      "resolved": "https://registry.npmjs.org/is-plain-obj/-/is-plain-obj-4.1.0.tgz",
      "integrity": "sha512-+Pgi+vMuUNkJyExiMBt5IlFoMyKnr5zhJ4Uspz58WOhBF5QoIZkFyNHIbBAtHwzVAgk5RtndVNsDRN61/mmDqg==",
      "license": "MIT",
      "engines": {
        "node": ">=12"
      },
      "funding": {
        "url": "https://github.com/sponsors/sindresorhus"
      }
    },
    "node_modules/is-promise": {
      "version": "4.0.0",
      "resolved": "https://registry.npmjs.org/is-promise/-/is-promise-4.0.0.tgz",
      "integrity": "sha512-hvpoI6korhJMnej285dSg6nu1+e6uxs7zG3BYAm5byqDsgJNWwxzM6z6iZiAgQR4TJ30JmBTOwqZUw3WlyH3AQ==",
      "license": "MIT"
    },
    "node_modules/is-regex": {
      "version": "1.2.1",
      "resolved": "https://registry.npmjs.org/is-regex/-/is-regex-1.2.1.tgz",
      "integrity": "sha512-MjYsKHO5O7mCsmRGxWcLWheFqN9DJ/2TmngvjKXihe6efViPqc274+Fx/4fYj/r03+ESvBdTXK0V6tA3rgez1g==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "call-bound": "^1.0.2",
        "gopd": "^1.2.0",
        "has-tostringtag": "^1.0.2",
        "hasown": "^2.0.2"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/is-regexp": {
      "version": "3.1.0",
      "resolved": "https://registry.npmjs.org/is-regexp/-/is-regexp-3.1.0.tgz",
      "integrity": "sha512-rbku49cWloU5bSMI+zaRaXdQHXnthP6DZ/vLnfdSKyL4zUzuWnomtOEiZZOd+ioQ+avFo/qau3KPTc7Fjy1uPA==",
      "license": "MIT",
      "engines": {
        "node": ">=12"
      },
      "funding": {
        "url": "https://github.com/sponsors/sindresorhus"
      }
    },
    "node_modules/is-set": {
      "version": "2.0.3",
      "resolved": "https://registry.npmjs.org/is-set/-/is-set-2.0.3.tgz",
      "integrity": "sha512-iPAjerrse27/ygGLxw+EBR9agv9Y6uLeYVJMu+QNCoouJ1/1ri0mGrcWpfCqFZuzzx3WjtwxG098X+n4OuRkPg==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/is-shared-array-buffer": {
      "version": "1.0.4",
      "resolved": "https://registry.npmjs.org/is-shared-array-buffer/-/is-shared-array-buffer-1.0.4.tgz",
      "integrity": "sha512-ISWac8drv4ZGfwKl5slpHG9OwPNty4jOWPRIhBpxOoD+hqITiwuipOQ2bNthAzwA3B4fIjO4Nln74N0S9byq8A==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "call-bound": "^1.0.3"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/is-stream": {
      "version": "4.0.1",
      "resolved": "https://registry.npmjs.org/is-stream/-/is-stream-4.0.1.tgz",
      "integrity": "sha512-Dnz92NInDqYckGEUJv689RbRiTSEHCQ7wOVeALbkOz999YpqT46yMRIGtSNl2iCL1waAZSx40+h59NV/EwzV/A==",
      "license": "MIT",
      "engines": {
        "node": ">=18"
      },
      "funding": {
        "url": "https://github.com/sponsors/sindresorhus"
      }
    },
    "node_modules/is-string": {
      "version": "1.1.1",
      "resolved": "https://registry.npmjs.org/is-string/-/is-string-1.1.1.tgz",
      "integrity": "sha512-BtEeSsoaQjlSPBemMQIrY1MY0uM6vnS1g5fmufYOtnxLGUZM2178PKbhsk7Ffv58IX+ZtcvoGwccYsh0PglkAA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "call-bound": "^1.0.3",
        "has-tostringtag": "^1.0.2"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/is-symbol": {
      "version": "1.1.1",
      "resolved": "https://registry.npmjs.org/is-symbol/-/is-symbol-1.1.1.tgz",
      "integrity": "sha512-9gGx6GTtCQM73BgmHQXfDmLtfjjTUDSyoxTCbp5WtoixAhfgsDirWIcVQ/IHpvI5Vgd5i/J5F7B9cN/WlVbC/w==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "call-bound": "^1.0.2",
        "has-symbols": "^1.1.0",
        "safe-regex-test": "^1.1.0"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/is-typed-array": {
      "version": "1.1.15",
      "resolved": "https://registry.npmjs.org/is-typed-array/-/is-typed-array-1.1.15.tgz",
      "integrity": "sha512-p3EcsicXjit7SaskXHs1hA91QxgTw46Fv6EFKKGS5DRFLD8yKnohjF3hxoju94b/OcMZoQukzpPpBE9uLVKzgQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "which-typed-array": "^1.1.16"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/is-unicode-supported": {
      "version": "2.1.0",
      "resolved": "https://registry.npmjs.org/is-unicode-supported/-/is-unicode-supported-2.1.0.tgz",
      "integrity": "sha512-mE00Gnza5EEB3Ds0HfMyllZzbBrmLOX3vfWoj9A9PEnTfratQ/BcaJOuMhnkhjXvb2+FkY3VuHqtAGpTPmglFQ==",
      "license": "MIT",
      "engines": {
        "node": ">=18"
      },
      "funding": {
        "url": "https://github.com/sponsors/sindresorhus"
      }
    },
    "node_modules/is-weakmap": {
      "version": "2.0.2",
      "resolved": "https://registry.npmjs.org/is-weakmap/-/is-weakmap-2.0.2.tgz",
      "integrity": "sha512-K5pXYOm9wqY1RgjpL3YTkF39tni1XajUIkawTLUo9EZEVUFga5gSQJF8nNS7ZwJQ02y+1YCNYcMh+HIf1ZqE+w==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/is-weakref": {
      "version": "1.1.1",
      "resolved": "https://registry.npmjs.org/is-weakref/-/is-weakref-1.1.1.tgz",
      "integrity": "sha512-6i9mGWSlqzNMEqpCp93KwRS1uUOodk2OJ6b+sq7ZPDSy2WuI5NFIxp/254TytR8ftefexkWn5xNiHUNpPOfSew==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "call-bound": "^1.0.3"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/is-weakset": {
      "version": "2.0.4",
      "resolved": "https://registry.npmjs.org/is-weakset/-/is-weakset-2.0.4.tgz",
      "integrity": "sha512-mfcwb6IzQyOKTs84CQMrOwW4gQcaTOAWJ0zzJCl2WSPDrWk/OzDaImWFH3djXhb24g4eudZfLRozAvPGw4d9hQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "call-bound": "^1.0.3",
        "get-intrinsic": "^1.2.6"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/is-wsl": {
      "version": "3.1.1",
      "resolved": "https://registry.npmjs.org/is-wsl/-/is-wsl-3.1.1.tgz",
      "integrity": "sha512-e6rvdUCiQCAuumZslxRJWR/Doq4VpPR82kqclvcS0efgt430SlGIk05vdCN58+VrzgtIcfNODjozVielycD4Sw==",
      "license": "MIT",
      "dependencies": {
        "is-inside-container": "^1.0.0"
      },
      "engines": {
        "node": ">=16"
      },
      "funding": {
        "url": "https://github.com/sponsors/sindresorhus"
      }
    },
    "node_modules/isarray": {
      "version": "2.0.5",
      "resolved": "https://registry.npmjs.org/isarray/-/isarray-2.0.5.tgz",
      "integrity": "sha512-xHjhDr3cNBK0BzdUJSPXZntQUx/mwMS5Rw4A7lPJ90XGAO6ISP/ePDNuo0vhqOZU+UD5JoodwCAAoZQd3FeAKw==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/isexe": {
      "version": "2.0.0",
      "resolved": "https://registry.npmjs.org/isexe/-/isexe-2.0.0.tgz",
      "integrity": "sha512-RHxMLp9lnKHGHRng9QFhRCMbYAcVpn69smSGcq3f36xjgVVWThj4qqLbTLlq7Ssj8B+fIQ1EuCEGI2lKsyQeIw==",
      "license": "ISC"
    },
    "node_modules/iterator.prototype": {
      "version": "1.1.5",
      "resolved": "https://registry.npmjs.org/iterator.prototype/-/iterator.prototype-1.1.5.tgz",
      "integrity": "sha512-H0dkQoCa3b2VEeKQBOxFph+JAbcrQdE7KC0UkqwpLmv2EC4P41QXP+rqo9wYodACiG5/WM5s9oDApTU8utwj9g==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "define-data-property": "^1.1.4",
        "es-object-atoms": "^1.0.0",
        "get-intrinsic": "^1.2.6",
        "get-proto": "^1.0.0",
        "has-symbols": "^1.1.0",
        "set-function-name": "^2.0.2"
      },
      "engines": {
        "node": ">= 0.4"
      }
    },
    "node_modules/jiti": {
      "version": "2.6.1",
      "resolved": "https://registry.npmjs.org/jiti/-/jiti-2.6.1.tgz",
      "integrity": "sha512-ekilCSN1jwRvIbgeg/57YFh8qQDNbwDb9xT/qu2DAHbFFZUicIl4ygVaAvzveMhMVr3LnpSKTNnwt8PoOfmKhQ==",
      "dev": true,
      "license": "MIT",
      "bin": {
        "jiti": "lib/jiti-cli.mjs"
      }
    },
    "node_modules/jose": {
      "version": "6.2.2",
      "resolved": "https://registry.npmjs.org/jose/-/jose-6.2.2.tgz",
      "integrity": "sha512-d7kPDd34KO/YnzaDOlikGpOurfF0ByC2sEV4cANCtdqLlTfBlw2p14O/5d/zv40gJPbIQxfES3nSx1/oYNyuZQ==",
      "license": "MIT",
      "funding": {
        "url": "https://github.com/sponsors/panva"
      }
    },
    "node_modules/js-tokens": {
      "version": "4.0.0",
      "resolved": "https://registry.npmjs.org/js-tokens/-/js-tokens-4.0.0.tgz",
      "integrity": "sha512-RdJUflcE3cUzKiMqQgsCu06FPu9UdIJO0beYbPhHN4k6apgJtifcoCtT9bcxOpYBtpD2kCM6Sbzg4CausW/PKQ==",
      "license": "MIT"
    },
    "node_modules/js-yaml": {
      "version": "4.1.1",
      "resolved": "https://registry.npmjs.org/js-yaml/-/js-yaml-4.1.1.tgz",
      "integrity": "sha512-qQKT4zQxXl8lLwBtHMWwaTcGfFOZviOJet3Oy/xmGk2gZH677CJM9EvtfdSkgWcATZhj/55JZ0rmy3myCT5lsA==",
      "license": "MIT",
      "dependencies": {
        "argparse": "^2.0.1"
      },
      "bin": {
        "js-yaml": "bin/js-yaml.js"
      }
    },
    "node_modules/jsesc": {
      "version": "3.1.0",
      "resolved": "https://registry.npmjs.org/jsesc/-/jsesc-3.1.0.tgz",
      "integrity": "sha512-/sM3dO2FOzXjKQhJuo0Q173wf2KOo8t4I8vHy6lF9poUp7bKT0/NHE8fPX23PwfhnykfqnC2xRxOnVw5XuGIaA==",
      "license": "MIT",
      "bin": {
        "jsesc": "bin/jsesc"
      },
      "engines": {
        "node": ">=6"
      }
    },
    "node_modules/json-buffer": {
      "version": "3.0.1",
      "resolved": "https://registry.npmjs.org/json-buffer/-/json-buffer-3.0.1.tgz",
      "integrity": "sha512-4bV5BfR2mqfQTJm+V5tPPdf+ZpuhiIvTuAB5g8kcrXOZpTT/QwwVRWBywX1ozr6lEuPdbHxwaJlm9G6mI2sfSQ==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/json-parse-even-better-errors": {
      "version": "2.3.1",
      "resolved": "https://registry.npmjs.org/json-parse-even-better-errors/-/json-parse-even-better-errors-2.3.1.tgz",
      "integrity": "sha512-xyFwyhro/JEof6Ghe2iz2NcXoj2sloNsWr/XsERDK/oiPCfaNhl5ONfp+jQdAZRQQ0IJWNzH9zIZF7li91kh2w==",
      "license": "MIT"
    },
    "node_modules/json-schema-traverse": {
      "version": "0.4.1",
      "resolved": "https://registry.npmjs.org/json-schema-traverse/-/json-schema-traverse-0.4.1.tgz",
      "integrity": "sha512-xbbCH5dCYU5T8LcEhhuh7HJ88HXuW3qsI3Y0zOZFKfZEHcpWiHU/Jxzk629Brsab/mMiHQti9wMP+845RPe3Vg==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/json-schema-typed": {
      "version": "8.0.2",
      "resolved": "https://registry.npmjs.org/json-schema-typed/-/json-schema-typed-8.0.2.tgz",
      "integrity": "sha512-fQhoXdcvc3V28x7C7BMs4P5+kNlgUURe2jmUT1T//oBRMDrqy1QPelJimwZGo7Hg9VPV3EQV5Bnq4hbFy2vetA==",
      "license": "BSD-2-Clause"
    },
    "node_modules/json-stable-stringify-without-jsonify": {
      "version": "1.0.1",
      "resolved": "https://registry.npmjs.org/json-stable-stringify-without-jsonify/-/json-stable-stringify-without-jsonify-1.0.1.tgz",
      "integrity": "sha512-Bdboy+l7tA3OGW6FjyFHWkP5LuByj1Tk33Ljyq0axyzdk9//JSi2u3fP1QSmd1KNwq6VOKYGlAu87CisVir6Pw==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/json5": {
      "version": "2.2.3",
      "resolved": "https://registry.npmjs.org/json5/-/json5-2.2.3.tgz",
      "integrity": "sha512-XmOWe7eyHYH14cLdVPoyg+GOH3rYX++KpzrylJwSW98t3Nk+U8XOl8FWKOgwtzdb8lXGf6zYwDUzeHMWfxasyg==",
      "license": "MIT",
      "bin": {
        "json5": "lib/cli.js"
      },
      "engines": {
        "node": ">=6"
      }
    },
    "node_modules/jsonfile": {
      "version": "6.2.0",
      "resolved": "https://registry.npmjs.org/jsonfile/-/jsonfile-6.2.0.tgz",
      "integrity": "sha512-FGuPw30AdOIUTRMC2OMRtQV+jkVj2cfPqSeWXv1NEAJ1qZ5zb1X6z1mFhbfOB/iy3ssJCD+3KuZ8r8C3uVFlAg==",
      "license": "MIT",
      "dependencies": {
        "universalify": "^2.0.0"
      },
      "optionalDependencies": {
        "graceful-fs": "^4.1.6"
      }
    },
    "node_modules/jsx-ast-utils": {
      "version": "3.3.5",
      "resolved": "https://registry.npmjs.org/jsx-ast-utils/-/jsx-ast-utils-3.3.5.tgz",
      "integrity": "sha512-ZZow9HBI5O6EPgSJLUb8n2NKgmVWTwCvHGwFuJlMjvLFqlGG6pjirPhtdsseaLZjSibD8eegzmYpUZwoIlj2cQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "array-includes": "^3.1.6",
        "array.prototype.flat": "^1.3.1",
        "object.assign": "^4.1.4",
        "object.values": "^1.1.6"
      },
      "engines": {
        "node": ">=4.0"
      }
    },
    "node_modules/keyv": {
      "version": "4.5.4",
      "resolved": "https://registry.npmjs.org/keyv/-/keyv-4.5.4.tgz",
      "integrity": "sha512-oxVHkHR/EJf2CNXnWxRLW6mg7JyCCUcG0DtEGmL2ctUo1PNTin1PUil+r/+4r5MpVgC/fn1kjsx7mjSujKqIpw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "json-buffer": "3.0.1"
      }
    },
    "node_modules/kleur": {
      "version": "4.1.5",
      "resolved": "https://registry.npmjs.org/kleur/-/kleur-4.1.5.tgz",
      "integrity": "sha512-o+NO+8WrRiQEE4/7nwRJhN1HWpVmJm511pBHUxPLtp0BUISzlBplORYSmTclCnJvQq2tKu/sgl3xVpkc7ZWuQQ==",
      "license": "MIT",
      "engines": {
        "node": ">=6"
      }
    },
    "node_modules/kysely": {
      "version": "0.28.13",
      "resolved": "https://registry.npmjs.org/kysely/-/kysely-0.28.13.tgz",
      "integrity": "sha512-jCkYDvlfzOyHaVsrvR4vnNZxG30oNv2jbbFBjTQAUG8n0h07HW0sZJHk4KAQIRyu9ay+Rg+L8qGa3lwt8Gve9w==",
      "license": "MIT",
      "engines": {
        "node": ">=20.0.0"
      }
    },
    "node_modules/language-subtag-registry": {
      "version": "0.3.23",
      "resolved": "https://registry.npmjs.org/language-subtag-registry/-/language-subtag-registry-0.3.23.tgz",
      "integrity": "sha512-0K65Lea881pHotoGEa5gDlMxt3pctLi2RplBb7Ezh4rRdLEOtgi7n4EwK9lamnUCkKBqaeKRVebTq6BAxSkpXQ==",
      "dev": true,
      "license": "CC0-1.0"
    },
    "node_modules/language-tags": {
      "version": "1.0.9",
      "resolved": "https://registry.npmjs.org/language-tags/-/language-tags-1.0.9.tgz",
      "integrity": "sha512-MbjN408fEndfiQXbFQ1vnd+1NoLDsnQW41410oQBXiyXDMYH5z505juWa4KUE1LqxRC7DgOgZDbKLxHIwm27hA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "language-subtag-registry": "^0.3.20"
      },
      "engines": {
        "node": ">=0.10"
      }
    },
    "node_modules/levn": {
      "version": "0.4.1",
      "resolved": "https://registry.npmjs.org/levn/-/levn-0.4.1.tgz",
      "integrity": "sha512-+bT2uH4E5LGE7h/n3evcS/sQlJXCpIp6ym8OWJ5eV6+67Dsql/LaaT7qJBAt2rzfoa/5QBGBhxDix1dMt2kQKQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "prelude-ls": "^1.2.1",
        "type-check": "~0.4.0"
      },
      "engines": {
        "node": ">= 0.8.0"
      }
    },
    "node_modules/lightningcss": {
      "version": "1.32.0",
      "resolved": "https://registry.npmjs.org/lightningcss/-/lightningcss-1.32.0.tgz",
      "integrity": "sha512-NXYBzinNrblfraPGyrbPoD19C1h9lfI/1mzgWYvXUTe414Gz/X1FD2XBZSZM7rRTrMA8JL3OtAaGifrIKhQ5yQ==",
      "dev": true,
      "license": "MPL-2.0",
      "dependencies": {
        "detect-libc": "^2.0.3"
      },
      "engines": {
        "node": ">= 12.0.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/parcel"
      },
      "optionalDependencies": {
        "lightningcss-android-arm64": "1.32.0",
        "lightningcss-darwin-arm64": "1.32.0",
        "lightningcss-darwin-x64": "1.32.0",
        "lightningcss-freebsd-x64": "1.32.0",
        "lightningcss-linux-arm-gnueabihf": "1.32.0",
        "lightningcss-linux-arm64-gnu": "1.32.0",
        "lightningcss-linux-arm64-musl": "1.32.0",
        "lightningcss-linux-x64-gnu": "1.32.0",
        "lightningcss-linux-x64-musl": "1.32.0",
        "lightningcss-win32-arm64-msvc": "1.32.0",
        "lightningcss-win32-x64-msvc": "1.32.0"
      }
    },
    "node_modules/lightningcss-android-arm64": {
      "version": "1.32.0",
      "resolved": "https://registry.npmjs.org/lightningcss-android-arm64/-/lightningcss-android-arm64-1.32.0.tgz",
      "integrity": "sha512-YK7/ClTt4kAK0vo6w3X+Pnm0D2cf2vPHbhOXdoNti1Ga0al1P4TBZhwjATvjNwLEBCnKvjJc2jQgHXH0NEwlAg==",
      "cpu": [
        "arm64"
      ],
      "dev": true,
      "license": "MPL-2.0",
      "optional": true,
      "os": [
        "android"
      ],
      "engines": {
        "node": ">= 12.0.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/parcel"
      }
    },
    "node_modules/lightningcss-darwin-arm64": {
      "version": "1.32.0",
      "resolved": "https://registry.npmjs.org/lightningcss-darwin-arm64/-/lightningcss-darwin-arm64-1.32.0.tgz",
      "integrity": "sha512-RzeG9Ju5bag2Bv1/lwlVJvBE3q6TtXskdZLLCyfg5pt+HLz9BqlICO7LZM7VHNTTn/5PRhHFBSjk5lc4cmscPQ==",
      "cpu": [
        "arm64"
      ],
      "dev": true,
      "license": "MPL-2.0",
      "optional": true,
      "os": [
        "darwin"
      ],
      "engines": {
        "node": ">= 12.0.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/parcel"
      }
    },
    "node_modules/lightningcss-darwin-x64": {
      "version": "1.32.0",
      "resolved": "https://registry.npmjs.org/lightningcss-darwin-x64/-/lightningcss-darwin-x64-1.32.0.tgz",
      "integrity": "sha512-U+QsBp2m/s2wqpUYT/6wnlagdZbtZdndSmut/NJqlCcMLTWp5muCrID+K5UJ6jqD2BFshejCYXniPDbNh73V8w==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "license": "MPL-2.0",
      "optional": true,
      "os": [
        "darwin"
      ],
      "engines": {
        "node": ">= 12.0.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/parcel"
      }
    },
    "node_modules/lightningcss-freebsd-x64": {
      "version": "1.32.0",
      "resolved": "https://registry.npmjs.org/lightningcss-freebsd-x64/-/lightningcss-freebsd-x64-1.32.0.tgz",
      "integrity": "sha512-JCTigedEksZk3tHTTthnMdVfGf61Fky8Ji2E4YjUTEQX14xiy/lTzXnu1vwiZe3bYe0q+SpsSH/CTeDXK6WHig==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "license": "MPL-2.0",
      "optional": true,
      "os": [
        "freebsd"
      ],
      "engines": {
        "node": ">= 12.0.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/parcel"
      }
    },
    "node_modules/lightningcss-linux-arm-gnueabihf": {
      "version": "1.32.0",
      "resolved": "https://registry.npmjs.org/lightningcss-linux-arm-gnueabihf/-/lightningcss-linux-arm-gnueabihf-1.32.0.tgz",
      "integrity": "sha512-x6rnnpRa2GL0zQOkt6rts3YDPzduLpWvwAF6EMhXFVZXD4tPrBkEFqzGowzCsIWsPjqSK+tyNEODUBXeeVHSkw==",
      "cpu": [
        "arm"
      ],
      "dev": true,
      "license": "MPL-2.0",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">= 12.0.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/parcel"
      }
    },
    "node_modules/lightningcss-linux-arm64-gnu": {
      "version": "1.32.0",
      "resolved": "https://registry.npmjs.org/lightningcss-linux-arm64-gnu/-/lightningcss-linux-arm64-gnu-1.32.0.tgz",
      "integrity": "sha512-0nnMyoyOLRJXfbMOilaSRcLH3Jw5z9HDNGfT/gwCPgaDjnx0i8w7vBzFLFR1f6CMLKF8gVbebmkUN3fa/kQJpQ==",
      "cpu": [
        "arm64"
      ],
      "dev": true,
      "license": "MPL-2.0",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">= 12.0.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/parcel"
      }
    },
    "node_modules/lightningcss-linux-arm64-musl": {
      "version": "1.32.0",
      "resolved": "https://registry.npmjs.org/lightningcss-linux-arm64-musl/-/lightningcss-linux-arm64-musl-1.32.0.tgz",
      "integrity": "sha512-UpQkoenr4UJEzgVIYpI80lDFvRmPVg6oqboNHfoH4CQIfNA+HOrZ7Mo7KZP02dC6LjghPQJeBsvXhJod/wnIBg==",
      "cpu": [
        "arm64"
      ],
      "dev": true,
      "license": "MPL-2.0",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">= 12.0.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/parcel"
      }
    },
    "node_modules/lightningcss-linux-x64-gnu": {
      "version": "1.32.0",
      "resolved": "https://registry.npmjs.org/lightningcss-linux-x64-gnu/-/lightningcss-linux-x64-gnu-1.32.0.tgz",
      "integrity": "sha512-V7Qr52IhZmdKPVr+Vtw8o+WLsQJYCTd8loIfpDaMRWGUZfBOYEJeyJIkqGIDMZPwPx24pUMfwSxxI8phr/MbOA==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "license": "MPL-2.0",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">= 12.0.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/parcel"
      }
    },
    "node_modules/lightningcss-linux-x64-musl": {
      "version": "1.32.0",
      "resolved": "https://registry.npmjs.org/lightningcss-linux-x64-musl/-/lightningcss-linux-x64-musl-1.32.0.tgz",
      "integrity": "sha512-bYcLp+Vb0awsiXg/80uCRezCYHNg1/l3mt0gzHnWV9XP1W5sKa5/TCdGWaR/zBM2PeF/HbsQv/j2URNOiVuxWg==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "license": "MPL-2.0",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">= 12.0.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/parcel"
      }
    },
    "node_modules/lightningcss-win32-arm64-msvc": {
      "version": "1.32.0",
      "resolved": "https://registry.npmjs.org/lightningcss-win32-arm64-msvc/-/lightningcss-win32-arm64-msvc-1.32.0.tgz",
      "integrity": "sha512-8SbC8BR40pS6baCM8sbtYDSwEVQd4JlFTOlaD3gWGHfThTcABnNDBda6eTZeqbofalIJhFx0qKzgHJmcPTnGdw==",
      "cpu": [
        "arm64"
      ],
      "dev": true,
      "license": "MPL-2.0",
      "optional": true,
      "os": [
        "win32"
      ],
      "engines": {
        "node": ">= 12.0.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/parcel"
      }
    },
    "node_modules/lightningcss-win32-x64-msvc": {
      "version": "1.32.0",
      "resolved": "https://registry.npmjs.org/lightningcss-win32-x64-msvc/-/lightningcss-win32-x64-msvc-1.32.0.tgz",
      "integrity": "sha512-Amq9B/SoZYdDi1kFrojnoqPLxYhQ4Wo5XiL8EVJrVsB8ARoC1PWW6VGtT0WKCemjy8aC+louJnjS7U18x3b06Q==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "license": "MPL-2.0",
      "optional": true,
      "os": [
        "win32"
      ],
      "engines": {
        "node": ">= 12.0.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/parcel"
      }
    },
    "node_modules/lines-and-columns": {
      "version": "1.2.4",
      "resolved": "https://registry.npmjs.org/lines-and-columns/-/lines-and-columns-1.2.4.tgz",
      "integrity": "sha512-7ylylesZQ/PV29jhEDl3Ufjo6ZX7gCqJr5F7PKrqc93v7fzSymt1BpwEU8nAUXs8qzzvqhbjhK5QZg6Mt/HkBg==",
      "license": "MIT"
    },
    "node_modules/livekit-client": {
      "version": "2.18.1",
      "resolved": "https://registry.npmjs.org/livekit-client/-/livekit-client-2.18.1.tgz",
      "integrity": "sha512-nGjuEEV1mVN01EcAMwGIwG3J1gpBMqwn2V4R6W/8zz9Rah1CaAohIm6AMLG7BdctQpyeh34dfAOLfDodIsWyYA==",
      "license": "Apache-2.0",
      "dependencies": {
        "@livekit/mutex": "1.1.1",
        "@livekit/protocol": "1.44.0",
        "events": "^3.3.0",
        "jose": "^6.1.0",
        "loglevel": "^1.9.2",
        "sdp-transform": "^2.15.0",
        "tslib": "2.8.1",
        "typed-emitter": "^2.1.0",
        "webrtc-adapter": "^9.0.1"
      },
      "peerDependencies": {
        "@types/dom-mediacapture-record": "^1"
      }
    },
    "node_modules/livekit-client/node_modules/loglevel": {
      "version": "1.9.2",
      "resolved": "https://registry.npmjs.org/loglevel/-/loglevel-1.9.2.tgz",
      "integrity": "sha512-HgMmCqIJSAKqo68l0rS2AanEWfkxaZ5wNiEFb5ggm08lDs9Xl2KxBlX3PTcaD2chBM1gXAYf491/M2Rv8Jwayg==",
      "license": "MIT",
      "engines": {
        "node": ">= 0.6.0"
      },
      "funding": {
        "type": "tidelift",
        "url": "https://tidelift.com/funding/github/npm/loglevel"
      }
    },
    "node_modules/locate-path": {
      "version": "6.0.0",
      "resolved": "https://registry.npmjs.org/locate-path/-/locate-path-6.0.0.tgz",
      "integrity": "sha512-iPZK6eYjbxRu3uB4/WZ3EsEIMJFMqAoopl3R+zuq0UjcAm/MO6KCweDgPfP3elTztoKP3KtnVHxTn2NHBSDVUw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "p-locate": "^5.0.0"
      },
      "engines": {
        "node": ">=10"
      },
      "funding": {
        "url": "https://github.com/sponsors/sindresorhus"
      }
    },
    "node_modules/lodash.debounce": {
      "version": "4.0.8",
      "resolved": "https://registry.npmjs.org/lodash.debounce/-/lodash.debounce-4.0.8.tgz",
      "integrity": "sha512-FT1yDzDYEoYWhnSGnpE/4Kj1fLZkDFyqRb7fNt6FdYOSxlUWAtp42Eh6Wb0rGIv/m9Bgo7x4GhQbm5Ys4SG5ow==",
      "license": "MIT"
    },
    "node_modules/lodash.merge": {
      "version": "4.6.2",
      "resolved": "https://registry.npmjs.org/lodash.merge/-/lodash.merge-4.6.2.tgz",
      "integrity": "sha512-0KpjqXRVvrYyCsX1swR/XTK0va6VQkQM6MNo7PqW77ByjAhoARA8EfrP1N4+KlKj8YS0ZUCtRT/YUuhyYDujIQ==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/log-symbols": {
      "version": "6.0.0",
      "resolved": "https://registry.npmjs.org/log-symbols/-/log-symbols-6.0.0.tgz",
      "integrity": "sha512-i24m8rpwhmPIS4zscNzK6MSEhk0DUWa/8iYQWxhffV8jkI4Phvs3F+quL5xvS0gdQR0FyTCMMH33Y78dDTzzIw==",
      "license": "MIT",
      "dependencies": {
        "chalk": "^5.3.0",
        "is-unicode-supported": "^1.3.0"
      },
      "engines": {
        "node": ">=18"
      },
      "funding": {
        "url": "https://github.com/sponsors/sindresorhus"
      }
    },
    "node_modules/log-symbols/node_modules/chalk": {
      "version": "5.6.2",
      "resolved": "https://registry.npmjs.org/chalk/-/chalk-5.6.2.tgz",
      "integrity": "sha512-7NzBL0rN6fMUW+f7A6Io4h40qQlG+xGmtMxfbnH/K7TAtt8JQWVQK+6g0UXKMeVJoyV5EkkNsErQ8pVD3bLHbA==",
      "license": "MIT",
      "engines": {
        "node": "^12.17.0 || ^14.13 || >=16.0.0"
      },
      "funding": {
        "url": "https://github.com/chalk/chalk?sponsor=1"
      }
    },
    "node_modules/log-symbols/node_modules/is-unicode-supported": {
      "version": "1.3.0",
      "resolved": "https://registry.npmjs.org/is-unicode-supported/-/is-unicode-supported-1.3.0.tgz",
      "integrity": "sha512-43r2mRvz+8JRIKnWJ+3j8JtjRKZ6GmjzfaE/qiBJnikNnYv/6bagRJ1kUhNk8R5EX/GkobD+r+sfxCPJsiKBLQ==",
      "license": "MIT",
      "engines": {
        "node": ">=12"
      },
      "funding": {
        "url": "https://github.com/sponsors/sindresorhus"
      }
    },
    "node_modules/loglevel": {
      "version": "1.9.1",
      "resolved": "https://registry.npmjs.org/loglevel/-/loglevel-1.9.1.tgz",
      "integrity": "sha512-hP3I3kCrDIMuRwAwHltphhDM1r8i55H33GgqjXbrisuJhF4kRhW1dNuxsRklp4bXl8DSdLaNLuiL4A/LWRfxvg==",
      "license": "MIT",
      "engines": {
        "node": ">= 0.6.0"
      },
      "funding": {
        "type": "tidelift",
        "url": "https://tidelift.com/funding/github/npm/loglevel"
      }
    },
    "node_modules/loose-envify": {
      "version": "1.4.0",
      "resolved": "https://registry.npmjs.org/loose-envify/-/loose-envify-1.4.0.tgz",
      "integrity": "sha512-lyuxPGr/Wfhrlem2CL/UcnUc1zcqKAImBDzukY7Y5F/yQiNdko6+fRLevlw1HgMySw7f611UIY408EtxRSoK3Q==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "js-tokens": "^3.0.0 || ^4.0.0"
      },
      "bin": {
        "loose-envify": "cli.js"
      }
    },
    "node_modules/lru-cache": {
      "version": "5.1.1",
      "resolved": "https://registry.npmjs.org/lru-cache/-/lru-cache-5.1.1.tgz",
      "integrity": "sha512-KpNARQA3Iwv+jTA0utUVVbrh+Jlrr1Fv0e56GGzAFOXN7dk/FviaDW8LHmK52DlcH4WP2n6gI8vN1aesBFgo9w==",
      "license": "ISC",
      "dependencies": {
        "yallist": "^3.0.2"
      }
    },
    "node_modules/lucide-react": {
      "version": "1.6.0",
      "resolved": "https://registry.npmjs.org/lucide-react/-/lucide-react-1.6.0.tgz",
      "integrity": "sha512-YxLKVCOF5ZDI1AhKQE5IBYMY9y/Nr4NT15+7QEWpsTSVCdn4vmZhww+6BP76jWYjQx8rSz1Z+gGme1f+UycWEw==",
      "license": "ISC",
      "peerDependencies": {
        "react": "^16.5.1 || ^17.0.0 || ^18.0.0 || ^19.0.0"
      }
    },
    "node_modules/magic-string": {
      "version": "0.30.21",
      "resolved": "https://registry.npmjs.org/magic-string/-/magic-string-0.30.21.tgz",
      "integrity": "sha512-vd2F4YUyEXKGcLHoq+TEyCjxueSeHnFxyyjNp80yg0XV4vUhnDer/lvvlqM/arB5bXQN5K2/3oinyCRyx8T2CQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@jridgewell/sourcemap-codec": "^1.5.5"
      }
    },
    "node_modules/math-intrinsics": {
      "version": "1.1.0",
      "resolved": "https://registry.npmjs.org/math-intrinsics/-/math-intrinsics-1.1.0.tgz",
      "integrity": "sha512-/IXtbwEk5HTPyEwyKX6hGkYXxM9nbj64B+ilVJnC/R6B0pH5G4V3b0pVbL7DBj4tkhBAppbQUlf6F6Xl9LHu1g==",
      "license": "MIT",
      "engines": {
        "node": ">= 0.4"
      }
    },
    "node_modules/media-typer": {
      "version": "1.1.0",
      "resolved": "https://registry.npmjs.org/media-typer/-/media-typer-1.1.0.tgz",
      "integrity": "sha512-aisnrDP4GNe06UcKFnV5bfMNPBUw4jsLGaWwWfnH3v02GnBuXX2MCVn5RbrWo0j3pczUilYblq7fQ7Nw2t5XKw==",
      "license": "MIT",
      "engines": {
        "node": ">= 0.8"
      }
    },
    "node_modules/memory-pager": {
      "version": "1.5.0",
      "resolved": "https://registry.npmjs.org/memory-pager/-/memory-pager-1.5.0.tgz",
      "integrity": "sha512-ZS4Bp4r/Zoeq6+NLJpP+0Zzm0pR8whtGPf1XExKLJBAczGMnSi3It14OiNCStjQjM6NU1okjQGSxgEZN8eBYKg==",
      "license": "MIT",
      "peer": true
    },
    "node_modules/merge-descriptors": {
      "version": "2.0.0",
      "resolved": "https://registry.npmjs.org/merge-descriptors/-/merge-descriptors-2.0.0.tgz",
      "integrity": "sha512-Snk314V5ayFLhp3fkUREub6WtjBfPdCPY1Ln8/8munuLuiYhsABgBVWsozAG+MWMbVEvcdcpbi9R7ww22l9Q3g==",
      "license": "MIT",
      "engines": {
        "node": ">=18"
      },
      "funding": {
        "url": "https://github.com/sponsors/sindresorhus"
      }
    },
    "node_modules/merge-stream": {
      "version": "2.0.0",
      "resolved": "https://registry.npmjs.org/merge-stream/-/merge-stream-2.0.0.tgz",
      "integrity": "sha512-abv/qOcuPfk3URPfDzmZU1LKmuw8kT+0nIHvKrKgFrwifol/doWcdA4ZqsWQ8ENrFKkd67Mfpo/LovbIUsbt3w==",
      "license": "MIT"
    },
    "node_modules/merge2": {
      "version": "1.4.1",
      "resolved": "https://registry.npmjs.org/merge2/-/merge2-1.4.1.tgz",
      "integrity": "sha512-8q7VEgMJW4J8tcfVPy8g09NcQwZdbwFEqhe/WZkoIzjn/3TGDwtOCYtXGxA3O8tPzpczCCDgv+P2P5y00ZJOOg==",
      "license": "MIT",
      "engines": {
        "node": ">= 8"
      }
    },
    "node_modules/micromatch": {
      "version": "4.0.8",
      "resolved": "https://registry.npmjs.org/micromatch/-/micromatch-4.0.8.tgz",
      "integrity": "sha512-PXwfBhYu0hBCPw8Dn0E+WDYb7af3dSLVWKi3HGv84IdF4TyFoC0ysxFd0Goxw7nSv4T/PzEJQxsYsEiFCKo2BA==",
      "license": "MIT",
      "dependencies": {
        "braces": "^3.0.3",
        "picomatch": "^2.3.1"
      },
      "engines": {
        "node": ">=8.6"
      }
    },
    "node_modules/mime-db": {
      "version": "1.54.0",
      "resolved": "https://registry.npmjs.org/mime-db/-/mime-db-1.54.0.tgz",
      "integrity": "sha512-aU5EJuIN2WDemCcAp2vFBfp/m4EAhWJnUNSSw0ixs7/kXbd6Pg64EmwJkNdFhB8aWt1sH2CTXrLxo/iAGV3oPQ==",
      "license": "MIT",
      "engines": {
        "node": ">= 0.6"
      }
    },
    "node_modules/mime-types": {
      "version": "3.0.2",
      "resolved": "https://registry.npmjs.org/mime-types/-/mime-types-3.0.2.tgz",
      "integrity": "sha512-Lbgzdk0h4juoQ9fCKXW4by0UJqj+nOOrI9MJ1sSj4nI8aI2eo1qmvQEie4VD1glsS250n15LsWsYtCugiStS5A==",
      "license": "MIT",
      "dependencies": {
        "mime-db": "^1.54.0"
      },
      "engines": {
        "node": ">=18"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/express"
      }
    },
    "node_modules/mimic-fn": {
      "version": "2.1.0",
      "resolved": "https://registry.npmjs.org/mimic-fn/-/mimic-fn-2.1.0.tgz",
      "integrity": "sha512-OqbOk5oEQeAZ8WXWydlu9HJjz9WVdEIvamMCcXmuqUYjTknH/sqsWvhQ3vgwKFRR1HpjvNBKQ37nbJgYzGqGcg==",
      "license": "MIT",
      "engines": {
        "node": ">=6"
      }
    },
    "node_modules/mimic-function": {
      "version": "5.0.1",
      "resolved": "https://registry.npmjs.org/mimic-function/-/mimic-function-5.0.1.tgz",
      "integrity": "sha512-VP79XUPxV2CigYP3jWwAUFSku2aKqBH7uTAapFWCBqutsbmDo96KY5o8uh6U+/YSIn5OxJnXp73beVkpqMIGhA==",
      "license": "MIT",
      "engines": {
        "node": ">=18"
      },
      "funding": {
        "url": "https://github.com/sponsors/sindresorhus"
      }
    },
    "node_modules/minimatch": {
      "version": "3.1.5",
      "resolved": "https://registry.npmjs.org/minimatch/-/minimatch-3.1.5.tgz",
      "integrity": "sha512-VgjWUsnnT6n+NUk6eZq77zeFdpW2LWDzP6zFGrCbHXiYNul5Dzqk2HHQ5uFH2DNW5Xbp8+jVzaeNt94ssEEl4w==",
      "dev": true,
      "license": "ISC",
      "dependencies": {
        "brace-expansion": "^1.1.7"
      },
      "engines": {
        "node": "*"
      }
    },
    "node_modules/minimist": {
      "version": "1.2.8",
      "resolved": "https://registry.npmjs.org/minimist/-/minimist-1.2.8.tgz",
      "integrity": "sha512-2yyAR8qBkN3YuheJanUpWC5U3bb5osDywNB8RzDVlDwDHbocAJveqqj1u8+SVD7jkWT4yvsHCpWqqWqAxb0zCA==",
      "license": "MIT",
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/mongodb": {
      "version": "7.1.0",
      "resolved": "https://registry.npmjs.org/mongodb/-/mongodb-7.1.0.tgz",
      "integrity": "sha512-kMfnKunbolQYwCIyrkxNJFB4Ypy91pYqua5NargS/f8ODNSJxT03ZU3n1JqL4mCzbSih8tvmMEMLpKTT7x5gCg==",
      "license": "Apache-2.0",
      "peer": true,
      "dependencies": {
        "@mongodb-js/saslprep": "^1.3.0",
        "bson": "^7.1.1",
        "mongodb-connection-string-url": "^7.0.0"
      },
      "engines": {
        "node": ">=20.19.0"
      },
      "peerDependencies": {
        "@aws-sdk/credential-providers": "^3.806.0",
        "@mongodb-js/zstd": "^7.0.0",
        "gcp-metadata": "^7.0.1",
        "kerberos": "^7.0.0",
        "mongodb-client-encryption": ">=7.0.0 <7.1.0",
        "snappy": "^7.3.2",
        "socks": "^2.8.6"
      },
      "peerDependenciesMeta": {
        "@aws-sdk/credential-providers": {
          "optional": true
        },
        "@mongodb-js/zstd": {
          "optional": true
        },
        "gcp-metadata": {
          "optional": true
        },
        "kerberos": {
          "optional": true
        },
        "mongodb-client-encryption": {
          "optional": true
        },
        "snappy": {
          "optional": true
        },
        "socks": {
          "optional": true
        }
      }
    },
    "node_modules/mongodb-connection-string-url": {
      "version": "7.0.1",
      "resolved": "https://registry.npmjs.org/mongodb-connection-string-url/-/mongodb-connection-string-url-7.0.1.tgz",
      "integrity": "sha512-h0AZ9A7IDVwwHyMxmdMXKy+9oNlF0zFoahHiX3vQ8e3KFcSP3VmsmfvtRSuLPxmyv2vjIDxqty8smTgie/SNRQ==",
      "license": "Apache-2.0",
      "peer": true,
      "dependencies": {
        "@types/whatwg-url": "^13.0.0",
        "whatwg-url": "^14.1.0"
      },
      "engines": {
        "node": ">=20.19.0"
      }
    },
    "node_modules/ms": {
      "version": "2.1.3",
      "resolved": "https://registry.npmjs.org/ms/-/ms-2.1.3.tgz",
      "integrity": "sha512-6FlzubTLZG3J2a/NVCAleEhjzq5oxgHyaCU9yYXvcLsvoVaHJq/s5xXI6/XXP6tz7R9xAOtHnSO/tXtF3WRTlA==",
      "license": "MIT"
    },
    "node_modules/msw": {
      "version": "2.12.14",
      "resolved": "https://registry.npmjs.org/msw/-/msw-2.12.14.tgz",
      "integrity": "sha512-4KXa4nVBIBjbDbd7vfQNuQ25eFxug0aropCQFoI0JdOBuJWamkT1yLVIWReFI8SiTRc+H1hKzaNk+cLk2N9rtQ==",
      "hasInstallScript": true,
      "license": "MIT",
      "dependencies": {
        "@inquirer/confirm": "^5.0.0",
        "@mswjs/interceptors": "^0.41.2",
        "@open-draft/deferred-promise": "^2.2.0",
        "@types/statuses": "^2.0.6",
        "cookie": "^1.0.2",
        "graphql": "^16.12.0",
        "headers-polyfill": "^4.0.2",
        "is-node-process": "^1.2.0",
        "outvariant": "^1.4.3",
        "path-to-regexp": "^6.3.0",
        "picocolors": "^1.1.1",
        "rettime": "^0.10.1",
        "statuses": "^2.0.2",
        "strict-event-emitter": "^0.5.1",
        "tough-cookie": "^6.0.0",
        "type-fest": "^5.2.0",
        "until-async": "^3.0.2",
        "yargs": "^17.7.2"
      },
      "bin": {
        "msw": "cli/index.js"
      },
      "engines": {
        "node": ">=18"
      },
      "funding": {
        "url": "https://github.com/sponsors/mswjs"
      },
      "peerDependencies": {
        "typescript": ">= 4.8.x"
      },
      "peerDependenciesMeta": {
        "typescript": {
          "optional": true
        }
      }
    },
    "node_modules/msw/node_modules/cookie": {
      "version": "1.1.1",
      "resolved": "https://registry.npmjs.org/cookie/-/cookie-1.1.1.tgz",
      "integrity": "sha512-ei8Aos7ja0weRpFzJnEA9UHJ/7XQmqglbRwnf2ATjcB9Wq874VKH9kfjjirM6UhU2/E5fFYadylyhFldcqSidQ==",
      "license": "MIT",
      "engines": {
        "node": ">=18"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/express"
      }
    },
    "node_modules/mute-stream": {
      "version": "2.0.0",
      "resolved": "https://registry.npmjs.org/mute-stream/-/mute-stream-2.0.0.tgz",
      "integrity": "sha512-WWdIxpyjEn+FhQJQQv9aQAYlHoNVdzIzUySNV1gHUPDSdZJ3yZn7pAAbQcV7B56Mvu881q9FZV+0Vx2xC44VWA==",
      "license": "ISC",
      "engines": {
        "node": "^18.17.0 || >=20.5.0"
      }
    },
    "node_modules/nanoid": {
      "version": "3.3.11",
      "resolved": "https://registry.npmjs.org/nanoid/-/nanoid-3.3.11.tgz",
      "integrity": "sha512-N8SpfPUnUp1bK+PMYW8qSWdl9U+wwNWI4QKxOYDy9JAro3WMX7p2OeVRF9v+347pnakNevPmiHhNmZ2HbFA76w==",
      "funding": [
        {
          "type": "github",
          "url": "https://github.com/sponsors/ai"
        }
      ],
      "license": "MIT",
      "bin": {
        "nanoid": "bin/nanoid.cjs"
      },
      "engines": {
        "node": "^10 || ^12 || ^13.7 || ^14 || >=15.0.1"
      }
    },
    "node_modules/nanostores": {
      "version": "1.2.0",
      "resolved": "https://registry.npmjs.org/nanostores/-/nanostores-1.2.0.tgz",
      "integrity": "sha512-F0wCzbsH80G7XXo0Jd9/AVQC7ouWY6idUCTnMwW5t/Rv9W8qmO6endavDwg7TNp5GbugwSukFMVZqzPSrSMndg==",
      "funding": [
        {
          "type": "github",
          "url": "https://github.com/sponsors/ai"
        }
      ],
      "license": "MIT",
      "engines": {
        "node": "^20.0.0 || >=22.0.0"
      }
    },
    "node_modules/napi-postinstall": {
      "version": "0.3.4",
      "resolved": "https://registry.npmjs.org/napi-postinstall/-/napi-postinstall-0.3.4.tgz",
      "integrity": "sha512-PHI5f1O0EP5xJ9gQmFGMS6IZcrVvTjpXjz7Na41gTE7eE2hK11lg04CECCYEEjdc17EV4DO+fkGEtt7TpTaTiQ==",
      "dev": true,
      "license": "MIT",
      "bin": {
        "napi-postinstall": "lib/cli.js"
      },
      "engines": {
        "node": "^12.20.0 || ^14.18.0 || >=16.0.0"
      },
      "funding": {
        "url": "https://opencollective.com/napi-postinstall"
      }
    },
    "node_modules/natural-compare": {
      "version": "1.4.0",
      "resolved": "https://registry.npmjs.org/natural-compare/-/natural-compare-1.4.0.tgz",
      "integrity": "sha512-OWND8ei3VtNC9h7V60qff3SVobHr996CTwgxubgyQYEpg290h9J0buyECNNJexkFm5sOajh5G116RYA1c8ZMSw==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/negotiator": {
      "version": "1.0.0",
      "resolved": "https://registry.npmjs.org/negotiator/-/negotiator-1.0.0.tgz",
      "integrity": "sha512-8Ofs/AUQh8MaEcrlq5xOX0CQ9ypTF5dl78mjlMNfOK08fzpgTHQRQPBxcPlEtIw0yRpws+Zo/3r+5WRby7u3Gg==",
      "license": "MIT",
      "engines": {
        "node": ">= 0.6"
      }
    },
    "node_modules/next": {
      "version": "16.2.0",
      "resolved": "https://registry.npmjs.org/next/-/next-16.2.0.tgz",
      "integrity": "sha512-NLBVrJy1pbV1Yn00L5sU4vFyAHt5XuSjzrNyFnxo6Com0M0KrL6hHM5B99dbqXb2bE9pm4Ow3Zl1xp6HVY9edQ==",
      "license": "MIT",
      "dependencies": {
        "@next/env": "16.2.0",
        "@swc/helpers": "0.5.15",
        "baseline-browser-mapping": "^2.9.19",
        "caniuse-lite": "^1.0.30001579",
        "postcss": "8.4.31",
        "styled-jsx": "5.1.6"
      },
      "bin": {
        "next": "dist/bin/next"
      },
      "engines": {
        "node": ">=20.9.0"
      },
      "optionalDependencies": {
        "@next/swc-darwin-arm64": "16.2.0",
        "@next/swc-darwin-x64": "16.2.0",
        "@next/swc-linux-arm64-gnu": "16.2.0",
        "@next/swc-linux-arm64-musl": "16.2.0",
        "@next/swc-linux-x64-gnu": "16.2.0",
        "@next/swc-linux-x64-musl": "16.2.0",
        "@next/swc-win32-arm64-msvc": "16.2.0",
        "@next/swc-win32-x64-msvc": "16.2.0",
        "sharp": "^0.34.5"
      },
      "peerDependencies": {
        "@opentelemetry/api": "^1.1.0",
        "@playwright/test": "^1.51.1",
        "babel-plugin-react-compiler": "*",
        "react": "^18.2.0 || 19.0.0-rc-de68d2f4-20241204 || ^19.0.0",
        "react-dom": "^18.2.0 || 19.0.0-rc-de68d2f4-20241204 || ^19.0.0",
        "sass": "^1.3.0"
      },
      "peerDependenciesMeta": {
        "@opentelemetry/api": {
          "optional": true
        },
        "@playwright/test": {
          "optional": true
        },
        "babel-plugin-react-compiler": {
          "optional": true
        },
        "sass": {
          "optional": true
        }
      }
    },
    "node_modules/next/node_modules/postcss": {
      "version": "8.4.31",
      "resolved": "https://registry.npmjs.org/postcss/-/postcss-8.4.31.tgz",
      "integrity": "sha512-PS08Iboia9mts/2ygV3eLpY5ghnUcfLV/EXTOW1E2qYxJKGGBUtNjN76FYHnMs36RmARn41bC0AZmn+rR0OVpQ==",
      "funding": [
        {
          "type": "opencollective",
          "url": "https://opencollective.com/postcss/"
        },
        {
          "type": "tidelift",
          "url": "https://tidelift.com/funding/github/npm/postcss"
        },
        {
          "type": "github",
          "url": "https://github.com/sponsors/ai"
        }
      ],
      "license": "MIT",
      "dependencies": {
        "nanoid": "^3.3.6",
        "picocolors": "^1.0.0",
        "source-map-js": "^1.0.2"
      },
      "engines": {
        "node": "^10 || ^12 || >=14"
      }
    },
    "node_modules/node-domexception": {
      "version": "1.0.0",
      "resolved": "https://registry.npmjs.org/node-domexception/-/node-domexception-1.0.0.tgz",
      "integrity": "sha512-/jKZoMpw0F8GRwl4/eLROPA3cfcXtLApP0QzLmUT/HuPCZWyB7IY9ZrMeKw2O/nFIqPQB3PVM9aYm0F312AXDQ==",
      "deprecated": "Use your platform's native DOMException instead",
      "funding": [
        {
          "type": "github",
          "url": "https://github.com/sponsors/jimmywarting"
        },
        {
          "type": "github",
          "url": "https://paypal.me/jimmywarting"
        }
      ],
      "license": "MIT",
      "engines": {
        "node": ">=10.5.0"
      }
    },
    "node_modules/node-exports-info": {
      "version": "1.6.0",
      "resolved": "https://registry.npmjs.org/node-exports-info/-/node-exports-info-1.6.0.tgz",
      "integrity": "sha512-pyFS63ptit/P5WqUkt+UUfe+4oevH+bFeIiPPdfb0pFeYEu/1ELnJu5l+5EcTKYL5M7zaAa7S8ddywgXypqKCw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "array.prototype.flatmap": "^1.3.3",
        "es-errors": "^1.3.0",
        "object.entries": "^1.1.9",
        "semver": "^6.3.1"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/node-fetch": {
      "version": "3.3.2",
      "resolved": "https://registry.npmjs.org/node-fetch/-/node-fetch-3.3.2.tgz",
      "integrity": "sha512-dRB78srN/l6gqWulah9SrxeYnxeddIG30+GOqK/9OlLVyLg3HPnr6SqOWTWOXKRwC2eGYCkZ59NNuSgvSrpgOA==",
      "license": "MIT",
      "dependencies": {
        "data-uri-to-buffer": "^4.0.0",
        "fetch-blob": "^3.1.4",
        "formdata-polyfill": "^4.0.10"
      },
      "engines": {
        "node": "^12.20.0 || ^14.13.1 || >=16.0.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/node-fetch"
      }
    },
    "node_modules/node-releases": {
      "version": "2.0.36",
      "resolved": "https://registry.npmjs.org/node-releases/-/node-releases-2.0.36.tgz",
      "integrity": "sha512-TdC8FSgHz8Mwtw9g5L4gR/Sh9XhSP/0DEkQxfEFXOpiul5IiHgHan2VhYYb6agDSfp4KuvltmGApc8HMgUrIkA==",
      "license": "MIT"
    },
    "node_modules/npm-run-path": {
      "version": "6.0.0",
      "resolved": "https://registry.npmjs.org/npm-run-path/-/npm-run-path-6.0.0.tgz",
      "integrity": "sha512-9qny7Z9DsQU8Ou39ERsPU4OZQlSTP47ShQzuKZ6PRXpYLtIFgl/DEBYEXKlvcEa+9tHVcK8CF81Y2V72qaZhWA==",
      "license": "MIT",
      "dependencies": {
        "path-key": "^4.0.0",
        "unicorn-magic": "^0.3.0"
      },
      "engines": {
        "node": ">=18"
      },
      "funding": {
        "url": "https://github.com/sponsors/sindresorhus"
      }
    },
    "node_modules/npm-run-path/node_modules/path-key": {
      "version": "4.0.0",
      "resolved": "https://registry.npmjs.org/path-key/-/path-key-4.0.0.tgz",
      "integrity": "sha512-haREypq7xkM7ErfgIyA0z+Bj4AGKlMSdlQE2jvJo6huWD1EdkKYV+G/T4nq0YEF2vgTT8kqMFKo1uHn950r4SQ==",
      "license": "MIT",
      "engines": {
        "node": ">=12"
      },
      "funding": {
        "url": "https://github.com/sponsors/sindresorhus"
      }
    },
    "node_modules/object-assign": {
      "version": "4.1.1",
      "resolved": "https://registry.npmjs.org/object-assign/-/object-assign-4.1.1.tgz",
      "integrity": "sha512-rJgTQnkUnH1sFw8yT6VSU3zD3sWmu6sZhIseY8VX+GRu3P6F7Fu+JNDoXfklElbLJSnc3FUQHVe4cU5hj+BcUg==",
      "license": "MIT",
      "engines": {
        "node": ">=0.10.0"
      }
    },
    "node_modules/object-inspect": {
      "version": "1.13.4",
      "resolved": "https://registry.npmjs.org/object-inspect/-/object-inspect-1.13.4.tgz",
      "integrity": "sha512-W67iLl4J2EXEGTbfeHCffrjDfitvLANg0UlX3wFUUSTx92KXRFegMHUVgSqE+wvhAbi4WqjGg9czysTV2Epbew==",
      "license": "MIT",
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/object-keys": {
      "version": "1.1.1",
      "resolved": "https://registry.npmjs.org/object-keys/-/object-keys-1.1.1.tgz",
      "integrity": "sha512-NuAESUOUMrlIXOfHKzD6bpPu3tYt3xvjNdRIQ+FeT0lNb4K8WR70CaDxhuNguS2XG+GjkyMwOzsN5ZktImfhLA==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">= 0.4"
      }
    },
    "node_modules/object-treeify": {
      "version": "1.1.33",
      "resolved": "https://registry.npmjs.org/object-treeify/-/object-treeify-1.1.33.tgz",
      "integrity": "sha512-EFVjAYfzWqWsBMRHPMAXLCDIJnpMhdWAqR7xG6M6a2cs6PMFpl/+Z20w9zDW4vkxOFfddegBKq9Rehd0bxWE7A==",
      "license": "MIT",
      "engines": {
        "node": ">= 10"
      }
    },
    "node_modules/object.assign": {
      "version": "4.1.7",
      "resolved": "https://registry.npmjs.org/object.assign/-/object.assign-4.1.7.tgz",
      "integrity": "sha512-nK28WOo+QIjBkDduTINE4JkF/UJJKyf2EJxvJKfblDpyg0Q+pkOHNTL0Qwy6NP6FhE/EnzV73BxxqcJaXY9anw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "call-bind": "^1.0.8",
        "call-bound": "^1.0.3",
        "define-properties": "^1.2.1",
        "es-object-atoms": "^1.0.0",
        "has-symbols": "^1.1.0",
        "object-keys": "^1.1.1"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/object.entries": {
      "version": "1.1.9",
      "resolved": "https://registry.npmjs.org/object.entries/-/object.entries-1.1.9.tgz",
      "integrity": "sha512-8u/hfXFRBD1O0hPUjioLhoWFHRmt6tKA4/vZPyckBr18l1KE9uHrFaFaUi8MDRTpi4uak2goyPTSNJLXX2k2Hw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "call-bind": "^1.0.8",
        "call-bound": "^1.0.4",
        "define-properties": "^1.2.1",
        "es-object-atoms": "^1.1.1"
      },
      "engines": {
        "node": ">= 0.4"
      }
    },
    "node_modules/object.fromentries": {
      "version": "2.0.8",
      "resolved": "https://registry.npmjs.org/object.fromentries/-/object.fromentries-2.0.8.tgz",
      "integrity": "sha512-k6E21FzySsSK5a21KRADBd/NGneRegFO5pLHfdQLpRDETUNJueLXs3WCzyQ3tFRDYgbq3KHGXfTbi2bs8WQ6rQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "call-bind": "^1.0.7",
        "define-properties": "^1.2.1",
        "es-abstract": "^1.23.2",
        "es-object-atoms": "^1.0.0"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/object.groupby": {
      "version": "1.0.3",
      "resolved": "https://registry.npmjs.org/object.groupby/-/object.groupby-1.0.3.tgz",
      "integrity": "sha512-+Lhy3TQTuzXI5hevh8sBGqbmurHbbIjAi0Z4S63nthVLmLxfbj4T54a4CfZrXIrt9iP4mVAPYMo/v99taj3wjQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "call-bind": "^1.0.7",
        "define-properties": "^1.2.1",
        "es-abstract": "^1.23.2"
      },
      "engines": {
        "node": ">= 0.4"
      }
    },
    "node_modules/object.values": {
      "version": "1.2.1",
      "resolved": "https://registry.npmjs.org/object.values/-/object.values-1.2.1.tgz",
      "integrity": "sha512-gXah6aZrcUxjWg2zR2MwouP2eHlCBzdV4pygudehaKXSGW4v2AsRQUK+lwwXhii6KFZcunEnmSUoYp5CXibxtA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "call-bind": "^1.0.8",
        "call-bound": "^1.0.3",
        "define-properties": "^1.2.1",
        "es-object-atoms": "^1.0.0"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/on-finished": {
      "version": "2.4.1",
      "resolved": "https://registry.npmjs.org/on-finished/-/on-finished-2.4.1.tgz",
      "integrity": "sha512-oVlzkg3ENAhCk2zdv7IJwd/QUD4z2RxRwpkcGY8psCVcCYZNq4wYnVWALHM+brtuJjePWiYF/ClmuDr8Ch5+kg==",
      "license": "MIT",
      "dependencies": {
        "ee-first": "1.1.1"
      },
      "engines": {
        "node": ">= 0.8"
      }
    },
    "node_modules/once": {
      "version": "1.4.0",
      "resolved": "https://registry.npmjs.org/once/-/once-1.4.0.tgz",
      "integrity": "sha512-lNaJgI+2Q5URQBkccEKHTQOPaXdUxnZZElQTZY0MFUAuaEqe1E+Nyvgdz/aIyNi6Z9MzO5dv1H8n58/GELp3+w==",
      "license": "ISC",
      "dependencies": {
        "wrappy": "1"
      }
    },
    "node_modules/onetime": {
      "version": "7.0.0",
      "resolved": "https://registry.npmjs.org/onetime/-/onetime-7.0.0.tgz",
      "integrity": "sha512-VXJjc87FScF88uafS3JllDgvAm+c/Slfz06lorj2uAY34rlUu0Nt+v8wreiImcrgAjjIHp1rXpTDlLOGw29WwQ==",
      "license": "MIT",
      "dependencies": {
        "mimic-function": "^5.0.0"
      },
      "engines": {
        "node": ">=18"
      },
      "funding": {
        "url": "https://github.com/sponsors/sindresorhus"
      }
    },
    "node_modules/open": {
      "version": "11.0.0",
      "resolved": "https://registry.npmjs.org/open/-/open-11.0.0.tgz",
      "integrity": "sha512-smsWv2LzFjP03xmvFoJ331ss6h+jixfA4UUV/Bsiyuu4YJPfN+FIQGOIiv4w9/+MoHkfkJ22UIaQWRVFRfH6Vw==",
      "license": "MIT",
      "dependencies": {
        "default-browser": "^5.4.0",
        "define-lazy-prop": "^3.0.0",
        "is-in-ssh": "^1.0.0",
        "is-inside-container": "^1.0.0",
        "powershell-utils": "^0.1.0",
        "wsl-utils": "^0.3.0"
      },
      "engines": {
        "node": ">=20"
      },
      "funding": {
        "url": "https://github.com/sponsors/sindresorhus"
      }
    },
    "node_modules/optionator": {
      "version": "0.9.4",
      "resolved": "https://registry.npmjs.org/optionator/-/optionator-0.9.4.tgz",
      "integrity": "sha512-6IpQ7mKUxRcZNLIObR0hz7lxsapSSIYNZJwXPGeF0mTVqGKFIXj1DQcMoT22S3ROcLyY/rz0PWaWZ9ayWmad9g==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "deep-is": "^0.1.3",
        "fast-levenshtein": "^2.0.6",
        "levn": "^0.4.1",
        "prelude-ls": "^1.2.1",
        "type-check": "^0.4.0",
        "word-wrap": "^1.2.5"
      },
      "engines": {
        "node": ">= 0.8.0"
      }
    },
    "node_modules/ora": {
      "version": "8.2.0",
      "resolved": "https://registry.npmjs.org/ora/-/ora-8.2.0.tgz",
      "integrity": "sha512-weP+BZ8MVNnlCm8c0Qdc1WSWq4Qn7I+9CJGm7Qali6g44e/PUzbjNqJX5NJ9ljlNMosfJvg1fKEGILklK9cwnw==",
      "license": "MIT",
      "dependencies": {
        "chalk": "^5.3.0",
        "cli-cursor": "^5.0.0",
        "cli-spinners": "^2.9.2",
        "is-interactive": "^2.0.0",
        "is-unicode-supported": "^2.0.0",
        "log-symbols": "^6.0.0",
        "stdin-discarder": "^0.2.2",
        "string-width": "^7.2.0",
        "strip-ansi": "^7.1.0"
      },
      "engines": {
        "node": ">=18"
      },
      "funding": {
        "url": "https://github.com/sponsors/sindresorhus"
      }
    },
    "node_modules/ora/node_modules/chalk": {
      "version": "5.6.2",
      "resolved": "https://registry.npmjs.org/chalk/-/chalk-5.6.2.tgz",
      "integrity": "sha512-7NzBL0rN6fMUW+f7A6Io4h40qQlG+xGmtMxfbnH/K7TAtt8JQWVQK+6g0UXKMeVJoyV5EkkNsErQ8pVD3bLHbA==",
      "license": "MIT",
      "engines": {
        "node": "^12.17.0 || ^14.13 || >=16.0.0"
      },
      "funding": {
        "url": "https://github.com/chalk/chalk?sponsor=1"
      }
    },
    "node_modules/outvariant": {
      "version": "1.4.3",
      "resolved": "https://registry.npmjs.org/outvariant/-/outvariant-1.4.3.tgz",
      "integrity": "sha512-+Sl2UErvtsoajRDKCE5/dBz4DIvHXQQnAxtQTF04OJxY0+DyZXSo5P5Bb7XYWOh81syohlYL24hbDwxedPUJCA==",
      "license": "MIT"
    },
    "node_modules/own-keys": {
      "version": "1.0.1",
      "resolved": "https://registry.npmjs.org/own-keys/-/own-keys-1.0.1.tgz",
      "integrity": "sha512-qFOyK5PjiWZd+QQIh+1jhdb9LpxTF0qs7Pm8o5QHYZ0M3vKqSqzsZaEB6oWlxZ+q2sJBMI/Ktgd2N5ZwQoRHfg==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "get-intrinsic": "^1.2.6",
        "object-keys": "^1.1.1",
        "safe-push-apply": "^1.0.0"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/p-limit": {
      "version": "3.1.0",
      "resolved": "https://registry.npmjs.org/p-limit/-/p-limit-3.1.0.tgz",
      "integrity": "sha512-TYOanM3wGwNGsZN2cVTYPArw454xnXj5qmWF1bEoAc4+cU/ol7GVh7odevjp1FNHduHc3KZMcFduxU5Xc6uJRQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "yocto-queue": "^0.1.0"
      },
      "engines": {
        "node": ">=10"
      },
      "funding": {
        "url": "https://github.com/sponsors/sindresorhus"
      }
    },
    "node_modules/p-locate": {
      "version": "5.0.0",
      "resolved": "https://registry.npmjs.org/p-locate/-/p-locate-5.0.0.tgz",
      "integrity": "sha512-LaNjtRWUBY++zB5nE/NwcaoMylSPk+S+ZHNB1TzdbMJMny6dynpAGt7X/tl/QYq3TIeE6nxHppbo2LGymrG5Pw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "p-limit": "^3.0.2"
      },
      "engines": {
        "node": ">=10"
      },
      "funding": {
        "url": "https://github.com/sponsors/sindresorhus"
      }
    },
    "node_modules/parent-module": {
      "version": "1.0.1",
      "resolved": "https://registry.npmjs.org/parent-module/-/parent-module-1.0.1.tgz",
      "integrity": "sha512-GQ2EWRpQV8/o+Aw8YqtfZZPfNRWZYkbidE9k5rpl/hC3vtHHBfGm2Ifi6qWV+coDGkrUKZAxE3Lot5kcsRlh+g==",
      "license": "MIT",
      "dependencies": {
        "callsites": "^3.0.0"
      },
      "engines": {
        "node": ">=6"
      }
    },
    "node_modules/parse-json": {
      "version": "5.2.0",
      "resolved": "https://registry.npmjs.org/parse-json/-/parse-json-5.2.0.tgz",
      "integrity": "sha512-ayCKvm/phCGxOkYRSCM82iDwct8/EonSEgCSxWxD7ve6jHggsFl4fZVQBPRNgQoKiuV/odhFrGzQXZwbifC8Rg==",
      "license": "MIT",
      "dependencies": {
        "@babel/code-frame": "^7.0.0",
        "error-ex": "^1.3.1",
        "json-parse-even-better-errors": "^2.3.0",
        "lines-and-columns": "^1.1.6"
      },
      "engines": {
        "node": ">=8"
      },
      "funding": {
        "url": "https://github.com/sponsors/sindresorhus"
      }
    },
    "node_modules/parse-ms": {
      "version": "4.0.0",
      "resolved": "https://registry.npmjs.org/parse-ms/-/parse-ms-4.0.0.tgz",
      "integrity": "sha512-TXfryirbmq34y8QBwgqCVLi+8oA3oWx2eAnSn62ITyEhEYaWRlVZ2DvMM9eZbMs/RfxPu/PK/aBLyGj4IrqMHw==",
      "license": "MIT",
      "engines": {
        "node": ">=18"
      },
      "funding": {
        "url": "https://github.com/sponsors/sindresorhus"
      }
    },
    "node_modules/parseurl": {
      "version": "1.3.3",
      "resolved": "https://registry.npmjs.org/parseurl/-/parseurl-1.3.3.tgz",
      "integrity": "sha512-CiyeOxFT/JZyN5m0z9PfXw4SCBJ6Sygz1Dpl0wqjlhDEGGBP1GnsUVEL0p63hoG1fcj3fHynXi9NYO4nWOL+qQ==",
      "license": "MIT",
      "engines": {
        "node": ">= 0.8"
      }
    },
    "node_modules/path-browserify": {
      "version": "1.0.1",
      "resolved": "https://registry.npmjs.org/path-browserify/-/path-browserify-1.0.1.tgz",
      "integrity": "sha512-b7uo2UCUOYZcnF/3ID0lulOJi/bafxa1xPe7ZPsammBSpjSWQkjNxlt635YGS2MiR9GjvuXCtz2emr3jbsz98g==",
      "license": "MIT"
    },
    "node_modules/path-exists": {
      "version": "4.0.0",
      "resolved": "https://registry.npmjs.org/path-exists/-/path-exists-4.0.0.tgz",
      "integrity": "sha512-ak9Qy5Q7jYb2Wwcey5Fpvg2KoAc/ZIhLSLOSBmRmygPsGwkVVt0fZa0qrtMz+m6tJTAHfZQ8FnmB4MG4LWy7/w==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=8"
      }
    },
    "node_modules/path-key": {
      "version": "3.1.1",
      "resolved": "https://registry.npmjs.org/path-key/-/path-key-3.1.1.tgz",
      "integrity": "sha512-ojmeN0qd+y0jszEtoY48r0Peq5dwMEkIlCOu6Q5f41lfkswXuKtYrhgoTpLnyIcHm24Uhqx+5Tqm2InSwLhE6Q==",
      "license": "MIT",
      "engines": {
        "node": ">=8"
      }
    },
    "node_modules/path-parse": {
      "version": "1.0.7",
      "resolved": "https://registry.npmjs.org/path-parse/-/path-parse-1.0.7.tgz",
      "integrity": "sha512-LDJzPVEEEPR+y48z93A0Ed0yXb8pAByGWo/k5YYdYgpY2/2EsOsksJrq7lOHxryrVOn1ejG6oAp8ahvOIQD8sw==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/path-to-regexp": {
      "version": "6.3.0",
      "resolved": "https://registry.npmjs.org/path-to-regexp/-/path-to-regexp-6.3.0.tgz",
      "integrity": "sha512-Yhpw4T9C6hPpgPeA28us07OJeqZ5EzQTkbfwuhsUg0c237RomFoETJgmp2sa3F/41gfLE6G5cqcYwznmeEeOlQ==",
      "license": "MIT"
    },
    "node_modules/picocolors": {
      "version": "1.1.1",
      "resolved": "https://registry.npmjs.org/picocolors/-/picocolors-1.1.1.tgz",
      "integrity": "sha512-xceH2snhtb5M9liqDsmEw56le376mTZkEX/jEb/RxNFyegNul7eNslCXP9FDj/Lcu0X8KEyMceP2ntpaHrDEVA==",
      "license": "ISC"
    },
    "node_modules/picomatch": {
      "version": "2.3.1",
      "resolved": "https://registry.npmjs.org/picomatch/-/picomatch-2.3.1.tgz",
      "integrity": "sha512-JU3teHTNjmE2VCGFzuY8EXzCDVwEqB2a8fsIvwaStHhAWJEeVd1o1QD80CU6+ZdEXXSLbSsuLwJjkCBWqRQUVA==",
      "license": "MIT",
      "engines": {
        "node": ">=8.6"
      },
      "funding": {
        "url": "https://github.com/sponsors/jonschlinkert"
      }
    },
    "node_modules/pkce-challenge": {
      "version": "5.0.1",
      "resolved": "https://registry.npmjs.org/pkce-challenge/-/pkce-challenge-5.0.1.tgz",
      "integrity": "sha512-wQ0b/W4Fr01qtpHlqSqspcj3EhBvimsdh0KlHhH8HRZnMsEa0ea2fTULOXOS9ccQr3om+GcGRk4e+isrZWV8qQ==",
      "license": "MIT",
      "engines": {
        "node": ">=16.20.0"
      }
    },
    "node_modules/possible-typed-array-names": {
      "version": "1.1.0",
      "resolved": "https://registry.npmjs.org/possible-typed-array-names/-/possible-typed-array-names-1.1.0.tgz",
      "integrity": "sha512-/+5VFTchJDoVj3bhoqi6UeymcD00DAwb1nJwamzPvHEszJ4FpF6SNNbUbOS8yI56qHzdV8eK0qEfOSiodkTdxg==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">= 0.4"
      }
    },
    "node_modules/postcss": {
      "version": "8.5.8",
      "resolved": "https://registry.npmjs.org/postcss/-/postcss-8.5.8.tgz",
      "integrity": "sha512-OW/rX8O/jXnm82Ey1k44pObPtdblfiuWnrd8X7GJ7emImCOstunGbXUpp7HdBrFQX6rJzn3sPT397Wp5aCwCHg==",
      "funding": [
        {
          "type": "opencollective",
          "url": "https://opencollective.com/postcss/"
        },
        {
          "type": "tidelift",
          "url": "https://tidelift.com/funding/github/npm/postcss"
        },
        {
          "type": "github",
          "url": "https://github.com/sponsors/ai"
        }
      ],
      "license": "MIT",
      "dependencies": {
        "nanoid": "^3.3.11",
        "picocolors": "^1.1.1",
        "source-map-js": "^1.2.1"
      },
      "engines": {
        "node": "^10 || ^12 || >=14"
      }
    },
    "node_modules/postcss-selector-parser": {
      "version": "7.1.1",
      "resolved": "https://registry.npmjs.org/postcss-selector-parser/-/postcss-selector-parser-7.1.1.tgz",
      "integrity": "sha512-orRsuYpJVw8LdAwqqLykBj9ecS5/cRHlI5+nvTo8LcCKmzDmqVORXtOIYEEQuL9D4BxtA1lm5isAqzQZCoQ6Eg==",
      "license": "MIT",
      "dependencies": {
        "cssesc": "^3.0.0",
        "util-deprecate": "^1.0.2"
      },
      "engines": {
        "node": ">=4"
      }
    },
    "node_modules/powershell-utils": {
      "version": "0.1.0",
      "resolved": "https://registry.npmjs.org/powershell-utils/-/powershell-utils-0.1.0.tgz",
      "integrity": "sha512-dM0jVuXJPsDN6DvRpea484tCUaMiXWjuCn++HGTqUWzGDjv5tZkEZldAJ/UMlqRYGFrD/etByo4/xOuC/snX2A==",
      "license": "MIT",
      "engines": {
        "node": ">=20"
      },
      "funding": {
        "url": "https://github.com/sponsors/sindresorhus"
      }
    },
    "node_modules/prelude-ls": {
      "version": "1.2.1",
      "resolved": "https://registry.npmjs.org/prelude-ls/-/prelude-ls-1.2.1.tgz",
      "integrity": "sha512-vkcDPrRZo1QZLbn5RLGPpg/WmIQ65qoWWhcGKf/b5eplkkarX0m9z8ppCat4mlOqUsWpyNuYgO3VRyrYHSzX5g==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">= 0.8.0"
      }
    },
    "node_modules/pretty-ms": {
      "version": "9.3.0",
      "resolved": "https://registry.npmjs.org/pretty-ms/-/pretty-ms-9.3.0.tgz",
      "integrity": "sha512-gjVS5hOP+M3wMm5nmNOucbIrqudzs9v/57bWRHQWLYklXqoXKrVfYW2W9+glfGsqtPgpiz5WwyEEB+ksXIx3gQ==",
      "license": "MIT",
      "dependencies": {
        "parse-ms": "^4.0.0"
      },
      "engines": {
        "node": ">=18"
      },
      "funding": {
        "url": "https://github.com/sponsors/sindresorhus"
      }
    },
    "node_modules/prompts": {
      "version": "2.4.2",
      "resolved": "https://registry.npmjs.org/prompts/-/prompts-2.4.2.tgz",
      "integrity": "sha512-NxNv/kLguCA7p3jE8oL2aEBsrJWgAakBpgmgK6lpPWV+WuOmY6r2/zbAVnP+T8bQlA0nzHXSJSJW0Hq7ylaD2Q==",
      "license": "MIT",
      "dependencies": {
        "kleur": "^3.0.3",
        "sisteransi": "^1.0.5"
      },
      "engines": {
        "node": ">= 6"
      }
    },
    "node_modules/prompts/node_modules/kleur": {
      "version": "3.0.3",
      "resolved": "https://registry.npmjs.org/kleur/-/kleur-3.0.3.tgz",
      "integrity": "sha512-eTIzlVOSUR+JxdDFepEYcBMtZ9Qqdef+rnzWdRZuMbOywu5tO2w2N7rqjoANZ5k9vywhL6Br1VRjUIgTQx4E8w==",
      "license": "MIT",
      "engines": {
        "node": ">=6"
      }
    },
    "node_modules/prop-types": {
      "version": "15.8.1",
      "resolved": "https://registry.npmjs.org/prop-types/-/prop-types-15.8.1.tgz",
      "integrity": "sha512-oj87CgZICdulUohogVAR7AjlC0327U4el4L6eAvOqCeudMDVU0NThNaV+b9Df4dXgSP1gXMTnPdhfe/2qDH5cg==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "loose-envify": "^1.4.0",
        "object-assign": "^4.1.1",
        "react-is": "^16.13.1"
      }
    },
    "node_modules/proxy-addr": {
      "version": "2.0.7",
      "resolved": "https://registry.npmjs.org/proxy-addr/-/proxy-addr-2.0.7.tgz",
      "integrity": "sha512-llQsMLSUDUPT44jdrU/O37qlnifitDP+ZwrmmZcoSKyLKvtZxpyV0n2/bD/N4tBAAZ/gJEdZU7KMraoK1+XYAg==",
      "license": "MIT",
      "dependencies": {
        "forwarded": "0.2.0",
        "ipaddr.js": "1.9.1"
      },
      "engines": {
        "node": ">= 0.10"
      }
    },
    "node_modules/punycode": {
      "version": "2.3.1",
      "resolved": "https://registry.npmjs.org/punycode/-/punycode-2.3.1.tgz",
      "integrity": "sha512-vYt7UD1U9Wg6138shLtLOvdAu+8DsC/ilFtEVHcH+wydcSpNE20AfSOduf6MkRFahL5FY7X1oU7nKVZFtfq8Fg==",
      "license": "MIT",
      "engines": {
        "node": ">=6"
      }
    },
    "node_modules/qs": {
      "version": "6.15.0",
      "resolved": "https://registry.npmjs.org/qs/-/qs-6.15.0.tgz",
      "integrity": "sha512-mAZTtNCeetKMH+pSjrb76NAM8V9a05I9aBZOHztWy/UqcJdQYNsf59vrRKWnojAT9Y+GbIvoTBC++CPHqpDBhQ==",
      "license": "BSD-3-Clause",
      "dependencies": {
        "side-channel": "^1.1.0"
      },
      "engines": {
        "node": ">=0.6"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/queue-microtask": {
      "version": "1.2.3",
      "resolved": "https://registry.npmjs.org/queue-microtask/-/queue-microtask-1.2.3.tgz",
      "integrity": "sha512-NuaNSa6flKT5JaSYQzJok04JzTL1CA6aGhv5rfLW3PgqA+M2ChpZQnAC8h8i4ZFkBS8X5RqkDBHA7r4hej3K9A==",
      "funding": [
        {
          "type": "github",
          "url": "https://github.com/sponsors/feross"
        },
        {
          "type": "patreon",
          "url": "https://www.patreon.com/feross"
        },
        {
          "type": "consulting",
          "url": "https://feross.org/support"
        }
      ],
      "license": "MIT"
    },
    "node_modules/range-parser": {
      "version": "1.2.1",
      "resolved": "https://registry.npmjs.org/range-parser/-/range-parser-1.2.1.tgz",
      "integrity": "sha512-Hrgsx+orqoygnmhFbKaHE6c296J+HTAQXoxEF6gNupROmmGJRoyzfG3ccAveqCBrwr/2yxQ5BVd/GTl5agOwSg==",
      "license": "MIT",
      "engines": {
        "node": ">= 0.6"
      }
    },
    "node_modules/raw-body": {
      "version": "3.0.2",
      "resolved": "https://registry.npmjs.org/raw-body/-/raw-body-3.0.2.tgz",
      "integrity": "sha512-K5zQjDllxWkf7Z5xJdV0/B0WTNqx6vxG70zJE4N0kBs4LovmEYWJzQGxC9bS9RAKu3bgM40lrd5zoLJ12MQ5BA==",
      "license": "MIT",
      "dependencies": {
        "bytes": "~3.1.2",
        "http-errors": "~2.0.1",
        "iconv-lite": "~0.7.0",
        "unpipe": "~1.0.0"
      },
      "engines": {
        "node": ">= 0.10"
      }
    },
    "node_modules/react": {
      "version": "19.2.4",
      "resolved": "https://registry.npmjs.org/react/-/react-19.2.4.tgz",
      "integrity": "sha512-9nfp2hYpCwOjAN+8TZFGhtWEwgvWHXqESH8qT89AT/lWklpLON22Lc8pEtnpsZz7VmawabSU0gCjnj8aC0euHQ==",
      "license": "MIT",
      "engines": {
        "node": ">=0.10.0"
      }
    },
    "node_modules/react-dom": {
      "version": "19.2.4",
      "resolved": "https://registry.npmjs.org/react-dom/-/react-dom-19.2.4.tgz",
      "integrity": "sha512-AXJdLo8kgMbimY95O2aKQqsz2iWi9jMgKJhRBAxECE4IFxfcazB2LmzloIoibJI3C12IlY20+KFaLv+71bUJeQ==",
      "license": "MIT",
      "dependencies": {
        "scheduler": "^0.27.0"
      },
      "peerDependencies": {
        "react": "^19.2.4"
      }
    },
    "node_modules/react-is": {
      "version": "16.13.1",
      "resolved": "https://registry.npmjs.org/react-is/-/react-is-16.13.1.tgz",
      "integrity": "sha512-24e6ynE2H+OKt4kqsOvNd8kBpV65zoxbA4BVsEOB3ARVWQki/DHzaUoC5KuON/BiccDaCCTZBuOcfZs70kR8bQ==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/react-remove-scroll": {
      "version": "2.7.2",
      "resolved": "https://registry.npmjs.org/react-remove-scroll/-/react-remove-scroll-2.7.2.tgz",
      "integrity": "sha512-Iqb9NjCCTt6Hf+vOdNIZGdTiH1QSqr27H/Ek9sv/a97gfueI/5h1s3yRi1nngzMUaOOToin5dI1dXKdXiF+u0Q==",
      "license": "MIT",
      "dependencies": {
        "react-remove-scroll-bar": "^2.3.7",
        "react-style-singleton": "^2.2.3",
        "tslib": "^2.1.0",
        "use-callback-ref": "^1.3.3",
        "use-sidecar": "^1.1.3"
      },
      "engines": {
        "node": ">=10"
      },
      "peerDependencies": {
        "@types/react": "*",
        "react": "^16.8.0 || ^17.0.0 || ^18.0.0 || ^19.0.0 || ^19.0.0-rc"
      },
      "peerDependenciesMeta": {
        "@types/react": {
          "optional": true
        }
      }
    },
    "node_modules/react-remove-scroll-bar": {
      "version": "2.3.8",
      "resolved": "https://registry.npmjs.org/react-remove-scroll-bar/-/react-remove-scroll-bar-2.3.8.tgz",
      "integrity": "sha512-9r+yi9+mgU33AKcj6IbT9oRCO78WriSj6t/cF8DWBZJ9aOGPOTEDvdUDz1FwKim7QXWwmHqtdHnRJfhAxEG46Q==",
      "license": "MIT",
      "dependencies": {
        "react-style-singleton": "^2.2.2",
        "tslib": "^2.0.0"
      },
      "engines": {
        "node": ">=10"
      },
      "peerDependencies": {
        "@types/react": "*",
        "react": "^16.8.0 || ^17.0.0 || ^18.0.0 || ^19.0.0"
      },
      "peerDependenciesMeta": {
        "@types/react": {
          "optional": true
        }
      }
    },
    "node_modules/react-style-singleton": {
      "version": "2.2.3",
      "resolved": "https://registry.npmjs.org/react-style-singleton/-/react-style-singleton-2.2.3.tgz",
      "integrity": "sha512-b6jSvxvVnyptAiLjbkWLE/lOnR4lfTtDAl+eUC7RZy+QQWc6wRzIV2CE6xBuMmDxc2qIihtDCZD5NPOFl7fRBQ==",
      "license": "MIT",
      "dependencies": {
        "get-nonce": "^1.0.0",
        "tslib": "^2.0.0"
      },
      "engines": {
        "node": ">=10"
      },
      "peerDependencies": {
        "@types/react": "*",
        "react": "^16.8.0 || ^17.0.0 || ^18.0.0 || ^19.0.0 || ^19.0.0-rc"
      },
      "peerDependenciesMeta": {
        "@types/react": {
          "optional": true
        }
      }
    },
    "node_modules/recast": {
      "version": "0.23.11",
      "resolved": "https://registry.npmjs.org/recast/-/recast-0.23.11.tgz",
      "integrity": "sha512-YTUo+Flmw4ZXiWfQKGcwwc11KnoRAYgzAE2E7mXKCjSviTKShtxBsN6YUUBB2gtaBzKzeKunxhUwNHQuRryhWA==",
      "license": "MIT",
      "dependencies": {
        "ast-types": "^0.16.1",
        "esprima": "~4.0.0",
        "source-map": "~0.6.1",
        "tiny-invariant": "^1.3.3",
        "tslib": "^2.0.1"
      },
      "engines": {
        "node": ">= 4"
      }
    },
    "node_modules/reflect.getprototypeof": {
      "version": "1.0.10",
      "resolved": "https://registry.npmjs.org/reflect.getprototypeof/-/reflect.getprototypeof-1.0.10.tgz",
      "integrity": "sha512-00o4I+DVrefhv+nX0ulyi3biSHCPDe+yLv5o/p6d/UVlirijB8E16FtfwSAi4g3tcqrQ4lRAqQSoFEZJehYEcw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "call-bind": "^1.0.8",
        "define-properties": "^1.2.1",
        "es-abstract": "^1.23.9",
        "es-errors": "^1.3.0",
        "es-object-atoms": "^1.0.0",
        "get-intrinsic": "^1.2.7",
        "get-proto": "^1.0.1",
        "which-builtin-type": "^1.2.1"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/regexp.prototype.flags": {
      "version": "1.5.4",
      "resolved": "https://registry.npmjs.org/regexp.prototype.flags/-/regexp.prototype.flags-1.5.4.tgz",
      "integrity": "sha512-dYqgNSZbDwkaJ2ceRd9ojCGjBq+mOm9LmtXnAnEGyHhN/5R7iDW2TRw3h+o/jCFxus3P2LfWIIiwowAjANm7IA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "call-bind": "^1.0.8",
        "define-properties": "^1.2.1",
        "es-errors": "^1.3.0",
        "get-proto": "^1.0.1",
        "gopd": "^1.2.0",
        "set-function-name": "^2.0.2"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/require-directory": {
      "version": "2.1.1",
      "resolved": "https://registry.npmjs.org/require-directory/-/require-directory-2.1.1.tgz",
      "integrity": "sha512-fGxEI7+wsG9xrvdjsrlmL22OMTTiHRwAMroiEeMgq8gzoLC/PQr7RsRDSTLUg/bZAZtF+TVIkHc6/4RIKrui+Q==",
      "license": "MIT",
      "engines": {
        "node": ">=0.10.0"
      }
    },
    "node_modules/require-from-string": {
      "version": "2.0.2",
      "resolved": "https://registry.npmjs.org/require-from-string/-/require-from-string-2.0.2.tgz",
      "integrity": "sha512-Xf0nWe6RseziFMu+Ap9biiUbmplq6S9/p+7w7YXP/JBHhrUDDUhwa+vANyubuqfZWTveU//DYVGsDG7RKL/vEw==",
      "license": "MIT",
      "engines": {
        "node": ">=0.10.0"
      }
    },
    "node_modules/reselect": {
      "version": "5.1.1",
      "resolved": "https://registry.npmjs.org/reselect/-/reselect-5.1.1.tgz",
      "integrity": "sha512-K/BG6eIky/SBpzfHZv/dd+9JBFiS4SWV7FIujVyJRux6e45+73RaUHXLmIR1f7WOMaQ0U1km6qwklRQxpJJY0w==",
      "license": "MIT"
    },
    "node_modules/resolve": {
      "version": "1.22.11",
      "resolved": "https://registry.npmjs.org/resolve/-/resolve-1.22.11.tgz",
      "integrity": "sha512-RfqAvLnMl313r7c9oclB1HhUEAezcpLjz95wFH4LVuhk9JF/r22qmVP9AMmOU4vMX7Q8pN8jwNg/CSpdFnMjTQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "is-core-module": "^2.16.1",
        "path-parse": "^1.0.7",
        "supports-preserve-symlinks-flag": "^1.0.0"
      },
      "bin": {
        "resolve": "bin/resolve"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/resolve-from": {
      "version": "4.0.0",
      "resolved": "https://registry.npmjs.org/resolve-from/-/resolve-from-4.0.0.tgz",
      "integrity": "sha512-pb/MYmXstAkysRFx8piNI1tGFNQIFA3vkE3Gq4EuA1dF6gHp/+vgZqsCGJapvy8N3Q+4o7FwvquPJcnZ7RYy4g==",
      "license": "MIT",
      "engines": {
        "node": ">=4"
      }
    },
    "node_modules/resolve-pkg-maps": {
      "version": "1.0.0",
      "resolved": "https://registry.npmjs.org/resolve-pkg-maps/-/resolve-pkg-maps-1.0.0.tgz",
      "integrity": "sha512-seS2Tj26TBVOC2NIc2rOe2y2ZO7efxITtLZcGSOnHHNOQ7CkiUBfw0Iw2ck6xkIhPwLhKNLS8BO+hEpngQlqzw==",
      "dev": true,
      "license": "MIT",
      "funding": {
        "url": "https://github.com/privatenumber/resolve-pkg-maps?sponsor=1"
      }
    },
    "node_modules/restore-cursor": {
      "version": "5.1.0",
      "resolved": "https://registry.npmjs.org/restore-cursor/-/restore-cursor-5.1.0.tgz",
      "integrity": "sha512-oMA2dcrw6u0YfxJQXm342bFKX/E4sG9rbTzO9ptUcR/e8A33cHuvStiYOwH7fszkZlZ1z/ta9AAoPk2F4qIOHA==",
      "license": "MIT",
      "dependencies": {
        "onetime": "^7.0.0",
        "signal-exit": "^4.1.0"
      },
      "engines": {
        "node": ">=18"
      },
      "funding": {
        "url": "https://github.com/sponsors/sindresorhus"
      }
    },
    "node_modules/rettime": {
      "version": "0.10.1",
      "resolved": "https://registry.npmjs.org/rettime/-/rettime-0.10.1.tgz",
      "integrity": "sha512-uyDrIlUEH37cinabq0AX4QbgV4HbFZ/gqoiunWQ1UqBtRvTTytwhNYjE++pO/MjPTZL5KQCf2bEoJ/BJNVQ5Kw==",
      "license": "MIT"
    },
    "node_modules/reusify": {
      "version": "1.1.0",
      "resolved": "https://registry.npmjs.org/reusify/-/reusify-1.1.0.tgz",
      "integrity": "sha512-g6QUff04oZpHs0eG5p83rFLhHeV00ug/Yf9nZM6fLeUrPguBTkTQOdpAWWspMh55TZfVQDPaN3NQJfbVRAxdIw==",
      "license": "MIT",
      "engines": {
        "iojs": ">=1.0.0",
        "node": ">=0.10.0"
      }
    },
    "node_modules/rou3": {
      "version": "0.7.12",
      "resolved": "https://registry.npmjs.org/rou3/-/rou3-0.7.12.tgz",
      "integrity": "sha512-iFE4hLDuloSWcD7mjdCDhx2bKcIsYbtOTpfH5MHHLSKMOUyjqQXTeZVa289uuwEGEKFoE/BAPbhaU4B774nceg==",
      "license": "MIT"
    },
    "node_modules/router": {
      "version": "2.2.0",
      "resolved": "https://registry.npmjs.org/router/-/router-2.2.0.tgz",
      "integrity": "sha512-nLTrUKm2UyiL7rlhapu/Zl45FwNgkZGaCpZbIHajDYgwlJCOzLSk+cIPAnsEqV955GjILJnKbdQC1nVPz+gAYQ==",
      "license": "MIT",
      "dependencies": {
        "debug": "^4.4.0",
        "depd": "^2.0.0",
        "is-promise": "^4.0.0",
        "parseurl": "^1.3.3",
        "path-to-regexp": "^8.0.0"
      },
      "engines": {
        "node": ">= 18"
      }
    },
    "node_modules/router/node_modules/path-to-regexp": {
      "version": "8.3.0",
      "resolved": "https://registry.npmjs.org/path-to-regexp/-/path-to-regexp-8.3.0.tgz",
      "integrity": "sha512-7jdwVIRtsP8MYpdXSwOS0YdD0Du+qOoF/AEPIt88PcCFrZCzx41oxku1jD88hZBwbNUIEfpqvuhjFaMAqMTWnA==",
      "license": "MIT",
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/express"
      }
    },
    "node_modules/run-applescript": {
      "version": "7.1.0",
      "resolved": "https://registry.npmjs.org/run-applescript/-/run-applescript-7.1.0.tgz",
      "integrity": "sha512-DPe5pVFaAsinSaV6QjQ6gdiedWDcRCbUuiQfQa2wmWV7+xC9bGulGI8+TdRmoFkAPaBXk8CrAbnlY2ISniJ47Q==",
      "license": "MIT",
      "engines": {
        "node": ">=18"
      },
      "funding": {
        "url": "https://github.com/sponsors/sindresorhus"
      }
    },
    "node_modules/run-parallel": {
      "version": "1.2.0",
      "resolved": "https://registry.npmjs.org/run-parallel/-/run-parallel-1.2.0.tgz",
      "integrity": "sha512-5l4VyZR86LZ/lDxZTR6jqL8AFE2S0IFLMP26AbjsLVADxHdhB/c0GUsH+y39UfCi3dzz8OlQuPmnaJOMoDHQBA==",
      "funding": [
        {
          "type": "github",
          "url": "https://github.com/sponsors/feross"
        },
        {
          "type": "patreon",
          "url": "https://www.patreon.com/feross"
        },
        {
          "type": "consulting",
          "url": "https://feross.org/support"
        }
      ],
      "license": "MIT",
      "dependencies": {
        "queue-microtask": "^1.2.2"
      }
    },
    "node_modules/rxjs": {
      "version": "7.8.2",
      "resolved": "https://registry.npmjs.org/rxjs/-/rxjs-7.8.2.tgz",
      "integrity": "sha512-dhKf903U/PQZY6boNNtAGdWbG85WAbjT/1xYoZIC7FAY0yWapOBQVsVrDl58W86//e1VpMNBtRV4MaXfdMySFA==",
      "license": "Apache-2.0",
      "dependencies": {
        "tslib": "^2.1.0"
      }
    },
    "node_modules/safe-array-concat": {
      "version": "1.1.3",
      "resolved": "https://registry.npmjs.org/safe-array-concat/-/safe-array-concat-1.1.3.tgz",
      "integrity": "sha512-AURm5f0jYEOydBj7VQlVvDrjeFgthDdEF5H1dP+6mNpoXOMo1quQqJ4wvJDyRZ9+pO3kGWoOdmV08cSv2aJV6Q==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "call-bind": "^1.0.8",
        "call-bound": "^1.0.2",
        "get-intrinsic": "^1.2.6",
        "has-symbols": "^1.1.0",
        "isarray": "^2.0.5"
      },
      "engines": {
        "node": ">=0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/safe-push-apply": {
      "version": "1.0.0",
      "resolved": "https://registry.npmjs.org/safe-push-apply/-/safe-push-apply-1.0.0.tgz",
      "integrity": "sha512-iKE9w/Z7xCzUMIZqdBsp6pEQvwuEebH4vdpjcDWnyzaI6yl6O9FHvVpmGelvEHNsoY6wGblkxR6Zty/h00WiSA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "es-errors": "^1.3.0",
        "isarray": "^2.0.5"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/safe-regex-test": {
      "version": "1.1.0",
      "resolved": "https://registry.npmjs.org/safe-regex-test/-/safe-regex-test-1.1.0.tgz",
      "integrity": "sha512-x/+Cz4YrimQxQccJf5mKEbIa1NzeCRNI5Ecl/ekmlYaampdNLPalVyIcCZNNH3MvmqBugV5TMYZXv0ljslUlaw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "call-bound": "^1.0.2",
        "es-errors": "^1.3.0",
        "is-regex": "^1.2.1"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/safer-buffer": {
      "version": "2.1.2",
      "resolved": "https://registry.npmjs.org/safer-buffer/-/safer-buffer-2.1.2.tgz",
      "integrity": "sha512-YZo3K82SD7Riyi0E1EQPojLz7kpepnSQI9IyPbHHg1XXXevb5dJI7tpyN2ADxGcQbHG7vcyRHk0cbwqcQriUtg==",
      "license": "MIT"
    },
    "node_modules/scheduler": {
      "version": "0.27.0",
      "resolved": "https://registry.npmjs.org/scheduler/-/scheduler-0.27.0.tgz",
      "integrity": "sha512-eNv+WrVbKu1f3vbYJT/xtiF5syA5HPIMtf9IgY/nKg0sWqzAUEvqY/xm7OcZc/qafLx/iO9FgOmeSAp4v5ti/Q==",
      "license": "MIT"
    },
    "node_modules/sdp": {
      "version": "3.2.2",
      "resolved": "https://registry.npmjs.org/sdp/-/sdp-3.2.2.tgz",
      "integrity": "sha512-xZocWwfyp4hkbN4hLWxMjmv2Q8aNa9MhmOZ7L9aCZPT+dZsgRr6wZRrSYE3HTdyk/2pZKPSgqI7ns7Een1xMSA==",
      "license": "MIT"
    },
    "node_modules/sdp-transform": {
      "version": "2.15.0",
      "resolved": "https://registry.npmjs.org/sdp-transform/-/sdp-transform-2.15.0.tgz",
      "integrity": "sha512-KrOH82c/W+GYQ0LHqtr3caRpM3ITglq3ljGUIb8LTki7ByacJZ9z+piSGiwZDsRyhQbYBOBJgr2k6X4BZXi3Kw==",
      "license": "MIT",
      "bin": {
        "sdp-verify": "checker.js"
      }
    },
    "node_modules/semver": {
      "version": "6.3.1",
      "resolved": "https://registry.npmjs.org/semver/-/semver-6.3.1.tgz",
      "integrity": "sha512-BR7VvDCVHO+q2xBEWskxS6DJE1qRnb7DxzUrogb71CWoSficBxYsiAGd+Kl0mmq/MprG9yArRkyrQxTO6XjMzA==",
      "license": "ISC",
      "bin": {
        "semver": "bin/semver.js"
      }
    },
    "node_modules/send": {
      "version": "1.2.1",
      "resolved": "https://registry.npmjs.org/send/-/send-1.2.1.tgz",
      "integrity": "sha512-1gnZf7DFcoIcajTjTwjwuDjzuz4PPcY2StKPlsGAQ1+YH20IRVrBaXSWmdjowTJ6u8Rc01PoYOGHXfP1mYcZNQ==",
      "license": "MIT",
      "dependencies": {
        "debug": "^4.4.3",
        "encodeurl": "^2.0.0",
        "escape-html": "^1.0.3",
        "etag": "^1.8.1",
        "fresh": "^2.0.0",
        "http-errors": "^2.0.1",
        "mime-types": "^3.0.2",
        "ms": "^2.1.3",
        "on-finished": "^2.4.1",
        "range-parser": "^1.2.1",
        "statuses": "^2.0.2"
      },
      "engines": {
        "node": ">= 18"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/express"
      }
    },
    "node_modules/serve-static": {
      "version": "2.2.1",
      "resolved": "https://registry.npmjs.org/serve-static/-/serve-static-2.2.1.tgz",
      "integrity": "sha512-xRXBn0pPqQTVQiC8wyQrKs2MOlX24zQ0POGaj0kultvoOCstBQM5yvOhAVSUwOMjQtTvsPWoNCHfPGwaaQJhTw==",
      "license": "MIT",
      "dependencies": {
        "encodeurl": "^2.0.0",
        "escape-html": "^1.0.3",
        "parseurl": "^1.3.3",
        "send": "^1.2.0"
      },
      "engines": {
        "node": ">= 18"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/express"
      }
    },
    "node_modules/set-cookie-parser": {
      "version": "3.0.1",
      "resolved": "https://registry.npmjs.org/set-cookie-parser/-/set-cookie-parser-3.0.1.tgz",
      "integrity": "sha512-n7Z7dXZhJbwuAHhNzkTti6Aw9QDDjZtm3JTpTGATIdNzdQz5GuFs22w90BcvF4INfnrL5xrX3oGsuqO5Dx3A1Q==",
      "license": "MIT"
    },
    "node_modules/set-function-length": {
      "version": "1.2.2",
      "resolved": "https://registry.npmjs.org/set-function-length/-/set-function-length-1.2.2.tgz",
      "integrity": "sha512-pgRc4hJ4/sNjWCSS9AmnS40x3bNMDTknHgL5UaMBTMyJnU90EgWh1Rz+MC9eFu4BuN/UwZjKQuY/1v3rM7HMfg==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "define-data-property": "^1.1.4",
        "es-errors": "^1.3.0",
        "function-bind": "^1.1.2",
        "get-intrinsic": "^1.2.4",
        "gopd": "^1.0.1",
        "has-property-descriptors": "^1.0.2"
      },
      "engines": {
        "node": ">= 0.4"
      }
    },
    "node_modules/set-function-name": {
      "version": "2.0.2",
      "resolved": "https://registry.npmjs.org/set-function-name/-/set-function-name-2.0.2.tgz",
      "integrity": "sha512-7PGFlmtwsEADb0WYyvCMa1t+yke6daIG4Wirafur5kcf+MhUnPms1UeR0CKQdTZD81yESwMHbtn+TR+dMviakQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "define-data-property": "^1.1.4",
        "es-errors": "^1.3.0",
        "functions-have-names": "^1.2.3",
        "has-property-descriptors": "^1.0.2"
      },
      "engines": {
        "node": ">= 0.4"
      }
    },
    "node_modules/set-proto": {
      "version": "1.0.0",
      "resolved": "https://registry.npmjs.org/set-proto/-/set-proto-1.0.0.tgz",
      "integrity": "sha512-RJRdvCo6IAnPdsvP/7m6bsQqNnn1FCBX5ZNtFL98MmFF/4xAIJTIg1YbHW5DC2W5SKZanrC6i4HsJqlajw/dZw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "dunder-proto": "^1.0.1",
        "es-errors": "^1.3.0",
        "es-object-atoms": "^1.0.0"
      },
      "engines": {
        "node": ">= 0.4"
      }
    },
    "node_modules/setprototypeof": {
      "version": "1.2.0",
      "resolved": "https://registry.npmjs.org/setprototypeof/-/setprototypeof-1.2.0.tgz",
      "integrity": "sha512-E5LDX7Wrp85Kil5bhZv46j8jOeboKq5JMmYM3gVGdGH8xFpPWXUMsNrlODCrkoxMEeNi/XZIwuRvY4XNwYMJpw==",
      "license": "ISC"
    },
    "node_modules/shadcn": {
      "version": "4.1.0",
      "resolved": "https://registry.npmjs.org/shadcn/-/shadcn-4.1.0.tgz",
      "integrity": "sha512-3zETJ+0Ezj69FS6RL0HOkLKKAR5yXisXx1iISJdfLQfrUqj/VIQlanQi1Ukk+9OE+XHZVj4FQNTBSfbr2CyCYg==",
      "license": "MIT",
      "dependencies": {
        "@babel/core": "^7.28.0",
        "@babel/parser": "^7.28.0",
        "@babel/plugin-transform-typescript": "^7.28.0",
        "@babel/preset-typescript": "^7.27.1",
        "@dotenvx/dotenvx": "^1.48.4",
        "@modelcontextprotocol/sdk": "^1.26.0",
        "@types/validate-npm-package-name": "^4.0.2",
        "browserslist": "^4.26.2",
        "commander": "^14.0.0",
        "cosmiconfig": "^9.0.0",
        "dedent": "^1.6.0",
        "deepmerge": "^4.3.1",
        "diff": "^8.0.2",
        "execa": "^9.6.0",
        "fast-glob": "^3.3.3",
        "fs-extra": "^11.3.1",
        "fuzzysort": "^3.1.0",
        "https-proxy-agent": "^7.0.6",
        "kleur": "^4.1.5",
        "msw": "^2.10.4",
        "node-fetch": "^3.3.2",
        "open": "^11.0.0",
        "ora": "^8.2.0",
        "postcss": "^8.5.6",
        "postcss-selector-parser": "^7.1.0",
        "prompts": "^2.4.2",
        "recast": "^0.23.11",
        "stringify-object": "^5.0.0",
        "tailwind-merge": "^3.0.1",
        "ts-morph": "^26.0.0",
        "tsconfig-paths": "^4.2.0",
        "validate-npm-package-name": "^7.0.1",
        "zod": "^3.24.1",
        "zod-to-json-schema": "^3.24.6"
      },
      "bin": {
        "shadcn": "dist/index.js"
      }
    },
    "node_modules/shadcn/node_modules/fast-glob": {
      "version": "3.3.3",
      "resolved": "https://registry.npmjs.org/fast-glob/-/fast-glob-3.3.3.tgz",
      "integrity": "sha512-7MptL8U0cqcFdzIzwOTHoilX9x5BrNqye7Z/LuC7kCMRio1EMSyqRK3BEAUD7sXRq4iT4AzTVuZdhgQ2TCvYLg==",
      "license": "MIT",
      "dependencies": {
        "@nodelib/fs.stat": "^2.0.2",
        "@nodelib/fs.walk": "^1.2.3",
        "glob-parent": "^5.1.2",
        "merge2": "^1.3.0",
        "micromatch": "^4.0.8"
      },
      "engines": {
        "node": ">=8.6.0"
      }
    },
    "node_modules/shadcn/node_modules/glob-parent": {
      "version": "5.1.2",
      "resolved": "https://registry.npmjs.org/glob-parent/-/glob-parent-5.1.2.tgz",
      "integrity": "sha512-AOIgSQCepiJYwP3ARnGx+5VnTu2HBYdzbGP45eLw1vr3zB3vZLeyed1sC9hnbcOc9/SrMyM5RPQrkGz4aS9Zow==",
      "license": "ISC",
      "dependencies": {
        "is-glob": "^4.0.1"
      },
      "engines": {
        "node": ">= 6"
      }
    },
    "node_modules/shadcn/node_modules/tsconfig-paths": {
      "version": "4.2.0",
      "resolved": "https://registry.npmjs.org/tsconfig-paths/-/tsconfig-paths-4.2.0.tgz",
      "integrity": "sha512-NoZ4roiN7LnbKn9QqE1amc9DJfzvZXxF4xDavcOWt1BPkdx+m+0gJuPM+S0vCe7zTJMYUP0R8pO2XMr+Y8oLIg==",
      "license": "MIT",
      "dependencies": {
        "json5": "^2.2.2",
        "minimist": "^1.2.6",
        "strip-bom": "^3.0.0"
      },
      "engines": {
        "node": ">=6"
      }
    },
    "node_modules/shadcn/node_modules/zod": {
      "version": "3.25.76",
      "resolved": "https://registry.npmjs.org/zod/-/zod-3.25.76.tgz",
      "integrity": "sha512-gzUt/qt81nXsFGKIFcC3YnfEAx5NkunCfnDlvuBSSFS02bcXu4Lmea0AFIUwbLWxWPx3d9p8S5QoaujKcNQxcQ==",
      "license": "MIT",
      "funding": {
        "url": "https://github.com/sponsors/colinhacks"
      }
    },
    "node_modules/sharp": {
      "version": "0.34.5",
      "resolved": "https://registry.npmjs.org/sharp/-/sharp-0.34.5.tgz",
      "integrity": "sha512-Ou9I5Ft9WNcCbXrU9cMgPBcCK8LiwLqcbywW3t4oDV37n1pzpuNLsYiAV8eODnjbtQlSDwZ2cUEeQz4E54Hltg==",
      "hasInstallScript": true,
      "license": "Apache-2.0",
      "optional": true,
      "dependencies": {
        "@img/colour": "^1.0.0",
        "detect-libc": "^2.1.2",
        "semver": "^7.7.3"
      },
      "engines": {
        "node": "^18.17.0 || ^20.3.0 || >=21.0.0"
      },
      "funding": {
        "url": "https://opencollective.com/libvips"
      },
      "optionalDependencies": {
        "@img/sharp-darwin-arm64": "0.34.5",
        "@img/sharp-darwin-x64": "0.34.5",
        "@img/sharp-libvips-darwin-arm64": "1.2.4",
        "@img/sharp-libvips-darwin-x64": "1.2.4",
        "@img/sharp-libvips-linux-arm": "1.2.4",
        "@img/sharp-libvips-linux-arm64": "1.2.4",
        "@img/sharp-libvips-linux-ppc64": "1.2.4",
        "@img/sharp-libvips-linux-riscv64": "1.2.4",
        "@img/sharp-libvips-linux-s390x": "1.2.4",
        "@img/sharp-libvips-linux-x64": "1.2.4",
        "@img/sharp-libvips-linuxmusl-arm64": "1.2.4",
        "@img/sharp-libvips-linuxmusl-x64": "1.2.4",
        "@img/sharp-linux-arm": "0.34.5",
        "@img/sharp-linux-arm64": "0.34.5",
        "@img/sharp-linux-ppc64": "0.34.5",
        "@img/sharp-linux-riscv64": "0.34.5",
        "@img/sharp-linux-s390x": "0.34.5",
        "@img/sharp-linux-x64": "0.34.5",
        "@img/sharp-linuxmusl-arm64": "0.34.5",
        "@img/sharp-linuxmusl-x64": "0.34.5",
        "@img/sharp-wasm32": "0.34.5",
        "@img/sharp-win32-arm64": "0.34.5",
        "@img/sharp-win32-ia32": "0.34.5",
        "@img/sharp-win32-x64": "0.34.5"
      }
    },
    "node_modules/sharp/node_modules/semver": {
      "version": "7.7.4",
      "resolved": "https://registry.npmjs.org/semver/-/semver-7.7.4.tgz",
      "integrity": "sha512-vFKC2IEtQnVhpT78h1Yp8wzwrf8CM+MzKMHGJZfBtzhZNycRFnXsHk6E5TxIkkMsgNS7mdX3AGB7x2QM2di4lA==",
      "license": "ISC",
      "optional": true,
      "bin": {
        "semver": "bin/semver.js"
      },
      "engines": {
        "node": ">=10"
      }
    },
    "node_modules/shebang-command": {
      "version": "2.0.0",
      "resolved": "https://registry.npmjs.org/shebang-command/-/shebang-command-2.0.0.tgz",
      "integrity": "sha512-kHxr2zZpYtdmrN1qDjrrX/Z1rR1kG8Dx+gkpK1G4eXmvXswmcE1hTWBWYUzlraYw1/yZp6YuDY77YtvbN0dmDA==",
      "license": "MIT",
      "dependencies": {
        "shebang-regex": "^3.0.0"
      },
      "engines": {
        "node": ">=8"
      }
    },
    "node_modules/shebang-regex": {
      "version": "3.0.0",
      "resolved": "https://registry.npmjs.org/shebang-regex/-/shebang-regex-3.0.0.tgz",
      "integrity": "sha512-7++dFhtcx3353uBaq8DDR4NuxBetBzC7ZQOhmTQInHEd6bSrXdiEyzCvG07Z44UYdLShWUyXt5M/yhz8ekcb1A==",
      "license": "MIT",
      "engines": {
        "node": ">=8"
      }
    },
    "node_modules/side-channel": {
      "version": "1.1.0",
      "resolved": "https://registry.npmjs.org/side-channel/-/side-channel-1.1.0.tgz",
      "integrity": "sha512-ZX99e6tRweoUXqR+VBrslhda51Nh5MTQwou5tnUDgbtyM0dBgmhEDtWGP/xbKn6hqfPRHujUNwz5fy/wbbhnpw==",
      "license": "MIT",
      "dependencies": {
        "es-errors": "^1.3.0",
        "object-inspect": "^1.13.3",
        "side-channel-list": "^1.0.0",
        "side-channel-map": "^1.0.1",
        "side-channel-weakmap": "^1.0.2"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/side-channel-list": {
      "version": "1.0.0",
      "resolved": "https://registry.npmjs.org/side-channel-list/-/side-channel-list-1.0.0.tgz",
      "integrity": "sha512-FCLHtRD/gnpCiCHEiJLOwdmFP+wzCmDEkc9y7NsYxeF4u7Btsn1ZuwgwJGxImImHicJArLP4R0yX4c2KCrMrTA==",
      "license": "MIT",
      "dependencies": {
        "es-errors": "^1.3.0",
        "object-inspect": "^1.13.3"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/side-channel-map": {
      "version": "1.0.1",
      "resolved": "https://registry.npmjs.org/side-channel-map/-/side-channel-map-1.0.1.tgz",
      "integrity": "sha512-VCjCNfgMsby3tTdo02nbjtM/ewra6jPHmpThenkTYh8pG9ucZ/1P8So4u4FGBek/BjpOVsDCMoLA/iuBKIFXRA==",
      "license": "MIT",
      "dependencies": {
        "call-bound": "^1.0.2",
        "es-errors": "^1.3.0",
        "get-intrinsic": "^1.2.5",
        "object-inspect": "^1.13.3"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/side-channel-weakmap": {
      "version": "1.0.2",
      "resolved": "https://registry.npmjs.org/side-channel-weakmap/-/side-channel-weakmap-1.0.2.tgz",
      "integrity": "sha512-WPS/HvHQTYnHisLo9McqBHOJk2FkHO/tlpvldyrnem4aeQp4hai3gythswg6p01oSoTl58rcpiFAjF2br2Ak2A==",
      "license": "MIT",
      "dependencies": {
        "call-bound": "^1.0.2",
        "es-errors": "^1.3.0",
        "get-intrinsic": "^1.2.5",
        "object-inspect": "^1.13.3",
        "side-channel-map": "^1.0.1"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/signal-exit": {
      "version": "4.1.0",
      "resolved": "https://registry.npmjs.org/signal-exit/-/signal-exit-4.1.0.tgz",
      "integrity": "sha512-bzyZ1e88w9O1iNJbKnOlvYTrWPDl46O1bG0D3XInv+9tkPrxrN8jUUTiFlDkkmKWgn1M6CfIA13SuGqOa9Korw==",
      "license": "ISC",
      "engines": {
        "node": ">=14"
      },
      "funding": {
        "url": "https://github.com/sponsors/isaacs"
      }
    },
    "node_modules/sisteransi": {
      "version": "1.0.5",
      "resolved": "https://registry.npmjs.org/sisteransi/-/sisteransi-1.0.5.tgz",
      "integrity": "sha512-bLGGlR1QxBcynn2d5YmDX4MGjlZvy2MRBDRNHLJ8VI6l6+9FUiyTFNJ0IveOSP0bcXgVDPRcfGqA0pjaqUpfVg==",
      "license": "MIT"
    },
    "node_modules/source-map": {
      "version": "0.6.1",
      "resolved": "https://registry.npmjs.org/source-map/-/source-map-0.6.1.tgz",
      "integrity": "sha512-UjgapumWlbMhkBgzT7Ykc5YXUT46F0iKu8SGXq0bcwP5dz/h0Plj6enJqjz1Zbq2l5WaqYnrVbwWOWMyF3F47g==",
      "license": "BSD-3-Clause",
      "engines": {
        "node": ">=0.10.0"
      }
    },
    "node_modules/source-map-js": {
      "version": "1.2.1",
      "resolved": "https://registry.npmjs.org/source-map-js/-/source-map-js-1.2.1.tgz",
      "integrity": "sha512-UXWMKhLOwVKb728IUtQPXxfYU+usdybtUrK/8uGE8CQMvrhOpwvzDBwj0QhSL7MQc7vIsISBG8VQ8+IDQxpfQA==",
      "license": "BSD-3-Clause",
      "engines": {
        "node": ">=0.10.0"
      }
    },
    "node_modules/sparse-bitfield": {
      "version": "3.0.3",
      "resolved": "https://registry.npmjs.org/sparse-bitfield/-/sparse-bitfield-3.0.3.tgz",
      "integrity": "sha512-kvzhi7vqKTfkh0PZU+2D2PIllw2ymqJKujUcyPMd9Y75Nv4nPbGJZXNhxsgdQab2BmlDct1YnfQCguEvHr7VsQ==",
      "license": "MIT",
      "peer": true,
      "dependencies": {
        "memory-pager": "^1.0.2"
      }
    },
    "node_modules/stable-hash": {
      "version": "0.0.5",
      "resolved": "https://registry.npmjs.org/stable-hash/-/stable-hash-0.0.5.tgz",
      "integrity": "sha512-+L3ccpzibovGXFK+Ap/f8LOS0ahMrHTf3xu7mMLSpEGU0EO9ucaysSylKo9eRDFNhWve/y275iPmIZ4z39a9iA==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/statuses": {
      "version": "2.0.2",
      "resolved": "https://registry.npmjs.org/statuses/-/statuses-2.0.2.tgz",
      "integrity": "sha512-DvEy55V3DB7uknRo+4iOGT5fP1slR8wQohVdknigZPMpMstaKJQWhwiYBACJE3Ul2pTnATihhBYnRhZQHGBiRw==",
      "license": "MIT",
      "engines": {
        "node": ">= 0.8"
      }
    },
    "node_modules/stdin-discarder": {
      "version": "0.2.2",
      "resolved": "https://registry.npmjs.org/stdin-discarder/-/stdin-discarder-0.2.2.tgz",
      "integrity": "sha512-UhDfHmA92YAlNnCfhmq0VeNL5bDbiZGg7sZ2IvPsXubGkiNa9EC+tUTsjBRsYUAz87btI6/1wf4XoVvQ3uRnmQ==",
      "license": "MIT",
      "engines": {
        "node": ">=18"
      },
      "funding": {
        "url": "https://github.com/sponsors/sindresorhus"
      }
    },
    "node_modules/stop-iteration-iterator": {
      "version": "1.1.0",
      "resolved": "https://registry.npmjs.org/stop-iteration-iterator/-/stop-iteration-iterator-1.1.0.tgz",
      "integrity": "sha512-eLoXW/DHyl62zxY4SCaIgnRhuMr6ri4juEYARS8E6sCEqzKpOiE521Ucofdx+KnDZl5xmvGYaaKCk5FEOxJCoQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "es-errors": "^1.3.0",
        "internal-slot": "^1.1.0"
      },
      "engines": {
        "node": ">= 0.4"
      }
    },
    "node_modules/strict-event-emitter": {
      "version": "0.5.1",
      "resolved": "https://registry.npmjs.org/strict-event-emitter/-/strict-event-emitter-0.5.1.tgz",
      "integrity": "sha512-vMgjE/GGEPEFnhFub6pa4FmJBRBVOLpIII2hvCZ8Kzb7K0hlHo7mQv6xYrBvCL2LtAIBwFUK8wvuJgTVSQ5MFQ==",
      "license": "MIT"
    },
    "node_modules/string-width": {
      "version": "7.2.0",
      "resolved": "https://registry.npmjs.org/string-width/-/string-width-7.2.0.tgz",
      "integrity": "sha512-tsaTIkKW9b4N+AEj+SVA+WhJzV7/zMhcSu78mLKWSk7cXMOSHsBKFWUs0fWwq8QyK3MgJBQRX6Gbi4kYbdvGkQ==",
      "license": "MIT",
      "dependencies": {
        "emoji-regex": "^10.3.0",
        "get-east-asian-width": "^1.0.0",
        "strip-ansi": "^7.1.0"
      },
      "engines": {
        "node": ">=18"
      },
      "funding": {
        "url": "https://github.com/sponsors/sindresorhus"
      }
    },
    "node_modules/string-width/node_modules/emoji-regex": {
      "version": "10.6.0",
      "resolved": "https://registry.npmjs.org/emoji-regex/-/emoji-regex-10.6.0.tgz",
      "integrity": "sha512-toUI84YS5YmxW219erniWD0CIVOo46xGKColeNQRgOzDorgBi1v4D71/OFzgD9GO2UGKIv1C3Sp8DAn0+j5w7A==",
      "license": "MIT"
    },
    "node_modules/string.prototype.includes": {
      "version": "2.0.1",
      "resolved": "https://registry.npmjs.org/string.prototype.includes/-/string.prototype.includes-2.0.1.tgz",
      "integrity": "sha512-o7+c9bW6zpAdJHTtujeePODAhkuicdAryFsfVKwA+wGw89wJ4GTY484WTucM9hLtDEOpOvI+aHnzqnC5lHp4Rg==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "call-bind": "^1.0.7",
        "define-properties": "^1.2.1",
        "es-abstract": "^1.23.3"
      },
      "engines": {
        "node": ">= 0.4"
      }
    },
    "node_modules/string.prototype.matchall": {
      "version": "4.0.12",
      "resolved": "https://registry.npmjs.org/string.prototype.matchall/-/string.prototype.matchall-4.0.12.tgz",
      "integrity": "sha512-6CC9uyBL+/48dYizRf7H7VAYCMCNTBeM78x/VTUe9bFEaxBepPJDa1Ow99LqI/1yF7kuy7Q3cQsYMrcjGUcskA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "call-bind": "^1.0.8",
        "call-bound": "^1.0.3",
        "define-properties": "^1.2.1",
        "es-abstract": "^1.23.6",
        "es-errors": "^1.3.0",
        "es-object-atoms": "^1.0.0",
        "get-intrinsic": "^1.2.6",
        "gopd": "^1.2.0",
        "has-symbols": "^1.1.0",
        "internal-slot": "^1.1.0",
        "regexp.prototype.flags": "^1.5.3",
        "set-function-name": "^2.0.2",
        "side-channel": "^1.1.0"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/string.prototype.repeat": {
      "version": "1.0.0",
      "resolved": "https://registry.npmjs.org/string.prototype.repeat/-/string.prototype.repeat-1.0.0.tgz",
      "integrity": "sha512-0u/TldDbKD8bFCQ/4f5+mNRrXwZ8hg2w7ZR8wa16e8z9XpePWl3eGEcUD0OXpEH/VJH/2G3gjUtR3ZOiBe2S/w==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "define-properties": "^1.1.3",
        "es-abstract": "^1.17.5"
      }
    },
    "node_modules/string.prototype.trim": {
      "version": "1.2.10",
      "resolved": "https://registry.npmjs.org/string.prototype.trim/-/string.prototype.trim-1.2.10.tgz",
      "integrity": "sha512-Rs66F0P/1kedk5lyYyH9uBzuiI/kNRmwJAR9quK6VOtIpZ2G+hMZd+HQbbv25MgCA6gEffoMZYxlTod4WcdrKA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "call-bind": "^1.0.8",
        "call-bound": "^1.0.2",
        "define-data-property": "^1.1.4",
        "define-properties": "^1.2.1",
        "es-abstract": "^1.23.5",
        "es-object-atoms": "^1.0.0",
        "has-property-descriptors": "^1.0.2"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/string.prototype.trimend": {
      "version": "1.0.9",
      "resolved": "https://registry.npmjs.org/string.prototype.trimend/-/string.prototype.trimend-1.0.9.tgz",
      "integrity": "sha512-G7Ok5C6E/j4SGfyLCloXTrngQIQU3PWtXGst3yM7Bea9FRURf1S42ZHlZZtsNque2FN2PoUhfZXYLNWwEr4dLQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "call-bind": "^1.0.8",
        "call-bound": "^1.0.2",
        "define-properties": "^1.2.1",
        "es-object-atoms": "^1.0.0"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/string.prototype.trimstart": {
      "version": "1.0.8",
      "resolved": "https://registry.npmjs.org/string.prototype.trimstart/-/string.prototype.trimstart-1.0.8.tgz",
      "integrity": "sha512-UXSH262CSZY1tfu3G3Secr6uGLCFVPMhIqHjlgCUtCCcgihYc/xKs9djMTMUOb2j1mVSeU8EU6NWc/iQKU6Gfg==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "call-bind": "^1.0.7",
        "define-properties": "^1.2.1",
        "es-object-atoms": "^1.0.0"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/stringify-object": {
      "version": "5.0.0",
      "resolved": "https://registry.npmjs.org/stringify-object/-/stringify-object-5.0.0.tgz",
      "integrity": "sha512-zaJYxz2FtcMb4f+g60KsRNFOpVMUyuJgA51Zi5Z1DOTC3S59+OQiVOzE9GZt0x72uBGWKsQIuBKeF9iusmKFsg==",
      "license": "BSD-2-Clause",
      "dependencies": {
        "get-own-enumerable-keys": "^1.0.0",
        "is-obj": "^3.0.0",
        "is-regexp": "^3.1.0"
      },
      "engines": {
        "node": ">=14.16"
      },
      "funding": {
        "url": "https://github.com/yeoman/stringify-object?sponsor=1"
      }
    },
    "node_modules/strip-ansi": {
      "version": "7.2.0",
      "resolved": "https://registry.npmjs.org/strip-ansi/-/strip-ansi-7.2.0.tgz",
      "integrity": "sha512-yDPMNjp4WyfYBkHnjIRLfca1i6KMyGCtsVgoKe/z1+6vukgaENdgGBZt+ZmKPc4gavvEZ5OgHfHdrazhgNyG7w==",
      "license": "MIT",
      "dependencies": {
        "ansi-regex": "^6.2.2"
      },
      "engines": {
        "node": ">=12"
      },
      "funding": {
        "url": "https://github.com/chalk/strip-ansi?sponsor=1"
      }
    },
    "node_modules/strip-bom": {
      "version": "3.0.0",
      "resolved": "https://registry.npmjs.org/strip-bom/-/strip-bom-3.0.0.tgz",
      "integrity": "sha512-vavAMRXOgBVNF6nyEEmL3DBK19iRpDcoIwW+swQ+CbGiu7lju6t+JklA1MHweoWtadgt4ISVUsXLyDq34ddcwA==",
      "license": "MIT",
      "engines": {
        "node": ">=4"
      }
    },
    "node_modules/strip-final-newline": {
      "version": "4.0.0",
      "resolved": "https://registry.npmjs.org/strip-final-newline/-/strip-final-newline-4.0.0.tgz",
      "integrity": "sha512-aulFJcD6YK8V1G7iRB5tigAP4TsHBZZrOV8pjV++zdUwmeV8uzbY7yn6h9MswN62adStNZFuCIx4haBnRuMDaw==",
      "license": "MIT",
      "engines": {
        "node": ">=18"
      },
      "funding": {
        "url": "https://github.com/sponsors/sindresorhus"
      }
    },
    "node_modules/strip-json-comments": {
      "version": "3.1.1",
      "resolved": "https://registry.npmjs.org/strip-json-comments/-/strip-json-comments-3.1.1.tgz",
      "integrity": "sha512-6fPc+R4ihwqP6N/aIv2f1gMH8lOVtWQHoqC4yK6oSDVVocumAsfCqjkXnqiYMhmMwS/mEHLp7Vehlt3ql6lEig==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=8"
      },
      "funding": {
        "url": "https://github.com/sponsors/sindresorhus"
      }
    },
    "node_modules/styled-jsx": {
      "version": "5.1.6",
      "resolved": "https://registry.npmjs.org/styled-jsx/-/styled-jsx-5.1.6.tgz",
      "integrity": "sha512-qSVyDTeMotdvQYoHWLNGwRFJHC+i+ZvdBRYosOFgC+Wg1vx4frN2/RG/NA7SYqqvKNLf39P2LSRA2pu6n0XYZA==",
      "license": "MIT",
      "dependencies": {
        "client-only": "0.0.1"
      },
      "engines": {
        "node": ">= 12.0.0"
      },
      "peerDependencies": {
        "react": ">= 16.8.0 || 17.x.x || ^18.0.0-0 || ^19.0.0-0"
      },
      "peerDependenciesMeta": {
        "@babel/core": {
          "optional": true
        },
        "babel-plugin-macros": {
          "optional": true
        }
      }
    },
    "node_modules/supports-color": {
      "version": "7.2.0",
      "resolved": "https://registry.npmjs.org/supports-color/-/supports-color-7.2.0.tgz",
      "integrity": "sha512-qpCAvRl9stuOHveKsn7HncJRvv501qIacKzQlO/+Lwxc9+0q2wLyv4Dfvt80/DPn2pqOBsJdDiogXGR9+OvwRw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "has-flag": "^4.0.0"
      },
      "engines": {
        "node": ">=8"
      }
    },
    "node_modules/supports-preserve-symlinks-flag": {
      "version": "1.0.0",
      "resolved": "https://registry.npmjs.org/supports-preserve-symlinks-flag/-/supports-preserve-symlinks-flag-1.0.0.tgz",
      "integrity": "sha512-ot0WnXS9fgdkgIcePe6RHNk1WA8+muPa6cSjeR3V8K27q9BB1rTE3R1p7Hv0z1ZyAc8s6Vvv8DIyWf681MAt0w==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/sweetalert2": {
      "version": "11.26.24",
      "resolved": "https://registry.npmjs.org/sweetalert2/-/sweetalert2-11.26.24.tgz",
      "integrity": "sha512-SLgukW4wicewpW5VOukSXY5Z6DL/z7HCOK2ODSjmQPiSphCN8gJAmh9npoceXOtBRNoDN0xIz+zHYthtfiHmjg==",
      "license": "MIT",
      "funding": {
        "type": "individual",
        "url": "https://github.com/sponsors/limonte"
      }
    },
    "node_modules/tabbable": {
      "version": "6.4.0",
      "resolved": "https://registry.npmjs.org/tabbable/-/tabbable-6.4.0.tgz",
      "integrity": "sha512-05PUHKSNE8ou2dwIxTngl4EzcnsCDZGJ/iCLtDflR/SHB/ny14rXc+qU5P4mG9JkusiV7EivzY9Mhm55AzAvCg==",
      "license": "MIT"
    },
    "node_modules/tagged-tag": {
      "version": "1.0.0",
      "resolved": "https://registry.npmjs.org/tagged-tag/-/tagged-tag-1.0.0.tgz",
      "integrity": "sha512-yEFYrVhod+hdNyx7g5Bnkkb0G6si8HJurOoOEgC8B/O0uXLHlaey/65KRv6cuWBNhBgHKAROVpc7QyYqE5gFng==",
      "license": "MIT",
      "engines": {
        "node": ">=20"
      },
      "funding": {
        "url": "https://github.com/sponsors/sindresorhus"
      }
    },
    "node_modules/tailwind-merge": {
      "version": "3.5.0",
      "resolved": "https://registry.npmjs.org/tailwind-merge/-/tailwind-merge-3.5.0.tgz",
      "integrity": "sha512-I8K9wewnVDkL1NTGoqWmVEIlUcB9gFriAEkXkfCjX5ib8ezGxtR3xD7iZIxrfArjEsH7F1CHD4RFUtxefdqV/A==",
      "license": "MIT",
      "funding": {
        "type": "github",
        "url": "https://github.com/sponsors/dcastil"
      }
    },
    "node_modules/tailwindcss": {
      "version": "4.2.2",
      "resolved": "https://registry.npmjs.org/tailwindcss/-/tailwindcss-4.2.2.tgz",
      "integrity": "sha512-KWBIxs1Xb6NoLdMVqhbhgwZf2PGBpPEiwOqgI4pFIYbNTfBXiKYyWoTsXgBQ9WFg/OlhnvHaY+AEpW7wSmFo2Q==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/tapable": {
      "version": "2.3.0",
      "resolved": "https://registry.npmjs.org/tapable/-/tapable-2.3.0.tgz",
      "integrity": "sha512-g9ljZiwki/LfxmQADO3dEY1CbpmXT5Hm2fJ+QaGKwSXUylMybePR7/67YW7jOrrvjEgL1Fmz5kzyAjWVWLlucg==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=6"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/webpack"
      }
    },
    "node_modules/tiny-invariant": {
      "version": "1.3.3",
      "resolved": "https://registry.npmjs.org/tiny-invariant/-/tiny-invariant-1.3.3.tgz",
      "integrity": "sha512-+FbBPE1o9QAYvviau/qC5SE3caw21q3xkvWKBtja5vgqOWIHHJ3ioaq1VPfn/Szqctz2bU/oYeKd9/z5BL+PVg==",
      "license": "MIT"
    },
    "node_modules/tinyglobby": {
      "version": "0.2.15",
      "resolved": "https://registry.npmjs.org/tinyglobby/-/tinyglobby-0.2.15.tgz",
      "integrity": "sha512-j2Zq4NyQYG5XMST4cbs02Ak8iJUdxRM0XI5QyxXuZOzKOINmWurp3smXu3y5wDcJrptwpSjgXHzIQxR0omXljQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "fdir": "^6.5.0",
        "picomatch": "^4.0.3"
      },
      "engines": {
        "node": ">=12.0.0"
      },
      "funding": {
        "url": "https://github.com/sponsors/SuperchupuDev"
      }
    },
    "node_modules/tinyglobby/node_modules/fdir": {
      "version": "6.5.0",
      "resolved": "https://registry.npmjs.org/fdir/-/fdir-6.5.0.tgz",
      "integrity": "sha512-tIbYtZbucOs0BRGqPJkshJUYdL+SDH7dVM8gjy+ERp3WAUjLEFJE+02kanyHtwjWOnwrKYBiwAmM0p4kLJAnXg==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=12.0.0"
      },
      "peerDependencies": {
        "picomatch": "^3 || ^4"
      },
      "peerDependenciesMeta": {
        "picomatch": {
          "optional": true
        }
      }
    },
    "node_modules/tinyglobby/node_modules/picomatch": {
      "version": "4.0.3",
      "resolved": "https://registry.npmjs.org/picomatch/-/picomatch-4.0.3.tgz",
      "integrity": "sha512-5gTmgEY/sqK6gFXLIsQNH19lWb4ebPDLA4SdLP7dsWkIXHWlG66oPuVvXSGFPppYZz8ZDZq0dYYrbHfBCVUb1Q==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=12"
      },
      "funding": {
        "url": "https://github.com/sponsors/jonschlinkert"
      }
    },
    "node_modules/tldts": {
      "version": "7.0.27",
      "resolved": "https://registry.npmjs.org/tldts/-/tldts-7.0.27.tgz",
      "integrity": "sha512-I4FZcVFcqCRuT0ph6dCDpPuO4Xgzvh+spkcTr1gK7peIvxWauoloVO0vuy1FQnijT63ss6AsHB6+OIM4aXHbPg==",
      "license": "MIT",
      "dependencies": {
        "tldts-core": "^7.0.27"
      },
      "bin": {
        "tldts": "bin/cli.js"
      }
    },
    "node_modules/tldts-core": {
      "version": "7.0.27",
      "resolved": "https://registry.npmjs.org/tldts-core/-/tldts-core-7.0.27.tgz",
      "integrity": "sha512-YQ7uPjgWUibIK6DW5lrKujGwUKhLevU4hcGbP5O6TcIUb+oTjJYJVWPS4nZsIHrEEEG6myk/oqAJUEQmpZrHsg==",
      "license": "MIT"
    },
    "node_modules/to-regex-range": {
      "version": "5.0.1",
      "resolved": "https://registry.npmjs.org/to-regex-range/-/to-regex-range-5.0.1.tgz",
      "integrity": "sha512-65P7iz6X5yEr1cwcgvQxbbIw7Uk3gOy5dIdtZ4rDveLqhrdJP+Li/Hx6tyK0NEb+2GCyneCMJiGqrADCSNk8sQ==",
      "license": "MIT",
      "dependencies": {
        "is-number": "^7.0.0"
      },
      "engines": {
        "node": ">=8.0"
      }
    },
    "node_modules/toidentifier": {
      "version": "1.0.1",
      "resolved": "https://registry.npmjs.org/toidentifier/-/toidentifier-1.0.1.tgz",
      "integrity": "sha512-o5sSPKEkg/DIQNmH43V0/uerLrpzVedkUh8tGNvaeXpfpuwjKenlSox/2O/BTlZUtEe+JG7s5YhEz608PlAHRA==",
      "license": "MIT",
      "engines": {
        "node": ">=0.6"
      }
    },
    "node_modules/tough-cookie": {
      "version": "6.0.1",
      "resolved": "https://registry.npmjs.org/tough-cookie/-/tough-cookie-6.0.1.tgz",
      "integrity": "sha512-LktZQb3IeoUWB9lqR5EWTHgW/VTITCXg4D21M+lvybRVdylLrRMnqaIONLVb5mav8vM19m44HIcGq4qASeu2Qw==",
      "license": "BSD-3-Clause",
      "dependencies": {
        "tldts": "^7.0.5"
      },
      "engines": {
        "node": ">=16"
      }
    },
    "node_modules/tr46": {
      "version": "5.1.1",
      "resolved": "https://registry.npmjs.org/tr46/-/tr46-5.1.1.tgz",
      "integrity": "sha512-hdF5ZgjTqgAntKkklYw0R03MG2x/bSzTtkxmIRw/sTNV8YXsCJ1tfLAX23lhxhHJlEf3CRCOCGGWw3vI3GaSPw==",
      "license": "MIT",
      "peer": true,
      "dependencies": {
        "punycode": "^2.3.1"
      },
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/ts-api-utils": {
      "version": "2.5.0",
      "resolved": "https://registry.npmjs.org/ts-api-utils/-/ts-api-utils-2.5.0.tgz",
      "integrity": "sha512-OJ/ibxhPlqrMM0UiNHJ/0CKQkoKF243/AEmplt3qpRgkW8VG7IfOS41h7V8TjITqdByHzrjcS/2si+y4lIh8NA==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=18.12"
      },
      "peerDependencies": {
        "typescript": ">=4.8.4"
      }
    },
    "node_modules/ts-morph": {
      "version": "26.0.0",
      "resolved": "https://registry.npmjs.org/ts-morph/-/ts-morph-26.0.0.tgz",
      "integrity": "sha512-ztMO++owQnz8c/gIENcM9XfCEzgoGphTv+nKpYNM1bgsdOVC/jRZuEBf6N+mLLDNg68Kl+GgUZfOySaRiG1/Ug==",
      "license": "MIT",
      "dependencies": {
        "@ts-morph/common": "~0.27.0",
        "code-block-writer": "^13.0.3"
      }
    },
    "node_modules/tsconfig-paths": {
      "version": "3.15.0",
      "resolved": "https://registry.npmjs.org/tsconfig-paths/-/tsconfig-paths-3.15.0.tgz",
      "integrity": "sha512-2Ac2RgzDe/cn48GvOe3M+o82pEFewD3UPbyoUHHdKasHwJKjds4fLXWf/Ux5kATBKN20oaFGu+jbElp1pos0mg==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@types/json5": "^0.0.29",
        "json5": "^1.0.2",
        "minimist": "^1.2.6",
        "strip-bom": "^3.0.0"
      }
    },
    "node_modules/tsconfig-paths/node_modules/json5": {
      "version": "1.0.2",
      "resolved": "https://registry.npmjs.org/json5/-/json5-1.0.2.tgz",
      "integrity": "sha512-g1MWMLBiz8FKi1e4w0UyVL3w+iJceWAFBAaBnnGKOpNa5f8TLktkbre1+s6oICydWAm+HRUGTmI+//xv2hvXYA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "minimist": "^1.2.0"
      },
      "bin": {
        "json5": "lib/cli.js"
      }
    },
    "node_modules/tslib": {
      "version": "2.8.1",
      "resolved": "https://registry.npmjs.org/tslib/-/tslib-2.8.1.tgz",
      "integrity": "sha512-oJFu94HQb+KVduSUQL7wnpmqnfmLsOA/nAh6b6EH0wCEoK0/mPeXU6c3wKDV83MkOuHPRHtSXKKU99IBazS/2w==",
      "license": "0BSD"
    },
    "node_modules/tw-animate-css": {
      "version": "1.4.0",
      "resolved": "https://registry.npmjs.org/tw-animate-css/-/tw-animate-css-1.4.0.tgz",
      "integrity": "sha512-7bziOlRqH0hJx80h/3mbicLW7o8qLsH5+RaLR2t+OHM3D0JlWGODQKQ4cxbK7WlvmUxpcj6Kgu6EKqjrGFe3QQ==",
      "license": "MIT",
      "funding": {
        "url": "https://github.com/sponsors/Wombosvideo"
      }
    },
    "node_modules/type-check": {
      "version": "0.4.0",
      "resolved": "https://registry.npmjs.org/type-check/-/type-check-0.4.0.tgz",
      "integrity": "sha512-XleUoc9uwGXqjWwXaUTZAmzMcFZ5858QA2vvx1Ur5xIcixXIP+8LnFDgRplU30us6teqdlskFfu+ae4K79Ooew==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "prelude-ls": "^1.2.1"
      },
      "engines": {
        "node": ">= 0.8.0"
      }
    },
    "node_modules/type-fest": {
      "version": "5.5.0",
      "resolved": "https://registry.npmjs.org/type-fest/-/type-fest-5.5.0.tgz",
      "integrity": "sha512-PlBfpQwiUvGViBNX84Yxwjsdhd1TUlXr6zjX7eoirtCPIr08NAmxwa+fcYBTeRQxHo9YC9wwF3m9i700sHma8g==",
      "license": "(MIT OR CC0-1.0)",
      "dependencies": {
        "tagged-tag": "^1.0.0"
      },
      "engines": {
        "node": ">=20"
      },
      "funding": {
        "url": "https://github.com/sponsors/sindresorhus"
      }
    },
    "node_modules/type-is": {
      "version": "2.0.1",
      "resolved": "https://registry.npmjs.org/type-is/-/type-is-2.0.1.tgz",
      "integrity": "sha512-OZs6gsjF4vMp32qrCbiVSkrFmXtG/AZhY3t0iAMrMBiAZyV9oALtXO8hsrHbMXF9x6L3grlFuwW2oAz7cav+Gw==",
      "license": "MIT",
      "dependencies": {
        "content-type": "^1.0.5",
        "media-typer": "^1.1.0",
        "mime-types": "^3.0.0"
      },
      "engines": {
        "node": ">= 0.6"
      }
    },
    "node_modules/typed-array-buffer": {
      "version": "1.0.3",
      "resolved": "https://registry.npmjs.org/typed-array-buffer/-/typed-array-buffer-1.0.3.tgz",
      "integrity": "sha512-nAYYwfY3qnzX30IkA6AQZjVbtK6duGontcQm1WSG1MD94YLqK0515GNApXkoxKOWMusVssAHWLh9SeaoefYFGw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "call-bound": "^1.0.3",
        "es-errors": "^1.3.0",
        "is-typed-array": "^1.1.14"
      },
      "engines": {
        "node": ">= 0.4"
      }
    },
    "node_modules/typed-array-byte-length": {
      "version": "1.0.3",
      "resolved": "https://registry.npmjs.org/typed-array-byte-length/-/typed-array-byte-length-1.0.3.tgz",
      "integrity": "sha512-BaXgOuIxz8n8pIq3e7Atg/7s+DpiYrxn4vdot3w9KbnBhcRQq6o3xemQdIfynqSeXeDrF32x+WvfzmOjPiY9lg==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "call-bind": "^1.0.8",
        "for-each": "^0.3.3",
        "gopd": "^1.2.0",
        "has-proto": "^1.2.0",
        "is-typed-array": "^1.1.14"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/typed-array-byte-offset": {
      "version": "1.0.4",
      "resolved": "https://registry.npmjs.org/typed-array-byte-offset/-/typed-array-byte-offset-1.0.4.tgz",
      "integrity": "sha512-bTlAFB/FBYMcuX81gbL4OcpH5PmlFHqlCCpAl8AlEzMz5k53oNDvN8p1PNOWLEmI2x4orp3raOFB51tv9X+MFQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "available-typed-arrays": "^1.0.7",
        "call-bind": "^1.0.8",
        "for-each": "^0.3.3",
        "gopd": "^1.2.0",
        "has-proto": "^1.2.0",
        "is-typed-array": "^1.1.15",
        "reflect.getprototypeof": "^1.0.9"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/typed-array-length": {
      "version": "1.0.7",
      "resolved": "https://registry.npmjs.org/typed-array-length/-/typed-array-length-1.0.7.tgz",
      "integrity": "sha512-3KS2b+kL7fsuk/eJZ7EQdnEmQoaho/r6KUef7hxvltNA5DR8NAUM+8wJMbJyZ4G9/7i3v5zPBIMN5aybAh2/Jg==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "call-bind": "^1.0.7",
        "for-each": "^0.3.3",
        "gopd": "^1.0.1",
        "is-typed-array": "^1.1.13",
        "possible-typed-array-names": "^1.0.0",
        "reflect.getprototypeof": "^1.0.6"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/typed-emitter": {
      "version": "2.1.0",
      "resolved": "https://registry.npmjs.org/typed-emitter/-/typed-emitter-2.1.0.tgz",
      "integrity": "sha512-g/KzbYKbH5C2vPkaXGu8DJlHrGKHLsM25Zg9WuC9pMGfuvT+X25tZQWo5fK1BjBm8+UrVE9LDCvaY0CQk+fXDA==",
      "license": "MIT",
      "optionalDependencies": {
        "rxjs": "*"
      }
    },
    "node_modules/typescript": {
      "version": "5.9.3",
      "resolved": "https://registry.npmjs.org/typescript/-/typescript-5.9.3.tgz",
      "integrity": "sha512-jl1vZzPDinLr9eUt3J/t7V6FgNEw9QjvBPdysz9KfQDD41fQrC2Y4vKQdiaUpFT4bXlb1RHhLpp8wtm6M5TgSw==",
      "devOptional": true,
      "license": "Apache-2.0",
      "bin": {
        "tsc": "bin/tsc",
        "tsserver": "bin/tsserver"
      },
      "engines": {
        "node": ">=14.17"
      }
    },
    "node_modules/typescript-eslint": {
      "version": "8.57.1",
      "resolved": "https://registry.npmjs.org/typescript-eslint/-/typescript-eslint-8.57.1.tgz",
      "integrity": "sha512-fLvZWf+cAGw3tqMCYzGIU6yR8K+Y9NT2z23RwOjlNFF2HwSB3KhdEFI5lSBv8tNmFkkBShSjsCjzx1vahZfISA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@typescript-eslint/eslint-plugin": "8.57.1",
        "@typescript-eslint/parser": "8.57.1",
        "@typescript-eslint/typescript-estree": "8.57.1",
        "@typescript-eslint/utils": "8.57.1"
      },
      "engines": {
        "node": "^18.18.0 || ^20.9.0 || >=21.1.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/typescript-eslint"
      },
      "peerDependencies": {
        "eslint": "^8.57.0 || ^9.0.0 || ^10.0.0",
        "typescript": ">=4.8.4 <6.0.0"
      }
    },
    "node_modules/unbox-primitive": {
      "version": "1.1.0",
      "resolved": "https://registry.npmjs.org/unbox-primitive/-/unbox-primitive-1.1.0.tgz",
      "integrity": "sha512-nWJ91DjeOkej/TA8pXQ3myruKpKEYgqvpw9lz4OPHj/NWFNluYrjbz9j01CJ8yKQd2g4jFoOkINCTW2I5LEEyw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "call-bound": "^1.0.3",
        "has-bigints": "^1.0.2",
        "has-symbols": "^1.1.0",
        "which-boxed-primitive": "^1.1.1"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/undici-types": {
      "version": "6.21.0",
      "resolved": "https://registry.npmjs.org/undici-types/-/undici-types-6.21.0.tgz",
      "integrity": "sha512-iwDZqg0QAGrg9Rav5H4n0M64c3mkR59cJ6wQp+7C4nI0gsmExaedaYLNO44eT4AtBBwjbTiGPMlt2Md0T9H9JQ==",
      "devOptional": true,
      "license": "MIT"
    },
    "node_modules/unicorn-magic": {
      "version": "0.3.0",
      "resolved": "https://registry.npmjs.org/unicorn-magic/-/unicorn-magic-0.3.0.tgz",
      "integrity": "sha512-+QBBXBCvifc56fsbuxZQ6Sic3wqqc3WWaqxs58gvJrcOuN83HGTCwz3oS5phzU9LthRNE9VrJCFCLUgHeeFnfA==",
      "license": "MIT",
      "engines": {
        "node": ">=18"
      },
      "funding": {
        "url": "https://github.com/sponsors/sindresorhus"
      }
    },
    "node_modules/universalify": {
      "version": "2.0.1",
      "resolved": "https://registry.npmjs.org/universalify/-/universalify-2.0.1.tgz",
      "integrity": "sha512-gptHNQghINnc/vTGIk0SOFGFNXw7JVrlRUtConJRlvaw6DuX0wO5Jeko9sWrMBhh+PsYAZ7oXAiOnf/UKogyiw==",
      "license": "MIT",
      "engines": {
        "node": ">= 10.0.0"
      }
    },
    "node_modules/unpipe": {
      "version": "1.0.0",
      "resolved": "https://registry.npmjs.org/unpipe/-/unpipe-1.0.0.tgz",
      "integrity": "sha512-pjy2bYhSsufwWlKwPc+l3cN7+wuJlK6uz0YdJEOlQDbl6jo/YlPi4mb8agUkVC8BF7V8NuzeyPNqRksA3hztKQ==",
      "license": "MIT",
      "engines": {
        "node": ">= 0.8"
      }
    },
    "node_modules/unrs-resolver": {
      "version": "1.11.1",
      "resolved": "https://registry.npmjs.org/unrs-resolver/-/unrs-resolver-1.11.1.tgz",
      "integrity": "sha512-bSjt9pjaEBnNiGgc9rUiHGKv5l4/TGzDmYw3RhnkJGtLhbnnA/5qJj7x3dNDCRx/PJxu774LlH8lCOlB4hEfKg==",
      "dev": true,
      "hasInstallScript": true,
      "license": "MIT",
      "dependencies": {
        "napi-postinstall": "^0.3.0"
      },
      "funding": {
        "url": "https://opencollective.com/unrs-resolver"
      },
      "optionalDependencies": {
        "@unrs/resolver-binding-android-arm-eabi": "1.11.1",
        "@unrs/resolver-binding-android-arm64": "1.11.1",
        "@unrs/resolver-binding-darwin-arm64": "1.11.1",
        "@unrs/resolver-binding-darwin-x64": "1.11.1",
        "@unrs/resolver-binding-freebsd-x64": "1.11.1",
        "@unrs/resolver-binding-linux-arm-gnueabihf": "1.11.1",
        "@unrs/resolver-binding-linux-arm-musleabihf": "1.11.1",
        "@unrs/resolver-binding-linux-arm64-gnu": "1.11.1",
        "@unrs/resolver-binding-linux-arm64-musl": "1.11.1",
        "@unrs/resolver-binding-linux-ppc64-gnu": "1.11.1",
        "@unrs/resolver-binding-linux-riscv64-gnu": "1.11.1",
        "@unrs/resolver-binding-linux-riscv64-musl": "1.11.1",
        "@unrs/resolver-binding-linux-s390x-gnu": "1.11.1",
        "@unrs/resolver-binding-linux-x64-gnu": "1.11.1",
        "@unrs/resolver-binding-linux-x64-musl": "1.11.1",
        "@unrs/resolver-binding-wasm32-wasi": "1.11.1",
        "@unrs/resolver-binding-win32-arm64-msvc": "1.11.1",
        "@unrs/resolver-binding-win32-ia32-msvc": "1.11.1",
        "@unrs/resolver-binding-win32-x64-msvc": "1.11.1"
      }
    },
    "node_modules/until-async": {
      "version": "3.0.2",
      "resolved": "https://registry.npmjs.org/until-async/-/until-async-3.0.2.tgz",
      "integrity": "sha512-IiSk4HlzAMqTUseHHe3VhIGyuFmN90zMTpD3Z3y8jeQbzLIq500MVM7Jq2vUAnTKAFPJrqwkzr6PoTcPhGcOiw==",
      "license": "MIT",
      "funding": {
        "url": "https://github.com/sponsors/kettanaito"
      }
    },
    "node_modules/update-browserslist-db": {
      "version": "1.2.3",
      "resolved": "https://registry.npmjs.org/update-browserslist-db/-/update-browserslist-db-1.2.3.tgz",
      "integrity": "sha512-Js0m9cx+qOgDxo0eMiFGEueWztz+d4+M3rGlmKPT+T4IS/jP4ylw3Nwpu6cpTTP8R1MAC1kF4VbdLt3ARf209w==",
      "funding": [
        {
          "type": "opencollective",
          "url": "https://opencollective.com/browserslist"
        },
        {
          "type": "tidelift",
          "url": "https://tidelift.com/funding/github/npm/browserslist"
        },
        {
          "type": "github",
          "url": "https://github.com/sponsors/ai"
        }
      ],
      "license": "MIT",
      "dependencies": {
        "escalade": "^3.2.0",
        "picocolors": "^1.1.1"
      },
      "bin": {
        "update-browserslist-db": "cli.js"
      },
      "peerDependencies": {
        "browserslist": ">= 4.21.0"
      }
    },
    "node_modules/uri-js": {
      "version": "4.4.1",
      "resolved": "https://registry.npmjs.org/uri-js/-/uri-js-4.4.1.tgz",
      "integrity": "sha512-7rKUyy33Q1yc98pQ1DAmLtwX109F7TIfWlW1Ydo8Wl1ii1SeHieeh0HHfPeL2fMXK6z0s8ecKs9frCuLJvndBg==",
      "dev": true,
      "license": "BSD-2-Clause",
      "dependencies": {
        "punycode": "^2.1.0"
      }
    },
    "node_modules/use-callback-ref": {
      "version": "1.3.3",
      "resolved": "https://registry.npmjs.org/use-callback-ref/-/use-callback-ref-1.3.3.tgz",
      "integrity": "sha512-jQL3lRnocaFtu3V00JToYz/4QkNWswxijDaCVNZRiRTO3HQDLsdu1ZtmIUvV4yPp+rvWm5j0y0TG/S61cuijTg==",
      "license": "MIT",
      "dependencies": {
        "tslib": "^2.0.0"
      },
      "engines": {
        "node": ">=10"
      },
      "peerDependencies": {
        "@types/react": "*",
        "react": "^16.8.0 || ^17.0.0 || ^18.0.0 || ^19.0.0 || ^19.0.0-rc"
      },
      "peerDependenciesMeta": {
        "@types/react": {
          "optional": true
        }
      }
    },
    "node_modules/use-sidecar": {
      "version": "1.1.3",
      "resolved": "https://registry.npmjs.org/use-sidecar/-/use-sidecar-1.1.3.tgz",
      "integrity": "sha512-Fedw0aZvkhynoPYlA5WXrMCAMm+nSWdZt6lzJQ7Ok8S6Q+VsHmHpRWndVRJ8Be0ZbkfPc5LRYH+5XrzXcEeLRQ==",
      "license": "MIT",
      "dependencies": {
        "detect-node-es": "^1.1.0",
        "tslib": "^2.0.0"
      },
      "engines": {
        "node": ">=10"
      },
      "peerDependencies": {
        "@types/react": "*",
        "react": "^16.8.0 || ^17.0.0 || ^18.0.0 || ^19.0.0 || ^19.0.0-rc"
      },
      "peerDependenciesMeta": {
        "@types/react": {
          "optional": true
        }
      }
    },
    "node_modules/use-sync-external-store": {
      "version": "1.6.0",
      "resolved": "https://registry.npmjs.org/use-sync-external-store/-/use-sync-external-store-1.6.0.tgz",
      "integrity": "sha512-Pp6GSwGP/NrPIrxVFAIkOQeyw8lFenOHijQWkUTrDvrF4ALqylP2C/KCkeS9dpUM3KvYRQhna5vt7IL95+ZQ9w==",
      "license": "MIT",
      "peerDependencies": {
        "react": "^16.8.0 || ^17.0.0 || ^18.0.0 || ^19.0.0"
      }
    },
    "node_modules/usehooks-ts": {
      "version": "3.1.1",
      "resolved": "https://registry.npmjs.org/usehooks-ts/-/usehooks-ts-3.1.1.tgz",
      "integrity": "sha512-I4diPp9Cq6ieSUH2wu+fDAVQO43xwtulo+fKEidHUwZPnYImbtkTjzIJYcDcJqxgmX31GVqNFURodvcgHcW0pA==",
      "license": "MIT",
      "dependencies": {
        "lodash.debounce": "^4.0.8"
      },
      "engines": {
        "node": ">=16.15.0"
      },
      "peerDependencies": {
        "react": "^16.8.0  || ^17 || ^18 || ^19 || ^19.0.0-rc"
      }
    },
    "node_modules/util-deprecate": {
      "version": "1.0.2",
      "resolved": "https://registry.npmjs.org/util-deprecate/-/util-deprecate-1.0.2.tgz",
      "integrity": "sha512-EPD5q1uXyFxJpCrLnCc1nHnq3gOa6DZBocAIiI2TaSCA7VCJ1UJDMagCzIkXNsUYfD1daK//LTEQ8xiIbrHtcw==",
      "license": "MIT"
    },
    "node_modules/validate-npm-package-name": {
      "version": "7.0.2",
      "resolved": "https://registry.npmjs.org/validate-npm-package-name/-/validate-npm-package-name-7.0.2.tgz",
      "integrity": "sha512-hVDIBwsRruT73PbK7uP5ebUt+ezEtCmzZz3F59BSr2F6OVFnJ/6h8liuvdLrQ88Xmnk6/+xGGuq+pG9WwTuy3A==",
      "license": "ISC",
      "engines": {
        "node": "^20.17.0 || >=22.9.0"
      }
    },
    "node_modules/vary": {
      "version": "1.1.2",
      "resolved": "https://registry.npmjs.org/vary/-/vary-1.1.2.tgz",
      "integrity": "sha512-BNGbWLfd0eUPabhkXUVm0j8uuvREyTh5ovRa/dyow/BqAbZJyC+5fU+IzQOzmAKzYqYRAISoRhdQr3eIZ/PXqg==",
      "license": "MIT",
      "engines": {
        "node": ">= 0.8"
      }
    },
    "node_modules/web-streams-polyfill": {
      "version": "3.3.3",
      "resolved": "https://registry.npmjs.org/web-streams-polyfill/-/web-streams-polyfill-3.3.3.tgz",
      "integrity": "sha512-d2JWLCivmZYTSIoge9MsgFCZrt571BikcWGYkjC1khllbTeDlGqZ2D8vD8E/lJa8WGWbb7Plm8/XJYV7IJHZZw==",
      "license": "MIT",
      "engines": {
        "node": ">= 8"
      }
    },
    "node_modules/webidl-conversions": {
      "version": "7.0.0",
      "resolved": "https://registry.npmjs.org/webidl-conversions/-/webidl-conversions-7.0.0.tgz",
      "integrity": "sha512-VwddBukDzu71offAQR975unBIGqfKZpM+8ZX6ySk8nYhVoo5CYaZyzt3YBvYtRtO+aoGlqxPg/B87NGVZ/fu6g==",
      "license": "BSD-2-Clause",
      "peer": true,
      "engines": {
        "node": ">=12"
      }
    },
    "node_modules/webrtc-adapter": {
      "version": "9.0.4",
      "resolved": "https://registry.npmjs.org/webrtc-adapter/-/webrtc-adapter-9.0.4.tgz",
      "integrity": "sha512-5ZZY1+lGq8LEKuDlg9M2RPJHlH3R7OVwyHqMcUsLKCgd9Wvf+QrFTCItkXXYPmrJn8H6gRLXbSgxLLdexiqHxw==",
      "license": "BSD-3-Clause",
      "dependencies": {
        "sdp": "^3.2.0"
      },
      "engines": {
        "node": ">=6.0.0",
        "npm": ">=3.10.0"
      }
    },
    "node_modules/whatwg-url": {
      "version": "14.2.0",
      "resolved": "https://registry.npmjs.org/whatwg-url/-/whatwg-url-14.2.0.tgz",
      "integrity": "sha512-De72GdQZzNTUBBChsXueQUnPKDkg/5A5zp7pFDuQAj5UFoENpiACU0wlCvzpAGnTkj++ihpKwKyYewn/XNUbKw==",
      "license": "MIT",
      "peer": true,
      "dependencies": {
        "tr46": "^5.1.0",
        "webidl-conversions": "^7.0.0"
      },
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/which": {
      "version": "2.0.2",
      "resolved": "https://registry.npmjs.org/which/-/which-2.0.2.tgz",
      "integrity": "sha512-BLI3Tl1TW3Pvl70l3yq3Y64i+awpwXqsGBYWkkqMtnbXgrMD+yj7rhW0kuEDxzJaYXGjEW5ogapKNMEKNMjibA==",
      "license": "ISC",
      "dependencies": {
        "isexe": "^2.0.0"
      },
      "bin": {
        "node-which": "bin/node-which"
      },
      "engines": {
        "node": ">= 8"
      }
    },
    "node_modules/which-boxed-primitive": {
      "version": "1.1.1",
      "resolved": "https://registry.npmjs.org/which-boxed-primitive/-/which-boxed-primitive-1.1.1.tgz",
      "integrity": "sha512-TbX3mj8n0odCBFVlY8AxkqcHASw3L60jIuF8jFP78az3C2YhmGvqbHBpAjTRH2/xqYunrJ9g1jSyjCjpoWzIAA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "is-bigint": "^1.1.0",
        "is-boolean-object": "^1.2.1",
        "is-number-object": "^1.1.1",
        "is-string": "^1.1.1",
        "is-symbol": "^1.1.1"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/which-builtin-type": {
      "version": "1.2.1",
      "resolved": "https://registry.npmjs.org/which-builtin-type/-/which-builtin-type-1.2.1.tgz",
      "integrity": "sha512-6iBczoX+kDQ7a3+YJBnh3T+KZRxM/iYNPXicqk66/Qfm1b93iu+yOImkg0zHbj5LNOcNv1TEADiZ0xa34B4q6Q==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "call-bound": "^1.0.2",
        "function.prototype.name": "^1.1.6",
        "has-tostringtag": "^1.0.2",
        "is-async-function": "^2.0.0",
        "is-date-object": "^1.1.0",
        "is-finalizationregistry": "^1.1.0",
        "is-generator-function": "^1.0.10",
        "is-regex": "^1.2.1",
        "is-weakref": "^1.0.2",
        "isarray": "^2.0.5",
        "which-boxed-primitive": "^1.1.0",
        "which-collection": "^1.0.2",
        "which-typed-array": "^1.1.16"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/which-collection": {
      "version": "1.0.2",
      "resolved": "https://registry.npmjs.org/which-collection/-/which-collection-1.0.2.tgz",
      "integrity": "sha512-K4jVyjnBdgvc86Y6BkaLZEN933SwYOuBFkdmBu9ZfkcAbdVbpITnDmjvZ/aQjRXQrv5EPkTnD1s39GiiqbngCw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "is-map": "^2.0.3",
        "is-set": "^2.0.3",
        "is-weakmap": "^2.0.2",
        "is-weakset": "^2.0.3"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/which-typed-array": {
      "version": "1.1.20",
      "resolved": "https://registry.npmjs.org/which-typed-array/-/which-typed-array-1.1.20.tgz",
      "integrity": "sha512-LYfpUkmqwl0h9A2HL09Mms427Q1RZWuOHsukfVcKRq9q95iQxdw0ix1JQrqbcDR9PH1QDwf5Qo8OZb5lksZ8Xg==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "available-typed-arrays": "^1.0.7",
        "call-bind": "^1.0.8",
        "call-bound": "^1.0.4",
        "for-each": "^0.3.5",
        "get-proto": "^1.0.1",
        "gopd": "^1.2.0",
        "has-tostringtag": "^1.0.2"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/word-wrap": {
      "version": "1.2.5",
      "resolved": "https://registry.npmjs.org/word-wrap/-/word-wrap-1.2.5.tgz",
      "integrity": "sha512-BN22B5eaMMI9UMtjrGd5g5eCYPpCPDUy0FJXbYsaT5zYxjFOckS53SQDE3pWkVoWpHXVb3BrYcEN4Twa55B5cA==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=0.10.0"
      }
    },
    "node_modules/wrap-ansi": {
      "version": "6.2.0",
      "resolved": "https://registry.npmjs.org/wrap-ansi/-/wrap-ansi-6.2.0.tgz",
      "integrity": "sha512-r6lPcBGxZXlIcymEu7InxDMhdW0KDxpLgoFLcguasxCaJ/SOIZwINatK9KY/tf+ZrlywOKU0UDj3ATXUBfxJXA==",
      "license": "MIT",
      "dependencies": {
        "ansi-styles": "^4.0.0",
        "string-width": "^4.1.0",
        "strip-ansi": "^6.0.0"
      },
      "engines": {
        "node": ">=8"
      }
    },
    "node_modules/wrap-ansi/node_modules/ansi-regex": {
      "version": "5.0.1",
      "resolved": "https://registry.npmjs.org/ansi-regex/-/ansi-regex-5.0.1.tgz",
      "integrity": "sha512-quJQXlTSUGL2LH9SUXo8VwsY4soanhgo6LNSm84E1LBcE8s3O0wpdiRzyR9z/ZZJMlMWv37qOOb9pdJlMUEKFQ==",
      "license": "MIT",
      "engines": {
        "node": ">=8"
      }
    },
    "node_modules/wrap-ansi/node_modules/emoji-regex": {
      "version": "8.0.0",
      "resolved": "https://registry.npmjs.org/emoji-regex/-/emoji-regex-8.0.0.tgz",
      "integrity": "sha512-MSjYzcWNOA0ewAHpz0MxpYFvwg6yjy1NG3xteoqz644VCo/RPgnr1/GGt+ic3iJTzQ8Eu3TdM14SawnVUmGE6A==",
      "license": "MIT"
    },
    "node_modules/wrap-ansi/node_modules/string-width": {
      "version": "4.2.3",
      "resolved": "https://registry.npmjs.org/string-width/-/string-width-4.2.3.tgz",
      "integrity": "sha512-wKyQRQpjJ0sIp62ErSZdGsjMJWsap5oRNihHhu6G7JVO/9jIB6UyevL+tXuOqrng8j/cxKTWyWUwvSTriiZz/g==",
      "license": "MIT",
      "dependencies": {
        "emoji-regex": "^8.0.0",
        "is-fullwidth-code-point": "^3.0.0",
        "strip-ansi": "^6.0.1"
      },
      "engines": {
        "node": ">=8"
      }
    },
    "node_modules/wrap-ansi/node_modules/strip-ansi": {
      "version": "6.0.1",
      "resolved": "https://registry.npmjs.org/strip-ansi/-/strip-ansi-6.0.1.tgz",
      "integrity": "sha512-Y38VPSHcqkFrCpFnQ9vuSXmquuv5oXOKpGeT6aGrr3o3Gc9AlVa6JBfUSOCnbxGGZF+/0ooI7KrPuUSztUdU5A==",
      "license": "MIT",
      "dependencies": {
        "ansi-regex": "^5.0.1"
      },
      "engines": {
        "node": ">=8"
      }
    },
    "node_modules/wrappy": {
      "version": "1.0.2",
      "resolved": "https://registry.npmjs.org/wrappy/-/wrappy-1.0.2.tgz",
      "integrity": "sha512-l4Sp/DRseor9wL6EvV2+TuQn63dMkPjZ/sp9XkghTEbV9KlPS1xUsZ3u7/IQO4wxtcFB4bgpQPRcR3QCvezPcQ==",
      "license": "ISC"
    },
    "node_modules/wsl-utils": {
      "version": "0.3.1",
      "resolved": "https://registry.npmjs.org/wsl-utils/-/wsl-utils-0.3.1.tgz",
      "integrity": "sha512-g/eziiSUNBSsdDJtCLB8bdYEUMj4jR7AGeUo96p/3dTafgjHhpF4RiCFPiRILwjQoDXx5MqkBr4fwWtR3Ky4Wg==",
      "license": "MIT",
      "dependencies": {
        "is-wsl": "^3.1.0",
        "powershell-utils": "^0.1.0"
      },
      "engines": {
        "node": ">=20"
      },
      "funding": {
        "url": "https://github.com/sponsors/sindresorhus"
      }
    },
    "node_modules/y18n": {
      "version": "5.0.8",
      "resolved": "https://registry.npmjs.org/y18n/-/y18n-5.0.8.tgz",
      "integrity": "sha512-0pfFzegeDWJHJIAmTLRP2DwHjdF5s7jo9tuztdQxAhINCdvS+3nGINqPd00AphqJR/0LhANUS6/+7SCb98YOfA==",
      "license": "ISC",
      "engines": {
        "node": ">=10"
      }
    },
    "node_modules/yallist": {
      "version": "3.1.1",
      "resolved": "https://registry.npmjs.org/yallist/-/yallist-3.1.1.tgz",
      "integrity": "sha512-a4UGQaWPH59mOXUYnAG2ewncQS4i4F43Tv3JoAM+s2VDAmS9NsK8GpDMLrCHPksFT7h3K6TOoUNn2pb7RoXx4g==",
      "license": "ISC"
    },
    "node_modules/yargs": {
      "version": "17.7.2",
      "resolved": "https://registry.npmjs.org/yargs/-/yargs-17.7.2.tgz",
      "integrity": "sha512-7dSzzRQ++CKnNI/krKnYRV7JKKPUXMEh61soaHKg9mrWEhzFWhFnxPxGl+69cD1Ou63C13NUPCnmIcrvqCuM6w==",
      "license": "MIT",
      "dependencies": {
        "cliui": "^8.0.1",
        "escalade": "^3.1.1",
        "get-caller-file": "^2.0.5",
        "require-directory": "^2.1.1",
        "string-width": "^4.2.3",
        "y18n": "^5.0.5",
        "yargs-parser": "^21.1.1"
      },
      "engines": {
        "node": ">=12"
      }
    },
    "node_modules/yargs-parser": {
      "version": "21.1.1",
      "resolved": "https://registry.npmjs.org/yargs-parser/-/yargs-parser-21.1.1.tgz",
      "integrity": "sha512-tVpsJW7DdjecAiFpbIB1e3qxIQsE6NoPc5/eTdrbbIC4h0LVsWhnoa3g+m2HclBIujHzsxZ4VJVA+GUuc2/LBw==",
      "license": "ISC",
      "engines": {
        "node": ">=12"
      }
    },
    "node_modules/yargs/node_modules/ansi-regex": {
      "version": "5.0.1",
      "resolved": "https://registry.npmjs.org/ansi-regex/-/ansi-regex-5.0.1.tgz",
      "integrity": "sha512-quJQXlTSUGL2LH9SUXo8VwsY4soanhgo6LNSm84E1LBcE8s3O0wpdiRzyR9z/ZZJMlMWv37qOOb9pdJlMUEKFQ==",
      "license": "MIT",
      "engines": {
        "node": ">=8"
      }
    },
    "node_modules/yargs/node_modules/emoji-regex": {
      "version": "8.0.0",
      "resolved": "https://registry.npmjs.org/emoji-regex/-/emoji-regex-8.0.0.tgz",
      "integrity": "sha512-MSjYzcWNOA0ewAHpz0MxpYFvwg6yjy1NG3xteoqz644VCo/RPgnr1/GGt+ic3iJTzQ8Eu3TdM14SawnVUmGE6A==",
      "license": "MIT"
    },
    "node_modules/yargs/node_modules/string-width": {
      "version": "4.2.3",
      "resolved": "https://registry.npmjs.org/string-width/-/string-width-4.2.3.tgz",
      "integrity": "sha512-wKyQRQpjJ0sIp62ErSZdGsjMJWsap5oRNihHhu6G7JVO/9jIB6UyevL+tXuOqrng8j/cxKTWyWUwvSTriiZz/g==",
      "license": "MIT",
      "dependencies": {
        "emoji-regex": "^8.0.0",
        "is-fullwidth-code-point": "^3.0.0",
        "strip-ansi": "^6.0.1"
      },
      "engines": {
        "node": ">=8"
      }
    },
    "node_modules/yargs/node_modules/strip-ansi": {
      "version": "6.0.1",
      "resolved": "https://registry.npmjs.org/strip-ansi/-/strip-ansi-6.0.1.tgz",
      "integrity": "sha512-Y38VPSHcqkFrCpFnQ9vuSXmquuv5oXOKpGeT6aGrr3o3Gc9AlVa6JBfUSOCnbxGGZF+/0ooI7KrPuUSztUdU5A==",
      "license": "MIT",
      "dependencies": {
        "ansi-regex": "^5.0.1"
      },
      "engines": {
        "node": ">=8"
      }
    },
    "node_modules/yocto-queue": {
      "version": "0.1.0",
      "resolved": "https://registry.npmjs.org/yocto-queue/-/yocto-queue-0.1.0.tgz",
      "integrity": "sha512-rVksvsnNCdJ/ohGc6xgPwyN8eheCxsiLM8mxuE/t/mOVqJewPuO1miLpTHQiRgTKCLexL4MeAFVagts7HmNZ2Q==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=10"
      },
      "funding": {
        "url": "https://github.com/sponsors/sindresorhus"
      }
    },
    "node_modules/yoctocolors": {
      "version": "2.1.2",
      "resolved": "https://registry.npmjs.org/yoctocolors/-/yoctocolors-2.1.2.tgz",
      "integrity": "sha512-CzhO+pFNo8ajLM2d2IW/R93ipy99LWjtwblvC1RsoSUMZgyLbYFr221TnSNT7GjGdYui6P459mw9JH/g/zW2ug==",
      "license": "MIT",
      "engines": {
        "node": ">=18"
      },
      "funding": {
        "url": "https://github.com/sponsors/sindresorhus"
      }
    },
    "node_modules/yoctocolors-cjs": {
      "version": "2.1.3",
      "resolved": "https://registry.npmjs.org/yoctocolors-cjs/-/yoctocolors-cjs-2.1.3.tgz",
      "integrity": "sha512-U/PBtDf35ff0D8X8D0jfdzHYEPFxAI7jJlxZXwCSez5M3190m+QobIfh+sWDWSHMCWWJN2AWamkegn6vr6YBTw==",
      "license": "MIT",
      "engines": {
        "node": ">=18"
      },
      "funding": {
        "url": "https://github.com/sponsors/sindresorhus"
      }
    },
    "node_modules/zod": {
      "version": "4.3.6",
      "resolved": "https://registry.npmjs.org/zod/-/zod-4.3.6.tgz",
      "integrity": "sha512-rftlrkhHZOcjDwkGlnUtZZkvaPHCsDATp4pGpuOOMDaTdDDXF91wuVDJoWoPsKX/3YPQ5fHuF3STjcYyKr+Qhg==",
      "license": "MIT",
      "funding": {
        "url": "https://github.com/sponsors/colinhacks"
      }
    },
    "node_modules/zod-to-json-schema": {
      "version": "3.25.1",
      "resolved": "https://registry.npmjs.org/zod-to-json-schema/-/zod-to-json-schema-3.25.1.tgz",
      "integrity": "sha512-pM/SU9d3YAggzi6MtR4h7ruuQlqKtad8e9S0fmxcMi+ueAK5Korys/aWcV9LIIHTVbj01NdzxcnXSN+O74ZIVA==",
      "license": "ISC",
      "peerDependencies": {
        "zod": "^3.25 || ^4"
      }
    },
    "node_modules/zod-validation-error": {
      "version": "4.0.2",
      "resolved": "https://registry.npmjs.org/zod-validation-error/-/zod-validation-error-4.0.2.tgz",
      "integrity": "sha512-Q6/nZLe6jxuU80qb/4uJ4t5v2VEZ44lzQjPDhYJNztRQ4wyWc6VF3D3Kb/fAuPetZQnhS3hnajCf9CsWesghLQ==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=18.0.0"
      },
      "peerDependencies": {
        "zod": "^3.25.0 || ^4.0.0"
      }
    }
  }
}

```


---
## FILE: client/package.json

```json
{
  "name": "client",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "eslint"
  },
  "dependencies": {
    "@base-ui/react": "^1.3.0",
    "@livekit/components-react": "^2.9.20",
    "@livekit/components-styles": "^1.2.0",
    "@radix-ui/react-dialog": "^1.1.15",
    "better-auth": "^1.5.5",
    "class-variance-authority": "^0.7.1",
    "clsx": "^2.1.1",
    "dexie": "^4.4.2",
    "livekit-client": "^2.18.1",
    "lucide-react": "^1.6.0",
    "next": "16.2.0",
    "react": "19.2.4",
    "react-dom": "19.2.4",
    "shadcn": "^4.1.0",
    "sweetalert2": "^11.26.24",
    "tailwind-merge": "^3.5.0",
    "tw-animate-css": "^1.4.0"
  },
  "devDependencies": {
    "@tailwindcss/postcss": "^4",
    "@types/node": "^20",
    "@types/react": "^19",
    "@types/react-dom": "^19",
    "eslint": "^9",
    "eslint-config-next": "16.2.0",
    "tailwindcss": "^4",
    "typescript": "^5"
  }
}

```


---
## FILE: client/src/app/(auth)/admin/page.tsx

```tsx
"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/components/AuthProvider";
import { useRouter } from "next/navigation";
import { 
  getAdminStats, 
  getAdminUsers, 
  getAdminProjects, 
  deleteAdminUser, 
  deleteAdminProject 
} from "@/lib/api";

export default function AdminDashboard() {
  const { user, loading } = useAuth();
  const router = useRouter();
  
  const [stats, setStats] = useState<any>(null);
  const [users, setUsers] = useState<any[]>([]);
  const [projects, setProjects] = useState<any[]>([]);
  const [tab, setTab] = useState("overview");

  useEffect(() => {
    if (!loading) {
      if (!user || user.role !== "ADMIN") {
        router.push("/dashboard");
      } else {
        fetchData();
      }
    }
  }, [user, loading, router]);

  const fetchData = async () => {
    try {
      const statsRes = await getAdminStats();
      setStats(statsRes.data);
      const usersRes = await getAdminUsers();
      setUsers(usersRes.data);
      const projectsRes = await getAdminProjects();
      setProjects(projectsRes.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteUser = async (id: string) => {
    if (!confirm("Are you sure you want to delete this user?")) return;
    try {
      await deleteAdminUser(id);
      fetchData();
    } catch (error) {
      alert("Failed to delete user");
    }
  };

  const handleDeleteProject = async (id: string) => {
    if (!confirm("Are you sure you want to delete this project?")) return;
    try {
      await deleteAdminProject(id);
      fetchData();
    } catch (error) {
      alert("Failed to delete project");
    }
  };

  if (loading || !user || user.role !== "ADMIN") return <div className="p-20 text-center text-white">Loading...</div>;

  return (
    <div className="pt-24 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto min-h-screen text-white font-outfit">
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
      
      {/* Metrics */}
      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white/5 border border-white/10 p-6 rounded-2xl">
            <h3 className="text-gray-400 text-sm">Total Users</h3>
            <p className="text-3xl font-bold mt-2">{stats.totalUsers}</p>
          </div>
          <div className="bg-white/5 border border-white/10 p-6 rounded-2xl">
            <h3 className="text-gray-400 text-sm">Total Projects</h3>
            <p className="text-3xl font-bold mt-2">{stats.totalProjects}</p>
          </div>
          <div className="bg-white/5 border border-white/10 p-6 rounded-2xl">
            <h3 className="text-gray-400 text-sm">Total Animations</h3>
            <p className="text-3xl font-bold mt-2">{stats.totalAnimations}</p>
          </div>
          <div className="bg-white/5 border border-white/10 p-6 rounded-2xl">
            <h3 className="text-gray-400 text-sm">System Health</h3>
            <p className="text-3xl font-bold mt-2 text-green-400">{stats.healthStatus}</p>
            <p className="text-xs text-gray-500 mt-1">Uptime: {Math.floor(stats.uptime / 60)} mins</p>
          </div>
        </div>
      )}

      {/* Tabs */}
      <div className="flex gap-4 border-b border-white/10 mb-6">
        <button 
          onClick={() => setTab("overview")} 
          className={`pb-3 px-2 transition-colors ${tab === "overview" ? "border-b-2 border-primary text-white" : "text-gray-400 hover:text-white"}`}
        >
          Overview
        </button>
        <button 
          onClick={() => setTab("users")} 
          className={`pb-3 px-2 transition-colors ${tab === "users" ? "border-b-2 border-primary text-white" : "text-gray-400 hover:text-white"}`}
        >
          Manage Users
        </button>
        <button 
          onClick={() => setTab("projects")} 
          className={`pb-3 px-2 transition-colors ${tab === "projects" ? "border-b-2 border-primary text-white" : "text-gray-400 hover:text-white"}`}
        >
          Manage Projects
        </button>
      </div>

      {/* Tab Content */}
      {tab === "users" && (
        <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/10 text-gray-400 text-sm">
                <th className="p-4 font-medium">Name</th>
                <th className="p-4 font-medium">Email</th>
                <th className="p-4 font-medium">Role</th>
                <th className="p-4 font-medium">Joined</th>
                <th className="p-4 text-right font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map(u => (
                <tr key={u.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                  <td className="p-4">{u.name || "N/A"}</td>
                  <td className="p-4">{u.email}</td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded text-xs ${u.role === "ADMIN" ? "bg-primary/20 text-primary" : "bg-white/10 text-gray-300"}`}>
                      {u.role}
                    </span>
                  </td>
                  <td className="p-4 text-gray-400 text-sm">{new Date(u.createdAt).toLocaleDateString()}</td>
                  <td className="p-4 text-right">
                    {u.role !== "ADMIN" && (
                      <button onClick={() => handleDeleteUser(u.id)} className="text-red-400 hover:text-red-300 text-sm font-medium transition-colors">Delete</button>
                    )}
                  </td>
                </tr>
              ))}
              {users.length === 0 && (
                 <tr><td colSpan={5} className="p-8 text-center text-gray-500">No users found.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {tab === "projects" && (
        <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/10 text-gray-400 text-sm">
                <th className="p-4 font-medium">Title</th>
                <th className="p-4 font-medium">Owner</th>
                <th className="p-4 font-medium">Created</th>
                <th className="p-4 text-right font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {projects.map(p => (
                <tr key={p.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                  <td className="p-4">{p.title}</td>
                  <td className="p-4 text-gray-400">{p.user?.email}</td>
                  <td className="p-4 text-gray-400 text-sm">{new Date(p.createdAt).toLocaleDateString()}</td>
                  <td className="p-4 text-right">
                    <button onClick={() => handleDeleteProject(p.id)} className="text-red-400 hover:text-red-300 text-sm font-medium transition-colors">Delete</button>
                  </td>
                </tr>
              ))}
              {projects.length === 0 && (
                <tr><td colSpan={4} className="p-8 text-center text-gray-500">No projects found.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {tab === "overview" && stats && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white/5 border border-white/10 p-6 rounded-2xl">
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
               <span className="w-2 h-2 rounded-full bg-primary"></span>
               Recent Users
            </h3>
            <ul className="space-y-1">
              {stats.recentUsers.map((u: any) => (
                <li key={u.id} className="flex justify-between py-2.5 border-b border-white/5 last:border-0 hover:bg-white/5 px-2 rounded -mx-2 transition-colors">
                  <span className="font-medium text-sm">{u.email}</span>
                  <span className="text-gray-400 text-sm">{new Date(u.createdAt).toLocaleDateString()}</span>
                </li>
              ))}
              {stats.recentUsers.length === 0 && <li className="text-gray-500 text-sm py-2">No users found.</li>}
            </ul>
          </div>
          <div className="bg-white/5 border border-white/10 p-6 rounded-2xl">
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
               <span className="w-2 h-2 rounded-full bg-secondary"></span>
               Recent Projects
            </h3>
            <ul className="space-y-1">
              {stats.recentProjects.map((p: any) => (
                <li key={p.id} className="flex justify-between py-2.5 border-b border-white/5 last:border-0 hover:bg-white/5 px-2 rounded -mx-2 transition-colors">
                  <span className="font-medium text-sm truncate max-w-[200px]">{p.title}</span>
                  <span className="text-gray-400 text-sm shrink-0">{p.user?.email || "Unknown"}</span>
                </li>
              ))}
              {stats.recentProjects.length === 0 && <li className="text-gray-500 text-sm py-2">No projects found.</li>}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

```


---
## FILE: client/src/app/dashboard/layout.tsx

```tsx
import { Sidebar } from "@/components/Sidebar";
import { ReactNode } from "react";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-screen w-full bg-[#030303]">
      <Sidebar />
      <div className="flex-1 min-w-0 overflow-y-auto">
        <div className="container mx-auto p-6 lg:p-8 max-w-7xl">
          {children}
        </div>
      </div>
    </div>
  );
}

```


---
## FILE: client/src/app/dashboard/page.tsx

```tsx
export default function DashboardHomePage() {
  return (
    <div className="max-w-4xl">
      <h1 className="text-3xl font-bold tracking-tight mb-4 text-white">Home</h1>
      <div className="bg-white/5 border border-white/10 rounded-xl p-8">
        <p className="text-gray-300 leading-relaxed">
          Welcome to the new RECORA dashboard home. 
          Use the sidebar on the left to navigate through your projects and Studios.
        </p>
      </div>
    </div>
  );
}

```


---
## FILE: client/src/app/dashboard/projects/page.tsx

```tsx
export default function ProjectsPage() {
  return (
    <div className="max-w-4xl">
      <h1 className="text-3xl font-bold tracking-tight mb-4 text-white">Projects</h1>
      <div className="bg-white/5 border border-white/10 rounded-xl p-8">
        <p className="text-gray-300 leading-relaxed">
          Welcome to the Projects page. This is a dummy page to satisfy the new project structure.
          You can list out user projects here in the future.
        </p>
      </div>
    </div>
  );
}

```


---
## FILE: client/src/app/dashboard/team-view/page.tsx

```tsx
"use client";

import { useEffect, useRef, useState } from "react";
import { Video, VideoOff, Mic, MicOff } from "lucide-react";
import { useRecordingEngine } from "../../../hooks/useRecordingEngine";

export default function TeamViewPage() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isVideoEnabled, setIsVideoEnabled] = useState(true);
  const [isAudioEnabled, setIsAudioEnabled] = useState(true);

  const trackId = "track-demo-123";
  const { isRecording, recordingTime, startRecording, stopRecording } = useRecordingEngine({ trackId });

  useEffect(() => {
    let activeStream: MediaStream | null = null;

    async function setupCamera() {
      try {
        const mediaStream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true, // we request both for a realistic green room
        });
        activeStream = mediaStream;
        setStream(mediaStream);
        if (videoRef.current) {
          videoRef.current.srcObject = mediaStream;
        }
      } catch (err: any) {
        console.error("Error accessing media devices.", err);
        setError("Could not access camera/microphone. Please allow permissions.");
      }
    }

    setupCamera();

    return () => {
      // Cleanup stream on unmount
      if (activeStream) {
        activeStream.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  const toggleVideo = () => {
    if (stream) {
      stream.getVideoTracks().forEach(track => {
        track.enabled = !isVideoEnabled;
      });
      setIsVideoEnabled(!isVideoEnabled);
    }
  };

  const toggleAudio = () => {
    if (stream) {
      stream.getAudioTracks().forEach(track => {
        track.enabled = !isAudioEnabled;
      });
      setIsAudioEnabled(!isAudioEnabled);
    }
  };

  return (
    <div className="max-w-5xl mx-auto h-full flex flex-col pt-4">
      <h1 className="text-3xl font-bold tracking-tight mb-8 text-white">Studio</h1>
      
      <div className="flex-1 flex flex-col items-center justify-center max-h-[70vh]">
        <div className="w-full max-w-3xl aspect-video bg-black rounded-2xl overflow-hidden border border-white/10 relative shadow-2xl flex items-center justify-center">
          {error ? (
            <div className="text-red-400 p-4 text-center">{error}</div>
          ) : (
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted // Always muted locally to prevent feedback loop
              className={`w-full h-full object-cover transition-opacity duration-300 ${!isVideoEnabled ? 'opacity-0' : 'opacity-100'}`}
            />
          )}

          {/* Timer Overlay */}
          {isRecording && (
            <div className="absolute top-4 right-4 bg-red-500/80 backdrop-blur text-white px-4 py-1.5 rounded-full text-sm font-medium flex items-center gap-2">
               <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
               {new Date(recordingTime * 1000).toISOString().substring(11, 19)}
            </div>
          )}

          {!isVideoEnabled && !error && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-24 h-24 rounded-full bg-white/10 flex items-center justify-center">
                <VideoOff className="w-10 h-10 text-gray-400" />
              </div>
            </div>
          )}

          {/* Controls overlay */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-4 bg-black/60 backdrop-blur-md px-6 py-3 rounded-2xl border border-white/10">
            <button
              onClick={toggleAudio}
              className={`p-4 rounded-full transition-all ${
                isAudioEnabled 
                  ? 'bg-white/10 hover:bg-white/20 text-white' 
                  : 'bg-red-500 hover:bg-red-600 text-white'
              }`}
            >
              {isAudioEnabled ? <Mic className="w-6 h-6" /> : <MicOff className="w-6 h-6" />}
            </button>
            <button
              onClick={toggleVideo}
              className={`p-4 rounded-full transition-all ${
                isVideoEnabled 
                  ? 'bg-white/10 hover:bg-white/20 text-white' 
                  : 'bg-red-500 hover:bg-red-600 text-white'
              }`}
            >
              {isVideoEnabled ? <Video className="w-6 h-6" /> : <VideoOff className="w-6 h-6" />}
            </button>
            
            <button
              disabled={!stream}
              onClick={() => {
                if (isRecording) stopRecording();
                else if (stream) startRecording(stream);
              }}
              className={`px-6 py-3 ml-4 rounded-full font-semibold transition-all ${
                isRecording 
                  ? 'bg-red-500 hover:bg-red-600 border border-red-400 text-white shadow-[0_0_15px_rgba(239,68,68,0.5)]' 
                  : 'bg-[#00f0ff]/20 hover:bg-[#00f0ff]/30 text-[#00f0ff] border border-[#00f0ff]/50 shadow-[0_0_15px_rgba(0,240,255,0.2)] disabled:opacity-50'
              }`}
            >
              {isRecording ? 'Stop Recording' : 'Start Recording'}
            </button>
          </div>
        </div>

        <div className="mt-8 text-center max-w-xl">
          <h2 className="text-xl font-semibold text-white mb-2">Ready to join?</h2>
          <p className="text-gray-400 text-sm">
            Check your audio and video settings before joining the Studio session.
            All processing is handled directly in your browser.
          </p>
        </div>
      </div>
    </div>
  );
}

```


---
## FILE: client/src/app/globals.css

```css
@import "tailwindcss";
@import "tw-animate-css";
@import "shadcn/tailwind.css";

@custom-variant dark (&:is(.dark *));

@theme {
  --color-primary: #7C3AED;
  --color-secondary: #06B6D4;

  --color-background: #0A0A0A;
  --color-foreground: #EDEDED;

  --color-surface: #111111;
  --color-surface-2: #18181B;
  --color-border: #27272A;
  --color-muted: #A1A1AA;

  --color-success: #22C55E;
  --color-warning: #F59E0B;
  --color-error: #EF4444;

  --font-sans: var(--font-plus-jakarta-sans);
  --font-mono: var(--font-inter);
}

body {
  background-color: var(--background);
}

@layer utilities {
  .text-gradient {
    @apply bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary;
  }
  
  .scrollbar-hide {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
  
  .scrollbar-hide::-webkit-scrollbar {
    display: none;
  }
}
@keyframes glowPulse {
  0% {
    transform: scale(1);
    opacity: 0.35;
  }
  50% {
    transform: scale(1.15);
    opacity: 0.5;
  }
  100% {
    transform: scale(1);
    opacity: 0.35;
  }
}

@keyframes glowPulseDelay {
  0% {
    transform: scale(1.1);
    opacity: 0.25;
  }
  50% {
    transform: scale(1.25);
    opacity: 0.4;
  }
  100% {
    transform: scale(1.1);
    opacity: 0.25;
  }
}

.animate-glowPulse {
  animation: glowPulse 12s ease-in-out infinite;
}

.animate-glowPulseDelay {
  animation: glowPulseDelay 16s ease-in-out infinite;
}

/* ================= SOFT CTA GLOW ================= */
@keyframes ctaGlowSoft {
  0% {
    transform: scale(1);
    box-shadow: 0 0 0px rgba(124, 58, 237, 0);
  }

  50% {
    transform: scale(1.02);
    box-shadow: 0 0 20px rgba(124, 58, 237, 0.25);
  }

  100% {
    transform: scale(1);
    box-shadow: 0 0 0px rgba(124, 58, 237, 0);
  }
}

.animate-ctaGlowSoft {
  animation: ctaGlowSoft 3s ease-in-out infinite;
}

/* ================= SOFT SWEEP ================= */
@keyframes ctaSweepSoft {
  0% {
    transform: translateX(-100%);
    opacity: 0;
  }

  40% {
    opacity: 0.4;
  }

  60% {
    transform: translateX(100%);
    opacity: 0.4;
  }

  100% {
    opacity: 0;
  }
}

.animate-ctaSweepSoft {
  animation: ctaSweepSoft 6s linear infinite;
}

@keyframes gradientShift {
  0% { transform: translate(0,0) scale(1); }
  50% { transform: translate(-5%, -5%) scale(1.1); }
  100% { transform: translate(0,0) scale(1); }
}

@keyframes beamMove {
  0% { transform: translateX(-50%); }
  100% { transform: translateX(0%); }
}

@keyframes beamMoveReverse {
  0% { transform: translateX(0%); }
  100% { transform: translateX(-50%); }
}

@keyframes waveFlow {
  0% { transform: translateX(0); }
  100% { transform: translateX(-200px); }
}

@keyframes waveFlowReverse {
  0% { transform: translateX(0); }
  100% { transform: translateX(200px); }
}

@keyframes slow-drift {
  0% { transform: translate(0, 0) scale(1); }
  33% { transform: translate(10%, 15%) scale(1.1); }
  66% { transform: translate(-5%, 8%) scale(0.9); }
  100% { transform: translate(0, 0) scale(1); }
}

@keyframes slow-drift-reverse {
  0% { transform: translate(0, 0) scale(1); }
  33% { transform: translate(-10%, -15%) scale(0.9); }
  66% { transform: translate(5%, -8%) scale(1.1); }
  100% { transform: translate(0, 0) scale(1); }
}

.animate-slow-drift {
  animation: slow-drift 25s ease-in-out infinite;
}

.animate-slow-drift-reverse {
  animation: slow-drift-reverse 30s ease-in-out infinite;
}

@theme inline {
  --font-heading: var(--font-sans);
  --font-sans: var(--font-sans);
  --color-sidebar-ring: var(--sidebar-ring);
  --color-sidebar-border: var(--sidebar-border);
  --color-sidebar-accent-foreground: var(--sidebar-accent-foreground);
  --color-sidebar-accent: var(--sidebar-accent);
  --color-sidebar-primary-foreground: var(--sidebar-primary-foreground);
  --color-sidebar-primary: var(--sidebar-primary);
  --color-sidebar-foreground: var(--sidebar-foreground);
  --color-sidebar: var(--sidebar);
  --color-chart-5: var(--chart-5);
  --color-chart-4: var(--chart-4);
  --color-chart-3: var(--chart-3);
  --color-chart-2: var(--chart-2);
  --color-chart-1: var(--chart-1);
  --color-ring: var(--ring);
  --color-input: var(--input);
  --color-border: var(--border);
  --color-destructive: var(--destructive);
  --color-accent-foreground: var(--accent-foreground);
  --color-accent: var(--accent);
  --color-muted-foreground: var(--muted-foreground);
  --color-muted: var(--muted);
  --color-secondary-foreground: var(--secondary-foreground);
  --color-secondary: var(--secondary);
  --color-primary-foreground: var(--primary-foreground);
  --color-primary: var(--primary);
  --color-popover-foreground: var(--popover-foreground);
  --color-popover: var(--popover);
  --color-card-foreground: var(--card-foreground);
  --color-card: var(--card);
  --color-foreground: var(--foreground);
  --color-background: var(--background);
  --radius-sm: calc(var(--radius) * 0.6);
  --radius-md: calc(var(--radius) * 0.8);
  --radius-lg: var(--radius);
  --radius-xl: calc(var(--radius) * 1.4);
  --radius-2xl: calc(var(--radius) * 1.8);
  --radius-3xl: calc(var(--radius) * 2.2);
  --radius-4xl: calc(var(--radius) * 2.6);
}

:root {
  --background: #000000; /* Pure black background */
  --foreground: oklch(0.985 0 0);
  --card: oklch(0.15 0 0);
  --card-foreground: oklch(0.985 0 0);
  --popover: oklch(0.15 0 0);
  --popover-foreground: oklch(0.985 0 0);
  --primary: oklch(0.537 0.25 281.3); /* Purple */
  --primary-foreground: oklch(0.985 0 0);
  --secondary: oklch(0.706 0.165 212.4); /* Cyan */
  --secondary-foreground: oklch(0.1 0 0);
  --muted: oklch(0.2 0 0);
  --muted-foreground: oklch(0.7 0 0);
  --accent: oklch(0.2 0 0);
  --accent-foreground: oklch(1 0 0);
  --destructive: oklch(0.577 0.245 27.325);
  --border: oklch(1 0 0 / 10%);
  --input: oklch(1 0 0 / 15%);
  --ring: oklch(0.537 0.25 281.3);
  --radius: 0.625rem;
}

.dark {
  --background: oklch(0.1 0 0);
  --foreground: oklch(0.985 0 0);
  --card: oklch(0.15 0 0);
  --card-foreground: oklch(0.985 0 0);
  --popover: oklch(0.15 0 0);
  --popover-foreground: oklch(0.985 0 0);
  --primary: oklch(0.537 0.25 281.3);
  --primary-foreground: oklch(0.985 0 0);
  --secondary: oklch(0.706 0.165 212.4);
  --secondary-foreground: oklch(0.1 0 0);
  --muted: oklch(0.2 0 0);
  --muted-foreground: oklch(0.7 0 0);
  --accent: oklch(0.2 0 0);
  --accent-foreground: oklch(1 0 0);
  --destructive: oklch(0.704 0.191 22.216);
  --border: oklch(1 0 0 / 10%);
  --input: oklch(1 0 0 / 15%);
  --ring: oklch(0.537 0.25 281.3);
}

@layer base {
  * {
    @apply border-border outline-ring/50;
  }
  html, body, #__next {
    height: 100%;
    width: 100%;
    margin: 0;
    padding: 0;
    overflow-x: hidden;
  }
  html {
    overflow-y: auto;
  }
  body {
    @apply bg-background text-foreground;
    display: flex;
    flex-direction: column;
  }
  #__next {
    display: flex;
    flex-direction: column;
  }
}
```


---
## FILE: client/src/app/layout.tsx

```tsx
import type { Metadata } from "next";
import { Inter, Outfit, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta-sans",
  subsets: ["latin"],
});

import { AuthProvider } from "@/components/AuthProvider";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "AI Animation Generator",
  description: "Generate 2D animations with AI",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable} ${plusJakartaSans.variable} dark`} style={{ fontFamily: 'var(--font-plus-jakarta-sans)' }}>
      <body className="w-screen flex flex-col bg-[#030303] text-[#ededed] font-sans antialiased selection:bg-primary/30">
        <AuthProvider>
          <Navbar />
          <main className="flex-1 w-full overflow-y-auto overflow-x-hidden">
            {children}
          </main>
        </AuthProvider>
      </body>
    </html>
  );
}

```


---
## FILE: client/src/app/login/page.tsx

```tsx
"use client";

import { useState } from "react";
import Image from "next/image";
import { useAuth } from "@/components/AuthProvider";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, Mail, Lock, AlertCircle } from "lucide-react";
import { authClient } from "@/lib/auth-client";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }
    setError("");
    try {
      setLoading(true);
      const { data, error: authError } = await authClient.signIn.email({ 
        email, 
        password,
        callbackURL: "/dashboard" 
      });

      if (authError) {
        throw new Error(authError.message || "Invalid credentials");
      }

      if (data?.token && data?.user) {
        login(data.token, data.user as any);
        router.push("/dashboard");
      }
    } catch (err: any) {
      setError(err.message || "Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center px-4 py-12 relative overflow-hidden bg-[#050505]">
      {/* Background decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/10 rounded-full blur-[120px] pointer-events-none opacity-50" />
      
      <div className="w-full max-w-md bg-[#141416] border border-white/5 rounded-3xl p-8 relative z-10 shadow-2xl">
        <div className="text-center mb-8">
          <Image
            src="/logo.png"
            alt="FlatMotion"
            width={220}
            height={55}
            className="h-20 w-auto mx-auto mb-4"
          />
          <h1 className="text-2xl font-bold text-white mb-2">Welcome Back</h1>
          <p className="text-gray-400 text-sm">Log in to continue to your dashboard</p>
        </div>

        {error && (
          <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center gap-3 text-red-400 text-sm">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <p>{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-gray-300 ml-1">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              <Input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                placeholder="hello@example.com" 
                disabled={loading}
                className="pl-10 bg-[#1a1a1f] border-white/10 h-11 focus-visible:ring-primary text-white"
              />
            </div>
          </div>
          
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-gray-300 ml-1">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              <Input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                placeholder="••••••••" 
                disabled={loading}
                className="pl-10 bg-[#1a1a1f] border-white/10 h-11 focus-visible:ring-primary text-white"
              />
            </div>
          </div>

          <Button 
            type="submit" 
            disabled={loading || !email || !password}
            className="w-full h-12 rounded-full mt-8 bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-opacity text-white text-base font-semibold border-0"
          >
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Sign in"}
          </Button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-8">
          Don't have an account?{" "}
          <Link href="/register" className="text-primary hover:text-primary/80 font-medium transition-colors">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}

```


---
## FILE: client/src/app/not-found.tsx

```tsx
"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="relative w-full min-h-screen bg-black flex flex-col items-center justify-center overflow-hidden px-4">
      {/* Animated background grid */}
      <svg className="absolute inset-0 w-full h-full opacity-5">
        <defs>
          <pattern
            id="grid"
            width="40"
            height="40"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 40 0 L 0 0 0 40"
              fill="none"
              stroke="rgba(255,255,255,0.1)"
              strokeWidth="1"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>

      {/* Animated gradient blobs */}
      <div className="absolute top-[-40%] right-[-20%] w-[500px] h-[500px] rounded-full bg-primary/5 blur-[100px] animate-slow-drift" />
      <div className="absolute bottom-[-30%] left-[-10%] w-[400px] h-[400px] rounded-full bg-secondary/5 blur-[100px] animate-slow-drift-reverse" />

      <div className="relative z-10 flex flex-col items-center justify-center text-center">
        {/* Logo */}
        <div className="mb-12">
          <Image
            src="/logo.png"
            alt="FlatMotion"
            width={180}
            height={45}
            className="h-16 w-auto opacity-80 mb-8"
          />
        </div>

        {/* Large 404 with animation */}
        <div className="mb-8">
          <h1 className="text-9xl sm:text-[150px] font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-primary animate-pulse mb-4">
            404
          </h1>
          <div className="flex items-center justify-center gap-4 text-4xl sm:text-5xl mb-6">
            <span className="text-white/80">The equation</span>
            <svg
              className="w-12 h-12 animate-spin"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="12" cy="12" r="1" fill="currentColor" />
              <path d="M12 5v14M5 12h14" strokeLinecap="round" />
            </svg>
            <span className="text-white/80">=</span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary to-primary">
              ?
            </span>
          </div>
        </div>

        {/* Descriptive text */}
        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
          Page Not Found
        </h2>

        <p className="text-lg text-gray-400 max-w-md mb-12 leading-relaxed">
          This page doesn't exist in our mathematical universe. Like an unsolved equation, we can't render this route. Let's get you back on track.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <button
            onClick={() => router.back()}
            className="px-8 py-3 rounded-full border border-white/20 text-white font-semibold hover:border-primary/50 hover:bg-primary/5 transition-all hover:scale-105"
          >
            ← Go Back
          </button>
          <Link
            href="/"
            className="px-8 py-3 rounded-full bg-gradient-to-r from-primary to-secondary text-white font-semibold hover:shadow-[0_0_20px_rgba(124,58,237,0.3)] transition-all hover:scale-105"
          >
            Back to Home
          </Link>
          <Link
            href="/dashboard"
            className="px-8 py-3 rounded-full bg-white/10 text-white font-semibold hover:bg-white/20 transition-all hover:scale-105"
          >
            Go to Dashboard
          </Link>
        </div>

        {/* Mathematical ASCII art */}
        <div className="mt-16 text-center text-gray-600 font-mono text-xs sm:text-sm leading-relaxed">
          <p className="mb-4">Error Code Analysis:</p>
          <div className="inline-block rounded-lg bg-black/50 border border-white/5 p-6">
            <p>∫ f(x) dx = ∞ (infinite redirects)</p>
            <p>∂/∂t (page) = undefined</p>
            <p>f⁻¹(404) ≠ valid_route</p>
          </div>
        </div>
      </div>

      {/* Floating mathematical symbols */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[
          { text: "∑", top: "10%", left: "5%", delay: 0 },
          { text: "∞", top: "20%", right: "8%", delay: 1 },
          { text: "π", bottom: "15%", left: "10%", delay: 2 },
          { text: "∂", top: "40%", right: "5%", delay: 3 },
          { text: "∫", bottom: "30%", right: "15%", delay: 4 },
          { text: "√", top: "60%", left: "8%", delay: 5 },
        ].map((symbol, i) => (
          <div
            key={i}
            className="absolute text-3xl sm:text-5xl opacity-10 animate-float"
            style={{
              top: symbol.top,
              bottom: symbol.bottom,
              left: symbol.left,
              right: symbol.right,
              animation: `float 6s ease-in-out infinite`,
              animationDelay: `${symbol.delay * 0.5}s`,
            }}
          >
            {symbol.text}
          </div>
        ))}
      </div>

      <style>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }
      `}</style>
    </div>
  );
}

```


---
## FILE: client/src/app/page.tsx

```tsx
// client/src/app/page.tsx
"use client";

import Link from "next/link";
import { useAuth } from "@/components/AuthProvider";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import BackgroundShader from "@/components/BackgroundShader";
import Image from "next/image";
import LoadingSpinner from "@/components/LoadingSpinner";

/**
 * Redesigned LandingPage to match the AI Animation Studio aesthetic.
 * Integrates an animated shader background and a modern, high-impact Hero section.
 */
export default function LandingPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  // Redirect to dashboard if already logged in
  useEffect(() => {
    if (!loading && user) {
      router.push("/dashboard");
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <LoadingSpinner size="lg" message="Loading FlatMotion..." />
      </div>
    );
  }

  // To prevent flash of landing page while redirecting
  if (user) {
    return null; 
  }

  return (
    // <div className="relative w-full bg-black">
    <div className="relative w-full ">

      {/* Dynamic Background */}
      <BackgroundShader />

      <main className="relative z-10 w-full">
   {/* HERO SECTION */}
<section className="relative w-full max-w-7xl mx-auto px-4 pt-32 pb-24 flex flex-col items-center text-center overflow-hidden">

  {/* Animated Math Layer */}
  <svg
    className="absolute inset-0 w-full h-full opacity-20"
    viewBox="0 0 1200 400"
    preserveAspectRatio="none"
  >
    {/* wave 1 */}
    <path
      d="M0 200 Q150 100 300 200 T600 200 T900 200 T1200 200"
      stroke="url(#heroGradient)"
      strokeWidth="2"
      fill="none"
      className="animate-[waveFlow_8s_linear_infinite]"
    />

    {/* wave 2 */}
    <path
      d="M0 250 Q200 150 400 250 T800 250 T1200 250"
      stroke="url(#heroGradient)"
      strokeWidth="1.5"
      fill="none"
      opacity="0.6"
      className="animate-[waveFlowReverse_10s_linear_infinite]"
    />

    {/* moving particle */}
    <circle r="5" fill="url(#heroGradient)">
      <animateMotion
        dur="8s"
        repeatCount="indefinite"
        path="M0 200 Q150 100 300 200 T600 200 T900 200 T1200 200"
      />
    </circle>

    <defs>
      <linearGradient id="heroGradient" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor="#7C3AED" />
        <stop offset="100%" stopColor="#06B6D4" />
      </linearGradient>
    </defs>
  </svg>

  {/* Badge */}
  <div className="relative z-10 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.03] border border-white/10 mb-10 backdrop-blur-md">
    <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
    <span className="text-xs tracking-widest text-secondary uppercase">
      Mathematical Animations Generator
    </span>
  </div>

  {/* HEADLINE */}
  <h1 className="relative z-10 text-4xl sm:text-5xl md:text-6xl font-black tracking-[-0.04em] text-white mb-8 leading-[1.05]">
    Animate <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7C3AED] to-[#06B6D4]">Mathematics</span><br />
    Like Never Before
  </h1>

  {/* Floating equation */}
  <div className="absolute top-[20%] text-white/10 text-xl font-mono animate-pulse">
    y = sin(x + t)
  </div>

  {/* DESCRIPTION */}
  <p className="relative z-10 text-lg md:text-xl text-gray-400 mb-12 max-w-2xl">
    Turn equations into living systems. Visualize change, motion, and structure — powered by AI.
  </p>

  {/* CTA */}
<Link
  href="/login"
  className="relative z-10 group px-12 py-5 rounded-full bg-gradient-to-r from-[#7C3AED] to-[#06B6D4] text-white font-bold text-lg overflow-hidden animate-ctaGlowSoft hover:scale-[1.02] transition-all duration-300"
>
  <span className="relative z-10">Start Creating</span>

  {/* subtle sweep */}
  <div className="absolute inset-0 overflow-hidden rounded-full pointer-events-none">
    <div className="absolute top-0 left-[-100%] w-[200%] h-full bg-gradient-to-r from-transparent via-white/10 to-transparent animate-ctaSweepSoft" />
  </div>
</Link>

  {/* subtle grid */}
  <div
    className="absolute inset-0 opacity-[0.03]"
    style={{
      backgroundImage:
        "linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)",
      backgroundSize: "80px 80px",
    }}
  />
</section>


{/* CTA Section */}
<section className="w-full py-32 relative overflow-hidden bg-black">

  {/* Background Glow */}
  <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-secondary/10 blur-3xl opacity-40" />

  {/* SVG WAVE */}
  <svg
    className="absolute inset-0 w-full h-full opacity-30"
    viewBox="0 0 1200 300"
    preserveAspectRatio="none"
  >
    {/* sine wave */}
    <path
      d="M0 150 Q150 50 300 150 T600 150 T900 150 T1200 150"
      fill="none"
      stroke="url(#waveGradient)"
      strokeWidth="3"
      className="animate-[waveMove_6s_linear_infinite]"
    />

    {/* glowing dot moving */}
    <circle r="6" fill="url(#waveGradient)">
      <animateMotion
        dur="6s"
        repeatCount="indefinite"
        path="M0 150 Q150 50 300 150 T600 150 T900 150 T1200 150"
      />
    </circle>

    {/* gradient */}
    <defs>
      <linearGradient id="waveGradient" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor="#7C3AED" />
        <stop offset="100%" stopColor="#06B6D4" />
      </linearGradient>
    </defs>
  </svg>

  {/* CONTENT */}
  <div className="max-w-4xl mx-auto text-center px-4 relative z-10">
    <h2 className="text-5xl font-bold mb-6 text-white">
      Bring <span className="text-gradient">Mathematics</span> to Life
    </h2>

    <p className="text-xl text-gray-400 mb-10 max-w-xl mx-auto">
      Watch equations evolve, curves move, and ideas animate in real time.
    </p>

<Link
  href="/login"
  className="relative z-10 group px-12 py-5 rounded-full bg-gradient-to-r from-[#7C3AED] to-[#06B6D4] text-white font-bold text-lg overflow-hidden animate-ctaGlowSoft hover:scale-[1.02] transition-all duration-300"
>
  <span className="relative z-10">Start Creating</span>

  {/* subtle sweep */}
  <div className="absolute inset-0 overflow-hidden rounded-full pointer-events-none">
    <div className="absolute top-0 left-[-100%] w-[200%] h-full bg-gradient-to-r from-transparent via-white/10 to-transparent animate-ctaSweepSoft" />
  </div>
</Link>

  </div>

  {/* GRID overlay for depth */}
  <div
    className="absolute inset-0 opacity-[0.05]"
    style={{
      backgroundImage:
        "linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)",
      backgroundSize: "60px 60px",
    }}
  />
</section>
      </main>

      {/* Footer */}
      <footer className="w-full border-t border-white/5 py-12 flex flex-col items-center text-center bg-black/50 backdrop-blur-sm relative z-10">
        <div className="flex items-center gap-2 mb-6">
          <Image
            src="/logo.png"
            alt="FlatMotion"
            width={240}
            height={60}
            className="h-20 w-auto"
          />
        </div>
        <div className="flex gap-8 mb-8 text-gray-400 flex-wrap justify-center">
          <Link href="#" className="text-sm hover:text-white transition-colors">Privacy</Link>
          <Link href="#" className="text-sm hover:text-white transition-colors">Terms</Link>
          <Link href="#" className="text-sm hover:text-white transition-colors">Documentation</Link>
          <Link href="#" className="text-sm hover:text-white transition-colors">Community</Link>
        </div>
        <p className="text-gray-500 text-sm">&copy; {new Date().getFullYear()} FlatMotion. Create beautiful mathematical animations with AI.</p>
      </footer>
    </div>
  );
}

```


---
## FILE: client/src/app/register/page.tsx

```tsx
"use client";

import { useState } from "react";
import Image from "next/image";
import { useAuth } from "@/components/AuthProvider";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, Mail, Lock, User, AlertCircle } from "lucide-react";
import { authClient } from "@/lib/auth-client";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !password) {
      setError("Please fill in all fields");
      return;
    }
    if (password.length < 8) {
      setError("Password must be at least 8 characters");
      return;
    }
    setError("");
    try {
      setLoading(true);
      const { data, error: authError } = await authClient.signUp.email({ 
        email, 
        password, 
        name,
        callbackURL: "/dashboard" 
      });

      if (authError) {
        throw new Error(authError.message || "Failed to create account");
      }

      if (data?.token && data?.user) {
        login(data.token, data.user as any);
        router.push("/dashboard");
      }
    } catch (err: any) {
      setError(err.message || "Failed to create account");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center px-4 py-12 relative overflow-hidden bg-[#050505]">
      {/* Background decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-secondary/10 rounded-full blur-[120px] pointer-events-none opacity-50" />
      
      <div className="w-full max-w-md bg-[#141416] border border-white/5 rounded-3xl p-8 relative z-10 shadow-2xl">
        <div className="text-center mb-8">
          <Image
            src="/logo.png"
            alt="FlatMotion"
            width={220}
            height={55}
            className="h-20 w-auto mx-auto mb-4"
          />
          <h1 className="text-2xl font-bold text-white mb-2">Create Account</h1>
          <p className="text-gray-400 text-sm">Join FlatMotion to start animating</p>
        </div>

        {error && (
          <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center gap-3 text-red-400 text-sm">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <p>{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-gray-300 ml-1">Full Name</label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              <Input 
                type="text" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="John Doe" 
                disabled={loading}
                className="pl-10 bg-[#1a1a1f] border-white/10 h-11 focus-visible:ring-secondary text-white"
              />
            </div>
          </div>
          
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-gray-300 ml-1">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              <Input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="hello@example.com" 
                disabled={loading}
                className="pl-10 bg-[#1a1a1f] border-white/10 h-11 focus-visible:ring-secondary text-white"
              />
            </div>
          </div>
          
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-gray-300 ml-1">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              <Input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••" 
                disabled={loading}
                className="pl-10 bg-[#1a1a1f] border-white/10 h-11 focus-visible:ring-secondary text-white"
              />
            </div>
          </div>

          <Button 
            type="submit" 
            disabled={loading || !email || !password || !name}
            className="w-full h-12 rounded-full mt-8 bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-opacity text-white text-base font-semibold border-0"
          >
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Sign up"}
          </Button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-8">
          Already have an account?{" "}
          <Link href="/login" className="text-secondary hover:text-secondary/80 font-medium transition-colors">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}

```


---
## FILE: client/src/app/studio/[slug]/page.tsx

```tsx
'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { useParams, useSearchParams } from 'next/navigation';
import {
  Room,
  RoomEvent,
  RemoteParticipant,
  ParticipantEvent,
  Track,
} from 'livekit-client';
import '@livekit/components-styles';
import { useLiveKitRoom } from '../../../hooks/useLiveKitRoom';
import { useSyncedRecording } from '../../../hooks/useSyncedRecording';
import { VideoTile } from '../../../components/studio/VideoTile';
import { GreenRoomModal } from '../../../components/studio/GreenRoomModal';
import { Mic, MicOff, Video, VideoOff, Link2, Loader2 } from 'lucide-react';

// Wrapper to robustly attach tracks for remote participants
function RemoteVideoTile({ participant, isRecording }: { participant: RemoteParticipant; isRecording: boolean }) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (!videoRef.current) return;
    const el = videoRef.current;

    const attach = (track: Track) => {
      if (track.kind === Track.Kind.Video) {
        track.attach(el);
      }
    };

    // 1. If already subscribed when component mounts, attach
    participant.videoTrackPublications.forEach((pub) => {
      if (pub.isSubscribed && pub.track) attach(pub.track);
    });

    // 2. Listen for future track subscriptions on this participant
    const onSubscribed = (track: Track) => attach(track);
    participant.on(ParticipantEvent.TrackSubscribed, onSubscribed);

    return () => {
      participant.off(ParticipantEvent.TrackSubscribed, onSubscribed);
      participant.videoTrackPublications.forEach((pub) => {
        if (pub.track) pub.track.detach(el);
      });
    };
  }, [participant]);

  return (
    <div className="relative w-full aspect-video bg-[#0a0a0a] rounded-2xl overflow-hidden border border-white/10 shadow-xl">
      <video
        ref={videoRef}
        autoPlay
        playsInline
        className="w-full h-full object-cover"
      />

      {/* REC badge for remote */}
      {isRecording && (
        <div className="absolute top-3 left-3 z-10 flex items-center gap-1.5 bg-red-500/90 backdrop-blur-sm text-white text-xs font-bold px-3 py-1 rounded-full">
          <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
          REC
        </div>
      )}

      {/* Name label */}
      <div className="absolute bottom-0 left-0 right-0 px-4 py-3 bg-gradient-to-t from-black/80 to-transparent">
        <span className="text-sm font-medium text-white">
          {participant.name || participant.identity}
        </span>
      </div>
    </div>
  );
}

export default function StudioRoomPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const slug = params.slug as string;
  const isInvite = searchParams.get('invite') === 'true';

  // LiveKit room instance stored in state so hooks can re-subscribe when it changes
  const [room, setRoom] = useState<Room | null>(null);

  // Video refs
  const localVideoRef = useRef<HTMLVideoElement>(null);

  // Participant state
  const [remoteParticipants, setRemoteParticipants] = useState<RemoteParticipant[]>([]);
  const [localName, setLocalName] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const [isConnected, setIsConnected] = useState(false);

  // Media state
  const [localStream, setLocalStream] = useState<MediaStream | null>(null);
  const [recordingStream, setRecordingStream] = useState<MediaStream | null>(null);
  const [isMicEnabled, setIsMicEnabled] = useState(true);
  const [isCamEnabled, setIsCamEnabled] = useState(true);

  // UI state
  const [showGreenRoom, setShowGreenRoom] = useState(isInvite);
  const [copySuccess, setCopySuccess] = useState(false);
  const [connectError, setConnectError] = useState<string | null>(null);
  const [isJoining, setIsJoining] = useState(false);

  const { fetchToken } = useLiveKitRoom();

  // Stable unique track ID per page session
  const trackId = useRef(`track-${slug}-${Date.now()}`).current;

  // Synced recording hook — re-activates whenever room is set
  const { isRecording, recordingTime, countdown, hasPendingChunks, broadcastStart, broadcastStop } =
    useSyncedRecording({
      trackId,
      room,
      isAdmin,
      recordingStream,
    });

  // Setup local camera/mic stream and clone it for recording
  const setupLocalMedia = useCallback(async (): Promise<MediaStream> => {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: { width: { ideal: 1280 }, height: { ideal: 720 }, frameRate: { ideal: 30 } },
      audio: { echoCancellation: true, noiseSuppression: true, sampleRate: 48000 },
    });
    setLocalStream(stream);

    // High-quality recording stream — independent clone so network degradation
    // on the LiveKit stream never affects local recording quality
    const cloned = stream.clone();
    setRecordingStream(cloned);

    if (localVideoRef.current) {
      localVideoRef.current.srcObject = stream;
    }
    return stream;
  }, []);

  // Connect to LiveKit room and publish local tracks
  const connectToRoom = useCallback(async (token: string, url: string, stream: MediaStream): Promise<Room> => {
    const livekitRoom = new Room({ adaptiveStream: true, dynacast: true });

    livekitRoom.on(RoomEvent.Connected, () => {
      console.log(`[LiveKit] Connected to room "${slug}"`);
      setIsConnected(true);
    });

    livekitRoom.on(RoomEvent.ParticipantConnected, (participant: RemoteParticipant) => {
      console.log(`[LiveKit] Participant connected: ${participant.identity}`);
      setRemoteParticipants(prev => [...prev, participant]);
    });

    livekitRoom.on(RoomEvent.ParticipantDisconnected, (participant: RemoteParticipant) => {
      console.log(`[LiveKit] Participant disconnected: ${participant.identity}`);
      setRemoteParticipants(prev => prev.filter(p => p.identity !== participant.identity));
    });

    livekitRoom.on(RoomEvent.Disconnected, () => {
      setIsConnected(false);
      console.log('[LiveKit] Disconnected from room');
    });

    await livekitRoom.connect(url, token);

    // Add any existing participants (e.g. host already in room when guest joins)
    const existing = Array.from(livekitRoom.remoteParticipants.values());
    if (existing.length > 0) {
      setRemoteParticipants(prev => {
        const fresh = existing.filter((ex) => !prev.some(p => p.identity === ex.identity));
        return [...prev, ...fresh];
      });
    }

    // Publish tracks to LiveKit for live preview (uses original stream)
    const audioTrack = stream.getAudioTracks()[0];
    const videoTrack = stream.getVideoTracks()[0];
    if (audioTrack) await livekitRoom.localParticipant.publishTrack(audioTrack);
    if (videoTrack) await livekitRoom.localParticipant.publishTrack(videoTrack);

    return livekitRoom;
  }, [slug]);

  // Main join flow — handles both host auto-join and guest manual join
  const joinRoom = useCallback(async (displayName?: string) => {
    setIsJoining(true);
    setConnectError(null);

    try {
      const info = await fetchToken(slug, displayName);
      if (!info) throw new Error('Failed to get room token');

      setIsAdmin(info.isAdmin);
      setLocalName(info.displayName);

      const stream = await setupLocalMedia();
      const livekitRoom = await connectToRoom(info.token, info.url, stream);

      // Set room in state → triggers useSyncedRecording to re-subscribe
      setRoom(livekitRoom);
      setShowGreenRoom(false);

      const role = info.isAdmin ? 'Host' : 'Guest';
      console.log(`[LiveKit] Joined room as ${role} | name="${info.displayName}" room="${slug}"`);
    } catch (err: any) {
      setConnectError(err.message || 'Failed to join room');
    } finally {
      setIsJoining(false);
    }
  }, [slug, fetchToken, setupLocalMedia, connectToRoom]);

  // Auto-join if host (authenticated user, no invite param)
  useEffect(() => {
    if (!isInvite) {
      joinRoom();
    }

    return () => {
      room?.disconnect();
      localStream?.getTracks().forEach(t => t.stop());
      recordingStream?.getTracks().forEach(t => t.stop());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const toggleMic = () => {
    if (!localStream) return;
    const next = !isMicEnabled;
    localStream.getAudioTracks().forEach(t => { t.enabled = next; });
    setIsMicEnabled(next);
  };

  const toggleCam = () => {
    if (!localStream) return;
    const next = !isCamEnabled;
    localStream.getVideoTracks().forEach(t => { t.enabled = next; });
    setIsCamEnabled(next);
  };

  const copyInviteLink = () => {
    const url = `${window.location.origin}/studio/${slug}?invite=true`;
    navigator.clipboard.writeText(url);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2500);
  };

  const formatTime = (s: number) => new Date(s * 1000).toISOString().substring(11, 19);

  return (
    <div className="min-h-screen bg-[#030303] flex flex-col">

      {/* Guest Green Room Modal */}
      {showGreenRoom && (
        <GreenRoomModal isLoading={isJoining} onJoin={(name) => joinRoom(name)} />
      )}

      {/* Top Header */}
      <div className="h-14 border-b border-white/10 bg-black/50 backdrop-blur-xl flex items-center justify-between px-6 shrink-0">
        <div className="flex items-center gap-3">
          <span className="text-lg font-bold tracking-widest text-white">RECORA</span>
          <span className="text-gray-600 text-sm">·</span>
          <span className="text-sm text-gray-400 font-mono">{slug}</span>
        </div>

        <div className="flex items-center gap-3">
          {/* Syncing badge */}
          {hasPendingChunks && !isRecording && (
            <div className="flex items-center gap-2 text-xs text-amber-400 bg-amber-400/10 border border-amber-400/20 px-3 py-1.5 rounded-full">
              <Loader2 className="w-3 h-3 animate-spin" />
              Syncing...
            </div>
          )}

          {/* Recording timer */}
          {isRecording && (
            <div className="flex items-center gap-2 bg-red-500/20 border border-red-500/30 text-red-400 px-4 py-1.5 rounded-full text-sm font-mono font-semibold">
              <span className="w-2 h-2 bg-red-400 rounded-full animate-pulse" />
              🔴 RECORDING {formatTime(recordingTime)}
            </div>
          )}

          {/* Copy invite link */}
          <button
            onClick={copyInviteLink}
            className="flex items-center gap-2 text-sm px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-gray-300 hover:text-white transition-all"
          >
            <Link2 className="w-4 h-4" />
            {copySuccess ? '✓ Copied!' : 'Copy Invite Link'}
          </button>
        </div>
      </div>

      {/* Video Grid */}
      <div className="flex-1 p-6 overflow-hidden">
        {connectError && (
          <div className="mb-4 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm text-center">
            {connectError}
          </div>
        )}

        <div
          className={`h-full grid gap-4 ${
            remoteParticipants.length > 0 ? 'grid-cols-2' : 'grid-cols-1 max-w-4xl mx-auto w-full'
          }`}
        >
          {/* Local (self) tile */}
          <VideoTile
            videoRef={localVideoRef}
            stream={localStream}
            name={localName || 'You'}
            isHost={isAdmin}
            isRecording={isRecording}
            isSelf
            isCamEnabled={isCamEnabled}
            countdown={countdown}
            muted
          />

          {/* Remote participant tiles */}
          {remoteParticipants.map((participant) => (
            <RemoteVideoTile
              key={participant.identity}
              participant={participant}
              isRecording={isRecording}
            />
          ))}

          {/* Waiting placeholder tile */}
          {isConnected && remoteParticipants.length === 0 && (
            <div className="relative w-full aspect-video bg-[#0a0a0a] rounded-2xl overflow-hidden border border-dashed border-white/15 flex items-center justify-center">
              <div className="text-center px-6">
                <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mx-auto mb-3">
                  <VideoOff className="w-7 h-7 text-gray-600" />
                </div>
                <p className="text-gray-500 text-sm mb-2">Waiting for participants...</p>
                <button
                  onClick={copyInviteLink}
                  className="text-xs text-[#00f0ff]/60 hover:text-[#00f0ff] flex items-center gap-1 mx-auto transition-colors"
                >
                  <Link2 className="w-3 h-3" />
                  {copySuccess ? 'Link copied!' : 'Share invite link'}
                </button>
              </div>
            </div>
          )}

          {/* Not yet connected loading state */}
          {!isConnected && !showGreenRoom && (
            <div className="relative w-full aspect-video bg-[#0a0a0a] rounded-2xl overflow-hidden border border-white/10 flex items-center justify-center">
              <div className="flex flex-col items-center gap-3 text-gray-500">
                <Loader2 className="w-8 h-8 animate-spin text-[#00f0ff]/50" />
                <span className="text-sm">Connecting to studio...</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Bottom Control Bar */}
      {(isConnected || isJoining) && (
        <div className="h-20 border-t border-white/10 bg-black/60 backdrop-blur-xl flex items-center justify-center gap-4 px-8 shrink-0">

          {/* Mic toggle */}
          <button
            onClick={toggleMic}
            title={isMicEnabled ? 'Mute mic' : 'Unmute mic'}
            className={`p-4 rounded-full transition-all ${
              isMicEnabled
                ? 'bg-white/10 hover:bg-white/20 text-white'
                : 'bg-red-500 hover:bg-red-600 text-white'
            }`}
          >
            {isMicEnabled ? <Mic className="w-5 h-5" /> : <MicOff className="w-5 h-5" />}
          </button>

          {/* Camera toggle */}
          <button
            onClick={toggleCam}
            title={isCamEnabled ? 'Turn off camera' : 'Turn on camera'}
            className={`p-4 rounded-full transition-all ${
              isCamEnabled
                ? 'bg-white/10 hover:bg-white/20 text-white'
                : 'bg-red-500 hover:bg-red-600 text-white'
            }`}
          >
            {isCamEnabled ? <Video className="w-5 h-5" /> : <VideoOff className="w-5 h-5" />}
          </button>

          {/* HOST ONLY — Recording button */}
          {isAdmin && (
            <button
              onClick={() => (isRecording ? broadcastStop() : broadcastStart())}
              disabled={countdown !== null}
              className={`px-8 py-3 ml-4 rounded-full font-semibold text-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed ${
                isRecording
                  ? 'bg-red-500 hover:bg-red-600 border border-red-400 text-white shadow-[0_0_20px_rgba(239,68,68,0.4)]'
                  : 'bg-[#00f0ff]/20 hover:bg-[#00f0ff]/30 text-[#00f0ff] border border-[#00f0ff]/50 shadow-[0_0_20px_rgba(0,240,255,0.2)]'
              }`}
            >
              {countdown !== null
                ? `Starting in ${countdown}...`
                : isRecording
                ? '⏹ Stop Recording'
                : '⏺ Start Recording'}
            </button>
          )}

          {/* Guest: waiting hint */}
          {!isAdmin && !isRecording && (
            <p className="ml-4 text-xs text-gray-600 italic">
              Waiting for host to start recording...
            </p>
          )}
        </div>
      )}
    </div>
  );
}

```


---
## FILE: client/src/components/AuthProvider.tsx

```tsx
"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { getCurrentUser } from "@/lib/api";

export interface User {
  id: string;
  name: string;
  email: string;
  role?: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (token: string, user: User) => void;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      console.log("[AuthProvider] Token found in localStorage, verifying session...");
      setToken(storedToken);
      getCurrentUser()
        .then((data) => {
          console.log("[AuthProvider] Session verification SUCCESS:", data);
          if (data && data.user) {
            setUser(data.user);
          } else {
            console.warn("[AuthProvider] Session data invalid or missing user:", data);
            throw new Error("Invalid session");
          }
        })
        .catch((err) => {
          console.error("[AuthProvider] Session verification FAILED:", err.message);
          localStorage.removeItem("token");
          setToken(null);
          setUser(null);
        })
        .finally(() => setLoading(false));
    } else {
      console.log("[AuthProvider] No token found in localStorage.");
      setLoading(false);
    }
  }, []);

  const login = (newToken: string, newUser: User) => {
    localStorage.setItem("token", newToken);
    setToken(newToken);
    setUser(newUser);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

```


---
## FILE: client/src/components/BackgroundShader.tsx

```tsx
"use client";

export default function BackgroundShader() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">

      {/* MAIN PURPLE GLOW (breathing) */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-[1200px] h-[1200px] bg-purple-600/30 rounded-full blur-[160px] animate-glowPulse" />
      </div>

      {/* SECONDARY CYAN GLOW (slight offset) */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-[1000px] h-[1000px] bg-cyan-400/20 rounded-full blur-[140px] animate-glowPulseDelay" />
      </div>

    </div>
  );
}
```


---
## FILE: client/src/components/FlatMotionLogo.tsx

```tsx
import { cn } from '@/lib/utils';

interface FlatMotionLogoProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export default function FlatMotionLogo({ size = 'md', className }: FlatMotionLogoProps) {
  const sizeClasses = {
    sm: 'w-8 h-8 text-xs',
    md: 'w-12 h-12 text-xl',
    lg: 'w-16 h-16 text-2xl',
  };

  return (
    <div
      className={cn(
        'rounded-xl bg-gradient-to-br from-[#7C3AED] to-[#06B6D4] flex items-center justify-center flex-shrink-0 font-bold text-white tracking-tight shadow-lg shadow-purple-500/20',
        sizeClasses[size],
        className,
      )}
      aria-label="FlatMotion"
    >
      F~
    </div>
  );
}

```


---
## FILE: client/src/components/LoadingSpinner.tsx

```tsx
"use client";

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg";
  fullScreen?: boolean;
  message?: string;
}

export default function LoadingSpinner({
  size = "md",
  fullScreen = false,
  message,
}: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-12 h-12",
    lg: "w-16 h-16",
  };

  const spinner = (
    <div className="flex flex-col items-center justify-center gap-4">
      {/* Main spinning circle with gradient */}
      <div className="relative">
        {/* Outer rotating ring */}
        <div
          className={`${sizeClasses[size]} rounded-full border-2 border-transparent border-t-primary border-r-secondary animate-spin`}
        />

        {/* Inner pulsing core */}
        <div
          className={`absolute inset-0 rounded-full border border-primary/30 animate-pulse`}
        />

        {/* Glowing center dot */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-gradient-to-r from-primary to-secondary animate-pulse shadow-[0_0_8px_rgba(124,58,237,0.8)]" />
        </div>
      </div>

      {/* Loading text with animation */}
      {message && (
        <div className="text-center">
          <p className="text-gray-300 text-sm font-medium">{message}</p>
          <div className="flex gap-1 justify-center mt-2">
            <span className="w-1 h-1 rounded-full bg-primary animate-bounce" />
            <span
              className="w-1 h-1 rounded-full bg-secondary animate-bounce"
              style={{ animationDelay: "0.1s" }}
            />
            <span
              className="w-1 h-1 rounded-full bg-primary animate-bounce"
              style={{ animationDelay: "0.2s" }}
            />
          </div>
        </div>
      )}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50">
        <div className="bg-black/80 border border-white/10 rounded-2xl px-8 py-12 backdrop-blur-xl">
          {spinner}
        </div>
      </div>
    );
  }

  return spinner;
}

```


---
## FILE: client/src/components/LoadingSpinnerCustom.tsx

```tsx
import { cn } from '@/lib/utils';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  variant?: 'dots' | 'ring' | 'pulse';
  label?: string;
  className?: string;
}

export default function LoadingSpinner({
  size = 'md',
  variant = 'ring',
  label = 'Loading',
  className,
}: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-10 h-10',
    lg: 'w-16 h-16',
  };

  const dotSizeClasses = {
    sm: 'w-1.5 h-1.5',
    md: 'w-2 h-2',
    lg: 'w-3 h-3',
  };

  return (
    <div className={cn('flex flex-col items-center justify-center gap-3', className)}>
      {variant === 'ring' && (
        <div className={cn('relative', sizeClasses[size])}>
          {/* Outer rotating ring */}
          <div
            className={cn(
              'absolute inset-0 rounded-full border-2 border-transparent border-t-[#7C3AED] border-r-[#06B6D4] animate-spin',
              sizeClasses[size],
            )}
          />
          {/* Inner pulsing glow */}
          <div
            className={cn(
              'absolute inset-1 rounded-full bg-gradient-to-r from-[#7C3AED]/20 to-[#06B6D4]/20 animate-pulse',
              'shadow-lg shadow-purple-500/30',
            )}
          />
        </div>
      )}

      {variant === 'dots' && (
        <div className="flex items-center gap-1.5">
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className={cn(
                'rounded-full bg-gradient-to-r from-[#7C3AED] to-[#06B6D4] animate-bounce',
                dotSizeClasses[size],
              )}
              style={{ animationDelay: `${i * 0.15}s` }}
            />
          ))}
        </div>
      )}

      {variant === 'pulse' && (
        <div
          className={cn(
            'rounded-full bg-gradient-to-br from-[#7C3AED] to-[#06B6D4]',
            'animate-pulse shadow-lg shadow-purple-500/40',
            sizeClasses[size],
          )}
        />
      )}

      {label && <p className="text-sm text-gray-400 font-medium">{label}</p>}
    </div>
  );
}

```


---
## FILE: client/src/components/Navbar.tsx

```tsx
"use client";

import Link from "next/link";
import { useAuth } from "./AuthProvider";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useState } from "react";
import Image from "next/image";

/**
 * Navbar component redesigned to match the modern SaaS aesthetic in the reference.
 * Includes placeholder links for Projects, Templates, and Pricing.
 * Handles active state for the Dashboard link.
 */
export default function Navbar() {
  const { user, logout, loading } = useAuth();
  const pathname = usePathname();

  if (pathname.startsWith('/dashboard')) return null;

  const navLinks: { name: string, href: string }[] = [
    { name: "Dashboard", href: "/dashboard" },
  ];

  if (user?.role === "ADMIN") {
    navLinks.push({ name: "Admin Panel", href: "/admin" });
  }

  return (
    <>
      <nav className="flex-shrink-0 border-b border-white/5 bg-black/40 backdrop-blur-xl h-16 sm:h-20 flex items-center w-full">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-full">
          <div className="flex items-center gap-12">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 group hover:opacity-80 transition-opacity">
              <Image
                src="/logo.png"
                alt="FlatMotion"
                width={220}
                height={55}
                className="h-20 w-auto"
                priority
              />
            </Link>

            {/* Nav Links - Desktop only */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => {
                const isActive = pathname === link.href || (link.name === 'Dashboard' && pathname === '/dashboard');
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={cn(
                      "text-sm font-medium transition-all relative py-2 font-outfit",
                      isActive
                        ? "text-white after:absolute after:bottom-[-20px] sm:after:bottom-[-26px] after:left-0 after:right-0 after:h-[2px] after:bg-primary shadow-[0_8px_16px_-4px_rgba(124,58,237,0.3)]"
                        : "text-gray-400 hover:text-white"
                    )}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </div>
          </div>

          <div className="flex items-center gap-4 sm:gap-6">
            {!loading && (
              user ? (
                <>
                  <div className="flex items-center gap-3 pl-2 border-l border-white/10 ml-2">
                    <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[10px] sm:text-xs font-bold text-gray-400 hover:border-primary/50 transition-colors cursor-pointer overflow-hidden">
                      {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                    </div>
                    <button
                      onClick={logout}
                      className="hidden sm:block text-xs font-medium text-gray-500 hover:text-white transition-colors"
                    >
                      Logout
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <Link href="/login" className="text-sm font-medium text-gray-400 hover:text-white transition-colors">
                    Log in
                  </Link>
                  <Link
                    href="/register"
                    className="flex items-center justify-center px-5 sm:px-6 py-2 sm:py-2.5 rounded-full bg-white text-black text-xs sm:text-sm font-semibold hover:bg-gray-200 transition-all hover:scale-105 active:scale-95"
                  >
                    Get Started
                  </Link>
                </>
              )
            )}
          </div>
        </div>
      </nav>

    </>
  );
}

```


---
## FILE: client/src/components/Sidebar.tsx

```tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "./AuthProvider";
import { cn } from "@/lib/utils";
import {
  Menu,
  X,
  Home,
  FolderOpen,
  Video,
  LogOut,
  User as UserIcon,
  ChevronsLeft,
  ChevronsRight
} from "lucide-react";

export function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { user, logout } = useAuth();

  const toggleSidebar = () => setIsCollapsed(!isCollapsed);

  const navLinks = [
    { name: "Home", href: "/dashboard", icon: <Home className="w-5 h-5" /> },
    { name: "Studio", href: "/studio/default-studio", icon: <Video className="w-5 h-5" /> },
    { name: "Projects", href: "/dashboard/projects", icon: <FolderOpen className="w-5 h-5" /> },
  ];

  return (
    <aside
      className={cn(
        "h-full border-r border-white/10 bg-black/40 backdrop-blur-xl transition-all duration-300 flex flex-col justify-between",
        isCollapsed ? "w-[72px]" : "w-64"
      )}
    >
      <div>
        <div className="h-16 flex items-center justify-between px-4 border-b border-white/10">
          {!isCollapsed && (
            <Link href="/dashboard" className="text-xl font-bold tracking-widest text-[#ededed]">
              RECORA
            </Link>
          )}
          <button
            onClick={toggleSidebar}
            className={cn("p-1.5 rounded-lg hover:bg-white/10 text-gray-400 hover:text-white transition-colors",
              isCollapsed && "mx-auto"
            )}
          >
            {isCollapsed ? <ChevronsRight className="w-5 h-5" /> : <ChevronsLeft className="w-5 h-5" />}
          </button>
        </div>

        <nav className="p-3 space-y-2 mt-4">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors group",
                  isActive
                    ? "bg-primary/20 text-white"
                    : "text-gray-400 hover:bg-white/5 hover:text-white",
                  isCollapsed && "justify-center px-0"
                )}
                title={isCollapsed ? link.name : undefined}
              >
                <div className={cn("shrink-0", isActive && "text-primary")}>
                  {link.icon}
                </div>
                {!isCollapsed && (
                  <span className="font-medium whitespace-nowrap overflow-hidden">
                    {link.name}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="p-3 border-t border-white/10 relative">
        {isProfileMenuOpen && (
          <div className="absolute bottom-full left-3 right-3 mb-2 bg-[#1a1a1a] border border-white/10 rounded-lg shadow-xl overflow-hidden py-1 z-50">
            <button
              onClick={() => {
                setIsProfileMenuOpen(false);
                logout();
              }}
              className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-500 hover:bg-white/5 transition-colors text-left"
            >
              <LogOut className="w-4 h-4 shrink-0" />
              {!isCollapsed && <span>Logout</span>}
            </button>
          </div>
        )}

        <button
          onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
          className={cn(
            "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-white/5 transition-colors overflow-hidden",
            isCollapsed && "justify-center px-0"
          )}
        >
          <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-xs font-bold shrink-0">
            {user?.name ? user.name.charAt(0).toUpperCase() : <UserIcon className="w-4 h-4" />}
          </div>
          {!isCollapsed && (
            <div className="flex-1 text-left min-w-0">
              <div className="text-sm font-medium text-white truncate">
                {user?.name || "Profile"}
              </div>
              <div className="text-xs text-gray-400 truncate">
                {user?.email || "Options"}
              </div>
            </div>
          )}
        </button>
      </div>
    </aside>
  );
}

```


---
## FILE: client/src/components/ai/ChatCanvas.tsx

```tsx
// File: client/src/components/ai/ChatCanvas.tsx
'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { ChatMessage } from '@/hooks/useAIChat';

interface Props {
  messages: ChatMessage[];
  loading: boolean;
  error: string | null;
  userName: string;
}

function formatTime(date: Date) {
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

function UserAvatar({ name }: { name: string }) {
  return (
    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#7C3AED] to-[#06B6D4] flex items-center justify-center text-xs font-bold text-white flex-shrink-0 shadow-lg">
      {(name?.[0] ?? 'U').toUpperCase()}
    </div>
  );
}

function AIAvatar() {
  return (
    <Image
      src="/logo.png"
      alt="FlatMotion"
      width={220}
      height={55}
      className="h-8 w-auto flex-shrink-0"
    />
  );
}

export default function ChatCanvas({ messages, loading, error, userName }: Props) {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const isEmpty = messages.length === 0 && !loading;

  return (
    <div className="flex-1 overflow-y-auto px-6 py-6 space-y-5 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-white/10">
      {/* Empty state */}
      {isEmpty && (
        <div className="flex flex-col items-center justify-center h-full text-center select-none">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#7C3AED]/20 to-[#06B6D4]/20 border border-white/[0.07] flex items-center justify-center mb-4">
            <svg className="w-8 h-8 text-[#7C3AED]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
            </svg>
          </div>
          <p className="text-gray-400 font-medium text-sm">Start your animation</p>
          <p className="text-gray-600 text-xs mt-1">Select a provider and model below, then describe your animation.</p>
        </div>
      )}

      {/* Messages */}
      {messages.map((msg) =>
        msg.role === 'user' ? (
          // User bubble
          <div key={msg.id} className="flex items-start gap-3">
            <UserAvatar name={userName} />
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1.5">
                <span className="text-sm font-semibold text-white">{userName}</span>
                <span className="text-[11px] text-gray-500">{formatTime(msg.timestamp)}</span>
              </div>
              <div className="bg-[#1a1a1f] border border-white/[0.07] rounded-2xl rounded-tl-sm px-4 py-3 text-sm text-gray-200 leading-relaxed max-w-2xl">
                {msg.content}
              </div>
              <p className="text-[10px] text-gray-600 mt-1 ml-1">Today</p>
            </div>
          </div>
        ) : (
          // AI response card
          <div key={msg.id} className="flex items-start gap-3">
            <AIAvatar />
            <div className="flex-1 max-w-3xl">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-white">FlatMotion</span>
                  <span className="text-[11px] text-gray-500">{formatTime(msg.timestamp)}</span>
                </div>
                {msg.isSuccess && (
                  <span className="inline-flex items-center gap-1.5 text-[11px] font-medium text-emerald-400 bg-emerald-400/10 border border-emerald-400/20 rounded-full px-2.5 py-0.5">
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    Generated
                  </span>
                )}
              </div>
              <div
                className={`rounded-2xl rounded-tl-sm p-5 border ${
                  msg.isSuccess
                    ? 'bg-gradient-to-br from-[#1a1320] to-[#0f1a20] border-[#7C3AED]/20 shadow-[0_0_30px_rgba(124,58,237,0.08)]'
                    : 'bg-[#1a1a1f] border-white/[0.07]'
                }`}
              >
                {msg.isSuccess ? (
                  <div className="space-y-3">
                    <p className="text-sm font-semibold text-white leading-relaxed">
                      Animation generation complete!
                    </p>
                    <p className="text-sm text-gray-400 leading-relaxed">
                      {msg.content}
                    </p>
                    <div className="flex items-center gap-2 pt-1">
                      <div className="h-px flex-1 bg-white/[0.05]" />
                      <span className="text-[11px] text-gray-600">Open DevTools → Console to inspect the payload</span>
                      <div className="h-px flex-1 bg-white/[0.05]" />
                    </div>
                    <div className="flex gap-2 pt-1">
                      <button className="px-4 py-1.5 text-xs font-semibold rounded-lg bg-gradient-to-r from-[#7C3AED] to-[#5B21B6] text-white hover:opacity-90 transition-opacity">
                        Regenerate
                      </button>
                      <button className="px-4 py-1.5 text-xs font-medium rounded-lg bg-white/[0.06] border border-white/[0.08] text-gray-300 hover:bg-white/[0.1] transition-all">
                        Edit Prompt
                      </button>
                    </div>
                  </div>
                ) : (
                  <p className="text-sm text-gray-300">{msg.content}</p>
                )}
              </div>
            </div>
          </div>
        ),
      )}

      {/* Loading indicator */}
      {loading && (
        <div className="flex items-start gap-3">
          <AIAvatar />
          <div className="flex-1 max-w-3xl">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-sm font-semibold text-white">FlatMotion</span>
            </div>
            <div className="bg-gradient-to-br from-[#1a1320] to-[#0f1a20] border border-[#7C3AED]/20 rounded-2xl rounded-tl-sm p-5 shadow-[0_0_30px_rgba(124,58,237,0.08)]">
              <div className="flex items-center gap-3">
                <div className="flex gap-1.5">
                  {[0, 1, 2].map((i) => (
                    <span
                      key={i}
                      className="w-2 h-2 rounded-full bg-[#7C3AED] animate-bounce"
                      style={{ animationDelay: `${i * 0.15}s` }}
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-400">Generating your animation…</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Error banner */}
      {error && (
        <div className="flex items-start gap-3 px-1">
          <div className="flex-1 bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3 flex items-center gap-3">
            <svg className="w-4 h-4 text-red-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <p className="text-sm text-red-400">{error}</p>
          </div>
        </div>
      )}

      <div ref={bottomRef} />
    </div>
  );
}

```


---
## FILE: client/src/components/ai/ChatComposer.tsx

```tsx
// File: client/src/components/ai/ChatComposer.tsx
'use client';

import { KeyboardEvent } from 'react';
import { ProviderOption, ModelOption } from '@/hooks/useAIChat';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Zap, Database, Cpu, KeyRound } from 'lucide-react';
import LoadingSpinnerCustom from '@/components/LoadingSpinnerCustom';

interface Props {
  // provider/model/key
  providers: ProviderOption[];
  providersLoading: boolean;
  models: ModelOption[];
  modelsLoading: boolean;
  provider: string;
  onProviderChange: (v: string) => void;
  model: string;
  onModelChange: (v: string) => void;
  apiKey: string;
  onApiKeyChange: (v: string) => void;
  // prompt
  prompt: string;
  onPromptChange: (v: string) => void;
  // actions
  onGenerate: () => void;
  canGenerate: boolean;
  loading: boolean;
}

export default function ChatComposer({
  providers, providersLoading,
  models, modelsLoading,
  provider, onProviderChange,
  model, onModelChange,
  apiKey, onApiKeyChange,
  prompt, onPromptChange,
  onGenerate, canGenerate, loading,
}: Props) {
  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter') {
      // Allow newline with Shift or Ctrl/Cmd + Enter
      if (e.shiftKey || e.ctrlKey || e.metaKey) {
        return;
      }
      // Plain Enter submits if able to generate
      if (canGenerate) {
        e.preventDefault();
        onGenerate();
      }
    }
  };

  return (
    <div className="flex-shrink-0 border-t border-white/10 bg-gradient-to-b from-[#0f0f12] via-[#0d0d10] to-[#0a0a0d] px-0 pt-4 sm:pt-5 pb-4 sm:pb-6 overflow-x-hidden w-full backdrop-blur-sm shadow-2xl shadow-black/50">
      {/* Centered composer container */}
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-4 sm:gap-5 bg-white/2 rounded-3xl p-5 sm:p-6">
        {/* Prompt textarea + generate button row */}
        <div className="flex flex-col sm:flex-row gap-3 items-end w-full">
          <Textarea
            value={prompt}
            onChange={(e) => onPromptChange(e.target.value)}
            onKeyDown={handleKeyDown}
            rows={2}
            placeholder="Describe the 2D animation you want to generate…"
            disabled={loading}
            className="flex-1 resize-none bg-[#0f0f14] border border-white/8 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-600 focus-visible:outline-none focus-visible:border-white/12 focus-visible:bg-[#111118] transition-colors duration-150 disabled:opacity-50 leading-relaxed min-h-[90px] hover:border-white/10"
          />
          <Button
            onClick={onGenerate}
            disabled={!canGenerate}
            title={canGenerate ? 'Generate (⌘ Enter)' : 'Fill in provider, model, API key and prompt to generate'}
            className={`flex items-center justify-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl text-xs sm:text-sm font-bold transition-all border-none flex-shrink-0 h-[90px] sm:h-auto ${
              canGenerate
                ? 'bg-gradient-to-br from-[#7C3AED] via-[#6D28D9] to-[#5B21B6] text-white hover:opacity-90 shadow-[0_0_20px_rgba(124,58,237,0.4)]'
                : 'bg-gray-700/40 text-gray-500 cursor-not-allowed border border-white/5'
            }`}
          >
            {loading ? (
              <>
                <LoadingSpinnerCustom size="sm" variant="dots" />
                <span className="hidden sm:inline text-sm">Creating magic...</span>
              </>
            ) : (
              <>
                <Zap className="size-4 fill-white" />
                <span className="hidden sm:inline text-sm">Generate</span>
              </>
            )}
          </Button>
        </div>

        {/* Controls row - stack on mobile */}
        <div className="flex flex-col sm:flex-row flex-wrap items-start sm:items-center gap-3 w-full overflow-x-auto pb-1">
          {/* Provider */}
          <div className="flex items-center gap-2 w-full sm:w-auto flex-shrink-0">
            <span className="flex items-center gap-1.5 text-xs text-gray-400 font-bold whitespace-nowrap flex-shrink-0 uppercase tracking-wide">
              <Database className="size-4 text-[#7C3AED]" />
              <span className="hidden sm:inline">Provider</span>
            </span>
            <Select value={provider} onValueChange={(v) => onProviderChange(v ?? '')}>
              <SelectTrigger
                disabled={providersLoading}
                className="flex-1 sm:flex-none bg-[#0f0f14] border border-white/8 text-gray-300 text-xs rounded-lg h-9 px-3 min-w-[110px] sm:min-w-[130px] focus:outline-none focus:border-white/12 focus:bg-[#111118] hover:border-white/10 transition-colors duration-150 shadow-sm"
              >
                <SelectValue placeholder={providersLoading ? 'Loading…' : 'Provider'} />
              </SelectTrigger>
              <SelectContent className="bg-[#1a1a1f] border-white/[0.07] text-gray-300">
                {providers.map((p) => (
                  <SelectItem key={p.id} value={p.id} className="focus:bg-white/[0.05] focus:text-white text-xs">
                    {p.label || p.id}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Model */}
          <div className="flex items-center gap-2 w-full sm:w-auto flex-shrink-0">
            <span className="flex items-center gap-1.5 text-xs text-gray-400 font-bold whitespace-nowrap flex-shrink-0 uppercase tracking-wide">
              <Cpu className="size-4 text-[#06B6D4]" />
              <span className="hidden sm:inline">Model</span>
            </span>
            <Select value={model} onValueChange={(v) => onModelChange(v ?? '')}>
              <SelectTrigger
                disabled={!provider || modelsLoading}
                className="flex-1 sm:flex-none bg-[#0f0f14] border border-white/8 text-gray-300 text-xs rounded-lg h-9 px-3 min-w-[110px] sm:min-w-[150px] focus:outline-none focus:border-white/12 focus:bg-[#111118] hover:border-white/10 transition-colors duration-150 shadow-sm"
              >
                <SelectValue placeholder={!provider ? 'Select provider' : modelsLoading ? 'Loading…' : 'Model'} />
              </SelectTrigger>
              <SelectContent className="bg-[#1a1a1f] border-white/[0.07] text-gray-300">
                {models.map((m) => (
                  <SelectItem key={m.id} value={m.id} className="focus:bg-white/[0.05] focus:text-white text-xs">
                    {m.label || m.id}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* API Key */}
          <div className="flex items-center gap-2 w-full sm:w-auto flex-shrink-0">
            <span className="flex items-center gap-1.5 text-xs text-gray-400 font-bold flex-shrink-0 uppercase tracking-wide">
              <KeyRound className="size-4 text-[#06B6D4]" />
              <span className="hidden sm:inline">Key</span>
            </span>
            <Input
              type="password"
              value={apiKey}
              onChange={(e) => onApiKeyChange(e.target.value)}
              placeholder="Api Key"
              autoComplete="off"
              className="flex-1 sm:w-36 lg:w-40 bg-[#0f0f14] border border-white/8 text-gray-300 text-xs rounded-lg h-9 focus-visible:outline-none focus-visible:border-white/12 focus-visible:bg-[#111118] placeholder-gray-600 hover:border-white/10 transition-colors duration-150 shadow-sm"
            />
          </div>

          {/* Hint */}
          <span className="text-xs text-gray-500 hidden sm:block flex-shrink-0 ml-auto font-medium">
            Enter to send, Shift + Enter for newline
          </span>
        </div>
      </div>
    </div>
  );
}
```


---
## FILE: client/src/components/ai/ChatTopBar.tsx

```tsx
// File: client/src/components/ai/ChatTopBar.tsx
'use client';

import { Badge } from '@/components/ui/badge';
import { Button, buttonVariants } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { MoreVertical } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Props {
  title?: string;
}

export default function ChatTopBar({ title = 'Bouncing Ball Test' }: Props) {
  return (
    <div className="flex items-center justify-between px-3 sm:px-4 lg:px-6 py-3 sm:py-4 border-b border-white/[0.07] bg-[#0f0f12] flex-shrink-0 w-full overflow-x-auto scrollbar-hide">
      {/* Left: title + status */}
      <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
        <h1 className="text-sm sm:text-base font-semibold text-white truncate">{title}</h1>
        <Badge
          variant="outline"
          className="gap-1.5 text-xs font-medium text-emerald-400 bg-emerald-400/10 border-emerald-400/20 rounded-full px-2.5 sm:px-3 py-1 flex-shrink-0"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="hidden xs:inline">Ready</span>
        </Badge>
      </div>

      {/* Right: action buttons */}
      <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0 ml-2">
        {['Rename', 'Export', 'Delete'].map((label) => (
          <Button
            key={label}
            variant="outline"
            size="sm"
            className="text-xs font-medium text-gray-400 hover:text-white bg-white/[0.05] hover:bg-white/[0.08] border-white/[0.08] px-2 sm:px-3 transition-all hidden sm:inline-flex"
          >
            {label}
          </Button>
        ))}

        <DropdownMenu>
          <DropdownMenuTrigger
            className={cn(
              buttonVariants({ variant: 'ghost', size: 'icon-sm' }),
              'text-gray-400 hover:text-white hover:bg-white/[0.05] h-8 w-8'
            )}
          >
            <MoreVertical className="size-4" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="bg-[#1a1a1f] border-white/[0.07] text-gray-300">
            <DropdownMenuItem className="focus:bg-white/[0.05] focus:text-white text-xs">Pin Project</DropdownMenuItem>
            <DropdownMenuItem className="focus:bg-white/[0.05] focus:text-white text-xs">Duplicate</DropdownMenuItem>
            <DropdownMenuItem className="focus:bg-white/[0.05] focus:text-white text-red-400 focus:text-red-400 text-xs">Archive</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}


```


---
## FILE: client/src/components/ai/EmptyState.tsx

```tsx
import { AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface EmptyStateProps {
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
  icon?: React.ElementType;
}

export default function EmptyState({
  title,
  description,
  actionLabel,
  onAction,
  icon: Icon = AlertCircle
}: EmptyStateProps) {
  return (
    <div className="flex flex-1 items-center justify-center w-full px-4">
      <div className="flex flex-col items-center justify-center text-center bg-gradient-to-br from-[#1a1a1f] via-[#0f0f14] to-[#0a0a0d] border border-white/10 rounded-2xl max-w-md w-full mx-4 shadow-2xl shadow-[#7C3AED]/20 p-8 sm:p-10 backdrop-blur-md hover:border-white/20 transition-all duration-300 hover:shadow-[#7C3AED]/30">
        <div className="relative mb-6 sm:mb-8">
          <div className="absolute inset-0 w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-br from-[#7C3AED] to-[#06B6D4] opacity-10 animate-pulse"></div>
          <div className="relative flex items-center justify-center w-20 h-20 sm:w-24 sm:h-24 flex-shrink-0">
            <Icon className="w-10 h-10 sm:w-12 sm:h-12 text-[#7C3AED] animate-bounce" />
          </div>
        </div>
        <h3 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-[#7C3AED] via-white to-[#06B6D4] bg-clip-text text-transparent mb-3">{title}</h3>
        <p className="text-sm sm:text-base text-gray-300 mb-8 sm:mb-10 max-w-sm leading-relaxed font-medium">
          {description}
        </p>
        {actionLabel && onAction && (
          <Button
            onClick={onAction}
            className="bg-gradient-to-r from-[#7C3AED] to-[#5B21B6] hover:from-[#7C3AED]/90 hover:to-[#5B21B6]/90 text-white shadow-[0_0_20px_rgba(124,58,237,0.4)] hover:shadow-[0_0_30px_rgba(124,58,237,0.6)] transition-all duration-300 text-sm font-semibold hover:scale-105 active:scale-95"
          >
            {actionLabel}
          </Button>
        )}
      </div>
    </div>
  );
}

```


---
## FILE: client/src/components/ai/GenerationHistory.tsx

```tsx
import { AnimationJob } from '@/hooks/useAnimationJobs';
import JobStatusBadge from './JobStatusBadge';
import VideoPreview from './VideoPreview';
import { Button } from '@/components/ui/button';
import { Trash2, RotateCcw, AlertTriangle } from 'lucide-react';

interface Props {
  jobs: AnimationJob[];
  onDeleteJob: (id: string) => Promise<void>;
  onRegenerateJob: (id: string) => Promise<void>;
  loading: boolean;
}

export default function GenerationHistory({ jobs, onDeleteJob, onRegenerateJob, loading }: Props) {
  if (loading && jobs.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center text-gray-500">
        Loading animations...
      </div>
    );
  }

  if (jobs.length === 0) {
    return null; // the EmptyState handles this on the Dashboard level
  }

  return (
    <div className="flex-1 overflow-y-auto w-full scrollbar-thin scrollbar-track-transparent scrollbar-thumb-white/10 scroll-smooth">
      <div className="w-full max-w-6xl mx-auto px-4 py-6 sm:py-8 space-y-5 sm:space-y-6">
        {jobs.map((job) => (
          <div key={job.id} className="group relative bg-gradient-to-br from-[#1a1a1f] to-[#0f0f14] border border-white/8 rounded-xl sm:rounded-2xl p-5 sm:p-7 shadow-lg hover:shadow-[0_0_40px_rgba(124,58,237,0.15)] transition-all duration-300 hover:border-white/15 hover:-translate-y-0.5 w-full overflow-hidden backdrop-blur-sm">
            <div className="flex flex-col sm:flex-row items-start justify-between gap-3 sm:gap-4 mb-5">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4 flex-wrap">
                  <JobStatusBadge status={job.status} />
                  <span className="text-xs text-gray-500 truncate font-medium">
                    {new Date(job.createdAt).toLocaleString()}
                  </span>
                  <span className="text-xs px-3 py-1.5 rounded-full bg-gradient-to-r from-[#7C3AED]/10 to-[#06B6D4]/10 border border-white/10 text-gray-300 font-mono truncate hover:border-white/20 transition-all">
                    {job.model}
                  </span>
                </div>
                <p className="text-sm text-gray-100 leading-relaxed font-semibold break-words">
                  "{job.prompt}"
                </p>
              </div>

              <div className="flex gap-2 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onRegenerateJob(job.id)}
                  className="h-10 w-10 text-gray-400 hover:text-white hover:bg-gradient-to-br hover:from-cyan-500/20 hover:to-cyan-500/10 rounded-lg transition-all duration-200 hover:scale-110 flex-shrink-0"
                  title="Regenerate"
                >
                  <RotateCcw className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onDeleteJob(job.id)}
                  className="h-10 w-10 text-gray-400 hover:text-red-400 hover:bg-gradient-to-br hover:from-red-500/20 hover:to-red-500/10 rounded-lg transition-all duration-200 hover:scale-110 flex-shrink-0"
                  title="Delete Job"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Active indicator */}
            {!['done', 'failed', 'expired'].includes(job.status) && (
              <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden mt-4 mb-5 relative">
                <div className="h-full bg-gradient-to-r from-[#7C3AED] via-[#06B6D4] to-[#7C3AED] w-full animate-pulse opacity-75 shadow-lg shadow-[#7C3AED]/50"></div>
              </div>
            )}

            {/* Error Message */}
            {job.status === 'failed' && (
              <div className="mt-5 p-4 sm:p-5 rounded-lg sm:rounded-xl bg-gradient-to-br from-red-500/10 to-red-500/5 border border-red-500/20 mb-5 backdrop-blur-sm">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5 animate-pulse" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-red-300 leading-relaxed font-medium">
                      {job.errorMessage || "Something went wrong while creating your animation. Please try again with a different prompt."}
                    </p>
                    <p className="text-xs text-gray-400 mt-2">
                      💡 Tip: Try using simpler descriptions or rephrasing your prompt.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Expired Message */}
            {job.status === 'expired' && (
              <div className="mt-5 p-4 sm:p-5 rounded-lg bg-gradient-to-br from-orange-500/10 to-orange-500/5 border border-orange-500/20 text-sm text-orange-300 mb-5 leading-relaxed backdrop-blur-sm font-medium">
                ⏰ This video has expired and been purged from storage. Click regenerate to run the prompt again.
              </div>
            )}

            {/* Video Player */}
            {job.status === 'done' && job.videoUrl && (
              <div className="mt-5 sm:mt-6 w-full overflow-hidden">
                <VideoPreview
                  url={job.videoUrl}
                  className="max-w-2xl"
                  onRegenerate={() => onRegenerateJob(job.id)}
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

```


---
## FILE: client/src/components/ai/JobStatusBadge.tsx

```tsx
import { 
  CheckCircle2, 
  CircleDashed, 
  Code2, 
  Loader2, 
  MonitorPlay, 
  AlertCircle, 
  Clock, 
  UploadCloud 
} from 'lucide-react';
import { AnimationJob } from '@/hooks/useAnimationJobs';

interface Props {
  status: AnimationJob['status'];
  className?: string;
}

export default function JobStatusBadge({ status, className = '' }: Props) {
  const config = {
    pending: {
      label: 'Queued',
      icon: Clock,
      colorClass: 'text-gray-400 bg-gray-500/10 border-gray-500/20'
    },
    processing: {
      label: 'Starting',
      icon: CircleDashed,
      colorClass: 'text-[#06B6D4] bg-[#06B6D4]/10 border-[#06B6D4]/20 animate-pulse'
    },
    generating_code: {
      label: 'Generating code',
      icon: Code2,
      colorClass: 'text-purple-400 bg-purple-500/10 border-purple-500/20'
    },
    rendering: {
      label: 'Rendering video',
      icon: MonitorPlay,
      colorClass: 'text-[#7C3AED] bg-[#7C3AED]/10 border-[#7C3AED]/20'
    },
    uploading: {
      label: 'Uploading',
      icon: UploadCloud,
      colorClass: 'text-blue-400 bg-blue-500/10 border-blue-500/20'
    },
    done: {
      label: 'Ready',
      icon: CheckCircle2,
      colorClass: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20'
    },
    failed: {
      label: 'Failed',
      icon: AlertCircle,
      colorClass: 'text-red-400 bg-red-500/10 border-red-500/20'
    },
    expired: {
      label: 'Expired',
      icon: AlertCircle,
      colorClass: 'text-orange-400 bg-orange-500/10 border-orange-500/20'
    }
  };

  const { label, icon: Icon, colorClass } = config[status] || config.pending;

  const isSpinning = ['processing', 'generating_code', 'rendering', 'uploading'].includes(status);

  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium border rounded-full ${colorClass} ${className}`}>
      <Icon className={`w-3.5 h-3.5 ${isSpinning && status !== 'processing' ? 'animate-spin' : ''}`} />
      {label}
    </span>
  );
}

```


---
## FILE: client/src/components/ai/ProjectCreateDialog.tsx

```tsx
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Loader2 } from 'lucide-react';

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (title: string, description: string) => Promise<void>;
  loading: boolean;
  children: React.ReactNode;
}

export default function ProjectCreateDialog({ open, onOpenChange, onSubmit, loading, children }: Props) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      setError('Title is required');
      return;
    }
    setError('');
    
    try {
      await onSubmit(title, description);
      setTitle('');
      setDescription('');
      onOpenChange(false);
    } catch (err: any) {
      setError(err.message || 'Failed to create project');
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-[#141416] border-white/10 text-white shadow-2xl">
        <DialogHeader>
          <DialogTitle>Create New Project</DialogTitle>
          <DialogDescription className="text-gray-400">
            Keep your animations organized. A project can hold multiple animation generations.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div className="space-y-2">
            <label htmlFor="title" className="text-sm font-medium">Project Title</label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. My Awesome 2D Short"
              className="bg-[#1a1a1f] border-white/10 text-white focus-visible:ring-primary"
              disabled={loading}
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="desc" className="text-sm font-medium">Description (Optional)</label>
            <Input
              id="desc"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="A brief description of this project"
              className="bg-[#1a1a1f] border-white/10 text-white focus-visible:ring-primary"
              disabled={loading}
            />
          </div>
          {error && <p className="text-sm text-red-400">{error}</p>}
          <DialogFooter>
            <Button
              type="submit"
              disabled={loading || !title.trim()}
              className="bg-primary hover:bg-primary/90 text-white"
            >
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Create Project
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

```


---
## FILE: client/src/components/ai/ProjectSidebar.tsx

```tsx
// File: client/src/components/ai/ProjectSidebar.tsx
'use client';

import { useState } from 'react';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { User, useAuth } from '@/components/AuthProvider';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Plus, ChevronRight, SquarePen, Copy, Trash2, ChevronLeft, Menu, X, Image as ImageIcon, Loader2 } from 'lucide-react';
import { Project } from '@/hooks/useProjects';
import ProjectCreateDialog from './ProjectCreateDialog';
import Link from 'next/link';

interface Props {
  user: User;
  projects: Project[];
  selectedProjectId: string | null;
  onSelectProject: (id: string) => void;
  onAddProject: (title: string, description: string) => Promise<void>;
  onRemoveProject: (id: string) => Promise<void>;
}

export default function ProjectSidebar({
  user, projects, selectedProjectId, onSelectProject, onAddProject, onRemoveProject
}: Props) {
  const { logout } = useAuth();
  const pathname = usePathname();
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [loadingProjectId, setLoadingProjectId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const userInitials = (user.name?.[0] ?? 'U').toUpperCase();
  const isGalleryPage = pathname === '/gallery';

  const handleCreateProject = async (title: string, description: string) => {
    setIsCreating(true);
    setError(null);
    try {
      await onAddProject(title, description);
    } catch (err: any) {
      const errorMessage = err?.message || 'Failed to create project. Please try again.';
      console.error('Project creation error:', err);
      setError(errorMessage);
    } finally {
      setIsCreating(false);
      setIsMobileOpen(false);
    }
  };

  const handleSelectProject = (id: string) => {
    setLoadingProjectId(id);
    setError(null);
    // Simulate brief loading state for UX
    setTimeout(() => {
      onSelectProject(id);
      setLoadingProjectId(null);
      setIsMobileOpen(false);
    }, 300);
  };

  const handleDeleteProject = async (id: string) => {
    setError(null);
    try {
      await onRemoveProject(id);
    } catch (err: any) {
      const errorMessage = err?.message || 'Failed to delete project. Please try again.';
      console.error('Project deletion error:', err);
      setError(errorMessage);
    }
  };

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Header with Logo and Collapse Toggle */}
      <div className="flex items-center justify-between px-4 py-4 min-h-[64px] lg:min-h-auto flex-shrink-0">
        {!isCollapsed && (
          <div className="flex items-center gap-2.5 flex-1 min-w-0">
            {/* <Image
              src="/logo.png"
              alt="FlatMotion"
              width={220}
              height={55}
              className="h-8 w-auto"
            /> */}
            <span className="font-semibold ml-4 text-white text-md truncate">Projects</span>
          </div>
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="h-8 w-8 text-gray-400 hover:text-white hover:bg-white/5 transition-colors flex-shrink-0 hidden lg:flex"
          title={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsMobileOpen(false)}
          className="h-8 w-8 text-gray-400 hover:text-white hover:bg-white/5 transition-colors flex-shrink-0 lg:hidden"
          title="Close sidebar"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>

      {!isCollapsed && <Separator className="bg-white/[0.07]" />}

      {/* Error Alert */}
      {error && !isCollapsed && (
        <div className="px-4 py-3 mx-2 my-2 rounded-lg bg-red-500/10 border border-red-500/20 text-xs">
          <p className="text-red-300 font-medium mb-2 flex items-start gap-2">
            <span className="flex-shrink-0">⚠️</span>
            <span className="flex-1">{error}</span>
          </p>
          <button
            onClick={() => setError(null)}
            className="text-red-400 hover:text-red-300 text-xs font-medium"
          >
            Dismiss
          </button>
        </div>
      )}

      {!isCollapsed && <Separator className="bg-white/[0.07]" />}

      {/* New Project Button */}
      <div className={`px-4 flex-shrink-0 ${isCollapsed ? 'py-2' : 'pt-4 pb-3'}`}>
        <ProjectCreateDialog
          open={createDialogOpen}
          onOpenChange={setCreateDialogOpen}
          onSubmit={handleCreateProject}
          loading={isCreating}
        >
          <Button
            className={`w-full bg-gradient-to-r from-[#7C3AED] to-[#5B21B6] text-white font-semibold hover:opacity-90 shadow-[0_0_20px_rgba(124,58,237,0.25)] border-none rounded-xl transition-all ${isCollapsed ? 'h-8 p-0' : 'text-sm h-10'}`}
            title={isCollapsed ? 'New Project' : ''}
          >
            {isCollapsed ? (
              <Plus className="size-4" strokeWidth={2.5} />
            ) : (
              <>
                <Plus className="mr-1 size-4" strokeWidth={2.5} />
                New Project
              </>
            )}
          </Button>
        </ProjectCreateDialog>
      </div>

      {/* Gallery Link */}
      {!isCollapsed && (
        <div className="px-4 pb-4 flex-shrink-0">
          <Link href="/gallery" className="w-full block">
            <Button
              className={`w-full justify-start px-3 py-3 text-sm transition-all rounded-lg border-none font-medium ${
                isGalleryPage
                  ? 'bg-white/[0.08] text-white hover:bg-white/[0.1]'
                  : 'text-gray-400 hover:bg-white/[0.04] hover:text-gray-200'
              }`}
            >
              <ImageIcon className="size-4 mr-2 flex-shrink-0" />
              <span>Gallery</span>
            </Button>
          </Link>
        </div>
      )}

      {/* Project list */}
      {!isCollapsed && (
        <div className="flex-1 flex flex-col min-h-0">
          <p className="text-[10px] font-semibold uppercase tracking-widest text-gray-500 mb-2 px-3 flex items-center justify-between flex-shrink-0">
            PROJECTS
            <ChevronRight className="size-3.5 text-gray-600" />
          </p>
          {projects.length === 0 ? (
            <p className="text-xs text-center text-gray-500 py-4 px-2 flex-shrink-0">No projects yet. Create one to start animating!</p>
          ) : (
            <ul className="flex-1 overflow-y-auto scrollbar-thin scrollbar-track-white/2 scrollbar-thumb-white/10 hover:scrollbar-thumb-white/20">
              {projects.map((p) => {
                const active = p.id === selectedProjectId;
                const isLoading = loadingProjectId === p.id;
                return (
                  <li key={p.id} className="group flex items-center flex-shrink-0">
                    <Button
                      onClick={() => handleSelectProject(p.id)}
                      disabled={isLoading}
                      variant="ghost"
                      title={p.title}
                      className={`w-full justify-start px-3 py-6 h-auto rounded-lg text-sm transition-all text-left block flex-1 ${
                        active
                          ? 'bg-white/[0.08] text-white font-medium hover:bg-white/[0.1]'
                          : 'text-gray-400 hover:bg-white/[0.04] hover:text-gray-200'
                      } ${isLoading ? 'opacity-60' : ''}`}
                    >
                      <div className="flex items-center gap-2 w-full">
                        {isLoading && <Loader2 className="size-3 animate-spin flex-shrink-0" />}
                        <div className={`flex-1 min-w-0 ${isLoading ? 'opacity-50' : ''}`}>
                          <span className="block truncate">{p.title}</span>
                          <span className="block text-[10px] text-gray-500 mt-0.5 font-normal truncate">
                            {p.description || 'No description'}
                          </span>
                        </div>
                      </div>
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={(e) => { e.stopPropagation(); handleDeleteProject(p.id); }}
                      disabled={isLoading}
                      className="h-8 w-8 ml-1 opacity-0 group-hover:opacity-100 text-gray-500 hover:text-red-400 hover:bg-red-400/10 transition-all rounded-md"
                      title="Delete Project"
                    >
                      <Trash2 className="size-4" />
                    </Button>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      )}

      {!isCollapsed && (
        <>
          <Separator className="bg-white/[0.07] flex-shrink-0" />

          {/* User strip */}
          <div className="flex items-center gap-3 px-4 py-3 cursor-pointer hover:bg-white/5 transition-colors flex-shrink-0" onClick={logout}>
            <Avatar className="size-8 border-none bg-gradient-to-br from-[#7C3AED] to-[#06B6D4] flex-shrink-0">
              <AvatarFallback className="bg-transparent text-white text-xs font-bold">
                {userInitials}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium text-white truncate">{user.name}</p>
              <p className="text-[10px] text-gray-500 truncate">Log out</p>
            </div>
          </div>
        </>
      )}

      {/* Collapsed state - User avatar only */}
      {isCollapsed && (
        <>
          <Separator className="bg-white/[0.07] flex-shrink-0" />
          <div className="px-4 py-3 cursor-pointer hover:bg-white/5 transition-colors flex justify-center flex-shrink-0" onClick={logout} title={user.name}>
            <Avatar className="size-8 border-none bg-gradient-to-br from-[#7C3AED] to-[#06B6D4]">
              <AvatarFallback className="bg-transparent text-white text-xs font-bold">
                {userInitials}
              </AvatarFallback>
            </Avatar>
          </div>
        </>
      )}
    </div>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <aside className={`hidden lg:flex flex-shrink-0 flex-col h-full bg-[#0d0d0f] border-r border-white/[0.07] transition-all duration-300 rounded-r-3xl ${isCollapsed ? 'w-20' : 'w-60'}`}>
        <SidebarContent />
      </aside>

      {/* Mobile toggle button */}
      <div className="lg:hidden flex-shrink-0 border-r border-white/[0.07] bg-[#0d0d0f]">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsMobileOpen(true)}
          className="h-16 w-16 text-gray-400 hover:text-white hover:bg-white/5 transition-colors"
          title="Open sidebar"
        >
          <Menu className="h-5 w-5" />
        </Button>
      </div>

      {/* Mobile drawer */}
      {isMobileOpen && (
        <>
          {/* Backdrop */}
          <div
            className="lg:hidden fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
            onClick={() => setIsMobileOpen(false)}
          />
          {/* Drawer */}
          <aside className="lg:hidden fixed left-0 top-0 bottom-0 z-50 w-60 bg-[#0d0d0f] border-r border-white/[0.07] flex flex-col overflow-hidden">
            <SidebarContent />
          </aside>
        </>
      )}
    </>
  );
}



```


---
## FILE: client/src/components/ai/VideoPreview.tsx

```tsx
import React, { useRef, useState } from 'react';
import { Play, Pause, Download, Maximize2, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Props {
  url: string;
  className?: string;
  onRegenerate?: () => void;
}

export default function VideoPreview({ url, className = '', onRegenerate }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) videoRef.current.pause();
      else videoRef.current.play();
      setIsPlaying(!isPlaying);
    }
  };

  const handleFullscreen = () => {
    if (videoRef.current) {
      if (videoRef.current.requestFullscreen) {
        videoRef.current.requestFullscreen();
      }
    }
  };

  return (
    <div className={`flex flex-col w-full max-w-2xl ${className}`}>
      <div className="relative group rounded-xl overflow-hidden bg-black border border-white/10 w-full">
        <video
          ref={videoRef}
          src={url}
          className="w-full h-auto aspect-video object-contain bg-[#0a0a0d]"
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          loop
          playsInline
        />

        {/* Controls overlay */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-2 sm:p-4">
          {/* Playback center button */}
          <div className="absolute inset-0 flex items-center justify-center">
            <button
              onClick={togglePlay}
              className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/20 transition-all hover:scale-105"
            >
              {isPlaying ? <Pause className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" /> : <Play className="w-4 h-4 sm:w-5 sm:h-5 ml-1" fill="currentColor" />}
            </button>
          </div>

          {/* Bottom bar */}
          <div className="w-full flex items-center gap-1 sm:gap-2 relative z-10 justify-end flex-wrap">
            {onRegenerate && (
              <Button
                variant="outline"
                size="sm"
                onClick={onRegenerate}
                className="bg-black/50 border-white/10 text-white hover:bg-white/10 h-7 sm:h-8 text-xs backdrop-blur-md mr-auto"
              >
                <RotateCcw className="w-3 h-3 sm:w-3.5 sm:h-3.5 mr-1" />
                <span className="hidden sm:inline">Regenerate</span>
              </Button>
            )}

            <a
              href={url}
              download
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded bg-black/50 border border-white/10 text-white hover:bg-white/10 backdrop-blur-md transition-colors flex-shrink-0"
            >
              <Download className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
            </a>

            <Button
              variant="ghost"
              size="icon"
              onClick={handleFullscreen}
              className="bg-black/50 border-white/10 text-white hover:bg-white/10 w-7 h-7 sm:w-8 sm:h-8 rounded backdrop-blur-md transition-colors p-0 flex-shrink-0"
            >
              <Maximize2 className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Expiration notice */}
      <div className="mt-3 text-center px-2">
        <p className="text-xs text-gray-500 opacity-60 leading-relaxed font-medium">
          This video will be automatically deleted after 7 days. Please download it if you want to keep it.
        </p>
      </div>
    </div>
  );
}

```


---
## FILE: client/src/components/ai/index.ts

```ts
// File: client/src/components/ai/index.ts
// Re-exports for cleaner imports if needed in future
export { default as ProjectSidebar } from './ProjectSidebar';
export { default as ChatTopBar } from './ChatTopBar';
export { default as ChatCanvas } from './ChatCanvas';
export { default as ChatComposer } from './ChatComposer';

```


---
## FILE: client/src/components/gallery/AnimationCard.tsx

```tsx
import { AnimationJob } from '@/hooks/useAnimationJobs';
import JobStatusBadge from '@/components/ai/JobStatusBadge';
import VideoPreview from '@/components/ai/VideoPreview';
import { Button } from '@/components/ui/button';
import { Play, ExternalLink } from 'lucide-react';
import Link from 'next/link';

interface AnimationCardProps {
  animation: AnimationJob;
  onOpenInChat: (animation: AnimationJob) => void;
}

export default function AnimationCard({ animation, onOpenInChat }: AnimationCardProps) {
  const formattedDate = new Date(animation.createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  return (
    <div className="group relative bg-gradient-to-br from-[#1a1a1f] to-[#0f0f14] border border-white/8 rounded-xl overflow-hidden shadow-lg hover:shadow-[0_0_40px_rgba(124,58,237,0.15)] transition-all duration-300 hover:border-white/15 h-full flex flex-col backdrop-blur-sm">
      {/* Video Preview Thumbnail */}
      {animation.status === 'done' && animation.videoUrl ? (
        <div className="relative w-full aspect-video bg-black overflow-hidden">
          <video
            src={animation.videoUrl}
            className="w-full h-full object-cover"
            muted
            preload="metadata"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <div className="w-12 h-12 rounded-full bg-[#7C3AED]/80 flex items-center justify-center">
              <Play className="w-5 h-5 text-white fill-white ml-0.5" />
            </div>
          </div>
        </div>
      ) : (
        <div className="w-full aspect-video bg-gradient-to-br from-[#0f0f14] to-[#0a0a0d] flex items-center justify-center border-b border-white/8">
          <div className="text-center">
            <div className="w-12 h-12 rounded-full bg-[#7C3AED]/10 flex items-center justify-center mx-auto mb-2">
              <div className="w-8 h-8 border-2 border-[#7C3AED] border-t-transparent rounded-full animate-spin" />
            </div>
            <p className="text-xs text-gray-500 font-medium">
              {animation.status === 'failed' ? 'Generation Failed' : 'Generating...'}
            </p>
          </div>
        </div>
      )}

      {/* Card Content */}
      <div className="p-4 flex flex-col flex-1">
        {/* Status and Date */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <JobStatusBadge status={animation.status} />
          <span className="text-xs text-gray-500 flex-shrink-0">{formattedDate}</span>
        </div>

        {/* Prompt Title */}
        <p className="text-sm text-gray-100 leading-relaxed font-medium mb-4 flex-1 line-clamp-2">
          {animation.prompt}
        </p>

        {/* Model Badge */}
        <div className="mb-4">
          <span className="text-xs px-2.5 py-1 rounded-full bg-gradient-to-r from-[#7C3AED]/10 to-[#06B6D4]/10 border border-white/10 text-gray-300 font-mono inline-block truncate hover:border-white/20 transition-all">
            {animation.model}
          </span>
        </div>

        {/* Actions */}
        <div className="flex gap-2 pt-3 border-t border-white/8">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onOpenInChat(animation)}
            className="flex-1 text-xs text-gray-400 hover:text-white hover:bg-gradient-to-br hover:from-purple-500/20 hover:to-purple-500/10 rounded-lg transition-all duration-200"
          >
            <ExternalLink className="w-3.5 h-3.5 mr-1.5" />
            Open in Chat
          </Button>
        </div>
      </div>
    </div>
  );
}

```


---
## FILE: client/src/components/gallery/AnimationGrid.tsx

```tsx
import { AnimationJob } from '@/hooks/useAnimationJobs';
import AnimationCard from './AnimationCard';
import { useRouter } from 'next/navigation';

interface AnimationGridProps {
  animations: AnimationJob[];
  loading: boolean;
  onOpenInChat?: (animation: AnimationJob) => void;
}

export default function AnimationGrid({
  animations,
  loading,
  onOpenInChat,
}: AnimationGridProps) {
  const router = useRouter();

  const handleOpenInChat = (animation: AnimationJob) => {
    if (onOpenInChat) {
      onOpenInChat(animation);
    } else {
      // Default behavior: navigate to dashboard with project parameter
      router.push(`/dashboard?project=${animation.projectId}`);
    }
  };

  if (loading && animations.length === 0) {
    // Loading skeleton
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div
            key={i}
            className="bg-gradient-to-br from-[#1a1a1f] to-[#0f0f14] border border-white/8 rounded-xl overflow-hidden animate-pulse"
          >
            <div className="w-full aspect-video bg-white/5" />
            <div className="p-4 space-y-3">
              <div className="h-3 bg-white/5 rounded w-3/4" />
              <div className="h-3 bg-white/5 rounded w-1/2" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (animations.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 px-4">
        <div className="w-16 h-16 rounded-full bg-[#7C3AED]/10 flex items-center justify-center mb-4">
          <svg
            className="w-8 h-8 text-[#7C3AED]"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M7 4v16m10-16v16M4 7h16M4 17h16"
            />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-white mb-2">No animations yet</h3>
        <p className="text-sm text-gray-400 text-center max-w-sm">
          Create your first animation on the dashboard to see it here.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
      {animations.map((animation) => (
        <AnimationCard
          key={animation.id}
          animation={animation}
          onOpenInChat={handleOpenInChat}
        />
      ))}
    </div>
  );
}

```


---
## FILE: client/src/components/studio/CountdownOverlay.tsx

```tsx
// File: client/src/components/studio/CountdownOverlay.tsx
'use client';

import { useEffect, useState } from 'react';

interface CountdownOverlayProps {
  count: number | null; // null = hidden
}

export function CountdownOverlay({ count }: CountdownOverlayProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(count !== null);
  }, [count]);

  if (!visible || count === null) return null;

  return (
    <div className="absolute inset-0 z-40 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div
        key={count}
        className="flex flex-col items-center gap-2 animate-in zoom-in-50 duration-300"
      >
        <div className="text-[120px] font-black text-white leading-none drop-shadow-[0_0_40px_rgba(0,240,255,0.6)] tabular-nums select-none"
          style={{ textShadow: '0 0 60px rgba(0,240,255,0.8), 0 0 120px rgba(0,240,255,0.4)' }}
        >
          {count}
        </div>
        <p className="text-[#00f0ff] text-sm font-semibold tracking-[0.3em] uppercase animate-pulse">
          Starting Recording
        </p>
      </div>
    </div>
  );
}

```


---
## FILE: client/src/components/studio/GreenRoomModal.tsx

```tsx
// File: client/src/components/studio/GreenRoomModal.tsx
'use client';

import { useState } from 'react';
import { Video, ArrowRight, Loader2 } from 'lucide-react';

interface GreenRoomModalProps {
  isLoading: boolean;
  onJoin: (displayName: string) => void;
}

export function GreenRoomModal({ isLoading, onJoin }: GreenRoomModalProps) {
  const [displayName, setDisplayName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (displayName.trim().length < 1) return;
    onJoin(displayName.trim());
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
      <div className="w-full max-w-md mx-4 bg-[#0d0d0d] border border-white/10 rounded-2xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="px-8 pt-8 pb-6 border-b border-white/10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-[#00f0ff]/10 border border-[#00f0ff]/20 flex items-center justify-center">
              <Video className="w-5 h-5 text-[#00f0ff]" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-white">Join Studio</h2>
              <p className="text-xs text-gray-500">You're joining as a guest</p>
            </div>
          </div>
          <p className="text-sm text-gray-400">
            Enter your display name so others in the room can identify you.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="px-8 py-6">
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Display Name
          </label>
          <input
            type="text"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            placeholder="e.g. Alice Johnson"
            maxLength={40}
            autoFocus
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-[#00f0ff]/50 focus:ring-1 focus:ring-[#00f0ff]/30 transition-colors text-sm"
          />

          <button
            type="submit"
            disabled={displayName.trim().length < 1 || isLoading}
            className="mt-4 w-full flex items-center justify-center gap-2 py-3 px-6 rounded-xl font-semibold text-sm transition-all
              bg-[#00f0ff]/20 hover:bg-[#00f0ff]/30 text-[#00f0ff] border border-[#00f0ff]/40
              shadow-[0_0_20px_rgba(0,240,255,0.15)] hover:shadow-[0_0_30px_rgba(0,240,255,0.25)]
              disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <>
                Enter Studio
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

```


---
## FILE: client/src/components/studio/VideoTile.tsx

```tsx
// File: client/src/components/studio/VideoTile.tsx
'use client';

import { RefObject, useEffect } from 'react';
import { VideoOff } from 'lucide-react';
import { CountdownOverlay } from './CountdownOverlay';

interface VideoTileProps {
  videoRef?: RefObject<HTMLVideoElement | null>;
  stream?: MediaStream | null;
  name: string;
  isHost?: boolean;
  isRecording: boolean;
  isSelf?: boolean;
  isCamEnabled?: boolean;
  countdown?: number | null;
  muted?: boolean;
}

export function VideoTile({
  videoRef,
  stream,
  name,
  isHost = false,
  isRecording,
  isSelf = false,
  isCamEnabled = true,
  countdown = null,
  muted = false,
}: VideoTileProps) {
  
  // Re-attach stream robustly in case React remounts the video element
  useEffect(() => {
    if (videoRef && videoRef.current && stream) {
      if (videoRef.current.srcObject !== stream) {
        videoRef.current.srcObject = stream;
      }
    }
  }, [stream, videoRef]);

  return (
    <div className="relative w-full aspect-video bg-[#0a0a0a] rounded-2xl overflow-hidden border border-white/10 shadow-xl">
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted={muted || isSelf}
        className={`w-full h-full object-cover ${isSelf ? 'scale-x-[-1]' : ''} transition-opacity duration-200 ${!isCamEnabled ? 'opacity-0' : 'opacity-100'}`}
      />

      {!isCamEnabled && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-20 h-20 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
            <VideoOff className="w-8 h-8 text-gray-600" />
          </div>
        </div>
      )}

      {/* Countdown overlay */}
      <CountdownOverlay count={countdown} />

      {/* 🔴 RECORDING badge */}
      {isRecording && (
        <div className="absolute top-3 left-3 z-10 flex items-center gap-1.5 bg-red-500/90 backdrop-blur-sm text-white text-xs font-bold px-3 py-1 rounded-full">
          <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
          REC
        </div>
      )}

      {/* Host badge */}
      {isHost && (
        <div className="absolute top-3 right-3 z-10 bg-amber-500/90 text-white text-xs font-semibold px-3 py-1 rounded-full">
          👑 Host
        </div>
      )}

      {/* Name label */}
      <div className="absolute bottom-0 left-0 right-0 px-4 py-3 bg-gradient-to-t from-black/80 to-transparent">
        <span className="text-sm font-medium text-white">
          {name}
          {isSelf && <span className="text-gray-400 text-xs ml-1">(You)</span>}
        </span>
      </div>
    </div>
  );
}

```


---
## FILE: client/src/components/ui/avatar.tsx

```tsx
"use client"

import * as React from "react"
import { Avatar as AvatarPrimitive } from "@base-ui/react/avatar"

import { cn } from "@/lib/utils"

function Avatar({
  className,
  size = "default",
  ...props
}: AvatarPrimitive.Root.Props & {
  size?: "default" | "sm" | "lg"
}) {
  return (
    <AvatarPrimitive.Root
      data-slot="avatar"
      data-size={size}
      className={cn(
        "group/avatar relative flex size-8 shrink-0 rounded-full select-none after:absolute after:inset-0 after:rounded-full after:border after:border-border after:mix-blend-darken data-[size=lg]:size-10 data-[size=sm]:size-6 dark:after:mix-blend-lighten",
        className
      )}
      {...props}
    />
  )
}

function AvatarImage({ className, ...props }: AvatarPrimitive.Image.Props) {
  return (
    <AvatarPrimitive.Image
      data-slot="avatar-image"
      className={cn(
        "aspect-square size-full rounded-full object-cover",
        className
      )}
      {...props}
    />
  )
}

function AvatarFallback({
  className,
  ...props
}: AvatarPrimitive.Fallback.Props) {
  return (
    <AvatarPrimitive.Fallback
      data-slot="avatar-fallback"
      className={cn(
        "flex size-full items-center justify-center rounded-full bg-muted text-sm text-muted-foreground group-data-[size=sm]/avatar:text-xs",
        className
      )}
      {...props}
    />
  )
}

function AvatarBadge({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="avatar-badge"
      className={cn(
        "absolute right-0 bottom-0 z-10 inline-flex items-center justify-center rounded-full bg-primary text-primary-foreground bg-blend-color ring-2 ring-background select-none",
        "group-data-[size=sm]/avatar:size-2 group-data-[size=sm]/avatar:[&>svg]:hidden",
        "group-data-[size=default]/avatar:size-2.5 group-data-[size=default]/avatar:[&>svg]:size-2",
        "group-data-[size=lg]/avatar:size-3 group-data-[size=lg]/avatar:[&>svg]:size-2",
        className
      )}
      {...props}
    />
  )
}

function AvatarGroup({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="avatar-group"
      className={cn(
        "group/avatar-group flex -space-x-2 *:data-[slot=avatar]:ring-2 *:data-[slot=avatar]:ring-background",
        className
      )}
      {...props}
    />
  )
}

function AvatarGroupCount({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="avatar-group-count"
      className={cn(
        "relative flex size-8 shrink-0 items-center justify-center rounded-full bg-muted text-sm text-muted-foreground ring-2 ring-background group-has-data-[size=lg]/avatar-group:size-10 group-has-data-[size=sm]/avatar-group:size-6 [&>svg]:size-4 group-has-data-[size=lg]/avatar-group:[&>svg]:size-5 group-has-data-[size=sm]/avatar-group:[&>svg]:size-3",
        className
      )}
      {...props}
    />
  )
}

export {
  Avatar,
  AvatarImage,
  AvatarFallback,
  AvatarGroup,
  AvatarGroupCount,
  AvatarBadge,
}

```


---
## FILE: client/src/components/ui/badge.tsx

```tsx
import { mergeProps } from "@base-ui/react/merge-props"
import { useRender } from "@base-ui/react/use-render"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "group/badge inline-flex h-5 w-fit shrink-0 items-center justify-center gap-1 overflow-hidden rounded-4xl border border-transparent px-2 py-0.5 text-xs font-medium whitespace-nowrap transition-all focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 [&>svg]:pointer-events-none [&>svg]:size-3!",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground [a]:hover:bg-primary/80",
        secondary:
          "bg-secondary text-secondary-foreground [a]:hover:bg-secondary/80",
        destructive:
          "bg-destructive/10 text-destructive focus-visible:ring-destructive/20 dark:bg-destructive/20 dark:focus-visible:ring-destructive/40 [a]:hover:bg-destructive/20",
        outline:
          "border-border text-foreground [a]:hover:bg-muted [a]:hover:text-muted-foreground",
        ghost:
          "hover:bg-muted hover:text-muted-foreground dark:hover:bg-muted/50",
        link: "text-primary underline-offset-4 hover:underline",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function Badge({
  className,
  variant = "default",
  render,
  ...props
}: useRender.ComponentProps<"span"> & VariantProps<typeof badgeVariants>) {
  return useRender({
    defaultTagName: "span",
    props: mergeProps<"span">(
      {
        className: cn(badgeVariants({ variant }), className),
      },
      props
    ),
    render,
    state: {
      slot: "badge",
      variant,
    },
  })
}

export { Badge, badgeVariants }

```


---
## FILE: client/src/components/ui/button.tsx

```tsx
"use client"

import { Button as ButtonPrimitive } from "@base-ui/react/button"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center rounded-lg border border-transparent bg-clip-padding text-sm font-medium whitespace-nowrap transition-all outline-none select-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 active:not-aria-[haspopup]:translate-y-px disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground [a]:hover:bg-primary/80",
        outline:
          "border-border bg-background hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground dark:border-input dark:bg-input/30 dark:hover:bg-input/50",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80 aria-expanded:bg-secondary aria-expanded:text-secondary-foreground",
        ghost:
          "hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground dark:hover:bg-muted/50",
        destructive:
          "bg-destructive/10 text-destructive hover:bg-destructive/20 focus-visible:border-destructive/40 focus-visible:ring-destructive/20 dark:bg-destructive/20 dark:hover:bg-destructive/30 dark:focus-visible:ring-destructive/40",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default:
          "h-8 gap-1.5 px-2.5 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2",
        xs: "h-6 gap-1 rounded-[min(var(--radius-md),10px)] px-2 text-xs in-data-[slot=button-group]:rounded-lg has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3",
        sm: "h-7 gap-1 rounded-[min(var(--radius-md),12px)] px-2.5 text-[0.8rem] in-data-[slot=button-group]:rounded-lg has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3.5",
        lg: "h-9 gap-1.5 px-2.5 has-data-[icon=inline-end]:pr-3 has-data-[icon=inline-start]:pl-3",
        icon: "size-8",
        "icon-xs":
          "size-6 rounded-[min(var(--radius-md),10px)] in-data-[slot=button-group]:rounded-lg [&_svg:not([class*='size-'])]:size-3",
        "icon-sm":
          "size-7 rounded-[min(var(--radius-md),12px)] in-data-[slot=button-group]:rounded-lg",
        "icon-lg": "size-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant = "default",
  size = "default",
  ...props
}: ButtonPrimitive.Props & VariantProps<typeof buttonVariants>) {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }

```


---
## FILE: client/src/components/ui/dialog.tsx

```tsx
"use client"

import * as React from "react"
import * as DialogPrimitive from "@radix-ui/react-dialog"
import { X as CloseIcon } from "lucide-react"

import { cn } from "@/lib/utils"

const Dialog = DialogPrimitive.Root

const DialogTrigger = DialogPrimitive.Trigger

const DialogPortal = DialogPrimitive.Portal

const DialogClose = DialogPrimitive.Close

const DialogOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn(
      "fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    )}
    {...props}
  />
))
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName

const DialogContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <DialogPortal>
    <DialogOverlay />
    <DialogPrimitive.Content
      ref={ref}
      className={cn(
        "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg",
        className
      )}
      {...props}
    >
      {children}
      <DialogPrimitive.Close className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
        <CloseIcon className="h-4 w-4" />
        <span className="sr-only">Close</span>
      </DialogPrimitive.Close>
    </DialogPrimitive.Content>
  </DialogPortal>
))
DialogContent.displayName = DialogPrimitive.Content.displayName

const DialogHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex flex-col space-y-1.5 text-center sm:text-left",
      className
    )}
    {...props}
  />
)
DialogHeader.displayName = "DialogHeader"

const DialogFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
      className
    )}
    {...props}
  />
)
DialogFooter.displayName = "DialogFooter"

const DialogTitle = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn(
      "text-lg font-semibold leading-none tracking-tight",
      className
    )}
    {...props}
  />
))
DialogTitle.displayName = DialogPrimitive.Title.displayName

const DialogDescription = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
))
DialogDescription.displayName = DialogPrimitive.Description.displayName

export {
  Dialog,
  DialogPortal,
  DialogOverlay,
  DialogTrigger,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
}

```


---
## FILE: client/src/components/ui/dropdown-menu.tsx

```tsx
"use client"

import * as React from "react"
import { Menu as MenuPrimitive } from "@base-ui/react/menu"

import { cn } from "@/lib/utils"
import { ChevronRightIcon, CheckIcon } from "lucide-react"

function DropdownMenu({ ...props }: MenuPrimitive.Root.Props) {
  return <MenuPrimitive.Root data-slot="dropdown-menu" {...props} />
}

function DropdownMenuPortal({ ...props }: MenuPrimitive.Portal.Props) {
  return <MenuPrimitive.Portal data-slot="dropdown-menu-portal" {...props} />
}

function DropdownMenuTrigger({ ...props }: MenuPrimitive.Trigger.Props) {
  return <MenuPrimitive.Trigger data-slot="dropdown-menu-trigger" {...props} />
}

function DropdownMenuContent({
  align = "start",
  alignOffset = 0,
  side = "bottom",
  sideOffset = 4,
  className,
  ...props
}: MenuPrimitive.Popup.Props &
  Pick<
    MenuPrimitive.Positioner.Props,
    "align" | "alignOffset" | "side" | "sideOffset"
  >) {
  return (
    <MenuPrimitive.Portal>
      <MenuPrimitive.Positioner
        className="isolate z-50 outline-none"
        align={align}
        alignOffset={alignOffset}
        side={side}
        sideOffset={sideOffset}
      >
        <MenuPrimitive.Popup
          data-slot="dropdown-menu-content"
          className={cn("z-50 max-h-(--available-height) w-(--anchor-width) min-w-32 origin-(--transform-origin) overflow-x-hidden overflow-y-auto rounded-lg bg-popover p-1 text-popover-foreground shadow-md ring-1 ring-foreground/10 duration-100 outline-none data-[side=bottom]:slide-in-from-top-2 data-[side=inline-end]:slide-in-from-left-2 data-[side=inline-start]:slide-in-from-right-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:overflow-hidden data-closed:fade-out-0 data-closed:zoom-out-95", className )}
          {...props}
        />
      </MenuPrimitive.Positioner>
    </MenuPrimitive.Portal>
  )
}

function DropdownMenuGroup({ ...props }: MenuPrimitive.Group.Props) {
  return <MenuPrimitive.Group data-slot="dropdown-menu-group" {...props} />
}

function DropdownMenuLabel({
  className,
  inset,
  ...props
}: MenuPrimitive.GroupLabel.Props & {
  inset?: boolean
}) {
  return (
    <MenuPrimitive.GroupLabel
      data-slot="dropdown-menu-label"
      data-inset={inset}
      className={cn(
        "px-1.5 py-1 text-xs font-medium text-muted-foreground data-inset:pl-7",
        className
      )}
      {...props}
    />
  )
}

function DropdownMenuItem({
  className,
  inset,
  variant = "default",
  ...props
}: MenuPrimitive.Item.Props & {
  inset?: boolean
  variant?: "default" | "destructive"
}) {
  return (
    <MenuPrimitive.Item
      data-slot="dropdown-menu-item"
      data-inset={inset}
      data-variant={variant}
      className={cn(
        "group/dropdown-menu-item relative flex cursor-default items-center gap-1.5 rounded-md px-1.5 py-1 text-sm outline-hidden select-none focus:bg-accent focus:text-accent-foreground not-data-[variant=destructive]:focus:**:text-accent-foreground data-inset:pl-7 data-[variant=destructive]:text-destructive data-[variant=destructive]:focus:bg-destructive/10 data-[variant=destructive]:focus:text-destructive dark:data-[variant=destructive]:focus:bg-destructive/20 data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 data-[variant=destructive]:*:[svg]:text-destructive",
        className
      )}
      {...props}
    />
  )
}

function DropdownMenuSub({ ...props }: MenuPrimitive.SubmenuRoot.Props) {
  return <MenuPrimitive.SubmenuRoot data-slot="dropdown-menu-sub" {...props} />
}

function DropdownMenuSubTrigger({
  className,
  inset,
  children,
  ...props
}: MenuPrimitive.SubmenuTrigger.Props & {
  inset?: boolean
}) {
  return (
    <MenuPrimitive.SubmenuTrigger
      data-slot="dropdown-menu-sub-trigger"
      data-inset={inset}
      className={cn(
        "flex cursor-default items-center gap-1.5 rounded-md px-1.5 py-1 text-sm outline-hidden select-none focus:bg-accent focus:text-accent-foreground not-data-[variant=destructive]:focus:**:text-accent-foreground data-inset:pl-7 data-popup-open:bg-accent data-popup-open:text-accent-foreground data-open:bg-accent data-open:text-accent-foreground [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      {...props}
    >
      {children}
      <ChevronRightIcon className="ml-auto" />
    </MenuPrimitive.SubmenuTrigger>
  )
}

function DropdownMenuSubContent({
  align = "start",
  alignOffset = -3,
  side = "right",
  sideOffset = 0,
  className,
  ...props
}: React.ComponentProps<typeof DropdownMenuContent>) {
  return (
    <DropdownMenuContent
      data-slot="dropdown-menu-sub-content"
      className={cn("w-auto min-w-[96px] rounded-lg bg-popover p-1 text-popover-foreground shadow-lg ring-1 ring-foreground/10 duration-100 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95", className )}
      align={align}
      alignOffset={alignOffset}
      side={side}
      sideOffset={sideOffset}
      {...props}
    />
  )
}

function DropdownMenuCheckboxItem({
  className,
  children,
  checked,
  inset,
  ...props
}: MenuPrimitive.CheckboxItem.Props & {
  inset?: boolean
}) {
  return (
    <MenuPrimitive.CheckboxItem
      data-slot="dropdown-menu-checkbox-item"
      data-inset={inset}
      className={cn(
        "relative flex cursor-default items-center gap-1.5 rounded-md py-1 pr-8 pl-1.5 text-sm outline-hidden select-none focus:bg-accent focus:text-accent-foreground focus:**:text-accent-foreground data-inset:pl-7 data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      checked={checked}
      {...props}
    >
      <span
        className="pointer-events-none absolute right-2 flex items-center justify-center"
        data-slot="dropdown-menu-checkbox-item-indicator"
      >
        <MenuPrimitive.CheckboxItemIndicator>
          <CheckIcon
          />
        </MenuPrimitive.CheckboxItemIndicator>
      </span>
      {children}
    </MenuPrimitive.CheckboxItem>
  )
}

function DropdownMenuRadioGroup({ ...props }: MenuPrimitive.RadioGroup.Props) {
  return (
    <MenuPrimitive.RadioGroup
      data-slot="dropdown-menu-radio-group"
      {...props}
    />
  )
}

function DropdownMenuRadioItem({
  className,
  children,
  inset,
  ...props
}: MenuPrimitive.RadioItem.Props & {
  inset?: boolean
}) {
  return (
    <MenuPrimitive.RadioItem
      data-slot="dropdown-menu-radio-item"
      data-inset={inset}
      className={cn(
        "relative flex cursor-default items-center gap-1.5 rounded-md py-1 pr-8 pl-1.5 text-sm outline-hidden select-none focus:bg-accent focus:text-accent-foreground focus:**:text-accent-foreground data-inset:pl-7 data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      {...props}
    >
      <span
        className="pointer-events-none absolute right-2 flex items-center justify-center"
        data-slot="dropdown-menu-radio-item-indicator"
      >
        <MenuPrimitive.RadioItemIndicator>
          <CheckIcon
          />
        </MenuPrimitive.RadioItemIndicator>
      </span>
      {children}
    </MenuPrimitive.RadioItem>
  )
}

function DropdownMenuSeparator({
  className,
  ...props
}: MenuPrimitive.Separator.Props) {
  return (
    <MenuPrimitive.Separator
      data-slot="dropdown-menu-separator"
      className={cn("-mx-1 my-1 h-px bg-border", className)}
      {...props}
    />
  )
}

function DropdownMenuShortcut({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="dropdown-menu-shortcut"
      className={cn(
        "ml-auto text-xs tracking-widest text-muted-foreground group-focus/dropdown-menu-item:text-accent-foreground",
        className
      )}
      {...props}
    />
  )
}

export {
  DropdownMenu,
  DropdownMenuPortal,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
}

```


---
## FILE: client/src/components/ui/input.tsx

```tsx
import * as React from "react"
import { Input as InputPrimitive } from "@base-ui/react/input"

import { cn } from "@/lib/utils"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <InputPrimitive
      type={type}
      data-slot="input"
      className={cn(
        "h-8 w-full min-w-0 rounded-lg border border-input bg-transparent px-2.5 py-1 text-base transition-colors outline-none file:inline-flex file:h-6 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-input/50 disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 md:text-sm dark:bg-input/30 dark:disabled:bg-input/80 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40",
        className
      )}
      {...props}
    />
  )
}

export { Input }

```


---
## FILE: client/src/components/ui/scroll-area.tsx

```tsx
"use client"

import * as React from "react"
import { ScrollArea as ScrollAreaPrimitive } from "@base-ui/react/scroll-area"

import { cn } from "@/lib/utils"

function ScrollArea({
  className,
  children,
  ...props
}: ScrollAreaPrimitive.Root.Props) {
  return (
    <ScrollAreaPrimitive.Root
      data-slot="scroll-area"
      className={cn("relative", className)}
      {...props}
    >
      <ScrollAreaPrimitive.Viewport
        data-slot="scroll-area-viewport"
        className="size-full rounded-[inherit] transition-[color,box-shadow] outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:outline-1"
      >
        {children}
      </ScrollAreaPrimitive.Viewport>
      <ScrollBar />
      <ScrollAreaPrimitive.Corner />
    </ScrollAreaPrimitive.Root>
  )
}

function ScrollBar({
  className,
  orientation = "vertical",
  ...props
}: ScrollAreaPrimitive.Scrollbar.Props) {
  return (
    <ScrollAreaPrimitive.Scrollbar
      data-slot="scroll-area-scrollbar"
      data-orientation={orientation}
      orientation={orientation}
      className={cn(
        "flex touch-none p-px transition-colors select-none data-horizontal:h-2.5 data-horizontal:flex-col data-horizontal:border-t data-horizontal:border-t-transparent data-vertical:h-full data-vertical:w-2.5 data-vertical:border-l data-vertical:border-l-transparent",
        className
      )}
      {...props}
    >
      <ScrollAreaPrimitive.Thumb
        data-slot="scroll-area-thumb"
        className="relative flex-1 rounded-full bg-border"
      />
    </ScrollAreaPrimitive.Scrollbar>
  )
}

export { ScrollArea, ScrollBar }

```


---
## FILE: client/src/components/ui/select.tsx

```tsx
"use client"

import * as React from "react"
import { Select as SelectPrimitive } from "@base-ui/react/select"

import { cn } from "@/lib/utils"
import { ChevronDownIcon, CheckIcon, ChevronUpIcon } from "lucide-react"

const Select = SelectPrimitive.Root

function SelectGroup({ className, ...props }: SelectPrimitive.Group.Props) {
  return (
    <SelectPrimitive.Group
      data-slot="select-group"
      className={cn("scroll-my-1 p-1", className)}
      {...props}
    />
  )
}

function SelectValue({ className, ...props }: SelectPrimitive.Value.Props) {
  return (
    <SelectPrimitive.Value
      data-slot="select-value"
      className={cn("flex flex-1 text-left", className)}
      {...props}
    />
  )
}

function SelectTrigger({
  className,
  size = "default",
  children,
  ...props
}: SelectPrimitive.Trigger.Props & {
  size?: "sm" | "default"
}) {
  return (
    <SelectPrimitive.Trigger
      data-slot="select-trigger"
      data-size={size}
      className={cn(
        "flex w-fit items-center justify-between gap-1.5 rounded-lg border border-input bg-transparent py-2 pr-2 pl-2.5 text-sm whitespace-nowrap transition-colors outline-none select-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 data-placeholder:text-muted-foreground data-[size=default]:h-8 data-[size=sm]:h-7 data-[size=sm]:rounded-[min(var(--radius-md),10px)] *:data-[slot=select-value]:line-clamp-1 *:data-[slot=select-value]:flex *:data-[slot=select-value]:items-center *:data-[slot=select-value]:gap-1.5 dark:bg-input/30 dark:hover:bg-input/50 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      {...props}
    >
      {children}
      <SelectPrimitive.Icon
        render={
          <ChevronDownIcon className="pointer-events-none size-4 text-muted-foreground" />
        }
      />
    </SelectPrimitive.Trigger>
  )
}

function SelectContent({
  className,
  children,
  side = "bottom",
  sideOffset = 4,
  align = "center",
  alignOffset = 0,
  alignItemWithTrigger = true,
  ...props
}: SelectPrimitive.Popup.Props &
  Pick<
    SelectPrimitive.Positioner.Props,
    "align" | "alignOffset" | "side" | "sideOffset" | "alignItemWithTrigger"
  >) {
  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Positioner
        side={side}
        sideOffset={sideOffset}
        align={align}
        alignOffset={alignOffset}
        alignItemWithTrigger={alignItemWithTrigger}
        className="isolate z-50"
      >
        <SelectPrimitive.Popup
          data-slot="select-content"
          data-align-trigger={alignItemWithTrigger}
          className={cn("relative isolate z-50 max-h-(--available-height) w-(--anchor-width) min-w-36 origin-(--transform-origin) overflow-x-hidden overflow-y-auto rounded-lg bg-popover text-popover-foreground shadow-md ring-1 ring-foreground/10 duration-100 data-[align-trigger=true]:animate-none data-[side=bottom]:slide-in-from-top-2 data-[side=inline-end]:slide-in-from-left-2 data-[side=inline-start]:slide-in-from-right-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95", className )}
          {...props}
        >
          <SelectScrollUpButton />
          <SelectPrimitive.List>{children}</SelectPrimitive.List>
          <SelectScrollDownButton />
        </SelectPrimitive.Popup>
      </SelectPrimitive.Positioner>
    </SelectPrimitive.Portal>
  )
}

function SelectLabel({
  className,
  ...props
}: SelectPrimitive.GroupLabel.Props) {
  return (
    <SelectPrimitive.GroupLabel
      data-slot="select-label"
      className={cn("px-1.5 py-1 text-xs text-muted-foreground", className)}
      {...props}
    />
  )
}

function SelectItem({
  className,
  children,
  ...props
}: SelectPrimitive.Item.Props) {
  return (
    <SelectPrimitive.Item
      data-slot="select-item"
      className={cn(
        "relative flex w-full cursor-default items-center gap-1.5 rounded-md py-1 pr-8 pl-1.5 text-sm outline-hidden select-none focus:bg-accent focus:text-accent-foreground not-data-[variant=destructive]:focus:**:text-accent-foreground data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 *:[span]:last:flex *:[span]:last:items-center *:[span]:last:gap-2",
        className
      )}
      {...props}
    >
      <SelectPrimitive.ItemText className="flex flex-1 shrink-0 gap-2 whitespace-nowrap">
        {children}
      </SelectPrimitive.ItemText>
      <SelectPrimitive.ItemIndicator
        render={
          <span className="pointer-events-none absolute right-2 flex size-4 items-center justify-center" />
        }
      >
        <CheckIcon className="pointer-events-none" />
      </SelectPrimitive.ItemIndicator>
    </SelectPrimitive.Item>
  )
}

function SelectSeparator({
  className,
  ...props
}: SelectPrimitive.Separator.Props) {
  return (
    <SelectPrimitive.Separator
      data-slot="select-separator"
      className={cn("pointer-events-none -mx-1 my-1 h-px bg-border", className)}
      {...props}
    />
  )
}

function SelectScrollUpButton({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.ScrollUpArrow>) {
  return (
    <SelectPrimitive.ScrollUpArrow
      data-slot="select-scroll-up-button"
      className={cn(
        "top-0 z-10 flex w-full cursor-default items-center justify-center bg-popover py-1 [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      {...props}
    >
      <ChevronUpIcon
      />
    </SelectPrimitive.ScrollUpArrow>
  )
}

function SelectScrollDownButton({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.ScrollDownArrow>) {
  return (
    <SelectPrimitive.ScrollDownArrow
      data-slot="select-scroll-down-button"
      className={cn(
        "bottom-0 z-10 flex w-full cursor-default items-center justify-center bg-popover py-1 [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      {...props}
    >
      <ChevronDownIcon
      />
    </SelectPrimitive.ScrollDownArrow>
  )
}

export {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectScrollDownButton,
  SelectScrollUpButton,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
}

```


---
## FILE: client/src/components/ui/separator.tsx

```tsx
"use client"

import { Separator as SeparatorPrimitive } from "@base-ui/react/separator"

import { cn } from "@/lib/utils"

function Separator({
  className,
  orientation = "horizontal",
  ...props
}: SeparatorPrimitive.Props) {
  return (
    <SeparatorPrimitive
      data-slot="separator"
      orientation={orientation}
      className={cn(
        "shrink-0 bg-border data-horizontal:h-px data-horizontal:w-full data-vertical:w-px data-vertical:self-stretch",
        className
      )}
      {...props}
    />
  )
}

export { Separator }

```


---
## FILE: client/src/components/ui/textarea.tsx

```tsx
import * as React from "react"

import { cn } from "@/lib/utils"

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "flex field-sizing-content min-h-16 w-full rounded-lg border border-input bg-transparent px-2.5 py-2 text-base transition-colors outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:bg-input/50 disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 md:text-sm dark:bg-input/30 dark:disabled:bg-input/80 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40",
        className
      )}
      {...props}
    />
  )
}

export { Textarea }

```


---
## FILE: client/src/hooks/useAIChat.ts

```ts
// File: client/src/hooks/useAIChat.ts
'use client';

import { useState, useEffect, useCallback } from 'react';
import { getAIProviders, getAIModels, generateAIChat } from '@/lib/api';

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  isSuccess?: boolean;
}

export interface ProviderOption {
  id: string;
  label: string;
  description?: string;
}

export interface ModelOption {
  id: string;
  label: string;
}

const LS_PROVIDER = 'fm_ai_provider';
const LS_MODEL    = 'fm_ai_model';
const LS_APIKEY   = 'fm_ai_apikey';

function readLS(key: string): string {
  if (typeof window === 'undefined') return '';
  return localStorage.getItem(key) ?? '';
}

export function useAIChat() {
  const [providers, setProviders]   = useState<ProviderOption[]>([]);
  const [models, setModels]         = useState<ModelOption[]>([]);
  const [provider, setProviderRaw]  = useState<string>('');
  const [model, setModelRaw]        = useState<string>('');
  const [apiKey, setApiKeyRaw]      = useState<string>('');
  const [prompt, setPrompt]         = useState<string>('');
  const [messages, setMessages]     = useState<ChatMessage[]>([]);
  const [loading, setLoading]       = useState(false);
  const [error, setError]           = useState<string | null>(null);
  const [providersLoading, setProvidersLoading] = useState(false);
  const [modelsLoading, setModelsLoading]       = useState(false);

  // ── Restore from localStorage on first mount ──────────────────────────────
  useEffect(() => {
    const savedProvider = readLS(LS_PROVIDER);
    const savedModel    = readLS(LS_MODEL);
    const savedApiKey   = readLS(LS_APIKEY);
    if (savedProvider) setProviderRaw(savedProvider);
    if (savedModel)    setModelRaw(savedModel);
    if (savedApiKey)   setApiKeyRaw(savedApiKey);
  }, []);

  // ── Persist to localStorage whenever values change ────────────────────────
  const setProvider = useCallback((val: string) => {
    setProviderRaw(val);
    setModelRaw('');                        // reset model when provider changes
    localStorage.setItem(LS_PROVIDER, val);
    localStorage.removeItem(LS_MODEL);
  }, []);

  const setModel = useCallback((val: string) => {
    setModelRaw(val);
    localStorage.setItem(LS_MODEL, val);
  }, []);

  const setApiKey = useCallback((val: string) => {
    setApiKeyRaw(val);
    localStorage.setItem(LS_APIKEY, val);
  }, []);

  // ── Fetch providers on mount ──────────────────────────────────────────────
  useEffect(() => {
    setProvidersLoading(true);
    getAIProviders()
      .then((res) => {
        // res.data can be an array of {id, label} or a string[] or an object
        const raw = res?.data ?? [];
        let list: ProviderOption[] = [];
        if (Array.isArray(raw)) {
          list = raw.map((p: any) =>
            typeof p === 'string' ? { id: p, label: p } : p,
          );
        } else if (typeof raw === 'object') {
          list = Object.keys(raw).map((k) => ({ id: k, label: k }));
        }
        setProviders(list);
      })
      .catch((e) => console.error('[useAIChat] Failed to load providers:', e))
      .finally(() => setProvidersLoading(false));
  }, []);

  // ── Fetch models whenever provider changes ────────────────────────────────
  useEffect(() => {
    if (!provider) { setModels([]); return; }
    setModelsLoading(true);
    getAIModels(provider)
      .then((res) => {
        const raw = res?.data ?? [];
        let list: ModelOption[] = [];
        if (Array.isArray(raw)) {
          list = raw.map((m: any) =>
            typeof m === 'string' ? { id: m, label: m } : m,
          );
        }
        setModels(list);

        // If previously persisted model belongs to this provider, keep it
        const saved = readLS(LS_MODEL);
        if (saved && list.some((m) => m.id === saved)) {
          setModelRaw(saved);
        }
      })
      .catch((e) => console.error('[useAIChat] Failed to load models:', e))
      .finally(() => setModelsLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [provider]);

  // ── Generate ──────────────────────────────────────────────────────────────
  const generate = useCallback(async () => {
    if (!provider || !model || !apiKey || !prompt.trim()) return;

    const userMsg: ChatMessage = {
      id: crypto.randomUUID(),
      role: 'user',
      content: prompt.trim(),
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMsg]);
    setPrompt('');
    setLoading(true);
    setError(null);

    try {
      const res = await generateAIChat({ prompt: userMsg.content, provider, model, apiKey });
      console.log('[FlatMotion AI Response]', res);

      const aiMsg: ChatMessage = {
        id: crypto.randomUUID(),
        role: 'assistant',
        content: 'Generation successful. Check console for the response.',
        timestamp: new Date(),
        isSuccess: true,
      };
      setMessages((prev) => [...prev, aiMsg]);
    } catch (err: any) {
      setError(err.message || 'Failed to generate. Please check your API key and try again.');
    } finally {
      setLoading(false);
    }
  }, [provider, model, apiKey, prompt]);

  const canGenerate = Boolean(provider && model && apiKey && prompt.trim() && !loading);

  return {
    // provider/model/key state
    providers, providersLoading,
    models,    modelsLoading,
    provider, setProvider,
    model,    setModel,
    apiKey,   setApiKey,
    // prompt & chat
    prompt, setPrompt,
    messages,
    // status
    loading, error, canGenerate,
    generate,
  };
}

```


---
## FILE: client/src/hooks/useAPIKeyPersistence.ts

```ts
import { useState, useEffect, useCallback } from 'react';

const API_KEY_STORAGE_KEY = 'apiKey';

export function useAPIKeyPersistence(): [string, (value: string) => void, () => void] {
  const [apiKey, setApiKeyState] = useState<string>('');
  const [isInitialized, setIsInitialized] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    const storedKey = localStorage.getItem(API_KEY_STORAGE_KEY) || '';
    setApiKeyState(storedKey);
    setIsInitialized(true);
  }, []);

  // Save to localStorage whenever apiKey changes
  const setApiKey = useCallback((value: string) => {
    setApiKeyState(value);
    if (value) {
      localStorage.setItem(API_KEY_STORAGE_KEY, value);
    } else {
      localStorage.removeItem(API_KEY_STORAGE_KEY);
    }
  }, []);

  // Clear the API key
  const clearApiKey = useCallback(() => {
    setApiKeyState('');
    localStorage.removeItem(API_KEY_STORAGE_KEY);
  }, []);

  return [apiKey, setApiKey, clearApiKey];
}

```


---
## FILE: client/src/hooks/useAllUserAnimations.ts

```ts
import { useState, useEffect, useCallback, useRef } from 'react';
import { getUserAnimations, getAnimationJob } from '@/lib/api';
import { useAuth } from '@/components/AuthProvider';
import { AnimationJob } from './useAnimationJobs';

export function useAllUserAnimations() {
  const { user } = useAuth();
  const [animations, setAnimations] = useState<AnimationJob[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Poll references
  const pollIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const activeJobIdsRef = useRef<Set<string>>(new Set());

  const fetchAnimations = useCallback(async () => {
    if (!user?.id) {
      setAnimations([]);
      return;
    }
    setLoading(true);
    try {
      const res = await getUserAnimations(user.id);
      const data = res.data || [];

      // Filter out expired animations
      const filtered = data.filter((a: AnimationJob) => a.status !== 'expired');
      setAnimations(filtered);

      // Keep track of active tasks
      const activeIds = new Set<string>();
      filtered.forEach((a: AnimationJob) => {
        if (!['done', 'failed', 'expired'].includes(a.status)) {
          activeIds.add(a.id);
        }
      });
      activeJobIdsRef.current = activeIds;
    } catch (err: any) {
      setError(err.message || 'Failed to fetch animations');
    } finally {
      setLoading(false);
    }
  }, [user?.id]);

  useEffect(() => {
    fetchAnimations();
  }, [fetchAnimations]);

  // Poller logic - similar to useAnimationJobs
  useEffect(() => {
    const pollFn = async () => {
      if (activeJobIdsRef.current.size === 0) return;

      const updatedAnimations = [...animations];
      let changed = false;

      for (const jobId of Array.from(activeJobIdsRef.current)) {
        try {
          const res = await getAnimationJob(jobId);
          if (res.data) {
            const index = updatedAnimations.findIndex(a => a.id === jobId);
            if (index > -1) {
              if (updatedAnimations[index].status !== res.data.status) {
                updatedAnimations[index] = res.data;
                changed = true;
              }
              if (['done', 'failed', 'expired'].includes(res.data.status)) {
                activeJobIdsRef.current.delete(jobId);
                updatedAnimations[index] = res.data;
                changed = true;
              }
            }
          }
        } catch (e) {
          // ignore transient poll errors
        }
      }

      if (changed) {
        setAnimations(updatedAnimations);
      }
    };

    pollIntervalRef.current = setInterval(pollFn, 2000);
    return () => {
      if (pollIntervalRef.current) clearInterval(pollIntervalRef.current);
    };
  }, [animations]);

  return {
    animations,
    loading,
    error,
    refreshAnimations: fetchAnimations
  };
}

```


---
## FILE: client/src/hooks/useAnimationJobs.ts

```ts
import { useState, useEffect, useCallback, useRef } from 'react';
import { generateAnimation, getAnimationJob, getProjectAnimations, deleteAnimationJob, regenerateAnimationJob } from '@/lib/api';
import { useAuth } from '@/components/AuthProvider';

export interface AnimationJob {
  id: string;
  projectId: string;
  userId: string;
  prompt: string;
  status: 'pending' | 'processing' | 'generating_code' | 'rendering' | 'uploading' | 'done' | 'failed' | 'expired';
  provider: string;
  model: string;
  generatedCode: string | null;
  videoUrl: string | null;
  errorMessage: string | null;
  createdAt: string;
  updatedAt: string;
  expiresAt: string | null;
}

export function useAnimationJobs(projectId: string | null) {
  const { user } = useAuth();
  const [jobs, setJobs] = useState<AnimationJob[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Poll references
  const pollIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const activeJobIdsRef = useRef<Set<string>>(new Set());

  const fetchJobs = useCallback(async () => {
    if (!projectId) {
      setJobs([]);
      return;
    }
    setLoading(true);
    try {
      const res = await getProjectAnimations(projectId);
      const data = res.data || [];
      setJobs(data);
      
      // Keep track of active tasks implicitly from the DB
      const activeIds = new Set<string>();
      data.forEach((j: AnimationJob) => {
        if (!['done', 'failed', 'expired'].includes(j.status)) {
          activeIds.add(j.id);
        }
      });
      activeJobIdsRef.current = activeIds;
    } catch (err: any) {
      setError(err.message || 'Failed to fetch jobs');
    } finally {
      setLoading(false);
    }
  }, [projectId]);

  useEffect(() => {
    fetchJobs();
  }, [fetchJobs]);

  // Poller logic
  useEffect(() => {
    const pollFn = async () => {
      if (activeJobIdsRef.current.size === 0) return;

      const updatedJobs = [...jobs];
      let changed = false;

      for (const jid of Array.from(activeJobIdsRef.current)) {
        try {
          const res = await getAnimationJob(jid);
          if (res.data) {
            const index = updatedJobs.findIndex(j => j.id === jid);
            if (index > -1) {
              if (updatedJobs[index].status !== res.data.status) {
                updatedJobs[index] = res.data;
                changed = true;
              }
              if (['done', 'failed', 'expired'].includes(res.data.status)) {
                activeJobIdsRef.current.delete(jid);
                updatedJobs[index] = res.data;
                changed = true;
              }
            }
          }
        } catch (e) {
          // ignore transient poll errors
        }
      }

      if (changed) {
        setJobs(updatedJobs);
      }
    };

    pollIntervalRef.current = setInterval(pollFn, 2000);
    return () => {
      if (pollIntervalRef.current) clearInterval(pollIntervalRef.current);
    };
  }, [jobs]); // Re-bind closure when state changes so it has fresh copy

  const generate = async (prompt: string, provider: string, model: string, apiKey?: string) => {
    if (!projectId || !user?.id) throw new Error('No project or user active');
    try {
      const res = await generateAnimation({
        prompt, projectId, userId: user.id, provider, model, apiKey
      });
      if (res.data) {
        setJobs(prev => [res.data, ...prev]);
        activeJobIdsRef.current.add(res.data.id);
        return res.data;
      }
    } catch (err: any) {
      throw err;
    }
  };

  const regenerate = async (jobId: string) => {
    try {
      const res = await regenerateAnimationJob(jobId);
      if (res.data) {
        setJobs(prev => [res.data, ...prev]); // regeneration creates a NEW pipeline job, prepend it
        activeJobIdsRef.current.add(res.data.id);
        return res.data;
      }
    } catch (err: any) {
      throw err;
    }
  };

  const removeJob = async (jobId: string) => {
    try {
      await deleteAnimationJob(jobId);
      setJobs(prev => prev.filter(j => j.id !== jobId));
      activeJobIdsRef.current.delete(jobId);
    } catch (err: any) {
      throw err;
    }
  };

  return {
    jobs,
    loading,
    error,
    generate,
    regenerate,
    removeJob,
    refreshJobs: fetchJobs
  };
}

```


---
## FILE: client/src/hooks/useLiveKitRoom.ts

```ts
// File: client/src/hooks/useLiveKitRoom.ts
'use client';

import { useState, useCallback } from 'react';

interface LiveKitRoomInfo {
  token: string;
  url: string;
  identity: string;
  displayName: string;
  isAdmin: boolean;
  roomName: string;
}

interface UseLiveKitRoomReturn {
  roomInfo: LiveKitRoomInfo | null;
  isLoading: boolean;
  error: string | null;
  fetchToken: (slug: string, displayName?: string) => Promise<LiveKitRoomInfo | null>;
}

export function useLiveKitRoom(): UseLiveKitRoomReturn {
  const [roomInfo, setRoomInfo] = useState<LiveKitRoomInfo | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchToken = useCallback(async (slug: string, displayName?: string): Promise<LiveKitRoomInfo | null> => {
    setIsLoading(true);
    setError(null);

    try {
      const backendUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

      const response = await fetch(`${backendUrl}/api/rooms/join`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include', // send session cookie for host detection
        body: JSON.stringify({ slug, displayName }),
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.error || 'Failed to join room');
      }

      const data: LiveKitRoomInfo = await response.json();
      setRoomInfo(data);

      const role = data.isAdmin ? 'Host' : 'Guest';
      console.log(`[LiveKit] Joined room as ${role} | identity="${data.identity}" room="${data.roomName}"`);

      return data;
    } catch (err: any) {
      setError(err.message || 'Unknown error');
      console.error('[LiveKit] Failed to fetch token:', err);
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { roomInfo, isLoading, error, fetchToken };
}

```


---
## FILE: client/src/hooks/useProjects.ts

```ts
import { useState, useEffect, useCallback } from 'react';
import { getProjects, createProject, deleteProject, updateProject } from '@/lib/api';
import { useAuth } from '@/components/AuthProvider';

export interface Project {
  id: string;
  title: string;
  description: string | null;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

export function useProjects() {
  const { user, loading: authLoading } = useAuth();
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchProjects = useCallback(async () => {
    if (!user?.id) return;
    setLoading(true);
    setError(null);
    try {
      const res = await getProjects(user.id);
      const data = res.data || [];
      setProjects(data);
      if (data.length > 0 && !selectedProjectId) {
        setSelectedProjectId(data[0].id);
      }
    } catch (err: any) {
      setError(err.message || 'Failed to link projects');
    } finally {
      setLoading(false);
    }
  }, [user?.id, selectedProjectId]);

  useEffect(() => {
    if (!authLoading && user) {
      fetchProjects();
    }
  }, [authLoading, user, fetchProjects]);

  const addProject = async (title: string, description?: string) => {
    if (!user) return null;
    try {
      const res = await createProject({ title, description, userId: user.id });
      if (res.data) {
        setProjects(prev => [res.data, ...prev]);
        setSelectedProjectId(res.data.id);
        return res.data;
      }
    } catch (err: any) {
      throw err;
    }
  };

  const removeProject = async (id: string) => {
    try {
      await deleteProject(id);
      setProjects(prev => prev.filter(p => p.id !== id));
      if (selectedProjectId === id) {
        setSelectedProjectId(null); // Will auto-select first in fetch if we wanted
      }
    } catch (err: any) {
      throw err;
    }
  };

  const editProject = async (id: string, updates: { title?: string; description?: string }) => {
    try {
      const res = await updateProject(id, updates);
      if (res.data) {
        setProjects(prev => prev.map(p => p.id === id ? res.data : p));
        return res.data;
      }
    } catch (err: any) {
      throw err;
    }
  };

  return {
    projects,
    selectedProjectId,
    setSelectedProjectId,
    loading,
    error,
    addProject,
    removeProject,
    editProject,
    refreshProjects: fetchProjects
  };
}

```


---
## FILE: client/src/hooks/useRecordingEngine.ts

```ts
import { useState, useRef, useEffect, useCallback } from 'react';
import { localDb } from '../lib/db';

interface UseRecordingEngineProps {
  trackId: string;
}

export function useRecordingEngine({ trackId }: UseRecordingEngineProps) {
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [hasPendingChunks, setHasPendingChunks] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunkIndexRef = useRef(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const uploadLoopRef = useRef<boolean>(false);

  // Check pending chunks status
  const checkPendingChunks = useCallback(async () => {
    const count = await localDb.chunks
      .where('status')
      .equals('pending')
      .filter(chunk => chunk.trackId === trackId)
      .count();
    setHasPendingChunks(count > 0);
  }, [trackId]);

  // Background Uploader logic
  const uploadPendingChunks = useCallback(async () => {
    if (uploadLoopRef.current) return;
    uploadLoopRef.current = true;

    try {
      while (true) {
        // Grab one pending chunk sequentially
        const pendingChunk = await localDb.chunks
          .where('status')
          .equals('pending')
          .filter(chunk => chunk.trackId === trackId)
          .first();

        if (!pendingChunk) {
          break; // Nothing pending left right now
        }

        console.log(`[Uploader] Attempting to upload chunk #${pendingChunk.chunkIndex}`);

        const formData = new FormData();
        formData.append('trackId', pendingChunk.trackId);
        formData.append('chunkIndex', pendingChunk.chunkIndex.toString());
        formData.append('blob', pendingChunk.blob, `chunk_${pendingChunk.chunkIndex}.webm`);

        const backendUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

        const response = await fetch(`${backendUrl}/api/recording/upload-chunk`, {
          method: 'POST',
          body: formData,
        });

        if (response.ok || response.status === 409) {
          // Success or already exists (409) means we can mark it done
          await localDb.chunks.update(pendingChunk.id!, { status: 'uploaded' });
          console.log(`[Uploader] Chunk #${pendingChunk.chunkIndex} successfully synced to server.`);
        } else {
          console.warn(`[Uploader] Upload failed for chunk #${pendingChunk.chunkIndex}, status: ${response.status}. Will retry.`);
          break; // Stop loop to avoid spamming. The interval will retry it.
        }
      }
    } catch (err: any) {
      console.warn(`[Uploader] Upload network error: ${err.message}. Will retry.`);
    } finally {
      uploadLoopRef.current = false;
      await checkPendingChunks();
    }
  }, [trackId, checkPendingChunks]);

  // Uploader Polling interval (acts as background worker)
  useEffect(() => {
    const uploaderInterval = setInterval(() => {
      uploadPendingChunks();
    }, 2000); // Poll every 2 seconds for pending chunks

    return () => clearInterval(uploaderInterval);
  }, [uploadPendingChunks]);

  const startRecording = useCallback(async (stream: MediaStream) => {
    if (isRecording) return;
    
    // reset counters
    chunkIndexRef.current = 0;
    setRecordingTime(0);

    const recorder = new MediaRecorder(stream, { mimeType: 'video/webm; codecs=vp8,opus' });
    mediaRecorderRef.current = recorder;

    console.log(`[LocalStore] Starting MediaRecorder for track ${trackId}`);

    recorder.ondataavailable = async (e) => {
      if (e.data && e.data.size > 0) {
        const index = chunkIndexRef.current++;
        await localDb.chunks.add({
          trackId,
          chunkIndex: index,
          blob: e.data,
          status: 'pending',
          createdAt: Date.now(),
        });
        console.log(`[LocalStore] Chunk #${index} saved to IndexedDB.`);
        setHasPendingChunks(true);
      }
    };

    recorder.start(5000);
    setIsRecording(true);

    timerRef.current = setInterval(() => {
      setRecordingTime(prev => prev + 1);
    }, 1000);

  }, [isRecording, trackId]);

  const stopRecording = useCallback(() => {
    if (!mediaRecorderRef.current || !isRecording) return;
    
    console.log(`[LocalStore] Stopping MediaRecorder for track ${trackId}`);
    mediaRecorderRef.current.stop();
    setIsRecording(false);
    
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    
    // Trigger an immediate upload pass after stopping
    setTimeout(uploadPendingChunks, 500);

  }, [isRecording, trackId, uploadPendingChunks]);

  return {
    isRecording,
    recordingTime,
    hasPendingChunks,
    startRecording,
    stopRecording,
  };
}

```


---
## FILE: client/src/hooks/useSyncedRecording.ts

```ts
// File: client/src/hooks/useSyncedRecording.ts
'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import { Room, RoomEvent } from 'livekit-client';
import { useRecordingEngine } from './useRecordingEngine';

// Message types sent via LiveKit DataChannel
export const SYNC_MESSAGES = {
  START_RECORDING: 'START_RECORDING',
  STOP_RECORDING: 'STOP_RECORDING',
} as const;

interface UseSyncedRecordingProps {
  trackId: string;
  room: Room | null;
  isAdmin: boolean;
  recordingStream: MediaStream | null;
}

export function useSyncedRecording({
  trackId,
  room,
  isAdmin,
  recordingStream,
}: UseSyncedRecordingProps) {
  const { isRecording, recordingTime, startRecording, stopRecording, hasPendingChunks } =
    useRecordingEngine({ trackId });
  const [countdown, setCountdown] = useState<number | null>(null);
  const countdownTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Start countdown then trigger recording
  const beginCountdownAndRecord = useCallback(async () => {
    if (!recordingStream) return;

    setCountdown(3);

    let count = 3;
    countdownTimerRef.current = setInterval(() => {
      count -= 1;
      if (count <= 0) {
        clearInterval(countdownTimerRef.current!);
        setCountdown(null);
        startRecording(recordingStream);
      } else {
        setCountdown(count);
      }
    }, 1000);
  }, [recordingStream, startRecording]);

  // Listen for data messages from the room
  useEffect(() => {
    if (!room) return;

    const handleData = (payload: Uint8Array) => {
      try {
        const msg = JSON.parse(new TextDecoder().decode(payload));

        if (msg.type === SYNC_MESSAGES.START_RECORDING) {
          console.log('[Sync] Received START_RECORDING signal from Host');
          console.log('[Uploader] Starting background upload for Guest Track...');
          beginCountdownAndRecord();
        } else if (msg.type === SYNC_MESSAGES.STOP_RECORDING) {
          console.log('[Sync] Received STOP_RECORDING signal from Host');
          if (countdownTimerRef.current) {
            clearInterval(countdownTimerRef.current);
            setCountdown(null);
          }
          stopRecording();
        }
      } catch (e) {
        // Ignore non-JSON data packets
      }
    };

    room.on(RoomEvent.DataReceived, handleData);
    return () => {
      room.off(RoomEvent.DataReceived, handleData);
    };
  }, [room, beginCountdownAndRecord, stopRecording]);

  // Cleanup
  useEffect(() => {
    return () => {
      if (countdownTimerRef.current) clearInterval(countdownTimerRef.current);
    };
  }, []);

  // HOST ONLY: broadcast start to all participants (including self)
  const broadcastStart = useCallback(async () => {
    if (!room || !isAdmin) return;

    const msg = JSON.stringify({ type: SYNC_MESSAGES.START_RECORDING });
    const encoded = new TextEncoder().encode(msg);
    await room.localParticipant.publishData(encoded, { reliable: true });

    // Also trigger on host side
    console.log('[Sync] Host broadcasting START_RECORDING');
    beginCountdownAndRecord();
  }, [room, isAdmin, beginCountdownAndRecord]);

  // HOST ONLY: broadcast stop
  const broadcastStop = useCallback(async () => {
    if (!room || !isAdmin) return;

    const msg = JSON.stringify({ type: SYNC_MESSAGES.STOP_RECORDING });
    const encoded = new TextEncoder().encode(msg);
    await room.localParticipant.publishData(encoded, { reliable: true });

    console.log('[Sync] Host broadcasting STOP_RECORDING');
    stopRecording();
  }, [room, isAdmin, stopRecording]);

  return {
    isRecording,
    recordingTime,
    countdown,
    hasPendingChunks,
    broadcastStart,
    broadcastStop,
  };
}

```


---
## FILE: client/src/lib/api.ts

```ts
// Standardize BASE_URL: ensure it ends with /api if not present
let rawBaseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
if (!rawBaseUrl.endsWith('/api')) {
  rawBaseUrl = rawBaseUrl.replace(/\/$/, '') + '/api';
}
export const BASE_URL = rawBaseUrl;

export async function fetchApi(endpoint: string, options: RequestInit = {}) {
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };

  console.log(`[fetchApi] Request: ${options.method || 'GET'} ${rawBaseUrl}${endpoint}`, {
    credentials: 'include',
    hasToken: !!token
  });

  const res = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers,
    credentials: 'include', // Required for cross-origin cookies (auth)
  });

  console.log(`[fetchApi] Response: ${res.status} ${res.statusText}`, {
    url: res.url,
    headers: Object.fromEntries(res.headers.entries())
  });

  const data = await res.json().catch(() => null);

  if (!res.ok) {
    throw new Error(data?.message || 'Something went wrong');
  }

  return data;
}

export const loginUser = (credentials: any) => fetchApi('/auth/sign-in/email', { method: 'POST', body: JSON.stringify(credentials) });
export const registerUser = (userData: any) => fetchApi('/auth/sign-up/email', { method: 'POST', body: JSON.stringify(userData) });
export const getCurrentUser = () => fetchApi('/auth/get-session');


// AI provider endpoints
export const getAIProviders = () => fetchApi('/ai/providers');
export const getAIModels = (provider: string) => fetchApi(`/ai/models?provider=${encodeURIComponent(provider)}`);

export interface AIChatPayload {
  prompt: string;
  provider: string;
  model: string;
  apiKey: string;
  temperature?: number;
  systemPrompt?: string;
}

export const generateAIChat = (payload: AIChatPayload) =>
  fetchApi('/ai/chat', { method: 'POST', body: JSON.stringify(payload) });

// --- Project Endpoints ---
export interface CreateProjectPayload {
  title: string;
  description?: string;
  userId: string;
}

export const createProject = (payload: CreateProjectPayload) => 
  fetchApi('/projects', { method: 'POST', body: JSON.stringify(payload) });

export const getProjects = (userId: string) => 
  fetchApi(`/projects/user/${userId}`);

export const getProject = (projectId: string) => 
  fetchApi(`/projects/${projectId}`);

export const updateProject = (projectId: string, payload: { title?: string; description?: string }) => 
  fetchApi(`/projects/${projectId}`, { method: 'PATCH', body: JSON.stringify(payload) });

export const deleteProject = (projectId: string) => 
  fetchApi(`/projects/${projectId}`, { method: 'DELETE' });

// --- Animation Endpoints ---
export interface GenerateAnimationPayload {
  prompt: string;
  projectId: string;
  userId: string;
  provider: string;
  model: string;
  apiKey?: string;
}

export const generateAnimation = (payload: GenerateAnimationPayload) => 
  fetchApi('/animations/generate', { method: 'POST', body: JSON.stringify(payload) });

export const getAnimationJob = (jobId: string) =>
  fetchApi(`/animations/${jobId}`);

export const getProjectAnimations = (projectId: string) =>
  fetchApi(`/animations/project/${projectId}`);

export const getUserAnimations = (userId: string) =>
  fetchApi(`/animations/user/${userId}`);

export const deleteAnimationJob = (jobId: string) => 
  fetchApi(`/animations/${jobId}`, { method: 'DELETE' });

export const regenerateAnimationJob = (jobId: string) => 
  fetchApi(`/animations/${jobId}/regenerate`, { method: 'PATCH' });

// --- Donation / Payment Endpoints ---
export interface InitDonationPayload {
  amount: number;
  currency?: string;
  name: string;
  email: string;
  userId?: string;
}

export const initDonation = (payload: InitDonationPayload) =>
  fetchApi('/payment', { method: 'POST', body: JSON.stringify(payload) });

// --- Admin Endpoints ---
export const getAdminStats = () => fetchApi('/admin/stats');
export const getAdminUsers = () => fetchApi('/admin/users');
export const getAdminProjects = () => fetchApi('/admin/projects');
export const deleteAdminUser = (userId: string) => fetchApi(`/admin/users/${userId}`, { method: 'DELETE' });
export const deleteAdminProject = (projectId: string) => fetchApi(`/admin/projects/${projectId}`, { method: 'DELETE' });

```


---
## FILE: client/src/lib/auth-client.ts

```ts
import { createAuthClient } from "better-auth/react";

// For better-auth, the baseURL should be the server origin, not the /api suffix (because it defaults to adding /api/auth)
const serverOrigin = (process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api").replace(/\/api$/, "");

export const authClient = createAuthClient({
  baseURL: serverOrigin,
});

```


---
## FILE: client/src/lib/db.ts

```ts
import Dexie, { Table } from 'dexie';

export interface UploadChunk {
  id?: number;
  trackId: string;
  chunkIndex: number;
  blob: Blob;
  status: 'pending' | 'uploaded' | 'failed';
  createdAt: number;
}

export class RecoraLocalDB extends Dexie {
  chunks!: Table<UploadChunk>;

  constructor() {
    super('RecoraLocalDB');
    // Schema defines primary key and indexed properties
    this.version(1).stores({
      chunks: '++id, trackId, chunkIndex, status' 
    });
  }
}

export const localDb = new RecoraLocalDB();

```


---
## FILE: client/src/lib/utils.ts

```ts
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

```


---
## FILE: client/tsconfig.json

```json
{
  "compilerOptions": {
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "react-jsx",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": [
    "next-env.d.ts",
    "**/*.ts",
    "**/*.tsx",
    ".next/types/**/*.ts",
    ".next/dev/types/**/*.ts",
    "**/*.mts"
  ],
  "exclude": ["node_modules"]
}

```


---
## FILE: dump-codebase.js

```js
const fs = require("fs");
const path = require("path");

const ROOT_DIR = "./"; // change if needed
const OUTPUT_FILE = "codebase_dump.md";

// folders to ignore
const IGNORE_DIRS = ["node_modules", ".git", "dist", "build", ".next"];

// file extensions to include
const ALLOWED_EXT = [".js", ".ts", ".jsx", ".tsx", ".json", ".md", ".css", ".html"];

function shouldIgnore(filePath) {
  return IGNORE_DIRS.some(dir => filePath.includes(dir));
}

function walk(dir, fileList = []) {
  const files = fs.readdirSync(dir);

  files.forEach(file => {
    const fullPath = path.join(dir, file);

    if (shouldIgnore(fullPath)) return;

    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      walk(fullPath, fileList);
    } else {
      const ext = path.extname(fullPath);
      if (ALLOWED_EXT.includes(ext)) {
        fileList.push(fullPath);
      }
    }
  });

  return fileList;
}

function generateDump() {
  const files = walk(ROOT_DIR);

  let output = "# Codebase Dump\n\n";

  files.forEach(file => {
    const content = fs.readFileSync(file, "utf-8");

    output += `\n\n---\n`;
    output += `## FILE: ${file}\n\n`;
    output += "```" + path.extname(file).slice(1) + "\n";
    output += content + "\n";
    output += "```\n";
  });

  fs.writeFileSync(OUTPUT_FILE, output);
  console.log(`✅ Dump created: ${OUTPUT_FILE}`);
}

generateDump();

```


---
## FILE: server/README.md

```md
# FlatMotion Server

A production-grade Express.js backend for AI-powered 2D animation generation with comprehensive project and user management.

## Overview

FlatMotion Server is a robust Node.js and Express.js application that powers the AI animation generation platform. It provides RESTful APIs for authentication, project management, animation generation, and admin operations. The server integrates with multiple AI providers and uses Prisma ORM for database management.

## Live Links

- Live Demo  : https://flat-motion.vercel.app
- Frontend   : https://flat-motion.vercel.app
- Backend    : https://flatmotion-server.onrender.com

## Features

- Multi-provider AI support (Anthropic, Groq, Gemini, OpenRouter, HuggingFace)
- Real-time animation generation and job tracking
- Secure user authentication with Better Auth
- Role-based access control (User, Admin)
- Complete project and animation CRUD operations
- Admin dashboard with user and project management
- Comprehensive error handling and logging
- PostgreSQL database with Prisma ORM
- Docker support for containerized deployment
- Environment-based configuration

## Tech Stack

- Node.js 18+
- Express.js
- TypeScript
- Prisma ORM
- PostgreSQL
- Better Auth
- Cloudinary (media storage)
- Docker

## Prerequisites

- Node.js 18.0 or higher
- PostgreSQL 12 or higher
- PostgreSQL client tools
- npm or yarn package manager

## Getting Started

### Installation

1. Navigate to the server directory:
```bash
cd server
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file with the following variables:
```env
# Database
DATABASE_URL=postgresql://user:password@localhost:5432/flatmotion

# Authentication
BETTER_AUTH_URL=http://localhost:5000
BETTER_AUTH_SECRET=your-secret-key-here

# CORS and Origins
TRUSTED_CLIENT_ORIGIN=http://localhost:3000,https://your-frontend-url.vercel.app

# AI Providers (choose at least one)
GEMINI_API_KEY=your-gemini-key
ANTHROPIC_API_KEY=your-anthropic-key
GROQ_API_KEY=your-groq-key
OPENROUTER_API_KEY=your-openrouter-key
HF_API_KEY=your-huggingface-key

# Media Storage
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret

# Optional
PORT=5000
NODE_ENV=development
```

4. Set up the database:
```bash
npx prisma migrate dev --name init
```

5. Generate Prisma client:
```bash
npx prisma generate
```

6. Start the development server:
```bash
npm run dev
```

The server runs on http://localhost:5000 by default.

## Environment Variables

| Variable | Description | Required | Example |
|----------|-------------|----------|---------|
| `DATABASE_URL` | PostgreSQL connection string | Yes | `postgresql://user:pass@localhost:5432/db` |
| `BETTER_AUTH_URL` | Authentication service URL | Yes | `http://localhost:5000` |
| `BETTER_AUTH_SECRET` | Secret key for auth | Yes | Random string (min 32 chars) |
| `TRUSTED_CLIENT_ORIGIN` | CORS allowed origins | Yes | `http://localhost:3000,https://app.com` |
| `GEMINI_API_KEY` | Google Gemini API key | No | From Google Cloud |
| `ANTHROPIC_API_KEY` | Anthropic Claude API key | No | From Anthropic |
| `GROQ_API_KEY` | Groq API key | No | From Groq |
| `OPENROUTER_API_KEY` | OpenRouter API key | No | From OpenRouter |
| `HF_API_KEY` | HuggingFace API key | No | From HuggingFace |
| `CLOUDINARY_CLOUD_NAME` | Cloudinary cloud name | Yes | Your cloud name |
| `CLOUDINARY_API_KEY` | Cloudinary API key | Yes | From Cloudinary |
| `CLOUDINARY_API_SECRET` | Cloudinary secret | Yes | From Cloudinary |
| `PORT` | Server port | No | `5000` |
| `NODE_ENV` | Environment | No | `development` or `production` |

## Project Structure

```
server/
├── src/
│   ├── module/              # Feature modules (MVC pattern)
│   │   ├── admin/          # Admin operations
│   │   ├── ai/             # AI generation
│   │   ├── animation/      # Animation handling
│   │   ├── auth/           # Authentication
│   │   ├── payment/        # Payment processing
│   │   ├── project/        # Project management
│   │   └── user/           # User operations
│   ├── routes/             # Route definitions
│   ├── lib/                # Business logic and utilities
│   │   ├── auth.ts         # Better Auth setup
│   │   ├── prisma.ts       # Prisma client
│   │   └── ...
│   ├── config/             # Configuration files
│   └── app.ts              # Express app setup
├── prisma/
│   ├── schema.prisma       # Database schema
│   └── migrations/         # Database migrations
├── tsconfig.json           # TypeScript configuration
├── Dockerfile              # Docker configuration
└── package.json            # Dependencies
```

## API Endpoints

### Authentication

- `POST /api/auth/sign-up/email` - Register new user
- `POST /api/auth/sign-in/email` - Login user
- `GET /api/auth/get-session` - Get current session
- `POST /api/auth/sign-out` - Logout user

### AI Providers

- `GET /api/ai/providers` - List available providers
- `GET /api/ai/models?provider={name}` - Get provider models
- `POST /api/ai/chat` - Generate animation

### Projects

- `POST /api/projects` - Create project
- `GET /api/projects/user/{userId}` - Get user's projects
- `GET /api/projects/{id}` - Get project details
- `PATCH /api/projects/{id}` - Update project
- `DELETE /api/projects/{id}` - Delete project

### Animations

- `POST /api/animations/generate` - Generate animation
- `GET /api/animations/{jobId}` - Get animation status
- `GET /api/animations/project/{projectId}` - Get project animations
- `GET /api/animations/user/{userId}` - Get user's animations
- `DELETE /api/animations/{jobId}` - Delete animation job
- `PATCH /api/animations/{jobId}/regenerate` - Regenerate animation

### Admin (Requires ADMIN role)

- `GET /api/admin/stats` - Get system statistics
- `GET /api/admin/users` - List all users
- `GET /api/admin/projects` - List all projects
- `DELETE /api/admin/users/{id}` - Delete user
- `DELETE /api/admin/projects/{id}` - Delete project

## Database Schema

### Core Tables

- `User` - User accounts and authentication
- `Project` - Animation projects
- `AnimationJob` - Generation requests and tracking
- `Session` - User sessions for auth

### Key Relationships

- User -> Projects (one-to-many)
- User -> AnimationJobs (one-to-many)
- Project -> AnimationJobs (one-to-many)

## Module Architecture

Each module follows MVC pattern:

- `{module}.controller.ts` - HTTP request handlers
- `{module}.service.ts` - Business logic
- `{module}.route.ts` - Route definitions
- `{module}.interface.ts` - TypeScript interfaces
- `{module}.validation.ts` - Input validation

## AI Provider Implementation

The application supports pluggable AI providers with a unified interface:

```typescript
interface AIProvider {
  generate(prompt: string): Promise<string>;
}
```

Supported providers:
- Anthropic Claude
- Google Gemini
- Groq
- OpenRouter
- HuggingFace

## Database Setup

### Local Development

1. Install PostgreSQL
2. Create a database:
```bash
createdb flatmotion
```

3. Update DATABASE_URL in .env
4. Run migrations:
```bash
npx prisma migrate dev
```

### Production (Render)

When deploying to Render:

1. Create PostgreSQL instance in Render
2. Copy connection string to DATABASE_URL
3. Render automatically runs migrations on deploy

## Development

### Running the Server

Development mode with auto-reload:
```bash
npm run dev
```

Production build:
```bash
npm run build
```

Production mode:
```bash
npm run start
```

### Database Migrations

Create new migration:
```bash
npx prisma migrate dev --name migration_name
```

Apply migrations:
```bash
npx prisma migrate deploy
```

View schema:
```bash
npx prisma studio
```

## Docker Deployment

### Build Image

```bash
docker build -t flatmotion-server .
```

### Run Container

```bash
docker run \
  -p 5000:5000 \
  -e DATABASE_URL="postgresql://..." \
  -e BETTER_AUTH_SECRET="..." \
  flatmotion-server
```

### Deployment to Render

1. Push repository to GitHub
2. Create Web Service in Render
3. Set Root Directory to `server`
4. Configure environment variables
5. Set build command to: `npm install && npx prisma migrate deploy`
6. Set start command to: `npm run start`
7. Deploy

First build takes several minutes for Manim dependencies.

## Authentication Flow

1. User registers/logs in
2. Better Auth creates session and returns token
3. Token stored in `Authorization` header
4. Server validates token for protected routes
5. User role checked for admin routes

## Error Handling

All endpoints return standardized error responses:

```json
{
  "success": false,
  "message": "Error description",
  "data": null
}
```

## Logging

Server logs requests and errors to console. In production, logs should be persisted.

## Security Measures

- CORS configuration with trusted origins
- Input validation on all endpoints
- Role-based access control (RBAC)
- Secure password hashing
- Bearer token authentication
- Environment-based secrets

## Performance Optimization

- Database query optimization with Prisma
- Connection pooling
- Caching strategies for AI providers
- Efficient pagination
- Index optimization on database

## Monitoring and Admin

Admin dashboard (at `/admin` on frontend) provides:

- System statistics
- User management
- Project management
- System health status
- Server uptime tracking

## Troubleshooting

### Database Connection Issues

Check:
1. PostgreSQL is running
2. DATABASE_URL is correct
3. Credentials are valid
4. Database exists

### Port Already in Use

Change PORT in .env or use:
```bash
PORT=5001 npm run dev
```

### Prisma Issues

Clear cache and regenerate:
```bash
rm -rf node_modules/.prisma
npx prisma generate
```

### Environment Variables

Restart server after changing `.env`:
```bash
npm run dev
```

## Contributing

1. Create feature branch
2. Follow TypeScript conventions
3. Add validation for inputs
4. Test endpoints with Postman/Thunder Client
5. Submit pull request

## License

Proprietary software. All rights reserved.

## Support

For issues or questions, contact: support@flatmotion.com

## API Response Examples

### Success Response

```json
{
  "success": true,
  "data": {
    "id": "123",
    "title": "My Animation"
  }
}
```

### Error Response

```json
{
  "success": false,
  "message": "Validation failed"
}
```

```


---
## FILE: server/package-lock.json

```json
{
  "name": "Backend",
  "version": "1.0.0",
  "lockfileVersion": 3,
  "requires": true,
  "packages": {
    "": {
      "name": "Backend",
      "version": "1.0.0",
      "license": "ISC",
      "dependencies": {
        "@huggingface/inference": "^4.13.15",
        "@neondatabase/serverless": "^1.0.2",
        "@prisma/client": "^5.9.1",
        "better-auth": "^1.5.5",
        "cloudinary": "^2.9.0",
        "cors": "^2.8.6",
        "dotenv": "^16.4.5",
        "express": "^4.19.2",
        "livekit-server-sdk": "^2.15.1",
        "multer": "^2.1.1",
        "pg": "^8.20.0",
        "prisma": "^5.9.1",
        "sslcommerz-lts": "^1.2.0",
        "uuid": "^13.0.0"
      },
      "devDependencies": {
        "@types/cors": "^2.8.19",
        "@types/express": "^4.17.21",
        "@types/multer": "^2.1.0",
        "@types/node": "^20.11.19",
        "@types/pg": "^8.18.0",
        "@types/uuid": "^10.0.0",
        "ts-node-dev": "^2.0.0",
        "typescript": "^5.4.5"
      }
    },
    "node_modules/@better-auth/core": {
      "version": "1.5.5",
      "resolved": "https://registry.npmjs.org/@better-auth/core/-/core-1.5.5.tgz",
      "integrity": "sha512-1oR/2jAp821Dcf67kQYHUoyNcdc1TcShfw4QMK0YTVntuRES5mUOyvEJql5T6eIuLfaqaN4LOF78l0FtF66HXA==",
      "license": "MIT",
      "dependencies": {
        "@standard-schema/spec": "^1.1.0",
        "zod": "^4.3.6"
      },
      "peerDependencies": {
        "@better-auth/utils": "0.3.1",
        "@better-fetch/fetch": "1.1.21",
        "@cloudflare/workers-types": ">=4",
        "better-call": "1.3.2",
        "jose": "^6.1.0",
        "kysely": "^0.28.5",
        "nanostores": "^1.0.1"
      },
      "peerDependenciesMeta": {
        "@cloudflare/workers-types": {
          "optional": true
        }
      }
    },
    "node_modules/@better-auth/drizzle-adapter": {
      "version": "1.5.5",
      "resolved": "https://registry.npmjs.org/@better-auth/drizzle-adapter/-/drizzle-adapter-1.5.5.tgz",
      "integrity": "sha512-HAi9xAP40oDt48QZeYBFTcmg3vt1Jik90GwoRIfangd7VGbxesIIDBJSnvwMbZ52GBIc6+V4FRw9lasNiNrPfw==",
      "license": "MIT",
      "peerDependencies": {
        "@better-auth/core": "1.5.5",
        "@better-auth/utils": "^0.3.0",
        "drizzle-orm": ">=0.41.0"
      },
      "peerDependenciesMeta": {
        "drizzle-orm": {
          "optional": true
        }
      }
    },
    "node_modules/@better-auth/kysely-adapter": {
      "version": "1.5.5",
      "resolved": "https://registry.npmjs.org/@better-auth/kysely-adapter/-/kysely-adapter-1.5.5.tgz",
      "integrity": "sha512-LmHffIVnqbfsxcxckMOoE8MwibWrbVFch+kwPKJ5OFDFv6lin75ufN7ZZ7twH0IMPLT/FcgzaRjP8jRrXRef9g==",
      "license": "MIT",
      "peerDependencies": {
        "@better-auth/core": "1.5.5",
        "@better-auth/utils": "^0.3.0",
        "kysely": "^0.27.0 || ^0.28.0"
      }
    },
    "node_modules/@better-auth/memory-adapter": {
      "version": "1.5.5",
      "resolved": "https://registry.npmjs.org/@better-auth/memory-adapter/-/memory-adapter-1.5.5.tgz",
      "integrity": "sha512-4X0j1/2L+nsgmObjmy9xEGUFWUv38Qjthp558fwS3DAp6ueWWyCaxaD6VJZ7m5qPNMrsBStO5WGP8CmJTEWm7g==",
      "license": "MIT",
      "peerDependencies": {
        "@better-auth/core": "1.5.5",
        "@better-auth/utils": "^0.3.0"
      }
    },
    "node_modules/@better-auth/mongo-adapter": {
      "version": "1.5.5",
      "resolved": "https://registry.npmjs.org/@better-auth/mongo-adapter/-/mongo-adapter-1.5.5.tgz",
      "integrity": "sha512-P1J9ljL5X5k740I8Rx1esPWNgWYPdJR5hf2CY7BwDSrQFPUHuzeCg0YhtEEP55niNateTXhBqGAcy0fVOeamZg==",
      "license": "MIT",
      "peerDependencies": {
        "@better-auth/core": "1.5.5",
        "@better-auth/utils": "^0.3.0",
        "mongodb": "^6.0.0 || ^7.0.0"
      }
    },
    "node_modules/@better-auth/prisma-adapter": {
      "version": "1.5.5",
      "resolved": "https://registry.npmjs.org/@better-auth/prisma-adapter/-/prisma-adapter-1.5.5.tgz",
      "integrity": "sha512-CliDd78CXHzzwQIXhCdwGr5Ml53i6JdCHWV7PYwTIJz9EAm6qb2RVBdpP3nqEfNjINGM22A6gfleCgCdZkTIZg==",
      "license": "MIT",
      "peerDependencies": {
        "@better-auth/core": "1.5.5",
        "@better-auth/utils": "^0.3.0",
        "@prisma/client": "^5.0.0 || ^6.0.0 || ^7.0.0",
        "prisma": "^5.0.0 || ^6.0.0 || ^7.0.0"
      },
      "peerDependenciesMeta": {
        "@prisma/client": {
          "optional": true
        },
        "prisma": {
          "optional": true
        }
      }
    },
    "node_modules/@better-auth/telemetry": {
      "version": "1.5.5",
      "resolved": "https://registry.npmjs.org/@better-auth/telemetry/-/telemetry-1.5.5.tgz",
      "integrity": "sha512-1+lklxArn4IMHuU503RcPdXrSG2tlXt4jnGG3omolmspQ7tktg/Y9XO/yAkYDurtvMn1xJ8X1Ov01Ji/r5s9BQ==",
      "license": "MIT",
      "dependencies": {
        "@better-auth/utils": "0.3.1",
        "@better-fetch/fetch": "1.1.21"
      },
      "peerDependencies": {
        "@better-auth/core": "1.5.5"
      }
    },
    "node_modules/@better-auth/utils": {
      "version": "0.3.1",
      "resolved": "https://registry.npmjs.org/@better-auth/utils/-/utils-0.3.1.tgz",
      "integrity": "sha512-+CGp4UmZSUrHHnpHhLPYu6cV+wSUSvVbZbNykxhUDocpVNTo9uFFxw/NqJlh1iC4wQ9HKKWGCKuZ5wUgS0v6Kg==",
      "license": "MIT"
    },
    "node_modules/@better-fetch/fetch": {
      "version": "1.1.21",
      "resolved": "https://registry.npmjs.org/@better-fetch/fetch/-/fetch-1.1.21.tgz",
      "integrity": "sha512-/ImESw0sskqlVR94jB+5+Pxjf+xBwDZF/N5+y2/q4EqD7IARUTSpPfIo8uf39SYpCxyOCtbyYpUrZ3F/k0zT4A=="
    },
    "node_modules/@bufbuild/protobuf": {
      "version": "1.10.1",
      "resolved": "https://registry.npmjs.org/@bufbuild/protobuf/-/protobuf-1.10.1.tgz",
      "integrity": "sha512-wJ8ReQbHxsAfXhrf9ixl0aYbZorRuOWpBNzm8pL8ftmSxQx/wnJD5Eg861NwJU/czy2VXFIebCeZnZrI9rktIQ==",
      "license": "(Apache-2.0 AND BSD-3-Clause)"
    },
    "node_modules/@cspotcode/source-map-support": {
      "version": "0.8.1",
      "resolved": "https://registry.npmjs.org/@cspotcode/source-map-support/-/source-map-support-0.8.1.tgz",
      "integrity": "sha512-IchNf6dN4tHoMFIn/7OE8LWZ19Y6q/67Bmf6vnGREv8RSbBVb9LPJxEcnwrcwX6ixSvaiGoomAUvu4YSxXrVgw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@jridgewell/trace-mapping": "0.3.9"
      },
      "engines": {
        "node": ">=12"
      }
    },
    "node_modules/@huggingface/inference": {
      "version": "4.13.15",
      "resolved": "https://registry.npmjs.org/@huggingface/inference/-/inference-4.13.15.tgz",
      "integrity": "sha512-V7B13KFDVhYkQqgx8vpMcmtEG+PoePlh65IUvpphTTItHAq6zRLcsS4torh1QavUaT+6nEwho4wFXzBQNGBwKQ==",
      "license": "MIT",
      "dependencies": {
        "@huggingface/jinja": "^0.5.5",
        "@huggingface/tasks": "^0.19.90"
      },
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/@huggingface/jinja": {
      "version": "0.5.6",
      "resolved": "https://registry.npmjs.org/@huggingface/jinja/-/jinja-0.5.6.tgz",
      "integrity": "sha512-MyMWyLnjqo+KRJYSH7oWNbsOn5onuIvfXYPcc0WOGxU0eHUV7oAYUoQTl2BMdu7ml+ea/bu11UM+EshbeHwtIA==",
      "license": "MIT",
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/@huggingface/tasks": {
      "version": "0.19.90",
      "resolved": "https://registry.npmjs.org/@huggingface/tasks/-/tasks-0.19.90.tgz",
      "integrity": "sha512-nfV9luJbvwGQ/5oKXkKhCV9h4X7mwh1YaGG3ORd6UMLDSwr1OFSSatcBX0O9OtBtmNK19aGSjbLFqqgcIR6+IA==",
      "license": "MIT"
    },
    "node_modules/@jridgewell/resolve-uri": {
      "version": "3.1.2",
      "resolved": "https://registry.npmjs.org/@jridgewell/resolve-uri/-/resolve-uri-3.1.2.tgz",
      "integrity": "sha512-bRISgCIjP20/tbWSPWMEi54QVPRZExkuD9lJL+UIxUKtwVJA8wW1Trb1jMs1RFXo1CBTNZ/5hpC9QvmKWdopKw==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=6.0.0"
      }
    },
    "node_modules/@jridgewell/sourcemap-codec": {
      "version": "1.5.5",
      "resolved": "https://registry.npmjs.org/@jridgewell/sourcemap-codec/-/sourcemap-codec-1.5.5.tgz",
      "integrity": "sha512-cYQ9310grqxueWbl+WuIUIaiUaDcj7WOq5fVhEljNVgRfOUhY9fy2zTvfoqWsnebh8Sl70VScFbICvJnLKB0Og==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/@jridgewell/trace-mapping": {
      "version": "0.3.9",
      "resolved": "https://registry.npmjs.org/@jridgewell/trace-mapping/-/trace-mapping-0.3.9.tgz",
      "integrity": "sha512-3Belt6tdc8bPgAtbcmdtNJlirVoTmEb5e2gC94PnkwEW9jI6CAHUeoG85tjWP5WquqfavoMtMwiG4P926ZKKuQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@jridgewell/resolve-uri": "^3.0.3",
        "@jridgewell/sourcemap-codec": "^1.4.10"
      }
    },
    "node_modules/@livekit/protocol": {
      "version": "1.45.2",
      "resolved": "https://registry.npmjs.org/@livekit/protocol/-/protocol-1.45.2.tgz",
      "integrity": "sha512-nCyJEM5a7tVYCgzGjHiGI/f9cbsjsj3GZt33XRLzZNQ3ddq16aj1XPtTKz+5bgn9AflSRcCO42Jr+vOUrBHahw==",
      "license": "Apache-2.0",
      "dependencies": {
        "@bufbuild/protobuf": "^1.10.0"
      }
    },
    "node_modules/@mongodb-js/saslprep": {
      "version": "1.4.6",
      "resolved": "https://registry.npmjs.org/@mongodb-js/saslprep/-/saslprep-1.4.6.tgz",
      "integrity": "sha512-y+x3H1xBZd38n10NZF/rEBlvDOOMQ6LKUTHqr8R9VkJ+mmQOYtJFxIlkkK8fZrtOiL6VixbOBWMbZGBdal3Z1g==",
      "license": "MIT",
      "peer": true,
      "dependencies": {
        "sparse-bitfield": "^3.0.3"
      }
    },
    "node_modules/@neondatabase/serverless": {
      "version": "1.0.2",
      "resolved": "https://registry.npmjs.org/@neondatabase/serverless/-/serverless-1.0.2.tgz",
      "integrity": "sha512-I5sbpSIAHiB+b6UttofhrN/UJXII+4tZPAq1qugzwCwLIL8EZLV7F/JyHUrEIiGgQpEXzpnjlJ+zwcEhheGvCw==",
      "license": "MIT",
      "dependencies": {
        "@types/node": "^22.15.30",
        "@types/pg": "^8.8.0"
      },
      "engines": {
        "node": ">=19.0.0"
      }
    },
    "node_modules/@neondatabase/serverless/node_modules/@types/node": {
      "version": "22.19.15",
      "resolved": "https://registry.npmjs.org/@types/node/-/node-22.19.15.tgz",
      "integrity": "sha512-F0R/h2+dsy5wJAUe3tAU6oqa2qbWY5TpNfL/RGmo1y38hiyO1w3x2jPtt76wmuaJI4DQnOBu21cNXQ2STIUUWg==",
      "license": "MIT",
      "dependencies": {
        "undici-types": "~6.21.0"
      }
    },
    "node_modules/@neondatabase/serverless/node_modules/undici-types": {
      "version": "6.21.0",
      "resolved": "https://registry.npmjs.org/undici-types/-/undici-types-6.21.0.tgz",
      "integrity": "sha512-iwDZqg0QAGrg9Rav5H4n0M64c3mkR59cJ6wQp+7C4nI0gsmExaedaYLNO44eT4AtBBwjbTiGPMlt2Md0T9H9JQ==",
      "license": "MIT"
    },
    "node_modules/@noble/ciphers": {
      "version": "2.1.1",
      "resolved": "https://registry.npmjs.org/@noble/ciphers/-/ciphers-2.1.1.tgz",
      "integrity": "sha512-bysYuiVfhxNJuldNXlFEitTVdNnYUc+XNJZd7Qm2a5j1vZHgY+fazadNFWFaMK/2vye0JVlxV3gHmC0WDfAOQw==",
      "license": "MIT",
      "engines": {
        "node": ">= 20.19.0"
      },
      "funding": {
        "url": "https://paulmillr.com/funding/"
      }
    },
    "node_modules/@noble/hashes": {
      "version": "2.0.1",
      "resolved": "https://registry.npmjs.org/@noble/hashes/-/hashes-2.0.1.tgz",
      "integrity": "sha512-XlOlEbQcE9fmuXxrVTXCTlG2nlRXa9Rj3rr5Ue/+tX+nmkgbX720YHh0VR3hBF9xDvwnb8D2shVGOwNx+ulArw==",
      "license": "MIT",
      "engines": {
        "node": ">= 20.19.0"
      },
      "funding": {
        "url": "https://paulmillr.com/funding/"
      }
    },
    "node_modules/@prisma/client": {
      "version": "5.9.1",
      "resolved": "https://registry.npmjs.org/@prisma/client/-/client-5.9.1.tgz",
      "integrity": "sha512-caSOnG4kxcSkhqC/2ShV7rEoWwd3XrftokxJqOCMVvia4NYV/TPtJlS9C2os3Igxw/Qyxumj9GBQzcStzECvtQ==",
      "hasInstallScript": true,
      "license": "Apache-2.0",
      "engines": {
        "node": ">=16.13"
      },
      "peerDependencies": {
        "prisma": "*"
      },
      "peerDependenciesMeta": {
        "prisma": {
          "optional": true
        }
      }
    },
    "node_modules/@prisma/debug": {
      "version": "5.9.1",
      "resolved": "https://registry.npmjs.org/@prisma/debug/-/debug-5.9.1.tgz",
      "integrity": "sha512-yAHFSFCg8KVoL0oRUno3m60GAjsUKYUDkQ+9BA2X2JfVR3kRVSJFc/GpQ2fSORi4pSHZR9orfM4UC9OVXIFFTA==",
      "license": "Apache-2.0"
    },
    "node_modules/@prisma/engines": {
      "version": "5.9.1",
      "resolved": "https://registry.npmjs.org/@prisma/engines/-/engines-5.9.1.tgz",
      "integrity": "sha512-gkdXmjxQ5jktxWNdDA5aZZ6R8rH74JkoKq6LD5mACSvxd2vbqWeWIOV0Py5wFC8vofOYShbt6XUeCIUmrOzOnQ==",
      "hasInstallScript": true,
      "license": "Apache-2.0",
      "dependencies": {
        "@prisma/debug": "5.9.1",
        "@prisma/engines-version": "5.9.0-32.23fdc5965b1e05fc54e5f26ed3de66776b93de64",
        "@prisma/fetch-engine": "5.9.1",
        "@prisma/get-platform": "5.9.1"
      }
    },
    "node_modules/@prisma/engines-version": {
      "version": "5.9.0-32.23fdc5965b1e05fc54e5f26ed3de66776b93de64",
      "resolved": "https://registry.npmjs.org/@prisma/engines-version/-/engines-version-5.9.0-32.23fdc5965b1e05fc54e5f26ed3de66776b93de64.tgz",
      "integrity": "sha512-HFl7275yF0FWbdcNvcSRbbu9JCBSLMcurYwvWc8WGDnpu7APxQo2ONtZrUggU3WxLxUJ2uBX+0GOFIcJeVeOOQ==",
      "license": "Apache-2.0"
    },
    "node_modules/@prisma/fetch-engine": {
      "version": "5.9.1",
      "resolved": "https://registry.npmjs.org/@prisma/fetch-engine/-/fetch-engine-5.9.1.tgz",
      "integrity": "sha512-l0goQOMcNVOJs1kAcwqpKq3ylvkD9F04Ioe1oJoCqmz05mw22bNAKKGWuDd3zTUoUZr97va0c/UfLNru+PDmNA==",
      "license": "Apache-2.0",
      "dependencies": {
        "@prisma/debug": "5.9.1",
        "@prisma/engines-version": "5.9.0-32.23fdc5965b1e05fc54e5f26ed3de66776b93de64",
        "@prisma/get-platform": "5.9.1"
      }
    },
    "node_modules/@prisma/get-platform": {
      "version": "5.9.1",
      "resolved": "https://registry.npmjs.org/@prisma/get-platform/-/get-platform-5.9.1.tgz",
      "integrity": "sha512-6OQsNxTyhvG+T2Ksr8FPFpuPeL4r9u0JF0OZHUBI/Uy9SS43sPyAIutt4ZEAyqWQt104ERh70EZedkHZKsnNbg==",
      "license": "Apache-2.0",
      "dependencies": {
        "@prisma/debug": "5.9.1"
      }
    },
    "node_modules/@standard-schema/spec": {
      "version": "1.1.0",
      "resolved": "https://registry.npmjs.org/@standard-schema/spec/-/spec-1.1.0.tgz",
      "integrity": "sha512-l2aFy5jALhniG5HgqrD6jXLi/rUWrKvqN/qJx6yoJsgKhblVd+iqqU4RCXavm/jPityDo5TCvKMnpjKnOriy0w==",
      "license": "MIT"
    },
    "node_modules/@tsconfig/node10": {
      "version": "1.0.12",
      "resolved": "https://registry.npmjs.org/@tsconfig/node10/-/node10-1.0.12.tgz",
      "integrity": "sha512-UCYBaeFvM11aU2y3YPZ//O5Rhj+xKyzy7mvcIoAjASbigy8mHMryP5cK7dgjlz2hWxh1g5pLw084E0a/wlUSFQ==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/@tsconfig/node12": {
      "version": "1.0.11",
      "resolved": "https://registry.npmjs.org/@tsconfig/node12/-/node12-1.0.11.tgz",
      "integrity": "sha512-cqefuRsh12pWyGsIoBKJA9luFu3mRxCA+ORZvA4ktLSzIuCUtWVxGIuXigEwO5/ywWFMZ2QEGKWvkZG1zDMTag==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/@tsconfig/node14": {
      "version": "1.0.3",
      "resolved": "https://registry.npmjs.org/@tsconfig/node14/-/node14-1.0.3.tgz",
      "integrity": "sha512-ysT8mhdixWK6Hw3i1V2AeRqZ5WfXg1G43mqoYlM2nc6388Fq5jcXyr5mRsqViLx/GJYdoL0bfXD8nmF+Zn/Iow==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/@tsconfig/node16": {
      "version": "1.0.4",
      "resolved": "https://registry.npmjs.org/@tsconfig/node16/-/node16-1.0.4.tgz",
      "integrity": "sha512-vxhUy4J8lyeyinH7Azl1pdd43GJhZH/tP2weN8TntQblOY+A0XbT8DJk1/oCPuOOyg/Ja757rG0CgHcWC8OfMA==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/@types/body-parser": {
      "version": "1.19.6",
      "resolved": "https://registry.npmjs.org/@types/body-parser/-/body-parser-1.19.6.tgz",
      "integrity": "sha512-HLFeCYgz89uk22N5Qg3dvGvsv46B8GLvKKo1zKG4NybA8U2DiEO3w9lqGg29t/tfLRJpJ6iQxnVw4OnB7MoM9g==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@types/connect": "*",
        "@types/node": "*"
      }
    },
    "node_modules/@types/connect": {
      "version": "3.4.38",
      "resolved": "https://registry.npmjs.org/@types/connect/-/connect-3.4.38.tgz",
      "integrity": "sha512-K6uROf1LD88uDQqJCktA4yzL1YYAK6NgfsI0v/mTgyPKWsX1CnJ0XPSDhViejru1GcRkLWb8RlzFYJRqGUbaug==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@types/node": "*"
      }
    },
    "node_modules/@types/cors": {
      "version": "2.8.19",
      "resolved": "https://registry.npmjs.org/@types/cors/-/cors-2.8.19.tgz",
      "integrity": "sha512-mFNylyeyqN93lfe/9CSxOGREz8cpzAhH+E93xJ4xWQf62V8sQ/24reV2nyzUWM6H6Xji+GGHpkbLe7pVoUEskg==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@types/node": "*"
      }
    },
    "node_modules/@types/express": {
      "version": "4.17.21",
      "resolved": "https://registry.npmjs.org/@types/express/-/express-4.17.21.tgz",
      "integrity": "sha512-ejlPM315qwLpaQlQDTjPdsUFSc6ZsP4AN6AlWnogPjQ7CVi7PYF3YVz+CY3jE2pwYf7E/7HlDAN0rV2GxTG0HQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@types/body-parser": "*",
        "@types/express-serve-static-core": "^4.17.33",
        "@types/qs": "*",
        "@types/serve-static": "*"
      }
    },
    "node_modules/@types/express-serve-static-core": {
      "version": "4.19.8",
      "resolved": "https://registry.npmjs.org/@types/express-serve-static-core/-/express-serve-static-core-4.19.8.tgz",
      "integrity": "sha512-02S5fmqeoKzVZCHPZid4b8JH2eM5HzQLZWN2FohQEy/0eXTq8VXZfSN6Pcr3F6N9R/vNrj7cpgbhjie6m/1tCA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@types/node": "*",
        "@types/qs": "*",
        "@types/range-parser": "*",
        "@types/send": "*"
      }
    },
    "node_modules/@types/http-errors": {
      "version": "2.0.5",
      "resolved": "https://registry.npmjs.org/@types/http-errors/-/http-errors-2.0.5.tgz",
      "integrity": "sha512-r8Tayk8HJnX0FztbZN7oVqGccWgw98T/0neJphO91KkmOzug1KkofZURD4UaD5uH8AqcFLfdPErnBod0u71/qg==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/@types/multer": {
      "version": "2.1.0",
      "resolved": "https://registry.npmjs.org/@types/multer/-/multer-2.1.0.tgz",
      "integrity": "sha512-zYZb0+nJhOHtPpGDb3vqPjwpdeGlGC157VpkqNQL+UU2qwoacoQ7MpsAmUptI/0Oa127X32JzWDqQVEXp2RcIA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@types/express": "*"
      }
    },
    "node_modules/@types/node": {
      "version": "20.11.19",
      "resolved": "https://registry.npmjs.org/@types/node/-/node-20.11.19.tgz",
      "integrity": "sha512-7xMnVEcZFu0DikYjWOlRq7NTPETrm7teqUT2WkQjrTIkEgUyyGdWsj/Zg8bEJt5TNklzbPD1X3fqfsHw3SpapQ==",
      "license": "MIT",
      "dependencies": {
        "undici-types": "~5.26.4"
      }
    },
    "node_modules/@types/pg": {
      "version": "8.18.0",
      "resolved": "https://registry.npmjs.org/@types/pg/-/pg-8.18.0.tgz",
      "integrity": "sha512-gT+oueVQkqnj6ajGJXblFR4iavIXWsGAFCk3dP4Kki5+a9R4NMt0JARdk6s8cUKcfUoqP5dAtDSLU8xYUTFV+Q==",
      "license": "MIT",
      "dependencies": {
        "@types/node": "*",
        "pg-protocol": "*",
        "pg-types": "^2.2.0"
      }
    },
    "node_modules/@types/qs": {
      "version": "6.15.0",
      "resolved": "https://registry.npmjs.org/@types/qs/-/qs-6.15.0.tgz",
      "integrity": "sha512-JawvT8iBVWpzTrz3EGw9BTQFg3BQNmwERdKE22vlTxawwtbyUSlMppvZYKLZzB5zgACXdXxbD3m1bXaMqP/9ow==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/@types/range-parser": {
      "version": "1.2.7",
      "resolved": "https://registry.npmjs.org/@types/range-parser/-/range-parser-1.2.7.tgz",
      "integrity": "sha512-hKormJbkJqzQGhziax5PItDUTMAM9uE2XXQmM37dyd4hVM+5aVl7oVxMVUiVQn2oCQFN/LKCZdvSM0pFRqbSmQ==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/@types/send": {
      "version": "1.2.1",
      "resolved": "https://registry.npmjs.org/@types/send/-/send-1.2.1.tgz",
      "integrity": "sha512-arsCikDvlU99zl1g69TcAB3mzZPpxgw0UQnaHeC1Nwb015xp8bknZv5rIfri9xTOcMuaVgvabfIRA7PSZVuZIQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@types/node": "*"
      }
    },
    "node_modules/@types/serve-static": {
      "version": "2.2.0",
      "resolved": "https://registry.npmjs.org/@types/serve-static/-/serve-static-2.2.0.tgz",
      "integrity": "sha512-8mam4H1NHLtu7nmtalF7eyBH14QyOASmcxHhSfEoRyr0nP/YdoesEtU+uSRvMe96TW/HPTtkoKqQLl53N7UXMQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@types/http-errors": "*",
        "@types/node": "*"
      }
    },
    "node_modules/@types/strip-bom": {
      "version": "3.0.0",
      "resolved": "https://registry.npmjs.org/@types/strip-bom/-/strip-bom-3.0.0.tgz",
      "integrity": "sha512-xevGOReSYGM7g/kUBZzPqCrR/KYAo+F0yiPc85WFTJa0MSLtyFTVTU6cJu/aV4mid7IffDIWqo69THF2o4JiEQ==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/@types/strip-json-comments": {
      "version": "0.0.30",
      "resolved": "https://registry.npmjs.org/@types/strip-json-comments/-/strip-json-comments-0.0.30.tgz",
      "integrity": "sha512-7NQmHra/JILCd1QqpSzl8+mJRc8ZHz3uDm8YV1Ks9IhK0epEiTw8aIErbvH9PI+6XbqhyIQy3462nEsn7UVzjQ==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/@types/uuid": {
      "version": "10.0.0",
      "resolved": "https://registry.npmjs.org/@types/uuid/-/uuid-10.0.0.tgz",
      "integrity": "sha512-7gqG38EyHgyP1S+7+xomFtL+ZNHcKv6DwNaCZmJmo1vgMugyF3TCnXVg4t1uk89mLNwnLtnY3TpOpCOyp1/xHQ==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/@types/webidl-conversions": {
      "version": "7.0.3",
      "resolved": "https://registry.npmjs.org/@types/webidl-conversions/-/webidl-conversions-7.0.3.tgz",
      "integrity": "sha512-CiJJvcRtIgzadHCYXw7dqEnMNRjhGZlYK05Mj9OyktqV8uVT8fD2BFOB7S1uwBE3Kj2Z+4UyPmFw/Ixgw/LAlA==",
      "license": "MIT",
      "peer": true
    },
    "node_modules/@types/whatwg-url": {
      "version": "13.0.0",
      "resolved": "https://registry.npmjs.org/@types/whatwg-url/-/whatwg-url-13.0.0.tgz",
      "integrity": "sha512-N8WXpbE6Wgri7KUSvrmQcqrMllKZ9uxkYWMt+mCSGwNc0Hsw9VQTW7ApqI4XNrx6/SaM2QQJCzMPDEXE058s+Q==",
      "license": "MIT",
      "peer": true,
      "dependencies": {
        "@types/webidl-conversions": "*"
      }
    },
    "node_modules/accepts": {
      "version": "1.3.8",
      "resolved": "https://registry.npmjs.org/accepts/-/accepts-1.3.8.tgz",
      "integrity": "sha512-PYAthTa2m2VKxuvSD3DPC/Gy+U+sOA1LAuT8mkmRuvw+NACSaeXEQ+NHcVF7rONl6qcaxV3Uuemwawk+7+SJLw==",
      "license": "MIT",
      "dependencies": {
        "mime-types": "~2.1.34",
        "negotiator": "0.6.3"
      },
      "engines": {
        "node": ">= 0.6"
      }
    },
    "node_modules/acorn": {
      "version": "8.16.0",
      "resolved": "https://registry.npmjs.org/acorn/-/acorn-8.16.0.tgz",
      "integrity": "sha512-UVJyE9MttOsBQIDKw1skb9nAwQuR5wuGD3+82K6JgJlm/Y+KI92oNsMNGZCYdDsVtRHSak0pcV5Dno5+4jh9sw==",
      "dev": true,
      "license": "MIT",
      "bin": {
        "acorn": "bin/acorn"
      },
      "engines": {
        "node": ">=0.4.0"
      }
    },
    "node_modules/acorn-walk": {
      "version": "8.3.5",
      "resolved": "https://registry.npmjs.org/acorn-walk/-/acorn-walk-8.3.5.tgz",
      "integrity": "sha512-HEHNfbars9v4pgpW6SO1KSPkfoS0xVOM/9UzkJltjlsHZmJasxg8aXkuZa7SMf8vKGIBhpUsPluQSqhJFCqebw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "acorn": "^8.11.0"
      },
      "engines": {
        "node": ">=0.4.0"
      }
    },
    "node_modules/anymatch": {
      "version": "3.1.3",
      "resolved": "https://registry.npmjs.org/anymatch/-/anymatch-3.1.3.tgz",
      "integrity": "sha512-KMReFUr0B4t+D+OBkjR3KYqvocp2XaSzO55UcB6mgQMd3KbcE+mWTyvVV7D/zsdEbNnV6acZUutkiHQXvTr1Rw==",
      "dev": true,
      "license": "ISC",
      "dependencies": {
        "normalize-path": "^3.0.0",
        "picomatch": "^2.0.4"
      },
      "engines": {
        "node": ">= 8"
      }
    },
    "node_modules/append-field": {
      "version": "1.0.0",
      "resolved": "https://registry.npmjs.org/append-field/-/append-field-1.0.0.tgz",
      "integrity": "sha512-klpgFSWLW1ZEs8svjfb7g4qWY0YS5imI82dTg+QahUvJ8YqAY0P10Uk8tTyh9ZGuYEZEMaeJYCF5BFuX552hsw==",
      "license": "MIT"
    },
    "node_modules/arg": {
      "version": "4.1.3",
      "resolved": "https://registry.npmjs.org/arg/-/arg-4.1.3.tgz",
      "integrity": "sha512-58S9QDqG0Xx27YwPSt9fJxivjYl432YCwfDMfZ+71RAqUrZef7LrKQZ3LHLOwCS4FLNBplP533Zx895SeOCHvA==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/array-flatten": {
      "version": "1.1.1",
      "resolved": "https://registry.npmjs.org/array-flatten/-/array-flatten-1.1.1.tgz",
      "integrity": "sha512-PCVAQswWemu6UdxsDFFX/+gVeYqKAod3D3UVm91jHwynguOwAvYPhx8nNlM++NqRcK6CxxpUafjmhIdKiHibqg==",
      "license": "MIT"
    },
    "node_modules/asynckit": {
      "version": "0.4.0",
      "resolved": "https://registry.npmjs.org/asynckit/-/asynckit-0.4.0.tgz",
      "integrity": "sha512-Oei9OH4tRh0YqU3GxhX79dM/mwVgvbZJaSNaRk+bshkj0S5cfHcgYakreBjrHwatXKbz+IoIdYLxrKim2MjW0Q==",
      "license": "MIT"
    },
    "node_modules/aws-ssl-profiles": {
      "version": "1.1.2",
      "resolved": "https://registry.npmjs.org/aws-ssl-profiles/-/aws-ssl-profiles-1.1.2.tgz",
      "integrity": "sha512-NZKeq9AfyQvEeNlN0zSYAaWrmBffJh3IELMZfRpJVWgrpEbtEpnjvzqBPf+mxoI287JohRDoa+/nsfqqiZmF6g==",
      "license": "MIT",
      "optional": true,
      "peer": true,
      "engines": {
        "node": ">= 6.0.0"
      }
    },
    "node_modules/balanced-match": {
      "version": "1.0.2",
      "resolved": "https://registry.npmjs.org/balanced-match/-/balanced-match-1.0.2.tgz",
      "integrity": "sha512-3oSeUO0TMV67hN1AmbXsK4yaqU7tjiHlbxRDZOpH0KW9+CeX4bRAaX0Anxt0tx2MrpRpWwQaPwIlISEJhYU5Pw==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/better-auth": {
      "version": "1.5.5",
      "resolved": "https://registry.npmjs.org/better-auth/-/better-auth-1.5.5.tgz",
      "integrity": "sha512-GpVPaV1eqr3mOovKfghJXXk6QvlcVeFbS3z+n+FPDid5rK/2PchnDtiaVCzWyXA9jH2KkirOfl+JhAUvnja0Eg==",
      "license": "MIT",
      "dependencies": {
        "@better-auth/core": "1.5.5",
        "@better-auth/drizzle-adapter": "1.5.5",
        "@better-auth/kysely-adapter": "1.5.5",
        "@better-auth/memory-adapter": "1.5.5",
        "@better-auth/mongo-adapter": "1.5.5",
        "@better-auth/prisma-adapter": "1.5.5",
        "@better-auth/telemetry": "1.5.5",
        "@better-auth/utils": "0.3.1",
        "@better-fetch/fetch": "1.1.21",
        "@noble/ciphers": "^2.1.1",
        "@noble/hashes": "^2.0.1",
        "better-call": "1.3.2",
        "defu": "^6.1.4",
        "jose": "^6.1.3",
        "kysely": "^0.28.11",
        "nanostores": "^1.1.1",
        "zod": "^4.3.6"
      },
      "peerDependencies": {
        "@lynx-js/react": "*",
        "@prisma/client": "^5.0.0 || ^6.0.0 || ^7.0.0",
        "@sveltejs/kit": "^2.0.0",
        "@tanstack/react-start": "^1.0.0",
        "@tanstack/solid-start": "^1.0.0",
        "better-sqlite3": "^12.0.0",
        "drizzle-kit": ">=0.31.4",
        "drizzle-orm": ">=0.41.0",
        "mongodb": "^6.0.0 || ^7.0.0",
        "mysql2": "^3.0.0",
        "next": "^14.0.0 || ^15.0.0 || ^16.0.0",
        "pg": "^8.0.0",
        "prisma": "^5.0.0 || ^6.0.0 || ^7.0.0",
        "react": "^18.0.0 || ^19.0.0",
        "react-dom": "^18.0.0 || ^19.0.0",
        "solid-js": "^1.0.0",
        "svelte": "^4.0.0 || ^5.0.0",
        "vitest": "^2.0.0 || ^3.0.0 || ^4.0.0",
        "vue": "^3.0.0"
      },
      "peerDependenciesMeta": {
        "@lynx-js/react": {
          "optional": true
        },
        "@prisma/client": {
          "optional": true
        },
        "@sveltejs/kit": {
          "optional": true
        },
        "@tanstack/react-start": {
          "optional": true
        },
        "@tanstack/solid-start": {
          "optional": true
        },
        "better-sqlite3": {
          "optional": true
        },
        "drizzle-kit": {
          "optional": true
        },
        "drizzle-orm": {
          "optional": true
        },
        "mongodb": {
          "optional": true
        },
        "mysql2": {
          "optional": true
        },
        "next": {
          "optional": true
        },
        "pg": {
          "optional": true
        },
        "prisma": {
          "optional": true
        },
        "react": {
          "optional": true
        },
        "react-dom": {
          "optional": true
        },
        "solid-js": {
          "optional": true
        },
        "svelte": {
          "optional": true
        },
        "vitest": {
          "optional": true
        },
        "vue": {
          "optional": true
        }
      }
    },
    "node_modules/better-call": {
      "version": "1.3.2",
      "resolved": "https://registry.npmjs.org/better-call/-/better-call-1.3.2.tgz",
      "integrity": "sha512-4cZIfrerDsNTn3cm+MhLbUePN0gdwkhSXEuG7r/zuQ8c/H7iU0/jSK5TD3FW7U0MgKHce/8jGpPYNO4Ve+4NBw==",
      "license": "MIT",
      "dependencies": {
        "@better-auth/utils": "^0.3.1",
        "@better-fetch/fetch": "^1.1.21",
        "rou3": "^0.7.12",
        "set-cookie-parser": "^3.0.1"
      },
      "peerDependencies": {
        "zod": "^4.0.0"
      },
      "peerDependenciesMeta": {
        "zod": {
          "optional": true
        }
      }
    },
    "node_modules/binary-extensions": {
      "version": "2.3.0",
      "resolved": "https://registry.npmjs.org/binary-extensions/-/binary-extensions-2.3.0.tgz",
      "integrity": "sha512-Ceh+7ox5qe7LJuLHoY0feh3pHuUDHAcRUeyL2VYghZwfpkNIy/+8Ocg0a3UuSoYzavmylwuLWQOf3hl0jjMMIw==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=8"
      },
      "funding": {
        "url": "https://github.com/sponsors/sindresorhus"
      }
    },
    "node_modules/body-parser": {
      "version": "1.20.2",
      "resolved": "https://registry.npmjs.org/body-parser/-/body-parser-1.20.2.tgz",
      "integrity": "sha512-ml9pReCu3M61kGlqoTm2umSXTlRTuGTx0bfYj+uIUKKYycG5NtSbeetV3faSU6R7ajOPw0g/J1PvK4qNy7s5bA==",
      "license": "MIT",
      "dependencies": {
        "bytes": "3.1.2",
        "content-type": "~1.0.5",
        "debug": "2.6.9",
        "depd": "2.0.0",
        "destroy": "1.2.0",
        "http-errors": "2.0.0",
        "iconv-lite": "0.4.24",
        "on-finished": "2.4.1",
        "qs": "6.11.0",
        "raw-body": "2.5.2",
        "type-is": "~1.6.18",
        "unpipe": "1.0.0"
      },
      "engines": {
        "node": ">= 0.8",
        "npm": "1.2.8000 || >= 1.4.16"
      }
    },
    "node_modules/brace-expansion": {
      "version": "1.1.12",
      "resolved": "https://registry.npmjs.org/brace-expansion/-/brace-expansion-1.1.12.tgz",
      "integrity": "sha512-9T9UjW3r0UW5c1Q7GTwllptXwhvYmEzFhzMfZ9H7FQWt+uZePjZPjBP/W1ZEyZ1twGWom5/56TF4lPcqjnDHcg==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "balanced-match": "^1.0.0",
        "concat-map": "0.0.1"
      }
    },
    "node_modules/braces": {
      "version": "3.0.3",
      "resolved": "https://registry.npmjs.org/braces/-/braces-3.0.3.tgz",
      "integrity": "sha512-yQbXgO/OSZVD2IsiLlro+7Hf6Q18EJrKSEsdoMzKePKXct3gvD8oLcOQdIzGupr5Fj+EDe8gO/lxc1BzfMpxvA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "fill-range": "^7.1.1"
      },
      "engines": {
        "node": ">=8"
      }
    },
    "node_modules/bson": {
      "version": "7.2.0",
      "resolved": "https://registry.npmjs.org/bson/-/bson-7.2.0.tgz",
      "integrity": "sha512-YCEo7KjMlbNlyHhz7zAZNDpIpQbd+wOEHJYezv0nMYTn4x31eIUM2yomNNubclAt63dObUzKHWsBLJ9QcZNSnQ==",
      "license": "Apache-2.0",
      "peer": true,
      "engines": {
        "node": ">=20.19.0"
      }
    },
    "node_modules/buffer-from": {
      "version": "1.1.2",
      "resolved": "https://registry.npmjs.org/buffer-from/-/buffer-from-1.1.2.tgz",
      "integrity": "sha512-E+XQCRwSbaaiChtv6k6Dwgc+bx+Bs6vuKJHHl5kox/BaKbhiXzqQOwK4cO22yElGp2OCmjwVhT3HmxgyPGnJfQ==",
      "license": "MIT"
    },
    "node_modules/busboy": {
      "version": "1.6.0",
      "resolved": "https://registry.npmjs.org/busboy/-/busboy-1.6.0.tgz",
      "integrity": "sha512-8SFQbg/0hQ9xy3UNTB0YEnsNBbWfhf7RtnzpL7TkBiTBRfrQ9Fxcnz7VJsleJpyp6rVLvXiuORqjlHi5q+PYuA==",
      "dependencies": {
        "streamsearch": "^1.1.0"
      },
      "engines": {
        "node": ">=10.16.0"
      }
    },
    "node_modules/bytes": {
      "version": "3.1.2",
      "resolved": "https://registry.npmjs.org/bytes/-/bytes-3.1.2.tgz",
      "integrity": "sha512-/Nf7TyzTx6S3yRJObOAV7956r8cr2+Oj8AC5dt8wSP3BQAoeX58NoHyCU8P8zGkNXStjTSi6fzO6F0pBdcYbEg==",
      "license": "MIT",
      "engines": {
        "node": ">= 0.8"
      }
    },
    "node_modules/call-bind-apply-helpers": {
      "version": "1.0.2",
      "resolved": "https://registry.npmjs.org/call-bind-apply-helpers/-/call-bind-apply-helpers-1.0.2.tgz",
      "integrity": "sha512-Sp1ablJ0ivDkSzjcaJdxEunN5/XvksFJ2sMBFfq6x0ryhQV/2b/KwFe21cMpmHtPOSij8K99/wSfoEuTObmuMQ==",
      "license": "MIT",
      "dependencies": {
        "es-errors": "^1.3.0",
        "function-bind": "^1.1.2"
      },
      "engines": {
        "node": ">= 0.4"
      }
    },
    "node_modules/call-bound": {
      "version": "1.0.4",
      "resolved": "https://registry.npmjs.org/call-bound/-/call-bound-1.0.4.tgz",
      "integrity": "sha512-+ys997U96po4Kx/ABpBCqhA9EuxJaQWDQg7295H4hBphv3IZg0boBKuwYpt4YXp6MZ5AmZQnU/tyMTlRpaSejg==",
      "license": "MIT",
      "dependencies": {
        "call-bind-apply-helpers": "^1.0.2",
        "get-intrinsic": "^1.3.0"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/camelcase": {
      "version": "8.0.0",
      "resolved": "https://registry.npmjs.org/camelcase/-/camelcase-8.0.0.tgz",
      "integrity": "sha512-8WB3Jcas3swSvjIeA2yvCJ+Miyz5l1ZmB6HFb9R1317dt9LCQoswg/BGrmAmkWVEszSrrg4RwmO46qIm2OEnSA==",
      "license": "MIT",
      "engines": {
        "node": ">=16"
      },
      "funding": {
        "url": "https://github.com/sponsors/sindresorhus"
      }
    },
    "node_modules/camelcase-keys": {
      "version": "9.1.3",
      "resolved": "https://registry.npmjs.org/camelcase-keys/-/camelcase-keys-9.1.3.tgz",
      "integrity": "sha512-Rircqi9ch8AnZscQcsA1C47NFdaO3wukpmIRzYcDOrmvgt78hM/sj5pZhZNec2NM12uk5vTwRHZ4anGcrC4ZTg==",
      "license": "MIT",
      "dependencies": {
        "camelcase": "^8.0.0",
        "map-obj": "5.0.0",
        "quick-lru": "^6.1.1",
        "type-fest": "^4.3.2"
      },
      "engines": {
        "node": ">=16"
      },
      "funding": {
        "url": "https://github.com/sponsors/sindresorhus"
      }
    },
    "node_modules/chokidar": {
      "version": "3.6.0",
      "resolved": "https://registry.npmjs.org/chokidar/-/chokidar-3.6.0.tgz",
      "integrity": "sha512-7VT13fmjotKpGipCW9JEQAusEPE+Ei8nl6/g4FBAmIm0GOOLMua9NDDo/DWp0ZAxCr3cPq5ZpBqmPAQgDda2Pw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "anymatch": "~3.1.2",
        "braces": "~3.0.2",
        "glob-parent": "~5.1.2",
        "is-binary-path": "~2.1.0",
        "is-glob": "~4.0.1",
        "normalize-path": "~3.0.0",
        "readdirp": "~3.6.0"
      },
      "engines": {
        "node": ">= 8.10.0"
      },
      "funding": {
        "url": "https://paulmillr.com/funding/"
      },
      "optionalDependencies": {
        "fsevents": "~2.3.2"
      }
    },
    "node_modules/cloudinary": {
      "version": "2.9.0",
      "resolved": "https://registry.npmjs.org/cloudinary/-/cloudinary-2.9.0.tgz",
      "integrity": "sha512-F3iKMOy4y0zy0bi5JBp94SC7HY7i/ImfTPSUV07iJmRzH1Iz8WavFfOlJTR1zvYM/xKGoiGZ3my/zy64In0IQQ==",
      "license": "MIT",
      "dependencies": {
        "lodash": "^4.17.21"
      },
      "engines": {
        "node": ">=9"
      }
    },
    "node_modules/combined-stream": {
      "version": "1.0.8",
      "resolved": "https://registry.npmjs.org/combined-stream/-/combined-stream-1.0.8.tgz",
      "integrity": "sha512-FQN4MRfuJeHf7cBbBMJFXhKSDq+2kAArBlmRBvcvFE5BB1HZKXtSFASDhdlz9zOYwxh8lDdnvmMOe/+5cdoEdg==",
      "license": "MIT",
      "dependencies": {
        "delayed-stream": "~1.0.0"
      },
      "engines": {
        "node": ">= 0.8"
      }
    },
    "node_modules/concat-map": {
      "version": "0.0.1",
      "resolved": "https://registry.npmjs.org/concat-map/-/concat-map-0.0.1.tgz",
      "integrity": "sha512-/Srv4dswyQNBfohGpz9o6Yb3Gz3SrUDqBH5rTuhGR7ahtlbYKnVxw2bCFMRljaA7EXHaXZ8wsHdodFvbkhKmqg==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/concat-stream": {
      "version": "2.0.0",
      "resolved": "https://registry.npmjs.org/concat-stream/-/concat-stream-2.0.0.tgz",
      "integrity": "sha512-MWufYdFw53ccGjCA+Ol7XJYpAlW6/prSMzuPOTRnJGcGzuhLn4Scrz7qf6o8bROZ514ltazcIFJZevcfbo0x7A==",
      "engines": [
        "node >= 6.0"
      ],
      "license": "MIT",
      "dependencies": {
        "buffer-from": "^1.0.0",
        "inherits": "^2.0.3",
        "readable-stream": "^3.0.2",
        "typedarray": "^0.0.6"
      }
    },
    "node_modules/content-disposition": {
      "version": "0.5.4",
      "resolved": "https://registry.npmjs.org/content-disposition/-/content-disposition-0.5.4.tgz",
      "integrity": "sha512-FveZTNuGw04cxlAiWbzi6zTAL/lhehaWbTtgluJh4/E95DqMwTmha3KZN1aAWA8cFIhHzMZUvLevkw5Rqk+tSQ==",
      "license": "MIT",
      "dependencies": {
        "safe-buffer": "5.2.1"
      },
      "engines": {
        "node": ">= 0.6"
      }
    },
    "node_modules/content-type": {
      "version": "1.0.5",
      "resolved": "https://registry.npmjs.org/content-type/-/content-type-1.0.5.tgz",
      "integrity": "sha512-nTjqfcBFEipKdXCv4YDQWCfmcLZKm81ldF0pAopTvyrFGVbcR6P/VAAd5G7N+0tTr8QqiU0tFadD6FK4NtJwOA==",
      "license": "MIT",
      "engines": {
        "node": ">= 0.6"
      }
    },
    "node_modules/cookie": {
      "version": "0.6.0",
      "resolved": "https://registry.npmjs.org/cookie/-/cookie-0.6.0.tgz",
      "integrity": "sha512-U71cyTamuh1CRNCfpGY6to28lxvNwPG4Guz/EVjgf3Jmzv0vlDp1atT9eS5dDjMYHucpHbWns6Lwf3BKz6svdw==",
      "license": "MIT",
      "engines": {
        "node": ">= 0.6"
      }
    },
    "node_modules/cookie-signature": {
      "version": "1.0.6",
      "resolved": "https://registry.npmjs.org/cookie-signature/-/cookie-signature-1.0.6.tgz",
      "integrity": "sha512-QADzlaHc8icV8I7vbaJXJwod9HWYp8uCqf1xa4OfNu1T7JVxQIrUgOWtHdNDtPiywmFbiS12VjotIXLrKM3orQ==",
      "license": "MIT"
    },
    "node_modules/cors": {
      "version": "2.8.6",
      "resolved": "https://registry.npmjs.org/cors/-/cors-2.8.6.tgz",
      "integrity": "sha512-tJtZBBHA6vjIAaF6EnIaq6laBBP9aq/Y3ouVJjEfoHbRBcHBAHYcMh/w8LDrk2PvIMMq8gmopa5D4V8RmbrxGw==",
      "license": "MIT",
      "dependencies": {
        "object-assign": "^4",
        "vary": "^1"
      },
      "engines": {
        "node": ">= 0.10"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/express"
      }
    },
    "node_modules/create-require": {
      "version": "1.1.1",
      "resolved": "https://registry.npmjs.org/create-require/-/create-require-1.1.1.tgz",
      "integrity": "sha512-dcKFX3jn0MpIaXjisoRvexIJVEKzaq7z2rZKxf+MSr9TkdmHmsU4m2lcLojrj/FHl8mk5VxMmYA+ftRkP/3oKQ==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/debug": {
      "version": "2.6.9",
      "resolved": "https://registry.npmjs.org/debug/-/debug-2.6.9.tgz",
      "integrity": "sha512-bC7ElrdJaJnPbAP+1EotYvqZsb3ecl5wi6Bfi6BJTUcNowp6cvspg0jXznRTKDjm/E7AdgFBVeAPVMNcKGsHMA==",
      "license": "MIT",
      "dependencies": {
        "ms": "2.0.0"
      }
    },
    "node_modules/defu": {
      "version": "6.1.4",
      "resolved": "https://registry.npmjs.org/defu/-/defu-6.1.4.tgz",
      "integrity": "sha512-mEQCMmwJu317oSz8CwdIOdwf3xMif1ttiM8LTufzc3g6kR+9Pe236twL8j3IYT1F7GfRgGcW6MWxzZjLIkuHIg==",
      "license": "MIT"
    },
    "node_modules/delayed-stream": {
      "version": "1.0.0",
      "resolved": "https://registry.npmjs.org/delayed-stream/-/delayed-stream-1.0.0.tgz",
      "integrity": "sha512-ZySD7Nf91aLB0RxL4KGrKHBXl7Eds1DAmEdcoVawXnLD7SDhpNgtuII2aAkg7a7QS41jxPSZ17p4VdGnMHk3MQ==",
      "license": "MIT",
      "engines": {
        "node": ">=0.4.0"
      }
    },
    "node_modules/denque": {
      "version": "2.1.0",
      "resolved": "https://registry.npmjs.org/denque/-/denque-2.1.0.tgz",
      "integrity": "sha512-HVQE3AAb/pxF8fQAoiqpvg9i3evqug3hoiwakOyZAwJm+6vZehbkYXZ0l4JxS+I3QxM97v5aaRNhj8v5oBhekw==",
      "license": "Apache-2.0",
      "optional": true,
      "peer": true,
      "engines": {
        "node": ">=0.10"
      }
    },
    "node_modules/depd": {
      "version": "2.0.0",
      "resolved": "https://registry.npmjs.org/depd/-/depd-2.0.0.tgz",
      "integrity": "sha512-g7nH6P6dyDioJogAAGprGpCtVImJhpPk/roCzdb3fIh61/s/nPsfR6onyMwkCAR/OlC3yBC0lESvUoQEAssIrw==",
      "license": "MIT",
      "engines": {
        "node": ">= 0.8"
      }
    },
    "node_modules/destroy": {
      "version": "1.2.0",
      "resolved": "https://registry.npmjs.org/destroy/-/destroy-1.2.0.tgz",
      "integrity": "sha512-2sJGJTaXIIaR1w4iJSNoN0hnMY7Gpc/n8D4qSCJw8QqFWXf7cuAgnEHxBpweaVcPevC2l3KpjYCx3NypQQgaJg==",
      "license": "MIT",
      "engines": {
        "node": ">= 0.8",
        "npm": "1.2.8000 || >= 1.4.16"
      }
    },
    "node_modules/diff": {
      "version": "4.0.4",
      "resolved": "https://registry.npmjs.org/diff/-/diff-4.0.4.tgz",
      "integrity": "sha512-X07nttJQkwkfKfvTPG/KSnE2OMdcUCao6+eXF3wmnIQRn2aPAHH3VxDbDOdegkd6JbPsXqShpvEOHfAT+nCNwQ==",
      "dev": true,
      "license": "BSD-3-Clause",
      "engines": {
        "node": ">=0.3.1"
      }
    },
    "node_modules/dotenv": {
      "version": "16.6.1",
      "resolved": "https://registry.npmjs.org/dotenv/-/dotenv-16.6.1.tgz",
      "integrity": "sha512-uBq4egWHTcTt33a72vpSG0z3HnPuIl6NqYcTrKEg2azoEyl2hpW0zqlxysq2pK9HlDIHyHyakeYaYnSAwd8bow==",
      "license": "BSD-2-Clause",
      "engines": {
        "node": ">=12"
      },
      "funding": {
        "url": "https://dotenvx.com"
      }
    },
    "node_modules/dunder-proto": {
      "version": "1.0.1",
      "resolved": "https://registry.npmjs.org/dunder-proto/-/dunder-proto-1.0.1.tgz",
      "integrity": "sha512-KIN/nDJBQRcXw0MLVhZE9iQHmG68qAVIBg9CqmUYjmQIhgij9U5MFvrqkUL5FbtyyzZuOeOt0zdeRe4UY7ct+A==",
      "license": "MIT",
      "dependencies": {
        "call-bind-apply-helpers": "^1.0.1",
        "es-errors": "^1.3.0",
        "gopd": "^1.2.0"
      },
      "engines": {
        "node": ">= 0.4"
      }
    },
    "node_modules/dynamic-dedupe": {
      "version": "0.3.0",
      "resolved": "https://registry.npmjs.org/dynamic-dedupe/-/dynamic-dedupe-0.3.0.tgz",
      "integrity": "sha512-ssuANeD+z97meYOqd50e04Ze5qp4bPqo8cCkI4TRjZkzAUgIDTrXV1R8QCdINpiI+hw14+rYazvTRdQrz0/rFQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "xtend": "^4.0.0"
      }
    },
    "node_modules/ee-first": {
      "version": "1.1.1",
      "resolved": "https://registry.npmjs.org/ee-first/-/ee-first-1.1.1.tgz",
      "integrity": "sha512-WMwm9LhRUo+WUaRN+vRuETqG89IgZphVSNkdFgeb6sS/E4OrDIN7t48CAewSHXc6C8lefD8KKfr5vY61brQlow==",
      "license": "MIT"
    },
    "node_modules/encodeurl": {
      "version": "1.0.2",
      "resolved": "https://registry.npmjs.org/encodeurl/-/encodeurl-1.0.2.tgz",
      "integrity": "sha512-TPJXq8JqFaVYm2CWmPvnP2Iyo4ZSM7/QKcSmuMLDObfpH5fi7RUGmd/rTDf+rut/saiDiQEeVTNgAmJEdAOx0w==",
      "license": "MIT",
      "engines": {
        "node": ">= 0.8"
      }
    },
    "node_modules/es-define-property": {
      "version": "1.0.1",
      "resolved": "https://registry.npmjs.org/es-define-property/-/es-define-property-1.0.1.tgz",
      "integrity": "sha512-e3nRfgfUZ4rNGL232gUgX06QNyyez04KdjFrF+LTRoOXmrOgFKDg4BCdsjW8EnT69eqdYGmRpJwiPVYNrCaW3g==",
      "license": "MIT",
      "engines": {
        "node": ">= 0.4"
      }
    },
    "node_modules/es-errors": {
      "version": "1.3.0",
      "resolved": "https://registry.npmjs.org/es-errors/-/es-errors-1.3.0.tgz",
      "integrity": "sha512-Zf5H2Kxt2xjTvbJvP2ZWLEICxA6j+hAmMzIlypy4xcBg1vKVnx89Wy0GbS+kf5cwCVFFzdCFh2XSCFNULS6csw==",
      "license": "MIT",
      "engines": {
        "node": ">= 0.4"
      }
    },
    "node_modules/es-object-atoms": {
      "version": "1.1.1",
      "resolved": "https://registry.npmjs.org/es-object-atoms/-/es-object-atoms-1.1.1.tgz",
      "integrity": "sha512-FGgH2h8zKNim9ljj7dankFPcICIK9Cp5bm+c2gQSYePhpaG5+esrLODihIorn+Pe6FGJzWhXQotPv73jTaldXA==",
      "license": "MIT",
      "dependencies": {
        "es-errors": "^1.3.0"
      },
      "engines": {
        "node": ">= 0.4"
      }
    },
    "node_modules/es-set-tostringtag": {
      "version": "2.1.0",
      "resolved": "https://registry.npmjs.org/es-set-tostringtag/-/es-set-tostringtag-2.1.0.tgz",
      "integrity": "sha512-j6vWzfrGVfyXxge+O0x5sh6cvxAog0a/4Rdd2K36zCMV5eJ+/+tOAngRO8cODMNWbVRdVlmGZQL2YS3yR8bIUA==",
      "license": "MIT",
      "dependencies": {
        "es-errors": "^1.3.0",
        "get-intrinsic": "^1.2.6",
        "has-tostringtag": "^1.0.2",
        "hasown": "^2.0.2"
      },
      "engines": {
        "node": ">= 0.4"
      }
    },
    "node_modules/escape-html": {
      "version": "1.0.3",
      "resolved": "https://registry.npmjs.org/escape-html/-/escape-html-1.0.3.tgz",
      "integrity": "sha512-NiSupZ4OeuGwr68lGIeym/ksIZMJodUGOSCZ/FSnTxcrekbvqrgdUxlJOMpijaKZVjAJrWrGs/6Jy8OMuyj9ow==",
      "license": "MIT"
    },
    "node_modules/etag": {
      "version": "1.8.1",
      "resolved": "https://registry.npmjs.org/etag/-/etag-1.8.1.tgz",
      "integrity": "sha512-aIL5Fx7mawVa300al2BnEE4iNvo1qETxLrPI/o05L7z6go7fCw1J6EQmbK4FmJ2AS7kgVF/KEZWufBfdClMcPg==",
      "license": "MIT",
      "engines": {
        "node": ">= 0.6"
      }
    },
    "node_modules/express": {
      "version": "4.19.2",
      "resolved": "https://registry.npmjs.org/express/-/express-4.19.2.tgz",
      "integrity": "sha512-5T6nhjsT+EOMzuck8JjBHARTHfMht0POzlA60WV2pMD3gyXw2LZnZ+ueGdNxG+0calOJcWKbpFcuzLZ91YWq9Q==",
      "license": "MIT",
      "dependencies": {
        "accepts": "~1.3.8",
        "array-flatten": "1.1.1",
        "body-parser": "1.20.2",
        "content-disposition": "0.5.4",
        "content-type": "~1.0.4",
        "cookie": "0.6.0",
        "cookie-signature": "1.0.6",
        "debug": "2.6.9",
        "depd": "2.0.0",
        "encodeurl": "~1.0.2",
        "escape-html": "~1.0.3",
        "etag": "~1.8.1",
        "finalhandler": "1.2.0",
        "fresh": "0.5.2",
        "http-errors": "2.0.0",
        "merge-descriptors": "1.0.1",
        "methods": "~1.1.2",
        "on-finished": "2.4.1",
        "parseurl": "~1.3.3",
        "path-to-regexp": "0.1.7",
        "proxy-addr": "~2.0.7",
        "qs": "6.11.0",
        "range-parser": "~1.2.1",
        "safe-buffer": "5.2.1",
        "send": "0.18.0",
        "serve-static": "1.15.0",
        "setprototypeof": "1.2.0",
        "statuses": "2.0.1",
        "type-is": "~1.6.18",
        "utils-merge": "1.0.1",
        "vary": "~1.1.2"
      },
      "engines": {
        "node": ">= 0.10.0"
      }
    },
    "node_modules/fill-range": {
      "version": "7.1.1",
      "resolved": "https://registry.npmjs.org/fill-range/-/fill-range-7.1.1.tgz",
      "integrity": "sha512-YsGpe3WHLK8ZYi4tWDg2Jy3ebRz2rXowDxnld4bkQB00cc/1Zw9AWnC0i9ztDJitivtQvaI9KaLyKrc+hBW0yg==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "to-regex-range": "^5.0.1"
      },
      "engines": {
        "node": ">=8"
      }
    },
    "node_modules/finalhandler": {
      "version": "1.2.0",
      "resolved": "https://registry.npmjs.org/finalhandler/-/finalhandler-1.2.0.tgz",
      "integrity": "sha512-5uXcUVftlQMFnWC9qu/svkWv3GTd2PfUhK/3PLkYNAe7FbqJMt3515HaxE6eRL74GdsriiwujiawdaB1BpEISg==",
      "license": "MIT",
      "dependencies": {
        "debug": "2.6.9",
        "encodeurl": "~1.0.2",
        "escape-html": "~1.0.3",
        "on-finished": "2.4.1",
        "parseurl": "~1.3.3",
        "statuses": "2.0.1",
        "unpipe": "~1.0.0"
      },
      "engines": {
        "node": ">= 0.8"
      }
    },
    "node_modules/form-data": {
      "version": "2.5.5",
      "resolved": "https://registry.npmjs.org/form-data/-/form-data-2.5.5.tgz",
      "integrity": "sha512-jqdObeR2rxZZbPSGL+3VckHMYtu+f9//KXBsVny6JSX/pa38Fy+bGjuG8eW/H6USNQWhLi8Num++cU2yOCNz4A==",
      "license": "MIT",
      "dependencies": {
        "asynckit": "^0.4.0",
        "combined-stream": "^1.0.8",
        "es-set-tostringtag": "^2.1.0",
        "hasown": "^2.0.2",
        "mime-types": "^2.1.35",
        "safe-buffer": "^5.2.1"
      },
      "engines": {
        "node": ">= 0.12"
      }
    },
    "node_modules/forwarded": {
      "version": "0.2.0",
      "resolved": "https://registry.npmjs.org/forwarded/-/forwarded-0.2.0.tgz",
      "integrity": "sha512-buRG0fpBtRHSTCOASe6hD258tEubFoRLb4ZNA6NxMVHNw2gOcwHo9wyablzMzOA5z9xA9L1KNjk/Nt6MT9aYow==",
      "license": "MIT",
      "engines": {
        "node": ">= 0.6"
      }
    },
    "node_modules/fresh": {
      "version": "0.5.2",
      "resolved": "https://registry.npmjs.org/fresh/-/fresh-0.5.2.tgz",
      "integrity": "sha512-zJ2mQYM18rEFOudeV4GShTGIQ7RbzA7ozbU9I/XBpm7kqgMywgmylMwXHxZJmkVoYkna9d2pVXVXPdYTP9ej8Q==",
      "license": "MIT",
      "engines": {
        "node": ">= 0.6"
      }
    },
    "node_modules/fs.realpath": {
      "version": "1.0.0",
      "resolved": "https://registry.npmjs.org/fs.realpath/-/fs.realpath-1.0.0.tgz",
      "integrity": "sha512-OO0pH2lK6a0hZnAdau5ItzHPI6pUlvI7jMVnxUQRtw4owF2wk8lOSabtGDCTP4Ggrg2MbGnWO9X8K1t4+fGMDw==",
      "dev": true,
      "license": "ISC"
    },
    "node_modules/fsevents": {
      "version": "2.3.3",
      "resolved": "https://registry.npmjs.org/fsevents/-/fsevents-2.3.3.tgz",
      "integrity": "sha512-5xoDfX+fL7faATnagmWPpbFtwh/R77WmMMqqHGS65C3vvB0YHrgF+B1YmZ3441tMj5n63k0212XNoJwzlhffQw==",
      "dev": true,
      "hasInstallScript": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "darwin"
      ],
      "engines": {
        "node": "^8.16.0 || ^10.6.0 || >=11.0.0"
      }
    },
    "node_modules/function-bind": {
      "version": "1.1.2",
      "resolved": "https://registry.npmjs.org/function-bind/-/function-bind-1.1.2.tgz",
      "integrity": "sha512-7XHNxH7qX9xG5mIwxkhumTox/MIRNcOgDrxWsMt2pAr23WHp6MrRlN7FBSFpCpr+oVO0F744iUgR82nJMfG2SA==",
      "license": "MIT",
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/generate-function": {
      "version": "2.3.1",
      "resolved": "https://registry.npmjs.org/generate-function/-/generate-function-2.3.1.tgz",
      "integrity": "sha512-eeB5GfMNeevm/GRYq20ShmsaGcmI81kIX2K9XQx5miC8KdHaC6Jm0qQ8ZNeGOi7wYB8OsdxKs+Y2oVuTFuVwKQ==",
      "license": "MIT",
      "optional": true,
      "peer": true,
      "dependencies": {
        "is-property": "^1.0.2"
      }
    },
    "node_modules/get-intrinsic": {
      "version": "1.3.0",
      "resolved": "https://registry.npmjs.org/get-intrinsic/-/get-intrinsic-1.3.0.tgz",
      "integrity": "sha512-9fSjSaos/fRIVIp+xSJlE6lfwhES7LNtKaCBIamHsjr2na1BiABJPo0mOjjz8GJDURarmCPGqaiVg5mfjb98CQ==",
      "license": "MIT",
      "dependencies": {
        "call-bind-apply-helpers": "^1.0.2",
        "es-define-property": "^1.0.1",
        "es-errors": "^1.3.0",
        "es-object-atoms": "^1.1.1",
        "function-bind": "^1.1.2",
        "get-proto": "^1.0.1",
        "gopd": "^1.2.0",
        "has-symbols": "^1.1.0",
        "hasown": "^2.0.2",
        "math-intrinsics": "^1.1.0"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/get-proto": {
      "version": "1.0.1",
      "resolved": "https://registry.npmjs.org/get-proto/-/get-proto-1.0.1.tgz",
      "integrity": "sha512-sTSfBjoXBp89JvIKIefqw7U2CCebsc74kiY6awiGogKtoSGbgjYE/G/+l9sF3MWFPNc9IcoOC4ODfKHfxFmp0g==",
      "license": "MIT",
      "dependencies": {
        "dunder-proto": "^1.0.1",
        "es-object-atoms": "^1.0.0"
      },
      "engines": {
        "node": ">= 0.4"
      }
    },
    "node_modules/glob": {
      "version": "7.2.3",
      "resolved": "https://registry.npmjs.org/glob/-/glob-7.2.3.tgz",
      "integrity": "sha512-nFR0zLpU2YCaRxwoCJvL6UvCH2JFyFVIvwTLsIf21AuHlMskA1hhTdk+LlYJtOlYt9v6dvszD2BGRqBL+iQK9Q==",
      "deprecated": "Old versions of glob are not supported, and contain widely publicized security vulnerabilities, which have been fixed in the current version. Please update. Support for old versions may be purchased (at exorbitant rates) by contacting i@izs.me",
      "dev": true,
      "license": "ISC",
      "dependencies": {
        "fs.realpath": "^1.0.0",
        "inflight": "^1.0.4",
        "inherits": "2",
        "minimatch": "^3.1.1",
        "once": "^1.3.0",
        "path-is-absolute": "^1.0.0"
      },
      "engines": {
        "node": "*"
      },
      "funding": {
        "url": "https://github.com/sponsors/isaacs"
      }
    },
    "node_modules/glob-parent": {
      "version": "5.1.2",
      "resolved": "https://registry.npmjs.org/glob-parent/-/glob-parent-5.1.2.tgz",
      "integrity": "sha512-AOIgSQCepiJYwP3ARnGx+5VnTu2HBYdzbGP45eLw1vr3zB3vZLeyed1sC9hnbcOc9/SrMyM5RPQrkGz4aS9Zow==",
      "dev": true,
      "license": "ISC",
      "dependencies": {
        "is-glob": "^4.0.1"
      },
      "engines": {
        "node": ">= 6"
      }
    },
    "node_modules/gopd": {
      "version": "1.2.0",
      "resolved": "https://registry.npmjs.org/gopd/-/gopd-1.2.0.tgz",
      "integrity": "sha512-ZUKRh6/kUFoAiTAtTYPZJ3hw9wNxx+BIBOijnlG9PnrJsCcSjs1wyyD6vJpaYtgnzDrKYRSqf3OO6Rfa93xsRg==",
      "license": "MIT",
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/has-symbols": {
      "version": "1.1.0",
      "resolved": "https://registry.npmjs.org/has-symbols/-/has-symbols-1.1.0.tgz",
      "integrity": "sha512-1cDNdwJ2Jaohmb3sg4OmKaMBwuC48sYni5HUw2DvsC8LjGTLK9h+eb1X6RyuOHe4hT0ULCW68iomhjUoKUqlPQ==",
      "license": "MIT",
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/has-tostringtag": {
      "version": "1.0.2",
      "resolved": "https://registry.npmjs.org/has-tostringtag/-/has-tostringtag-1.0.2.tgz",
      "integrity": "sha512-NqADB8VjPFLM2V0VvHUewwwsw0ZWBaIdgo+ieHtK3hasLz4qeCRjYcqfB6AQrBggRKppKF8L52/VqdVsO47Dlw==",
      "license": "MIT",
      "dependencies": {
        "has-symbols": "^1.0.3"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/hasown": {
      "version": "2.0.2",
      "resolved": "https://registry.npmjs.org/hasown/-/hasown-2.0.2.tgz",
      "integrity": "sha512-0hJU9SCPvmMzIBdZFqNPXWa6dqh7WdH0cII9y+CyS8rG3nL48Bclra9HmKhVVUHyPWNH5Y7xDwAB7bfgSjkUMQ==",
      "license": "MIT",
      "dependencies": {
        "function-bind": "^1.1.2"
      },
      "engines": {
        "node": ">= 0.4"
      }
    },
    "node_modules/http-errors": {
      "version": "2.0.0",
      "resolved": "https://registry.npmjs.org/http-errors/-/http-errors-2.0.0.tgz",
      "integrity": "sha512-FtwrG/euBzaEjYeRqOgly7G0qviiXoJWnvEH2Z1plBdXgbyjv34pHTSb9zoeHMyDy33+DWy5Wt9Wo+TURtOYSQ==",
      "license": "MIT",
      "dependencies": {
        "depd": "2.0.0",
        "inherits": "2.0.4",
        "setprototypeof": "1.2.0",
        "statuses": "2.0.1",
        "toidentifier": "1.0.1"
      },
      "engines": {
        "node": ">= 0.8"
      }
    },
    "node_modules/iconv-lite": {
      "version": "0.4.24",
      "resolved": "https://registry.npmjs.org/iconv-lite/-/iconv-lite-0.4.24.tgz",
      "integrity": "sha512-v3MXnZAcvnywkTUEZomIActle7RXXeedOR31wwl7VlyoXO4Qi9arvSenNQWne1TcRwhCL1HwLI21bEqdpj8/rA==",
      "license": "MIT",
      "dependencies": {
        "safer-buffer": ">= 2.1.2 < 3"
      },
      "engines": {
        "node": ">=0.10.0"
      }
    },
    "node_modules/inflight": {
      "version": "1.0.6",
      "resolved": "https://registry.npmjs.org/inflight/-/inflight-1.0.6.tgz",
      "integrity": "sha512-k92I/b08q4wvFscXCLvqfsHCrjrF7yiXsQuIVvVE7N82W3+aqpzuUdBbfhWcy/FZR3/4IgflMgKLOsvPDrGCJA==",
      "deprecated": "This module is not supported, and leaks memory. Do not use it. Check out lru-cache if you want a good and tested way to coalesce async requests by a key value, which is much more comprehensive and powerful.",
      "dev": true,
      "license": "ISC",
      "dependencies": {
        "once": "^1.3.0",
        "wrappy": "1"
      }
    },
    "node_modules/inherits": {
      "version": "2.0.4",
      "resolved": "https://registry.npmjs.org/inherits/-/inherits-2.0.4.tgz",
      "integrity": "sha512-k/vGaX4/Yla3WzyMCvTQOXYeIHvqOKtnqBduzTHpzpQZzAskKMhZ2K+EnBiSM9zGSoIFeMpXKxa4dYeZIQqewQ==",
      "license": "ISC"
    },
    "node_modules/ipaddr.js": {
      "version": "1.9.1",
      "resolved": "https://registry.npmjs.org/ipaddr.js/-/ipaddr.js-1.9.1.tgz",
      "integrity": "sha512-0KI/607xoxSToH7GjN1FfSbLoU0+btTicjsQSWQlh/hZykN8KpmMf7uYwPW3R+akZ6R/w18ZlXSHBYXiYUPO3g==",
      "license": "MIT",
      "engines": {
        "node": ">= 0.10"
      }
    },
    "node_modules/is-binary-path": {
      "version": "2.1.0",
      "resolved": "https://registry.npmjs.org/is-binary-path/-/is-binary-path-2.1.0.tgz",
      "integrity": "sha512-ZMERYes6pDydyuGidse7OsHxtbI7WVeUEozgR/g7rd0xUimYNlvZRE/K2MgZTjWy725IfelLeVcEM97mmtRGXw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "binary-extensions": "^2.0.0"
      },
      "engines": {
        "node": ">=8"
      }
    },
    "node_modules/is-core-module": {
      "version": "2.16.1",
      "resolved": "https://registry.npmjs.org/is-core-module/-/is-core-module-2.16.1.tgz",
      "integrity": "sha512-UfoeMA6fIJ8wTYFEUjelnaGI67v6+N7qXJEvQuIGa99l4xsCruSYOVSQ0uPANn4dAzm8lkYPaKLrrijLq7x23w==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "hasown": "^2.0.2"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/is-extglob": {
      "version": "2.1.1",
      "resolved": "https://registry.npmjs.org/is-extglob/-/is-extglob-2.1.1.tgz",
      "integrity": "sha512-SbKbANkN603Vi4jEZv49LeVJMn4yGwsbzZworEoyEiutsN3nJYdbO36zfhGJ6QEDpOZIFkDtnq5JRxmvl3jsoQ==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=0.10.0"
      }
    },
    "node_modules/is-glob": {
      "version": "4.0.3",
      "resolved": "https://registry.npmjs.org/is-glob/-/is-glob-4.0.3.tgz",
      "integrity": "sha512-xelSayHH36ZgE7ZWhli7pW34hNbNl8Ojv5KVmkJD4hBdD3th8Tfk9vYasLM+mXWOZhFkgZfxhLSnrwRr4elSSg==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "is-extglob": "^2.1.1"
      },
      "engines": {
        "node": ">=0.10.0"
      }
    },
    "node_modules/is-number": {
      "version": "7.0.0",
      "resolved": "https://registry.npmjs.org/is-number/-/is-number-7.0.0.tgz",
      "integrity": "sha512-41Cifkg6e8TylSpdtTpeLVMqvSBEVzTttHvERD741+pnZ8ANv0004MRL43QKPDlK9cGvNp6NZWZUBlbGXYxxng==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=0.12.0"
      }
    },
    "node_modules/is-property": {
      "version": "1.0.2",
      "resolved": "https://registry.npmjs.org/is-property/-/is-property-1.0.2.tgz",
      "integrity": "sha512-Ks/IoX00TtClbGQr4TWXemAnktAQvYB7HzcCxDGqEZU6oCmb2INHuOoKxbtR+HFkmYWBKv/dOZtGRiAjDhj92g==",
      "license": "MIT",
      "optional": true,
      "peer": true
    },
    "node_modules/jose": {
      "version": "6.2.2",
      "resolved": "https://registry.npmjs.org/jose/-/jose-6.2.2.tgz",
      "integrity": "sha512-d7kPDd34KO/YnzaDOlikGpOurfF0ByC2sEV4cANCtdqLlTfBlw2p14O/5d/zv40gJPbIQxfES3nSx1/oYNyuZQ==",
      "license": "MIT",
      "funding": {
        "url": "https://github.com/sponsors/panva"
      }
    },
    "node_modules/kysely": {
      "version": "0.28.13",
      "resolved": "https://registry.npmjs.org/kysely/-/kysely-0.28.13.tgz",
      "integrity": "sha512-jCkYDvlfzOyHaVsrvR4vnNZxG30oNv2jbbFBjTQAUG8n0h07HW0sZJHk4KAQIRyu9ay+Rg+L8qGa3lwt8Gve9w==",
      "license": "MIT",
      "engines": {
        "node": ">=20.0.0"
      }
    },
    "node_modules/livekit-server-sdk": {
      "version": "2.15.1",
      "resolved": "https://registry.npmjs.org/livekit-server-sdk/-/livekit-server-sdk-2.15.1.tgz",
      "integrity": "sha512-kfhXkNxbDIKXF9pFxEYVjWjU+YAA7MQZ2qcyUCgassNplt2gQzQKnIjQz9RpIEWLAIDs8i/4lxJO0mENbjQ35Q==",
      "license": "Apache-2.0",
      "dependencies": {
        "@bufbuild/protobuf": "^1.10.1",
        "@livekit/protocol": "^1.43.1",
        "camelcase-keys": "^9.0.0",
        "jose": "^5.1.2"
      },
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/livekit-server-sdk/node_modules/jose": {
      "version": "5.10.0",
      "resolved": "https://registry.npmjs.org/jose/-/jose-5.10.0.tgz",
      "integrity": "sha512-s+3Al/p9g32Iq+oqXxkW//7jk2Vig6FF1CFqzVXoTUXt2qz89YWbL+OwS17NFYEvxC35n0FKeGO2LGYSxeM2Gg==",
      "license": "MIT",
      "funding": {
        "url": "https://github.com/sponsors/panva"
      }
    },
    "node_modules/lodash": {
      "version": "4.17.23",
      "resolved": "https://registry.npmjs.org/lodash/-/lodash-4.17.23.tgz",
      "integrity": "sha512-LgVTMpQtIopCi79SJeDiP0TfWi5CNEc/L/aRdTh3yIvmZXTnheWpKjSZhnvMl8iXbC1tFg9gdHHDMLoV7CnG+w==",
      "license": "MIT"
    },
    "node_modules/long": {
      "version": "5.3.2",
      "resolved": "https://registry.npmjs.org/long/-/long-5.3.2.tgz",
      "integrity": "sha512-mNAgZ1GmyNhD7AuqnTG3/VQ26o760+ZYBPKjPvugO8+nLbYfX6TVpJPseBvopbdY+qpZ/lKUnmEc1LeZYS3QAA==",
      "license": "Apache-2.0",
      "optional": true,
      "peer": true
    },
    "node_modules/lru.min": {
      "version": "1.1.4",
      "resolved": "https://registry.npmjs.org/lru.min/-/lru.min-1.1.4.tgz",
      "integrity": "sha512-DqC6n3QQ77zdFpCMASA1a3Jlb64Hv2N2DciFGkO/4L9+q/IpIAuRlKOvCXabtRW6cQf8usbmM6BE/TOPysCdIA==",
      "license": "MIT",
      "optional": true,
      "peer": true,
      "engines": {
        "bun": ">=1.0.0",
        "deno": ">=1.30.0",
        "node": ">=8.0.0"
      },
      "funding": {
        "type": "github",
        "url": "https://github.com/sponsors/wellwelwel"
      }
    },
    "node_modules/make-error": {
      "version": "1.3.6",
      "resolved": "https://registry.npmjs.org/make-error/-/make-error-1.3.6.tgz",
      "integrity": "sha512-s8UhlNe7vPKomQhC1qFelMokr/Sc3AgNbso3n74mVPA5LTZwkB9NlXf4XPamLxJE8h0gh73rM94xvwRT2CVInw==",
      "dev": true,
      "license": "ISC"
    },
    "node_modules/map-obj": {
      "version": "5.0.0",
      "resolved": "https://registry.npmjs.org/map-obj/-/map-obj-5.0.0.tgz",
      "integrity": "sha512-2L3MIgJynYrZ3TYMriLDLWocz15okFakV6J12HXvMXDHui2x/zgChzg1u9mFFGbbGWE+GsLpQByt4POb9Or+uA==",
      "license": "MIT",
      "engines": {
        "node": "^12.20.0 || ^14.13.1 || >=16.0.0"
      },
      "funding": {
        "url": "https://github.com/sponsors/sindresorhus"
      }
    },
    "node_modules/math-intrinsics": {
      "version": "1.1.0",
      "resolved": "https://registry.npmjs.org/math-intrinsics/-/math-intrinsics-1.1.0.tgz",
      "integrity": "sha512-/IXtbwEk5HTPyEwyKX6hGkYXxM9nbj64B+ilVJnC/R6B0pH5G4V3b0pVbL7DBj4tkhBAppbQUlf6F6Xl9LHu1g==",
      "license": "MIT",
      "engines": {
        "node": ">= 0.4"
      }
    },
    "node_modules/media-typer": {
      "version": "0.3.0",
      "resolved": "https://registry.npmjs.org/media-typer/-/media-typer-0.3.0.tgz",
      "integrity": "sha512-dq+qelQ9akHpcOl/gUVRTxVIOkAJ1wR3QAvb4RsVjS8oVoFjDGTc679wJYmUmknUF5HwMLOgb5O+a3KxfWapPQ==",
      "license": "MIT",
      "engines": {
        "node": ">= 0.6"
      }
    },
    "node_modules/memory-pager": {
      "version": "1.5.0",
      "resolved": "https://registry.npmjs.org/memory-pager/-/memory-pager-1.5.0.tgz",
      "integrity": "sha512-ZS4Bp4r/Zoeq6+NLJpP+0Zzm0pR8whtGPf1XExKLJBAczGMnSi3It14OiNCStjQjM6NU1okjQGSxgEZN8eBYKg==",
      "license": "MIT",
      "peer": true
    },
    "node_modules/merge-descriptors": {
      "version": "1.0.1",
      "resolved": "https://registry.npmjs.org/merge-descriptors/-/merge-descriptors-1.0.1.tgz",
      "integrity": "sha512-cCi6g3/Zr1iqQi6ySbseM1Xvooa98N0w31jzUYrXPX2xqObmFGHJ0tQ5u74H3mVh7wLouTseZyYIq39g8cNp1w==",
      "license": "MIT"
    },
    "node_modules/methods": {
      "version": "1.1.2",
      "resolved": "https://registry.npmjs.org/methods/-/methods-1.1.2.tgz",
      "integrity": "sha512-iclAHeNqNm68zFtnZ0e+1L2yUIdvzNoauKU4WBA3VvH/vPFieF7qfRlwUZU+DA9P9bPXIS90ulxoUoCH23sV2w==",
      "license": "MIT",
      "engines": {
        "node": ">= 0.6"
      }
    },
    "node_modules/mime": {
      "version": "1.6.0",
      "resolved": "https://registry.npmjs.org/mime/-/mime-1.6.0.tgz",
      "integrity": "sha512-x0Vn8spI+wuJ1O6S7gnbaQg8Pxh4NNHb7KSINmEWKiPE4RKOplvijn+NkmYmmRgP68mc70j2EbeTFRsrswaQeg==",
      "license": "MIT",
      "bin": {
        "mime": "cli.js"
      },
      "engines": {
        "node": ">=4"
      }
    },
    "node_modules/mime-db": {
      "version": "1.52.0",
      "resolved": "https://registry.npmjs.org/mime-db/-/mime-db-1.52.0.tgz",
      "integrity": "sha512-sPU4uV7dYlvtWJxwwxHD0PuihVNiE7TyAbQ5SWxDCB9mUYvOgroQOwYQQOKPJ8CIbE+1ETVlOoK1UC2nU3gYvg==",
      "license": "MIT",
      "engines": {
        "node": ">= 0.6"
      }
    },
    "node_modules/mime-types": {
      "version": "2.1.35",
      "resolved": "https://registry.npmjs.org/mime-types/-/mime-types-2.1.35.tgz",
      "integrity": "sha512-ZDY+bPm5zTTF+YpCrAU9nK0UgICYPT0QtT1NZWFv4s++TNkcgVaT0g6+4R2uI4MjQjzysHB1zxuWL50hzaeXiw==",
      "license": "MIT",
      "dependencies": {
        "mime-db": "1.52.0"
      },
      "engines": {
        "node": ">= 0.6"
      }
    },
    "node_modules/minimatch": {
      "version": "3.1.5",
      "resolved": "https://registry.npmjs.org/minimatch/-/minimatch-3.1.5.tgz",
      "integrity": "sha512-VgjWUsnnT6n+NUk6eZq77zeFdpW2LWDzP6zFGrCbHXiYNul5Dzqk2HHQ5uFH2DNW5Xbp8+jVzaeNt94ssEEl4w==",
      "dev": true,
      "license": "ISC",
      "dependencies": {
        "brace-expansion": "^1.1.7"
      },
      "engines": {
        "node": "*"
      }
    },
    "node_modules/minimist": {
      "version": "1.2.8",
      "resolved": "https://registry.npmjs.org/minimist/-/minimist-1.2.8.tgz",
      "integrity": "sha512-2yyAR8qBkN3YuheJanUpWC5U3bb5osDywNB8RzDVlDwDHbocAJveqqj1u8+SVD7jkWT4yvsHCpWqqWqAxb0zCA==",
      "dev": true,
      "license": "MIT",
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/mkdirp": {
      "version": "1.0.4",
      "resolved": "https://registry.npmjs.org/mkdirp/-/mkdirp-1.0.4.tgz",
      "integrity": "sha512-vVqVZQyf3WLx2Shd0qJ9xuvqgAyKPLAiqITEtqW0oIUjzo3PePDd6fW9iFz30ef7Ysp/oiWqbhszeGWW2T6Gzw==",
      "dev": true,
      "license": "MIT",
      "bin": {
        "mkdirp": "bin/cmd.js"
      },
      "engines": {
        "node": ">=10"
      }
    },
    "node_modules/mongodb": {
      "version": "7.1.0",
      "resolved": "https://registry.npmjs.org/mongodb/-/mongodb-7.1.0.tgz",
      "integrity": "sha512-kMfnKunbolQYwCIyrkxNJFB4Ypy91pYqua5NargS/f8ODNSJxT03ZU3n1JqL4mCzbSih8tvmMEMLpKTT7x5gCg==",
      "license": "Apache-2.0",
      "peer": true,
      "dependencies": {
        "@mongodb-js/saslprep": "^1.3.0",
        "bson": "^7.1.1",
        "mongodb-connection-string-url": "^7.0.0"
      },
      "engines": {
        "node": ">=20.19.0"
      },
      "peerDependencies": {
        "@aws-sdk/credential-providers": "^3.806.0",
        "@mongodb-js/zstd": "^7.0.0",
        "gcp-metadata": "^7.0.1",
        "kerberos": "^7.0.0",
        "mongodb-client-encryption": ">=7.0.0 <7.1.0",
        "snappy": "^7.3.2",
        "socks": "^2.8.6"
      },
      "peerDependenciesMeta": {
        "@aws-sdk/credential-providers": {
          "optional": true
        },
        "@mongodb-js/zstd": {
          "optional": true
        },
        "gcp-metadata": {
          "optional": true
        },
        "kerberos": {
          "optional": true
        },
        "mongodb-client-encryption": {
          "optional": true
        },
        "snappy": {
          "optional": true
        },
        "socks": {
          "optional": true
        }
      }
    },
    "node_modules/mongodb-connection-string-url": {
      "version": "7.0.1",
      "resolved": "https://registry.npmjs.org/mongodb-connection-string-url/-/mongodb-connection-string-url-7.0.1.tgz",
      "integrity": "sha512-h0AZ9A7IDVwwHyMxmdMXKy+9oNlF0zFoahHiX3vQ8e3KFcSP3VmsmfvtRSuLPxmyv2vjIDxqty8smTgie/SNRQ==",
      "license": "Apache-2.0",
      "peer": true,
      "dependencies": {
        "@types/whatwg-url": "^13.0.0",
        "whatwg-url": "^14.1.0"
      },
      "engines": {
        "node": ">=20.19.0"
      }
    },
    "node_modules/ms": {
      "version": "2.0.0",
      "resolved": "https://registry.npmjs.org/ms/-/ms-2.0.0.tgz",
      "integrity": "sha512-Tpp60P6IUJDTuOq/5Z8cdskzJujfwqfOTkrwIwj7IRISpnkJnT6SyJ4PCPnGMoFjC9ddhal5KVIYtAt97ix05A==",
      "license": "MIT"
    },
    "node_modules/multer": {
      "version": "2.1.1",
      "resolved": "https://registry.npmjs.org/multer/-/multer-2.1.1.tgz",
      "integrity": "sha512-mo+QTzKlx8R7E5ylSXxWzGoXoZbOsRMpyitcht8By2KHvMbf3tjwosZ/Mu/XYU6UuJ3VZnODIrak5ZrPiPyB6A==",
      "license": "MIT",
      "dependencies": {
        "append-field": "^1.0.0",
        "busboy": "^1.6.0",
        "concat-stream": "^2.0.0",
        "type-is": "^1.6.18"
      },
      "engines": {
        "node": ">= 10.16.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/express"
      }
    },
    "node_modules/mysql2": {
      "version": "3.15.3",
      "resolved": "https://registry.npmjs.org/mysql2/-/mysql2-3.15.3.tgz",
      "integrity": "sha512-FBrGau0IXmuqg4haEZRBfHNWB5mUARw6hNwPDXXGg0XzVJ50mr/9hb267lvpVMnhZ1FON3qNd4Xfcez1rbFwSg==",
      "license": "MIT",
      "optional": true,
      "peer": true,
      "dependencies": {
        "aws-ssl-profiles": "^1.1.1",
        "denque": "^2.1.0",
        "generate-function": "^2.3.1",
        "iconv-lite": "^0.7.0",
        "long": "^5.2.1",
        "lru.min": "^1.0.0",
        "named-placeholders": "^1.1.3",
        "seq-queue": "^0.0.5",
        "sqlstring": "^2.3.2"
      },
      "engines": {
        "node": ">= 8.0"
      }
    },
    "node_modules/mysql2/node_modules/iconv-lite": {
      "version": "0.7.2",
      "resolved": "https://registry.npmjs.org/iconv-lite/-/iconv-lite-0.7.2.tgz",
      "integrity": "sha512-im9DjEDQ55s9fL4EYzOAv0yMqmMBSZp6G0VvFyTMPKWxiSBHUj9NW/qqLmXUwXrrM7AvqSlTCfvqRb0cM8yYqw==",
      "license": "MIT",
      "optional": true,
      "peer": true,
      "dependencies": {
        "safer-buffer": ">= 2.1.2 < 3.0.0"
      },
      "engines": {
        "node": ">=0.10.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/express"
      }
    },
    "node_modules/named-placeholders": {
      "version": "1.1.6",
      "resolved": "https://registry.npmjs.org/named-placeholders/-/named-placeholders-1.1.6.tgz",
      "integrity": "sha512-Tz09sEL2EEuv5fFowm419c1+a/jSMiBjI9gHxVLrVdbUkkNUUfjsVYs9pVZu5oCon/kmRh9TfLEObFtkVxmY0w==",
      "license": "MIT",
      "optional": true,
      "peer": true,
      "dependencies": {
        "lru.min": "^1.1.0"
      },
      "engines": {
        "node": ">=8.0.0"
      }
    },
    "node_modules/nanostores": {
      "version": "1.2.0",
      "resolved": "https://registry.npmjs.org/nanostores/-/nanostores-1.2.0.tgz",
      "integrity": "sha512-F0wCzbsH80G7XXo0Jd9/AVQC7ouWY6idUCTnMwW5t/Rv9W8qmO6endavDwg7TNp5GbugwSukFMVZqzPSrSMndg==",
      "funding": [
        {
          "type": "github",
          "url": "https://github.com/sponsors/ai"
        }
      ],
      "license": "MIT",
      "engines": {
        "node": "^20.0.0 || >=22.0.0"
      }
    },
    "node_modules/negotiator": {
      "version": "0.6.3",
      "resolved": "https://registry.npmjs.org/negotiator/-/negotiator-0.6.3.tgz",
      "integrity": "sha512-+EUsqGPLsM+j/zdChZjsnX51g4XrHFOIXwfnCVPGlQk/k5giakcKsuxCObBRu6DSm9opw/O6slWbJdghQM4bBg==",
      "license": "MIT",
      "engines": {
        "node": ">= 0.6"
      }
    },
    "node_modules/node-fetch": {
      "version": "2.6.7",
      "resolved": "https://registry.npmjs.org/node-fetch/-/node-fetch-2.6.7.tgz",
      "integrity": "sha512-ZjMPFEfVx5j+y2yF35Kzx5sF7kDzxuDj6ziH4FFbOp87zKDZNx8yExJIb05OGF4Nlt9IHFIMBkRl41VdvcNdbQ==",
      "license": "MIT",
      "dependencies": {
        "whatwg-url": "^5.0.0"
      },
      "engines": {
        "node": "4.x || >=6.0.0"
      },
      "peerDependencies": {
        "encoding": "^0.1.0"
      },
      "peerDependenciesMeta": {
        "encoding": {
          "optional": true
        }
      }
    },
    "node_modules/node-fetch/node_modules/tr46": {
      "version": "0.0.3",
      "resolved": "https://registry.npmjs.org/tr46/-/tr46-0.0.3.tgz",
      "integrity": "sha512-N3WMsuqV66lT30CrXNbEjx4GEwlow3v6rr4mCcv6prnfwhS01rkgyFdjPNBYd9br7LpXV1+Emh01fHnq2Gdgrw==",
      "license": "MIT"
    },
    "node_modules/node-fetch/node_modules/webidl-conversions": {
      "version": "3.0.1",
      "resolved": "https://registry.npmjs.org/webidl-conversions/-/webidl-conversions-3.0.1.tgz",
      "integrity": "sha512-2JAn3z8AR6rjK8Sm8orRC0h/bcl/DqL7tRPdGZ4I1CjdF+EaMLmYxBHyXuKL849eucPFhvBoxMsflfOb8kxaeQ==",
      "license": "BSD-2-Clause"
    },
    "node_modules/node-fetch/node_modules/whatwg-url": {
      "version": "5.0.0",
      "resolved": "https://registry.npmjs.org/whatwg-url/-/whatwg-url-5.0.0.tgz",
      "integrity": "sha512-saE57nupxk6v3HY35+jzBwYa0rKSy0XR8JSxZPwgLr7ys0IBzhGviA1/TUGJLmSVqs8pb9AnvICXEuOHLprYTw==",
      "license": "MIT",
      "dependencies": {
        "tr46": "~0.0.3",
        "webidl-conversions": "^3.0.0"
      }
    },
    "node_modules/normalize-path": {
      "version": "3.0.0",
      "resolved": "https://registry.npmjs.org/normalize-path/-/normalize-path-3.0.0.tgz",
      "integrity": "sha512-6eZs5Ls3WtCisHWp9S2GUy8dqkpGi4BVSz3GaqiE6ezub0512ESztXUwUB6C6IKbQkY2Pnb/mD4WYojCRwcwLA==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=0.10.0"
      }
    },
    "node_modules/object-assign": {
      "version": "4.1.1",
      "resolved": "https://registry.npmjs.org/object-assign/-/object-assign-4.1.1.tgz",
      "integrity": "sha512-rJgTQnkUnH1sFw8yT6VSU3zD3sWmu6sZhIseY8VX+GRu3P6F7Fu+JNDoXfklElbLJSnc3FUQHVe4cU5hj+BcUg==",
      "license": "MIT",
      "engines": {
        "node": ">=0.10.0"
      }
    },
    "node_modules/object-inspect": {
      "version": "1.13.4",
      "resolved": "https://registry.npmjs.org/object-inspect/-/object-inspect-1.13.4.tgz",
      "integrity": "sha512-W67iLl4J2EXEGTbfeHCffrjDfitvLANg0UlX3wFUUSTx92KXRFegMHUVgSqE+wvhAbi4WqjGg9czysTV2Epbew==",
      "license": "MIT",
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/on-finished": {
      "version": "2.4.1",
      "resolved": "https://registry.npmjs.org/on-finished/-/on-finished-2.4.1.tgz",
      "integrity": "sha512-oVlzkg3ENAhCk2zdv7IJwd/QUD4z2RxRwpkcGY8psCVcCYZNq4wYnVWALHM+brtuJjePWiYF/ClmuDr8Ch5+kg==",
      "license": "MIT",
      "dependencies": {
        "ee-first": "1.1.1"
      },
      "engines": {
        "node": ">= 0.8"
      }
    },
    "node_modules/once": {
      "version": "1.4.0",
      "resolved": "https://registry.npmjs.org/once/-/once-1.4.0.tgz",
      "integrity": "sha512-lNaJgI+2Q5URQBkccEKHTQOPaXdUxnZZElQTZY0MFUAuaEqe1E+Nyvgdz/aIyNi6Z9MzO5dv1H8n58/GELp3+w==",
      "dev": true,
      "license": "ISC",
      "dependencies": {
        "wrappy": "1"
      }
    },
    "node_modules/parseurl": {
      "version": "1.3.3",
      "resolved": "https://registry.npmjs.org/parseurl/-/parseurl-1.3.3.tgz",
      "integrity": "sha512-CiyeOxFT/JZyN5m0z9PfXw4SCBJ6Sygz1Dpl0wqjlhDEGGBP1GnsUVEL0p63hoG1fcj3fHynXi9NYO4nWOL+qQ==",
      "license": "MIT",
      "engines": {
        "node": ">= 0.8"
      }
    },
    "node_modules/path-is-absolute": {
      "version": "1.0.1",
      "resolved": "https://registry.npmjs.org/path-is-absolute/-/path-is-absolute-1.0.1.tgz",
      "integrity": "sha512-AVbw3UJ2e9bq64vSaS9Am0fje1Pa8pbGqTTsmXfaIiMpnr5DlDhfJOuLj9Sf95ZPVDAUerDfEk88MPmPe7UCQg==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=0.10.0"
      }
    },
    "node_modules/path-parse": {
      "version": "1.0.7",
      "resolved": "https://registry.npmjs.org/path-parse/-/path-parse-1.0.7.tgz",
      "integrity": "sha512-LDJzPVEEEPR+y48z93A0Ed0yXb8pAByGWo/k5YYdYgpY2/2EsOsksJrq7lOHxryrVOn1ejG6oAp8ahvOIQD8sw==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/path-to-regexp": {
      "version": "0.1.7",
      "resolved": "https://registry.npmjs.org/path-to-regexp/-/path-to-regexp-0.1.7.tgz",
      "integrity": "sha512-5DFkuoqlv1uYQKxy8omFBeJPQcdoE07Kv2sferDCrAq1ohOU+MSDswDIbnx3YAM60qIOnYa53wBhXW0EbMonrQ==",
      "license": "MIT"
    },
    "node_modules/pg": {
      "version": "8.20.0",
      "resolved": "https://registry.npmjs.org/pg/-/pg-8.20.0.tgz",
      "integrity": "sha512-ldhMxz2r8fl/6QkXnBD3CR9/xg694oT6DZQ2s6c/RI28OjtSOpxnPrUCGOBJ46RCUxcWdx3p6kw/xnDHjKvaRA==",
      "license": "MIT",
      "dependencies": {
        "pg-connection-string": "^2.12.0",
        "pg-pool": "^3.13.0",
        "pg-protocol": "^1.13.0",
        "pg-types": "2.2.0",
        "pgpass": "1.0.5"
      },
      "engines": {
        "node": ">= 16.0.0"
      },
      "optionalDependencies": {
        "pg-cloudflare": "^1.3.0"
      },
      "peerDependencies": {
        "pg-native": ">=3.0.1"
      },
      "peerDependenciesMeta": {
        "pg-native": {
          "optional": true
        }
      }
    },
    "node_modules/pg-cloudflare": {
      "version": "1.3.0",
      "resolved": "https://registry.npmjs.org/pg-cloudflare/-/pg-cloudflare-1.3.0.tgz",
      "integrity": "sha512-6lswVVSztmHiRtD6I8hw4qP/nDm1EJbKMRhf3HCYaqud7frGysPv7FYJ5noZQdhQtN2xJnimfMtvQq21pdbzyQ==",
      "license": "MIT",
      "optional": true
    },
    "node_modules/pg-connection-string": {
      "version": "2.12.0",
      "resolved": "https://registry.npmjs.org/pg-connection-string/-/pg-connection-string-2.12.0.tgz",
      "integrity": "sha512-U7qg+bpswf3Cs5xLzRqbXbQl85ng0mfSV/J0nnA31MCLgvEaAo7CIhmeyrmJpOr7o+zm0rXK+hNnT5l9RHkCkQ==",
      "license": "MIT"
    },
    "node_modules/pg-int8": {
      "version": "1.0.1",
      "resolved": "https://registry.npmjs.org/pg-int8/-/pg-int8-1.0.1.tgz",
      "integrity": "sha512-WCtabS6t3c8SkpDBUlb1kjOs7l66xsGdKpIPZsg4wR+B3+u9UAum2odSsF9tnvxg80h4ZxLWMy4pRjOsFIqQpw==",
      "license": "ISC",
      "engines": {
        "node": ">=4.0.0"
      }
    },
    "node_modules/pg-pool": {
      "version": "3.13.0",
      "resolved": "https://registry.npmjs.org/pg-pool/-/pg-pool-3.13.0.tgz",
      "integrity": "sha512-gB+R+Xud1gLFuRD/QgOIgGOBE2KCQPaPwkzBBGC9oG69pHTkhQeIuejVIk3/cnDyX39av2AxomQiyPT13WKHQA==",
      "license": "MIT",
      "peerDependencies": {
        "pg": ">=8.0"
      }
    },
    "node_modules/pg-protocol": {
      "version": "1.13.0",
      "resolved": "https://registry.npmjs.org/pg-protocol/-/pg-protocol-1.13.0.tgz",
      "integrity": "sha512-zzdvXfS6v89r6v7OcFCHfHlyG/wvry1ALxZo4LqgUoy7W9xhBDMaqOuMiF3qEV45VqsN6rdlcehHrfDtlCPc8w==",
      "license": "MIT"
    },
    "node_modules/pg-types": {
      "version": "2.2.0",
      "resolved": "https://registry.npmjs.org/pg-types/-/pg-types-2.2.0.tgz",
      "integrity": "sha512-qTAAlrEsl8s4OiEQY69wDvcMIdQN6wdz5ojQiOy6YRMuynxenON0O5oCpJI6lshc6scgAY8qvJ2On/p+CXY0GA==",
      "license": "MIT",
      "dependencies": {
        "pg-int8": "1.0.1",
        "postgres-array": "~2.0.0",
        "postgres-bytea": "~1.0.0",
        "postgres-date": "~1.0.4",
        "postgres-interval": "^1.1.0"
      },
      "engines": {
        "node": ">=4"
      }
    },
    "node_modules/pgpass": {
      "version": "1.0.5",
      "resolved": "https://registry.npmjs.org/pgpass/-/pgpass-1.0.5.tgz",
      "integrity": "sha512-FdW9r/jQZhSeohs1Z3sI1yxFQNFvMcnmfuj4WBMUTxOrAyLMaTcE1aAMBiTlbMNaXvBCQuVi0R7hd8udDSP7ug==",
      "license": "MIT",
      "dependencies": {
        "split2": "^4.1.0"
      }
    },
    "node_modules/picomatch": {
      "version": "2.3.1",
      "resolved": "https://registry.npmjs.org/picomatch/-/picomatch-2.3.1.tgz",
      "integrity": "sha512-JU3teHTNjmE2VCGFzuY8EXzCDVwEqB2a8fsIvwaStHhAWJEeVd1o1QD80CU6+ZdEXXSLbSsuLwJjkCBWqRQUVA==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=8.6"
      },
      "funding": {
        "url": "https://github.com/sponsors/jonschlinkert"
      }
    },
    "node_modules/postgres-array": {
      "version": "2.0.0",
      "resolved": "https://registry.npmjs.org/postgres-array/-/postgres-array-2.0.0.tgz",
      "integrity": "sha512-VpZrUqU5A69eQyW2c5CA1jtLecCsN2U/bD6VilrFDWq5+5UIEVO7nazS3TEcHf1zuPYO/sqGvUvW62g86RXZuA==",
      "license": "MIT",
      "engines": {
        "node": ">=4"
      }
    },
    "node_modules/postgres-bytea": {
      "version": "1.0.1",
      "resolved": "https://registry.npmjs.org/postgres-bytea/-/postgres-bytea-1.0.1.tgz",
      "integrity": "sha512-5+5HqXnsZPE65IJZSMkZtURARZelel2oXUEO8rH83VS/hxH5vv1uHquPg5wZs8yMAfdv971IU+kcPUczi7NVBQ==",
      "license": "MIT",
      "engines": {
        "node": ">=0.10.0"
      }
    },
    "node_modules/postgres-date": {
      "version": "1.0.7",
      "resolved": "https://registry.npmjs.org/postgres-date/-/postgres-date-1.0.7.tgz",
      "integrity": "sha512-suDmjLVQg78nMK2UZ454hAG+OAW+HQPZ6n++TNDUX+L0+uUlLywnoxJKDou51Zm+zTCjrCl0Nq6J9C5hP9vK/Q==",
      "license": "MIT",
      "engines": {
        "node": ">=0.10.0"
      }
    },
    "node_modules/postgres-interval": {
      "version": "1.2.0",
      "resolved": "https://registry.npmjs.org/postgres-interval/-/postgres-interval-1.2.0.tgz",
      "integrity": "sha512-9ZhXKM/rw350N1ovuWHbGxnGh/SNJ4cnxHiM0rxE4VN41wsg8P8zWn9hv/buK00RP4WvlOyr/RBDiptyxVbkZQ==",
      "license": "MIT",
      "dependencies": {
        "xtend": "^4.0.0"
      },
      "engines": {
        "node": ">=0.10.0"
      }
    },
    "node_modules/prisma": {
      "version": "5.9.1",
      "resolved": "https://registry.npmjs.org/prisma/-/prisma-5.9.1.tgz",
      "integrity": "sha512-Hy/8KJZz0ELtkw4FnG9MS9rNWlXcJhf98Z2QMqi0QiVMoS8PzsBkpla0/Y5hTlob8F3HeECYphBjqmBxrluUrQ==",
      "hasInstallScript": true,
      "license": "Apache-2.0",
      "dependencies": {
        "@prisma/engines": "5.9.1"
      },
      "bin": {
        "prisma": "build/index.js"
      },
      "engines": {
        "node": ">=16.13"
      }
    },
    "node_modules/proxy-addr": {
      "version": "2.0.7",
      "resolved": "https://registry.npmjs.org/proxy-addr/-/proxy-addr-2.0.7.tgz",
      "integrity": "sha512-llQsMLSUDUPT44jdrU/O37qlnifitDP+ZwrmmZcoSKyLKvtZxpyV0n2/bD/N4tBAAZ/gJEdZU7KMraoK1+XYAg==",
      "license": "MIT",
      "dependencies": {
        "forwarded": "0.2.0",
        "ipaddr.js": "1.9.1"
      },
      "engines": {
        "node": ">= 0.10"
      }
    },
    "node_modules/punycode": {
      "version": "2.3.1",
      "resolved": "https://registry.npmjs.org/punycode/-/punycode-2.3.1.tgz",
      "integrity": "sha512-vYt7UD1U9Wg6138shLtLOvdAu+8DsC/ilFtEVHcH+wydcSpNE20AfSOduf6MkRFahL5FY7X1oU7nKVZFtfq8Fg==",
      "license": "MIT",
      "peer": true,
      "engines": {
        "node": ">=6"
      }
    },
    "node_modules/qs": {
      "version": "6.11.0",
      "resolved": "https://registry.npmjs.org/qs/-/qs-6.11.0.tgz",
      "integrity": "sha512-MvjoMCJwEarSbUYk5O+nmoSzSutSsTwF85zcHPQ9OrlFoZOYIjaqBAJIqIXjptyD5vThxGq52Xu/MaJzRkIk4Q==",
      "license": "BSD-3-Clause",
      "dependencies": {
        "side-channel": "^1.0.4"
      },
      "engines": {
        "node": ">=0.6"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/quick-lru": {
      "version": "6.1.2",
      "resolved": "https://registry.npmjs.org/quick-lru/-/quick-lru-6.1.2.tgz",
      "integrity": "sha512-AAFUA5O1d83pIHEhJwWCq/RQcRukCkn/NSm2QsTEMle5f2hP0ChI2+3Xb051PZCkLryI/Ir1MVKviT2FIloaTQ==",
      "license": "MIT",
      "engines": {
        "node": ">=12"
      },
      "funding": {
        "url": "https://github.com/sponsors/sindresorhus"
      }
    },
    "node_modules/range-parser": {
      "version": "1.2.1",
      "resolved": "https://registry.npmjs.org/range-parser/-/range-parser-1.2.1.tgz",
      "integrity": "sha512-Hrgsx+orqoygnmhFbKaHE6c296J+HTAQXoxEF6gNupROmmGJRoyzfG3ccAveqCBrwr/2yxQ5BVd/GTl5agOwSg==",
      "license": "MIT",
      "engines": {
        "node": ">= 0.6"
      }
    },
    "node_modules/raw-body": {
      "version": "2.5.2",
      "resolved": "https://registry.npmjs.org/raw-body/-/raw-body-2.5.2.tgz",
      "integrity": "sha512-8zGqypfENjCIqGhgXToC8aB2r7YrBX+AQAfIPs/Mlk+BtPTztOvTS01NRW/3Eh60J+a48lt8qsCzirQ6loCVfA==",
      "license": "MIT",
      "dependencies": {
        "bytes": "3.1.2",
        "http-errors": "2.0.0",
        "iconv-lite": "0.4.24",
        "unpipe": "1.0.0"
      },
      "engines": {
        "node": ">= 0.8"
      }
    },
    "node_modules/react": {
      "version": "19.2.4",
      "resolved": "https://registry.npmjs.org/react/-/react-19.2.4.tgz",
      "integrity": "sha512-9nfp2hYpCwOjAN+8TZFGhtWEwgvWHXqESH8qT89AT/lWklpLON22Lc8pEtnpsZz7VmawabSU0gCjnj8aC0euHQ==",
      "license": "MIT",
      "optional": true,
      "peer": true,
      "engines": {
        "node": ">=0.10.0"
      }
    },
    "node_modules/react-dom": {
      "version": "19.2.4",
      "resolved": "https://registry.npmjs.org/react-dom/-/react-dom-19.2.4.tgz",
      "integrity": "sha512-AXJdLo8kgMbimY95O2aKQqsz2iWi9jMgKJhRBAxECE4IFxfcazB2LmzloIoibJI3C12IlY20+KFaLv+71bUJeQ==",
      "license": "MIT",
      "optional": true,
      "peer": true,
      "dependencies": {
        "scheduler": "^0.27.0"
      },
      "peerDependencies": {
        "react": "^19.2.4"
      }
    },
    "node_modules/readable-stream": {
      "version": "3.6.2",
      "resolved": "https://registry.npmjs.org/readable-stream/-/readable-stream-3.6.2.tgz",
      "integrity": "sha512-9u/sniCrY3D5WdsERHzHE4G2YCXqoG5FTHUiCC4SIbr6XcLZBY05ya9EKjYek9O5xOAwjGq+1JdGBAS7Q9ScoA==",
      "license": "MIT",
      "dependencies": {
        "inherits": "^2.0.3",
        "string_decoder": "^1.1.1",
        "util-deprecate": "^1.0.1"
      },
      "engines": {
        "node": ">= 6"
      }
    },
    "node_modules/readdirp": {
      "version": "3.6.0",
      "resolved": "https://registry.npmjs.org/readdirp/-/readdirp-3.6.0.tgz",
      "integrity": "sha512-hOS089on8RduqdbhvQ5Z37A0ESjsqz6qnRcffsMU3495FuTdqSm+7bhJ29JvIOsBDEEnan5DPu9t3To9VRlMzA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "picomatch": "^2.2.1"
      },
      "engines": {
        "node": ">=8.10.0"
      }
    },
    "node_modules/resolve": {
      "version": "1.22.11",
      "resolved": "https://registry.npmjs.org/resolve/-/resolve-1.22.11.tgz",
      "integrity": "sha512-RfqAvLnMl313r7c9oclB1HhUEAezcpLjz95wFH4LVuhk9JF/r22qmVP9AMmOU4vMX7Q8pN8jwNg/CSpdFnMjTQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "is-core-module": "^2.16.1",
        "path-parse": "^1.0.7",
        "supports-preserve-symlinks-flag": "^1.0.0"
      },
      "bin": {
        "resolve": "bin/resolve"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/rimraf": {
      "version": "2.7.1",
      "resolved": "https://registry.npmjs.org/rimraf/-/rimraf-2.7.1.tgz",
      "integrity": "sha512-uWjbaKIK3T1OSVptzX7Nl6PvQ3qAGtKEtVRjRuazjfL3Bx5eI409VZSqgND+4UNnmzLVdPj9FqFJNPqBZFve4w==",
      "deprecated": "Rimraf versions prior to v4 are no longer supported",
      "dev": true,
      "license": "ISC",
      "dependencies": {
        "glob": "^7.1.3"
      },
      "bin": {
        "rimraf": "bin.js"
      }
    },
    "node_modules/rou3": {
      "version": "0.7.12",
      "resolved": "https://registry.npmjs.org/rou3/-/rou3-0.7.12.tgz",
      "integrity": "sha512-iFE4hLDuloSWcD7mjdCDhx2bKcIsYbtOTpfH5MHHLSKMOUyjqQXTeZVa289uuwEGEKFoE/BAPbhaU4B774nceg==",
      "license": "MIT"
    },
    "node_modules/safe-buffer": {
      "version": "5.2.1",
      "resolved": "https://registry.npmjs.org/safe-buffer/-/safe-buffer-5.2.1.tgz",
      "integrity": "sha512-rp3So07KcdmmKbGvgaNxQSJr7bGVSVk5S9Eq1F+ppbRo70+YeaDxkw5Dd8NPN+GD6bjnYm2VuPuCXmpuYvmCXQ==",
      "funding": [
        {
          "type": "github",
          "url": "https://github.com/sponsors/feross"
        },
        {
          "type": "patreon",
          "url": "https://www.patreon.com/feross"
        },
        {
          "type": "consulting",
          "url": "https://feross.org/support"
        }
      ],
      "license": "MIT"
    },
    "node_modules/safer-buffer": {
      "version": "2.1.2",
      "resolved": "https://registry.npmjs.org/safer-buffer/-/safer-buffer-2.1.2.tgz",
      "integrity": "sha512-YZo3K82SD7Riyi0E1EQPojLz7kpepnSQI9IyPbHHg1XXXevb5dJI7tpyN2ADxGcQbHG7vcyRHk0cbwqcQriUtg==",
      "license": "MIT"
    },
    "node_modules/scheduler": {
      "version": "0.27.0",
      "resolved": "https://registry.npmjs.org/scheduler/-/scheduler-0.27.0.tgz",
      "integrity": "sha512-eNv+WrVbKu1f3vbYJT/xtiF5syA5HPIMtf9IgY/nKg0sWqzAUEvqY/xm7OcZc/qafLx/iO9FgOmeSAp4v5ti/Q==",
      "license": "MIT",
      "optional": true,
      "peer": true
    },
    "node_modules/send": {
      "version": "0.18.0",
      "resolved": "https://registry.npmjs.org/send/-/send-0.18.0.tgz",
      "integrity": "sha512-qqWzuOjSFOuqPjFe4NOsMLafToQQwBSOEpS+FwEt3A2V3vKubTquT3vmLTQpFgMXp8AlFWFuP1qKaJZOtPpVXg==",
      "license": "MIT",
      "dependencies": {
        "debug": "2.6.9",
        "depd": "2.0.0",
        "destroy": "1.2.0",
        "encodeurl": "~1.0.2",
        "escape-html": "~1.0.3",
        "etag": "~1.8.1",
        "fresh": "0.5.2",
        "http-errors": "2.0.0",
        "mime": "1.6.0",
        "ms": "2.1.3",
        "on-finished": "2.4.1",
        "range-parser": "~1.2.1",
        "statuses": "2.0.1"
      },
      "engines": {
        "node": ">= 0.8.0"
      }
    },
    "node_modules/send/node_modules/ms": {
      "version": "2.1.3",
      "resolved": "https://registry.npmjs.org/ms/-/ms-2.1.3.tgz",
      "integrity": "sha512-6FlzubTLZG3J2a/NVCAleEhjzq5oxgHyaCU9yYXvcLsvoVaHJq/s5xXI6/XXP6tz7R9xAOtHnSO/tXtF3WRTlA==",
      "license": "MIT"
    },
    "node_modules/seq-queue": {
      "version": "0.0.5",
      "resolved": "https://registry.npmjs.org/seq-queue/-/seq-queue-0.0.5.tgz",
      "integrity": "sha512-hr3Wtp/GZIc/6DAGPDcV4/9WoZhjrkXsi5B/07QgX8tsdc6ilr7BFM6PM6rbdAX1kFSDYeZGLipIZZKyQP0O5Q==",
      "optional": true,
      "peer": true
    },
    "node_modules/serve-static": {
      "version": "1.15.0",
      "resolved": "https://registry.npmjs.org/serve-static/-/serve-static-1.15.0.tgz",
      "integrity": "sha512-XGuRDNjXUijsUL0vl6nSD7cwURuzEgglbOaFuZM9g3kwDXOWVTck0jLzjPzGD+TazWbboZYu52/9/XPdUgne9g==",
      "license": "MIT",
      "dependencies": {
        "encodeurl": "~1.0.2",
        "escape-html": "~1.0.3",
        "parseurl": "~1.3.3",
        "send": "0.18.0"
      },
      "engines": {
        "node": ">= 0.8.0"
      }
    },
    "node_modules/set-cookie-parser": {
      "version": "3.0.1",
      "resolved": "https://registry.npmjs.org/set-cookie-parser/-/set-cookie-parser-3.0.1.tgz",
      "integrity": "sha512-n7Z7dXZhJbwuAHhNzkTti6Aw9QDDjZtm3JTpTGATIdNzdQz5GuFs22w90BcvF4INfnrL5xrX3oGsuqO5Dx3A1Q==",
      "license": "MIT"
    },
    "node_modules/setprototypeof": {
      "version": "1.2.0",
      "resolved": "https://registry.npmjs.org/setprototypeof/-/setprototypeof-1.2.0.tgz",
      "integrity": "sha512-E5LDX7Wrp85Kil5bhZv46j8jOeboKq5JMmYM3gVGdGH8xFpPWXUMsNrlODCrkoxMEeNi/XZIwuRvY4XNwYMJpw==",
      "license": "ISC"
    },
    "node_modules/side-channel": {
      "version": "1.1.0",
      "resolved": "https://registry.npmjs.org/side-channel/-/side-channel-1.1.0.tgz",
      "integrity": "sha512-ZX99e6tRweoUXqR+VBrslhda51Nh5MTQwou5tnUDgbtyM0dBgmhEDtWGP/xbKn6hqfPRHujUNwz5fy/wbbhnpw==",
      "license": "MIT",
      "dependencies": {
        "es-errors": "^1.3.0",
        "object-inspect": "^1.13.3",
        "side-channel-list": "^1.0.0",
        "side-channel-map": "^1.0.1",
        "side-channel-weakmap": "^1.0.2"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/side-channel-list": {
      "version": "1.0.0",
      "resolved": "https://registry.npmjs.org/side-channel-list/-/side-channel-list-1.0.0.tgz",
      "integrity": "sha512-FCLHtRD/gnpCiCHEiJLOwdmFP+wzCmDEkc9y7NsYxeF4u7Btsn1ZuwgwJGxImImHicJArLP4R0yX4c2KCrMrTA==",
      "license": "MIT",
      "dependencies": {
        "es-errors": "^1.3.0",
        "object-inspect": "^1.13.3"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/side-channel-map": {
      "version": "1.0.1",
      "resolved": "https://registry.npmjs.org/side-channel-map/-/side-channel-map-1.0.1.tgz",
      "integrity": "sha512-VCjCNfgMsby3tTdo02nbjtM/ewra6jPHmpThenkTYh8pG9ucZ/1P8So4u4FGBek/BjpOVsDCMoLA/iuBKIFXRA==",
      "license": "MIT",
      "dependencies": {
        "call-bound": "^1.0.2",
        "es-errors": "^1.3.0",
        "get-intrinsic": "^1.2.5",
        "object-inspect": "^1.13.3"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/side-channel-weakmap": {
      "version": "1.0.2",
      "resolved": "https://registry.npmjs.org/side-channel-weakmap/-/side-channel-weakmap-1.0.2.tgz",
      "integrity": "sha512-WPS/HvHQTYnHisLo9McqBHOJk2FkHO/tlpvldyrnem4aeQp4hai3gythswg6p01oSoTl58rcpiFAjF2br2Ak2A==",
      "license": "MIT",
      "dependencies": {
        "call-bound": "^1.0.2",
        "es-errors": "^1.3.0",
        "get-intrinsic": "^1.2.5",
        "object-inspect": "^1.13.3",
        "side-channel-map": "^1.0.1"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/source-map": {
      "version": "0.6.1",
      "resolved": "https://registry.npmjs.org/source-map/-/source-map-0.6.1.tgz",
      "integrity": "sha512-UjgapumWlbMhkBgzT7Ykc5YXUT46F0iKu8SGXq0bcwP5dz/h0Plj6enJqjz1Zbq2l5WaqYnrVbwWOWMyF3F47g==",
      "dev": true,
      "license": "BSD-3-Clause",
      "engines": {
        "node": ">=0.10.0"
      }
    },
    "node_modules/source-map-support": {
      "version": "0.5.21",
      "resolved": "https://registry.npmjs.org/source-map-support/-/source-map-support-0.5.21.tgz",
      "integrity": "sha512-uBHU3L3czsIyYXKX88fdrGovxdSCoTGDRZ6SYXtSRxLZUzHg5P/66Ht6uoUlHu9EZod+inXhKo3qQgwXUT/y1w==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "buffer-from": "^1.0.0",
        "source-map": "^0.6.0"
      }
    },
    "node_modules/sparse-bitfield": {
      "version": "3.0.3",
      "resolved": "https://registry.npmjs.org/sparse-bitfield/-/sparse-bitfield-3.0.3.tgz",
      "integrity": "sha512-kvzhi7vqKTfkh0PZU+2D2PIllw2ymqJKujUcyPMd9Y75Nv4nPbGJZXNhxsgdQab2BmlDct1YnfQCguEvHr7VsQ==",
      "license": "MIT",
      "peer": true,
      "dependencies": {
        "memory-pager": "^1.0.2"
      }
    },
    "node_modules/split2": {
      "version": "4.2.0",
      "resolved": "https://registry.npmjs.org/split2/-/split2-4.2.0.tgz",
      "integrity": "sha512-UcjcJOWknrNkF6PLX83qcHM6KHgVKNkV62Y8a5uYDVv9ydGQVwAHMKqHdJje1VTWpljG0WYpCDhrCdAOYH4TWg==",
      "license": "ISC",
      "engines": {
        "node": ">= 10.x"
      }
    },
    "node_modules/sqlstring": {
      "version": "2.3.3",
      "resolved": "https://registry.npmjs.org/sqlstring/-/sqlstring-2.3.3.tgz",
      "integrity": "sha512-qC9iz2FlN7DQl3+wjwn3802RTyjCx7sDvfQEXchwa6CWOx07/WVfh91gBmQ9fahw8snwGEWU3xGzOt4tFyHLxg==",
      "license": "MIT",
      "optional": true,
      "peer": true,
      "engines": {
        "node": ">= 0.6"
      }
    },
    "node_modules/sslcommerz-lts": {
      "version": "1.2.0",
      "resolved": "https://registry.npmjs.org/sslcommerz-lts/-/sslcommerz-lts-1.2.0.tgz",
      "integrity": "sha512-OajULbnHHxzBvFfAqQKz4NMKkmyVBbVEKHbfstsR7wckYh0YfoQhZriHprcr0aQYSUqyOA/mc5g66KcW4/idJQ==",
      "license": "ISC",
      "dependencies": {
        "form-data": "2.5.5",
        "node-fetch": "2.6.7"
      }
    },
    "node_modules/statuses": {
      "version": "2.0.1",
      "resolved": "https://registry.npmjs.org/statuses/-/statuses-2.0.1.tgz",
      "integrity": "sha512-RwNA9Z/7PrK06rYLIzFMlaF+l73iwpzsqRIFgbMLbTcLD6cOao82TaWefPXQvB2fOC4AjuYSEndS7N/mTCbkdQ==",
      "license": "MIT",
      "engines": {
        "node": ">= 0.8"
      }
    },
    "node_modules/streamsearch": {
      "version": "1.1.0",
      "resolved": "https://registry.npmjs.org/streamsearch/-/streamsearch-1.1.0.tgz",
      "integrity": "sha512-Mcc5wHehp9aXz1ax6bZUyY5afg9u2rv5cqQI3mRrYkGC8rW2hM02jWuwjtL++LS5qinSyhj2QfLyNsuc+VsExg==",
      "engines": {
        "node": ">=10.0.0"
      }
    },
    "node_modules/string_decoder": {
      "version": "1.3.0",
      "resolved": "https://registry.npmjs.org/string_decoder/-/string_decoder-1.3.0.tgz",
      "integrity": "sha512-hkRX8U1WjJFd8LsDJ2yQ/wWWxaopEsABU1XfkM8A+j0+85JAGppt16cr1Whg6KIbb4okU6Mql6BOj+uup/wKeA==",
      "license": "MIT",
      "dependencies": {
        "safe-buffer": "~5.2.0"
      }
    },
    "node_modules/strip-bom": {
      "version": "3.0.0",
      "resolved": "https://registry.npmjs.org/strip-bom/-/strip-bom-3.0.0.tgz",
      "integrity": "sha512-vavAMRXOgBVNF6nyEEmL3DBK19iRpDcoIwW+swQ+CbGiu7lju6t+JklA1MHweoWtadgt4ISVUsXLyDq34ddcwA==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=4"
      }
    },
    "node_modules/strip-json-comments": {
      "version": "2.0.1",
      "resolved": "https://registry.npmjs.org/strip-json-comments/-/strip-json-comments-2.0.1.tgz",
      "integrity": "sha512-4gB8na07fecVVkOI6Rs4e7T6NOTki5EmL7TUduTs6bu3EdnSycntVJ4re8kgZA+wx9IueI2Y11bfbgwtzuE0KQ==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=0.10.0"
      }
    },
    "node_modules/supports-preserve-symlinks-flag": {
      "version": "1.0.0",
      "resolved": "https://registry.npmjs.org/supports-preserve-symlinks-flag/-/supports-preserve-symlinks-flag-1.0.0.tgz",
      "integrity": "sha512-ot0WnXS9fgdkgIcePe6RHNk1WA8+muPa6cSjeR3V8K27q9BB1rTE3R1p7Hv0z1ZyAc8s6Vvv8DIyWf681MAt0w==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/to-regex-range": {
      "version": "5.0.1",
      "resolved": "https://registry.npmjs.org/to-regex-range/-/to-regex-range-5.0.1.tgz",
      "integrity": "sha512-65P7iz6X5yEr1cwcgvQxbbIw7Uk3gOy5dIdtZ4rDveLqhrdJP+Li/Hx6tyK0NEb+2GCyneCMJiGqrADCSNk8sQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "is-number": "^7.0.0"
      },
      "engines": {
        "node": ">=8.0"
      }
    },
    "node_modules/toidentifier": {
      "version": "1.0.1",
      "resolved": "https://registry.npmjs.org/toidentifier/-/toidentifier-1.0.1.tgz",
      "integrity": "sha512-o5sSPKEkg/DIQNmH43V0/uerLrpzVedkUh8tGNvaeXpfpuwjKenlSox/2O/BTlZUtEe+JG7s5YhEz608PlAHRA==",
      "license": "MIT",
      "engines": {
        "node": ">=0.6"
      }
    },
    "node_modules/tr46": {
      "version": "5.1.1",
      "resolved": "https://registry.npmjs.org/tr46/-/tr46-5.1.1.tgz",
      "integrity": "sha512-hdF5ZgjTqgAntKkklYw0R03MG2x/bSzTtkxmIRw/sTNV8YXsCJ1tfLAX23lhxhHJlEf3CRCOCGGWw3vI3GaSPw==",
      "license": "MIT",
      "peer": true,
      "dependencies": {
        "punycode": "^2.3.1"
      },
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/tree-kill": {
      "version": "1.2.2",
      "resolved": "https://registry.npmjs.org/tree-kill/-/tree-kill-1.2.2.tgz",
      "integrity": "sha512-L0Orpi8qGpRG//Nd+H90vFB+3iHnue1zSSGmNOOCh1GLJ7rUKVwV2HvijphGQS2UmhUZewS9VgvxYIdgr+fG1A==",
      "dev": true,
      "license": "MIT",
      "bin": {
        "tree-kill": "cli.js"
      }
    },
    "node_modules/ts-node": {
      "version": "10.9.2",
      "resolved": "https://registry.npmjs.org/ts-node/-/ts-node-10.9.2.tgz",
      "integrity": "sha512-f0FFpIdcHgn8zcPSbf1dRevwt047YMnaiJM3u2w2RewrB+fob/zePZcrOyQoLMMO7aBIddLcQIEK5dYjkLnGrQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@cspotcode/source-map-support": "^0.8.0",
        "@tsconfig/node10": "^1.0.7",
        "@tsconfig/node12": "^1.0.7",
        "@tsconfig/node14": "^1.0.0",
        "@tsconfig/node16": "^1.0.2",
        "acorn": "^8.4.1",
        "acorn-walk": "^8.1.1",
        "arg": "^4.1.0",
        "create-require": "^1.1.0",
        "diff": "^4.0.1",
        "make-error": "^1.1.1",
        "v8-compile-cache-lib": "^3.0.1",
        "yn": "3.1.1"
      },
      "bin": {
        "ts-node": "dist/bin.js",
        "ts-node-cwd": "dist/bin-cwd.js",
        "ts-node-esm": "dist/bin-esm.js",
        "ts-node-script": "dist/bin-script.js",
        "ts-node-transpile-only": "dist/bin-transpile.js",
        "ts-script": "dist/bin-script-deprecated.js"
      },
      "peerDependencies": {
        "@swc/core": ">=1.2.50",
        "@swc/wasm": ">=1.2.50",
        "@types/node": "*",
        "typescript": ">=2.7"
      },
      "peerDependenciesMeta": {
        "@swc/core": {
          "optional": true
        },
        "@swc/wasm": {
          "optional": true
        }
      }
    },
    "node_modules/ts-node-dev": {
      "version": "2.0.0",
      "resolved": "https://registry.npmjs.org/ts-node-dev/-/ts-node-dev-2.0.0.tgz",
      "integrity": "sha512-ywMrhCfH6M75yftYvrvNarLEY+SUXtUvU8/0Z6llrHQVBx12GiFk5sStF8UdfE/yfzk9IAq7O5EEbTQsxlBI8w==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "chokidar": "^3.5.1",
        "dynamic-dedupe": "^0.3.0",
        "minimist": "^1.2.6",
        "mkdirp": "^1.0.4",
        "resolve": "^1.0.0",
        "rimraf": "^2.6.1",
        "source-map-support": "^0.5.12",
        "tree-kill": "^1.2.2",
        "ts-node": "^10.4.0",
        "tsconfig": "^7.0.0"
      },
      "bin": {
        "ts-node-dev": "lib/bin.js",
        "tsnd": "lib/bin.js"
      },
      "engines": {
        "node": ">=0.8.0"
      },
      "peerDependencies": {
        "node-notifier": "*",
        "typescript": "*"
      },
      "peerDependenciesMeta": {
        "node-notifier": {
          "optional": true
        }
      }
    },
    "node_modules/tsconfig": {
      "version": "7.0.0",
      "resolved": "https://registry.npmjs.org/tsconfig/-/tsconfig-7.0.0.tgz",
      "integrity": "sha512-vZXmzPrL+EmC4T/4rVlT2jNVMWCi/O4DIiSj3UHg1OE5kCKbk4mfrXc6dZksLgRM/TZlKnousKH9bbTazUWRRw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@types/strip-bom": "^3.0.0",
        "@types/strip-json-comments": "0.0.30",
        "strip-bom": "^3.0.0",
        "strip-json-comments": "^2.0.0"
      }
    },
    "node_modules/type-fest": {
      "version": "4.41.0",
      "resolved": "https://registry.npmjs.org/type-fest/-/type-fest-4.41.0.tgz",
      "integrity": "sha512-TeTSQ6H5YHvpqVwBRcnLDCBnDOHWYu7IvGbHT6N8AOymcr9PJGjc1GTtiWZTYg0NCgYwvnYWEkVChQAr9bjfwA==",
      "license": "(MIT OR CC0-1.0)",
      "engines": {
        "node": ">=16"
      },
      "funding": {
        "url": "https://github.com/sponsors/sindresorhus"
      }
    },
    "node_modules/type-is": {
      "version": "1.6.18",
      "resolved": "https://registry.npmjs.org/type-is/-/type-is-1.6.18.tgz",
      "integrity": "sha512-TkRKr9sUTxEH8MdfuCSP7VizJyzRNMjj2J2do2Jr3Kym598JVdEksuzPQCnlFPW4ky9Q+iA+ma9BGm06XQBy8g==",
      "license": "MIT",
      "dependencies": {
        "media-typer": "0.3.0",
        "mime-types": "~2.1.24"
      },
      "engines": {
        "node": ">= 0.6"
      }
    },
    "node_modules/typedarray": {
      "version": "0.0.6",
      "resolved": "https://registry.npmjs.org/typedarray/-/typedarray-0.0.6.tgz",
      "integrity": "sha512-/aCDEGatGvZ2BIk+HmLf4ifCJFwvKFNb9/JeZPMulfgFracn9QFcAf5GO8B/mweUjSoblS5In0cWhqpfs/5PQA==",
      "license": "MIT"
    },
    "node_modules/typescript": {
      "version": "5.4.5",
      "resolved": "https://registry.npmjs.org/typescript/-/typescript-5.4.5.tgz",
      "integrity": "sha512-vcI4UpRgg81oIRUFwR0WSIHKt11nJ7SAVlYNIu+QpqeyXP+gpQJy/Z4+F0aGxSE4MqwjyXvW/TzgkLAx2AGHwQ==",
      "dev": true,
      "license": "Apache-2.0",
      "bin": {
        "tsc": "bin/tsc",
        "tsserver": "bin/tsserver"
      },
      "engines": {
        "node": ">=14.17"
      }
    },
    "node_modules/undici-types": {
      "version": "5.26.5",
      "resolved": "https://registry.npmjs.org/undici-types/-/undici-types-5.26.5.tgz",
      "integrity": "sha512-JlCMO+ehdEIKqlFxk6IfVoAUVmgz7cU7zD/h9XZ0qzeosSHmUJVOzSQvvYSYWXkFXC+IfLKSIffhv0sVZup6pA==",
      "license": "MIT"
    },
    "node_modules/unpipe": {
      "version": "1.0.0",
      "resolved": "https://registry.npmjs.org/unpipe/-/unpipe-1.0.0.tgz",
      "integrity": "sha512-pjy2bYhSsufwWlKwPc+l3cN7+wuJlK6uz0YdJEOlQDbl6jo/YlPi4mb8agUkVC8BF7V8NuzeyPNqRksA3hztKQ==",
      "license": "MIT",
      "engines": {
        "node": ">= 0.8"
      }
    },
    "node_modules/util-deprecate": {
      "version": "1.0.2",
      "resolved": "https://registry.npmjs.org/util-deprecate/-/util-deprecate-1.0.2.tgz",
      "integrity": "sha512-EPD5q1uXyFxJpCrLnCc1nHnq3gOa6DZBocAIiI2TaSCA7VCJ1UJDMagCzIkXNsUYfD1daK//LTEQ8xiIbrHtcw==",
      "license": "MIT"
    },
    "node_modules/utils-merge": {
      "version": "1.0.1",
      "resolved": "https://registry.npmjs.org/utils-merge/-/utils-merge-1.0.1.tgz",
      "integrity": "sha512-pMZTvIkT1d+TFGvDOqodOclx0QWkkgi6Tdoa8gC8ffGAAqz9pzPTZWAybbsHHoED/ztMtkv/VoYTYyShUn81hA==",
      "license": "MIT",
      "engines": {
        "node": ">= 0.4.0"
      }
    },
    "node_modules/uuid": {
      "version": "13.0.0",
      "resolved": "https://registry.npmjs.org/uuid/-/uuid-13.0.0.tgz",
      "integrity": "sha512-XQegIaBTVUjSHliKqcnFqYypAd4S+WCYt5NIeRs6w/UAry7z8Y9j5ZwRRL4kzq9U3sD6v+85er9FvkEaBpji2w==",
      "funding": [
        "https://github.com/sponsors/broofa",
        "https://github.com/sponsors/ctavan"
      ],
      "license": "MIT",
      "bin": {
        "uuid": "dist-node/bin/uuid"
      }
    },
    "node_modules/v8-compile-cache-lib": {
      "version": "3.0.1",
      "resolved": "https://registry.npmjs.org/v8-compile-cache-lib/-/v8-compile-cache-lib-3.0.1.tgz",
      "integrity": "sha512-wa7YjyUGfNZngI/vtK0UHAN+lgDCxBPCylVXGp0zu59Fz5aiGtNXaq3DhIov063MorB+VfufLh3JlF2KdTK3xg==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/vary": {
      "version": "1.1.2",
      "resolved": "https://registry.npmjs.org/vary/-/vary-1.1.2.tgz",
      "integrity": "sha512-BNGbWLfd0eUPabhkXUVm0j8uuvREyTh5ovRa/dyow/BqAbZJyC+5fU+IzQOzmAKzYqYRAISoRhdQr3eIZ/PXqg==",
      "license": "MIT",
      "engines": {
        "node": ">= 0.8"
      }
    },
    "node_modules/webidl-conversions": {
      "version": "7.0.0",
      "resolved": "https://registry.npmjs.org/webidl-conversions/-/webidl-conversions-7.0.0.tgz",
      "integrity": "sha512-VwddBukDzu71offAQR975unBIGqfKZpM+8ZX6ySk8nYhVoo5CYaZyzt3YBvYtRtO+aoGlqxPg/B87NGVZ/fu6g==",
      "license": "BSD-2-Clause",
      "peer": true,
      "engines": {
        "node": ">=12"
      }
    },
    "node_modules/whatwg-url": {
      "version": "14.2.0",
      "resolved": "https://registry.npmjs.org/whatwg-url/-/whatwg-url-14.2.0.tgz",
      "integrity": "sha512-De72GdQZzNTUBBChsXueQUnPKDkg/5A5zp7pFDuQAj5UFoENpiACU0wlCvzpAGnTkj++ihpKwKyYewn/XNUbKw==",
      "license": "MIT",
      "peer": true,
      "dependencies": {
        "tr46": "^5.1.0",
        "webidl-conversions": "^7.0.0"
      },
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/wrappy": {
      "version": "1.0.2",
      "resolved": "https://registry.npmjs.org/wrappy/-/wrappy-1.0.2.tgz",
      "integrity": "sha512-l4Sp/DRseor9wL6EvV2+TuQn63dMkPjZ/sp9XkghTEbV9KlPS1xUsZ3u7/IQO4wxtcFB4bgpQPRcR3QCvezPcQ==",
      "dev": true,
      "license": "ISC"
    },
    "node_modules/xtend": {
      "version": "4.0.2",
      "resolved": "https://registry.npmjs.org/xtend/-/xtend-4.0.2.tgz",
      "integrity": "sha512-LKYU1iAXJXUgAXn9URjiu+MWhyUXHsvfp7mcuYm9dSUKK0/CjtrUwFAxD82/mCWbtLsGjFIad0wIsod4zrTAEQ==",
      "license": "MIT",
      "engines": {
        "node": ">=0.4"
      }
    },
    "node_modules/yn": {
      "version": "3.1.1",
      "resolved": "https://registry.npmjs.org/yn/-/yn-3.1.1.tgz",
      "integrity": "sha512-Ux4ygGWsu2c7isFWe8Yu1YluJmqVhxqK2cLXNQA5AcC3QfbGNpM7fu0Y8b/z16pXLnFxZYvWhd3fhBY9DLmC6Q==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=6"
      }
    },
    "node_modules/zod": {
      "version": "4.3.6",
      "resolved": "https://registry.npmjs.org/zod/-/zod-4.3.6.tgz",
      "integrity": "sha512-rftlrkhHZOcjDwkGlnUtZZkvaPHCsDATp4pGpuOOMDaTdDDXF91wuVDJoWoPsKX/3YPQ5fHuF3STjcYyKr+Qhg==",
      "license": "MIT",
      "funding": {
        "url": "https://github.com/sponsors/colinhacks"
      }
    }
  }
}

```


---
## FILE: server/package.json

```json
{
  "name": "Backend",
  "version": "1.0.0",
  "description": "Production-ready Node.js + Express + TypeScript + Prisma backend",
  "main": "dist/server.js",
  "scripts": {
    "dev": "ts-node-dev --respawn --transpile-only src/server.ts",
    "build": "tsc",
    "start": "node dist/server.js",
    "prisma:generate": "prisma generate",
    "prisma:migrate": "prisma migrate dev",
    "prisma:studio": "prisma studio",
    "seed:admin": "ts-node src/seed.admin.ts"
  },
  "keywords": [
    "nodejs",
    "express",
    "typescript",
    "prisma",
    "backend"
  ],
  "author": "",
  "license": "ISC",
  "dependencies": {
    "@huggingface/inference": "^4.13.15",
    "@neondatabase/serverless": "^1.0.2",
    "@prisma/client": "^5.9.1",
    "better-auth": "^1.5.5",
    "cloudinary": "^2.9.0",
    "cors": "^2.8.6",
    "dotenv": "^16.4.5",
    "express": "^4.19.2",
    "livekit-server-sdk": "^2.15.1",
    "multer": "^2.1.1",
    "pg": "^8.20.0",
    "prisma": "^5.9.1",
    "sslcommerz-lts": "^1.2.0",
    "uuid": "^13.0.0"
  },
  "devDependencies": {
    "@types/cors": "^2.8.19",
    "@types/express": "^4.17.21",
    "@types/multer": "^2.1.0",
    "@types/node": "^20.11.19",
    "@types/pg": "^8.18.0",
    "@types/uuid": "^10.0.0",
    "ts-node-dev": "^2.0.0",
    "typescript": "^5.4.5"
  }
}

```


---
## FILE: server/prisma.config.ts

```ts
// prisma.config.ts
import "dotenv/config";
import { defineConfig } from "prisma/config";

export default defineConfig({
  schema: "./prisma/schema.prisma", // VERY IMPORTANT (you are using nested schema folder)
  migrations: {
    path: "./prisma/migrations",
  },
  datasource: {
    url: process.env.DATABASE_URL,
  },
});
```


---
## FILE: server/src/app.ts

```ts
// File: src/app.ts
import express, { Express } from 'express';
import cors from 'cors';
import { toNodeHandler } from "better-auth/node";
import { auth } from './lib/auth';
import routes from './routes';
import globalErrorHandler from './errorHelpers/globalErrorHandler';
import notFoundHandler from './errorHelpers/notFound';

const app: Express = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: (process.env.TRUSTED_CLIENT_ORIGIN?.split(",") || ["http://localhost:3000"]).map(o => o.trim()),
  credentials: true,
}));

app.use((req, res, next) => {
  if (req.url.includes('/api/auth')) {
    console.log(`[Backend Debug] ${req.method} ${req.url}`);
    console.log(`[Backend Debug] Origin: ${req.headers.origin}`);
    console.log(`[Backend Debug] Cookies Received:`, req.headers.cookie);
    
    const originalSend = res.send;
    res.send = function (_body) {
      console.log(`[Backend Debug] Response for ${req.url}:`, {
        status: res.statusCode,
        setCookie: res.get('Set-Cookie'),
        allowOrigin: res.get('Access-Control-Allow-Origin'),
        allowCredentials: res.get('Access-Control-Allow-Credentials')
      });
      return originalSend.apply(res, arguments as any);
    };
  }
  next();
});

// Better Auth Handler - Mount BEFORE other routes
app.use("/api/auth", toNodeHandler(auth));

// Routes
app.use('/api', routes);

// 404 Handler
app.use(notFoundHandler);

// Global Error Handler
app.use(globalErrorHandler);

export default app;

```


---
## FILE: server/src/config/env.ts

```ts
// File: src/config/env.ts

import dotenv from "dotenv";

dotenv.config();

const config = {
  port: process.env.PORT || 5000,
  databaseUrl: process.env.DATABASE_URL,
  nodeEnv: process.env.NODE_ENV || "development",
  trustedClientOrigin: process.env.TRUSTED_CLIENT_ORIGIN,

  // Cloudinary
  cloudinaryCloudName: process.env.CLOUDINARY_CLOUD_NAME,
  cloudinaryApiKey: process.env.CLOUDINARY_API_KEY,
  cloudinaryApiSecret: process.env.CLOUDINARY_API_SECRET,

  // AI Provider API keys
  geminiApiKey: process.env.GEMINI_API_KEY,
  hfApiKey: process.env.HF_API_KEY,
  groqApiKey: process.env.GROQ_API_KEY,
  openrouterApiKey: process.env.OPENROUTER_API_KEY,
  anthropicApiKey: process.env.ANTHROPIC_API_KEY,

  // SSLCommerz Payment Gateway (Sandbox)
  sslcStoreId: process.env.SSLC_STORE_ID || '',
  sslcStorePass: process.env.SSLC_STORE_PASS || '',
  sslcIsLive: process.env.SSLC_IS_LIVE === 'true',
};

export default config;

```


---
## FILE: server/src/errorHelpers/globalErrorHandler.ts

```ts
// File: src/errorHelpers/globalErrorHandler.ts
import { Request, Response, NextFunction } from 'express';

interface ErrorResponse {
  success: boolean;
  message: string;
  error?: unknown;
}

const globalErrorHandler = (
  err: any,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  const statusCode = err?.statusCode || 500;
  const message = err?.message || 'An unexpected error occurred';

  const errorResponse: ErrorResponse = {
    success: false,
    message,
  };

  if (process.env.NODE_ENV === 'development') {
    errorResponse.error = err;
  }

  return res.status(statusCode).json(errorResponse);
};

export default globalErrorHandler;

```


---
## FILE: server/src/errorHelpers/notFound.ts

```ts
// File: src/errorHelpers/notFound.ts
import { Request, Response, NextFunction } from 'express';

const notFoundHandler = (req: Request, res: Response, _next: NextFunction) => {
  return res.status(404).json({
    success: false,
    message: `Route ${req.originalUrl} not found`,
  });
};

export default notFoundHandler;

```


---
## FILE: server/src/lib/auth.ts

```ts
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./prisma";
import { bearer } from "better-auth/plugins";

const trustedOrigins = process.env.TRUSTED_CLIENT_ORIGIN?.split(",") || [];

if (trustedOrigins.length === 0) {
  throw new Error("TRUSTED_CLIENT_ORIGIN is not set");
}

const baseURL = process.env.BETTER_AUTH_URL?.split(",")[0].trim() || "";

if (!baseURL) {
  throw new Error("BETTER_AUTH_URL is not set or invalid");
}

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  user: {
    additionalFields: {
      role: {
        type: "string",
        required: false,
        defaultValue: "USER",
      }
    }
  },
  secret: process.env.BETTER_AUTH_SECRET,
  baseURL,
  basePath: "/api/auth",

  emailAndPassword: {
    enabled: true,
  },

  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    },
  },

  trustedOrigins,
  cookies: {
    sessionToken: {
      attributes: {
        httpOnly: true,
        secure: true,       // REQUIRED for cross-site
        sameSite: "none",   // REQUIRED for cross-site
      },
    },
  },
  plugins: [
    bearer(),
  ],
  onSessionCreated: async (session: any) => {
    console.log("[Better-Auth Hook] Session Created:", {
      id: session.session.id,
      userId: session.session.userId,
      expiresAt: session.session.expiresAt
    });
  },
  onSessionDeleted: async (session: any) => {
    console.log("[Better-Auth Hook] Session Deleted:", session.session?.id || session.id);
  },
});

```


---
## FILE: server/src/lib/cloudinary.ts

```ts
// server/src/lib/cloudinary.ts
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

export interface CloudinaryUploadResult {
  url: string;
  secureUrl: string;
  publicId: string;
}

/**
 * Uploads a local video file to Cloudinary.
 * Returns the secure URL and public_id for storage.
 */
export const uploadVideo = (filePath: string, folder = 'animation-jobs'): Promise<CloudinaryUploadResult> => {
  console.log(`[Cloudinary] Uploading video from: ${filePath}`);

  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(
      filePath,
      {
        resource_type: 'video',
        folder,
        use_filename: true,
        unique_filename: true,
      },
      (error, result) => {
        if (error || !result) {
          console.error('[Cloudinary] Upload failed:', error);
          return reject(new Error(error?.message || 'Cloudinary upload returned no result'));
        }
        console.log(`[Cloudinary] Upload succeeded: ${result.secure_url}`);
        resolve({
          url: result.url,
          secureUrl: result.secure_url,
          publicId: result.public_id,
        });
      }
    );
  });
};

/**
 * Deletes a Cloudinary asset by its public_id.
 */
export const deleteVideo = (publicId: string): Promise<void> => {
  console.log(`[Cloudinary] Deleting asset: ${publicId}`);

  return new Promise((resolve, reject) => {
    cloudinary.uploader.destroy(publicId, { resource_type: 'video' }, (error, result) => {
      if (error) {
        console.error('[Cloudinary] Delete failed:', error);
        return reject(new Error(error.message));
      }
      console.log(`[Cloudinary] Delete result:`, result);
      resolve();
    });
  });
};

export default cloudinary;

```


---
## FILE: server/src/lib/prisma.ts

```ts
// File: src/lib/prisma.ts
import { PrismaClient } from "@prisma/client";

const prismaClientSingleton = () => {
  return new PrismaClient();
};

type PrismaClientSingleton = ReturnType<typeof prismaClientSingleton>;

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClientSingleton;
};

export const prisma = globalForPrisma.prisma ?? prismaClientSingleton();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

```


---
## FILE: server/src/module/admin/admin.controller.ts

```ts
import { Request, Response, NextFunction } from 'express';
import { adminService } from './admin.service';

const getStats = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const stats = await adminService.getDashboardStats();
    res.status(200).json({ success: true, data: stats });
  } catch (error) {
    next(error);
  }
};

const getUsers = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await adminService.getAllUsers();
    res.status(200).json({ success: true, data: users });
  } catch (error) {
    next(error);
  }
};

const getProjects = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const projects = await adminService.getAllProjects();
    res.status(200).json({ success: true, data: projects });
  } catch (error) {
    next(error);
  }
};

const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    await adminService.deleteUser(id);
    res.status(200).json({ success: true, message: 'User deleted successfully' });
  } catch (error) {
    next(error);
  }
};

const deleteProject = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    await adminService.deleteProject(id);
    res.status(200).json({ success: true, message: 'Project deleted successfully' });
  } catch (error) {
    next(error);
  }
};

export const adminController = {
  getStats,
  getUsers,
  getProjects,
  deleteUser,
  deleteProject
};

```


---
## FILE: server/src/module/admin/admin.interface.ts

```ts
// File: src/module/admin/admin.interface.ts
// Placeholder: Admin Interface
export {};

```


---
## FILE: server/src/module/admin/admin.route.ts

```ts
import { Router } from 'express';
import { adminController } from './admin.controller';
import { auth } from '../../lib/auth';
import { fromNodeHeaders } from 'better-auth/node';

const adminRouter = Router();

adminRouter.use(async (req, res, next) => {
  try {
    const session = await auth.api.getSession({
      headers: fromNodeHeaders(req.headers)
    });
    
    if (!session || !session.user) {
      res.status(401).json({ success: false, message: 'Unauthorized' });
      return;
    }
    
    if ((session.user as any).role !== 'ADMIN') {
      res.status(403).json({ success: false, message: 'Forbidden: Admin access only' });
      return;
    }
    
    (req as any).user = session.user;
    next();
  } catch (error) {
    next(error);
  }
});

adminRouter.get('/stats', adminController.getStats);
adminRouter.get('/users', adminController.getUsers);
adminRouter.get('/projects', adminController.getProjects);
adminRouter.delete('/users/:id', adminController.deleteUser);
adminRouter.delete('/projects/:id', adminController.deleteProject);

export default adminRouter;

```


---
## FILE: server/src/module/admin/admin.service.ts

```ts
import { prisma } from '../../lib/prisma';

const getDashboardStats = async () => {
  const [totalUsers, totalProjects, totalAnimations, recentUsers, recentProjects, recentAnimations] = await Promise.all([
    prisma.user.count(),
    prisma.project.count(),
    prisma.animationJob.count(),
    prisma.user.findMany({ orderBy: { createdAt: 'desc' }, take: 5 }),
    prisma.project.findMany({ orderBy: { createdAt: 'desc' }, take: 5, include: { user: { select: { name: true, email: true } } } }),
    prisma.animationJob.findMany({ orderBy: { createdAt: 'desc' }, take: 5, include: { user: { select: { name: true, email: true } }, project: { select: { title: true } } } }),
  ]);

  const uptime = process.uptime();

  return {
    totalUsers,
    totalProjects,
    totalAnimations,
    recentUsers,
    recentProjects,
    recentAnimations,
    uptime, // in seconds
    healthStatus: 'Healthy',
    serverStartTime: new Date(Date.now() - uptime * 1000).toISOString()
  };
};

const getAllUsers = async () => {
  return prisma.user.findMany({
    orderBy: { createdAt: 'desc' },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      createdAt: true,
      _count: {
        select: { projects: true, animationJobs: true }
      }
    }
  });
};

const getAllProjects = async () => {
  return prisma.project.findMany({
    orderBy: { createdAt: 'desc' },
    include: {
      user: {
        select: { name: true, email: true }
      },
      _count: {
        select: { animations: true }
      }
    }
  });
};

const deleteUser = async (id: string) => {
  return prisma.user.delete({
    where: { id }
  });
};

const deleteProject = async (id: string) => {
  return prisma.project.delete({
    where: { id }
  });
};

export const adminService = {
  getDashboardStats,
  getAllUsers,
  getAllProjects,
  deleteUser,
  deleteProject
};

```


---
## FILE: server/src/module/admin/admin.validation.ts

```ts
// File: src/module/admin/admin.validation.ts
// Placeholder: Admin Validation
export {};

```


---
## FILE: server/src/module/ai/ai.controller.ts

```ts
// server/src/module/ai/ai.controller.ts
import { Request, Response } from 'express';
import { aiService } from './ai.service';
import { GenerateTextRequest } from './ai.interface';

export const getProviders = (_req: Request, res: Response): any => {
  try {
    const catalog = aiService.getProviderCatalog();
    return res.status(200).json({ success: true, data: catalog });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const getModels = (req: Request, res: Response): any => {
  try {
    const provider = req.query.provider as string;
    
    if (!provider) {
      return res.status(400).json({ success: false, message: 'Provider query parameter is required' });
    }

    const models = aiService.getModelsForProvider(provider);
    return res.status(200).json({ success: true, data: models });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const generateChat = async (req: Request, res: Response) => {
  try {
    const requestPayload: GenerateTextRequest = {
      prompt: req.body.prompt,
      provider: req.body.provider,
      model: req.body.model,
      apiKey: req.body.apiKey,
      temperature: req.body.temperature,
      systemPrompt: req.body.systemPrompt,
    };

    const response = await aiService.generateText(requestPayload);
    res.status(200).json({ success: true, data: response });
  } catch (error: any) {
    // Redact API key from logs if printing or returning, but here we just return the error message
    console.error('[AI Provider Error]:', error.message);
    res.status(500).json({ success: false, message: error.message || 'Failed to generate text' });
  }
};

```


---
## FILE: server/src/module/ai/ai.interface.ts

```ts
// server/src/module/ai/ai.interface.ts
export interface GenerateTextRequest {
  prompt: string;
  provider: string;
  model: string;
  apiKey?: string;
  temperature?: number;
  systemPrompt?: string;
}

export interface GenerateTextResponse {
  provider: string;
  model: string;
  text: string;
  rawResponse?: any;
  usage?: any;
  createdAt: Date;
}

```


---
## FILE: server/src/module/ai/ai.route.ts

```ts
// server/src/module/ai/ai.route.ts
import { Router } from 'express';
import { getProviders, getModels, generateChat } from './ai.controller';
import { validateChatRequest } from './ai.validation';

const router = Router();

router.get('/providers', getProviders);
router.get('/models', getModels);
router.post('/chat', validateChatRequest, generateChat);

export default router;

```


---
## FILE: server/src/module/ai/ai.service.ts

```ts
import { providerRegistry } from './registry/providerRegistry';
import { HuggingFaceProvider } from './providers/huggingface.provider';
import { GeminiProvider } from './providers/gemini.provider';
import { GroqProvider } from './providers/groq.provider';
import { OpenRouterProvider } from './providers/openrouter.provider';
import { AnthropicProvider } from './providers/anthropic.provider';
import { GenerateTextRequest, GenerateTextResponse } from './ai.interface';
import { MODEL_CATALOG, SUPPORTED_PROVIDERS } from './constants';

// Register all providers
providerRegistry.register(new HuggingFaceProvider());
providerRegistry.register(new GeminiProvider());
providerRegistry.register(new GroqProvider());
providerRegistry.register(new OpenRouterProvider());
providerRegistry.register(new AnthropicProvider());

export const aiService = {
  getProviders() {
    return SUPPORTED_PROVIDERS;
  },

  getModelsForProvider(provider: string) {
    return MODEL_CATALOG[provider.toLowerCase()] || [];
  },

  getProviderCatalog() {
    return MODEL_CATALOG;
  },

  async generateText(request: GenerateTextRequest): Promise<GenerateTextResponse> {
    const provider = providerRegistry.getProvider(request.provider);
    return provider.generateText(request);
  }
};

```


---
## FILE: server/src/module/ai/ai.validation.ts

```ts
import { Request, Response, NextFunction } from 'express';
// import { SUPPORTED_PROVIDERS, MODEL_CATALOG } from './constants';

export const validateChatRequest = (req: Request, res: Response, next: NextFunction): any => {
  const { prompt, provider, model, apiKey } = req.body;

  if (!prompt || typeof prompt !== 'string' || prompt.trim() === '') {
    return res.status(400).json({ success: false, message: 'Prompt is required and must be a non-empty string.' });
  }

  if (!provider || typeof provider !== 'string') {
    return res.status(400).json({ success: false, message: 'Provider is required.' });
  }

  // if (!SUPPORTED_PROVIDERS.includes(provider.toLowerCase())) {
  //   return res.status(400).json({ success: false, message: `Unsupported provider: ${provider}` });
  // }

  if (!model || typeof model !== 'string') {
    return res.status(400).json({ success: false, message: 'Model is required.' });
  }

  // const providerModels = MODEL_CATALOG[provider.toLowerCase()];
  // const isModelSupported = providerModels.some((m) => m.id === model);

  // if (!isModelSupported) {
  //   return res.status(400).json({ success: false, message: `Unsupported model '${model}' for provider '${provider}'.` });
  // }

  if (!apiKey || typeof apiKey !== 'string' || apiKey.trim() === '') {
    return res.status(400).json({ success: false, message: `API key is required for provider '${provider}'.` });
  }

  next();
};

```


---
## FILE: server/src/module/ai/constants.ts

```ts
// server/src/module/ai/constants.ts

export interface ModelOption {
  id: string;
  label: string;
}

export const MODEL_CATALOG: Record<string, ModelOption[]> = {
  huggingface: [
    {
      id: 'mistralai/Mistral-7B-Instruct-v0.2:featherless-ai',
      label: 'Mistral 7B Instruct v0.2',
    },
    {
      id: 'meta-llama/Meta-Llama-3-8B-Instruct',
      label: 'Meta LLaMA 3 8B Instruct',
    },
  ],

  gemini: [
    { id: 'gemini-2.5-flash', label: 'Gemini 2.5 Flash' },
    { id: 'gemini-2.5-pro', label: 'Gemini 2.5 Pro' },
    { id: 'gemini-2.0-flash', label: 'Gemini 2.0 Flash' },
    { id: 'gemini-2.0-flash-001', label: 'Gemini 2.0 Flash 001' },
    { id: 'gemini-2.0-flash-lite', label: 'Gemini 2.0 Flash-Lite' },
    { id: 'gemini-2.0-flash-lite-001', label: 'Gemini 2.0 Flash-Lite 001' },
    { id: 'gemini-flash-latest', label: 'Gemini Flash Latest' },
    { id: 'gemini-flash-lite-latest', label: 'Gemini Flash-Lite Latest' },
    { id: 'gemini-pro-latest', label: 'Gemini Pro Latest' },
    { id: 'gemini-2.5-flash-lite', label: 'Gemini 2.5 Flash-Lite' },
    {
      id: 'gemini-2.5-flash-lite-preview-09-2025',
      label: 'Gemini 2.5 Flash-Lite Preview Sep 2025',
    },
    { id: 'gemini-3-pro-preview', label: 'Gemini 3 Pro Preview' },
    { id: 'gemini-3-flash-preview', label: 'Gemini 3 Flash Preview' },
    { id: 'gemini-3.1-pro-preview', label: 'Gemini 3.1 Pro Preview' },
    {
      id: 'gemini-3.1-pro-preview-customtools',
      label: 'Gemini 3.1 Pro Preview Custom Tools',
    },
    {
      id: 'gemini-3.1-flash-lite-preview',
      label: 'Gemini 3.1 Flash Lite Preview',
    },

    // Optional Gemma models exposed through the same API
    { id: 'gemma-3-1b-it', label: 'Gemma 3 1B' },
    { id: 'gemma-3-4b-it', label: 'Gemma 3 4B' },
    { id: 'gemma-3-12b-it', label: 'Gemma 3 12B' },
    { id: 'gemma-3-27b-it', label: 'Gemma 3 27B' },
    { id: 'gemma-3n-e4b-it', label: 'Gemma 3n E4B' },
    { id: 'gemma-3n-e2b-it', label: 'Gemma 3n E2B' },
  ],

  groq: [
    { id: 'llama3-8b-8192', label: 'LLaMA 3 8B' },
    { id: 'llama3-70b-8192', label: 'LLaMA 3 70B' },
    { id: 'mixtral-8x7b-32768', label: 'Mixtral 8x7B' },
  ],

  openrouter: [
    { id: 'openai/gpt-3.5-turbo', label: 'GPT-3.5 Turbo' },
    { id: 'anthropic/claude-3-haiku', label: 'Claude 3 Haiku' },
    { id: 'meta-llama/llama-3-8b-instruct', label: 'LLaMA 3 8B Instruct' },
  ],

  anthropic: [
    { id: 'claude-3-haiku-20240307', label: 'Claude 3 Haiku' },
    { id: 'claude-3-sonnet-20240229', label: 'Claude 3 Sonnet' },
  ],
};

export const SUPPORTED_PROVIDERS = Object.keys(MODEL_CATALOG);
```


---
## FILE: server/src/module/ai/providers/anthropic.provider.ts

```ts
// server/src/module/ai/providers/anthropic.provider.ts
import { BaseAIProvider } from './base.provider';
import { GenerateTextRequest, GenerateTextResponse } from '../ai.interface';

export class AnthropicProvider extends BaseAIProvider {
  name = 'anthropic';

  async generateText(request: GenerateTextRequest): Promise<GenerateTextResponse> {
    const { prompt, model, apiKey, temperature, systemPrompt } = request;

    if (!apiKey) {
      throw new Error('API key is required for Anthropic provider');
    }

    const url = 'https://api.anthropic.com/v1/messages';
    
    const payload: any = {
      model,
      messages: [{ role: 'user', content: prompt }],
      max_tokens: 1000,
      temperature: temperature || 0.7,
    };

    if (systemPrompt) {
      payload.system = systemPrompt;
    }

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Anthropic API error: ${response.status} - ${errorText}`);
    }

    const data = (await response.json()) as any;
    const text = data.content?.[0]?.text || '';

    return {
      provider: this.name,
      model,
      text,
      rawResponse: data,
      usage: data.usage,
      createdAt: new Date(),
    };
  }
}

```


---
## FILE: server/src/module/ai/providers/base.provider.ts

```ts
// server/src/module/ai/providers/base.provider.ts
import { GenerateTextRequest, GenerateTextResponse } from '../ai.interface';

export abstract class BaseAIProvider {
  /**
   * The name of the provider (e.g., 'huggingface')
   */
  abstract readonly name: string;

  /**
   * Generates text based on the normalized request.
   * Implementation must convert the prompt to the provider's specific format,
   * make the API call, and convert the result back to GenerateTextResponse.
   */
  abstract generateText(request: GenerateTextRequest): Promise<GenerateTextResponse>;
}

```


---
## FILE: server/src/module/ai/providers/gemini.provider.ts

```ts
// src/module/ai/providers/gemini.provider.ts
import { BaseAIProvider } from './base.provider';
import { GenerateTextRequest, GenerateTextResponse } from '../ai.interface';

export class GeminiProvider extends BaseAIProvider {
  name = 'gemini';

  async generateText(request: GenerateTextRequest): Promise<GenerateTextResponse> {
    const { prompt, model, apiKey, temperature, systemPrompt } = request;

    if (!apiKey) {
      throw new Error('API key is required for Gemini provider');
    }

    const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

    const payload: any = {
      contents: [{
        parts: [{ text: prompt }]
      }],
      generationConfig: {
        temperature: temperature || 0.7,
      }
    };

    if (systemPrompt) {
      payload.systemInstruction = {
        parts: [{ text: systemPrompt }]
      };
    }

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Gemini API error: ${response.status} - ${errorText}`);
    }

    const data = (await response.json()) as any;
    
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text || '';

    return {
      provider: this.name,
      model,
      text,
      rawResponse: data,
      createdAt: new Date(),
    };
  }
}

```


---
## FILE: server/src/module/ai/providers/groq.provider.ts

```ts
// server/src/module/ai/providers/groq.provider.ts
import { BaseAIProvider } from './base.provider';
import { GenerateTextRequest, GenerateTextResponse } from '../ai.interface';

export class GroqProvider extends BaseAIProvider {
  name = 'groq';

  async generateText(request: GenerateTextRequest): Promise<GenerateTextResponse> {
    const { prompt, model, apiKey, temperature, systemPrompt } = request;

    if (!apiKey) {
      throw new Error('API key is required for Groq provider');
    }

    const url = 'https://api.groq.com/openai/v1/chat/completions';
    
    const messages = [];
    if (systemPrompt) {
      messages.push({ role: 'system', content: systemPrompt });
    }
    messages.push({ role: 'user', content: prompt });

    const payload = {
      model,
      messages,
      temperature: temperature || 0.7,
    };

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Groq API error: ${response.status} - ${errorText}`);
    }

    const data = (await response.json()) as any;
    const text = data.choices?.[0]?.message?.content || '';

    return {
      provider: this.name,
      model,
      text,
      rawResponse: data,
      usage: data.usage,
      createdAt: new Date(),
    };
  }
}

```


---
## FILE: server/src/module/ai/providers/huggingface.provider.ts

```ts
// server/src/module/ai/providers/huggingface.provider.ts
import { BaseAIProvider } from './base.provider';
import { GenerateTextRequest, GenerateTextResponse } from '../ai.interface';
import { InferenceClient } from '@huggingface/inference';

export class HuggingFaceProvider extends BaseAIProvider {
  name = 'huggingface';

  async generateText(request: GenerateTextRequest): Promise<GenerateTextResponse> {
    const { prompt, model, apiKey, temperature: _temperature, systemPrompt } = request;

    if (!apiKey) {
      throw new Error('API key is required for Hugging Face provider');
    }

    const client = new InferenceClient(apiKey);

    const messages = [];
    if (systemPrompt) {
      messages.push({ role: 'system', content: systemPrompt });
    }
    messages.push({ role: 'user', content: prompt });

    try {
      const chatCompletion = await client.chatCompletion({
        model: model,
        messages: messages as any,
        // temperature: temperature || 0.7,
        // max_tokens: 500,
      });

      const text = chatCompletion.choices[0]?.message?.content || '';

      return {
        provider: this.name,
        model,
        text,
        rawResponse: chatCompletion,
        createdAt: new Date(),
      };
    } catch (error: any) {
      throw new Error(`Hugging Face API error: ${error.message}`);
    }
  }
}

```


---
## FILE: server/src/module/ai/providers/openrouter.provider.ts

```ts
// server/src/module/ai/providers/openrouter.provider.ts
import { BaseAIProvider } from './base.provider';
import { GenerateTextRequest, GenerateTextResponse } from '../ai.interface';

export class OpenRouterProvider extends BaseAIProvider {
  name = 'openrouter';

  async generateText(request: GenerateTextRequest): Promise<GenerateTextResponse> {
    const { prompt, model, apiKey, temperature, systemPrompt } = request;

    if (!apiKey) {
      throw new Error('API key is required for OpenRouter provider');
    }

    const url = 'https://openrouter.ai/api/v1/chat/completions';
    
    const messages = [];
    if (systemPrompt) {
      messages.push({ role: 'system', content: systemPrompt });
    }
    messages.push({ role: 'user', content: prompt });

    const payload = {
      model,
      messages,
      temperature: temperature || 0.7,
    };

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': 'http://localhost:3000', // Typical requirement for openrouter
        'X-Title': 'AI Animation Studio',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`OpenRouter API error: ${response.status} - ${errorText}`);
    }

    const data = (await response.json()) as any;
    const text = data.choices?.[0]?.message?.content || '';

    return {
      provider: this.name,
      model,
      text,
      rawResponse: data,
      usage: data.usage,
      createdAt: new Date(),
    };
  }
}

```


---
## FILE: server/src/module/ai/registry/providerRegistry.ts

```ts
import { BaseAIProvider } from '../providers/base.provider';

class ProviderRegistry {
  private providers: Map<string, BaseAIProvider> = new Map();

  register(provider: BaseAIProvider) {
    this.providers.set(provider.name.toLowerCase(), provider);
  }

  getProvider(name: string): BaseAIProvider {
    const provider = this.providers.get(name.toLowerCase());
    if (!provider) {
      throw new Error(`Provider adapter for '${name}' is not registered or supported.`);
    }
    return provider;
  }

  getAllRegisteredProviderNames(): string[] {
    return Array.from(this.providers.keys());
  }
}

export const providerRegistry = new ProviderRegistry();

```


---
## FILE: server/src/module/animation/animation.controller.ts

```ts
// server/src/module/animation/animation.controller.ts
import { Request, Response } from 'express';
import {
  createJob,
  getJobById,
  getJobsByProject,
  getJobsByUser,
  regenerateJob,
  deleteJob,
} from './animation.service';
import { processAnimationJob } from './animation.worker';

// ─── POST /animations/generate ────────────────────────────────────────────────

export const generateAnimation = async (req: Request, res: Response): Promise<any> => {
  try {
    const { prompt, projectId, userId, provider, model, apiKey } = req.body;

    console.log(`[AnimationController] Generate request from user=${userId} project=${projectId} provider=${provider}`);

    // Create the job record immediately
    const job = await createJob({ userId, projectId, prompt, provider, model });

    console.log(`[AnimationController] Job created: ${job.id} — launching pipeline async`);

    // Fire-and-forget: process in background
    processAnimationJob(job.id, prompt, provider, model, apiKey).catch((err) => {
      console.error(`[AnimationController] Unhandled worker error for job ${job.id}:`, err.message);
    });

    return res.status(202).json({
      success: true,
      message: 'Animation job created and processing started.',
      data: job,
    });
  } catch (err: any) {
    console.error('[AnimationController] generateAnimation error:', err.message);
    return res.status(500).json({
      success: false,
      message: err.message || 'Failed to create animation job.',
      data: null,
    });
  }
};

// ─── GET /animations/:jobId ───────────────────────────────────────────────────

export const getJob = async (req: Request, res: Response): Promise<any> => {
  try {
    const { jobId } = req.params;
    console.log(`[AnimationController] Get job: ${jobId}`);

    const job = await getJobById(jobId);
    if (!job) {
      return res.status(404).json({
        success: false,
        message: `Job ${jobId} not found.`,
        data: null,
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Job retrieved successfully.',
      data: job,
    });
  } catch (err: any) {
    console.error('[AnimationController] getJob error:', err.message);
    return res.status(500).json({
      success: false,
      message: err.message || 'Failed to retrieve job.',
      data: null,
    });
  }
};

// ─── GET /animations/project/:projectId ───────────────────────────────────────

export const getProjectJobs = async (req: Request, res: Response): Promise<any> => {
  try {
    const { projectId } = req.params;
    console.log(`[AnimationController] Listing jobs for project: ${projectId}`);

    const jobs = await getJobsByProject(projectId);

    return res.status(200).json({
      success: true,
      message: `Found ${jobs.length} job(s) for project ${projectId}.`,
      data: jobs,
    });
  } catch (err: any) {
    console.error('[AnimationController] getProjectJobs error:', err.message);
    return res.status(500).json({
      success: false,
      message: err.message || 'Failed to list project jobs.',
      data: null,
    });
  }
};

// ─── GET /animations/user/:userId ──────────────────────────────────────────

export const getUserJobs = async (req: Request, res: Response): Promise<any> => {
  try {
    const { userId } = req.params;
    console.log(`[AnimationController] Listing jobs for user: ${userId}`);

    const jobs = await getJobsByUser(userId);

    return res.status(200).json({
      success: true,
      message: `Found ${jobs.length} job(s) for user ${userId}.`,
      data: jobs,
    });
  } catch (err: any) {
    console.error('[AnimationController] getUserJobs error:', err.message);
    return res.status(500).json({
      success: false,
      message: err.message || 'Failed to list user jobs.',
      data: null,
    });
  }
};

// ─── PATCH /animations/:jobId/regenerate ──────────────────────────────────────

export const regenerateAnimation = async (req: Request, res: Response): Promise<any> => {
  try {
    const { jobId } = req.params;
    const { provider, model, apiKey } = req.body;

    console.log(`[AnimationController] Regenerate job: ${jobId}`);

    const newJob = await regenerateJob(jobId, { provider, model });

    console.log(`[AnimationController] Regeneration job created: ${newJob.id} — launching pipeline async`);

    processAnimationJob(newJob.id, newJob.prompt, newJob.provider, newJob.model, apiKey).catch(
      (err) => {
        console.error(`[AnimationController] Unhandled worker error for regen job ${newJob.id}:`, err.message);
      }
    );

    return res.status(202).json({
      success: true,
      message: 'Regeneration started. A new job has been created.',
      data: newJob,
    });
  } catch (err: any) {
    console.error('[AnimationController] regenerateAnimation error:', err.message);
    return res.status(500).json({
      success: false,
      message: err.message || 'Failed to regenerate animation.',
      data: null,
    });
  }
};

// ─── DELETE /animations/:jobId ────────────────────────────────────────────────

export const deleteAnimation = async (req: Request, res: Response): Promise<any> => {
  try {
    const { jobId } = req.params;
    console.log(`[AnimationController] Delete job: ${jobId}`);

    await deleteJob(jobId);

    return res.status(200).json({
      success: true,
      message: `Job ${jobId} deleted successfully.`,
      data: null,
    });
  } catch (err: any) {
    console.error('[AnimationController] deleteAnimation error:', err.message);
    const statusCode = err.message?.includes('not found') ? 404 : 500;
    return res.status(statusCode).json({
      success: false,
      message: err.message || 'Failed to delete job.',
      data: null,
    });
  }
};

```


---
## FILE: server/src/module/animation/animation.interface.ts

```ts
// server/src/module/animation/animation.interface.ts

export type AnimationStatus =
  | 'pending'
  | 'processing'
  | 'generating_code'
  | 'rendering'
  | 'uploading'
  | 'done'
  | 'failed'
  | 'expired';

// ─── Request Types ────────────────────────────────────────────────────────────

export interface GenerateAnimationRequest {
  prompt: string;
  projectId: string;
  userId: string;
  provider: string;
  model: string;
  /** Optional: client-supplied API key. Falls back to server env var. */
  apiKey?: string;
}

export interface RegenerateAnimationRequest {
  jobId: string;
  userId: string;
  /** Optional: override provider/model for regeneration */
  provider?: string;
  model?: string;
  apiKey?: string;
}

// ─── DB Model Shape ───────────────────────────────────────────────────────────

export interface AnimationJobData {
  id: string;
  userId: string;
  projectId: string;
  prompt: string;
  provider: string;
  model: string;
  status: AnimationStatus;
  generatedCode: string | null;
  videoUrl: string | null;
  cloudinaryId: string | null;
  errorMessage: string | null;
  expiresAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

// ─── Response Types ────────────────────────────────────────────────────────────

export interface AnimationJobResponse {
  success: boolean;
  message: string;
  data: AnimationJobData | null;
}

export interface AnimationJobListResponse {
  success: boolean;
  message: string;
  data: AnimationJobData[];
}

// ─── Worker Types ──────────────────────────────────────────────────────────────

export interface WorkerUpdateFields {
  status?: AnimationStatus;
  generatedCode?: string;
  videoUrl?: string;
  cloudinaryId?: string;
  errorMessage?: string;
  expiresAt?: Date;
}

```


---
## FILE: server/src/module/animation/animation.route.ts

```ts
// server/src/module/animation/animation.route.ts
import { Router } from 'express';
import {
  generateAnimation,
  getJob,
  getProjectJobs,
  getUserJobs,
  regenerateAnimation,
  deleteAnimation,
} from './animation.controller';
import {
  validateGenerateRequest,
  validateJobIdParam,
  validateProjectIdParam,
} from './animation.validation';

const animationRouter = Router();

// POST /api/animations/generate — Create a new animation job
animationRouter.post('/generate', validateGenerateRequest, generateAnimation);

// GET /api/animations/project/:projectId — List all jobs for a project
// NOTE: Must be ABOVE /:jobId to prevent "project" being parsed as a jobId
animationRouter.get('/project/:projectId', validateProjectIdParam, getProjectJobs);

// GET /api/animations/user/:userId — List all jobs for a user
// NOTE: Must be ABOVE /:jobId to prevent "user" being parsed as a jobId
animationRouter.get('/user/:userId', getUserJobs);

// GET /api/animations/:jobId — Get a single job by ID
animationRouter.get('/:jobId', validateJobIdParam, getJob);

// PATCH /api/animations/:jobId/regenerate — Regenerate from original prompt
animationRouter.patch('/:jobId/regenerate', validateJobIdParam, regenerateAnimation);

// DELETE /api/animations/:jobId — Delete a job and its Cloudinary asset
animationRouter.delete('/:jobId', validateJobIdParam, deleteAnimation);

export default animationRouter;

```


---
## FILE: server/src/module/animation/animation.service.ts

```ts
// server/src/module/animation/animation.service.ts
import { prisma } from '../../lib/prisma';
import { deleteVideo } from '../../lib/cloudinary';
import { AnimationJobData, AnimationStatus, WorkerUpdateFields } from './animation.interface';

/** How long (in days) before a rendered video expires */
const VIDEO_EXPIRY_DAYS = 7;

// ─── Helpers ──────────────────────────────────────────────────────────────────

const mapStatus = (job: any): AnimationJobData => {
  // Auto-detect expiry
  let status: AnimationStatus = job.status as AnimationStatus;
  if (
    status === 'done' &&
    job.expiresAt &&
    new Date(job.expiresAt) < new Date()
  ) {
    status = 'expired';
  }
  return { ...job, status };
};

// ─── Core CRUD ────────────────────────────────────────────────────────────────

/**
 * Creates a new AnimationJob record with status=pending.
 */
export const createJob = async (data: {
  userId: string;
  projectId: string;
  prompt: string;
  provider: string;
  model: string;
}): Promise<AnimationJobData> => {
  console.log(`[AnimationService] Creating job for user=${data.userId} project=${data.projectId}`);

  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + VIDEO_EXPIRY_DAYS);

  const job = await prisma.animationJob.create({
    data: {
      userId: data.userId,
      projectId: data.projectId,
      prompt: data.prompt,
      provider: data.provider,
      model: data.model,
      status: 'pending',
      expiresAt,
    },
  });

  console.log(`[AnimationService] Job created: ${job.id}`);
  return mapStatus(job);
};

/**
 * Retrieves a single job by ID, with expiry detection.
 */
export const getJobById = async (jobId: string): Promise<AnimationJobData | null> => {
  console.log(`[AnimationService] Fetching job: ${jobId}`);
  const job = await prisma.animationJob.findUnique({ where: { id: jobId } });
  if (!job) return null;
  return mapStatus(job);
};

/**
 * Lists all jobs for a given project, newest first.
 */
export const getJobsByProject = async (projectId: string): Promise<AnimationJobData[]> => {
  console.log(`[AnimationService] Listing jobs for project: ${projectId}`);
  const jobs = await prisma.animationJob.findMany({
    where: { projectId },
    orderBy: { createdAt: 'desc' },
  });
  return jobs.map(mapStatus);
};

/**
 * Lists all jobs for a given user across all projects, newest first.
 */
export const getJobsByUser = async (userId: string): Promise<AnimationJobData[]> => {
  console.log(`[AnimationService] Listing jobs for user: ${userId}`);
  const jobs = await prisma.animationJob.findMany({
    where: { userId },
    orderBy: { createdAt: 'desc' },
  });
  return jobs.map(mapStatus);
};

/**
 * Updates job fields (status + any other fields).
 */
export const updateJob = async (
  jobId: string,
  fields: WorkerUpdateFields
): Promise<AnimationJobData> => {
  console.log(`[AnimationService] Updating job ${jobId}:`, JSON.stringify(fields));
  const job = await prisma.animationJob.update({
    where: { id: jobId },
    data: {
      ...fields,
      updatedAt: new Date(),
    },
  });
  return mapStatus(job);
};

/**
 * Clones the prompt from an existing job and creates a new job (for regeneration).
 */
export const regenerateJob = async (
  jobId: string,
  overrides?: { provider?: string; model?: string }
): Promise<AnimationJobData> => {
  console.log(`[AnimationService] Regenerating from job: ${jobId}`);
  const original = await prisma.animationJob.findUnique({ where: { id: jobId } });
  if (!original) throw new Error(`Job ${jobId} not found`);

  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + VIDEO_EXPIRY_DAYS);

  const newJob = await prisma.animationJob.create({
    data: {
      userId: original.userId,
      projectId: original.projectId,
      prompt: original.prompt,
      provider: overrides?.provider ?? original.provider,
      model: overrides?.model ?? original.model,
      status: 'pending',
      expiresAt,
    },
  });

  console.log(`[AnimationService] Regeneration job created: ${newJob.id}`);
  return mapStatus(newJob);
};

/**
 * Deletes a job record and optionally its Cloudinary asset.
 */
export const deleteJob = async (jobId: string): Promise<void> => {
  console.log(`[AnimationService] Deleting job: ${jobId}`);
  const job = await prisma.animationJob.findUnique({ where: { id: jobId } });
  if (!job) throw new Error(`Job ${jobId} not found`);

  // Clean up Cloudinary asset if it exists
  if (job.cloudinaryId) {
    try {
      await deleteVideo(job.cloudinaryId);
    } catch (err: any) {
      console.warn(`[AnimationService] Cloudinary delete failed for ${job.cloudinaryId}:`, err.message);
    }
  }

  await prisma.animationJob.delete({ where: { id: jobId } });
  console.log(`[AnimationService] Job deleted: ${jobId}`);
};

```


---
## FILE: server/src/module/animation/animation.validation.ts

```ts
// server/src/module/animation/animation.validation.ts
import { Request, Response, NextFunction } from 'express';

/**
 * Validates POST /animations/generate request body.
 */
export const validateGenerateRequest = (
  req: Request,
  res: Response,
  next: NextFunction
): any => {
  const { prompt, projectId, userId, provider, model } = req.body;

  if (!prompt || typeof prompt !== 'string' || prompt.trim() === '') {
    return res
      .status(400)
      .json({ success: false, message: 'Prompt is required and must be a non-empty string.' });
  }

  if (prompt.trim().length < 10) {
    return res
      .status(400)
      .json({ success: false, message: 'Prompt must be at least 10 characters long.' });
  }

  if (!projectId || typeof projectId !== 'string' || projectId.trim() === '') {
    return res
      .status(400)
      .json({ success: false, message: 'projectId is required.' });
  }

  if (!userId || typeof userId !== 'string' || userId.trim() === '') {
    return res
      .status(400)
      .json({ success: false, message: 'userId is required.' });
  }

  if (!provider || typeof provider !== 'string' || provider.trim() === '') {
    return res
      .status(400)
      .json({ success: false, message: 'provider is required (e.g. "gemini", "groq").' });
  }

  if (!model || typeof model !== 'string' || model.trim() === '') {
    return res
      .status(400)
      .json({ success: false, message: 'model is required.' });
  }

  next();
};

/**
 * Validates that :jobId path param is present.
 */
export const validateJobIdParam = (
  req: Request,
  res: Response,
  next: NextFunction
): any => {
  const { jobId } = req.params;
  if (!jobId || jobId.trim() === '') {
    return res
      .status(400)
      .json({ success: false, message: 'jobId parameter is required.' });
  }
  next();
};

/**
 * Validates that :projectId path param is present.
 */
export const validateProjectIdParam = (
  req: Request,
  res: Response,
  next: NextFunction
): any => {
  const { projectId } = req.params;
  if (!projectId || projectId.trim() === '') {
    return res
      .status(400)
      .json({ success: false, message: 'projectId parameter is required.' });
  }
  next();
};

```


---
## FILE: server/src/module/animation/animation.worker.ts

```ts
// server/src/module/animation/animation.worker.ts
// Handles background animation job processing:
// - calls LLM via AI provider
// - writes Python file to OS temporary directory
// - executes Manim via spawn avoiding maxBuffer limits (600s timeout)
// - auto-retries up to MAX_RETRIES on render failure (sends errors back to AI)
// - uploads video to Cloudinary

const MAX_RETRIES = 10;
import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import { spawn } from 'child_process';
import { aiService } from '../ai/ai.service';
import { uploadVideo } from '../../lib/cloudinary';
import { updateJob } from './animation.service';

// ─── Manim System Prompt ──────────────────────────────────────────────────────

const MANIM_SYSTEM_PROMPT = `You are a Manim code generator. Your ONLY job is to output valid, self-contained Python code using the Manim Community library (manim).

CRITICAL STRICT RULES:
1. Output ONLY raw Python code. DO NOT include any markdown formatting (like \`\`\`python). DO NOT include any conversational text, explanations, or greetings. Your entire response must be executable Python code.
2. The scene class MUST be named "GeneratedScene".
3. The class must extend Scene from manim.
4. Use "from manim import *" as the first import.
5. The animation must run for at most 10 seconds.
6. Use only standard Manim objects and animations (e.g., Circle, Square, Text, Arrow, MathTex, Create, FadeIn, Transform, etc).
7. Do NOT use any external files, images, or network calls.
8. The construct method must be self-contained.
9. Keep the code simple and reliable — it must render without errors.

MANIM API RULES (VERY IMPORTANT — violations WILL cause render failures):

OPACITY:
- Do NOT use "opacity" as a constructor kwarg. Use "fill_opacity" or "stroke_opacity" instead.
  WRONG: Dot(opacity=0.3)
  RIGHT: Dot(fill_opacity=0.3)
- To change opacity after creation, use .set_opacity(), .set_fill(opacity=x), or .set_stroke(opacity=x).

AXES & NUMBER LINES:
- Do NOT use "numbers_with_elongated_tick" — it does not exist.
- Keep axis configs minimal: x_range=[min, max, step], y_range=[min, max, step], axis_config={"color": GRAY}.
- Do NOT use axes.get_x_axis().get_tick_labels() or axes.get_y_axis().get_tick_labels() — they are deprecated/broken.
- If you need axis labels, use axes.get_axis_labels(x_label="x", y_label="y") only.
- For plotting functions, use axes.plot(lambda x: ...) instead of axes.get_graph().

FRAME DIMENSIONS:
- Do NOT use FRAME_WIDTH or FRAME_HEIGHT as standalone constants — they don't exist.
  WRONG: x_range=[-FRAME_WIDTH/2, FRAME_WIDTH/2]
  RIGHT: x_range=[-config.frame_width/2, config.frame_width/2]
  Or simply use fixed numeric values like x_range=[-7, 7, 1].

ANIMATION GROUPS:
- AnimationGroup does NOT have .set_start_time(). Do NOT call it.
- For staggered animations, use LaggedStart(*animations, lag_ratio=0.2).
- For sequential animations, use Succession(anim1, anim2, ...).

PERFORMANCE:
- Avoid creating thousands of Mobjects (e.g., a dense grid of Dots). This causes extreme slowness or crashes.
  Instead of per-pixel dot grids, use ParametricFunction, FunctionGraph, or a small number of objects.
- Keep scenes simple: prefer fewer, larger geometric objects over many tiny ones.

UPDATERS:
- For updater-based continuous animations, use .add_updater() with self.wait(duration).
- Use color constants like BLUE, RED, GREEN, YELLOW, PURPLE, WHITE, GRAY, BLACK directly.
- For color interpolation, use interpolate_color(color1, color2, alpha).

EXAMPLE OUTPUT FORMAT:
from manim import *

class GeneratedScene(Scene):
    def construct(self):
        circle = Circle(color=BLUE)
        self.play(Create(circle))
        self.wait(1)
`;

// ─── Retry Prompt ─────────────────────────────────────────────────────────────

/**
 * Builds a retry prompt that includes the current failed code, the current error,
 * and all previously encountered errors so the AI doesn't repeat the same mistakes.
 */
function buildRetryPrompt(
  currentCode: string,
  currentError: string,
  previousErrors: string[],
  attemptNumber: number
): string {
  let previousErrorsSection = '';
  if (previousErrors.length > 0) {
    previousErrorsSection = `\n\nPREVIOUS ERRORS THAT ALREADY OCCURRED (do NOT repeat these mistakes):\n${previousErrors.map((e, i) => `${i + 1}. ${e}`).join('\n')}\n`;
  }

  return `The following Manim Python code failed to render (attempt ${attemptNumber}). Fix the code so it renders successfully.

FAILED CODE:
${currentCode}

CURRENT ERROR:
${currentError}${previousErrorsSection}
RULES:
- Output ONLY the fixed Python code. No explanations, no markdown.
- The class must still be named "GeneratedScene".
- Use "from manim import *" as the first import.
- Do NOT use "opacity" as a constructor kwarg. Use "fill_opacity" or "stroke_opacity" instead.
- Do NOT use "numbers_with_elongated_tick" — it does not exist.
- Do NOT use FRAME_WIDTH or FRAME_HEIGHT. Use config.frame_width / config.frame_height or fixed numeric values.
- Do NOT use axes.get_x_axis().get_tick_labels() — it is deprecated. Use axes.get_axis_labels() instead.
- Do NOT call .set_start_time() on AnimationGroup — it doesn't exist. Use LaggedStart or Succession instead.
- Do NOT use axes.get_graph() — use axes.plot() instead.
- Keep axis configs minimal and avoid unknown kwargs.
- Avoid creating thousands of tiny Mobjects (dots in a dense grid). Use ParametricFunction or FunctionGraph instead.
- The animation must be at most 10 seconds.
- Make sure the code renders without any errors.`;
}

// ─── Code Extraction ──────────────────────────────────────────────────────────

/**
 * Strips markdown fences from LLM output and extracts raw Python code.
 */
function extractPythonCode(raw: string): string {
  // Extract from markdown fences if present
  const match = raw.match(/```(?:python)?\s*([\s\S]*?)```/i);
  let code = match ? match[1] : raw;

  // Find the start of the actual Python code to ignore conversational prefixes
  let startIndex = code.indexOf('from manim');
  if (startIndex === -1) startIndex = code.indexOf('import manim');
  if (startIndex === -1) startIndex = code.indexOf('class GeneratedScene');

  if (startIndex > 0) {
    code = code.substring(startIndex);
  }

  return code.trim();
}

// ─── Manim Error Parsing ──────────────────────────────────────────────────────

/**
 * Extracts a meaningful Python error from Manim stderr output.
 * Returns the last error line (e.g., "TypeError: Mobject.__init__() got an unexpected keyword argument 'opacity'")
 */
function extractPythonError(stderr: string): string | null {
  // Look for common Python error patterns at the end of the traceback
  const lines = stderr.split('\n').map(l => l.trim()).filter(Boolean);

  // Check for "No module named" which appears on a single line without standard traceback
  for (const line of lines) {
    if (line.includes('No module named')) {
      return `ModuleNotFoundError: ${line}`;
    }
  }

  // Search from the end for typical Python error lines
  for (let i = lines.length - 1; i >= 0; i--) {
    const line = lines[i];
    if (
      line.match(/^(TypeError|ValueError|AttributeError|NameError|ImportError|SyntaxError|RuntimeError|KeyError|IndexError|ZeroDivisionError|ModuleNotFoundError|RecursionError|MemoryError|OverflowError):/) ||
      line.match(/^manim\..*Error:/)
    ) {
      return line;
    }
  }

  return null;
}

/**
 * Converts a technical Manim error into a user-friendly message.
 */
function makeUserFriendlyError(pythonError: string | null, retried: boolean): string {
  const retryNote = retried
    ? ' We attempted to automatically fix the issue, but it persisted.'
    : '';

  if (!pythonError) {
    return `We couldn't render this animation. The rendering engine encountered an unexpected issue.${retryNote} Please try rephrasing your prompt or simplifying the description.`;
  }

  if (pythonError.includes('unexpected keyword argument')) {
    return `We couldn't render this animation. The AI generated code with features not supported by our rendering engine.${retryNote} Please try a simpler prompt or rephrase your description.`;
  }

  if (pythonError.includes('MemoryError') || pythonError.includes('RecursionError')) {
    return `We couldn't render this animation — it was too complex for our rendering engine to handle.${retryNote} Please try a simpler animation with fewer elements.`;
  }

  if (pythonError.includes('No module named manim')) {
    return `Our animation rendering engine is temporarily unavailable due to a server configuration issue. This is not related to your prompt — please try again later or contact support.`;
  }

  if (pythonError.includes('ModuleNotFoundError') || pythonError.includes('ImportError')) {
    return `We couldn't render this animation due to a missing dependency on our server.${retryNote} Please try a different prompt that uses basic shapes and animations.`;
  }

  if (pythonError.includes('SyntaxError')) {
    return `We couldn't render this animation. The AI generated code with a syntax error.${retryNote} Please try rephrasing your prompt.`;
  }

  if (pythonError.includes('AttributeError')) {
    return `We couldn't render this animation. The AI used a feature that isn't available in our rendering engine.${retryNote} Please try a simpler description.`;
  }

  return `We couldn't render this animation. Our rendering engine encountered an error while processing the AI-generated code.${retryNote} Please try rephrasing your prompt or using a simpler description.`;
}

// ─── Manim Render ─────────────────────────────────────────────────────────────

interface RenderResult {
  success: boolean;
  stderr: string;
  pythonError: string | null;
}

/**
 * Runs Manim render and returns success/failure + captured stderr.
 */
async function runManimRender(
  jobId: string,
  pyFile: string,
  tmpDir: string
): Promise<RenderResult> {
  return new Promise<RenderResult>((resolve) => {
    let stderrBuffer = '';

    const child = spawn('python3', [
      '-m', 'manim', 'render', '-ql', '--media_dir', tmpDir, pyFile, 'GeneratedScene'
    ], {
      timeout: 600_000 // 10 min timeout for Render Free tier
    });

    child.stdout.on('data', (data) => {
      const text = data.toString();
      console.log(`[Worker][${jobId}] STDOUT: ${text.trim()}`);
    });

    child.stderr.on('data', (data) => {
      const text = data.toString();
      stderrBuffer += text;
      console.error(`[Worker][${jobId}] STDERR: ${text.trim()}`);
    });

    child.on('close', (code) => {
      console.log(`[Worker][${jobId}] Manim process exited with code ${code}`);
      if (code === 0) {
        resolve({ success: true, stderr: stderrBuffer, pythonError: null });
      } else {
        const pythonError = extractPythonError(stderrBuffer);
        resolve({ success: false, stderr: stderrBuffer, pythonError });
      }
    });

    child.on('error', (spawnErr) => {
      console.error(`[Worker][${jobId}] Manim process error:`, spawnErr);
      resolve({ success: false, stderr: spawnErr.message, pythonError: null });
    });
  });
}

// ─── Worker Pipeline ──────────────────────────────────────────────────────────

/**
 * Main async pipeline for processing an animation job.
 * Called fire-and-forget after job creation — does NOT throw.
 */
export async function processAnimationJob(
  jobId: string,
  prompt: string,
  provider: string,
  model: string,
  apiKey?: string
): Promise<void> {
  console.log(`\n${'═'.repeat(60)}`);
  console.log(`[Worker] Starting pipeline for job: ${jobId}`);
  console.log(`[Worker] Provider: ${provider} | Model: ${model}`);
  console.log(`[Worker] Prompt: ${prompt.substring(0, 100)}...`);
  console.log(`${'═'.repeat(60)}`);

  // Temp file paths - Using OS temp directory
  const tmpDir = path.join(os.tmpdir(), `manim-job-${jobId}`);
  const pyFile = path.join(tmpDir, 'scene.py');
  let videoPath: string | null = null;

  try {
    // ── Step 1: Mark as processing ──────────────────────────────────────────
    await updateJob(jobId, { status: 'processing' });
    console.log(`[Worker][${jobId}] Status → processing`);

    // ── Step 2: Generate Manim code via AI ──────────────────────────────────
    await updateJob(jobId, { status: 'generating_code' });
    console.log(`[Worker][${jobId}] Status → generating_code`);
    console.log(`[Worker][${jobId}] Calling AI provider...`);

    const resolvedKey = apiKey ?? getProviderApiKey(provider);

    const aiResponse = await aiService.generateText({
      prompt,
      provider,
      model,
      apiKey: resolvedKey,
      systemPrompt: MANIM_SYSTEM_PROMPT,
      temperature: 0.3,
    });

    console.log(`[Worker][${jobId}] AI response received (${aiResponse.text.length} chars)`);

    let generatedCode = extractPythonCode(aiResponse.text);

    if (!generatedCode || !generatedCode.includes('class GeneratedScene')) {
      throw new Error('AI did not return a valid GeneratedScene class. Raw output:\n' + aiResponse.text.substring(0, 500));
    }

    await updateJob(jobId, { status: 'generating_code', generatedCode });
    console.log(`[Worker][${jobId}] Generated code saved to DB`);

    // ── Step 3: Write Python file to /tmp ────────────────────────────────────
    fs.mkdirSync(tmpDir, { recursive: true });
    fs.writeFileSync(pyFile, generatedCode, 'utf-8');
    console.log(`[Worker][${jobId}] Python file written: ${pyFile}`);

    // ── Step 4: Render with Manim (with up to MAX_RETRIES auto-retries) ───────
    await updateJob(jobId, { status: 'rendering' });
    console.log(`[Worker][${jobId}] Status → rendering`);
    console.log(`[Worker][${jobId}] Running: python3 -m manim render -ql ${pyFile} GeneratedScene`);

    let renderResult = await runManimRender(jobId, pyFile, tmpDir);
    const allErrors: string[] = [];
    let retryCount = 0;

    // ── Auto-retry loop ──────────────────────────────────────────────────────
    while (
      !renderResult.success &&
      renderResult.pythonError &&
      retryCount < MAX_RETRIES
    ) {
      // Skip retry if manim itself is missing — no code fix can help
      if (renderResult.pythonError.includes('No module named manim')) {
        console.log(`[Worker][${jobId}] ❌ Manim is not installed — cannot retry.`);
        break;
      }

      retryCount++;
      allErrors.push(renderResult.pythonError);

      console.log(`[Worker][${jobId}] ⚠ Render attempt ${retryCount} failed: ${renderResult.pythonError}`);
      console.log(`[Worker][${jobId}] 🔄 Auto-retry ${retryCount}/${MAX_RETRIES}...`);

      await updateJob(jobId, { status: 'generating_code' });

      const retryPrompt = buildRetryPrompt(
        generatedCode,
        renderResult.pythonError,
        allErrors.slice(0, -1), // all previous errors excluding the current one
        retryCount
      );

      try {
        const retryResponse = await aiService.generateText({
          prompt: retryPrompt,
          provider,
          model,
          apiKey: resolvedKey,
          systemPrompt: MANIM_SYSTEM_PROMPT,
          temperature: Math.max(0.1, 0.3 - retryCount * 0.02), // Decrease temp with each retry
        });

        console.log(`[Worker][${jobId}] Retry ${retryCount} AI response received (${retryResponse.text.length} chars)`);

        const retriedCode = extractPythonCode(retryResponse.text);

        if (!retriedCode || !retriedCode.includes('class GeneratedScene')) {
          console.log(`[Worker][${jobId}] Retry ${retryCount}: AI did not return valid code, stopping retries.`);
          break;
        }

        generatedCode = retriedCode;
        await updateJob(jobId, { status: 'generating_code', generatedCode });
        console.log(`[Worker][${jobId}] Retry ${retryCount} code saved to DB`);

        // Clean previous temp files and write new code
        if (fs.existsSync(tmpDir)) {
          fs.rmSync(tmpDir, { recursive: true, force: true });
        }
        fs.mkdirSync(tmpDir, { recursive: true });
        fs.writeFileSync(pyFile, generatedCode, 'utf-8');

        await updateJob(jobId, { status: 'rendering' });
        console.log(`[Worker][${jobId}] 🔄 Retry ${retryCount} render starting...`);

        renderResult = await runManimRender(jobId, pyFile, tmpDir);

        if (renderResult.success) {
          console.log(`[Worker][${jobId}] ✅ Retry ${retryCount} render succeeded!`);
        } else {
          console.log(`[Worker][${jobId}] ❌ Retry ${retryCount} failed: ${renderResult.pythonError || 'unknown error'}`);
        }
      } catch (retryErr: any) {
        console.error(`[Worker][${jobId}] Retry ${retryCount} AI call failed:`, retryErr.message);
        break; // Stop retrying if AI call itself fails
      }
    }

    // ── Check final render result ────────────────────────────────────────────
    if (!renderResult.success) {
      const wasRetried = retryCount > 0;
      const friendlyMessage = makeUserFriendlyError(renderResult.pythonError, wasRetried);
      throw new Error(friendlyMessage);
    }

    console.log(`[Worker][${jobId}] Manim execution completed successfully.`);

    // Locate the output mp4 — Manim places it under media/videos/scene/480p15/
    videoPath = findMp4File(tmpDir);
    if (!videoPath) {
      throw new Error('Manim render completed but no mp4 file was found in output directory.');
    }
    console.log(`[Worker][${jobId}] Video file found: ${videoPath}`);

    // ── Step 5: Upload to Cloudinary ─────────────────────────────────────────
    await updateJob(jobId, { status: 'uploading' });
    console.log(`[Worker][${jobId}] Status → uploading`);

    const uploadResult = await uploadVideo(videoPath, 'animation-jobs');
    console.log(`[Worker][${jobId}] Cloudinary upload complete: ${uploadResult.secureUrl}`);

    // ── Step 6: Finalize ─────────────────────────────────────────────────────
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7);

    await updateJob(jobId, {
      status: 'done',
      videoUrl: uploadResult.secureUrl,
      cloudinaryId: uploadResult.publicId,
      expiresAt,
    });

    console.log(`[Worker][${jobId}] Status → done ✓`);
    console.log(`[Worker][${jobId}] Video URL: ${uploadResult.secureUrl}`);

  } catch (err: any) {
    const errorMessage = err?.message || 'Unknown error during animation pipeline';
    console.error(`[Worker][${jobId}] FAILED:`, errorMessage);

    // If the error is already user-friendly (from makeUserFriendlyError), use it directly.
    // Otherwise, wrap it in a generic user-friendly message.
    const isAlreadyFriendly = errorMessage.startsWith("We couldn't render");
    const userMessage = isAlreadyFriendly
      ? errorMessage
      : `Something went wrong while creating your animation. Please try again with a different prompt.`;

    try {
      await updateJob(jobId, { status: 'failed', errorMessage: userMessage });
    } catch (dbErr: any) {
      console.error(`[Worker][${jobId}] Could not save failure to DB:`, dbErr.message);
    }
  } finally {
    // ── Cleanup temp files ───────────────────────────────────────────────────
    try {
      if (fs.existsSync(tmpDir)) {
        fs.rmSync(tmpDir, { recursive: true, force: true });
        console.log(`[Worker][${jobId}] Temp directory cleaned up`);
      }
    } catch (cleanupErr: any) {
      console.warn(`[Worker][${jobId}] Cleanup warning:`, cleanupErr.message);
    }

    console.log(`${'─'.repeat(60)}`);
    console.log(`[Worker][${jobId}] Pipeline finished`);
    console.log(`${'─'.repeat(60)}\n`);
  }
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

/**
 * Recursively searches for the first .mp4 file under a directory.
 */
function findMp4File(dir: string): string | null {
  if (!fs.existsSync(dir)) return null;

  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      const found = findMp4File(fullPath);
      if (found) return found;
    } else if (entry.isFile() && entry.name.endsWith('.mp4')) {
      return fullPath;
    }
  }
  return null;
}

/**
 * Resolves the server-side API key for a given provider from environment variables.
 * Falls back gracefully if none found (caller should patch in their own key).
 */
function getProviderApiKey(provider: string): string {
  const keyMap: Record<string, string | undefined> = {
    gemini: process.env.GEMINI_API_KEY,
    huggingface: process.env.HF_API_KEY,
    groq: process.env.GROQ_API_KEY,
    openrouter: process.env.OPENROUTER_API_KEY,
    anthropic: process.env.ANTHROPIC_API_KEY,
  };

  const key = keyMap[provider.toLowerCase()];
  if (!key) {
    throw new Error(
      `No API key found for provider "${provider}". Set the corresponding env var or pass apiKey in the request.`
    );
  }
  return key;
}

```


---
## FILE: server/src/module/auth/auth.controller.ts

```ts
// File: src/module/auth/auth.controller.ts
// Placeholder: Auth Controller
export {};

```


---
## FILE: server/src/module/auth/auth.interface.ts

```ts
// File: src/module/auth/auth.interface.ts
// Placeholder: Auth Interface
export {};

```


---
## FILE: server/src/module/auth/auth.route.ts

```ts
// File: src/module/auth/auth.route.ts
import { Router } from 'express';

const authRouter = Router();

// Placeholder routes

export default authRouter;

```


---
## FILE: server/src/module/auth/auth.service.ts

```ts
// File: src/module/auth/auth.service.ts
// Placeholder: Auth Service
export {};

```


---
## FILE: server/src/module/auth/auth.validation.ts

```ts
// File: src/module/auth/auth.validation.ts
// Placeholder: Auth Validation
export {};

```


---
## FILE: server/src/module/livekit/livekit.controller.ts

```ts
// File: src/module/livekit/livekit.controller.ts
import { Request, Response, NextFunction } from 'express';
import { LiveKitService } from './livekit.service';
import { auth } from '../../lib/auth';
import { v4 as uuidv4 } from 'uuid';

export const LiveKitController = {
  /**
   * POST /api/rooms/join
   * Body: { slug: string, displayName?: string }
   *
   * If the request has a valid better-auth session → Host token (isAdmin: true).
   * If no session (guest) → Guest token (isAdmin: false), displayName is required.
   */
  async joinRoom(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { slug, displayName } = req.body as { slug: string; displayName?: string };

      if (!slug) {
        res.status(400).json({ error: 'slug is required' });
        return;
      }

      // Try to get authenticated user from better-auth session
      const session = await auth.api.getSession({ headers: req.headers as any });
      const isAuthenticated = !!session?.user;

      let identity: string;
      let name: string;
      let isAdmin: boolean;

      if (isAuthenticated) {
        // Authenticated user → Host
        identity = session!.user.id;
        name = session!.user.name || session!.user.email || 'Host';
        isAdmin = true;
        console.log(`[LiveKit] Authenticated user ${identity} joining room "${slug}" as Host`);
      } else {
        // Guest
        if (!displayName || displayName.trim().length < 1) {
          res.status(400).json({ error: 'displayName is required for guest participants' });
          return;
        }
        identity = `guest-${uuidv4()}`;
        name = displayName.trim();
        isAdmin = false;
        console.log(`[LiveKit] Guest "${name}" (${identity}) joining room "${slug}" as Guest`);
      }

      const token = await LiveKitService.generateToken(slug, identity, isAdmin, name);
      const url = LiveKitService.getLivekitUrl();

      res.status(200).json({
        token,
        url,
        identity,
        displayName: name,
        isAdmin,
        roomName: slug,
      });
    } catch (error) {
      next(error);
    }
  },
};

```


---
## FILE: server/src/module/livekit/livekit.route.ts

```ts
// File: src/module/livekit/livekit.route.ts
import { Router } from 'express';
import { LiveKitController } from './livekit.controller';

const livekitRouter = Router();

// POST /api/rooms/join — No auth guard; controller handles host vs guest logic
livekitRouter.post('/join', LiveKitController.joinRoom);

export default livekitRouter;

```


---
## FILE: server/src/module/livekit/livekit.service.ts

```ts
// File: src/module/livekit/livekit.service.ts
import { AccessToken } from 'livekit-server-sdk';

const LIVEKIT_API_KEY = process.env.LIVEKIT_API_KEY || '';
const LIVEKIT_API_SECRET = process.env.LIVEKIT_API_SECRET || '';
const LIVEKIT_URL = process.env.LIVEKIT_URL || '';

export const LiveKitService = {
  /**
   * Generate a LiveKit JWT for a participant joining a room.
   * @param roomName  - The LiveKit room name (= studio slug)
   * @param identity  - A unique identifier for the participant
   * @param isAdmin   - Whether the participant is the room host
   * @param displayName - Human-readable name shown in the UI
   */
  async generateToken(
    roomName: string,
    identity: string,
    isAdmin: boolean,
    displayName: string
  ): Promise<string> {
    const at = new AccessToken(LIVEKIT_API_KEY, LIVEKIT_API_SECRET, {
      identity,
      name: displayName,
      ttl: '4h',
    });

    at.addGrant({
      roomJoin: true,
      room: roomName,
      canPublish: true,
      canSubscribe: true,
      roomAdmin: isAdmin,
    });

    const token = await at.toJwt();
    console.log(`[LiveKit] Token generated for identity="${identity}" room="${roomName}" isAdmin=${isAdmin}`);
    return token;
  },

  getLivekitUrl(): string {
    return LIVEKIT_URL;
  },
};

```


---
## FILE: server/src/module/payment/payment.controller.ts

```ts
// server/src/module/payment/payment.controller.ts

import { Request, Response } from 'express';
import {
  initDonation,
  handleSuccess,
  handleFail,
  handleCancel,
  getDonations,
} from './payment.service';

/**
 * POST /api/payment — Initiate a donation session.
 * Returns the SSLCommerz gateway URL for redirect.
 */
export const initDonationHandler = async (req: Request, res: Response): Promise<any> => {
  try {
    const { amount, currency, name, email, userId } = req.body;
    console.log(`[PaymentController] initDonation request: amount=${amount}, name=${name}, email=${email}`);

    const result = await initDonation({ amount, currency, name, email, userId });

    return res.status(200).json({
      success: true,
      message: 'Payment session created. Redirect to gateway.',
      data: { gatewayUrl: result.gatewayUrl, tranId: result.tranId },
    });
  } catch (err: any) {
    console.error('[PaymentController] initDonation error:', err.message);
    return res.status(500).json({
      success: false,
      message: err.message || 'Failed to initiate donation.',
      data: null,
    });
  }
};

/**
 * POST /api/payment/success — SSLCommerz success callback.
 * Updates donation status and redirects user to the client success page.
 */
export const successHandler = async (req: Request, res: Response): Promise<any> => {
  try {
    console.log('[PaymentController] Success callback body:', req.body);
    const donation = await handleSuccess(req.body);

    // Redirect to client success page
    const clientOrigin = req.body.value_a || 'http://localhost:3000';
    return res.redirect(`${clientOrigin}/payment/success?tranId=${donation.tranId}&amount=${donation.amount}`);
  } catch (err: any) {
    console.error('[PaymentController] success error:', err.message);
    const clientOrigin = req.body?.value_a || 'http://localhost:3000';
    return res.redirect(`${clientOrigin}/payment/fail?error=processing_error`);
  }
};

/**
 * POST /api/payment/fail — SSLCommerz fail callback.
 * Updates donation status and redirects user to the client fail page.
 */
export const failHandler = async (req: Request, res: Response): Promise<any> => {
  try {
    console.log('[PaymentController] Fail callback body:', req.body);
    await handleFail(req.body);

    const clientOrigin = req.body.value_a || 'http://localhost:3000';
    return res.redirect(`${clientOrigin}/payment/fail`);
  } catch (err: any) {
    console.error('[PaymentController] fail error:', err.message);
    const clientOrigin = req.body?.value_a || 'http://localhost:3000';
    return res.redirect(`${clientOrigin}/payment/fail`);
  }
};

/**
 * POST /api/payment/cancel — SSLCommerz cancel callback.
 * Updates donation status and redirects user to the client cancel page.
 */
export const cancelHandler = async (req: Request, res: Response): Promise<any> => {
  try {
    console.log('[PaymentController] Cancel callback body:', req.body);
    await handleCancel(req.body);

    const clientOrigin = req.body.value_a || 'http://localhost:3000';
    return res.redirect(`${clientOrigin}/payment/cancel`);
  } catch (err: any) {
    console.error('[PaymentController] cancel error:', err.message);
    const clientOrigin = req.body?.value_a || 'http://localhost:3000';
    return res.redirect(`${clientOrigin}/payment/cancel`);
  }
};

/**
 * GET /api/payment/donations — List all donation records (admin endpoint).
 */
export const getDonationsHandler = async (_req: Request, res: Response): Promise<any> => {
  try {
    const donations = await getDonations();
    return res.status(200).json({
      success: true,
      message: `Found ${donations.length} donation(s).`,
      data: donations,
    });
  } catch (err: any) {
    console.error('[PaymentController] getDonations error:', err.message);
    return res.status(500).json({
      success: false,
      message: err.message || 'Failed to list donations.',
      data: null,
    });
  }
};

```


---
## FILE: server/src/module/payment/payment.interface.ts

```ts
// server/src/module/payment/payment.interface.ts

export interface InitDonationRequest {
  amount: number;
  currency?: string;
  name: string;
  email: string;
  userId?: string;
}

export interface DonationRecord {
  id: string;
  userId: string | null;
  name: string;
  email: string;
  amount: number;
  currency: string;
  tranId: string;
  status: string;
  valId: string | null;
  createdAt: Date;
  updatedAt: Date;
}

```


---
## FILE: server/src/module/payment/payment.route.ts

```ts
// server/src/module/payment/payment.route.ts

import { Router } from 'express';
import {
  initDonationHandler,
  successHandler,
  failHandler,
  cancelHandler,
  getDonationsHandler,
} from './payment.controller';
import { validateInitDonation } from './payment.validation';

const paymentRouter = Router();

// POST /api/payment — Initiate a donation payment session
paymentRouter.post('/', validateInitDonation, initDonationHandler);

// POST /api/payment/success — SSLCommerz success callback
paymentRouter.post('/success', successHandler);

// POST /api/payment/fail — SSLCommerz fail callback
paymentRouter.post('/fail', failHandler);

// POST /api/payment/cancel — SSLCommerz cancel callback
paymentRouter.post('/cancel', cancelHandler);

// GET /api/payment/donations — List all donations (admin)
paymentRouter.get('/donations', getDonationsHandler);

export default paymentRouter;

```


---
## FILE: server/src/module/payment/payment.service.ts

```ts
// server/src/module/payment/payment.service.ts

import { prisma } from '../../lib/prisma';
import config from '../../config/env';
import { InitDonationRequest, DonationRecord } from './payment.interface';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const SSLCommerzPayment = require('sslcommerz-lts');

/**
 * Generate a unique transaction ID with a timestamp prefix.
 */
const generateTranId = (): string => {
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 8).toUpperCase();
  return `DON-${timestamp}-${random}`;
};

/**
 * Initiate a donation session with SSLCommerz sandbox.
 * Creates a pending donation record in DB, then returns the gateway redirect URL.
 */
export const initDonation = async (data: InitDonationRequest): Promise<{ gatewayUrl: string; tranId: string }> => {
  const tranId = generateTranId();
  console.log(`[PaymentService] Initiating donation: tranId=${tranId}, amount=${data.amount}, email=${data.email}`);

  // Determine callback base URL (the server itself handles callbacks)
  // Use the production URL from BETTER_AUTH_URL if available, otherwise fallback to localhost
  const authUrls = process.env.BETTER_AUTH_URL?.split(',').map(u => u.trim()) || [];
  const productionUrl = authUrls.find(u => !u.includes('localhost'));
  const serverBase = productionUrl || `http://localhost:${config.port}`;
  console.log(`[PaymentService] Using serverBase for callbacks: ${serverBase}`);

  // Determine the client origin for redirects after callback
  // Match the serverBase: if production URL, use production client origin; else use localhost
  const clientOrigins = process.env.TRUSTED_CLIENT_ORIGIN?.split(',').map(u => u.trim()) || [];
  let clientOrigin: string;
  if (productionUrl) {
    // In production, find a non-localhost client origin
    clientOrigin = clientOrigins.find(u => !u.includes('localhost')) || 'https://flat-motion.vercel.app';
  } else {
    // In local development, use localhost client origin
    clientOrigin = clientOrigins.find(u => u.includes('localhost')) || 'http://localhost:3000';
  }
  console.log(`[PaymentService] Using clientOrigin for redirect: ${clientOrigin}`);

  // Save pending donation record in DB
  const donation = await prisma.donation.create({
    data: {
      userId: data.userId || null,
      name: data.name,
      email: data.email,
      amount: data.amount,
      currency: data.currency || 'BDT',
      tranId,
      status: 'pending',
    },
  });
  console.log(`[PaymentService] Donation record created: id=${donation.id}, tranId=${tranId}`);

  // Prepare SSLCommerz payment data
  const paymentData = {
    total_amount: data.amount,
    currency: data.currency || 'BDT',
    tran_id: tranId,
    success_url: `${serverBase}/api/payment/success`,
    fail_url: `${serverBase}/api/payment/fail`,
    cancel_url: `${serverBase}/api/payment/cancel`,
    ipn_url: `${serverBase}/api/payment/ipn`,
    shipping_method: 'NO',
    product_name: 'FlatMotion Donation',
    product_category: 'Donation',
    product_profile: 'non-physical-goods',
    cus_name: data.name,
    cus_email: data.email,
    cus_add1: 'N/A',
    cus_city: 'N/A',
    cus_postcode: '0000',
    cus_country: 'Bangladesh',
    cus_phone: '01700000000',
    ship_name: 'N/A',
    ship_add1: 'N/A',
    ship_city: 'N/A',
    ship_postcode: 0,
    ship_country: 'Bangladesh',
    value_a: clientOrigin, // Pass client origin for redirect in callbacks
  };

  // Call SSLCommerz API
  if (!config.sslcStoreId || !config.sslcStorePass) {
    console.error('[PaymentService] SSLCommerz credentials missing:', {
      storeId: config.sslcStoreId ? 'SET' : 'MISSING',
      storePass: config.sslcStorePass ? 'SET' : 'MISSING',
      isLive: config.sslcIsLive,
      nodeEnv: process.env.NODE_ENV,
    });
    throw new Error('SSLCommerz credentials not configured. Please set SSLC_STORE_ID and SSLC_STORE_PASS environment variables.');
  }

  const sslcz = new SSLCommerzPayment(config.sslcStoreId, config.sslcStorePass, config.sslcIsLive);
  const apiResponse = await sslcz.init(paymentData);

  if (!apiResponse?.GatewayPageURL) {
    console.error('[PaymentService] SSLCommerz init failed:', apiResponse);
    throw new Error('Failed to initialize payment gateway. Please try again.');
  }

  console.log(`[PaymentService] Gateway URL received for tranId=${tranId}`);
  return { gatewayUrl: apiResponse.GatewayPageURL, tranId };
};

/**
 * Handle SSLCommerz success callback.
 * Validates the transaction and updates the donation status to "success".
 */
export const handleSuccess = async (body: any): Promise<DonationRecord> => {
  const { tran_id, val_id } = body;
  console.log(`[PaymentService] Success callback received: tran_id=${tran_id}, val_id=${val_id}`);

  const donation = await prisma.donation.update({
    where: { tranId: tran_id },
    data: {
      status: 'success',
      valId: val_id || null,
      updatedAt: new Date(),
    },
  });

  console.log(`[PaymentService] Donation ${donation.id} marked as success`);
  return donation as DonationRecord;
};

/**
 * Handle SSLCommerz fail callback.
 */
export const handleFail = async (body: any): Promise<DonationRecord> => {
  const { tran_id } = body;
  console.log(`[PaymentService] Fail callback received: tran_id=${tran_id}`);

  const donation = await prisma.donation.update({
    where: { tranId: tran_id },
    data: {
      status: 'failed',
      updatedAt: new Date(),
    },
  });

  console.log(`[PaymentService] Donation ${donation.id} marked as failed`);
  return donation as DonationRecord;
};

/**
 * Handle SSLCommerz cancel callback.
 */
export const handleCancel = async (body: any): Promise<DonationRecord> => {
  const { tran_id } = body;
  console.log(`[PaymentService] Cancel callback received: tran_id=${tran_id}`);

  const donation = await prisma.donation.update({
    where: { tranId: tran_id },
    data: {
      status: 'cancelled',
      updatedAt: new Date(),
    },
  });

  console.log(`[PaymentService] Donation ${donation.id} marked as cancelled`);
  return donation as DonationRecord;
};

/**
 * List all donation records (admin use).
 */
export const getDonations = async (): Promise<DonationRecord[]> => {
  console.log('[PaymentService] Listing all donations');
  const donations = await prisma.donation.findMany({
    orderBy: { createdAt: 'desc' },
  });
  return donations as DonationRecord[];
};

```


---
## FILE: server/src/module/payment/payment.validation.ts

```ts
// server/src/module/payment/payment.validation.ts

import { Request, Response, NextFunction } from 'express';

/**
 * Validates the donation initiation request body.
 * Requires: amount (positive number), name (non-empty string), email (valid format).
 */
export const validateInitDonation = (
  req: Request,
  res: Response,
  next: NextFunction
): any => {
  const { amount, name, email } = req.body;

  if (amount === undefined || typeof amount !== 'number' || amount <= 0) {
    return res.status(400).json({ success: false, message: 'amount must be a positive number.' });
  }

  if (!name || typeof name !== 'string' || name.trim() === '') {
    return res.status(400).json({ success: false, message: 'name is required.' });
  }

  if (!email || typeof email !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ success: false, message: 'A valid email is required.' });
  }

  next();
};

```


---
## FILE: server/src/module/project/project.controller.ts

```ts
// server/src/module/project/project.controller.ts
import { Request, Response } from 'express';
import {
  createProject,
  getProjectsByUser,
  getProjectById,
  updateProject,
  deleteProject,
} from './project.service';

export const createProjectHandler = async (req: Request, res: Response): Promise<any> => {
  try {
    const { title, description, userId } = req.body;
    const project = await createProject({ title, description, userId });
    return res.status(201).json({ success: true, message: 'Project created.', data: project });
  } catch (err: any) {
    console.error('[ProjectController] createProject error:', err.message);
    return res.status(500).json({ success: false, message: err.message || 'Failed to create project.', data: null });
  }
};

export const getUserProjectsHandler = async (req: Request, res: Response): Promise<any> => {
  try {
    const { userId } = req.params;
    const projects = await getProjectsByUser(userId);
    return res.status(200).json({ success: true, message: `Found ${projects.length} project(s).`, data: projects });
  } catch (err: any) {
    console.error('[ProjectController] getUserProjects error:', err.message);
    return res.status(500).json({ success: false, message: err.message || 'Failed to list projects.', data: null });
  }
};

export const getProjectHandler = async (req: Request, res: Response): Promise<any> => {
  try {
    const { projectId } = req.params;
    const project = await getProjectById(projectId);
    if (!project) return res.status(404).json({ success: false, message: `Project ${projectId} not found.`, data: null });
    return res.status(200).json({ success: true, message: 'Project retrieved.', data: project });
  } catch (err: any) {
    console.error('[ProjectController] getProject error:', err.message);
    return res.status(500).json({ success: false, message: err.message || 'Failed to get project.', data: null });
  }
};

export const updateProjectHandler = async (req: Request, res: Response): Promise<any> => {
  try {
    const { projectId } = req.params;
    const { title, description } = req.body;
    const project = await updateProject(projectId, { title, description });
    return res.status(200).json({ success: true, message: 'Project updated.', data: project });
  } catch (err: any) {
    console.error('[ProjectController] updateProject error:', err.message);
    const code = err.message?.includes('not found') ? 404 : 500;
    return res.status(code).json({ success: false, message: err.message || 'Failed to update project.', data: null });
  }
};

export const deleteProjectHandler = async (req: Request, res: Response): Promise<any> => {
  try {
    const { projectId } = req.params;
    await deleteProject(projectId);
    return res.status(200).json({ success: true, message: `Project ${projectId} deleted.`, data: null });
  } catch (err: any) {
    console.error('[ProjectController] deleteProject error:', err.message);
    const code = err.message?.includes('not found') ? 404 : 500;
    return res.status(code).json({ success: false, message: err.message || 'Failed to delete project.', data: null });
  }
};

```


---
## FILE: server/src/module/project/project.interface.ts

```ts
// server/src/module/project/project.interface.ts

export interface ProjectData {
  id: string;
  title: string;
  description: string | null;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateProjectRequest {
  title: string;
  description?: string;
  userId: string;
}

export interface UpdateProjectRequest {
  title?: string;
  description?: string;
}

```


---
## FILE: server/src/module/project/project.route.ts

```ts
// server/src/module/project/project.route.ts
import { Router } from 'express';
import {
  createProjectHandler,
  getUserProjectsHandler,
  getProjectHandler,
  updateProjectHandler,
  deleteProjectHandler,
} from './project.controller';
import { validateCreateProject, validateUpdateProject } from './project.validation';

const projectRouter = Router();

// POST /api/projects — Create a new project
projectRouter.post('/', validateCreateProject, createProjectHandler);

// GET /api/projects/user/:userId — List all projects for a user
projectRouter.get('/user/:userId', getUserProjectsHandler);

// GET /api/projects/:projectId — Get a single project
projectRouter.get('/:projectId', getProjectHandler);

// PATCH /api/projects/:projectId — Update a project
projectRouter.patch('/:projectId', validateUpdateProject, updateProjectHandler);

// DELETE /api/projects/:projectId — Delete a project
projectRouter.delete('/:projectId', deleteProjectHandler);

export default projectRouter;

```


---
## FILE: server/src/module/project/project.service.ts

```ts
// server/src/module/project/project.service.ts
import { prisma } from '../../lib/prisma';
import { ProjectData, CreateProjectRequest, UpdateProjectRequest } from './project.interface';

export const createProject = async (data: CreateProjectRequest): Promise<ProjectData> => {
  console.log(`[ProjectService] Creating project for user=${data.userId}`);
  const project = await prisma.project.create({
    data: {
      title: data.title,
      description: data.description,
      userId: data.userId,
    },
  });
  console.log(`[ProjectService] Project created: ${project.id}`);
  return project;
};

export const getProjectsByUser = async (userId: string): Promise<ProjectData[]> => {
  console.log(`[ProjectService] Listing projects for user=${userId}`);
  return prisma.project.findMany({
    where: { userId },
    orderBy: { createdAt: 'desc' },
  });
};

export const getProjectById = async (projectId: string): Promise<ProjectData | null> => {
  console.log(`[ProjectService] Fetching project: ${projectId}`);
  return prisma.project.findUnique({ where: { id: projectId } });
};

export const updateProject = async (
  projectId: string,
  data: UpdateProjectRequest
): Promise<ProjectData> => {
  console.log(`[ProjectService] Updating project: ${projectId}`);
  return prisma.project.update({
    where: { id: projectId },
    data: { ...data, updatedAt: new Date() },
  });
};

export const deleteProject = async (projectId: string): Promise<void> => {
  console.log(`[ProjectService] Deleting project: ${projectId}`);
  await prisma.project.delete({ where: { id: projectId } });
  console.log(`[ProjectService] Project deleted: ${projectId}`);
};

```


---
## FILE: server/src/module/project/project.validation.ts

```ts
// server/src/module/project/project.validation.ts
import { Request, Response, NextFunction } from 'express';

export const validateCreateProject = (
  req: Request,
  res: Response,
  next: NextFunction
): any => {
  const { title, userId } = req.body;

  if (!title || typeof title !== 'string' || title.trim() === '') {
    return res.status(400).json({ success: false, message: 'title is required.' });
  }
  if (!userId || typeof userId !== 'string' || userId.trim() === '') {
    return res.status(400).json({ success: false, message: 'userId is required.' });
  }
  next();
};

export const validateUpdateProject = (
  req: Request,
  res: Response,
  next: NextFunction
): any => {
  const { title, description } = req.body;
  if (title !== undefined && (typeof title !== 'string' || title.trim() === '')) {
    return res.status(400).json({ success: false, message: 'title must be a non-empty string.' });
  }
  if (description !== undefined && typeof description !== 'string') {
    return res.status(400).json({ success: false, message: 'description must be a string.' });
  }
  next();
};

```


---
## FILE: server/src/module/recording/recording.controller.ts

```ts
import { Request, Response } from 'express';
import { RecordingService } from './recording.service';

export const RecordingController = {
  async uploadChunk(req: Request, res: Response) {
    try {
      const { trackId, chunkIndex } = req.body;
      const file = req.file;

      if (!trackId || chunkIndex === undefined || !file) {
        return res.status(400).json({ error: 'Missing trackId, chunkIndex, or file.' });
      }

      // We use the file path or destination as blobUrl
      const blobUrl = file.path;
      const parsedIndex = parseInt(chunkIndex, 10);

      const chunk = await RecordingService.saveChunk(trackId, parsedIndex, blobUrl);

      return res.status(200).json({
        success: true,
        message: 'Chunk uploaded successfully',
        chunk
      });
    } catch (error: any) {
      console.error('[Backend Error] Error uploading chunk:', error.message);
      // Handle Prisma unique constraint failure (P2002) quietly or with 409 Conflict
      if (error.code === 'P2002') {
         return res.status(409).json({ error: 'Chunk already exists.' });
      }
      return res.status(500).json({ error: 'Internal server error', details: error.message });
    }
  }
};

```


---
## FILE: server/src/module/recording/recording.route.ts

```ts
import { Router } from 'express';
import multer from 'multer';
import fs from 'fs';
import path from 'path';
import { RecordingController } from './recording.controller';

const router = Router();

// Ensure uploads directory exists
const uploadDir = path.join(process.cwd(), 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: function (_req, _file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, _file, cb) {
    const { trackId, chunkIndex } = req.body;
    cb(null, `${trackId}-chunk-${chunkIndex}-${Date.now()}.webm`);
  }
});

const upload = multer({ storage });

router.post('/upload-chunk', upload.single('blob'), RecordingController.uploadChunk);

export default router;

```


---
## FILE: server/src/module/recording/recording.service.ts

```ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const RecordingService = {
  async saveChunk(trackId: string, chunkIndex: number, blobUrl: string) {
    let track = await prisma.recording_track.findUnique({
      where: { id: trackId }
    });
    
    // For MVP prototype: auto-create the track, session, and studio if missing
    if (!track) {
      let studio = await prisma.studio.findFirst();
      if (!studio) {
        studio = await prisma.studio.create({ data: { name: 'Recora Studio' } });
      }
      
      let session = await prisma.recording_session.findFirst({ where: { studioId: studio.id } });
      if (!session) {
        session = await prisma.recording_session.create({ data: { studioId: studio.id } });
      }
      
      track = await prisma.recording_track.create({
        data: {
          id: trackId,
          recordingSessionId: session.id,
          type: 'video'
        }
      });
      console.log(`[Backend Debug] Created missing track ${trackId} for session ${session.id}`);
    }

    const chunk = await prisma.upload_chunk.create({
      data: {
        trackId,
        chunkIndex,
        blobUrl
      }
    });

    console.log(`[Backend] Received and verified chunk #${chunkIndex} for track ${trackId}.`);
    return chunk;
  }
};

```


---
## FILE: server/src/module/user/user.controller.ts

```ts
// File: src/module/user/user.controller.ts
// Placeholder: User Controller
export {};

```


---
## FILE: server/src/module/user/user.interface.ts

```ts
// File: src/module/user/user.interface.ts
// Placeholder: User Interface
export {};

```


---
## FILE: server/src/module/user/user.route.ts

```ts
// File: src/module/user/user.route.ts
import { Router } from 'express';

const userRouter = Router();

// Placeholder routes

export default userRouter;

```


---
## FILE: server/src/module/user/user.service.ts

```ts
// File: src/module/user/user.service.ts
// Placeholder: User Service
export {};

```


---
## FILE: server/src/module/user/user.validation.ts

```ts
// File: src/module/user/user.validation.ts
// Placeholder: User Validation
export {};

```


---
## FILE: server/src/routes/index.ts

```ts
// File: server/src/routes/index.ts
import { Router } from 'express';
import userRouter from '../module/user/user.route';
import authRouter from '../module/auth/auth.route';
import projectRouter from '../module/project/project.route';
import animationRouter from '../module/animation/animation.route';
import adminRouter from '../module/admin/admin.route';
import aiRouter from '../module/ai/ai.route';
import paymentRouter from '../module/payment/payment.route';
import recordingRouter from '../module/recording/recording.route';
import livekitRouter from '../module/livekit/livekit.route';

const routes = Router();

// Module Routes
routes.use('/users', userRouter);
routes.use('/auth', authRouter);
routes.use('/projects', projectRouter);
routes.use('/animations', animationRouter);
routes.use('/admin', adminRouter);
routes.use('/ai', aiRouter);
routes.use('/payment', paymentRouter);
routes.use('/recording', recordingRouter);
routes.use('/rooms', livekitRouter);

// Health check endpoint
routes.get('/health', (_req, res) => {
  res.status(200).json({ message: 'Server is running' });
});

export default routes;

```


---
## FILE: server/src/seed.admin.ts

```ts
import { auth } from "./lib/auth";
import { prisma } from "./lib/prisma";

async function seedAdmin() {
  const email = process.env.ADMIN_EMAIL || "admin@example.com";
  const password = process.env.ADMIN_PASSWORD || "admin123456";
  const name = process.env.ADMIN_NAME || "System Admin";

  console.log(`Checking if admin user (${email}) exists...`);

  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    if (existingUser.role !== "ADMIN") {
      await prisma.user.update({
        where: { email },
        data: { role: "ADMIN" },
      });
      console.log(`User ${email} found. Updated role to ADMIN.`);
    } else {
      console.log(`Admin user ${email} already exists. No action taken.`);
    }
    return;
  }

  console.log(`Creating new admin user: ${email}`);

  try {
    // We try using the better-auth API directly
    const result = await auth.api.signUpEmail({
      body: {
        email,
        password,
        name,
      },
    });

    if (result && result.user) {
      // Update role to ADMIN immediately after creation
      await prisma.user.update({
        where: { email },
        data: { role: "ADMIN" },
      });
      console.log(`Admin user created successfully!`);
      console.log(`Email: ${email}`);
      console.log(`Password: ${password}`);
    } else {
      console.error("Failed to create admin user using better-auth.", result);
    }
  } catch (error) {
    console.error("Error creating admin user. This might be due to better-auth requiring a request context.", error);
    console.log("Attempting manual creation...");
    
    // Better Auth uses scrypt by default (if 1.0) or bcrypt.
    // If auth.api.signUpEmail fails in CLI, the best way is to fetch the API if it's running.
    console.error("Please run the server and register this user manually, then manually set their role to ADMIN in the database, OR use the auth API directly via curl.");
  }
}

seedAdmin()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    process.exit(0);
  });

```


---
## FILE: server/src/server.ts

```ts
// server/src/server.ts
// Entry point for the backend server.
// Initializes the Express application and listens on 0.0.0.0 to ensure Docker compatibility.
import "dotenv/config";
import app from './app';
import config from './config/env';

const PORT = config.port || 5000;

app.listen(PORT as number, "0.0.0.0", () => {
  console.log(`Server is running on port ${PORT}`);
});

```


---
## FILE: server/src/utils/catchAsync.ts

```ts
// File: src/utils/catchAsync.ts
import { Request, Response, NextFunction } from 'express';

type AsyncRequestHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<any>;

const catchAsync =
  (fn: AsyncRequestHandler) =>
  (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };

export default catchAsync;

```


---
## FILE: server/src/utils/sendResponse.ts

```ts
// File: src/utils/sendResponse.ts
import { Response } from 'express';

interface SendResponseData<T> {
  statusCode: number;
  success: boolean;
  message?: string;
  data?: T;
}

const sendResponse = <T>(res: Response, data: SendResponseData<T>) => {
  return res.status(data.statusCode).json({
    success: data.success,
    message: data.message,
    data: data.data || null,
  });
};

export default sendResponse;

```


---
## FILE: server/tsconfig.json

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "commonjs",
    "lib": ["ES2020"],
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true,
    "declaration": true,
    "declarationMap": true,
    "sourceMap": true,
    "moduleResolution": "node",
    "allowSyntheticDefaultImports": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "strictFunctionTypes": true,
    "strictBindCallApply": true,
    "strictPropertyInitialization": true,
    "noImplicitThis": true,
    "alwaysStrict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true,
    "baseUrl": "./src",
    "paths": {
      "@/*": ["./*"]
    }
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist"]
}

```
