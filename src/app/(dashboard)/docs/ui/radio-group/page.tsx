'use client'

import { useTranslation } from '@/lib/i18n/useTranslation'

import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { ComponentPreview } from '../../_components/ComponentPreview'
import { ImportBlock } from '../../_components/ImportBlock'
import { PropsTable } from '../../_components/PropsTable'

const PROPS = [
  { prop: 'value', type: 'string', default: '-' },
  { prop: 'onValueChange', type: '(value: string) => void', default: '-' },
  { prop: 'disabled', type: 'boolean', default: 'false' },
  { prop: 'className', type: 'string', default: '-' }
]

export default function RadioGroupPage() {
  const { t } = useTranslation()

  return (
    <div className='space-y-10'>
      <div>
        <h1 className='text-3xl font-bold tracking-tight'>Radio Group</h1>
        <p className='mt-2 text-muted-foreground'>{t('docs.radioGroup.desc')}</p>
        <p className='mt-1 text-xs text-muted-foreground'>
          {t('docs.source')}: <code className='rounded bg-muted px-1 py-0.5'>src/components/ui/radio-group.tsx</code>
        </p>
      </div>

      <section className='space-y-4'>
        <h2 className='text-xl font-semibold'>{t('docs.whenToUse')}</h2>
        <p className='text-sm text-muted-foreground'>{t('docs.radioGroup.whenToUse')}</p>
      </section>

      <section className='space-y-4'>
        <h2 className='text-xl font-semibold'>{t('docs.usage')}</h2>
        <ImportBlock code={`import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"`} />
      </section>

      <section className='space-y-6'>
        <h2 className='text-xl font-semibold'>{t('docs.examples')}</h2>

        <div className='space-y-2'>
          <h3 className='text-base font-medium'>Default</h3>
          <ComponentPreview
            code={`import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

export function RadioGroupDefault() {
  return (
    <RadioGroup defaultValue="comfortable">
      <div className="flex items-center gap-2">
        <RadioGroupItem value="default" id="r1" />
        <Label htmlFor="r1">Default</Label>
      </div>
      <div className="flex items-center gap-2">
        <RadioGroupItem value="comfortable" id="r2" />
        <Label htmlFor="r2">Comfortable</Label>
      </div>
      <div className="flex items-center gap-2">
        <RadioGroupItem value="compact" id="r3" />
        <Label htmlFor="r3">Compact</Label>
      </div>
    </RadioGroup>
  )
}`}
          >
            <RadioGroup defaultValue='comfortable'>
              <div className='flex items-center gap-2'>
                <RadioGroupItem value='default' id='r1-demo' />
                <Label htmlFor='r1-demo'>Default</Label>
              </div>
              <div className='flex items-center gap-2'>
                <RadioGroupItem value='comfortable' id='r2-demo' />
                <Label htmlFor='r2-demo'>Comfortable</Label>
              </div>
              <div className='flex items-center gap-2'>
                <RadioGroupItem value='compact' id='r3-demo' />
                <Label htmlFor='r3-demo'>Compact</Label>
              </div>
            </RadioGroup>
          </ComponentPreview>
        </div>

        <div className='space-y-2'>
          <h3 className='text-base font-medium'>Disabled</h3>
          <ComponentPreview
            code={`import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

export function RadioGroupDisabled() {
  return (
    <RadioGroup disabled defaultValue="option-1">
      <div className="flex items-center gap-2">
        <RadioGroupItem value="option-1" id="d1" />
        <Label htmlFor="d1">Option One</Label>
      </div>
      <div className="flex items-center gap-2">
        <RadioGroupItem value="option-2" id="d2" />
        <Label htmlFor="d2">Option Two</Label>
      </div>
    </RadioGroup>
  )
}`}
          >
            <RadioGroup disabled defaultValue='option-1'>
              <div className='flex items-center gap-2'>
                <RadioGroupItem value='option-1' id='d1-demo' />
                <Label htmlFor='d1-demo'>Option One</Label>
              </div>
              <div className='flex items-center gap-2'>
                <RadioGroupItem value='option-2' id='d2-demo' />
                <Label htmlFor='d2-demo'>Option Two</Label>
              </div>
            </RadioGroup>
          </ComponentPreview>
        </div>
      </section>

      <section className='space-y-4'>
        <h2 className='text-xl font-semibold'>{t('docs.apiReference')}</h2>
        <PropsTable title='RadioGroup' data={PROPS} />
      </section>
    </div>
  )
}
