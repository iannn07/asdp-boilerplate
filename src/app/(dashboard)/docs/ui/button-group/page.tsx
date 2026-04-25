'use client'

import { IconChevronDown, IconCopy, IconDownload, IconShare } from '@tabler/icons-react'

import { useTranslation } from '@/lib/i18n/useTranslation'

import { Button } from '@/components/ui/button'
import { ButtonGroup, ButtonGroupSeparator, ButtonGroupText } from '@/components/ui/button-group'
import { ComponentPreview } from '../../_components/ComponentPreview'
import { CompositionTree } from '../../_components/CompositionTree'
import { ImportBlock } from '../../_components/ImportBlock'
import { PropsTable } from '../../_components/PropsTable'

const GROUP_PROPS = [
  { prop: 'orientation', type: '"horizontal" | "vertical"', default: '"horizontal"' },
  { prop: 'className', type: 'string', default: '-' }
]

const TEXT_PROPS = [
  { prop: 'render', type: 'React.ReactElement', default: '-' },
  { prop: 'className', type: 'string', default: '-' }
]

const SEPARATOR_PROPS = [
  { prop: 'orientation', type: '"horizontal" | "vertical"', default: '"vertical"' },
  { prop: 'className', type: 'string', default: '-' }
]

const COMPOSITION = `ButtonGroup
├── Button
├── ButtonGroupSeparator
├── ButtonGroupText
└── Button`

export default function ButtonGroupPage() {
  const { t } = useTranslation()

  return (
    <div className='space-y-10'>
      <div>
        <h1 className='text-3xl font-bold tracking-tight'>Button Group</h1>
        <p className='mt-2 text-muted-foreground'>{t('docs.buttonGroup.desc')}</p>
        <p className='mt-1 text-xs text-muted-foreground'>
          {t('docs.source')}: <code className='rounded bg-muted px-1 py-0.5'>src/components/ui/button-group.tsx</code>
        </p>
      </div>

      <section className='space-y-4'>
        <h2 className='text-xl font-semibold'>{t('docs.whenToUse')}</h2>
        <p className='text-sm text-muted-foreground'>{t('docs.buttonGroup.whenToUse')}</p>
      </section>

      <section className='space-y-4'>
        <h2 className='text-xl font-semibold'>{t('docs.usage')}</h2>
        <ImportBlock
          code={`import {
  ButtonGroup,
  ButtonGroupSeparator,
  ButtonGroupText,
} from "@/components/ui/button-group"`}
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
            code={`import { Button } from "@/components/ui/button"
import { ButtonGroup } from "@/components/ui/button-group"

export function ButtonGroupDemo() {
  return (
    <ButtonGroup>
      <Button variant="outline">Copy</Button>
      <Button variant="outline">Share</Button>
      <Button variant="outline">Download</Button>
    </ButtonGroup>
  )
}`}
          >
            <ButtonGroup>
              <Button variant='outline'>Copy</Button>
              <Button variant='outline'>Share</Button>
              <Button variant='outline'>Download</Button>
            </ButtonGroup>
          </ComponentPreview>
        </div>

        <div className='space-y-2'>
          <h3 className='text-base font-medium'>With Icons</h3>
          <ComponentPreview
            code={`import { IconCopy, IconShare, IconDownload } from "@tabler/icons-react"
import { Button } from "@/components/ui/button"
import { ButtonGroup } from "@/components/ui/button-group"

export function ButtonGroupIcons() {
  return (
    <ButtonGroup>
      <Button variant="outline" size="icon">
        <IconCopy className="size-4" />
      </Button>
      <Button variant="outline" size="icon">
        <IconShare className="size-4" />
      </Button>
      <Button variant="outline" size="icon">
        <IconDownload className="size-4" />
      </Button>
    </ButtonGroup>
  )
}`}
          >
            <ButtonGroup>
              <Button variant='outline' size='icon'>
                <IconCopy className='size-4' />
              </Button>
              <Button variant='outline' size='icon'>
                <IconShare className='size-4' />
              </Button>
              <Button variant='outline' size='icon'>
                <IconDownload className='size-4' />
              </Button>
            </ButtonGroup>
          </ComponentPreview>
        </div>

        <div className='space-y-2'>
          <h3 className='text-base font-medium'>With Separator</h3>
          <ComponentPreview
            code={`import { IconChevronDown } from "@tabler/icons-react"
import { Button } from "@/components/ui/button"
import {
  ButtonGroup,
  ButtonGroupSeparator,
} from "@/components/ui/button-group"

export function ButtonGroupWithSeparator() {
  return (
    <ButtonGroup>
      <Button variant="outline">Save</Button>
      <ButtonGroupSeparator />
      <Button variant="outline" size="icon">
        <IconChevronDown className="size-4" />
      </Button>
    </ButtonGroup>
  )
}`}
          >
            <ButtonGroup>
              <Button variant='outline'>Save</Button>
              <ButtonGroupSeparator />
              <Button variant='outline' size='icon'>
                <IconChevronDown className='size-4' />
              </Button>
            </ButtonGroup>
          </ComponentPreview>
        </div>

        <div className='space-y-2'>
          <h3 className='text-base font-medium'>With Text</h3>
          <ComponentPreview
            code={`import { Button } from "@/components/ui/button"
import {
  ButtonGroup,
  ButtonGroupText,
} from "@/components/ui/button-group"

export function ButtonGroupWithText() {
  return (
    <ButtonGroup>
      <ButtonGroupText>Page 1 of 10</ButtonGroupText>
      <Button variant="outline">Next</Button>
    </ButtonGroup>
  )
}`}
          >
            <ButtonGroup>
              <ButtonGroupText>Page 1 of 10</ButtonGroupText>
              <Button variant='outline'>Next</Button>
            </ButtonGroup>
          </ComponentPreview>
        </div>

        <div className='space-y-2'>
          <h3 className='text-base font-medium'>Vertical</h3>
          <ComponentPreview
            code={`import { Button } from "@/components/ui/button"
import { ButtonGroup } from "@/components/ui/button-group"

export function ButtonGroupVertical() {
  return (
    <ButtonGroup orientation="vertical">
      <Button variant="outline">Top</Button>
      <Button variant="outline">Middle</Button>
      <Button variant="outline">Bottom</Button>
    </ButtonGroup>
  )
}`}
          >
            <ButtonGroup orientation='vertical'>
              <Button variant='outline'>Top</Button>
              <Button variant='outline'>Middle</Button>
              <Button variant='outline'>Bottom</Button>
            </ButtonGroup>
          </ComponentPreview>
        </div>
      </section>

      <section className='space-y-4'>
        <h2 className='text-xl font-semibold'>{t('docs.apiReference')}</h2>
        <PropsTable title='ButtonGroup' data={GROUP_PROPS} />
        <PropsTable title='ButtonGroupText' data={TEXT_PROPS} />
        <PropsTable title='ButtonGroupSeparator' data={SEPARATOR_PROPS} />
      </section>
    </div>
  )
}
