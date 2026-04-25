'use client'

import { useTranslation } from '@/lib/i18n/useTranslation'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Popover, PopoverContent, PopoverHeader, PopoverTitle, PopoverTrigger } from '@/components/ui/popover'
import { ComponentPreview } from '../../_components/ComponentPreview'
import { CompositionTree } from '../../_components/CompositionTree'
import { ImportBlock } from '../../_components/ImportBlock'
import { PropsTable } from '../../_components/PropsTable'

const CONTENT_PROPS = [
  { prop: 'align', type: '"start" | "center" | "end"', default: '"center"' },
  { prop: 'alignOffset', type: 'number', default: '0' },
  { prop: 'side', type: '"top" | "right" | "bottom" | "left"', default: '"bottom"' },
  { prop: 'sideOffset', type: 'number', default: '4' },
  { prop: 'className', type: 'string', default: '-' }
]

const COMPOSITION = `Popover
├── PopoverTrigger
└── PopoverContent
    ├── PopoverHeader
    │   ├── PopoverTitle
    │   └── PopoverDescription
    └── (children)`

export default function PopoverPage() {
  const { t } = useTranslation()

  return (
    <div className='space-y-10'>
      <div>
        <h1 className='text-3xl font-bold tracking-tight'>Popover</h1>
        <p className='mt-2 text-muted-foreground'>{t('docs.popover.desc')}</p>
        <p className='mt-1 text-xs text-muted-foreground'>
          {t('docs.source')}: <code className='rounded bg-muted px-1 py-0.5'>src/components/ui/popover.tsx</code>
        </p>
      </div>

      <section className='space-y-4'>
        <h2 className='text-xl font-semibold'>{t('docs.whenToUse')}</h2>
        <p className='text-sm text-muted-foreground'>{t('docs.popover.whenToUse')}</p>
      </section>

      <section className='space-y-4'>
        <h2 className='text-xl font-semibold'>{t('docs.usage')}</h2>
        <ImportBlock
          code={`import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverTitle,
  PopoverDescription,
} from "@/components/ui/popover"`}
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

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Popover,
  PopoverContent,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover"

export function PopoverDemo() {
  return (
    <Popover>
      <PopoverTrigger render={<Button variant="outline" />}>
        Open Settings
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <PopoverHeader>
          <PopoverTitle>Settings</PopoverTitle>
        </PopoverHeader>
        <div className="grid gap-4">
          <div className="grid grid-cols-3 items-center gap-4">
            <Label>Width</Label>
            <Input className="col-span-2" defaultValue="100%" />
          </div>
          <div className="grid grid-cols-3 items-center gap-4">
            <Label>Height</Label>
            <Input className="col-span-2" defaultValue="auto" />
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}`}
          >
            <Popover>
              <PopoverTrigger render={<Button variant='outline' />}>Open Settings</PopoverTrigger>
              <PopoverContent className='w-80'>
                <PopoverHeader>
                  <PopoverTitle>Settings</PopoverTitle>
                </PopoverHeader>
                <div className='grid gap-4'>
                  <div className='grid grid-cols-3 items-center gap-4'>
                    <Label>Width</Label>
                    <Input className='col-span-2' defaultValue='100%' />
                  </div>
                  <div className='grid grid-cols-3 items-center gap-4'>
                    <Label>Height</Label>
                    <Input className='col-span-2' defaultValue='auto' />
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          </ComponentPreview>
        </div>
      </section>

      <section className='space-y-4'>
        <h2 className='text-xl font-semibold'>{t('docs.apiReference')}</h2>
        <PropsTable title='PopoverContent' data={CONTENT_PROPS} />
      </section>
    </div>
  )
}
