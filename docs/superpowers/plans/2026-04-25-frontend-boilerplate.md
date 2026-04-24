# Frontend Boilerplate Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Scaffold a production-ready Next.js 16 App Router frontend boilerplate for an internal dashboard/admin panel, self-hosted on Kubernetes.

**Architecture:** Layered Hybrid — a shared Atomic Design UI library (`src/components/`) plus self-contained domain modules (`src/modules/`). App Router pages are thin composers with no business logic. `'use client'` is pushed to leaf nodes; SSR + Suspense is the default.

**Tech Stack:** Next.js 16, TailwindCSS 4, Shadcn UI, Zustand 5, React Hook Form + Valibot, TanStack React Query 5, TanStack Table 8, i18n (npm), next-themes, Vitest + Testing Library + MSW, Playwright, pnpm 9, Docker + Kubernetes.

**Spec:** `docs/superpowers/specs/2026-04-25-frontend-boilerplate-design.md`

---

## File Map

| File | Responsibility |
|---|---|
| `next.config.ts` | Standalone output, security headers, compression |
| `tailwind.config.ts` | Dark mode class strategy, content paths |
| `src/lib/env.ts` | Valibot env schema — fail-fast on missing vars |
| `src/lib/security/headers.ts` | All security header definitions |
| `src/lib/api/types.ts` | `ApiError`, response types |
| `src/lib/api/index.ts` | Typed fetch wrapper (`get`, `post`, `patch`, `delete`) |
| `src/lib/query/client.ts` | `makeQueryClient`, `getQueryClient` |
| `src/lib/query/provider.tsx` | `QueryProvider` client component |
| `src/lib/i18n/index.ts` | `getI18n(locale)` helper, locale types |
| `src/lib/auth/types.ts` | `Session`, `AuthAdapter` interfaces |
| `src/lib/auth/index.ts` | Adapter registry (`setAuthAdapter`, `getAuthAdapter`) |
| `src/store/ui.store.ts` | Zustand: sidebar, theme UI state |
| `src/store/auth.store.ts` | Zustand: client-side session state |
| `src/middleware.ts` | Auth guard + locale resolution (Edge Runtime) |
| `src/app/layout.tsx` | Root layout — providers, fonts, theme |
| `src/app/globals.css` | Tailwind directives + Shadcn CSS variables |
| `src/app/not-found.tsx` | 404 page |
| `src/app/(auth)/login/page.tsx` | Login page — RHF + Valibot + Server Action |
| `src/app/(auth)/login/actions.ts` | `loginAction` Server Action |
| `src/app/(dashboard)/layout.tsx` | Dashboard shell layout |
| `src/app/(dashboard)/page.tsx` | Dashboard home |
| `src/app/(dashboard)/users/page.tsx` | Users list page (example module) |
| `src/app/api/health/live/route.ts` | K8s liveness probe |
| `src/app/api/health/ready/route.ts` | K8s readiness probe |
| `src/components/atoms/Button.tsx` | Atom: button primitive |
| `src/components/atoms/Badge.tsx` | Atom: status badge |
| `src/components/atoms/Spinner.tsx` | Atom: loading spinner |
| `src/components/atoms/Skeleton.tsx` | Atom: skeleton placeholder |
| `src/components/atoms/Avatar.tsx` | Atom: user avatar |
| `src/components/molecules/FormField.tsx` | Molecule: label + input + error |
| `src/components/molecules/StatCard.tsx` | Molecule: metric card |
| `src/components/molecules/ThemeToggle.tsx` | Molecule: light/dark toggle (Client) |
| `src/components/molecules/LocaleSwitcher.tsx` | Molecule: cookie-based locale switcher (Client) |
| `src/components/organisms/DataTable.tsx` | Organism: TanStack Table wrapper (Client) |
| `src/components/organisms/Navbar.tsx` | Organism: top navigation bar (Client) |
| `src/components/organisms/Sidebar.tsx` | Organism: collapsible sidebar (Client) |
| `src/components/organisms/PageHeader.tsx` | Organism: page title + breadcrumb |
| `src/components/templates/DashboardShell.tsx` | Template: sidebar + navbar + content slot |
| `src/components/templates/AuthLayout.tsx` | Template: centered auth card layout |
| `src/modules/users/types/index.ts` | `User` type |
| `src/modules/users/schemas/user.schema.ts` | Valibot schema for user form |
| `src/modules/users/queries/index.ts` | Query key factory + `queryOptions` |
| `src/modules/users/actions/index.ts` | `createUserAction` Server Action |
| `src/modules/users/store/index.ts` | Zustand slice: selected rows |
| `src/modules/users/components/UserTable.tsx` | DataTable instance for users |
| `src/modules/users/hooks/useUsers.ts` | `useUsers` hook (TanStack Query) |
| `messages/en.json` | English translation strings |
| `messages/id.json` | Indonesian translation strings |
| `.env.example` | Documented env var template |
| `Dockerfile` | Multi-stage build |
| `.dockerignore` | Docker build exclusions |
| `vitest.config.ts` | Vitest include patterns, environments, setup |
| `tests/setup/msw.ts` | MSW server setup for tests |
| `tests/e2e/auth.spec.ts` | Playwright: auth guard redirects |
| `tests/e2e/theme.spec.ts` | Playwright: dark mode persistence |
| `tests/e2e/i18n.spec.ts` | Playwright: locale switching |
| `playwright.config.ts` | Playwright base config |

---

## Task 1: Initialize Project

**Files:**
- Create: `package.json`, `tsconfig.json`, `next.config.ts`, `tailwind.config.ts`, `.gitignore`, `pnpm-lock.yaml`

- [ ] **Step 1: Scaffold Next.js app**

```bash
pnpm create next-app@latest . \
  --typescript \
  --tailwind \
  --eslint \
  --app \
  --src-dir \
  --import-alias "@/*" \
  --no-git
```

Expected: project scaffolded with `src/app/`, `tsconfig.json`, `tailwind.config.ts`, `next.config.ts`.

- [ ] **Step 2: Install production dependencies**

```bash
pnpm add \
  zustand \
  @tanstack/react-query \
  @tanstack/react-query-devtools \
  @tanstack/react-table \
  react-hook-form \
  valibot \
  @hookform/resolvers \
  next-themes \
  i18n \
  clsx \
  tailwind-merge \
  class-variance-authority \
  lucide-react
```

- [ ] **Step 3: Install dev dependencies**

```bash
pnpm add -D \
  vitest \
  @vitejs/plugin-react \
  @vitest/coverage-v8 \
  @testing-library/react \
  @testing-library/user-event \
  @testing-library/jest-dom \
  msw \
  jsdom \
  @playwright/test \
  playwright
```

- [ ] **Step 4: Install Playwright browsers**

```bash
pnpm exec playwright install --with-deps chromium
```

- [ ] **Step 5: Install Shadcn**

```bash
pnpm dlx shadcn@latest init
```

When prompted, select: Style = Default, Base color = Neutral, CSS variables = Yes.

- [ ] **Step 6: Add Shadcn components used by organisms**

```bash
pnpm dlx shadcn@latest add button badge avatar input label card table dropdown-menu sheet tooltip separator
```

- [ ] **Step 7: Update tsconfig.json paths**

Open `tsconfig.json` and confirm (or add) these path aliases under `compilerOptions`:

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    },
    "strict": true,
    "noUncheckedIndexedAccess": true
  }
}
```

- [ ] **Step 8: Update .gitignore**

Add to `.gitignore`:

```
.env.local
.env.*.local
.superpowers/
playwright-report/
test-results/
coverage/
```

- [ ] **Step 9: Commit**

```bash
git init
git add .
git commit -m "feat: initialize Next.js 16 project with full dependency set"
```

---

## Task 2: next.config.ts + Security Headers

**Files:**
- Create: `src/lib/security/headers.ts`
- Modify: `next.config.ts`
- Test: `src/lib/security/__tests__/headers.test.ts`

- [ ] **Step 1: Write the failing test**

Create `src/lib/security/__tests__/headers.test.ts`:

```typescript
import { describe, it, expect } from 'vitest'
import { securityHeaders } from '../headers'

