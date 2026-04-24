import { describe, it, expect } from 'vitest'
import { parse, ValiError } from 'valibot'
import { createUserSchema } from '../user.schema'

describe('createUserSchema', () => {
  it('passes with valid data', () => {
    const result = parse(createUserSchema, { name: 'Alice', email: 'alice@test.com', role: 'admin' })
    expect(result.email).toBe('alice@test.com')
  })

  it('rejects invalid email', () => {
    expect(() => parse(createUserSchema, { name: 'Alice', email: 'bad', role: 'admin' })).toThrow(ValiError)
  })

  it('rejects empty name', () => {
    expect(() => parse(createUserSchema, { name: '', email: 'alice@test.com', role: 'admin' })).toThrow(ValiError)
  })
})
