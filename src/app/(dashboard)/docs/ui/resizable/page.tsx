'use client'

import { useTranslation } from '@/lib/i18n/useTranslation'

import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable'
import { ComponentPreview } from '../../_components/ComponentPreview'
import { CompositionTree } from '../../_components/CompositionTree'
import { ImportBlock } from '../../_components/ImportBlock'
import { PropsTable } from '../../_components/PropsTable'

const PANEL_GROUP_PROPS = [
  { prop: 'direction', type: '"horizontal" | "vertical"', default: '-' },
  { prop: 'className', type: 'string', default: '-' }
]

const PANEL_PROPS = [
  { prop: 'defaultSize', type: 'number', default: '-' },
  { prop: 'minSize', type: 'number', default: '-' },
  { prop: 'maxSize', type: 'number', default: '-' }
]

const HANDLE_PROPS = [
  { prop: 'withHandle', type: 'boolean', default: 'false' },
  { prop: 'className', type: 'string', default: '-' }
]

const COMPOSITION = `ResizablePanelGroup
├── ResizablePanel
├── ResizableHandle
└── ResizablePanel`

export default function ResizablePage() {
  const { t } = useTranslation()

  return (
    <div className='space-y-10'>
      <div>
        <h1 className='text-3xl font-bold tracking-tight'>Resizable</h1>
        <p className='mt-2 text-muted-foreground'>{t('docs.resizable.desc')}</p>
        <p className='mt-1 text-xs text-muted-foreground'>
          {t('docs.source')}: <code className='rounded bg-muted px-1 py-0.5'>src/components/ui/resizable.tsx</code>
        </p>
      </div>

      <section className='space-y-4'>
        <h2 className='text-xl font-semibold'>{t('docs.whenToUse')}</h2>
        <p className='text-sm text-muted-foreground'>{t('docs.resizable.whenToUse')}</p>
      </section>

      <section className='space-y-4'>
        <h2 className='text-xl font-semibold'>{t('docs.usage')}</h2>
        <ImportBlock
          code={`import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from "@/components/ui/resizable"`}
        />
      </section>

      <section className='space-y-4'>
        <h2 className='text-xl font-semibold'>{t('docs.composition')}</h2>
        <CompositionTree tree={COMPOSITION} />
      </section>

      <section className='space-y-6'>
        <h2 className='text-xl font-semibold'>{t('docs.examples')}</h2>

        <div className='space-y-2'>
          <h3 className='text-base font-medium'>Horizontal</h3>
          <ComponentPreview
            code={`'use client'

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"

export function ResizableDemo() {
  return (
    <ResizablePanelGroup direction="horizontal" className="min-h-[200px] max-w-md rounded-lg border">
      <ResizablePanel defaultSize={50}>
        <div className="flex h-full items-center justify-center p-6">
          <span className="font-semibold">Panel A</span>
        </div>
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel defaultSize={50}>
        <div className="flex h-full items-center justify-center p-6">
          <span className="font-semibold">Panel B</span>
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  )
}`}
          >
            <ResizablePanelGroup className='min-h-[200px] max-w-md rounded-lg border'>
              <ResizablePanel defaultSize={50}>
                <div className='flex h-full items-center justify-center p-6'>
                  <span className='font-semibold'>Panel A</span>
                </div>
              </ResizablePanel>
              <ResizableHandle />
              <ResizablePanel defaultSize={50}>
                <div className='flex h-full items-center justify-center p-6'>
                  <span className='font-semibold'>Panel B</span>
                </div>
              </ResizablePanel>
            </ResizablePanelGroup>
          </ComponentPreview>
        </div>

        <div className='space-y-2'>
          <h3 className='text-base font-medium'>Vertical</h3>
          <ComponentPreview
            code={`'use client'

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"

export function ResizableVerticalDemo() {
  return (
    <ResizablePanelGroup direction="vertical" className="min-h-[300px] max-w-md rounded-lg border">
      <ResizablePanel defaultSize={40}>
        <div className="flex h-full items-center justify-center p-6">
          <span className="font-semibold">Top</span>
        </div>
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel defaultSize={60}>
        <div className="flex h-full items-center justify-center p-6">
          <span className="font-semibold">Bottom</span>
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  )
}`}
          >
            <ResizablePanelGroup className='min-h-[300px] max-w-md flex-col rounded-lg border'>
              <ResizablePanel defaultSize={40}>
                <div className='flex h-full items-center justify-center p-6'>
                  <span className='font-semibold'>Top</span>
                </div>
              </ResizablePanel>
              <ResizableHandle />
              <ResizablePanel defaultSize={60}>
                <div className='flex h-full items-center justify-center p-6'>
                  <span className='font-semibold'>Bottom</span>
                </div>
              </ResizablePanel>
            </ResizablePanelGroup>
          </ComponentPreview>
        </div>

        <div className='space-y-2'>
          <h3 className='text-base font-medium'>With Handle</h3>
          <ComponentPreview
            code={`'use client'

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"

export function ResizableWithHandleDemo() {
  return (
    <ResizablePanelGroup direction="horizontal" className="min-h-[200px] max-w-md rounded-lg border">
      <ResizablePanel defaultSize={50}>
        <div className="flex h-full items-center justify-center p-6">
          <span className="font-semibold">Left</span>
        </div>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={50}>
        <div className="flex h-full items-center justify-center p-6">
          <span className="font-semibold">Right</span>
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  )
}`}
          >
            <ResizablePanelGroup className='min-h-[200px] max-w-md rounded-lg border'>
              <ResizablePanel defaultSize={50}>
                <div className='flex h-full items-center justify-center p-6'>
                  <span className='font-semibold'>Left</span>
                </div>
              </ResizablePanel>
              <ResizableHandle withHandle />
              <ResizablePanel defaultSize={50}>
                <div className='flex h-full items-center justify-center p-6'>
                  <span className='font-semibold'>Right</span>
                </div>
              </ResizablePanel>
            </ResizablePanelGroup>
          </ComponentPreview>
        </div>
      </section>

      <section className='space-y-4'>
        <h2 className='text-xl font-semibold'>{t('docs.apiReference')}</h2>
        <PropsTable title='ResizablePanelGroup' data={PANEL_GROUP_PROPS} />
        <PropsTable title='ResizablePanel' data={PANEL_PROPS} />
        <PropsTable title='ResizableHandle' data={HANDLE_PROPS} />
      </section>
    </div>
  )
}
