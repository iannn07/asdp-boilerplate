'use client'

import { useTranslation } from '@/lib/i18n/useTranslation'

import { Separator } from '@/components/ui/separator'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import { ComponentPreview } from '../../_components/ComponentPreview'
import { CompositionTree } from '../../_components/CompositionTree'
import { ImportBlock } from '../../_components/ImportBlock'
import { PropsTable } from '../../_components/PropsTable'

const SCROLL_AREA_PROPS = [{ prop: 'className', type: 'string', default: '-' }]

const SCROLL_BAR_PROPS = [
  { prop: 'orientation', type: '"vertical" | "horizontal"', default: '"vertical"' },
  { prop: 'className', type: 'string', default: '-' }
]

const COMPOSITION = `ScrollArea
├── (Viewport)
├── ScrollBar
│   └── (Thumb)
└── (Corner)`

const TAGS = Array.from({ length: 50 }).map((_, i) => `v1.0.0-beta.${i + 1}`)

export default function ScrollAreaPage() {
  const { t } = useTranslation()

  return (
    <div className='space-y-10'>
      <div>
        <h1 className='text-3xl font-bold tracking-tight'>Scroll Area</h1>
        <p className='mt-2 text-muted-foreground'>{t('docs.scrollArea.desc')}</p>
        <p className='mt-1 text-xs text-muted-foreground'>
          {t('docs.source')}: <code className='rounded bg-muted px-1 py-0.5'>src/components/ui/scroll-area.tsx</code>
        </p>
      </div>

      <section className='space-y-4'>
        <h2 className='text-xl font-semibold'>{t('docs.whenToUse')}</h2>
        <p className='text-sm text-muted-foreground'>{t('docs.scrollArea.whenToUse')}</p>
      </section>

      <section className='space-y-4'>
        <h2 className='text-xl font-semibold'>{t('docs.usage')}</h2>
        <ImportBlock code={`import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"`} />
      </section>

      <section className='space-y-4'>
        <h2 className='text-xl font-semibold'>{t('docs.composition')}</h2>
        <CompositionTree tree={COMPOSITION} />
      </section>

      <section className='space-y-6'>
        <h2 className='text-xl font-semibold'>{t('docs.examples')}</h2>

        <div className='space-y-2'>
          <h3 className='text-base font-medium'>Vertical</h3>
          <ComponentPreview
            code={`import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"

const tags = Array.from({ length: 50 }).map((_, i) => \`v1.0.0-beta.\${i + 1}\`)

export function ScrollAreaDemo() {
  return (
    <ScrollArea className="h-72 w-48 rounded-md border">
      <div className="p-4">
        <h4 className="mb-4 text-sm font-medium leading-none">Tags</h4>
        {tags.map((tag) => (
          <div key={tag}>
            <div className="text-sm">{tag}</div>
            <Separator className="my-2" />
          </div>
        ))}
      </div>
    </ScrollArea>
  )
}`}
          >
            <ScrollArea className='h-72 w-48 rounded-md border'>
              <div className='p-4'>
                <h4 className='mb-4 text-sm font-medium leading-none'>Tags</h4>
                {TAGS.map(tag => (
                  <div key={tag}>
                    <div className='text-sm'>{tag}</div>
                    <Separator className='my-2' />
                  </div>
                ))}
              </div>
            </ScrollArea>
          </ComponentPreview>
        </div>

        <div className='space-y-2'>
          <h3 className='text-base font-medium'>Horizontal</h3>
          <ComponentPreview
            code={`import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"

export function ScrollAreaHorizontalDemo() {
  return (
    <ScrollArea className="w-96 whitespace-nowrap rounded-md border">
      <div className="flex w-max space-x-4 p-4">
        {Array.from({ length: 10 }).map((_, i) => (
          <div
            key={i}
            className="flex h-20 w-36 shrink-0 items-center justify-center rounded-md border"
          >
            Item {i + 1}
          </div>
        ))}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  )
}`}
          >
            <ScrollArea className='w-96 whitespace-nowrap rounded-md border'>
              <div className='flex w-max space-x-4 p-4'>
                {Array.from({ length: 10 }).map((_, i) => (
                  <div key={i} className='flex h-20 w-36 shrink-0 items-center justify-center rounded-md border'>
                    Item {i + 1}
                  </div>
                ))}
              </div>
              <ScrollBar orientation='horizontal' />
            </ScrollArea>
          </ComponentPreview>
        </div>
      </section>

      <section className='space-y-4'>
        <h2 className='text-xl font-semibold'>{t('docs.apiReference')}</h2>
        <PropsTable title='ScrollArea' data={SCROLL_AREA_PROPS} />
        <PropsTable title='ScrollBar' data={SCROLL_BAR_PROPS} />
      </section>
    </div>
  )
}
