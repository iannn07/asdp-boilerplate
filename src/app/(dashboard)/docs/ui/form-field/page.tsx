'use client'

import { useTranslation } from '@/lib/i18n/useTranslation'

import { FormField } from '@/components/molecules/FormField'
import { ComponentPreview } from '../../_components/ComponentPreview'
import { ImportBlock } from '../../_components/ImportBlock'
import { PropsTable } from '../../_components/PropsTable'

const PROPS = [
  { prop: 'label', type: 'string', default: '-' },
  { prop: 'id', type: 'string', default: '-' },
  { prop: 'error', type: 'string | undefined', default: '-' },
  { prop: 'type', type: 'string', default: '"text"' },
  { prop: 'placeholder', type: 'string', default: '-' },
  { prop: 'disabled', type: 'boolean', default: 'false' },
  { prop: 'className', type: 'string', default: '-' }
]

export default function FormFieldPage() {
  const { t } = useTranslation()

  return (
    <div className='space-y-10'>
      <div>
        <h1 className='text-3xl font-bold tracking-tight'>Form Field</h1>
        <p className='mt-2 text-muted-foreground'>
          {t('docs.formField.desc')}
        </p>
        <p className='mt-1 text-xs text-muted-foreground'>
          {t('docs.source')}: <code className='rounded bg-muted px-1 py-0.5'>src/components/molecules/FormField.tsx</code>
        </p>
      </div>

      <section className='space-y-3'>
        <h2 className='text-xl font-semibold'>{t('docs.whenToUse')}</h2>
        <p className='text-sm text-muted-foreground'>
          {t('docs.formField.whenToUse')}
        </p>
      </section>

      <section className='space-y-4'>
        <h2 className='text-xl font-semibold'>{t('docs.usage')}</h2>
        <ImportBlock code={`import { FormField } from "@/components/molecules/FormField"`} />
      </section>

      <section className='space-y-6'>
        <h2 className='text-xl font-semibold'>{t('docs.examples')}</h2>

        <div className='space-y-2'>
          <h3 className='text-base font-medium'>Default</h3>
          <ComponentPreview
            code={`import { FormField } from "@/components/molecules/FormField"

export function FormFieldDefault() {
  return (
    <FormField
      id="username"
      label="Username"
      placeholder="Enter your username"
    />
  )
}`}
          >
            <div className='w-full max-w-xs'>
              <FormField id='username-demo' label='Username' placeholder='Enter your username' />
            </div>
          </ComponentPreview>
        </div>

        <div className='space-y-2'>
          <h3 className='text-base font-medium'>With Error</h3>
          <p className='text-sm text-muted-foreground'>
            {t('docs.formField.errorDesc')}
          </p>
          <ComponentPreview
            code={`import { FormField } from "@/components/molecules/FormField"

export function FormFieldWithError() {
  return (
    <FormField
      id="email"
      label="Email"
      placeholder="you@example.com"
      error="Please enter a valid email address"
    />
  )
}`}
          >
            <div className='w-full max-w-xs'>
              <FormField
                id='email-error-demo'
                label='Email'
                placeholder='you@example.com'
                error='Please enter a valid email address'
              />
            </div>
          </ComponentPreview>
        </div>

        <div className='space-y-2'>
          <h3 className='text-base font-medium'>Password</h3>
          <ComponentPreview
            code={`import { FormField } from "@/components/molecules/FormField"

export function FormFieldPassword() {
  return (
    <FormField
      id="password"
      label="Password"
      type="password"
      placeholder="Enter password"
    />
  )
}`}
          >
            <div className='w-full max-w-xs'>
              <FormField id='password-demo' label='Password' type='password' placeholder='Enter password' />
            </div>
          </ComponentPreview>
        </div>

        <div className='space-y-2'>
          <h3 className='text-base font-medium'>Disabled</h3>
          <ComponentPreview
            code={`import { FormField } from "@/components/molecules/FormField"

export function FormFieldDisabled() {
  return (
    <FormField
      id="disabled-field"
      label="Disabled"
      placeholder="Cannot edit"
      disabled
    />
  )
}`}
          >
            <div className='w-full max-w-xs'>
              <FormField id='disabled-demo' label='Disabled' placeholder='Cannot edit' disabled />
            </div>
          </ComponentPreview>
        </div>
      </section>

      <section className='space-y-4'>
        <h2 className='text-xl font-semibold'>{t('docs.apiReference')}</h2>
        <p className='text-sm text-muted-foreground'>
          {t('docs.formField.nativePropsNote')}
        </p>
        <PropsTable data={PROPS} />
      </section>
    </div>
  )
}