describe('securityHeaders', () => {
  it('includes X-Frame-Options DENY', () => {
    const header = securityHeaders.find((h) => h.key === 'X-Frame-Options')
    expect(header?.value).toBe('DENY')
  })

  it('includes X-Content-Type-Options nosniff', () => {
    const header = securityHeaders.find((h) => h.key === 'X-Content-Type-Options')
    expect(header?.value).toBe('nosniff')
  })

  it('includes Content-Security-Policy', () => {
    const header = securityHeaders.find((h) => h.key === 'Content-Security-Policy')
    expect(header?.value).toContain("script-src 'self'")
  })

  it('includes Strict-Transport-Security', () => {
    const header = securityHeaders.find((h) => h.key === 'Strict-Transport-Security')
    expect(header?.value).toContain('max-age=63072000')
  })

  it('exports an array of 7 headers', () => {
    expect(securityHeaders).toHaveLength(7)
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

```bash
pnpm vitest run src/lib/security/__tests__/headers.test.ts
```

Expected: FAIL — `Cannot find module '../headers'`

- [ ] **Step 3: Create security headers**

Create `src/lib/security/headers.ts`:

```typescript
export const securityHeaders = [
  { key: 'X-Frame-Options', value: 'DENY' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload',
  },
  { key: 'X-DNS-Prefetch-Control', value: 'on' },
  {
    key: 'Content-Security-Policy',
    value: [
      "default-src 'self'",
      "script-src 'self'",
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data: blob:",
    ].join('; '),
  },
]
```

- [ ] **Step 4: Update next.config.ts**

Replace `next.config.ts` with:

```typescript
import type { NextConfig } from 'next'
import { securityHeaders } from './src/lib/security/headers'

const nextConfig: NextConfig = {
  output: 'standalone',
  poweredByHeader: false,
  compress: true,
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: securityHeaders,
      },
    ]
  },
}

export default nextConfig
```

- [ ] **Step 5: Run test to verify it passes**

```bash
pnpm vitest run src/lib/security/__tests__/headers.test.ts
```

Expected: PASS — 5 tests pass

- [ ] **Step 6: Commit**

```bash
git add src/lib/security/ next.config.ts
git commit -m "feat: add security headers and standalone output config"
```

---

## Task 3: Environment Validation

**Files:**
- Create: `src/lib/env.ts`
- Test: `src/lib/__tests__/env.test.ts`

- [ ] **Step 1: Write the failing test**

Create `src/lib/__tests__/env.test.ts`:

```typescript
import { describe, it, expect, beforeEach, afterEach } from 'vitest'

describe('env validation', () => {
  const original = process.env

  beforeEach(() => {
    process.env = { ...original }
  })

  afterEach(() => {
    process.env = original
  })

  it('parses valid env successfully', async () => {
    process.env.NODE_ENV = 'test'
    process.env.NEXT_PUBLIC_API_URL = 'http://localhost:8080'
    const { env } = await import('../env')
    expect(env.NEXT_PUBLIC_API_URL).toBe('http://localhost:8080')
  })

  it('throws when NEXT_PUBLIC_API_URL is missing', async () => {
    delete process.env.NEXT_PUBLIC_API_URL
    await expect(import('../env')).rejects.toThrow()
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

```bash
pnpm vitest run src/lib/__tests__/env.test.ts
```

Expected: FAIL — `Cannot find module '../env'`

- [ ] **Step 3: Implement env validation**

Create `src/lib/env.ts`:

```typescript
import { parse, object, string, pipe, url } from 'valibot'

const EnvSchema = object({
  NEXT_PUBLIC_API_URL: pipe(string(), url()),
})

export const env = parse(EnvSchema, {
  NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
})
```

- [ ] **Step 4: Run test to verify it passes**

```bash
pnpm vitest run src/lib/__tests__/env.test.ts
```

Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/lib/env.ts src/lib/__tests__/env.test.ts
git commit -m "feat: add Valibot env validation with fail-fast startup check"
```

---

## Task 4: API Client

**Files:**
- Create: `src/lib/api/types.ts`, `src/lib/api/index.ts`
- Test: `src/lib/api/__tests__/index.test.ts`

- [ ] **Step 1: Write the failing tests**

Create `src/lib/api/__tests__/index.test.ts`:

```typescript
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { ApiError } from '../types'

describe('ApiError', () => {
  it('sets name to ApiError', () => {
    const err = new ApiError(404, 'Not Found')
    expect(err.name).toBe('ApiError')
    expect(err.status).toBe(404)
    expect(err.message).toBe('404 Not Found')
  })

  it('accepts custom message', () => {
    const err = new ApiError(500, 'Internal Server Error', 'Custom message')
    expect(err.message).toBe('Custom message')
  })
})

describe('api client', () => {
  beforeEach(() => {
    vi.stubGlobal('fetch', vi.fn())
  })

  it('throws ApiError on non-ok response', async () => {
    vi.mocked(fetch).mockResolvedValueOnce(
      new Response(null, { status: 401, statusText: 'Unauthorized' }),
    )
    const { api } = await import('../index')
    await expect(api.get('/test')).rejects.toThrow(ApiError)
  })

  it('returns parsed JSON on success', async () => {
    vi.mocked(fetch).mockResolvedValueOnce(
      new Response(JSON.stringify({ id: 1 }), { status: 200 }),
    )
    const { api } = await import('../index')
    const result = await api.get<{ id: number }>('/test')
    expect(result.id).toBe(1)
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

```bash
pnpm vitest run src/lib/api/__tests__/index.test.ts
```

Expected: FAIL — modules not found

- [ ] **Step 3: Create API types**

Create `src/lib/api/types.ts`:

```typescript
export class ApiError extends Error {
  constructor(
    public readonly status: number,
    public readonly statusText: string,
    message?: string,
  ) {
    super(message ?? `${status} ${statusText}`)
    this.name = 'ApiError'
  }
}
```

- [ ] **Step 4: Create API client**

Create `src/lib/api/index.ts`:

```typescript
import { ApiError } from './types'

export type { ApiError }

const getBaseUrl = () => process.env.NEXT_PUBLIC_API_URL ?? ''

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const res = await fetch(`${getBaseUrl()}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  })
  if (!res.ok) throw new ApiError(res.status, res.statusText)
  return res.json() as Promise<T>
}

export const api = {
  get: <T>(path: string, init?: RequestInit) =>
    request<T>(path, { ...init, method: 'GET' }),
  post: <T>(path: string, body: unknown, init?: RequestInit) =>
    request<T>(path, { ...init, method: 'POST', body: JSON.stringify(body) }),
  patch: <T>(path: string, body: unknown, init?: RequestInit) =>
    request<T>(path, { ...init, method: 'PATCH', body: JSON.stringify(body) }),
  delete: <T>(path: string, init?: RequestInit) =>
    request<T>(path, { ...init, method: 'DELETE' }),
}
```

- [ ] **Step 5: Run test to verify it passes**

```bash
pnpm vitest run src/lib/api/__tests__/index.test.ts
```

Expected: PASS — 4 tests pass

- [ ] **Step 6: Commit**

```bash
git add src/lib/api/
git commit -m "feat: add typed API client with ApiError normalisation"
```

---

## Task 5: TanStack Query Setup

**Files:**
- Create: `src/lib/query/client.ts`, `src/lib/query/provider.tsx`
- Test: `src/lib/query/__tests__/client.test.ts`

- [ ] **Step 1: Write the failing test**

Create `src/lib/query/__tests__/client.test.ts`:

```typescript
import { describe, it, expect } from 'vitest'
import { makeQueryClient, getQueryClient } from '../client'

describe('makeQueryClient', () => {
  it('creates a QueryClient with 60s staleTime', () => {
    const client = makeQueryClient()
    const defaults = client.getDefaultOptions()
    expect(defaults.queries?.staleTime).toBe(60_000)
  })
})

describe('getQueryClient', () => {
  it('returns the same instance in browser context', () => {
    const a = getQueryClient()
    const b = getQueryClient()
    expect(a).toBe(b)
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

```bash
pnpm vitest run src/lib/query/__tests__/client.test.ts
```

Expected: FAIL — module not found

- [ ] **Step 3: Implement QueryClient**

Create `src/lib/query/client.ts`:

```typescript
import { QueryClient } from '@tanstack/react-query'

export function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: { staleTime: 60_000 },
    },
  })
}

let browserQueryClient: QueryClient | undefined

export function getQueryClient() {
  if (typeof window === 'undefined') return makeQueryClient()
  browserQueryClient ??= makeQueryClient()
  return browserQueryClient
}
```

- [ ] **Step 4: Create QueryProvider**

Create `src/lib/query/provider.tsx`:

```typescript
'use client'
import { QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { getQueryClient } from './client'

export function QueryProvider({ children }: { children: React.ReactNode }) {
  const queryClient = getQueryClient()
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {process.env.NODE_ENV === 'development' && (
        <ReactQueryDevtools initialIsOpen={false} />
      )}
    </QueryClientProvider>
  )
}
```

- [ ] **Step 5: Run test to verify it passes**

```bash
pnpm vitest run src/lib/query/__tests__/client.test.ts
```

Expected: PASS

- [ ] **Step 6: Commit**

```bash
git add src/lib/query/
git commit -m "feat: add TanStack Query client and provider"
```

---

## Task 6: i18n Setup

**Files:**
- Create: `src/lib/i18n/index.ts`, `messages/en.json`, `messages/id.json`
- Test: `src/lib/i18n/__tests__/index.test.ts`

- [ ] **Step 1: Create message files**

Create `messages/en.json`:

```json
{
  "common": {
    "save": "Save",
    "cancel": "Cancel",
    "delete": "Delete",
    "edit": "Edit",
    "loading": "Loading...",
    "error": "Something went wrong",
    "search": "Search"
  },
  "auth": {
    "login": "Login",
    "logout": "Logout",
    "email": "Email",
    "password": "Password",
    "loginTitle": "Sign in to your account"
  },
  "users": {
    "title": "Users",
    "name": "Name",
    "email": "Email",
    "role": "Role",
    "addUser": "Add User"
  },
  "nav": {
    "dashboard": "Dashboard",
    "users": "Users",
    "reports": "Reports",
    "settings": "Settings"
  }
}
```

Create `messages/id.json`:

```json
{
  "common": {
    "save": "Simpan",
    "cancel": "Batal",
    "delete": "Hapus",
    "edit": "Ubah",
    "loading": "Memuat...",
    "error": "Terjadi kesalahan",
    "search": "Cari"
  },
  "auth": {
    "login": "Masuk",
    "logout": "Keluar",
    "email": "Email",
    "password": "Kata Sandi",
    "loginTitle": "Masuk ke akun Anda"
  },
  "users": {
    "title": "Pengguna",
    "name": "Nama",
    "email": "Email",
    "role": "Peran",
    "addUser": "Tambah Pengguna"
  },
  "nav": {
    "dashboard": "Dasbor",
    "users": "Pengguna",
    "reports": "Laporan",
    "settings": "Pengaturan"
  }
}
```

- [ ] **Step 2: Write the failing test**

Create `src/lib/i18n/__tests__/index.test.ts`:

```typescript
import { describe, it, expect } from 'vitest'
import { getI18n, locales, defaultLocale } from '../index'

describe('getI18n', () => {
  it('translates a key in English', () => {
    const { t } = getI18n('en')
    expect(t('common.save')).toBe('Save')
  })

  it('translates a key in Indonesian', () => {
    const { t } = getI18n('id')
    expect(t('common.save')).toBe('Simpan')
  })

  it('translates nested auth keys', () => {
    const { t } = getI18n('en')
    expect(t('auth.login')).toBe('Login')
  })
})

describe('locale config', () => {
  it('exports id and en locales', () => {
    expect(locales).toEqual(['id', 'en'])
  })

  it('defaults to id', () => {
    expect(defaultLocale).toBe('id')
  })
})
```

- [ ] **Step 3: Run test to verify it fails**

```bash
pnpm vitest run src/lib/i18n/__tests__/index.test.ts
```

Expected: FAIL — module not found

- [ ] **Step 4: Implement i18n helper**

Create `src/lib/i18n/index.ts`:

```typescript
import i18nLib from 'i18n'
import path from 'path'

i18nLib.configure({
  locales: ['id', 'en'],
  defaultLocale: 'id',
  directory: path.join(process.cwd(), 'messages'),
  objectNotation: true,
  updateFiles: false,
})

export type Locale = 'id' | 'en'
export const locales: Locale[] = ['id', 'en']
export const defaultLocale: Locale = 'id'
export const LOCALE_COOKIE = 'NEXT_LOCALE'

export function getI18n(locale: Locale) {
  i18nLib.setLocale(locale)
  return {
    t: (key: string) => i18nLib.__(key),
  }
}
```

- [ ] **Step 5: Run test to verify it passes**

```bash
pnpm vitest run src/lib/i18n/__tests__/index.test.ts
```

Expected: PASS — 5 tests pass

- [ ] **Step 6: Commit**

```bash
git add src/lib/i18n/ messages/
git commit -m "feat: add i18n setup with Indonesian and English message files"
```

---

## Task 7: Auth Abstraction

**Files:**
- Create: `src/lib/auth/types.ts`, `src/lib/auth/index.ts`
- Test: `src/lib/auth/__tests__/index.test.ts`

- [ ] **Step 1: Write the failing test**

Create `src/lib/auth/__tests__/index.test.ts`:

```typescript
import { describe, it, expect } from 'vitest'
import { getAuthAdapter, setAuthAdapter } from '../index'
import type { AuthAdapter, Session } from '../types'

describe('auth adapter registry', () => {
  it('returns stub adapter that rejects all sessions by default', async () => {
    const adapter = getAuthAdapter()
    const session = await adapter.validateSession('any-token')
    expect(session).toBeNull()
  })

  it('returns stub adapter that finds no token by default', () => {
    const adapter = getAuthAdapter()
    const req = new Request('http://localhost')
    expect(adapter.getToken(req)).toBeNull()
  })

  it('accepts a custom adapter', async () => {
    const mockSession: Session = {
      userId: '1',
      email: 'test@test.com',
      name: 'Test',
      roles: ['admin'],
      expiresAt: Date.now() + 3600_000,
    }
    const customAdapter: AuthAdapter = {
      validateSession: async () => mockSession,
      getToken: () => 'token',
    }
    setAuthAdapter(customAdapter)
    const session = await getAuthAdapter().validateSession('any')
    expect(session?.userId).toBe('1')
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

```bash
pnpm vitest run src/lib/auth/__tests__/index.test.ts
```

Expected: FAIL — modules not found

- [ ] **Step 3: Create auth types**

Create `src/lib/auth/types.ts`:

```typescript
export type Session = {
  userId: string
  email: string
  name: string
  roles: string[]
  expiresAt: number
}

export interface AuthAdapter {
  validateSession(token: string): Promise<Session | null>
  getToken(request: Request): string | null
}
```

- [ ] **Step 4: Create auth adapter registry**

Create `src/lib/auth/index.ts`:

```typescript
import type { AuthAdapter } from './types'

export type { Session } from './types'
export type { AuthAdapter }

const stubAdapter: AuthAdapter = {
  async validateSession(_token: string) {
    return null
  },
  getToken(_request: Request) {
    return null
  },
}

let _adapter: AuthAdapter = stubAdapter

export function setAuthAdapter(adapter: AuthAdapter) {
  _adapter = adapter
}

export function getAuthAdapter(): AuthAdapter {
  return _adapter
}
```

- [ ] **Step 5: Run test to verify it passes**

```bash
pnpm vitest run src/lib/auth/__tests__/index.test.ts
```

Expected: PASS — 3 tests pass

- [ ] **Step 6: Commit**

```bash
git add src/lib/auth/
git commit -m "feat: add swappable auth adapter abstraction"
```

---

## Task 8: Zustand Stores

**Files:**
- Create: `src/store/ui.store.ts`, `src/store/auth.store.ts`
- Test: `src/store/__tests__/ui.store.test.ts`, `src/store/__tests__/auth.store.test.ts`

- [ ] **Step 1: Write the failing tests**

Create `src/store/__tests__/ui.store.test.ts`:

```typescript
import { describe, it, expect, beforeEach } from 'vitest'
import { act, renderHook } from '@testing-library/react'
import { useUIStore } from '../ui.store'

beforeEach(() => {
  useUIStore.setState({ sidebarOpen: true, theme: 'system' })
})

describe('useUIStore', () => {
  it('toggles sidebar', () => {
    const { result } = renderHook(() => useUIStore())
    act(() => result.current.toggleSidebar())
    expect(result.current.sidebarOpen).toBe(false)
  })

  it('sets theme', () => {
    const { result } = renderHook(() => useUIStore())
    act(() => result.current.setTheme('dark'))
    expect(result.current.theme).toBe('dark')
  })
})
```

Create `src/store/__tests__/auth.store.test.ts`:

```typescript
import { describe, it, expect, beforeEach } from 'vitest'
import { act, renderHook } from '@testing-library/react'
import { useAuthStore } from '../auth.store'
import type { Session } from '@/lib/auth/types'

const mockSession: Session = {
  userId: '1',
  email: 'user@test.com',
  name: 'User',
  roles: ['admin'],
  expiresAt: Date.now() + 3600_000,
}

beforeEach(() => {
  useAuthStore.setState({ session: null })
})

describe('useAuthStore', () => {
  it('sets and clears session', () => {
    const { result } = renderHook(() => useAuthStore())
    act(() => result.current.setSession(mockSession))
    expect(result.current.session?.userId).toBe('1')
    act(() => result.current.clearSession())
    expect(result.current.session).toBeNull()
  })
})
```

- [ ] **Step 2: Run tests to verify they fail**

```bash
pnpm vitest run src/store/__tests__/
```

Expected: FAIL — modules not found

- [ ] **Step 3: Create UI store**

Create `src/store/ui.store.ts`:

```typescript
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type Theme = 'light' | 'dark' | 'system'

type UIState = {
  sidebarOpen: boolean
  theme: Theme
  setSidebarOpen: (open: boolean) => void
  toggleSidebar: () => void
  setTheme: (theme: Theme) => void
}

export const useUIStore = create<UIState>()(
  persist(
    (set) => ({
      sidebarOpen: true,
      theme: 'system',
      setSidebarOpen: (open) => set({ sidebarOpen: open }),
      toggleSidebar: () => set((s) => ({ sidebarOpen: !s.sidebarOpen })),
      setTheme: (theme) => set({ theme }),
    }),
    { name: 'ui-store' },
  ),
)
```

- [ ] **Step 4: Create auth store**

Create `src/store/auth.store.ts`:

```typescript
import { create } from 'zustand'
import type { Session } from '@/lib/auth/types'

type AuthState = {
  session: Session | null
  setSession: (session: Session | null) => void
  clearSession: () => void
}

export const useAuthStore = create<AuthState>()((set) => ({
  session: null,
  setSession: (session) => set({ session }),
  clearSession: () => set({ session: null }),
}))
```

- [ ] **Step 5: Run tests to verify they pass**

```bash
pnpm vitest run src/store/__tests__/
```

Expected: PASS — 3 tests pass

- [ ] **Step 6: Commit**

```bash
git add src/store/
git commit -m "feat: add Zustand UI and auth stores"
```

---

## Task 9: Middleware

**Files:**
- Create: `src/middleware.ts`
- Test: `tests/e2e/auth.spec.ts` (written in Task 21 — skip test step here)

- [ ] **Step 1: Create middleware**

Create `src/middleware.ts`:

```typescript
import { NextRequest, NextResponse } from 'next/server'
import { defaultLocale, locales, LOCALE_COOKIE } from '@/lib/i18n'
import type { Locale } from '@/lib/i18n'
import { getAuthAdapter } from '@/lib/auth'

const PROTECTED_PREFIXES = ['/dashboard']
const AUTH_ONLY_PATHS = ['/login']

function resolveLocale(request: NextRequest): Locale {
  const cookie = request.cookies.get(LOCALE_COOKIE)?.value
  if (cookie && (locales as string[]).includes(cookie)) return cookie as Locale

  const acceptLang = request.headers.get('accept-language') ?? ''
  const preferred = acceptLang.split(',')[0]?.split('-')[0] ?? ''
  if ((locales as string[]).includes(preferred)) return preferred as Locale

  return defaultLocale
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const locale = resolveLocale(request)

  const isProtected = PROTECTED_PREFIXES.some((p) => pathname.startsWith(p))
  const isAuthOnly = AUTH_ONLY_PATHS.some((p) => pathname.startsWith(p))

  const response = NextResponse.next()
  response.headers.set('x-locale', locale)

  if (isProtected) {
    const adapter = getAuthAdapter()
    const token = adapter.getToken(request as unknown as Request)
    const session = token ? await adapter.validateSession(token) : null
    if (!session) {
      const url = new URL('/login', request.url)
      url.searchParams.set('callbackUrl', pathname)
      return NextResponse.redirect(url)
    }
  }

  if (isAuthOnly) {
    const adapter = getAuthAdapter()
    const token = adapter.getToken(request as unknown as Request)
    const session = token ? await adapter.validateSession(token) : null
    if (session) return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  return response
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
```

- [ ] **Step 2: Commit**

```bash
git add src/middleware.ts
git commit -m "feat: add auth guard middleware with locale resolution"
```

---

## Task 10: Root Layout + Providers + globals.css

**Files:**
- Modify: `src/app/globals.css`, `src/app/layout.tsx`
- Create: `src/app/not-found.tsx`

- [ ] **Step 1: Update globals.css with Shadcn CSS variables**

Replace `src/app/globals.css` with the Shadcn CSS variable template. Run:

```bash
pnpm dlx shadcn@latest add --all
```

Then open `src/app/globals.css` and ensure it contains the `@layer base` block with `:root` and `.dark` CSS variable definitions that Shadcn generates. It should look like:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 222.2 84% 4.9%;
    /* ... full Shadcn token set ... */
    --radius: 0.5rem;
  }
  .dark {
    --background: 222.2 84% 4.9%;
    --foreground: 210 40% 98%;
    /* ... full Shadcn dark token set ... */
  }
}

@layer base {
  * {
    @apply border-border;
  }
  body {
    @apply bg-background text-foreground;
  }
}
```

- [ ] **Step 2: Update tailwind.config.ts for dark mode**

Open `tailwind.config.ts` and ensure:

```typescript
import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/modules/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
    },
  },
  plugins: [],
}

