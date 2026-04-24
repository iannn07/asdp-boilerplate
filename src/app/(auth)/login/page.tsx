'use client'
import { useActionState } from 'react'
import { AuthLayout } from '@/components/templates/AuthLayout'
import { FormField } from '@/components/molecules/FormField'
import { Button } from '@/components/atoms/Button'
import { loginAction } from './actions'

export default function LoginPage() {
  const [state, action, pending] = useActionState(loginAction, null)

  return (
    <AuthLayout>
      <h1 className="mb-6 text-xl font-semibold">Sign in to your account</h1>
      <form action={action} className="space-y-4">
        <FormField
          label="Email"
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          error={state?.success === false ? state.errors['email'] : undefined}
        />
        <FormField
          label="Password"
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          error={state?.success === false ? state.errors['password'] : undefined}
        />
        {state?.success === false && state.errors['form'] && (
          <p className="text-sm text-destructive">{state.errors['form']}</p>
        )}
        <Button type="submit" className="w-full" loading={pending}>
          Login
        </Button>
      </form>
    </AuthLayout>
  )
}
