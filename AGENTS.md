# ASDP Core Engine — Engineering Standards

## Project Overview

ASDP Core Engine — internal dashboard/admin panel for managing ASDP port operations (vessel schedules, orders, billing, and payments) for ship owners, port operators, and administrators.

## Technology Stack

| Layer           | Technology                                                   |
| --------------- | ------------------------------------------------------------ |
| Frontend        | Next.js 16, React 19, TypeScript strict                      |
| Styling         | TailwindCSS 4, Shadcn UI (Base UI), class-variance-authority |
| State           | Zustand 5 (persisted), TanStack React Query 5                |
| Forms           | React Hook Form 7 + Valibot                                  |
| Tables          | TanStack Table 8                                             |
| i18n            | Custom JSON-based (en/id), Zustand-driven locale switching   |
| Theming         | next-themes (`data-theme` attribute, system default)         |
| Icons           | @tabler/icons-react                                          |
| Testing         | Vitest 4 + Testing Library + MSW (unit), Playwright (E2E)    |
| Deployment      | Docker (standalone) + Kubernetes                             |
| Package Manager | pnpm                                                         |

## Specification Standard

Every feature must have a written specification in **DICE format** before any code is written:

- **D — Data Model**: Every entity (table) the feature touches, with field types and constraints
- **I — Interface Contract**: Every API endpoint with auth, request/response shapes, and error codes
- **C — Constraints & Business Rules**: Numbered rules that govern behavior
- **E — Evidence (Acceptance Criteria)**: Testable Given/When/Then statements

Spec files live in `specs/[module-name].md`. Use the DICE template in `templates/DICE-spec-template.md`.

The spec is the source of truth — not the code. When code and spec disagree, the spec wins and the code must be updated.

## Coding Standards

- Write data type definitions BEFORE writing any logic
- All API endpoints MUST validate input before processing
- All API endpoints MUST check authentication and role before processing
- Use safe validation (`safeParse()`) — never throwing validation (`parse()`) for external data
- Error responses follow a consistent format: `{ error: string, code: string }`
- All database tables MUST have: `created_at`, `updated_at`, `created_by`
- No direct database queries from the controller / route-handler layer
- Every UI component MUST handle 4 states: loading, error, empty, success
- Every code file should be traceable to a spec section
- Server Components by default; `'use client'` only when state or interactivity is needed
- Use TailwindCSS `className` instead of `sx` or inline style for all components
- URL is the single source of truth for public parameters (page, pageSize, filters)
- Locale is managed via Zustand `useUIStore` — not cookies or URL
- Icons from `@tabler/icons-react` — never `lucide-react`
- `cn()` utility lives at `src/lib/cn.ts` (not `src/lib/utils.ts`)
- ThemeProvider uses `attribute="data-theme"` (not `"class"`)
- Import order: external libs first, then `@/` aliases (blank line between groups)
- Single quotes, no semicolons (enforced by Prettier)
- Server Actions use `ActionResult<T>` return type: `{ success: true; data: T } | { success: false; errors: Record<string, string> }`
- Query key factories follow the pattern: `featureKeys.all`, `featureKeys.list()`, `featureKeys.detail(id)` in `modules/[feature]/queries/`
- Client components use `useTranslation()` hook for i18n; server-side uses `getTranslations(locale)`
- Locale message files live at `src/locales/messages/{en,id}.json` — namespaced by module

## Roles

Roles are pending — the backend authentication system (Keycloak with Azure AD integration) has not been implemented yet. The auth adapter interface (`src/lib/auth/`) is a pluggable stub ready for integration.

| Role          | Permissions                                                |
| ------------- | ---------------------------------------------------------- |
| *(TBD)*       | *Roles will be defined when the backend auth is built*     |

## Forbidden

These are hard bans — the AI agent must never do any of these:

- No raw SQL or direct database access from the frontend — all data goes through the backend API via `src/lib/api/`
- No skipping input validation on any endpoint
- No internal error details (stack traces, DB errors) returned to the client
- No secrets, API keys, or credentials committed to the repository
- No direct database access from the frontend — all data operations go through the backend API
- No deploying without passing all acceptance criteria from the spec
- No `lucide-react` imports — use `@tabler/icons-react` for all icons
- No editing files in `src/components/ui/` — these are Shadcn-generated primitives
- No business logic in `src/app/` page files — logic goes in `src/modules/`
- No direct Zustand mutations outside store files
- No cross-module imports between `src/modules/` directories

## Module Overview

