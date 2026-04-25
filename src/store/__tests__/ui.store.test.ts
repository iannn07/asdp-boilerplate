import { describe, it, expect, beforeEach } from 'vitest'
import { act, renderHook } from '@testing-library/react'

import { useUIStore } from '../ui.store'

beforeEach(() => {
  useUIStore.setState({ sidebarOpen: true, locale: 'en' })
})

describe('useUIStore', () => {
  it('toggles sidebar', () => {
    const { result } = renderHook(() => useUIStore())

    act(() => result.current.toggleSidebar())
    expect(result.current.sidebarOpen).toBe(false)
  })

  it('sets locale', () => {
    const { result } = renderHook(() => useUIStore())

    act(() => result.current.setLocale('id'))
    expect(result.current.locale).toBe('id')
  })
})
