import { describe, it, expect, beforeEach } from 'vitest'
import { getAuthAdapter, setAuthAdapter } from '../index'
import type { AuthAdapter, Session } from '../types'

beforeEach(() => {
  // Reset to stub adapter before each test
  setAuthAdapter({
    async validateSession(_token: string) {
      return null
    },
    getToken(_request: Request) {
      return null
    },
  })
})

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
