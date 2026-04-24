'use server'
import { parse, ValiError } from 'valibot'
import { revalidateTag } from 'next/cache'
import { createUserSchema } from '../schemas/user.schema'
import { api } from '@/lib/api'
import type { User } from '../types'

export type ActionResult<T> =
  | { success: true; data: T }
  | { success: false; errors: Record<string, string> }

export async function createUserAction(
  _prev: ActionResult<User> | null,
  formData: FormData,
): Promise<ActionResult<User>> {
  try {
    const input = parse(createUserSchema, {
      name: formData.get('name'),
      email: formData.get('email'),
      role: formData.get('role'),
    })
    const user = await api.post<User>('/users', input)
    revalidateTag('users')
    return { success: true, data: user }
  } catch (err) {
    if (err instanceof ValiError) {
      const errors: Record<string, string> = {}
      for (const issue of err.issues) {
        const field = String(issue.path?.[0]?.key ?? 'form')
        errors[field] = issue.message
      }
      return { success: false, errors }
    }
    return { success: false, errors: { form: 'Failed to create user' } }
  }
}
