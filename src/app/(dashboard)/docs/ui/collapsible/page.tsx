'use client'

import { useState } from 'react'

import { useTranslation } from '@/lib/i18n/useTranslation'

import { Button } from '@/components/ui/button'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import { ComponentPreview } from '../../_components/ComponentPreview'
import { CompositionTree } from '../../_components/CompositionTree'
import { ImportBlock } from '../../_components/ImportBlock'
import { PropsTable } from '../../_components/PropsTable'

const COLLAPSIBLE_PROPS = [
  { prop: 'open', type: 'boolean', default: '-' },
  { prop: 'onOpenChange', type: '(open: boolean) => void', default: '-' },
  { prop: 'defaultOpen', type: 'boolean', default: 'false' },
  { prop: 'disabled', type: 'boolean', default: 'false' }
]

const COMPOSITION = `Collapsible
├── CollapsibleTrigger
└── CollapsibleContent`

export default function CollapsiblePage() {
  const { t } = useTranslation()
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className='space-y-10'>
      <div>
        <h1 className='text-3xl font-bold tracking-tight'>Collapsible</h1>
        <p className='mt-2 text-muted-foreground'>{t('docs.collapsible.desc')}</p>
        <p className='mt-1 text-xs text-muted-foreground'>
          {t('docs.source')}: <code className='rounded bg-muted px-1 py-0.5'>src/components/ui/collapsible.tsx</code>
        </p>
      </div>

      <section className='space-y-4'>
        <h2 className='text-xl font-semibold'>{t('docs.whenToUse')}</h2>
        <p className='text-sm text-muted-foreground'>{t('docs.collapsible.whenToUse')}</p>
      </section>

      <section className='space-y-4'>
        <h2 className='text-xl font-semibold'>{t('docs.usage')}</h2>
        <ImportBlock
          code={`import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "@/components/ui/collapsible"`}
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

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"

export function CollapsibleDemo() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen} className="w-[350px] space-y-2">
      <div className="flex items-center justify-between space-x-4 px-4">
        <h4 className="text-sm font-semibold">@peduarte starred 3 repositories</h4>
        <CollapsibleTrigger render={<Button variant="ghost" size="sm" />}>
          {isOpen ? "Hide" : "Show"}
        </CollapsibleTrigger>
      </div>
      <div className="rounded-md border px-4 py-2 text-sm">@radix-ui/primitives</div>
      <CollapsibleContent className="space-y-2">
        <div className="rounded-md border px-4 py-2 text-sm">@radix-ui/colors</div>
        <div className="rounded-md border px-4 py-2 text-sm">@radix-ui/react</div>
      </CollapsibleContent>
    </Collapsible>
  )
}`}
          >
            <Collapsible open={isOpen} onOpenChange={setIsOpen} className='w-[350px] space-y-2'>
              <div className='flex items-center justify-between space-x-4 px-4'>
                <h4 className='text-sm font-semibold'>@peduarte starred 3 repositories</h4>
                <CollapsibleTrigger render={<Button variant='ghost' size='sm' />}>
                  {isOpen ? 'Hide' : 'Show'}
                </CollapsibleTrigger>
              </div>
              <div className='rounded-md border px-4 py-2 text-sm'>@radix-ui/primitives</div>
              <CollapsibleContent className='space-y-2'>
                <div className='rounded-md border px-4 py-2 text-sm'>@radix-ui/colors</div>
                <div className='rounded-md border px-4 py-2 text-sm'>@radix-ui/react</div>
              </CollapsibleContent>
            </Collapsible>
          </ComponentPreview>
        </div>
      </section>

      <section className='space-y-4'>
        <h2 className='text-xl font-semibold'>{t('docs.apiReference')}</h2>
        <PropsTable title='Collapsible' data={COLLAPSIBLE_PROPS} />
      </section>
    </div>
  )
}
