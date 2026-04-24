import { describe, it, expect } from 'vitest'

import { securityHeaders } from '../headers'

describe('securityHeaders', () => {
  it('includes X-Frame-Options DENY', () => {
    const header = securityHeaders.find(h => h.key === 'X-Frame-Options')

    expect(header?.value).toBe('DENY')
  })

  it('includes X-Content-Type-Options nosniff', () => {
    const header = securityHeaders.find(h => h.key === 'X-Content-Type-Options')

    expect(header?.value).toBe('nosniff')
  })

  it('includes Content-Security-Policy', () => {
    const header = securityHeaders.find(h => h.key === 'Content-Security-Policy')

    expect(header?.value).toContain("script-src 'self'")
  })

  it('includes Strict-Transport-Security', () => {
    const header = securityHeaders.find(h => h.key === 'Strict-Transport-Security')

    expect(header?.value).toContain('max-age=63072000')
  })

  it('exports an array of 7 headers', () => {
    expect(securityHeaders).toHaveLength(7)
  })
})
