'use client'

import { useTranslation } from '@/lib/i18n/useTranslation'

import { InputGroup, InputGroupAddon, InputGroupInput, InputGroupText } from '@/components/ui/input-group'
import { ComponentPreview } from '../../_components/ComponentPreview'
import { ImportBlock } from '../../_components/ImportBlock'
import { PropsTable } from '../../_components/PropsTable'

const GROUP_PROPS = [{ prop: 'className', type: 'string', default: '-' }]

const ADDON_PROPS = [
  { prop: 'align', type: '"inline-start" | "inline-end" | "block-start" | "block-end"', default: '"inline-start"' },
  { prop: 'className', type: 'string', default: '-' }
]

export default function InputGroupPage() {
  const { t } = useTranslation()

  return (
    <div className='space-y-10'>
      <div>
        <h1 className='text-3xl font-bold tracking-tight'>Input Group</h1>
        <p className='mt-2 text-muted-foreground'>{t('docs.inputGroup.desc')}</p>
        <p className='mt-1 text-xs text-muted-foreground'>
          {t('docs.source')}: <code className='rounded bg-muted px-1 py-0.5'>src/components/ui/input-group.tsx</code>
        </p>
      </div>

      <section className='space-y-4'>
        <h2 className='text-xl font-semibold'>{t('docs.whenToUse')}</h2>
        <p className='text-sm text-muted-foreground'>{t('docs.inputGroup.whenToUse')}</p>
      </section>

      <section className='space-y-4'>
        <h2 className='text-xl font-semibold'>{t('docs.usage')}</h2>
        <ImportBlock
          code={`import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
} from "@/components/ui/input-group"`}
        />
      </section>

      <section className='space-y-6'>
        <h2 className='text-xl font-semibold'>{t('docs.examples')}</h2>

        <div className='space-y-2'>
          <h3 className='text-base font-medium'>With Prefix</h3>
          <ComponentPreview
            code={`import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
} from "@/components/ui/input-group"

export function InputGroupWithPrefix() {
  return (
    <InputGroup>
      <InputGroupAddon align="inline-start">
        <InputGroupText>https://</InputGroupText>
      </InputGroupAddon>
      <InputGroupInput placeholder="example.com" />
    </InputGroup>
  )
}`}
          >
            <InputGroup className='max-w-sm'>
              <InputGroupAddon align='inline-start'>
                <InputGroupText>https://</InputGroupText>
              </InputGroupAddon>
              <InputGroupInput placeholder='example.com' />
            </InputGroup>
          </ComponentPreview>
        </div>

        <div className='space-y-2'>
          <h3 className='text-base font-medium'>With Suffix</h3>
          <ComponentPreview
            code={`import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
} from "@/components/ui/input-group"

export function InputGroupWithSuffix() {
  return (
    <InputGroup>
      <InputGroupInput placeholder="0.00" />
      <InputGroupAddon align="inline-end">
        <InputGroupText>USD</InputGroupText>
      </InputGroupAddon>
    </InputGroup>
  )
}`}
          >
            <InputGroup className='max-w-sm'>
              <InputGroupInput placeholder='0.00' />
              <InputGroupAddon align='inline-end'>
                <InputGroupText>USD</InputGroupText>
              </InputGroupAddon>
            </InputGroup>
          </ComponentPreview>
        </div>
      </section>

      <section className='space-y-4'>
        <h2 className='text-xl font-semibold'>{t('docs.apiReference')}</h2>
        <PropsTable title='InputGroup' data={GROUP_PROPS} />
        <PropsTable title='InputGroupAddon' data={ADDON_PROPS} />
      </section>
    </div>
  )
}
