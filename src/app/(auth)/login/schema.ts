import { object, string, pipe, email, minLength } from 'valibot'

export const loginSchema = object({
  email: pipe(string(), email('Email is required')),
  password: pipe(string(), minLength(1, 'Password is required'))
})
