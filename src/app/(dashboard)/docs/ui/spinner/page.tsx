'use client'

import { useTranslation } from '@/lib/i18n/useTranslation'

import { Spinner } from '@/components/atoms/Spinner'
import { ComponentPreview } from '../../_components/ComponentPreview'
import { ImportBlock } from '../../_components/ImportBlock'
import { PropsTable } from '../../_components/PropsTable'

const PROPS = [
  { prop: 'size', type: '"sm" | "md" | "lg"', default: '"md"' },
  { prop: 'className', type: 'string', default: '-' }
]

export default function SpinnerPage() {
  const { t } = useTranslation()

  return (
    <div className='space-y-10'>
      <div>
        <h1 className='text-3xl font-bold tracking-tight'>Spinner</h1>
        <p className='mt-2 text-muted-foreground'>{t('docs.spinner.desc')}</p>
        <p className='mt-1 text-xs text-muted-foreground'>
          {t('docs.source')}: <code className='rounded bg-muted px-1 py-0.5'>src/components/atoms/Spinner.tsx</code>
        </p>
      </div>

      <section className='space-y-3'>
        <h2 className='text-xl font-semibold'>{t('docs.whenToUse')}</h2>
        <p className='text-sm text-muted-foreground'>
          {t('docs.spinner.whenToUse')}
        </p>
      </section>

      <section className='space-y-4'>
        <h2 className='text-xl font-semibold'>{t('docs.usage')}</h2>
        <ImportBlock code={`import { Spinner } from "@/components/atoms/Spinner"`} />
      </section>

      <section className='space-y-6'>
        <h2 className='text-xl font-semibold'>{t('docs.examples')}</h2>

        <div className='space-y-2'>
          <h3 className='text-base font-medium'>Default</h3>
          <ComponentPreview
            code={`import { Spinner } from "@/components/atoms/Spinner"

export function SpinnerDefault() {
  return <Spinner />
}`}
          >
            <Spinner />
          </ComponentPreview>
        </div>

        <div className='space-y-2'>
          <h3 className='text-base font-medium'>Sizes</h3>
          <p className='text-sm text-muted-foreground'>
            {t('docs.spinner.sizesDesc')}
          </p>
          <ComponentPreview
            code={`import { Spinner } from "@/components/atoms/Spinner"

export function SpinnerSizes() {
  return (
    <div className="flex items-center gap-4">
      <Spinner size="sm" />
      <Spinner size="md" />
      <Spinner size="lg" />
    </div>
  )
}`}
          >
            <div className='flex items-center gap-4'>
              <Spinner size='sm' />
              <Spinner size='md' />
              <Spinner size='lg' />
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
