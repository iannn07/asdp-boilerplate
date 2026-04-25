'use client'

import { useTranslation } from '@/lib/i18n/useTranslation'

import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { ComponentPreview } from '../../_components/ComponentPreview'
import { ImportBlock } from '../../_components/ImportBlock'
import { PropsTable } from '../../_components/PropsTable'

const PROPS = [
  { prop: 'placeholder', type: 'string', default: '-' },
  { prop: 'disabled', type: 'boolean', default: 'false' },
  { prop: 'rows', type: 'number', default: '-' },
  { prop: 'className', type: 'string', default: '-' }
]

export default function TextareaPage() {
  const { t } = useTranslation()

  return (
    <div className='space-y-10'>
      <div>
        <h1 className='text-3xl font-bold tracking-tight'>Textarea</h1>
        <p className='mt-2 text-muted-foreground'>{t('docs.textarea.desc')}</p>
        <p className='mt-1 text-xs text-muted-foreground'>
          {t('docs.source')}: <code className='rounded bg-muted px-1 py-0.5'>src/components/ui/textarea.tsx</code>
        </p>
      </div>

      <section className='space-y-4'>
        <h2 className='text-xl font-semibold'>{t('docs.whenToUse')}</h2>
        <p className='text-sm text-muted-foreground'>{t('docs.textarea.whenToUse')}</p>
      </section>

      <section className='space-y-4'>
        <h2 className='text-xl font-semibold'>{t('docs.usage')}</h2>
        <ImportBlock code={`import { Textarea } from "@/components/ui/textarea"`} />
      </section>

      <section className='space-y-6'>
        <h2 className='text-xl font-semibold'>{t('docs.examples')}</h2>

        <div className='space-y-2'>
          <h3 className='text-base font-medium'>Default</h3>
          <ComponentPreview
            code={`import { Textarea } from "@/components/ui/textarea"

export function TextareaDefault() {
  return <Textarea placeholder="Type your message here..." />
}`}
          >
            <Textarea placeholder='Type your message here...' className='max-w-sm' />
          </ComponentPreview>
        </div>

        <div className='space-y-2'>
          <h3 className='text-base font-medium'>With Label</h3>
          <ComponentPreview
            code={`import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

export function TextareaWithLabel() {
  return (
    <div className="flex flex-col gap-1.5">
      <Label htmlFor="message">Message</Label>
      <Textarea id="message" placeholder="Write your message..." />
    </div>
  )
}`}
          >
            <div className='flex max-w-sm flex-col gap-1.5'>
              <Label htmlFor='message-demo'>Message</Label>
              <Textarea id='message-demo' placeholder='Write your message...' />
            </div>
          </ComponentPreview>
        </div>

        <div className='space-y-2'>
          <h3 className='text-base font-medium'>Disabled</h3>
          <ComponentPreview
            code={`import { Textarea } from "@/components/ui/textarea"

export function TextareaDisabled() {
  return <Textarea disabled placeholder="Disabled textarea" />
}`}
          >
            <Textarea disabled placeholder='Disabled textarea' className='max-w-sm' />
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
