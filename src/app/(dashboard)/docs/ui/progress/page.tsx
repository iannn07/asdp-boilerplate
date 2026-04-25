'use client'

import { useTranslation } from '@/lib/i18n/useTranslation'

import { Progress } from '@/components/ui/progress'
import { ComponentPreview } from '../../_components/ComponentPreview'
import { ImportBlock } from '../../_components/ImportBlock'
import { PropsTable } from '../../_components/PropsTable'

const PROPS = [
  { prop: 'value', type: 'number | null', default: 'null' },
  { prop: 'className', type: 'string', default: '-' }
]

export default function ProgressPage() {
  const { t } = useTranslation()

  return (
    <div className='space-y-10'>
      <div>
        <h1 className='text-3xl font-bold tracking-tight'>Progress</h1>
        <p className='mt-2 text-muted-foreground'>{t('docs.progress.desc')}</p>
        <p className='mt-1 text-xs text-muted-foreground'>
          {t('docs.source')}: <code className='rounded bg-muted px-1 py-0.5'>src/components/ui/progress.tsx</code>
        </p>
      </div>

      <section className='space-y-4'>
        <h2 className='text-xl font-semibold'>{t('docs.whenToUse')}</h2>
        <p className='text-sm text-muted-foreground'>{t('docs.progress.whenToUse')}</p>
      </section>

      <section className='space-y-4'>
        <h2 className='text-xl font-semibold'>{t('docs.usage')}</h2>
        <ImportBlock code={`import { Progress } from "@/components/ui/progress"`} />
      </section>

      <section className='space-y-6'>
        <h2 className='text-xl font-semibold'>{t('docs.examples')}</h2>

        <div className='space-y-2'>
          <h3 className='text-base font-medium'>Default</h3>
          <ComponentPreview
            code={`import { Progress } from "@/components/ui/progress"

export function ProgressDemo() {
  return <Progress value={60} className="w-[60%]" />
}`}
          >
            <Progress value={60} className='w-[60%]' />
          </ComponentPreview>
        </div>

        <div className='space-y-2'>
          <h3 className='text-base font-medium'>Indeterminate</h3>
          <ComponentPreview
            code={`import { Progress } from "@/components/ui/progress"

export function ProgressIndeterminate() {
  return <Progress value={null} className="w-[60%]" />
}`}
          >
            <Progress value={null} className='w-[60%]' />
          </ComponentPreview>
        </div>
      </section>

      <section className='space-y-4'>
        <h2 className='text-xl font-semibold'>{t('docs.apiReference')}</h2>
        <PropsTable title='Progress' data={PROPS} />
      </section>
    </div>
  )
}
