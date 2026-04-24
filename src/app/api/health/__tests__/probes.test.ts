import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'

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
  beforeEach(() => {
    process.env.NEXT_PUBLIC_API_URL = 'http://localhost:8080'
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(new Response(null, { status: 200 })))
  })

  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it('returns 200 when API is reachable', async () => {
    const res = await readyGET()

    expect(res.status).toBe(200)
  })
})
