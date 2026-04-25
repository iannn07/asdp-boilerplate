'use client'

import { IconBold, IconItalic, IconUnderline } from '@tabler/icons-react'

import { useTranslation } from '@/lib/i18n/useTranslation'

import { Toggle } from '@/components/ui/toggle'
import { ComponentPreview } from '../../_components/ComponentPreview'
import { ImportBlock } from '../../_components/ImportBlock'
import { PropsTable } from '../../_components/PropsTable'

const PROPS = [
  { prop: 'variant', type: '"default" | "outline"', default: '"default"' },
  { prop: 'size', type: '"default" | "sm" | "lg"', default: '"default"' },
  { prop: 'pressed', type: 'boolean', default: '-' },
  { prop: 'onPressedChange', type: '(pressed: boolean) => void', default: '-' },
  { prop: 'disabled', type: 'boolean', default: 'false' },
  { prop: 'className', type: 'string', default: '-' }
]

export default function TogglePage() {
  const { t } = useTranslation()

  return (
    <div className='space-y-10'>
      <div>
        <h1 className='text-3xl font-bold tracking-tight'>Toggle</h1>
        <p className='mt-2 text-muted-foreground'>{t('docs.toggle.desc')}</p>
        <p className='mt-1 text-xs text-muted-foreground'>
          {t('docs.source')}: <code className='rounded bg-muted px-1 py-0.5'>src/components/ui/toggle.tsx</code>
        </p>
      </div>

      <section className='space-y-4'>
        <h2 className='text-xl font-semibold'>{t('docs.whenToUse')}</h2>
        <p className='text-sm text-muted-foreground'>{t('docs.toggle.whenToUse')}</p>
      </section>

      <section className='space-y-4'>
        <h2 className='text-xl font-semibold'>{t('docs.usage')}</h2>
        <ImportBlock code={`import { Toggle } from "@/components/ui/toggle"`} />
      </section>

      <section className='space-y-6'>
        <h2 className='text-xl font-semibold'>{t('docs.examples')}</h2>

        <div className='space-y-2'>
          <h3 className='text-base font-medium'>Default</h3>
          <ComponentPreview
            code={`import { IconBold } from "@tabler/icons-react"
import { Toggle } from "@/components/ui/toggle"

export function ToggleDemo() {
  return (
    <Toggle aria-label="Toggle bold">
      <IconBold className="size-4" />
    </Toggle>
  )
}`}
          >
            <Toggle aria-label='Toggle bold'>
              <IconBold className='size-4' />
            </Toggle>
          </ComponentPreview>
        </div>

        <div className='space-y-2'>
          <h3 className='text-base font-medium'>Outline</h3>
          <ComponentPreview
            code={`import { IconItalic } from "@tabler/icons-react"
import { Toggle } from "@/components/ui/toggle"

export function ToggleOutline() {
  return (
    <Toggle variant="outline" aria-label="Toggle italic">
      <IconItalic className="size-4" />
    </Toggle>
  )
}`}
          >
            <Toggle variant='outline' aria-label='Toggle italic'>
              <IconItalic className='size-4' />
            </Toggle>
          </ComponentPreview>
        </div>

        <div className='space-y-2'>
          <h3 className='text-base font-medium'>With Text</h3>
          <ComponentPreview
            code={`import { IconUnderline } from "@tabler/icons-react"
import { Toggle } from "@/components/ui/toggle"

export function ToggleWithText() {
  return (
    <Toggle aria-label="Toggle underline">
      <IconUnderline className="size-4" />
      Underline
    </Toggle>
  )
}`}
          >
            <Toggle aria-label='Toggle underline'>
              <IconUnderline className='size-4' />
              Underline
            </Toggle>
          </ComponentPreview>
        </div>

        <div className='space-y-2'>
          <h3 className='text-base font-medium'>Sizes</h3>
          <ComponentPreview
            code={`import { IconBold } from "@tabler/icons-react"
import { Toggle } from "@/components/ui/toggle"

export function ToggleSizes() {
  return (
    <div className="flex items-center gap-2">
      <Toggle size="sm" aria-label="Toggle bold">
        <IconBold className="size-4" />
      </Toggle>
      <Toggle size="default" aria-label="Toggle bold">
        <IconBold className="size-4" />
      </Toggle>
      <Toggle size="lg" aria-label="Toggle bold">
        <IconBold className="size-4" />
      </Toggle>
    </div>
  )
}`}
          >
            <div className='flex items-center gap-2'>
              <Toggle size='sm' aria-label='Toggle bold'>
                <IconBold className='size-4' />
              </Toggle>
              <Toggle size='default' aria-label='Toggle bold'>
                <IconBold className='size-4' />
              </Toggle>
              <Toggle size='lg' aria-label='Toggle bold'>
                <IconBold className='size-4' />
              </Toggle>
            </div>
          </ComponentPreview>
        </div>

        <div className='space-y-2'>
          <h3 className='text-base font-medium'>Disabled</h3>
          <ComponentPreview
            code={`import { IconBold } from "@tabler/icons-react"
import { Toggle } from "@/components/ui/toggle"

export function ToggleDisabled() {
  return (
    <Toggle disabled aria-label="Toggle bold">
      <IconBold className="size-4" />
    </Toggle>
  )
}`}
          >
            <Toggle disabled aria-label='Toggle bold'>
              <IconBold className='size-4' />
            </Toggle>
          </ComponentPreview>
        </div>
      </section>

      <section className='space-y-4'>
        <h2 className='text-xl font-semibold'>{t('docs.apiReference')}</h2>
        <PropsTable title='Toggle' data={PROPS} />
      </section>
    </div>
  )
}
