'use client'

import { useTranslation } from '@/lib/i18n/useTranslation'

import { Separator } from '@/components/ui/separator'
import { ComponentPreview } from '../../_components/ComponentPreview'
import { ImportBlock } from '../../_components/ImportBlock'
import { PropsTable } from '../../_components/PropsTable'

const PROPS = [
  { prop: 'orientation', type: '"horizontal" | "vertical"', default: '"horizontal"' },
  { prop: 'className', type: 'string', default: '-' }
]

export default function SeparatorPage() {
  const { t } = useTranslation()

  return (
    <div className='space-y-10'>
      <div>
        <h1 className='text-3xl font-bold tracking-tight'>Separator</h1>
        <p className='mt-2 text-muted-foreground'>{t('docs.separator.desc')}</p>
        <p className='mt-1 text-xs text-muted-foreground'>
          {t('docs.source')}: <code className='rounded bg-muted px-1 py-0.5'>src/components/ui/separator.tsx</code>
        </p>
      </div>

      <section className='space-y-4'>
        <h2 className='text-xl font-semibold'>{t('docs.whenToUse')}</h2>
        <p className='text-sm text-muted-foreground'>{t('docs.separator.whenToUse')}</p>
      </section>

      <section className='space-y-4'>
        <h2 className='text-xl font-semibold'>{t('docs.usage')}</h2>
        <ImportBlock code={`import { Separator } from "@/components/ui/separator"`} />
      </section>

      <section className='space-y-6'>
        <h2 className='text-xl font-semibold'>{t('docs.examples')}</h2>

        <div className='space-y-2'>
          <h3 className='text-base font-medium'>Horizontal</h3>
          <ComponentPreview
            code={`import { Separator } from "@/components/ui/separator"

export function SeparatorHorizontal() {
  return (
    <div className="space-y-4">
      <div>
        <h4 className="font-medium">Section Title</h4>
        <p className="text-sm text-muted-foreground">Description text.</p>
      </div>
      <Separator />
      <div>
        <h4 className="font-medium">Another Section</h4>
        <p className="text-sm text-muted-foreground">More description.</p>
      </div>
    </div>
  )
}`}
          >
            <div className='w-full max-w-sm space-y-4'>
              <div>
                <h4 className='font-medium'>Section Title</h4>
                <p className='text-sm text-muted-foreground'>Description text.</p>
              </div>
              <Separator />
              <div>
                <h4 className='font-medium'>Another Section</h4>
                <p className='text-sm text-muted-foreground'>More description.</p>
              </div>
            </div>
          </ComponentPreview>
        </div>

        <div className='space-y-2'>
          <h3 className='text-base font-medium'>Vertical</h3>
          <ComponentPreview
            code={`import { Separator } from "@/components/ui/separator"

export function SeparatorVertical() {
  return (
    <div className="flex h-6 items-center gap-4">
      <span className="text-sm">Blog</span>
      <Separator orientation="vertical" />
      <span className="text-sm">Docs</span>
      <Separator orientation="vertical" />
      <span className="text-sm">Source</span>
    </div>
  )
}`}
          >
            <div className='flex h-6 items-center gap-4'>
              <span className='text-sm'>Blog</span>
              <Separator orientation='vertical' />
              <span className='text-sm'>Docs</span>
              <Separator orientation='vertical' />
              <span className='text-sm'>Source</span>
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
