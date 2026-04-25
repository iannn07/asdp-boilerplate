'use client'

import { useTranslation } from '@/lib/i18n/useTranslation'

import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { ComponentPreview } from '../../_components/ComponentPreview'
import { ImportBlock } from '../../_components/ImportBlock'
import { PropsTable } from '../../_components/PropsTable'

const PROPS = [
  { prop: 'checked', type: 'boolean', default: 'false' },
  { prop: 'onCheckedChange', type: '(checked: boolean) => void', default: '-' },
  { prop: 'disabled', type: 'boolean', default: 'false' },
  { prop: 'className', type: 'string', default: '-' }
]

export default function CheckboxPage() {
  const { t } = useTranslation()

  return (
    <div className='space-y-10'>
      <div>
        <h1 className='text-3xl font-bold tracking-tight'>Checkbox</h1>
        <p className='mt-2 text-muted-foreground'>{t('docs.checkbox.desc')}</p>
        <p className='mt-1 text-xs text-muted-foreground'>
          {t('docs.source')}: <code className='rounded bg-muted px-1 py-0.5'>src/components/ui/checkbox.tsx</code>
        </p>
      </div>

      <section className='space-y-4'>
        <h2 className='text-xl font-semibold'>{t('docs.whenToUse')}</h2>
        <p className='text-sm text-muted-foreground'>{t('docs.checkbox.whenToUse')}</p>
      </section>

      <section className='space-y-4'>
        <h2 className='text-xl font-semibold'>{t('docs.usage')}</h2>
        <ImportBlock code={`import { Checkbox } from "@/components/ui/checkbox"`} />
      </section>

      <section className='space-y-6'>
        <h2 className='text-xl font-semibold'>{t('docs.examples')}</h2>

        <div className='space-y-2'>
          <h3 className='text-base font-medium'>Default</h3>
          <ComponentPreview
            code={`import { Checkbox } from "@/components/ui/checkbox"

export function CheckboxDefault() {
  return <Checkbox />
}`}
          >
            <Checkbox />
          </ComponentPreview>
        </div>

        <div className='space-y-2'>
          <h3 className='text-base font-medium'>With Label</h3>
          <ComponentPreview
            code={`import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

export function CheckboxWithLabel() {
  return (
    <div className="flex items-center gap-2">
      <Checkbox id="terms" />
      <Label htmlFor="terms">Accept terms and conditions</Label>
    </div>
  )
}`}
          >
            <div className='flex items-center gap-2'>
              <Checkbox id='terms-demo' />
              <Label htmlFor='terms-demo'>Accept terms and conditions</Label>
            </div>
          </ComponentPreview>
        </div>

        <div className='space-y-2'>
          <h3 className='text-base font-medium'>Disabled</h3>
          <ComponentPreview
            code={`import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

export function CheckboxDisabled() {
  return (
    <div className="flex items-center gap-2">
      <Checkbox id="disabled" disabled />
      <Label htmlFor="disabled">Disabled checkbox</Label>
    </div>
  )
}`}
          >
            <div className='flex items-center gap-2'>
              <Checkbox id='disabled-demo' disabled />
              <Label htmlFor='disabled-demo'>Disabled checkbox</Label>
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
