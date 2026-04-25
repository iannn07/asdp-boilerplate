'use client'

import { useTranslation } from '@/lib/i18n/useTranslation'

import { Slider } from '@/components/ui/slider'
import { ComponentPreview } from '../../_components/ComponentPreview'
import { ImportBlock } from '../../_components/ImportBlock'
import { PropsTable } from '../../_components/PropsTable'

const PROPS = [
  { prop: 'defaultValue', type: 'number[]', default: '-' },
  { prop: 'value', type: 'number[]', default: '-' },
  { prop: 'min', type: 'number', default: '0' },
  { prop: 'max', type: 'number', default: '100' },
  { prop: 'step', type: 'number', default: '1' },
  { prop: 'disabled', type: 'boolean', default: 'false' },
  { prop: 'className', type: 'string', default: '-' }
]

export default function SliderPage() {
  const { t } = useTranslation()

  return (
    <div className='space-y-10'>
      <div>
        <h1 className='text-3xl font-bold tracking-tight'>Slider</h1>
        <p className='mt-2 text-muted-foreground'>{t('docs.slider.desc')}</p>
        <p className='mt-1 text-xs text-muted-foreground'>
          {t('docs.source')}: <code className='rounded bg-muted px-1 py-0.5'>src/components/ui/slider.tsx</code>
        </p>
      </div>

      <section className='space-y-4'>
        <h2 className='text-xl font-semibold'>{t('docs.whenToUse')}</h2>
        <p className='text-sm text-muted-foreground'>{t('docs.slider.whenToUse')}</p>
      </section>

      <section className='space-y-4'>
        <h2 className='text-xl font-semibold'>{t('docs.usage')}</h2>
        <ImportBlock code={`import { Slider } from "@/components/ui/slider"`} />
      </section>

      <section className='space-y-6'>
        <h2 className='text-xl font-semibold'>{t('docs.examples')}</h2>

        <div className='space-y-2'>
          <h3 className='text-base font-medium'>Default</h3>
          <ComponentPreview
            code={`import { Slider } from "@/components/ui/slider"

export function SliderDefault() {
  return <Slider defaultValue={[50]} max={100} step={1} />
}`}
          >
            <Slider defaultValue={[50]} max={100} step={1} className='max-w-sm' />
          </ComponentPreview>
        </div>

        <div className='space-y-2'>
          <h3 className='text-base font-medium'>Range</h3>
          <ComponentPreview
            code={`import { Slider } from "@/components/ui/slider"

export function SliderRange() {
  return <Slider defaultValue={[25, 75]} min={0} max={100} step={5} />
}`}
          >
            <Slider defaultValue={[25, 75]} min={0} max={100} step={5} className='max-w-sm' />
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
