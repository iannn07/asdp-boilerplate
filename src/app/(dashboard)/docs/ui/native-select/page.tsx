'use client'

import { useTranslation } from '@/lib/i18n/useTranslation'

import { NativeSelect, NativeSelectOption } from '@/components/ui/native-select'
import { ComponentPreview } from '../../_components/ComponentPreview'
import { ImportBlock } from '../../_components/ImportBlock'
import { PropsTable } from '../../_components/PropsTable'

const PROPS = [
  { prop: 'size', type: '"sm" | "default"', default: '"default"' },
  { prop: 'className', type: 'string', default: '-' }
]

export default function NativeSelectPage() {
  const { t } = useTranslation()

  return (
    <div className='space-y-10'>
      <div>
        <h1 className='text-3xl font-bold tracking-tight'>Native Select</h1>
        <p className='mt-2 text-muted-foreground'>{t('docs.nativeSelect.desc')}</p>
        <p className='mt-1 text-xs text-muted-foreground'>
          {t('docs.source')}: <code className='rounded bg-muted px-1 py-0.5'>src/components/ui/native-select.tsx</code>
        </p>
      </div>

      <section className='space-y-4'>
        <h2 className='text-xl font-semibold'>{t('docs.whenToUse')}</h2>
        <p className='text-sm text-muted-foreground'>{t('docs.nativeSelect.whenToUse')}</p>
      </section>

      <section className='space-y-4'>
        <h2 className='text-xl font-semibold'>{t('docs.usage')}</h2>
        <ImportBlock code={`import { NativeSelect, NativeSelectOption } from "@/components/ui/native-select"`} />
      </section>

      <section className='space-y-6'>
        <h2 className='text-xl font-semibold'>{t('docs.examples')}</h2>

        <div className='space-y-2'>
          <h3 className='text-base font-medium'>Default</h3>
          <ComponentPreview
            code={`import { NativeSelect, NativeSelectOption } from "@/components/ui/native-select"

export function NativeSelectDefault() {
  return (
    <NativeSelect>
      <NativeSelectOption value="">Select a country</NativeSelectOption>
      <NativeSelectOption value="us">United States</NativeSelectOption>
      <NativeSelectOption value="uk">United Kingdom</NativeSelectOption>
      <NativeSelectOption value="jp">Japan</NativeSelectOption>
    </NativeSelect>
  )
}`}
          >
            <NativeSelect>
              <NativeSelectOption value=''>Select a country</NativeSelectOption>
              <NativeSelectOption value='us'>United States</NativeSelectOption>
              <NativeSelectOption value='uk'>United Kingdom</NativeSelectOption>
              <NativeSelectOption value='jp'>Japan</NativeSelectOption>
            </NativeSelect>
          </ComponentPreview>
        </div>
      </section>

      <section className='space-y-4'>
        <h2 className='text-xl font-semibold'>{t('docs.apiReference')}</h2>
        <PropsTable title='NativeSelect' data={PROPS} />
      </section>
    </div>
  )
}
