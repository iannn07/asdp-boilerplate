'use client'

import { useTranslation } from '@/lib/i18n/useTranslation'

import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card'
import { ComponentPreview } from '../../_components/ComponentPreview'
import { CompositionTree } from '../../_components/CompositionTree'
import { ImportBlock } from '../../_components/ImportBlock'
import { PropsTable } from '../../_components/PropsTable'

const CONTENT_PROPS = [
  { prop: 'side', type: '"top" | "right" | "bottom" | "left"', default: '"bottom"' },
  { prop: 'sideOffset', type: 'number', default: '4' },
  { prop: 'align', type: '"start" | "center" | "end"', default: '"center"' },
  { prop: 'alignOffset', type: 'number', default: '4' },
  { prop: 'className', type: 'string', default: '-' }
]

const COMPOSITION = `HoverCard
├── HoverCardTrigger
└── HoverCardContent`

export default function HoverCardPage() {
  const { t } = useTranslation()

  return (
    <div className='space-y-10'>
      <div>
        <h1 className='text-3xl font-bold tracking-tight'>Hover Card</h1>
        <p className='mt-2 text-muted-foreground'>{t('docs.hoverCard.desc')}</p>
        <p className='mt-1 text-xs text-muted-foreground'>
          {t('docs.source')}: <code className='rounded bg-muted px-1 py-0.5'>src/components/ui/hover-card.tsx</code>
        </p>
      </div>

      <section className='space-y-4'>
        <h2 className='text-xl font-semibold'>{t('docs.whenToUse')}</h2>
        <p className='text-sm text-muted-foreground'>{t('docs.hoverCard.whenToUse')}</p>
      </section>

      <section className='space-y-4'>
        <h2 className='text-xl font-semibold'>{t('docs.usage')}</h2>
        <ImportBlock
          code={`import { HoverCard, HoverCardTrigger, HoverCardContent } from "@/components/ui/hover-card"`}
        />
      </section>

      <section className='space-y-4'>
        <h2 className='text-xl font-semibold'>{t('docs.composition')}</h2>
        <CompositionTree tree={COMPOSITION} />
      </section>

      <section className='space-y-6'>
        <h2 className='text-xl font-semibold'>{t('docs.examples')}</h2>

        <div className='space-y-2'>
          <h3 className='text-base font-medium'>Default</h3>
          <ComponentPreview
            code={`'use client'

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"

export function HoverCardDemo() {
  return (
    <HoverCard>
      <HoverCardTrigger>
        <span className="cursor-pointer text-sm font-medium underline underline-offset-4">
          @johndoe
        </span>
      </HoverCardTrigger>
      <HoverCardContent className="w-80">
        <div className="flex gap-4">
          <div className="size-10 shrink-0 rounded-full bg-muted" />
          <div className="space-y-1">
            <h4 className="text-sm font-semibold">@johndoe</h4>
            <p className="text-sm text-muted-foreground">
              Software engineer. Building things for the web.
            </p>
            <div className="flex items-center pt-2">
              <span className="text-xs text-muted-foreground">
                Joined December 2021
              </span>
            </div>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  )
}`}
          >
            <HoverCard>
              <HoverCardTrigger>
                <span className='cursor-pointer text-sm font-medium underline underline-offset-4'>@johndoe</span>
              </HoverCardTrigger>
              <HoverCardContent className='w-80'>
                <div className='flex gap-4'>
                  <div className='size-10 shrink-0 rounded-full bg-muted' />
                  <div className='space-y-1'>
                    <h4 className='text-sm font-semibold'>@johndoe</h4>
                    <p className='text-sm text-muted-foreground'>Software engineer. Building things for the web.</p>
                    <div className='flex items-center pt-2'>
                      <span className='text-xs text-muted-foreground'>Joined December 2021</span>
                    </div>
                  </div>
                </div>
              </HoverCardContent>
            </HoverCard>
          </ComponentPreview>
        </div>
      </section>

      <section className='space-y-4'>
        <h2 className='text-xl font-semibold'>{t('docs.apiReference')}</h2>
        <PropsTable title='HoverCardContent' data={CONTENT_PROPS} />
      </section>
    </div>
  )
}
