'use client'

import { useTranslation } from '@/lib/i18n/useTranslation'

import { Button } from '@/components/ui/button'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { ComponentPreview } from '../../_components/ComponentPreview'
import { CompositionTree } from '../../_components/CompositionTree'
import { ImportBlock } from '../../_components/ImportBlock'
import { PropsTable } from '../../_components/PropsTable'

const CONTENT_PROPS = [
  { prop: 'side', type: '"top" | "right" | "bottom" | "left"', default: '"top"' },
  { prop: 'sideOffset', type: 'number', default: '4' },
  { prop: 'align', type: '"start" | "center" | "end"', default: '"center"' },
  { prop: 'className', type: 'string', default: '-' }
]

const COMPOSITION = `Tooltip
├── TooltipTrigger
└── TooltipContent`

export default function TooltipPage() {
  const { t } = useTranslation()

  return (
    <div className='space-y-10'>
      <div>
        <h1 className='text-3xl font-bold tracking-tight'>Tooltip</h1>
        <p className='mt-2 text-muted-foreground'>
          {t('docs.tooltip.desc')}
        </p>
        <p className='mt-1 text-xs text-muted-foreground'>
          {t('docs.source')}: <code className='rounded bg-muted px-1 py-0.5'>src/components/ui/tooltip.tsx</code>
        </p>
      </div>

      <section className='space-y-4'>
        <h2 className='text-xl font-semibold'>{t('docs.whenToUse')}</h2>
        <p className='text-sm text-muted-foreground'>
          {t('docs.tooltip.whenToUse')}
        </p>
      </section>

      <section className='space-y-4'>
        <h2 className='text-xl font-semibold'>{t('docs.usage')}</h2>
        <ImportBlock code={`import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip"`} />
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
            code={`import { Button } from "@/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"

export function TooltipDemo() {
  return (
    <Tooltip>
      <TooltipTrigger render={<Button variant="outline" />}>
        Hover me
      </TooltipTrigger>
      <TooltipContent>This is a tooltip</TooltipContent>
    </Tooltip>
  )
}`}
          >
            <Tooltip>
              <TooltipTrigger render={<Button variant='outline' />}>Hover me</TooltipTrigger>
              <TooltipContent>This is a tooltip</TooltipContent>
            </Tooltip>
          </ComponentPreview>
        </div>

        <div className='space-y-2'>
          <h3 className='text-base font-medium'>Positions</h3>
          <p className='text-sm text-muted-foreground'>
            {t('docs.tooltip.positionsDesc')}
          </p>
          <ComponentPreview
            code={`import { Button } from "@/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"

export function TooltipPositions() {
  return (
    <div className="flex gap-4">
      <Tooltip>
        <TooltipTrigger render={<Button variant="outline" size="sm" />}>
          Top
        </TooltipTrigger>
        <TooltipContent side="top">Top tooltip</TooltipContent>
      </Tooltip>
      <Tooltip>
        <TooltipTrigger render={<Button variant="outline" size="sm" />}>
          Right
        </TooltipTrigger>
        <TooltipContent side="right">Right tooltip</TooltipContent>
      </Tooltip>
      <Tooltip>
        <TooltipTrigger render={<Button variant="outline" size="sm" />}>
          Bottom
        </TooltipTrigger>
        <TooltipContent side="bottom">Bottom tooltip</TooltipContent>
      </Tooltip>
      <Tooltip>
        <TooltipTrigger render={<Button variant="outline" size="sm" />}>
          Left
        </TooltipTrigger>
        <TooltipContent side="left">Left tooltip</TooltipContent>
      </Tooltip>
    </div>
  )
}`}
          >
            <div className='flex gap-4'>
              <Tooltip>
                <TooltipTrigger render={<Button variant='outline' size='sm' />}>Top</TooltipTrigger>
                <TooltipContent side='top'>Top tooltip</TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger render={<Button variant='outline' size='sm' />}>Right</TooltipTrigger>
                <TooltipContent side='right'>Right tooltip</TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger render={<Button variant='outline' size='sm' />}>Bottom</TooltipTrigger>
                <TooltipContent side='bottom'>Bottom tooltip</TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger render={<Button variant='outline' size='sm' />}>Left</TooltipTrigger>
                <TooltipContent side='left'>Left tooltip</TooltipContent>
              </Tooltip>
            </div>
          </ComponentPreview>
        </div>
      </section>

      <section className='space-y-4'>
        <h2 className='text-xl font-semibold'>{t('docs.apiReference')}</h2>
        <PropsTable title='TooltipContent' data={CONTENT_PROPS} />
      </section>
    </div>
  )
}
