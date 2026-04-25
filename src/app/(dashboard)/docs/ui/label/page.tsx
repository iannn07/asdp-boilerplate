'use client'

import { useTranslation } from '@/lib/i18n/useTranslation'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ComponentPreview } from '../../_components/ComponentPreview'
import { ImportBlock } from '../../_components/ImportBlock'
import { PropsTable } from '../../_components/PropsTable'

const PROPS = [
  { prop: 'htmlFor', type: 'string', default: '-' },
  { prop: 'className', type: 'string', default: '-' }
]

export default function LabelPage() {
  const { t } = useTranslation()

  return (
    <div className='space-y-10'>
      <div>
        <h1 className='text-3xl font-bold tracking-tight'>Label</h1>
        <p className='mt-2 text-muted-foreground'>{t('docs.label.desc')}</p>
        <p className='mt-1 text-xs text-muted-foreground'>
          {t('docs.source')}: <code className='rounded bg-muted px-1 py-0.5'>src/components/ui/label.tsx</code>
        </p>
      </div>

      <section className='space-y-4'>
        <h2 className='text-xl font-semibold'>{t('docs.whenToUse')}</h2>
        <p className='text-sm text-muted-foreground'>{t('docs.label.whenToUse')}</p>
      </section>

      <section className='space-y-4'>
        <h2 className='text-xl font-semibold'>{t('docs.usage')}</h2>
        <ImportBlock code={`import { Label } from "@/components/ui/label"`} />
      </section>

      <section className='space-y-6'>
        <h2 className='text-xl font-semibold'>{t('docs.examples')}</h2>

        <div className='space-y-2'>
          <h3 className='text-base font-medium'>Default</h3>
          <ComponentPreview
            code={`import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function LabelDefault() {
  return (
    <div className="flex flex-col gap-1.5">
      <Label htmlFor="name">Name</Label>
      <Input id="name" placeholder="Enter your name" />
    </div>
  )
}`}
          >
            <div className='flex max-w-xs flex-col gap-1.5'>
              <Label htmlFor='name-demo'>Name</Label>
              <Input id='name-demo' placeholder='Enter your name' />
            </div>
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
