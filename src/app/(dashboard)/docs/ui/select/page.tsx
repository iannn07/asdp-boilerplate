'use client'

import { useTranslation } from '@/lib/i18n/useTranslation'

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { ComponentPreview } from '../../_components/ComponentPreview'
import { CompositionTree } from '../../_components/CompositionTree'
import { ImportBlock } from '../../_components/ImportBlock'
import { PropsTable } from '../../_components/PropsTable'

const TRIGGER_PROPS = [
  { prop: 'placeholder', type: 'string', default: '-' },
  { prop: 'size', type: '"sm" | "default"', default: '"default"' },
  { prop: 'disabled', type: 'boolean', default: 'false' },
  { prop: 'className', type: 'string', default: '-' }
]

const COMPOSITION = `Select
├── SelectTrigger
│   └── SelectValue
└── SelectContent
    └── SelectGroup
        ├── SelectLabel
        └── SelectItem`

export default function SelectPage() {
  const { t } = useTranslation()

  return (
    <div className='space-y-10'>
      <div>
        <h1 className='text-3xl font-bold tracking-tight'>Select</h1>
        <p className='mt-2 text-muted-foreground'>{t('docs.select.desc')}</p>
        <p className='mt-1 text-xs text-muted-foreground'>
          {t('docs.source')}: <code className='rounded bg-muted px-1 py-0.5'>src/components/ui/select.tsx</code>
        </p>
      </div>

      <section className='space-y-4'>
        <h2 className='text-xl font-semibold'>{t('docs.whenToUse')}</h2>
        <p className='text-sm text-muted-foreground'>{t('docs.select.whenToUse')}</p>
      </section>

      <section className='space-y-4'>
        <h2 className='text-xl font-semibold'>{t('docs.usage')}</h2>
        <ImportBlock
          code={`import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"`}
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
            code={`import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export function SelectDefault() {
  return (
    <Select>
      <SelectTrigger className="w-48">
        <SelectValue placeholder="Pick a fruit" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Fruits</SelectLabel>
          <SelectItem value="apple">Apple</SelectItem>
          <SelectItem value="banana">Banana</SelectItem>
          <SelectItem value="cherry">Cherry</SelectItem>
          <SelectItem value="grape">Grape</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}`}
          >
            <Select>
              <SelectTrigger className='w-48'>
                <SelectValue placeholder='Pick a fruit' />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Fruits</SelectLabel>
                  <SelectItem value='apple'>Apple</SelectItem>
                  <SelectItem value='banana'>Banana</SelectItem>
                  <SelectItem value='cherry'>Cherry</SelectItem>
                  <SelectItem value='grape'>Grape</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </ComponentPreview>
        </div>

        <div className='space-y-2'>
          <h3 className='text-base font-medium'>Disabled</h3>
          <ComponentPreview
            code={`import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export function SelectDisabled() {
  return (
    <Select disabled>
      <SelectTrigger className="w-48">
        <SelectValue placeholder="Disabled" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="apple">Apple</SelectItem>
          <SelectItem value="banana">Banana</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}`}
          >
            <Select disabled>
              <SelectTrigger className='w-48'>
                <SelectValue placeholder='Disabled' />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value='apple'>Apple</SelectItem>
                  <SelectItem value='banana'>Banana</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </ComponentPreview>
        </div>
      </section>

      <section className='space-y-4'>
        <h2 className='text-xl font-semibold'>{t('docs.apiReference')}</h2>
        <PropsTable title='SelectTrigger' data={TRIGGER_PROPS} />
      </section>
    </div>
  )
}
