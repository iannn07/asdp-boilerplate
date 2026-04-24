import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'

describe('env validation', () => {
  const original = process.env

  beforeEach(() => {
    process.env = { ...original }
    vi.resetModules()
  })

  afterEach(() => {
    process.env = original
    vi.resetModules()
  })

  it('parses valid env successfully', async () => {
    process.env.NODE_ENV = 'test'
    process.env.NEXT_PUBLIC_API_URL = 'http://localhost:8080'
    const { env } = await import('../env')

    expect(env.NEXT_PUBLIC_API_URL).toBe('http://localhost:8080')
  })

  it('throws when NEXT_PUBLIC_API_URL is missing', async () => {
    delete process.env.NEXT_PUBLIC_API_URL
    await expect(import('../env')).rejects.toThrow()
  })
})