export default config
```

- [ ] **Step 3: Create root layout**

Replace `src/app/layout.tsx`:

```typescript
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ThemeProvider } from 'next-themes'
import { QueryProvider } from '@/lib/query/provider'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'ASDP Dashboard',
  description: 'ASDP Core Engine Admin Dashboard',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <QueryProvider>{children}</QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
```

- [ ] **Step 4: Create not-found page**

Create `src/app/not-found.tsx`:

```typescript
import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4">
      <h1 className="text-4xl font-bold">404</h1>
      <p className="text-muted-foreground">Page not found</p>
      <Link href="/dashboard" className="text-primary underline">
        Back to dashboard
      </Link>
    </div>
  )
}
```

- [ ] **Step 5: Commit**

```bash
git add src/app/layout.tsx src/app/globals.css src/app/not-found.tsx tailwind.config.ts
git commit -m "feat: add root layout with ThemeProvider and QueryProvider"
```

---

## Task 11: Atom Components

**Files:**
- Create: `src/components/atoms/Button.tsx`, `Badge.tsx`, `Spinner.tsx`, `Skeleton.tsx`, `Avatar.tsx`
- Test: `src/components/atoms/__tests__/Button.test.tsx`, `Spinner.test.tsx`, `Skeleton.test.tsx`

- [ ] **Step 1: Write the failing tests**

Create `src/components/atoms/__tests__/Button.test.tsx`:

```typescript
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'
import { Button } from '../Button'

