import { object, string, pipe, email, minLength, picklist } from 'valibot'

export const createUserSchema = object({
  name: pipe(string(), minLength(1, 'Name is required')),
  email: pipe(string(), email('Invalid email address')),
  role: picklist(['admin', 'editor', 'viewer'], 'Invalid role'),
})
