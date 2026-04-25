'use client'

import { IconCommand } from '@tabler/icons-react'

import { useTranslation } from '@/lib/i18n/useTranslation'

import { Kbd, KbdGroup } from '@/components/ui/kbd'
import { ComponentPreview } from '../../_components/ComponentPreview'
import { CompositionTree } from '../../_components/CompositionTree'
import { ImportBlock } from '../../_components/ImportBlock'
import { PropsTable } from '../../_components/PropsTable'

const PROPS = [
  { prop: 'className', type: 'string', default: '-' },
  { prop: 'children', type: 'React.ReactNode', default: '-' }
]

const COMPOSITION = `KbdGroup
└── Kbd`

export default function KbdPage() {
  const { t } = useTranslation()

  return (
    <div className='space-y-10'>
      <div>
        <h1 className='text-3xl font-bold tracking-tight'>Kbd</h1>
        <p className='mt-2 text-muted-foreground'>{t('docs.kbd.desc')}</p>
        <p className='mt-1 text-xs text-muted-foreground'>
          {t('docs.source')}: <code className='rounded bg-muted px-1 py-0.5'>src/components/ui/kbd.tsx</code>
        </p>
      </div>

      <section className='space-y-4'>
        <h2 className='text-xl font-semibold'>{t('docs.whenToUse')}</h2>
        <p className='text-sm text-muted-foreground'>{t('docs.kbd.whenToUse')}</p>
      </section>

      <section className='space-y-4'>
        <h2 className='text-xl font-semibold'>{t('docs.usage')}</h2>
        <ImportBlock code={`import { Kbd, KbdGroup } from "@/components/ui/kbd"`} />
      </section>

      <section className='space-y-4'>
        <h2 className='text-xl font-semibold'>{t('docs.composition')}</h2>
        <CompositionTree tree={COMPOSITION} />
      </section>

      <section className='space-y-6'>
        <h2 className='text-xl font-semibold'>{t('docs.examples')}</h2>

        <div className='space-y-2'>
          <h3 className='text-base font-medium'>Single Key</h3>
          <ComponentPreview
            code={`import { Kbd } from "@/components/ui/kbd"

export function KbdSingle() {
  return (
    <div className="flex items-center gap-2">
      <Kbd>K</Kbd>
      <Kbd>Enter</Kbd>
      <Kbd>Tab</Kbd>
      <Kbd>Shift</Kbd>
    </div>
  )
}`}
          >
            <div className='flex items-center gap-2'>
              <Kbd>K</Kbd>
              <Kbd>Enter</Kbd>
              <Kbd>Tab</Kbd>
              <Kbd>Shift</Kbd>
            </div>
          </ComponentPreview>
        </div>

        <div className='space-y-2'>
          <h3 className='text-base font-medium'>Key Combination</h3>
          <ComponentPreview
            code={`import { IconCommand } from "@tabler/icons-react"
import { Kbd, KbdGroup } from "@/components/ui/kbd"

export function KbdCombination() {
  return (
    <div className="flex items-center gap-4">
      <KbdGroup>
        <Kbd><IconCommand className="size-3" /></Kbd>
        <Kbd>K</Kbd>
      </KbdGroup>
      <KbdGroup>
        <Kbd>Ctrl</Kbd>
        <Kbd>Shift</Kbd>
        <Kbd>P</Kbd>
      </KbdGroup>
    </div>
  )
}`}
          >
            <div className='flex items-center gap-4'>
              <KbdGroup>
                <Kbd>
                  <IconCommand className='size-3' />
                </Kbd>
                <Kbd>K</Kbd>
              </KbdGroup>
              <KbdGroup>
                <Kbd>Ctrl</Kbd>
                <Kbd>Shift</Kbd>
                <Kbd>P</Kbd>
              </KbdGroup>
            </div>
          </ComponentPreview>
        </div>

        <div className='space-y-2'>
          <h3 className='text-base font-medium'>Inline Usage</h3>
          <ComponentPreview
            code={`import { Kbd, KbdGroup } from "@/components/ui/kbd"

export function KbdInline() {
  return (
    <p className="text-sm text-muted-foreground">
      Press{" "}
      <KbdGroup>
        <Kbd>Ctrl</Kbd>
        <Kbd>C</Kbd>
      </KbdGroup>{" "}
      to copy and{" "}
      <KbdGroup>
        <Kbd>Ctrl</Kbd>
        <Kbd>V</Kbd>
      </KbdGroup>{" "}
      to paste.
    </p>
  )
}`}
          >
            <p className='text-sm text-muted-foreground'>
              Press{' '}
              <KbdGroup>
                <Kbd>Ctrl</Kbd>
                <Kbd>C</Kbd>
              </KbdGroup>{' '}
              to copy and{' '}
              <KbdGroup>
                <Kbd>Ctrl</Kbd>
                <Kbd>V</Kbd>
              </KbdGroup>{' '}
              to paste.
            </p>
          </ComponentPreview>
        </div>
      </section>

      <section className='space-y-4'>
        <h2 className='text-xl font-semibold'>{t('docs.apiReference')}</h2>
        <PropsTable title='Kbd' data={PROPS} />
        <PropsTable title='KbdGroup' data={PROPS} />
      </section>
    </div>
  )
}
