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
