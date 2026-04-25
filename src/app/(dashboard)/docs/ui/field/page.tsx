'use client'

import { useTranslation } from '@/lib/i18n/useTranslation'

import { Field, FieldLabel, FieldContent, FieldDescription, FieldError } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { ComponentPreview } from '../../_components/ComponentPreview'
import { CompositionTree } from '../../_components/CompositionTree'
import { ImportBlock } from '../../_components/ImportBlock'
import { PropsTable } from '../../_components/PropsTable'

const FIELD_PROPS = [
  { prop: 'orientation', type: '"vertical" | "horizontal" | "responsive"', default: '"vertical"' },
  { prop: 'className', type: 'string', default: '-' }
]

const COMPOSITION = `Field
├── FieldLabel
└── FieldContent
    ├── (form control)
    ├── FieldDescription
    └── FieldError`

export default function FieldPage() {
  const { t } = useTranslation()

  return (
    <div className='space-y-10'>
      <div>
        <h1 className='text-3xl font-bold tracking-tight'>Field</h1>
        <p className='mt-2 text-muted-foreground'>{t('docs.field.desc')}</p>
        <p className='mt-1 text-xs text-muted-foreground'>
          {t('docs.source')}: <code className='rounded bg-muted px-1 py-0.5'>src/components/ui/field.tsx</code>
        </p>
      </div>

      <section className='space-y-4'>
        <h2 className='text-xl font-semibold'>{t('docs.whenToUse')}</h2>
        <p className='text-sm text-muted-foreground'>{t('docs.field.whenToUse')}</p>
      </section>

      <section className='space-y-4'>
        <h2 className='text-xl font-semibold'>{t('docs.usage')}</h2>
        <ImportBlock
          code={`import {
  Field,
  FieldLabel,
  FieldContent,
  FieldDescription,
  FieldError,
} from "@/components/ui/field"`}
        />
      </section>

      <section className='space-y-4'>
        <h2 className='text-xl font-semibold'>{t('docs.composition')}</h2>
        <CompositionTree tree={COMPOSITION} />
      </section>

      <section className='space-y-6'>
        <h2 className='text-xl font-semibold'>{t('docs.examples')}</h2>

        <div className='space-y-2'>
          <h3 className='text-base font-medium'>Default</h3>
          <ComponentPreview
            code={`import { Field, FieldLabel, FieldContent } from "@/components/ui/field"
import { Input } from "@/components/ui/input"

export function FieldDefault() {
  return (
    <Field>
      <FieldLabel>Username</FieldLabel>
      <FieldContent>
        <Input placeholder="Enter username" />
      </FieldContent>
    </Field>
  )
}`}
          >
            <Field className='max-w-sm'>
              <FieldLabel>Username</FieldLabel>
              <FieldContent>
                <Input placeholder='Enter username' />
              </FieldContent>
            </Field>
          </ComponentPreview>
        </div>

        <div className='space-y-2'>
          <h3 className='text-base font-medium'>With Description</h3>
          <ComponentPreview
            code={`import {
  Field,
  FieldLabel,
  FieldContent,
  FieldDescription,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"

export function FieldWithDescription() {
  return (
    <Field>
      <FieldLabel>Email</FieldLabel>
      <FieldContent>
        <Input type="email" placeholder="you@example.com" />
        <FieldDescription>We will never share your email.</FieldDescription>
      </FieldContent>
    </Field>
  )
}`}
          >
            <Field className='max-w-sm'>
              <FieldLabel>Email</FieldLabel>
              <FieldContent>
                <Input type='email' placeholder='you@example.com' />
                <FieldDescription>We will never share your email.</FieldDescription>
              </FieldContent>
            </Field>
          </ComponentPreview>
        </div>

        <div className='space-y-2'>
          <h3 className='text-base font-medium'>With Error</h3>
          <ComponentPreview
            code={`import {
  Field,
  FieldLabel,
  FieldContent,
  FieldError,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"

export function FieldWithError() {
  return (
    <Field data-invalid="true">
      <FieldLabel>Password</FieldLabel>
      <FieldContent>
        <Input type="password" aria-invalid="true" />
        <FieldError>Password must be at least 8 characters.</FieldError>
      </FieldContent>
    </Field>
  )
}`}
          >
            <Field data-invalid='true' className='max-w-sm'>
              <FieldLabel>Password</FieldLabel>
              <FieldContent>
                <Input type='password' aria-invalid='true' />
                <FieldError>Password must be at least 8 characters.</FieldError>
              </FieldContent>
            </Field>
          </ComponentPreview>
        </div>
      </section>

      <section className='space-y-4'>
        <h2 className='text-xl font-semibold'>{t('docs.apiReference')}</h2>
        <PropsTable title='Field' data={FIELD_PROPS} />
      </section>
    </div>
  )
}