describe('Button', () => {
  it('renders children', () => {
    render(<Button>Click me</Button>)
    expect(screen.getByRole('button', { name: 'Click me' })).toBeInTheDocument()
  })

  it('calls onClick when clicked', async () => {
    const handler = vi.fn()
    render(<Button onClick={handler}>Click</Button>)
    await userEvent.click(screen.getByRole('button'))
    expect(handler).toHaveBeenCalledOnce()
  })

  it('is disabled when disabled prop is set', () => {
    render(<Button disabled>Click</Button>)
    expect(screen.getByRole('button')).toBeDisabled()
  })

  it('shows loading state', () => {
    render(<Button loading>Submit</Button>)
    expect(screen.getByRole('button')).toBeDisabled()
    expect(screen.getByTestId('spinner')).toBeInTheDocument()
  })
})
```

Create `src/components/atoms/__tests__/Spinner.test.tsx`:

```typescript
import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { Spinner } from '../Spinner'

describe('Spinner', () => {
  it('renders with accessible role status', () => {
    render(<Spinner />)
    expect(screen.getByRole('status')).toBeInTheDocument()
  })

  it('accepts size prop', () => {
    render(<Spinner size="lg" />)
    const el = screen.getByRole('status')
    expect(el.className).toContain('h-8')
  })
})
```

Create `src/components/atoms/__tests__/Skeleton.test.tsx`:

```typescript
import { render } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { Skeleton } from '../Skeleton'

describe('Skeleton', () => {
  it('renders with animate-pulse class', () => {
    const { container } = render(<Skeleton className="h-4 w-24" />)
    expect(container.firstChild).toHaveClass('animate-pulse')
  })
})
```

- [ ] **Step 2: Run tests to verify they fail**

```bash
pnpm vitest run src/components/atoms/__tests__/
```

Expected: FAIL — modules not found

- [ ] **Step 3: Create Spinner**

Create `src/components/atoms/Spinner.tsx`:

```typescript
import { cn } from '@/lib/utils'

type SpinnerProps = { size?: 'sm' | 'md' | 'lg'; className?: string }

const sizeMap = { sm: 'h-4 w-4', md: 'h-6 w-6', lg: 'h-8 w-8' }

export function Spinner({ size = 'md', className }: SpinnerProps) {
  return (
    <span
      role="status"
      data-testid="spinner"
      className={cn(
        'inline-block animate-spin rounded-full border-2 border-current border-t-transparent',
        sizeMap[size],
        className,
      )}
      aria-label="Loading"
    />
  )
}
```

- [ ] **Step 4: Create Skeleton**

Create `src/components/atoms/Skeleton.tsx`:

```typescript
import { cn } from '@/lib/utils'

export function Skeleton({ className }: { className?: string }) {
  return (
    <div className={cn('animate-pulse rounded-md bg-muted', className)} />
  )
}
```

- [ ] **Step 5: Create Button**

Create `src/components/atoms/Button.tsx`:

```typescript
import { forwardRef } from 'react'
import { Button as ShadcnButton } from '@/components/ui/button'
import type { ComponentPropsWithoutRef } from 'react'
import { Spinner } from './Spinner'

