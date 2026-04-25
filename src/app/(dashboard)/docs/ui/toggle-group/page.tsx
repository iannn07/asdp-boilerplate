'use client'

import {
  IconAlignCenter,
  IconAlignJustified,
  IconAlignLeft,
  IconAlignRight,
  IconBold,
  IconItalic,
  IconUnderline
} from '@tabler/icons-react'

import { useTranslation } from '@/lib/i18n/useTranslation'

import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import { ComponentPreview } from '../../_components/ComponentPreview'
import { CompositionTree } from '../../_components/CompositionTree'
import { ImportBlock } from '../../_components/ImportBlock'
import { PropsTable } from '../../_components/PropsTable'

const GROUP_PROPS = [
  { prop: 'variant', type: '"default" | "outline"', default: '"default"' },
  { prop: 'size', type: '"default" | "sm" | "lg"', default: '"default"' },
  { prop: 'spacing', type: 'number', default: '0' },
  { prop: 'orientation', type: '"horizontal" | "vertical"', default: '"horizontal"' },
  { prop: 'toggleMultiple', type: 'boolean', default: 'false' },
  { prop: 'className', type: 'string', default: '-' }
]

const ITEM_PROPS = [
  { prop: 'value', type: 'string', default: '-' },
  { prop: 'variant', type: '"default" | "outline"', default: '"default"' },
  { prop: 'size', type: '"default" | "sm" | "lg"', default: '"default"' },
  { prop: 'disabled', type: 'boolean', default: 'false' },
  { prop: 'className', type: 'string', default: '-' }
]

const COMPOSITION = `ToggleGroup
└── ToggleGroupItem`

