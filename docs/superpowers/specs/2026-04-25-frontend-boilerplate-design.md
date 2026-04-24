# Frontend Boilerplate Design Spec
**Date:** 2026-04-25  
**Project:** asdp-core-engine  
**Type:** Internal Dashboard / Admin Panel

---

## Context

This spec defines the complete frontend boilerplate for the ASDP Core Engine — an internal dashboard/admin panel. The boilerplate must be production-ready, self-hosted on Kubernetes, and serve as the authoritative starting point for all frontend development on this project. It encodes architectural decisions, folder conventions, data-layer patterns, security posture, and testing strategy so that future contributors start from a consistent, principled foundation.

---

## Tech Stack

| Concern | Library / Tool | Version |
|---|---|---|
| Framework | Next.js (App Router) | 16 (latest) |
| Styling | TailwindCSS | 4.x |
| Component Library | Shadcn UI | latest |
| State Management | Zustand | 5.x |
| Form Handling | React Hook Form + Valibot | latest |
| Data Fetching | TanStack React Query | 5.x |
| Table | TanStack Table | 8.x |
| i18n | i18n | latest |
| Theming | next-themes | latest |
| Unit/Integration Tests | Vitest + Testing Library + MSW | latest |
| E2E Tests | Playwright | latest |
| Deployment | Docker (standalone) + Kubernetes | — |
| Package Manager | pnpm | 9.x |

---

## Architecture: Layered Hybrid

Two distinct organizational layers:

1. **Shared UI Library** (`src/components/`) — domain-agnostic, follows strict Atomic Design hierarchy
2. **Domain Modules** (`src/modules/`) — self-contained feature units with co-located logic
3. **App Router Pages** (`src/app/`) — thin composers; no business logic

**Core principles:** YAGNI → DRY → KISS. No cross-module imports. No business logic in pages.

---

## Folder Structure

```
asdp-core-engine/
├── src/
│   ├── app/                          # Next.js App Router
│   │   ├── (auth)/                   # Route group: unauthenticated pages
│   │   │   └── login/page.tsx
│   │   ├── (dashboard)/              # Route group: auth-gated dashboard
│   │   │   ├── layout.tsx            # Dashboard shell (sidebar, navbar)
│   │   │   ├── page.tsx              # Dashboard home
│   │   │   ├── users/                # Example: users module route
│   │   │   ├── reports/              # Example: reports module route
│   │   │   └── settings/             # Example: settings module route
│   │   ├── api/
│   │   │   └── health/
│   │   │       ├── live/route.ts     # K8s liveness probe
│   │   │       └── ready/route.ts    # K8s readiness probe
│   │   ├── globals.css
│   │   ├── layout.tsx                # Root layout (providers, fonts, i18n)
│   │   └── not-found.tsx
│   │
│   ├── components/                   # Shared UI Library (Atomic Design)
│   │   ├── atoms/                    # Primitives: Button, Badge, Avatar, Spinner, Icon
│   │   │   └── __tests__/
│   │   ├── molecules/                # Composed atoms: FormField, SearchBar, StatCard, ThemeToggle
│   │   │   └── __tests__/
│   │   ├── organisms/                # Complex UI: DataTable, Sidebar, Navbar, PageHeader, ModalDialog
│   │   │   └── __tests__/
│   │   ├── templates/                # Page shells: DashboardShell, AuthLayout
│   │   │   └── __tests__/
│   │   └── ui/                       # Shadcn-generated output (never edited manually)
│   │
│   ├── modules/                      # Domain Feature Modules
│   │   └── [feature]/
│   │       ├── components/
│   │       │   └── __tests__/
│   │       ├── hooks/
│   │       │   └── __tests__/
│   │       ├── actions/              # Server Actions ('use server')
│   │       │   └── __tests__/
│   │       ├── queries/              # TanStack Query queryOptions + mutation fns
│   │       │   └── __tests__/
│   │       ├── store/                # Zustand slice for this feature
│   │       │   └── __tests__/
│   │       ├── schemas/              # Valibot validation schemas
│   │       │   └── __tests__/
│   │       └── types/                # Feature-specific TypeScript types
│   │
│   ├── lib/                          # Infrastructure (no UI, no domain logic)
│   │   ├── auth/                     # Auth abstraction (swappable adapter)
│   │   ├── api/                      # Typed fetch wrapper (get<T>, post<T>)
│   │   ├── query/                    # TanStack Query client config + provider
│   │   ├── i18n/                     # i18n config, locale loader, helpers
│   │   ├── env.ts                    # Valibot-validated env schema (fail-fast)
│   │   └── security/                 # Security header definitions
│   │
│   ├── store/                        # Global Zustand stores
│   │   ├── ui.store.ts               # Theme, sidebar open/close, modal state
│   │   └── auth.store.ts             # Auth session client state
│   │
│   ├── hooks/                        # Global custom hooks
│   ├── types/                        # Global TypeScript types & interfaces
│   └── middleware.ts                 # Auth guard + i18n locale routing (Edge Runtime)
│
├── messages/
│   ├── en.json                       # English strings (namespaced by module)
│   └── id.json                       # Indonesian strings (default locale)
│
├── public/
├── tests/
│   ├── integration/                  # Cross-module integration tests (Vitest + MSW)
│   └── e2e/                          # Playwright E2E specs
│
├── .env.example                      # All required vars documented, no secrets
├── Dockerfile                        # Multi-stage (deps → builder → runner)
├── next.config.ts
├── tailwind.config.ts
├── vitest.config.ts
└── playwright.config.ts
```

