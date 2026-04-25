# ASDP Core Engine

Production-ready Next.js 16 admin dashboard boilerplate for internal tools, self-hosted on Kubernetes. Includes a complete in-app component documentation system with live previews and bilingual (EN/ID) support.

## Tech Stack

| Category        | Library                                                                                                                                            |
| --------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| Framework       | [Next.js 16](https://nextjs.org/) — App Router, Server Actions, Turbopack                                                                          |
| Styling         | [Tailwind CSS 4](https://tailwindcss.com/) + [shadcn/ui](https://ui.shadcn.com/) (54 components)                                                   |
| Server state    | [TanStack Query 5](https://tanstack.com/query) with SSR prefetch + HydrationBoundary                                                               |
| Tables          | [TanStack Table 8](https://tanstack.com/table)                                                                                                     |
| Forms           | [React Hook Form 7](https://react-hook-form.com/) + [Valibot](https://valibot.dev/)                                                                |
| UI state        | [Zustand 5](https://zustand-demo.pmnd.rs/)                                                                                                         |
| Theming         | [next-themes](https://github.com/pacocoursey/next-themes) (light / dark / system)                                                                  |
| i18n            | Custom hook-based — Indonesian (default) + English                                                                                                  |
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

Open [http://localhost:3000](http://localhost:3000) to see the navigation hub. From there you can navigate to the Dashboard, Users page, or Component Docs.

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

## Routes

| Route           | Description                                                                 |
| --------------- | --------------------------------------------------------------------------- |
| `/`             | Navigation hub — links to Dashboard, Users, and Component Docs              |
| `/dashboard`    | Admin dashboard with stat cards                                             |
| `/users`        | Example feature module — DataTable with user management                     |
| `/login`        | Authentication page                                                         |
| `/docs/ui`      | Component documentation index — searchable grid of all 63 documented components |
| `/docs/ui/[name]` | Individual component page — live previews, code snippets, API reference  |

## Project Structure

```
src/
├── app/                        # Next.js App Router pages
│   ├── (auth)/                 # Route group: unauthenticated pages
│   │   └── login/              # Login page
│   ├── (dashboard)/            # Route group: protected pages (shared Navbar + Sidebar)
│   │   ├── layout.tsx          # Wraps DashboardShell (Navbar + Sidebar)
│   │   ├── dashboard/          # Dashboard home (stat cards)
│   │   ├── users/              # Users list page (SSR prefetch + DataTable)
│   │   └── docs/               # Component documentation system
│   │       ├── _components/    # Doc infrastructure (CodeBlock, ComponentPreview, PropsTable, etc.)
│   │       └── ui/             # 63 component documentation pages
│   │           ├── layout.tsx  # Docs layout with component sidebar
│   │           ├── page.tsx    # Searchable component index
│   │           ├── button/     # Button primitive docs
│   │           ├── dialog/     # Dialog docs
│   │           └── ...         # 61 more component pages
│   ├── api/health/             # K8s health probes (live + ready)
│   ├── layout.tsx              # Root layout: ThemeProvider + QueryProvider
│   ├── page.tsx                # Navigation hub (landing page)
│   └── globals.css             # Tailwind + shadcn design tokens (light/dark)
│
├── components/                 # Shared UI library (Atomic Design)
│   ├── ui/                     # 54 shadcn/ui primitives — DO NOT edit manually
│   ├── atoms/                  # Smallest units: Button (loading), Spinner, Skeleton, Badge, Avatar
│   ├── molecules/              # Composed atoms: FormField, ThemeToggle, StatCard, LocaleSwitcher
│   ├── organisms/              # Complex sections: DataTable, Navbar, Sidebar, PageHeader
│   └── templates/              # Shell layouts: DashboardShell, DashboardContent, AuthLayout
│
├── modules/                    # Domain modules — one folder per business feature
│   └── users/
│       ├── types/              # TypeScript types (User, UserRole)
│       ├── schemas/            # Valibot validation schemas
│       ├── queries/            # TanStack Query queryOptions
│       ├── actions/            # Server Actions (create, update, delete)
│       ├── data/               # Dummy/seed data
│       └── components/         # UserTable.tsx — domain-specific UI
│
├── lib/                        # Framework-level utilities
│   ├── api/                    # Typed fetch wrapper (api.get / api.post / api.patch / api.delete)
│   ├── auth/                   # AuthAdapter interface + stub implementation
│   ├── i18n/                   # i18n setup, useTranslation hook, Locale type
│   ├── query/                  # TanStack Query client + QueryProvider
│   ├── security/               # HTTP security headers config
│   └── env.ts                  # Valibot env schema — fails fast if vars are invalid
│
├── hooks/                      # Shared React hooks
│   └── use-mobile.ts           # Mobile breakpoint detection
│
├── store/                      # Global Zustand stores
│   ├── ui.store.ts             # Sidebar state, locale preference
│   └── auth.store.ts           # Client-side session cache
│
├── locales/messages/
│   ├── en.json                 # English translations (~300 keys)
│   └── id.json                 # Indonesian translations (~300 keys)
│
└── proxy.ts                    # Next.js 16 Proxy: auth guard + locale resolution

tests/
├── e2e/                        # Playwright E2E specs
└── setup/                      # Vitest global setup (MSW server)
```

## Component Documentation

The boilerplate includes an in-app documentation system at `/docs/ui` modeled after [shadcn/ui's component docs](https://ui.shadcn.com/docs/components). It documents all **63 components** (54 shadcn primitives + 9 custom).

Each component page includes:

- **When to Use** — guidance on when and why to pick this component
- **Usage** — copy-pasteable import statement
- **Composition** — tree diagram for compound components (Card, Dialog, etc.)
- **Examples** — live previews with complete, copy-pasteable code snippets
- **API Reference** — props table per sub-component

The docs support both light/dark themes and EN/ID language switching via the shared Navbar.

### shadcn/ui Primitives (54)

Accordion, Alert, Alert Dialog, Aspect Ratio, Avatar, Badge, Breadcrumb, Button, Button Group, Calendar, Card, Carousel, Chart, Checkbox, Collapsible, Combobox, Command, Context Menu, Dialog, Direction, Drawer, Dropdown Menu, Empty, Field, Hover Card, Input, Input Group, Input OTP, Item, Kbd, Label, Menubar, Native Select, Navigation Menu, Pagination, Popover, Progress, Radio Group, Resizable, Scroll Area, Select, Separator, Sheet, Sidebar, Skeleton, Slider, Sonner, Switch, Table, Tabs, Textarea, Toggle, Toggle Group, Tooltip

### Custom Components (9)

| Component        | Layer    | What it adds                                              |
| ---------------- | -------- | --------------------------------------------------------- |
| Button (Atom)    | Atom     | Wraps primitive with `loading` prop + auto-disable + ref  |
| Spinner          | Atom     | Animated loading indicator (sm/md/lg)                     |
| Skeleton         | Atom     | Placeholder loading shapes                                |
| FormField        | Molecule | Label + Input + error text with ARIA attributes           |
| StatCard         | Molecule | Metric card (title, value, description, icon)             |
| ThemeToggle      | Molecule | Light/dark toggle via next-themes                         |
| LocaleSwitcher   | Molecule | ID/EN locale toggle via Zustand                           |
| DataTable        | Organism | TanStack Table + pagination + i18n                        |
| PageHeader       | Organism | Page title + description + action buttons                 |

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
- **Every Server Action re-validates with Valibot** on the server side before touching the API.

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
- No URL prefix (`/en/`, `/id/`) — locale travels via cookie and Zustand store

Translation files are in `src/locales/messages/`. Keys are namespaced:

```json
{
  "common": { "save": "Save" },
  "auth":   { "login": "Login" },
  "users":  { "title": "Users" },
  "nav":    { "dashboard": "Dashboard", "docs": "Component Docs" },
  "docs":   { "components": "Components", "whenToUse": "When to Use", ... }
}
```

In Client Components, use the `useTranslation` hook:

```ts
import { useTranslation } from '@/lib/i18n/useTranslation'

const { t } = useTranslation()
t('docs.button.desc') // returns translated string based on active locale
```

## Adding a New Feature

1. **Create the module:**
   ```
   src/modules/ships/
     types/index.ts
     schemas/ship.schema.ts
     queries/index.ts
     actions/index.ts
     components/ShipTable.tsx
   ```

2. **Add the page** at `src/app/(dashboard)/ships/page.tsx`. Prefetch with `queryClient.prefetchQuery`, wrap in `HydrationBoundary`, render the module's view component.

3. **Add the nav link** in `src/components/organisms/Sidebar.tsx`.

4. **Add translations** to both `en.json` and `id.json`.

5. **Write tests** in `__tests__/` subdirectory alongside the source file.

## Adding shadcn Components

shadcn components are generated into `src/components/ui/` — never edit those files by hand.

```bash
npx shadcn@latest add <component-name>
```

After adding, create a documentation page at `src/app/(dashboard)/docs/ui/<name>/page.tsx` following the existing pattern, add the component to the `DocsSidebar`, and add translation keys to both locale files.

## Testing

Unit and integration tests use Vitest + Testing Library. E2E tests use Playwright.

```bash
pnpm test           # Unit tests
pnpm test:coverage  # With coverage
pnpm test:e2e       # E2E (start dev server first: pnpm dev)
```

**Test file placement:** all test files go in a `__tests__/` subdirectory next to the source folder they test.

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

The Dockerfile uses a multi-stage build (deps → builder → runner) with `node:22-alpine`. Final image is ~120 MB.

### Kubernetes

| Endpoint                | Type      | Behavior                                                      |
| ----------------------- | --------- | ------------------------------------------------------------- |
| `GET /api/health/live`  | Liveness  | Always returns `200 { status: "ok" }`                         |
| `GET /api/health/ready` | Readiness | Returns `200` when upstream API is reachable, `503` otherwise |

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

Set `NEXT_PUBLIC_API_URL` via a Kubernetes Secret mounted as an environment variable.
