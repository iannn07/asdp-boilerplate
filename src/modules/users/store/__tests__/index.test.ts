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