---

## Component Architecture

### Atomic Design Layers

| Layer | Examples | Default Rendering | Rule |
|---|---|---|---|
| **Atoms** | Button, Badge, Avatar, Spinner | Server Component | No domain knowledge, no internal state |
| **Molecules** | FormField, SearchBar, StatCard, ThemeToggle | Mixed (SC unless interactive) | Composed atoms, minimal logic |
| **Organisms** | DataTable, Sidebar, Navbar, FilterPanel | Client Component | May have local state; interactive |
| **Templates** | DashboardShell, AuthLayout | Server Component | Layout slots only; no data fetching |
| **ui/** | Shadcn output | — | Never edited directly |

### Server / Client Boundary

- Default to Server Components. Add `'use client'` only when needed.
- `'use client'` is pushed to the **leaf node** — never hoisted to a parent that could stay server-rendered.
- Client Components: anything using `useState`, `useEffect`, browser APIs, TanStack Query hooks, Zustand, or React Hook Form.

### Suspense Strategy

- Every async Server Component wrapped in `<Suspense fallback={<ComponentSkeleton />}>`.
- Page-level Suspense boundary for full-page loading states.
- Independent data sections get their own Suspense boundaries (avoids waterfall).
- TanStack Query SSR: server prefetches via `prefetchQuery()` → `dehydrate()` → `HydrationBoundary` → client `useQuery()` hydrates instantly.
- Skeleton components named `[Component]Skeleton`, live in `components/atoms/`.

---

## Data Layer

### Flow Summary

**Reads (SSR-first):**
```
Server Component → prefetchQuery() → dehydrate() → HydrationBoundary
  └─ Client Component → useQuery() (hydrated, no loading flash)
     Fallback: direct async fetch in Server Component wrapped in <Suspense>
```

**Mutations (Server Action-first):**
```
React Hook Form (Valibot resolver)
  └─ handleSubmit()
       ├─ Server Action → validate (Valibot) → call API → revalidateTag()
       └─ useMutation() → invalidateQueries() → optimistic update (where safe)
```

### Layer Responsibilities

**`lib/api/`** — Typed `fetch` wrapper. Base URL, auth header injection, typed `get<T>` / `post<T>` / `patch<T>` / `delete<T>`, normalised `ApiError`. Works server-side and client-side.

**`modules/[feature]/queries/`** — Query key factory (strongly typed, stable). `queryOptions()` objects shared between server prefetch and client `useQuery`. Mutation functions co-located. No UI logic, no Zustand access.

**`modules/[feature]/actions/`** — `'use server'` mutation entry points. Re-validate with Valibot before touching API. Return typed `ActionResult<T> = { success: true; data: T } | { success: false; errors: FieldErrors }`. Call `revalidateTag()` to bust cache.

**`modules/[feature]/store/`** — UI state only (selected rows, open panels, active filters). Never caches server data. Slice pattern composed in `store/` root. Persisted slices use `zustand/middleware/persist`.

### Form Handling

- Valibot schema in `modules/[feature]/schemas/` — single source of truth.
- React Hook Form uses `valibotResolver(schema)` — client-side validation before submit.
- Server Action re-validates same schema — never trust client input.
- Typed error flow: `ValiError` → `ActionResult.errors` → RHF `setError()`.

---

## Security

### HTTP Security Headers (`lib/security/headers.ts` → `next.config.ts`)

| Header | Value |
|---|---|
| `Content-Security-Policy` | `script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob:; default-src 'self'` |
| `X-Frame-Options` | `DENY` |
| `X-Content-Type-Options` | `nosniff` |
| `Referrer-Policy` | `strict-origin-when-cross-origin` |
| `Permissions-Policy` | `camera=(), microphone=(), geolocation=()` |
| `Strict-Transport-Security` | `max-age=63072000; includeSubDomains; preload` |
| `X-DNS-Prefetch-Control` | `on` |
| `X-Powered-By` | removed (`poweredByHeader: false`) |

CSP nonce via middleware for any necessary inline scripts.

### Auth Middleware (`src/middleware.ts`)

- Runs on Edge Runtime.
- Guards `(dashboard)` route group.
- Auth adapter interface: `validateSession(token: string): Promise<Session | null>` — swap NextAuth / custom JWT / session cookie without touching middleware.
- Unauthenticated → redirect to `/login?callbackUrl=<original>`.
- Authenticated on auth pages → redirect to `/`.
- Locale detection: reads `Accept-Language` header and locale cookie, sets resolved locale in a request header for downstream use.

---

## Internationalization (i18n)

- **Package:** `i18n` (npm) — lightweight Node.js i18n module configured in `lib/i18n/`.
- **Locales:** `id` (Indonesian, default) and `en` (English).
- **Locale files:** `messages/id.json` and `messages/en.json`, namespaced by module (`users.title`, `common.save`). `i18n` is configured to load from the `messages/` directory.
- **Locale resolution:** middleware reads `NEXT_LOCALE` cookie → `Accept-Language` header → falls back to `id`. Resolved locale is forwarded via a custom request header (`x-locale`) to Server Components.
- **Server Components:** call `getI18n(locale)` from `lib/i18n/` which returns a typed `t(key)` helper backed by the `i18n` instance.
- **Client Components:** receive pre-translated strings as props from the nearest Server Component parent — avoids exposing the Node.js `i18n` module to the browser bundle.
- **Locale switcher:** a Client Component that writes to the `NEXT_LOCALE` cookie and triggers a router refresh; no full page reload required.
- **Route strategy:** locale is not encoded in the URL path — resolved via cookie/header only. Simpler than prefix routing and avoids URL changes on locale switch.

---

## Theming (next-themes + Shadcn)

- `ThemeProvider` wraps root layout, `attribute="class"`, `defaultTheme="system"`.
- Tailwind `darkMode: 'class'`.
- Shadcn CSS variables in `globals.css`: `:root` (light tokens) and `.dark` (dark tokens).
- Theme toggle: `components/molecules/ThemeToggle.tsx` — Client Component, calls `setTheme()`.
- `suppressHydrationWarning` on `<html>` to prevent hydration mismatch flash.

---

## Testing Strategy

### Test Placement Convention

All unit tests live in a `__tests__/` subdirectory within their source folder — never as sibling files.

```
src/components/atoms/
  ├── __tests__/
  │   └── Button.test.tsx
  └── Button.tsx

src/modules/users/components/
  ├── __tests__/
  │   └── UserTable.test.tsx
  └── UserTable.tsx

src/app/(dashboard)/users/
  ├── __tests__/
  │   └── page.test.tsx
  └── page.tsx
```

### Test Layers

| Layer | Tool | Location | Scope |
|---|---|---|---|
| **Unit** | Vitest | `src/**/__tests__/*.test.{ts,tsx}` | Components, hooks, schemas, utils, stores |
| **Integration** | Vitest + Testing Library + MSW | `tests/integration/` | Cross-module flows, form→action mocks |
| **E2E** | Playwright | `tests/e2e/` | Critical journeys, auth guards, i18n, dark mode |

### Vitest Config

- Include patterns: `src/**/__tests__/*.test.{ts,tsx}` and `tests/integration/**/*.test.tsx`
- Environment: `jsdom` for component tests, `node` for pure logic
- Path aliases mirrored from `tsconfig.json`
- Global setup: MSW server start/reset/stop
- Coverage: `@vitest/coverage-v8`

### Playwright Config

- Base URL: `http://localhost:3000`
- CI browsers: Chromium; local: + Firefox, WebKit
- Auth state fixture: login once per worker, reuse session cookie
- Screenshots and traces on failure

