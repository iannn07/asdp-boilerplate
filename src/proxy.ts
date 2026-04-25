import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

import { getAuthAdapter } from '@/lib/auth'

const PROTECTED_PREFIXES = ['/dashboard']
const AUTH_ONLY_PATHS = ['/login']

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  const isProtected = PROTECTED_PREFIXES.some(p => pathname.startsWith(p))
  const isAuthOnly = AUTH_ONLY_PATHS.some(p => pathname.startsWith(p))

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

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)']
}
