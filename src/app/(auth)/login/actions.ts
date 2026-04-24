'use server'
import { parse, ValiError } from 'valibot'

import { loginSchema } from './schema'

export type LoginActionResult = { success: true } | { success: false; errors: Record<string, string> }

export async function loginAction(_prev: LoginActionResult | null, formData: FormData): Promise<LoginActionResult> {
  try {
    const data = parse(loginSchema, {
      email: formData.get('email'),
      password: formData.get('password')
    })

    console.log('Login attempt for:', data.email)
    
return { success: true }
  } catch (err) {
    if (err instanceof ValiError) {
      const errors: Record<string, string> = {}

      for (const issue of err.issues) {
        const field = String(issue.path?.[0]?.key ?? 'form')

        errors[field] = issue.message
      }

      
return { success: false, errors }
    }

    
return { success: false, errors: { form: 'An error occurred' } }
  }
}