| Module          | What It Covers                                       | Status              |
| --------------- | ---------------------------------------------------- | ------------------- |
| Users (example) | User listing, CRUD skeleton, schema validation       | Boilerplate example |
| Auth            | Login page, auth adapter abstraction, session store   | Boilerplate         |
| Component Docs  | Interactive docs for all UI components               | Boilerplate         |

### Architecture Layers

**Shared UI Library** (`src/components/`) — domain-agnostic, follows strict Atomic Design:

| Layer        | Location              | Examples                                     | Rule                                    |
| ------------ | --------------------- | -------------------------------------------- | --------------------------------------- |
| Atoms        | `components/atoms/`   | Button, Badge, Avatar, Spinner, Skeleton     | No domain knowledge, no internal state  |
| Molecules    | `components/molecules/` | FormField, ThemeToggle, StatCard, LocaleSwitcher | Composed atoms, minimal logic        |
| Organisms    | `components/organisms/` | DataTable, Sidebar, Navbar, PageHeader       | May have local state; interactive       |
| Templates    | `components/templates/` | DashboardShell, AuthLayout, DashboardContent | Layout slots only; no data fetching     |
| UI primitives | `components/ui/`     | Shadcn-generated output                      | Never edited manually                   |

**Domain Modules** (`src/modules/`) — self-contained feature units:

```
src/modules/[feature]/
├── actions/        # Server Actions ('use server')
├── components/     # Feature-specific UI components
├── data/           # Fallback / dummy data
├── hooks/          # Feature-specific custom hooks
├── queries/        # TanStack Query queryOptions + mutation fns
├── schemas/        # Valibot validation schemas
├── store/          # Zustand slice for this feature
└── types/          # Feature-specific TypeScript types
```

**Infrastructure** (`src/lib/`) — no UI, no domain logic:

| Directory     | Purpose                                           |
| ------------- | ------------------------------------------------- |
| `lib/api/`    | Typed fetch wrapper (`get<T>`, `post<T>`, etc.)   |
| `lib/auth/`   | Swappable auth adapter (`AuthAdapter` interface)  |
| `lib/i18n/`   | i18n config, `getTranslations()`, `useTranslation()` |
| `lib/query/`  | TanStack Query client config + `QueryProvider`    |
| `lib/security/` | Security header definitions                     |
| `lib/cn.ts`   | `cn()` class merge utility (clsx + tailwind-merge) |
| `lib/env.ts`  | Valibot-validated env schema (fail-fast)          |

**Shared Utilities** (`src/utils/`) — pure functions barrel-exported from `index.ts`:

| File          | Exports                                                        |
| ------------- | -------------------------------------------------------------- |
| `logger.ts`   | `createLogger`                                                 |
| `assert.ts`   | `assert`, `assertDefined`, `unreachable`                       |
| `text.ts`     | `capitalize`, `titleCase`, `slugify`, `truncate`, `initials`   |
| `format.ts`   | `formatNumber`, `formatCurrency`, `formatDate`, `formatDateShort`, `formatRelativeTime` |

**Global Stores** (`src/store/`):

| Store           | State                                      |
| --------------- | ------------------------------------------ |
| `ui.store.ts`   | Sidebar open/close, locale (persisted)     |
| `auth.store.ts` | Client-side session state                  |

## Development Workflow

All features follow this stage pipeline. Each stage has a corresponding prompt in `.cursor/prompts/`:

| #  | Stage           | Input                       | Output                           | Owner         |
| -- | --------------- | --------------------------- | -------------------------------- | ------------- |
| 1  | Requirements    | Business requirement (BRS)  | Full DICE specification          | SA            |
| 2  | Task Planning   | DICE spec                   | Ordered task list with roles     | SA            |
| 3  | Database        | Spec Section D              | Migration script                 | Backend Dev   |
| 4  | API Endpoint    | Spec Section I              | Endpoint implementation          | Backend Dev   |
| 5  | Frontend UI     | Spec Section I + E          | Component code with all states   | Frontend Dev  |
| 6  | Test Cases      | Spec Section E              | Test suite / collection          | QC            |
| 7  | Fix Error       | Error + spec context        | Corrected code                   | Anyone        |
| 8  | Spec Review     | Complete spec               | Gap analysis report              | QC / SA       |
| 9  | Impact Check    | File or entity name         | Dependency report                | Anyone        |
| 10 | AGENTS.md Update| Observed patterns           | Updated AGENTS.md                | SA / Dev      |

---

Last Updated: 26 April 2026
Version: 1.0
Maintained By: Gunawan