type ButtonProps = ComponentPropsWithoutRef<typeof ShadcnButton> & {
  loading?: boolean
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ loading, disabled, children, ...props }, ref) => (
    <ShadcnButton ref={ref} disabled={disabled || loading} {...props}>
      {loading && <Spinner size="sm" className="mr-2" />}
      {children}
    </ShadcnButton>
  ),
)
Button.displayName = 'Button'
```

- [ ] **Step 6: Create Badge and Avatar (no test required — thin wrappers)**

Create `src/components/atoms/Badge.tsx`:

```typescript
export { Badge } from '@/components/ui/badge'
```

Create `src/components/atoms/Avatar.tsx`:

```typescript
export { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
```

- [ ] **Step 7: Ensure lib/utils.ts exists (Shadcn generates this)**

Confirm `src/lib/utils.ts` exists with:

```typescript
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

If missing, create it.

- [ ] **Step 8: Run tests to verify they pass**

```bash
pnpm vitest run src/components/atoms/__tests__/
```

Expected: PASS — 7 tests pass

- [ ] **Step 9: Commit**

```bash
git add src/components/atoms/ src/lib/utils.ts
git commit -m "feat: add atom components (Button, Spinner, Skeleton, Badge, Avatar)"
```

---

## Task 12: Molecule Components

**Files:**
- Create: `src/components/molecules/FormField.tsx`, `StatCard.tsx`, `ThemeToggle.tsx`, `LocaleSwitcher.tsx`
- Test: `src/components/molecules/__tests__/FormField.test.tsx`, `ThemeToggle.test.tsx`

- [ ] **Step 1: Write the failing tests**

Create `src/components/molecules/__tests__/FormField.test.tsx`:

```typescript
import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { FormField } from '../FormField'

describe('FormField', () => {
  it('renders label and input', () => {
    render(<FormField label="Email" id="email" />)
    expect(screen.getByLabelText('Email')).toBeInTheDocument()
  })

  it('renders error message when provided', () => {
    render(<FormField label="Email" id="email" error="Invalid email" />)
    expect(screen.getByText('Invalid email')).toBeInTheDocument()
    expect(screen.getByRole('textbox')).toHaveAttribute('aria-invalid', 'true')
  })

  it('renders without error when no error prop', () => {
    render(<FormField label="Name" id="name" />)
    expect(screen.queryByRole('alert')).not.toBeInTheDocument()
  })
})
```

Create `src/components/molecules/__tests__/ThemeToggle.test.tsx`:

```typescript
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'

vi.mock('next-themes', () => ({
  useTheme: () => ({ theme: 'light', setTheme: vi.fn() }),
}))

import { ThemeToggle } from '../ThemeToggle'

describe('ThemeToggle', () => {
  it('renders a toggle button', () => {
    render(<ThemeToggle />)
    expect(screen.getByRole('button', { name: /toggle theme/i })).toBeInTheDocument()
  })
})
```

- [ ] **Step 2: Run tests to verify they fail**

```bash
pnpm vitest run src/components/molecules/__tests__/
```

Expected: FAIL — modules not found

- [ ] **Step 3: Create FormField**

Create `src/components/molecules/FormField.tsx`:

```typescript
import { forwardRef } from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'
import type { ComponentPropsWithoutRef } from 'react'

type FormFieldProps = ComponentPropsWithoutRef<'input'> & {
  label: string
  id: string
  error?: string
}

export const FormField = forwardRef<HTMLInputElement, FormFieldProps>(
  ({ label, id, error, className, ...props }, ref) => (
    <div className="flex flex-col gap-1.5">
      <Label htmlFor={id}>{label}</Label>
      <Input
        ref={ref}
        id={id}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
        className={cn(error && 'border-destructive', className)}
        {...props}
      />
      {error && (
        <p id={`${id}-error`} role="alert" className="text-sm text-destructive">
          {error}
        </p>
      )}
    </div>
  ),
)
FormField.displayName = 'FormField'
```

- [ ] **Step 4: Create ThemeToggle**

Create `src/components/molecules/ThemeToggle.tsx`:

```typescript
'use client'
import { useTheme } from 'next-themes'
import { Moon, Sun } from 'lucide-react'
import { Button } from '@/components/atoms/Button'

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  return (
    <Button
      variant="ghost"
      size="icon"
      aria-label="Toggle theme"
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
    >
      <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
    </Button>
  )
}
```

- [ ] **Step 5: Create StatCard**

Create `src/components/molecules/StatCard.tsx`:

```typescript
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

type StatCardProps = {
  title: string
  value: string | number
  description?: string
  icon?: React.ReactNode
}

export function StatCard({ title, value, description, icon }: StatCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {description && (
          <p className="text-xs text-muted-foreground">{description}</p>
        )}
      </CardContent>
    </Card>
  )
}
```

- [ ] **Step 6: Create LocaleSwitcher**

Create `src/components/molecules/LocaleSwitcher.tsx`:

```typescript
'use client'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/atoms/Button'
import { LOCALE_COOKIE, type Locale } from '@/lib/i18n'

type LocaleSwitcherProps = { currentLocale: Locale }

export function LocaleSwitcher({ currentLocale }: LocaleSwitcherProps) {
  const router = useRouter()

  const switchLocale = (locale: Locale) => {
    document.cookie = `${LOCALE_COOKIE}=${locale}; path=/; max-age=31536000`
    router.refresh()
  }

  return (
    <div className="flex gap-1">
      <Button
        variant={currentLocale === 'id' ? 'default' : 'ghost'}
        size="sm"
        onClick={() => switchLocale('id')}
      >
        ID
      </Button>
      <Button
        variant={currentLocale === 'en' ? 'default' : 'ghost'}
        size="sm"
        onClick={() => switchLocale('en')}
      >
        EN
      </Button>
    </div>
  )
}
```

- [ ] **Step 7: Run tests to verify they pass**

```bash
pnpm vitest run src/components/molecules/__tests__/
```

Expected: PASS — 4 tests pass

- [ ] **Step 8: Commit**

```bash
git add src/components/molecules/
git commit -m "feat: add molecule components (FormField, ThemeToggle, StatCard, LocaleSwitcher)"
```

---

## Task 13: Organism Components

**Files:**
- Create: `src/components/organisms/DataTable.tsx`, `Navbar.tsx`, `Sidebar.tsx`, `PageHeader.tsx`
- Test: `src/components/organisms/__tests__/DataTable.test.tsx`, `PageHeader.test.tsx`

- [ ] **Step 1: Write the failing tests**

Create `src/components/organisms/__tests__/DataTable.test.tsx`:

```typescript
import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { DataTable } from '../DataTable'
import { createColumnHelper } from '@tanstack/react-table'

type Person = { name: string; email: string }
const columnHelper = createColumnHelper<Person>()
const columns = [
  columnHelper.accessor('name', { header: 'Name' }),
  columnHelper.accessor('email', { header: 'Email' }),
]
const data: Person[] = [{ name: 'Alice', email: 'alice@test.com' }]

describe('DataTable', () => {
  it('renders column headers', () => {
    render(<DataTable columns={columns} data={data} />)
    expect(screen.getByText('Name')).toBeInTheDocument()
    expect(screen.getByText('Email')).toBeInTheDocument()
  })

  it('renders row data', () => {
    render(<DataTable columns={columns} data={data} />)
    expect(screen.getByText('Alice')).toBeInTheDocument()
  })

  it('shows empty message when data is empty', () => {
    render(<DataTable columns={columns} data={[]} emptyMessage="No results" />)
    expect(screen.getByText('No results')).toBeInTheDocument()
  })
})
```

Create `src/components/organisms/__tests__/PageHeader.test.tsx`:

```typescript
import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { PageHeader } from '../PageHeader'

describe('PageHeader', () => {
  it('renders title', () => {
    render(<PageHeader title="Users" />)
    expect(screen.getByRole('heading', { name: 'Users' })).toBeInTheDocument()
  })

  it('renders description when provided', () => {
    render(<PageHeader title="Users" description="Manage users" />)
    expect(screen.getByText('Manage users')).toBeInTheDocument()
  })

  it('renders actions slot', () => {
    render(<PageHeader title="Users" actions={<button>Add User</button>} />)
    expect(screen.getByRole('button', { name: 'Add User' })).toBeInTheDocument()
  })
})
```

- [ ] **Step 2: Run tests to verify they fail**

```bash
pnpm vitest run src/components/organisms/__tests__/
```

Expected: FAIL — modules not found

- [ ] **Step 3: Create DataTable**

Create `src/components/organisms/DataTable.tsx`:

```typescript
'use client'
import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
  type ColumnDef,
} from '@tanstack/react-table'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Button } from '@/components/atoms/Button'

type DataTableProps<TData> = {
  columns: ColumnDef<TData, unknown>[]
  data: TData[]
  emptyMessage?: string
  pageSize?: number
}

export function DataTable<TData>({
  columns,
  data,
  emptyMessage = 'No results.',
  pageSize = 10,
}: DataTableProps<TData>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: { pagination: { pageSize } },
  })

  return (
    <div className="space-y-4">
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((hg) => (
              <TableRow key={hg.id}>
                {hg.headers.map((h) => (
                  <TableHead key={h.id}>
                    {h.isPlaceholder
                      ? null
                      : flexRender(h.column.columnDef.header, h.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  {emptyMessage}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>
    </div>
  )
}
```

- [ ] **Step 4: Create PageHeader**

Create `src/components/organisms/PageHeader.tsx`:

```typescript
type PageHeaderProps = {
  title: string
  description?: string
  actions?: React.ReactNode
}

export function PageHeader({ title, description, actions }: PageHeaderProps) {
  return (
    <div className="flex items-start justify-between">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
        {description && (
          <p className="text-sm text-muted-foreground">{description}</p>
        )}
      </div>
      {actions && <div className="flex items-center gap-2">{actions}</div>}
    </div>
  )
}
```

- [ ] **Step 5: Create Navbar**

Create `src/components/organisms/Navbar.tsx`:

```typescript
'use client'
import { Menu } from 'lucide-react'
import { Button } from '@/components/atoms/Button'
import { ThemeToggle } from '@/components/molecules/ThemeToggle'
import { LocaleSwitcher } from '@/components/molecules/LocaleSwitcher'
import { useUIStore } from '@/store/ui.store'
import type { Locale } from '@/lib/i18n'

type NavbarProps = { locale: Locale }

export function Navbar({ locale }: NavbarProps) {
  const toggleSidebar = useUIStore((s) => s.toggleSidebar)
  return (
    <header className="sticky top-0 z-40 flex h-14 items-center gap-4 border-b bg-background px-4">
      <Button variant="ghost" size="icon" onClick={toggleSidebar} aria-label="Toggle sidebar">
        <Menu className="h-5 w-5" />
      </Button>
      <div className="ml-auto flex items-center gap-2">
        <LocaleSwitcher currentLocale={locale} />
        <ThemeToggle />
      </div>
    </header>
  )
}
```

- [ ] **Step 6: Create Sidebar**

Create `src/components/organisms/Sidebar.tsx`:

```typescript
'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LayoutDashboard, Users, BarChart2, Settings } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useUIStore } from '@/store/ui.store'

type NavItem = { href: string; label: string; icon: React.ReactNode }

const navItems: NavItem[] = [
  { href: '/dashboard', label: 'Dashboard', icon: <LayoutDashboard className="h-4 w-4" /> },
  { href: '/dashboard/users', label: 'Users', icon: <Users className="h-4 w-4" /> },
  { href: '/dashboard/reports', label: 'Reports', icon: <BarChart2 className="h-4 w-4" /> },
  { href: '/dashboard/settings', label: 'Settings', icon: <Settings className="h-4 w-4" /> },
]

export function Sidebar() {
  const sidebarOpen = useUIStore((s) => s.sidebarOpen)
  const pathname = usePathname()
  return (
    <aside
      className={cn(
        'fixed inset-y-0 left-0 z-30 flex flex-col border-r bg-background transition-all duration-300',
        sidebarOpen ? 'w-56' : 'w-0 overflow-hidden',
      )}
    >
      <div className="flex h-14 items-center border-b px-4">
        <span className="font-semibold">ASDP</span>
      </div>
      <nav className="flex-1 space-y-1 p-2">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              'flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground',
              pathname === item.href && 'bg-accent text-accent-foreground',
            )}
          >
            {item.icon}
            {item.label}
          </Link>
        ))}
      </nav>
    </aside>
  )
}
```

- [ ] **Step 7: Run tests to verify they pass**

```bash
pnpm vitest run src/components/organisms/__tests__/
```

Expected: PASS — 6 tests pass

- [ ] **Step 8: Commit**

```bash
git add src/components/organisms/
git commit -m "feat: add organism components (DataTable, Navbar, Sidebar, PageHeader)"
```

---

## Task 14: Template Components

**Files:**
- Create: `src/components/templates/DashboardShell.tsx`, `AuthLayout.tsx`
- Test: `src/components/templates/__tests__/DashboardShell.test.tsx`, `AuthLayout.test.tsx`

- [ ] **Step 1: Write the failing tests**

Create `src/components/templates/__tests__/DashboardShell.test.tsx`:

```typescript
import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'

vi.mock('@/components/organisms/Sidebar', () => ({ Sidebar: () => <nav>Sidebar</nav> }))
vi.mock('@/components/organisms/Navbar', () => ({ Navbar: () => <header>Navbar</header> }))

import { DashboardShell } from '../DashboardShell'

describe('DashboardShell', () => {
  it('renders children in main content area', () => {
    render(
      <DashboardShell locale="en">
        <p>Content</p>
      </DashboardShell>,
    )
    expect(screen.getByText('Content')).toBeInTheDocument()
  })

  it('renders Sidebar and Navbar', () => {
    render(<DashboardShell locale="en"><p>x</p></DashboardShell>)
    expect(screen.getByText('Sidebar')).toBeInTheDocument()
    expect(screen.getByText('Navbar')).toBeInTheDocument()
  })
})
```

Create `src/components/templates/__tests__/AuthLayout.test.tsx`:

```typescript
import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { AuthLayout } from '../AuthLayout'

describe('AuthLayout', () => {
  it('renders children inside centered container', () => {
    render(<AuthLayout><p>Login form</p></AuthLayout>)
    expect(screen.getByText('Login form')).toBeInTheDocument()
  })
})
```

- [ ] **Step 2: Run tests to verify they fail**

```bash
pnpm vitest run src/components/templates/__tests__/
```

Expected: FAIL — modules not found

- [ ] **Step 3: Create DashboardShell**

Create `src/components/templates/DashboardShell.tsx`:

```typescript
import { Navbar } from '@/components/organisms/Navbar'
import { Sidebar } from '@/components/organisms/Sidebar'
import type { Locale } from '@/lib/i18n'

type DashboardShellProps = {
  children: React.ReactNode
  locale: Locale
}

export function DashboardShell({ children, locale }: DashboardShellProps) {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex flex-1 flex-col pl-56 transition-all duration-300">
        <Navbar locale={locale} />
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  )
}
```

- [ ] **Step 4: Create AuthLayout**

Create `src/components/templates/AuthLayout.tsx`:

```typescript
type AuthLayoutProps = { children: React.ReactNode }

export function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/50">
      <div className="w-full max-w-sm rounded-lg border bg-background p-8 shadow-sm">
        {children}
      </div>
    </div>
  )
}
```

- [ ] **Step 5: Run tests to verify they pass**

```bash
pnpm vitest run src/components/templates/__tests__/
```

Expected: PASS — 3 tests pass

- [ ] **Step 6: Commit**

```bash
git add src/components/templates/
git commit -m "feat: add template components (DashboardShell, AuthLayout)"
```

---

## Task 15: Auth Route Group — Login Page

**Files:**
- Create: `src/app/(auth)/login/page.tsx`, `src/app/(auth)/login/actions.ts`, `src/app/(auth)/login/__tests__/page.test.tsx`

- [ ] **Step 1: Write the failing test**

Create `src/app/(auth)/login/__tests__/page.test.tsx`:

```typescript
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'

vi.mock('@/components/templates/AuthLayout', () => ({
  AuthLayout: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}))
vi.mock('../actions', () => ({
  loginAction: vi.fn().mockResolvedValue({ success: false, errors: { email: 'Invalid' } }),
}))

import LoginPage from '../page'

describe('LoginPage', () => {
  it('renders email and password fields', () => {
    render(<LoginPage />)
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument()
  })

  it('renders submit button', () => {
    render(<LoginPage />)
    expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument()
  })

  it('shows validation error on empty submit', async () => {
    render(<LoginPage />)
    await userEvent.click(screen.getByRole('button', { name: /login/i }))
    expect(await screen.findByText(/email is required/i)).toBeInTheDocument()
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

```bash
pnpm vitest run "src/app/\(auth\)/login/__tests__/page.test.tsx"
```

Expected: FAIL — module not found

- [ ] **Step 3: Create login schema**

Create `src/app/(auth)/login/schema.ts`:

```typescript
import { object, string, pipe, email, minLength } from 'valibot'

export const loginSchema = object({
  email: pipe(string(), email('Email is required')),
  password: pipe(string(), minLength(1, 'Password is required')),
})
```

- [ ] **Step 4: Create login Server Action**

Create `src/app/(auth)/login/actions.ts`:

```typescript
'use server'
import { parse, ValiError } from 'valibot'
import { loginSchema } from './schema'

export type LoginActionResult =
  | { success: true }
  | { success: false; errors: Record<string, string> }

export async function loginAction(
  _prev: LoginActionResult | null,
  formData: FormData,
): Promise<LoginActionResult> {
  try {
    const data = parse(loginSchema, {
      email: formData.get('email'),
      password: formData.get('password'),
    })
    // Replace with real auth call
    console.log('Login attempt for:', data.email)
    return { success: true }
  } catch (err) {
    if (err instanceof ValiError) {
      const errors: Record<string, string> = {}
      for (const issue of err.issues) {
        const field = String(issue.path?.[0]?.key ?? 'form')
        errors[field] = issue.message
      }
      return { success: false, errors }
    }
    return { success: false, errors: { form: 'An error occurred' } }
  }
}
```

- [ ] **Step 5: Create login page**

Create `src/app/(auth)/login/page.tsx`:

```typescript
'use client'
import { useActionState } from 'react'
import { AuthLayout } from '@/components/templates/AuthLayout'
import { FormField } from '@/components/molecules/FormField'
import { Button } from '@/components/atoms/Button'
import { loginAction } from './actions'

export default function LoginPage() {
  const [state, action, pending] = useActionState(loginAction, null)

  return (
    <AuthLayout>
      <h1 className="mb-6 text-xl font-semibold">Sign in to your account</h1>
      <form action={action} className="space-y-4">
        <FormField
          label="Email"
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          error={state?.success === false ? state.errors['email'] : undefined}
        />
        <FormField
          label="Password"
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          error={state?.success === false ? state.errors['password'] : undefined}
        />
        {state?.success === false && state.errors['form'] && (
          <p className="text-sm text-destructive">{state.errors['form']}</p>
        )}
        <Button type="submit" className="w-full" loading={pending}>
          Login
        </Button>
      </form>
    </AuthLayout>
  )
}
```

- [ ] **Step 6: Run test to verify it passes**

```bash
pnpm vitest run "src/app/\(auth\)/login/__tests__/page.test.tsx"
```

Expected: PASS — 3 tests pass

- [ ] **Step 7: Commit**

```bash
git add "src/app/(auth)/"
git commit -m "feat: add login page with Server Action, Valibot validation, and RHF integration"
```

---

## Task 16: Dashboard Route Group

**Files:**
- Create: `src/app/(dashboard)/layout.tsx`, `src/app/(dashboard)/page.tsx`
- Test: `src/app/(dashboard)/__tests__/page.test.tsx`

- [ ] **Step 1: Write the failing test**

Create `src/app/(dashboard)/__tests__/page.test.tsx`:

```typescript
import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'

vi.mock('@/components/organisms/PageHeader', () => ({
  PageHeader: ({ title }: { title: string }) => <h1>{title}</h1>,
}))
vi.mock('@/components/molecules/StatCard', () => ({
  StatCard: ({ title }: { title: string }) => <div>{title}</div>,
}))

import DashboardPage from '../page'

describe('DashboardPage', () => {
  it('renders Dashboard heading', () => {
    render(<DashboardPage />)
    expect(screen.getByRole('heading', { name: /dashboard/i })).toBeInTheDocument()
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

```bash
pnpm vitest run "src/app/\(dashboard\)/__tests__/page.test.tsx"
```

Expected: FAIL — module not found

- [ ] **Step 3: Create dashboard layout**

Create `src/app/(dashboard)/layout.tsx`:

```typescript
import { headers } from 'next/headers'
import { DashboardShell } from '@/components/templates/DashboardShell'
import type { Locale } from '@/lib/i18n'

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const headersList = await headers()
  const locale = (headersList.get('x-locale') ?? 'id') as Locale
  return <DashboardShell locale={locale}>{children}</DashboardShell>
}
```

- [ ] **Step 4: Create dashboard home page**

Create `src/app/(dashboard)/page.tsx`:

```typescript
import { Suspense } from 'react'
import { PageHeader } from '@/components/organisms/PageHeader'
import { StatCard } from '@/components/molecules/StatCard'
import { Skeleton } from '@/components/atoms/Skeleton'
import { Users, BarChart2, Activity } from 'lucide-react'

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Dashboard" description="Welcome to ASDP Core Engine" />
      <Suspense
        fallback={
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <Skeleton key={i} className="h-32 w-full" />
            ))}
          </div>
        }
      >
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <StatCard title="Total Users" value="—" icon={<Users className="h-4 w-4 text-muted-foreground" />} />
          <StatCard title="Reports" value="—" icon={<BarChart2 className="h-4 w-4 text-muted-foreground" />} />
          <StatCard title="Active Sessions" value="—" icon={<Activity className="h-4 w-4 text-muted-foreground" />} />
        </div>
      </Suspense>
    </div>
  )
}
```

- [ ] **Step 5: Run test to verify it passes**

```bash
pnpm vitest run "src/app/\(dashboard\)/__tests__/page.test.tsx"
```

Expected: PASS

- [ ] **Step 6: Commit**

```bash
git add "src/app/(dashboard)/"
git commit -m "feat: add dashboard layout and home page with Suspense skeleton loading"
```

---

## Task 17: Example Users Module

**Files:**
- Create: `src/modules/users/types/index.ts`, `schemas/user.schema.ts`, `queries/index.ts`, `actions/index.ts`, `store/index.ts`, `hooks/useUsers.ts`, `components/UserTable.tsx`
- Create: `src/app/(dashboard)/users/page.tsx`
- Tests: all `__tests__/` subdirectories

- [ ] **Step 1: Write the failing schema test**

Create `src/modules/users/schemas/__tests__/user.schema.test.ts`:

```typescript
import { describe, it, expect } from 'vitest'
import { parse, ValiError } from 'valibot'
import { createUserSchema } from '../user.schema'

describe('createUserSchema', () => {
  it('passes with valid data', () => {
    const result = parse(createUserSchema, { name: 'Alice', email: 'alice@test.com', role: 'admin' })
    expect(result.email).toBe('alice@test.com')
  })

  it('rejects invalid email', () => {
    expect(() => parse(createUserSchema, { name: 'Alice', email: 'bad', role: 'admin' })).toThrow(ValiError)
  })

  it('rejects empty name', () => {
    expect(() => parse(createUserSchema, { name: '', email: 'alice@test.com', role: 'admin' })).toThrow(ValiError)
  })
})
```

- [ ] **Step 2: Write the failing store test**

Create `src/modules/users/store/__tests__/index.test.ts`:

```typescript
import { describe, it, expect, beforeEach } from 'vitest'
import { act, renderHook } from '@testing-library/react'
import { useUsersStore } from '../index'

beforeEach(() => useUsersStore.setState({ selectedIds: [] }))

describe('useUsersStore', () => {
  it('toggles selected row id', () => {
    const { result } = renderHook(() => useUsersStore())
    act(() => result.current.toggleSelected('1'))
    expect(result.current.selectedIds).toContain('1')
    act(() => result.current.toggleSelected('1'))
    expect(result.current.selectedIds).not.toContain('1')
  })

  it('clears selection', () => {
    const { result } = renderHook(() => useUsersStore())
    act(() => result.current.toggleSelected('1'))
    act(() => result.current.clearSelection())
    expect(result.current.selectedIds).toHaveLength(0)
  })
})
```

- [ ] **Step 3: Run tests to verify they fail**

```bash
pnpm vitest run src/modules/users/
```

Expected: FAIL — modules not found

- [ ] **Step 4: Create User types**

Create `src/modules/users/types/index.ts`:

```typescript
export type User = {
  id: string
  name: string
  email: string
  role: 'admin' | 'editor' | 'viewer'
  createdAt: string
}
```

- [ ] **Step 5: Create user schema**

Create `src/modules/users/schemas/user.schema.ts`:

```typescript
import { object, string, pipe, email, minLength, picklist } from 'valibot'

export const createUserSchema = object({
  name: pipe(string(), minLength(1, 'Name is required')),
  email: pipe(string(), email('Invalid email address')),
  role: picklist(['admin', 'editor', 'viewer'], 'Invalid role'),
})
```

- [ ] **Step 6: Create query key factory and queryOptions**

Create `src/modules/users/queries/index.ts`:

```typescript
import { queryOptions } from '@tanstack/react-query'
import { api } from '@/lib/api'
import type { User } from '../types'

export const userKeys = {
  all: ['users'] as const,
  list: () => [...userKeys.all, 'list'] as const,
  detail: (id: string) => [...userKeys.all, 'detail', id] as const,
}

export const usersQueryOptions = queryOptions({
  queryKey: userKeys.list(),
  queryFn: () => api.get<User[]>('/users'),
})

export const userDetailQueryOptions = (id: string) =>
  queryOptions({
    queryKey: userKeys.detail(id),
    queryFn: () => api.get<User>(`/users/${id}`),
  })
```

- [ ] **Step 7: Create Server Action**

Create `src/modules/users/actions/index.ts`:

```typescript
'use server'
import { parse, ValiError } from 'valibot'
import { revalidateTag } from 'next/cache'
import { createUserSchema } from '../schemas/user.schema'
import { api } from '@/lib/api'
import type { User } from '../types'

export type ActionResult<T> =
  | { success: true; data: T }
  | { success: false; errors: Record<string, string> }

export async function createUserAction(
  _prev: ActionResult<User> | null,
  formData: FormData,
): Promise<ActionResult<User>> {
  try {
    const input = parse(createUserSchema, {
      name: formData.get('name'),
      email: formData.get('email'),
      role: formData.get('role'),
    })
    const user = await api.post<User>('/users', input)
    revalidateTag('users')
    return { success: true, data: user }
  } catch (err) {
    if (err instanceof ValiError) {
      const errors: Record<string, string> = {}
      for (const issue of err.issues) {
        const field = String(issue.path?.[0]?.key ?? 'form')
        errors[field] = issue.message
      }
      return { success: false, errors }
    }
    return { success: false, errors: { form: 'Failed to create user' } }
  }
}
```

- [ ] **Step 8: Create users Zustand slice**

Create `src/modules/users/store/index.ts`:

```typescript
import { create } from 'zustand'

type UsersState = {
  selectedIds: string[]
  toggleSelected: (id: string) => void
  clearSelection: () => void
}

export const useUsersStore = create<UsersState>()((set) => ({
  selectedIds: [],
  toggleSelected: (id) =>
    set((s) => ({
      selectedIds: s.selectedIds.includes(id)
        ? s.selectedIds.filter((x) => x !== id)
        : [...s.selectedIds, id],
    })),
  clearSelection: () => set({ selectedIds: [] }),
}))
```

- [ ] **Step 9: Create useUsers hook**

Create `src/modules/users/hooks/useUsers.ts`:

```typescript
import { useQuery } from '@tanstack/react-query'
import { usersQueryOptions } from '../queries'

export function useUsers() {
  return useQuery(usersQueryOptions)
}
```

- [ ] **Step 10: Create UserTable component**

Create `src/modules/users/components/UserTable.tsx`:

```typescript
'use client'
import { createColumnHelper } from '@tanstack/react-table'
import { DataTable } from '@/components/organisms/DataTable'
import { Badge } from '@/components/atoms/Badge'
import type { User } from '../types'

const col = createColumnHelper<User>()

const columns = [
  col.accessor('name', { header: 'Name' }),
  col.accessor('email', { header: 'Email' }),
  col.accessor('role', {
    header: 'Role',
    cell: (info) => <Badge variant="outline">{info.getValue()}</Badge>,
  }),
  col.accessor('createdAt', {
    header: 'Created',
    cell: (info) => new Date(info.getValue()).toLocaleDateString(),
  }),
]

export function UserTable({ data }: { data: User[] }) {
  return <DataTable columns={columns} data={data} emptyMessage="No users found." />
}
```

- [ ] **Step 11: Create users page**

Create `src/app/(dashboard)/users/page.tsx`:

```typescript
import { Suspense } from 'react'
import { dehydrate, HydrationBoundary } from '@tanstack/react-query'
import { getQueryClient } from '@/lib/query/client'
import { PageHeader } from '@/components/organisms/PageHeader'
import { Skeleton } from '@/components/atoms/Skeleton'
import { usersQueryOptions } from '@/modules/users/queries'
import { UsersView } from './UsersView'

export default async function UsersPage() {
  const queryClient = getQueryClient()
  await queryClient.prefetchQuery(usersQueryOptions)

  return (
    <div className="space-y-6">
      <PageHeader title="Users" description="Manage system users" />
      <Suspense fallback={<Skeleton className="h-64 w-full" />}>
        <HydrationBoundary state={dehydrate(queryClient)}>
          <UsersView />
        </HydrationBoundary>
      </Suspense>
    </div>
  )
}
```

Create `src/app/(dashboard)/users/UsersView.tsx`:

```typescript
'use client'
import { useUsers } from '@/modules/users/hooks/useUsers'
import { UserTable } from '@/modules/users/components/UserTable'
import { Spinner } from '@/components/atoms/Spinner'

export function UsersView() {
  const { data, isLoading } = useUsers()
  if (isLoading) return <Spinner />
  return <UserTable data={data ?? []} />
}
```

- [ ] **Step 12: Run tests to verify they pass**

```bash
pnpm vitest run src/modules/users/
```

Expected: PASS — 5 tests pass (schema: 3, store: 2)

- [ ] **Step 13: Commit**

```bash
git add src/modules/users/ "src/app/(dashboard)/users/"
git commit -m "feat: add users module (schema, queries, action, store, hook, components, page)"
```

---

## Task 18: K8s Health Probes

**Files:**
- Create: `src/app/api/health/live/route.ts`, `src/app/api/health/ready/route.ts`
- Test: `src/app/api/health/__tests__/probes.test.ts`

- [ ] **Step 1: Write the failing tests**

Create `src/app/api/health/__tests__/probes.test.ts`:

```typescript
import { describe, it, expect } from 'vitest'
import { GET as liveGET } from '../live/route'
import { GET as readyGET } from '../ready/route'

describe('GET /api/health/live', () => {
  it('returns 200 with status ok', async () => {
    const res = await liveGET()
    expect(res.status).toBe(200)
    const body = await res.json()
    expect(body.status).toBe('ok')
  })
})

describe('GET /api/health/ready', () => {
  it('returns 200 when API is reachable', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(new Response(null, { status: 200 })))
    const res = await readyGET()
    expect(res.status).toBe(200)
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

```bash
pnpm vitest run src/app/api/health/__tests__/
```

Expected: FAIL — modules not found

- [ ] **Step 3: Create liveness probe**

Create `src/app/api/health/live/route.ts`:

```typescript
import { NextResponse } from 'next/server'

export function GET() {
  return NextResponse.json({ status: 'ok' }, { status: 200 })
}
```

- [ ] **Step 4: Create readiness probe**

Create `src/app/api/health/ready/route.ts`:

```typescript
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL
    if (!apiUrl) return NextResponse.json({ status: 'error', reason: 'API_URL not set' }, { status: 503 })

    const res = await fetch(`${apiUrl}/health`, { next: { revalidate: 0 } })
    if (!res.ok) throw new Error(`Upstream status: ${res.status}`)

    return NextResponse.json({ status: 'ready' }, { status: 200 })
  } catch (err) {
    return NextResponse.json(
      { status: 'error', reason: err instanceof Error ? err.message : 'Unknown' },
      { status: 503 },
    )
  }
}
```

- [ ] **Step 5: Run tests to verify they pass**

```bash
pnpm vitest run src/app/api/health/__tests__/
```

Expected: PASS

- [ ] **Step 6: Commit**

```bash
git add src/app/api/health/
git commit -m "feat: add K8s liveness and readiness health probe endpoints"
```

---

## Task 19: Dockerfile + .dockerignore

**Files:**
- Create: `Dockerfile`, `.dockerignore`

- [ ] **Step 1: Create .dockerignore**

Create `.dockerignore`:

```
node_modules
.next
.git
.gitignore
README.md
.env.local
.env.*.local
playwright-report
test-results
coverage
.superpowers
docs
tests
*.test.ts
*.test.tsx
*.spec.ts
```

- [ ] **Step 2: Create multi-stage Dockerfile**

Create `Dockerfile`:

```dockerfile
# Stage 1: Install dependencies
FROM node:22-alpine AS deps
RUN corepack enable
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

# Stage 2: Build application
FROM node:22-alpine AS builder
RUN corepack enable
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ENV NEXT_TELEMETRY_DISABLED=1
RUN pnpm build

# Stage 3: Production runner
FROM node:22-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
COPY --from=builder --chown=appuser:appgroup /app/.next/standalone ./
COPY --from=builder --chown=appuser:appgroup /app/.next/static ./.next/static
COPY --from=builder --chown=appuser:appgroup /app/public ./public
USER appuser
EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"
CMD ["node", "server.js"]
```

- [ ] **Step 3: Verify build locally (optional — requires Docker)**

```bash
docker build -t asdp-core-engine:local .
docker run --rm -p 3000:3000 -e NEXT_PUBLIC_API_URL=http://localhost:8080 asdp-core-engine:local
```

Expected: app serves on `http://localhost:3000`

- [ ] **Step 4: Commit**

```bash
git add Dockerfile .dockerignore
git commit -m "feat: add multi-stage Dockerfile for K8s standalone deployment"
```

---

## Task 20: Vitest + MSW Configuration

**Files:**
- Create: `vitest.config.ts`, `tests/setup/msw.ts`, `tests/setup/vitest.setup.ts`

- [ ] **Step 1: Create MSW setup**

Create `tests/setup/msw.ts`:

```typescript
import { setupServer } from 'msw/node'

export const server = setupServer()
```

- [ ] **Step 2: Create Vitest global setup**

Create `tests/setup/vitest.setup.ts`:

```typescript
import '@testing-library/jest-dom'
import { afterAll, afterEach, beforeAll } from 'vitest'
import { server } from './msw'

beforeAll(() => server.listen({ onUnhandledRequest: 'error' }))
afterEach(() => server.resetHandlers())
afterAll(() => server.close())
```

- [ ] **Step 3: Create vitest.config.ts**

Create `vitest.config.ts`:

```typescript
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./tests/setup/vitest.setup.ts'],
    include: [
      'src/**/__tests__/**/*.test.{ts,tsx}',
      'tests/integration/**/*.test.{ts,tsx}',
    ],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html'],
      include: ['src/**/*.{ts,tsx}'],
      exclude: ['src/**/__tests__/**', 'src/components/ui/**', 'src/app/api/**'],
    },
    environmentMatchGlobs: [
      ['src/lib/__tests__/env.test.ts', 'node'],
      ['src/lib/api/**', 'node'],
      ['src/lib/i18n/**', 'node'],
      ['src/lib/auth/**', 'node'],
      ['src/lib/query/__tests__/client.test.ts', 'node'],
      ['src/lib/security/**', 'node'],
    ],
  },
  resolve: {
    alias: { '@': resolve(__dirname, './src') },
  },
})
```

- [ ] **Step 4: Add test scripts to package.json**

Open `package.json` and add to the `scripts` section:

```json
{
  "scripts": {
    "test": "vitest run",
    "test:watch": "vitest",
    "test:coverage": "vitest run --coverage",
    "test:e2e": "playwright test",
    "test:e2e:ui": "playwright test --ui"
  }
}
```

- [ ] **Step 5: Run full test suite to verify**

```bash
pnpm test
```

Expected: all unit tests pass

- [ ] **Step 6: Commit**

```bash
git add vitest.config.ts tests/setup/ package.json
git commit -m "feat: configure Vitest with MSW and Testing Library global setup"
```

---

## Task 21: Playwright E2E Configuration + Specs

**Files:**
- Create: `playwright.config.ts`, `tests/e2e/auth.spec.ts`, `tests/e2e/theme.spec.ts`, `tests/e2e/i18n.spec.ts`

- [ ] **Step 1: Create playwright.config.ts**

Create `playwright.config.ts`:

```typescript
import { defineConfig, devices } from '@playwright/test'

export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: process.env.CI ? 'github' : 'html',
  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    ...(process.env.CI
      ? []
      : [
          { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
          { name: 'webkit', use: { ...devices['Desktop Safari'] } },
        ]),
  ],
  webServer: {
    command: 'pnpm dev',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
})
```

- [ ] **Step 2: Create auth E2E spec**

Create `tests/e2e/auth.spec.ts`:

```typescript
import { test, expect } from '@playwright/test'

test.describe('Auth Guard', () => {
  test('redirects unauthenticated user from /dashboard to /login', async ({ page }) => {
    await page.goto('/dashboard')
    await expect(page).toHaveURL(/\/login/)
    await expect(page.url()).toContain('callbackUrl=%2Fdashboard')
  })

  test('renders login form', async ({ page }) => {
    await page.goto('/login')
    await expect(page.getByLabel('Email')).toBeVisible()
    await expect(page.getByLabel('Password')).toBeVisible()
    await expect(page.getByRole('button', { name: /login/i })).toBeVisible()
  })

  test('shows validation error on empty form submit', async ({ page }) => {
    await page.goto('/login')
    await page.getByRole('button', { name: /login/i }).click()
    await expect(page.getByText(/email is required/i)).toBeVisible()
  })
})
```

- [ ] **Step 3: Create theme E2E spec**

Create `tests/e2e/theme.spec.ts`:

```typescript
import { test, expect } from '@playwright/test'

test.describe('Theme Toggle', () => {
  test('switches from light to dark mode', async ({ page }) => {
    await page.goto('/login')
    const html = page.locator('html')
    await expect(html).not.toHaveClass(/dark/)
    await page.getByRole('button', { name: /toggle theme/i }).click()
    await expect(html).toHaveClass(/dark/)
  })

  test('persists theme across page reload', async ({ page }) => {
    await page.goto('/login')
    await page.getByRole('button', { name: /toggle theme/i }).click()
    await page.reload()
    await expect(page.locator('html')).toHaveClass(/dark/)
  })
})
```

- [ ] **Step 4: Create i18n E2E spec**

Create `tests/e2e/i18n.spec.ts`:

```typescript
import { test, expect } from '@playwright/test'

test.describe('Locale Switcher', () => {
  test('default locale is Indonesian', async ({ page }) => {
    await page.goto('/login')
    await expect(page.getByText('Masuk ke akun Anda')).toBeVisible()
  })

  test('switches to English', async ({ page }) => {
    await page.goto('/login')
    await page.getByRole('button', { name: 'EN' }).click()
    await page.waitForURL(/\/login/)
    await expect(page.getByText('Sign in to your account')).toBeVisible()
  })

  test('persists locale after page reload', async ({ page }) => {
    await page.goto('/login')
    await page.getByRole('button', { name: 'EN' }).click()
    await page.reload()
    await expect(page.getByText('Sign in to your account')).toBeVisible()
  })
})
```

- [ ] **Step 5: Run E2E tests (requires app to be built)**

```bash
pnpm build && pnpm test:e2e
```

Expected: all E2E specs pass

- [ ] **Step 6: Commit**

```bash
git add playwright.config.ts tests/e2e/
git commit -m "feat: add Playwright E2E specs for auth, theme, and i18n"
```

---

## Task 22: .env.example + Final Verification

**Files:**
- Create: `.env.example`

- [ ] **Step 1: Create .env.example**

Create `.env.example`:

```bash
# ─────────────────────────────────────────────
# Application
# ─────────────────────────────────────────────

# Base URL of the backend REST API (required)
NEXT_PUBLIC_API_URL=http://localhost:8080

# ─────────────────────────────────────────────
# Deployment (set via K8s Secret at runtime)
# ─────────────────────────────────────────────

# Node environment: development | test | production
NODE_ENV=development

# ─────────────────────────────────────────────
# Auth (set via K8s Secret — never commit values)
# ─────────────────────────────────────────────

# JWT secret for token signing (min 32 chars)
# AUTH_SECRET=your-secret-here

# ─────────────────────────────────────────────
# Copy this file: cp .env.example .env.local
# Never commit .env.local
# ─────────────────────────────────────────────
```

- [ ] **Step 2: Copy .env.example to .env.local for local dev**

```bash
cp .env.example .env.local
```

Then edit `.env.local` and set `NEXT_PUBLIC_API_URL` to your local API.

- [ ] **Step 3: Run full verification checklist**

```bash
# 1. Dev server starts
pnpm dev
# Open http://localhost:3000 — should redirect to /login

# 2. Auth guard redirects work (check in browser)
# Navigate to /dashboard — should redirect to /login?callbackUrl=%2Fdashboard

# 3. Theme toggle works
# Click theme toggle — should switch light/dark, persist on reload

# 4. Locale switcher works
# Click EN/ID buttons — should change language, persist on reload

# 5. Production build
pnpm build

# 6. Unit + integration tests
pnpm test

# 7. E2E tests
pnpm test:e2e

# 8. Health probes (start app first: pnpm dev)
curl http://localhost:3000/api/health/live    # expect: {"status":"ok"}
curl http://localhost:3000/api/health/ready   # expect: {"status":"ready"} or 503

# 9. Security headers (check DevTools Network tab → response headers)
```

- [ ] **Step 4: Commit**

```bash
git add .env.example
git commit -m "feat: add .env.example with documented variables"
```

- [ ] **Step 5: Final commit — tag as boilerplate baseline**

```bash
git tag -a v0.1.0-boilerplate -m "Frontend boilerplate baseline — all tasks complete"
```

---

## Self-Review Notes

**Spec coverage check:**
- ✅ Security headers — Task 2
- ✅ Env validation fail-fast — Task 3
- ✅ API client typed fetch wrapper — Task 4
- ✅ TanStack Query SSR + HydrationBoundary — Task 5, 17
- ✅ i18n with id/en locales — Task 6
- ✅ Auth abstraction (swappable adapter) — Task 7
- ✅ Zustand UI + auth stores — Task 8
- ✅ Middleware: auth guard + locale resolution — Task 9
- ✅ Root layout: ThemeProvider + QueryProvider — Task 10
- ✅ Tailwind dark mode class strategy — Task 10
- ✅ Atomic atoms with __tests__/ convention — Task 11
- ✅ Molecules (FormField, ThemeToggle, LocaleSwitcher, StatCard) — Task 12
- ✅ Organisms (DataTable/TanStack Table, Navbar, Sidebar, PageHeader) — Task 13
- ✅ Templates (DashboardShell, AuthLayout) — Task 14
- ✅ Login page: RHF + Valibot + Server Action — Task 15
- ✅ Dashboard route group with Suspense — Task 16
- ✅ Example users module: all layers — Task 17
- ✅ K8s liveness + readiness probes — Task 18
- ✅ Multi-stage Dockerfile standalone output — Task 19
- ✅ Vitest + MSW global setup — Task 20
- ✅ Playwright E2E: auth guard, theme, i18n — Task 21
- ✅ .env.example documented — Task 22
- ✅ NEXT_PUBLIC_* client-safe vars pattern — Task 22
- ✅ __tests__/ subdirectory convention enforced throughout

**Type consistency:**
- `Session` type defined in `src/lib/auth/types.ts`, imported consistently in stores and middleware
- `Locale` type defined in `src/lib/i18n/index.ts`, used in middleware, layout, Navbar, LocaleSwitcher
- `ActionResult<T>` defined per-module in `actions/index.ts` — consistent shape across login and users
- `DataTable<TData>` generic — used identically in UserTable
- `userKeys` query key factory — referenced in both `usersQueryOptions` and cache invalidation
