'use client'

import { useTranslation } from '@/lib/i18n/useTranslation'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ComponentPreview } from '../../_components/ComponentPreview'
import { ImportBlock } from '../../_components/ImportBlock'
import { PropsTable } from '../../_components/PropsTable'

const PROPS = [
  { prop: 'type', type: 'string', default: '"text"' },
  { prop: 'placeholder', type: 'string', default: '-' },
  { prop: 'disabled', type: 'boolean', default: 'false' },
  { prop: 'className', type: 'string', default: '-' }
]

export default function InputPage() {
  const { t } = useTranslation()

  return (
    <div className='space-y-10'>
      <div>
        <h1 className='text-3xl font-bold tracking-tight'>Input</h1>
        <p className='mt-2 text-muted-foreground'>{t('docs.input.desc')}</p>
        <p className='mt-1 text-xs text-muted-foreground'>
          {t('docs.source')}: <code className='rounded bg-muted px-1 py-0.5'>src/components/ui/input.tsx</code>
        </p>
      </div>

      <section className='space-y-4'>
        <h2 className='text-xl font-semibold'>{t('docs.whenToUse')}</h2>
        <p className='text-sm text-muted-foreground'>{t('docs.input.whenToUse')}</p>
      </section>

      <section className='space-y-4'>
        <h2 className='text-xl font-semibold'>{t('docs.usage')}</h2>
        <ImportBlock code={`import { Input } from "@/components/ui/input"`} />
      </section>

      <section className='space-y-6'>
        <h2 className='text-xl font-semibold'>{t('docs.examples')}</h2>

        <div className='space-y-2'>
          <h3 className='text-base font-medium'>Default</h3>
          <ComponentPreview
            code={`import { Input } from "@/components/ui/input"

export function InputDefault() {
  return <Input placeholder="Enter text..." />
}`}
          >
            <Input placeholder='Enter text...' className='max-w-xs' />
          </ComponentPreview>
        </div>

        <div className='space-y-2'>
          <h3 className='text-base font-medium'>With Label</h3>
          <ComponentPreview
            code={`import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function InputWithLabel() {
  return (
    <div className="flex flex-col gap-1.5">
      <Label htmlFor="email">Email</Label>
      <Input id="email" type="email" placeholder="you@example.com" />
    </div>
  )
}`}
          >
            <div className='flex max-w-xs flex-col gap-1.5'>
              <Label htmlFor='email-demo'>Email</Label>
              <Input id='email-demo' type='email' placeholder='you@example.com' />
            </div>
          </ComponentPreview>
        </div>

        <div className='space-y-2'>
          <h3 className='text-base font-medium'>Disabled</h3>
          <ComponentPreview
            code={`import { Input } from "@/components/ui/input"

export function InputDisabled() {
  return <Input disabled placeholder="Disabled input" />
}`}
          >
            <Input disabled placeholder='Disabled input' className='max-w-xs' />
          </ComponentPreview>
        </div>

        <div className='space-y-2'>
          <h3 className='text-base font-medium'>File Input</h3>
          <ComponentPreview
            code={`import { Input } from "@/components/ui/input"

export function InputFile() {
  return <Input type="file" />
}`}
          >
            <Input type='file' className='max-w-xs' />
          </ComponentPreview>
        </div>

        <div className='space-y-2'>
          <h3 className='text-base font-medium'>Password</h3>
          <ComponentPreview
            code={`import { Input } from "@/components/ui/input"

export function InputPassword() {
  return <Input type="password" placeholder="Password" />
}`}
          >
            <Input type='password' placeholder='Password' className='max-w-xs' />
          </ComponentPreview>
        </div>
      </section>

      <section className='space-y-4'>
        <h2 className='text-xl font-semibold'>{t('docs.apiReference')}</h2>
        <PropsTable data={PROPS} />
      </section>
    </div>
  )
}
