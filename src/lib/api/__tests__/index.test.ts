import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'

import { ApiError } from '../types'
import { api } from '../index'

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

  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it('throws ApiError on non-ok response', async () => {
    vi.mocked(fetch).mockResolvedValueOnce(new Response(null, { status: 401, statusText: 'Unauthorized' }))
    await expect(api.get('/test')).rejects.toThrow(ApiError)
  })

  it('returns parsed JSON on success', async () => {
    vi.mocked(fetch).mockResolvedValueOnce(new Response(JSON.stringify({ id: 1 }), { status: 200 }))
    const result = await api.get<{ id: number }>('/test')

    expect(result.id).toBe(1)
  })
})
