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
