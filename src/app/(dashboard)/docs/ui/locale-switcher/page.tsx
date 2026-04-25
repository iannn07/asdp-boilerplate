'use client'

import { useTranslation } from '@/lib/i18n/useTranslation'

import { LocaleSwitcher } from '@/components/molecules/LocaleSwitcher'
import { ComponentPreview } from '../../_components/ComponentPreview'
import { ImportBlock } from '../../_components/ImportBlock'
import { CodeBlock } from '../../_components/CodeBlock'

export default function LocaleSwitcherPage() {
  const { t } = useTranslation()

  return (
    <div className='space-y-10'>
      <div>
        <h1 className='text-3xl font-bold tracking-tight'>Locale Switcher</h1>
        <p className='mt-2 text-muted-foreground'>{t('docs.localeSwitcher.desc')}</p>
        <p className='mt-1 text-xs text-muted-foreground'>
          {t('docs.source')}:{' '}
          <code className='rounded bg-muted px-1 py-0.5'>src/components/molecules/LocaleSwitcher.tsx</code>
        </p>
      </div>

      <section className='space-y-3'>
        <h2 className='text-xl font-semibold'>{t('docs.whenToUse')}</h2>
        <p className='text-sm text-muted-foreground'>{t('docs.localeSwitcher.whenToUse')}</p>
      </section>

      <section className='space-y-4'>
        <h2 className='text-xl font-semibold'>{t('docs.usage')}</h2>
        <ImportBlock code={`import { LocaleSwitcher } from "@/components/molecules/LocaleSwitcher"`} />
        <CodeBlock code={`<LocaleSwitcher />`} />
      </section>

      <section className='space-y-6'>
        <h2 className='text-xl font-semibold'>{t('docs.examples')}</h2>

        <div className='space-y-2'>
          <h3 className='text-base font-medium'>Default</h3>
          <p className='text-sm text-muted-foreground'>{t('docs.localeSwitcher.defaultDesc')}</p>
          <ComponentPreview
            code={`'use client'

import { LocaleSwitcher } from "@/components/molecules/LocaleSwitcher"

export function LocaleSwitcherDefault() {
  return <LocaleSwitcher />
}`}
          >
            <LocaleSwitcher />
          </ComponentPreview>
        </div>
      </section>

      <section className='space-y-4'>
        <h2 className='text-xl font-semibold'>{t('docs.dependencies')}</h2>
        <p className='text-sm text-muted-foreground'>{t('docs.localeSwitcher.depDesc')}</p>
      </section>
    </div>
  )
}
