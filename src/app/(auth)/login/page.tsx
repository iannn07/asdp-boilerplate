'use client'
import { useActionState } from 'react'

import { AuthLayout } from '@/components/templates/AuthLayout'
import { FormField } from '@/components/molecules/FormField'
import { Button } from '@/components/atoms/Button'
import { useTranslation } from '@/lib/i18n/useTranslation'
import { loginAction } from './actions'

export default function LoginPage() {
  const [state, action, pending] = useActionState(loginAction, null)
  const { t } = useTranslation()

  return (
    <AuthLayout>
      <h1 className='mb-6 text-xl font-semibold'>{t('auth.loginTitle')}</h1>
      <form action={action} className='space-y-4'>
        <FormField
          label={t('auth.email')}
          id='email'
          name='email'
          type='email'
          autoComplete='email'
          error={state?.success === false ? state.errors['email'] : undefined}
        />
        <FormField
          label={t('auth.password')}
          id='password'
          name='password'
          type='password'
          autoComplete='current-password'
          error={state?.success === false ? state.errors['password'] : undefined}
        />
        {state?.success === false && state.errors['form'] && (
          <p className='text-sm text-destructive'>{state.errors['form']}</p>
        )}
        <Button type='submit' className='w-full' loading={pending}>
          {t('auth.login')}
        </Button>
      </form>
    </AuthLayout>
  )
}
