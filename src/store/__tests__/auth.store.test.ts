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