export default function ToggleGroupPage() {
  const { t } = useTranslation()

  return (
    <div className='space-y-10'>
      <div>
        <h1 className='text-3xl font-bold tracking-tight'>Toggle Group</h1>
        <p className='mt-2 text-muted-foreground'>{t('docs.toggleGroup.desc')}</p>
        <p className='mt-1 text-xs text-muted-foreground'>
          {t('docs.source')}: <code className='rounded bg-muted px-1 py-0.5'>src/components/ui/toggle-group.tsx</code>
        </p>
      </div>

      <section className='space-y-4'>
        <h2 className='text-xl font-semibold'>{t('docs.whenToUse')}</h2>
        <p className='text-sm text-muted-foreground'>{t('docs.toggleGroup.whenToUse')}</p>
      </section>

      <section className='space-y-4'>
        <h2 className='text-xl font-semibold'>{t('docs.usage')}</h2>
        <ImportBlock code={`import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"`} />
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
            code={`import { IconAlignLeft, IconAlignCenter, IconAlignRight } from "@tabler/icons-react"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"

export function ToggleGroupDemo() {
  return (
    <ToggleGroup>
      <ToggleGroupItem value="left" aria-label="Align left">
        <IconAlignLeft className="size-4" />
      </ToggleGroupItem>
      <ToggleGroupItem value="center" aria-label="Align center">
        <IconAlignCenter className="size-4" />
      </ToggleGroupItem>
      <ToggleGroupItem value="right" aria-label="Align right">
        <IconAlignRight className="size-4" />
      </ToggleGroupItem>
    </ToggleGroup>
  )
}`}
          >
            <ToggleGroup>
              <ToggleGroupItem value='left' aria-label='Align left'>
                <IconAlignLeft className='size-4' />
              </ToggleGroupItem>
              <ToggleGroupItem value='center' aria-label='Align center'>
                <IconAlignCenter className='size-4' />
              </ToggleGroupItem>
              <ToggleGroupItem value='right' aria-label='Align right'>
                <IconAlignRight className='size-4' />
              </ToggleGroupItem>
            </ToggleGroup>
          </ComponentPreview>
        </div>

        <div className='space-y-2'>
          <h3 className='text-base font-medium'>Outline</h3>
          <ComponentPreview
            code={`import { IconAlignLeft, IconAlignCenter, IconAlignRight, IconAlignJustified } from "@tabler/icons-react"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"

export function ToggleGroupOutline() {
  return (
    <ToggleGroup variant="outline">
      <ToggleGroupItem value="left" aria-label="Align left">
        <IconAlignLeft className="size-4" />
      </ToggleGroupItem>
      <ToggleGroupItem value="center" aria-label="Align center">
        <IconAlignCenter className="size-4" />
      </ToggleGroupItem>
      <ToggleGroupItem value="right" aria-label="Align right">
        <IconAlignRight className="size-4" />
      </ToggleGroupItem>
      <ToggleGroupItem value="justify" aria-label="Align justify">
        <IconAlignJustified className="size-4" />
      </ToggleGroupItem>
    </ToggleGroup>
  )
}`}
          >
            <ToggleGroup variant='outline'>
              <ToggleGroupItem value='left' aria-label='Align left'>
                <IconAlignLeft className='size-4' />
              </ToggleGroupItem>
              <ToggleGroupItem value='center' aria-label='Align center'>
                <IconAlignCenter className='size-4' />
              </ToggleGroupItem>
              <ToggleGroupItem value='right' aria-label='Align right'>
                <IconAlignRight className='size-4' />
              </ToggleGroupItem>
              <ToggleGroupItem value='justify' aria-label='Align justify'>
                <IconAlignJustified className='size-4' />
              </ToggleGroupItem>
            </ToggleGroup>
          </ComponentPreview>
        </div>

        <div className='space-y-2'>
          <h3 className='text-base font-medium'>With Spacing</h3>
          <ComponentPreview
            code={`import { IconBold, IconItalic, IconUnderline } from "@tabler/icons-react"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"

export function ToggleGroupSpacing() {
  return (
    <ToggleGroup variant="outline">
      <ToggleGroupItem value="bold" aria-label="Toggle bold">
        <IconBold className="size-4" />
      </ToggleGroupItem>
      <ToggleGroupItem value="italic" aria-label="Toggle italic">
        <IconItalic className="size-4" />
      </ToggleGroupItem>
      <ToggleGroupItem value="underline" aria-label="Toggle underline">
        <IconUnderline className="size-4" />
      </ToggleGroupItem>
    </ToggleGroup>
  )
}`}
          >
            <ToggleGroup variant='outline'>
              <ToggleGroupItem value='bold' aria-label='Toggle bold'>
                <IconBold className='size-4' />
              </ToggleGroupItem>
              <ToggleGroupItem value='italic' aria-label='Toggle italic'>
                <IconItalic className='size-4' />
              </ToggleGroupItem>
              <ToggleGroupItem value='underline' aria-label='Toggle underline'>
                <IconUnderline className='size-4' />
              </ToggleGroupItem>
            </ToggleGroup>
          </ComponentPreview>
        </div>

        <div className='space-y-2'>
          <h3 className='text-base font-medium'>Vertical</h3>
          <ComponentPreview
            code={`import { IconAlignLeft, IconAlignCenter, IconAlignRight } from "@tabler/icons-react"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"

export function ToggleGroupVertical() {
  return (
    <ToggleGroup orientation="vertical" variant="outline">
      <ToggleGroupItem value="left" aria-label="Align left">
        <IconAlignLeft className="size-4" />
      </ToggleGroupItem>
      <ToggleGroupItem value="center" aria-label="Align center">
        <IconAlignCenter className="size-4" />
      </ToggleGroupItem>
      <ToggleGroupItem value="right" aria-label="Align right">
        <IconAlignRight className="size-4" />
      </ToggleGroupItem>
    </ToggleGroup>
  )
}`}
          >
            <ToggleGroup orientation='vertical' variant='outline'>
              <ToggleGroupItem value='left' aria-label='Align left'>
                <IconAlignLeft className='size-4' />
              </ToggleGroupItem>
              <ToggleGroupItem value='center' aria-label='Align center'>
                <IconAlignCenter className='size-4' />
              </ToggleGroupItem>
              <ToggleGroupItem value='right' aria-label='Align right'>
                <IconAlignRight className='size-4' />
              </ToggleGroupItem>
            </ToggleGroup>
          </ComponentPreview>
        </div>
      </section>

      <section className='space-y-4'>
        <h2 className='text-xl font-semibold'>{t('docs.apiReference')}</h2>
        <PropsTable title='ToggleGroup' data={GROUP_PROPS} />
        <PropsTable title='ToggleGroupItem' data={ITEM_PROPS} />
      </section>
    </div>
  )
}
