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
