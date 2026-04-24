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
