# ASDP Core Engine

Production-ready Next.js 16 admin dashboard boilerplate for internal tools, self-hosted on Kubernetes.

## Tech Stack

| Category        | Library                                                                                                                                            |
| --------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| Framework       | [Next.js 16](https://nextjs.org/) — App Router, Server Actions, Turbopack                                                                          |
| Styling         | [Tailwind CSS 4](https://tailwindcss.com/) + [Shadcn UI](https://ui.shadcn.com/)                                                                   |
| Server state    | [TanStack Query 5](https://tanstack.com/query) with SSR prefetch + HydrationBoundary                                                               |
| Tables          | [TanStack Table 8](https://tanstack.com/table)                                                                                                     |
| Forms           | [React Hook Form 7](https://react-hook-form.com/) + [Valibot](https://valibot.dev/)                                                                |
| UI state        | [Zustand 5](https://zustand-demo.pmnd.rs/)                                                                                                         |
| Theming         | [next-themes](https://github.com/pacocoursey/next-themes) (light / dark / system)                                                                  |
| i18n            | [i18n](https://www.npmjs.com/package/i18n) — Indonesian (default) + English                                                                        |
| Testing         | [Vitest](https://vitest.dev/) + [Testing Library](https://testing-library.com/) + [MSW](https://mswjs.io/) + [Playwright](https://playwright.dev/) |
| Deployment      | Docker multi-stage + Kubernetes (standalone output)                                                                                                |
| Package manager | [pnpm 9](https://pnpm.io/)                                                                                                                         |

## Prerequisites

- **Node.js** ≥ 22 ([download](https://nodejs.org/))
- **pnpm** ≥ 9 — install with `npm i -g pnpm`
- A running backend API (see [Environment Variables](#environment-variables))

## Getting Started

```bash
# 1. Clone
git clone https://github.com/aryario/asdp-backbone.git
cd asdp-core-engine

# 2. Install dependencies
pnpm install

# 3. Set up environment
cp .env.example .env.local
# Edit .env.local — set NEXT_PUBLIC_API_URL to your backend URL

# 4. Start dev server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000). Visiting `/dashboard` redirects to `/login` — that is expected (auth guard is active).

## Environment Variables

Copy `.env.example` to `.env.local` and fill in the values. `.env.local` is gitignored — never commit it.

| Variable              | Required | Description                                                    |
| --------------------- | -------- | -------------------------------------------------------------- |
| `NEXT_PUBLIC_API_URL` | Yes      | Base URL of the backend REST API, e.g. `http://localhost:8080` |
| `NODE_ENV`            | Auto     | Set automatically by Next.js (`development` / `production`)    |

The app fails fast on startup if `NEXT_PUBLIC_API_URL` is missing or not a valid URL (`src/lib/env.ts`).

## Scripts

```bash
pnpm dev            # Start development server (Turbopack)
pnpm build          # Production build
pnpm start          # Start production server
pnpm lint           # ESLint check
pnpm lint:fix       # ESLint auto-fix
pnpm format         # Prettier format
pnpm test           # Run unit tests (Vitest)
pnpm test:watch     # Run unit tests in watch mode
pnpm test:coverage  # Run unit tests with coverage report
pnpm test:e2e       # Run E2E tests (Playwright, requires running server)
pnpm test:e2e:ui    # Open Playwright UI runner
```

## Project Structure

```
src/
├── app/                        # Next.js App Router pages (thin layer — no business logic)
│   ├── (auth)/                 # Route group: unauthenticated pages
│   │   └── login/              # Login page + Server Action + Valibot schema
│   ├── (dashboard)/            # Route group: protected pages
│   │   ├── layout.tsx          # Reads x-locale header, wraps DashboardShell
│   │   ├── page.tsx            # Dashboard home (stat cards)
│   │   └── users/              # Users list page (SSR prefetch + HydrationBoundary)
│   ├── api/
│   │   └── health/
│   │       ├── live/route.ts   # GET /api/health/live  — K8s liveness probe
│   │       └── ready/route.ts  # GET /api/health/ready — K8s readiness probe
│   ├── layout.tsx              # Root layout: ThemeProvider + QueryProvider + Inter font
│   └── globals.css             # Tailwind base styles
│
├── components/                 # Shared UI library (Atomic Design — no business logic)
│   ├── ui/                     # Shadcn primitives — DO NOT edit manually
│   ├── atoms/                  # Smallest reusable units: Button, Spinner, Skeleton, Badge, Avatar
│   ├── molecules/              # Composed atoms: FormField, ThemeToggle, StatCard, LocaleSwitcher
│   ├── organisms/              # Complex sections: DataTable, Navbar, Sidebar, PageHeader
│   └── templates/              # Page-level shell layouts: DashboardShell, AuthLayout
│
├── modules/                    # Domain modules — one folder per business feature
│   └── users/
│       ├── types/              # TypeScript types (User, UserRole)
│       ├── schemas/            # Valibot validation schemas
│       ├── queries/            # TanStack Query queryOptions
│       ├── actions/            # Server Actions (create, update, delete)
│       ├── store/              # Zustand slice (UI state only)
│       ├── hooks/              # useUsers() — combines query + store
│       └── components/         # UserTable.tsx — domain-specific UI
│
├── lib/                        # Framework-level utilities (no business logic)
│   ├── api/                    # Typed fetch wrapper (api.get / api.post / api.patch / api.delete)
│   ├── auth/                   # AuthAdapter interface + stub implementation
│   ├── i18n/                   # i18n setup, getI18n(locale), Locale type
│   ├── query/                  # TanStack Query client + QueryProvider
│   ├── security/               # HTTP security headers config
│   └── env.ts                  # Valibot env schema — fails fast if vars are invalid
│
├── store/                      # Global Zustand stores
│   ├── ui.store.ts             # Sidebar open state, theme preference (persisted)
│   └── auth.store.ts           # Client-side session cache
│
├── locales/
│   └── messages/
│       ├── en.json             # English translations
│       └── id.json             # Indonesian translations (default locale)
│
└── proxy.ts                    # Next.js 16 Proxy (replaces middleware): auth guard + locale resolution

tests/
├── e2e/                        # Playwright E2E specs
└── setup/                      # Vitest global setup (MSW server)
```

## Architecture

### Layered Hybrid

The app uses a **Layered Hybrid** architecture: Atomic Design for the shared UI library, domain modules for feature code.

```
App Router pages  →  thin wiring only, no business logic
       ↓
   modules/       →  all feature code lives here (types, queries, actions, stores, components)
       ↓
  components/     →  shared UI that works for any domain
       ↓
     lib/         →  framework utilities (API client, auth, i18n, query)
```

### Key rules

- **Pages are thin.** A page file does SSR prefetch and renders a module's view component — nothing more.
- **`'use client'` goes at the leaf.** Server Components by default; push the boundary as far down as possible.
- **Modules are isolated.** `modules/users/` cannot import from `modules/reports/`. Cross-domain data goes through the API.
- **`components/` is domain-agnostic.** If you find yourself importing a `User` type inside `components/`, move that component into the module.
- **TanStack Query owns server state. Zustand owns UI state.** Never cache API data in Zustand.
- **Every Server Action re-validates with Valibot** on the server side before touching the API, regardless of client-side validation.

## Authentication

Auth uses a swappable `AuthAdapter` interface (`src/lib/auth/types.ts`):

```ts
interface AuthAdapter {
  validateSession(token: string): Promise<Session | null>
  getToken(request: Request): string | null
}
```

The default implementation is a stub that always returns `null` (no session). To wire up real auth:

1. Implement `AuthAdapter` for your auth provider (JWT, session cookie, etc.)
2. Call `setAuthAdapter(yourAdapter)` at startup (e.g. in `instrumentation.ts`)

The `proxy.ts` file guards `/dashboard/*` and redirects unauthenticated requests to `/login?callbackUrl=<path>`.

## Internationalization

- Default locale: **Indonesian (`id`)**
- Supported locales: `id`, `en`
- Locale resolution order: `NEXT_LOCALE` cookie → `Accept-Language` header → default `id`
- No URL prefix (`/en/`, `/id/`) — locale travels via cookie and `x-locale` header

Translation files are in `src/locales/messages/`. Keys are namespaced:

```json
{
  "common": { "save": "Save" },
  "auth":   { "login": "Login" },
  "users":  { "title": "Users" },
  "nav":    { "dashboard": "Dashboard" }
}
```

In Server Components, use `getI18n(locale)` from `src/lib/i18n`. Pass translated strings as props to Client Components — never call `getI18n` inside a Client Component.

## Adding a New Feature

1. **Create the module:**
   ```
   src/modules/ships/
     types/index.ts
     schemas/ship.schema.ts
     queries/index.ts
     actions/index.ts
     hooks/useShips.ts
     components/ShipTable.tsx
   ```

2. **Add the page** at `src/app/(dashboard)/ships/page.tsx`. Prefetch with `queryClient.prefetchQuery`, wrap in `HydrationBoundary`, render the module's view component.

3. **Add the nav link** in `src/components/organisms/Sidebar.tsx`.

4. **Add translations** to both `en.json` and `id.json`.

5. **Write tests** in `__tests__/` subdirectory alongside the source file (e.g. `modules/ships/schemas/__tests__/ship.schema.test.ts`).

## Testing

Unit and integration tests use Vitest + Testing Library. E2E tests use Playwright.

```bash
# Unit tests
pnpm test

# With coverage
pnpm test:coverage

# E2E (start the dev server first: pnpm dev)
pnpm test:e2e
```

**Test file placement rule:** all test files go in a `__tests__/` subdirectory next to the source folder they test — never as sibling files.

```
src/components/atoms/Button.tsx
src/components/atoms/__tests__/Button.test.tsx   ✓
src/components/atoms/Button.test.tsx             ✗
```

## Deployment

### Docker

```bash
docker build -t asdp-core-engine .
docker run -p 3000:3000 -e NEXT_PUBLIC_API_URL=http://your-api asdp-core-engine
```

The Dockerfile uses a multi-stage build (deps → builder → runner) with `node:22-alpine` and a non-root user. Final image is ~120 MB.

### Kubernetes

The app exposes two health probe endpoints:

| Endpoint                | Type      | Behavior                                                      |
| ----------------------- | --------- | ------------------------------------------------------------- |
| `GET /api/health/live`  | Liveness  | Always returns `200 { status: "ok" }`                         |
| `GET /api/health/ready` | Readiness | Returns `200` when upstream API is reachable, `503` otherwise |

Example probe config:

```yaml
livenessProbe:
  httpGet:
    path: /api/health/live
    port: 3000
  initialDelaySeconds: 10
readinessProbe:
  httpGet:
    path: /api/health/ready
    port: 3000
  initialDelaySeconds: 5
```

Set `NEXT_PUBLIC_API_URL` via a Kubernetes Secret mounted as an environment variable. Never bake secrets into the image.

## Adding Shadcn Components

Shadcn components are generated into `src/components/ui/` — never edit those files by hand as they will be overwritten.

```bash
pnpm dlx shadcn@latest add <component-name>
# e.g.
pnpm dlx shadcn@latest add dialog
pnpm dlx shadcn@latest add calendar
```

After adding, import from `@/components/ui/<component>` or wrap it in an atom if you need custom props.
