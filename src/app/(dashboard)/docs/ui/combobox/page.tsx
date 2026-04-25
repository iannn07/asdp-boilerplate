'use client'

import * as React from 'react'

import { useTranslation } from '@/lib/i18n/useTranslation'

import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList
} from '@/components/ui/combobox'
import { ComponentPreview } from '../../_components/ComponentPreview'
import { CompositionTree } from '../../_components/CompositionTree'
import { ImportBlock } from '../../_components/ImportBlock'
import { PropsTable } from '../../_components/PropsTable'

const INPUT_PROPS = [
  { prop: 'showTrigger', type: 'boolean', default: 'true' },
  { prop: 'showClear', type: 'boolean', default: 'false' },
  { prop: 'disabled', type: 'boolean', default: 'false' },
  { prop: 'className', type: 'string', default: '-' }
]

const CONTENT_PROPS = [
  { prop: 'side', type: '"top" | "right" | "bottom" | "left"', default: '"bottom"' },
  { prop: 'sideOffset', type: 'number', default: '6' },
  { prop: 'align', type: '"start" | "center" | "end"', default: '"start"' },
  { prop: 'alignOffset', type: 'number', default: '0' },
  { prop: 'className', type: 'string', default: '-' }
]

const ITEM_PROPS = [
  { prop: 'value', type: 'string', default: '-' },
  { prop: 'disabled', type: 'boolean', default: 'false' },
  { prop: 'className', type: 'string', default: '-' }
]

const CHIP_PROPS = [
  { prop: 'showRemove', type: 'boolean', default: 'true' },
  { prop: 'className', type: 'string', default: '-' }
]

const COMPOSITION = `Combobox
├── ComboboxInput
│   ├── ComboboxTrigger
│   └── ComboboxClear
├── ComboboxChips
│   ├── ComboboxChip
│   └── ComboboxChipsInput
└── ComboboxContent
    ├── ComboboxList
    │   ├── ComboboxGroup
    │   │   ├── ComboboxLabel
    │   │   └── ComboboxItem
    │   └── ComboboxEmpty
    └── ComboboxSeparator`

const FRAMEWORKS = [
  { value: 'next', label: 'Next.js' },
  { value: 'remix', label: 'Remix' },
  { value: 'astro', label: 'Astro' },
  { value: 'nuxt', label: 'Nuxt' },
  { value: 'svelte', label: 'SvelteKit' }
]

export default function ComboboxPage() {
  const { t } = useTranslation()

  return (
    <div className='space-y-10'>
      <div>
        <h1 className='text-3xl font-bold tracking-tight'>Combobox</h1>
        <p className='mt-2 text-muted-foreground'>{t('docs.combobox.desc')}</p>
        <p className='mt-1 text-xs text-muted-foreground'>
          {t('docs.source')}: <code className='rounded bg-muted px-1 py-0.5'>src/components/ui/combobox.tsx</code>
        </p>
      </div>

      <section className='space-y-4'>
        <h2 className='text-xl font-semibold'>{t('docs.whenToUse')}</h2>
        <p className='text-sm text-muted-foreground'>{t('docs.combobox.whenToUse')}</p>
      </section>

      <section className='space-y-4'>
        <h2 className='text-xl font-semibold'>{t('docs.usage')}</h2>
        <ImportBlock
          code={`import {
  Combobox,
  ComboboxInput,
  ComboboxContent,
  ComboboxList,
  ComboboxItem,
  ComboboxGroup,
  ComboboxLabel,
  ComboboxEmpty,
  ComboboxSeparator,
  ComboboxChips,
  ComboboxChip,
  ComboboxChipsInput,
} from "@/components/ui/combobox"`}
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
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/ui/combobox"

const frameworks = [
  { value: "next", label: "Next.js" },
  { value: "remix", label: "Remix" },
  { value: "astro", label: "Astro" },
  { value: "nuxt", label: "Nuxt" },
  { value: "svelte", label: "SvelteKit" },
]

export function ComboboxDemo() {
  return (
    <Combobox>
      <ComboboxInput placeholder="Select framework..." />
      <ComboboxContent>
        <ComboboxList>
          <ComboboxEmpty>No framework found.</ComboboxEmpty>
          {frameworks.map((f) => (
            <ComboboxItem key={f.value} value={f.value}>
              {f.label}
            </ComboboxItem>
          ))}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  )
}`}
          >
            <Combobox>
              <ComboboxInput placeholder='Select framework...' />
              <ComboboxContent>
                <ComboboxList>
                  <ComboboxEmpty>No framework found.</ComboboxEmpty>
                  {FRAMEWORKS.map(f => (
                    <ComboboxItem key={f.value} value={f.value}>
                      {f.label}
                    </ComboboxItem>
                  ))}
                </ComboboxList>
              </ComboboxContent>
            </Combobox>
          </ComponentPreview>
        </div>

        <div className='space-y-2'>
          <h3 className='text-base font-medium'>With Clear</h3>
          <ComponentPreview
            code={`'use client'

import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/ui/combobox"

const frameworks = [
  { value: "next", label: "Next.js" },
  { value: "remix", label: "Remix" },
  { value: "astro", label: "Astro" },
]

export function ComboboxWithClear() {
  return (
    <Combobox>
      <ComboboxInput placeholder="Select framework..." showClear />
      <ComboboxContent>
        <ComboboxList>
          <ComboboxEmpty>No framework found.</ComboboxEmpty>
          {frameworks.map((f) => (
            <ComboboxItem key={f.value} value={f.value}>
              {f.label}
            </ComboboxItem>
          ))}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  )
}`}
          >
            <Combobox>
              <ComboboxInput placeholder='Select framework...' showClear />
              <ComboboxContent>
                <ComboboxList>
                  <ComboboxEmpty>No framework found.</ComboboxEmpty>
                  {FRAMEWORKS.slice(0, 3).map(f => (
                    <ComboboxItem key={f.value} value={f.value}>
                      {f.label}
                    </ComboboxItem>
                  ))}
                </ComboboxList>
              </ComboboxContent>
            </Combobox>
          </ComponentPreview>
        </div>
      </section>

      <section className='space-y-4'>
        <h2 className='text-xl font-semibold'>{t('docs.apiReference')}</h2>
        <PropsTable title='ComboboxInput' data={INPUT_PROPS} />
        <PropsTable title='ComboboxContent' data={CONTENT_PROPS} />
        <PropsTable title='ComboboxItem' data={ITEM_PROPS} />
        <PropsTable title='ComboboxChip' data={CHIP_PROPS} />
      </section>
    </div>
  )
}