---

## Docker & Kubernetes Deployment

### next.config.ts

```ts
output: 'standalone'       // self-contained Node.js server
poweredByHeader: false     // don't leak framework info
compress: true             // gzip (or delegate to ingress)
```

### Dockerfile (Multi-stage)

```
Stage 1 — deps:     node:22-alpine, pnpm install --frozen-lockfile
Stage 2 — builder:  pnpm build (standalone + static output)
Stage 3 — runner:   minimal node:22-alpine, non-root user, EXPOSE 3000, CMD ["node","server.js"]
```

Final image ~120MB. No devDependencies, no build cache.

### K8s Health Probes

| Route | Type | Behaviour |
|---|---|---|
| `GET /api/health/live` | Liveness | Returns `200 { status: 'ok' }` if process alive. K8s restarts pod on failure. No external checks. |
| `GET /api/health/ready` | Readiness | Checks downstream API reachability. Returns `503` if dependencies unavailable. K8s stops traffic on failure. |

### Environment Variables

- `.env.example` committed — documents every required var with description.
- `NEXT_PUBLIC_*` — client-safe vars (API base URL, public feature flags).
- Secrets injected at runtime via K8s Secret → pod env.
- `lib/env.ts` — Valibot schema validates all env vars at startup; process exits immediately on missing required vars.
- `.env.local` is gitignored; developers copy from `.env.example`.

---

## Verification Checklist

After scaffolding the boilerplate:

- [ ] `pnpm dev` starts without errors on `localhost:3000`
- [ ] `/login` renders, redirects authenticated user to `/`
- [ ] `/dashboard` redirects unauthenticated user to `/login?callbackUrl=%2Fdashboard`
- [ ] Theme toggle switches light ↔ dark, persists across reload
- [ ] Locale switcher changes UI language (en ↔ id), persists in cookie
- [ ] `pnpm build` succeeds with `output: 'standalone'`
- [ ] `docker build` produces a runnable image; `docker run -p 3000:3000` serves the app
- [ ] `GET /api/health/live` returns `200`
- [ ] `GET /api/health/ready` returns `200` (or `503` with dependencies down)
- [ ] `pnpm test` (Vitest) passes all unit + integration tests
- [ ] `pnpm test:e2e` (Playwright) passes auth guard + i18n + dark mode specs
- [ ] Security headers visible in browser DevTools Network tab
- [ ] No `console.error` hydration warnings in browser
