'use client'

import * as React from 'react'

import { useTranslation } from '@/lib/i18n/useTranslation'

import {
  ContextMenu,
  ContextMenuCheckboxItem,
  ContextMenuContent,
  ContextMenuGroup,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger
} from '@/components/ui/context-menu'
import { ComponentPreview } from '../../_components/ComponentPreview'
import { CompositionTree } from '../../_components/CompositionTree'
import { ImportBlock } from '../../_components/ImportBlock'
import { PropsTable } from '../../_components/PropsTable'

const CONTENT_PROPS = [
  { prop: 'align', type: '"start" | "center" | "end"', default: '"start"' },
  { prop: 'alignOffset', type: 'number', default: '4' },
  { prop: 'side', type: '"top" | "right" | "bottom" | "left"', default: '"right"' },
  { prop: 'sideOffset', type: 'number', default: '0' },
  { prop: 'className', type: 'string', default: '-' }
]

const ITEM_PROPS = [
  { prop: 'inset', type: 'boolean', default: 'false' },
  { prop: 'variant', type: '"default" | "destructive"', default: '"default"' },
  { prop: 'className', type: 'string', default: '-' }
]

const LABEL_PROPS = [
  { prop: 'inset', type: 'boolean', default: 'false' },
  { prop: 'className', type: 'string', default: '-' }
]

const COMPOSITION = `ContextMenu
├── ContextMenuTrigger
└── ContextMenuContent
    ├── ContextMenuLabel
    ├── ContextMenuGroup
    │   └── ContextMenuItem
    │       └── ContextMenuShortcut
    ├── ContextMenuSeparator
    ├── ContextMenuCheckboxItem
    ├── ContextMenuRadioGroup
    │   └── ContextMenuRadioItem
    └── ContextMenuSub
        ├── ContextMenuSubTrigger
        └── ContextMenuSubContent`

export default function ContextMenuPage() {
  const { t } = useTranslation()
  const [showBookmarks, setShowBookmarks] = React.useState(true)
  const [showFullUrls, setShowFullUrls] = React.useState(false)

  return (
    <div className='space-y-10'>
      <div>
        <h1 className='text-3xl font-bold tracking-tight'>Context Menu</h1>
        <p className='mt-2 text-muted-foreground'>{t('docs.contextMenu.desc')}</p>
        <p className='mt-1 text-xs text-muted-foreground'>
          {t('docs.source')}: <code className='rounded bg-muted px-1 py-0.5'>src/components/ui/context-menu.tsx</code>
        </p>
      </div>

      <section className='space-y-4'>
        <h2 className='text-xl font-semibold'>{t('docs.whenToUse')}</h2>
        <p className='text-sm text-muted-foreground'>{t('docs.contextMenu.whenToUse')}</p>
      </section>

      <section className='space-y-4'>
        <h2 className='text-xl font-semibold'>{t('docs.usage')}</h2>
        <ImportBlock
          code={`import {
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuGroup,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuCheckboxItem,
  ContextMenuRadioGroup,
  ContextMenuRadioItem,
  ContextMenuSub,
  ContextMenuSubTrigger,
  ContextMenuSubContent,
} from "@/components/ui/context-menu"`}
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
  ContextMenu,
  ContextMenuContent,
  ContextMenuGroup,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuTrigger,
} from "@/components/ui/context-menu"

export function ContextMenuDemo() {
  return (
    <ContextMenu>
      <ContextMenuTrigger className="flex h-36 w-64 items-center justify-center rounded-3xl border border-dashed text-sm">
        Right click here
      </ContextMenuTrigger>
      <ContextMenuContent className="w-56">
        <ContextMenuLabel>Actions</ContextMenuLabel>
        <ContextMenuSeparator />
        <ContextMenuGroup>
          <ContextMenuItem>
            Back
            <ContextMenuShortcut>\u2318[</ContextMenuShortcut>
          </ContextMenuItem>
          <ContextMenuItem>
            Forward
            <ContextMenuShortcut>\u2318]</ContextMenuShortcut>
          </ContextMenuItem>
          <ContextMenuItem>
            Reload
            <ContextMenuShortcut>\u2318R</ContextMenuShortcut>
          </ContextMenuItem>
        </ContextMenuGroup>
        <ContextMenuSeparator />
        <ContextMenuItem variant="destructive">
          Delete
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  )
}`}
          >
            <ContextMenu>
              <ContextMenuTrigger className='flex h-36 w-64 items-center justify-center rounded-3xl border border-dashed text-sm'>
                Right click here
              </ContextMenuTrigger>
              <ContextMenuContent className='w-56'>
                <ContextMenuLabel>Actions</ContextMenuLabel>
                <ContextMenuSeparator />
                <ContextMenuGroup>
                  <ContextMenuItem>
                    Back
                    <ContextMenuShortcut>⌘[</ContextMenuShortcut>
                  </ContextMenuItem>
                  <ContextMenuItem>
                    Forward
                    <ContextMenuShortcut>⌘]</ContextMenuShortcut>
                  </ContextMenuItem>
                  <ContextMenuItem>
                    Reload
                    <ContextMenuShortcut>⌘R</ContextMenuShortcut>
                  </ContextMenuItem>
                </ContextMenuGroup>
                <ContextMenuSeparator />
                <ContextMenuItem variant='destructive'>Delete</ContextMenuItem>
              </ContextMenuContent>
            </ContextMenu>
          </ComponentPreview>
        </div>

        <div className='space-y-2'>
          <h3 className='text-base font-medium'>With Checkbox Items</h3>
          <ComponentPreview
            code={`'use client'

import * as React from "react"
import {
  ContextMenu,
  ContextMenuCheckboxItem,
  ContextMenuContent,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from "@/components/ui/context-menu"

export function ContextMenuCheckbox() {
  const [showBookmarks, setShowBookmarks] = React.useState(true)
  const [showFullUrls, setShowFullUrls] = React.useState(false)

  return (
    <ContextMenu>
      <ContextMenuTrigger className="flex h-36 w-64 items-center justify-center rounded-3xl border border-dashed text-sm">
        Right click here
      </ContextMenuTrigger>
      <ContextMenuContent className="w-56">
        <ContextMenuCheckboxItem
          checked={showBookmarks}
          onCheckedChange={setShowBookmarks}
        >
          Show Bookmarks
        </ContextMenuCheckboxItem>
        <ContextMenuCheckboxItem
          checked={showFullUrls}
          onCheckedChange={setShowFullUrls}
        >
          Show Full URLs
        </ContextMenuCheckboxItem>
      </ContextMenuContent>
    </ContextMenu>
  )
}`}
          >
            <ContextMenu>
              <ContextMenuTrigger className='flex h-36 w-64 items-center justify-center rounded-3xl border border-dashed text-sm'>
                Right click here
              </ContextMenuTrigger>
              <ContextMenuContent className='w-56'>
                <ContextMenuCheckboxItem checked={showBookmarks} onCheckedChange={setShowBookmarks}>
                  Show Bookmarks
                </ContextMenuCheckboxItem>
                <ContextMenuCheckboxItem checked={showFullUrls} onCheckedChange={setShowFullUrls}>
                  Show Full URLs
                </ContextMenuCheckboxItem>
              </ContextMenuContent>
            </ContextMenu>
          </ComponentPreview>
        </div>

        <div className='space-y-2'>
          <h3 className='text-base font-medium'>With Submenu</h3>
          <ComponentPreview
            code={`'use client'

import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from "@/components/ui/context-menu"

export function ContextMenuWithSub() {
  return (
    <ContextMenu>
      <ContextMenuTrigger className="flex h-36 w-64 items-center justify-center rounded-3xl border border-dashed text-sm">
        Right click here
      </ContextMenuTrigger>
      <ContextMenuContent className="w-56">
        <ContextMenuItem>New Tab</ContextMenuItem>
        <ContextMenuItem>New Window</ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuSub>
          <ContextMenuSubTrigger>Share</ContextMenuSubTrigger>
          <ContextMenuSubContent>
            <ContextMenuItem>Email</ContextMenuItem>
            <ContextMenuItem>Messages</ContextMenuItem>
            <ContextMenuItem>Notes</ContextMenuItem>
          </ContextMenuSubContent>
        </ContextMenuSub>
      </ContextMenuContent>
    </ContextMenu>
  )
}`}
          >
            <ContextMenu>
              <ContextMenuTrigger className='flex h-36 w-64 items-center justify-center rounded-3xl border border-dashed text-sm'>
                Right click here
              </ContextMenuTrigger>
              <ContextMenuContent className='w-56'>
                <ContextMenuItem>New Tab</ContextMenuItem>
                <ContextMenuItem>New Window</ContextMenuItem>
                <ContextMenuSeparator />
                <ContextMenuSub>
                  <ContextMenuSubTrigger>Share</ContextMenuSubTrigger>
                  <ContextMenuSubContent>
                    <ContextMenuItem>Email</ContextMenuItem>
                    <ContextMenuItem>Messages</ContextMenuItem>
                    <ContextMenuItem>Notes</ContextMenuItem>
                  </ContextMenuSubContent>
                </ContextMenuSub>
              </ContextMenuContent>
            </ContextMenu>
          </ComponentPreview>
        </div>
      </section>

      <section className='space-y-4'>
        <h2 className='text-xl font-semibold'>{t('docs.apiReference')}</h2>
        <PropsTable title='ContextMenuContent' data={CONTENT_PROPS} />
        <PropsTable title='ContextMenuItem' data={ITEM_PROPS} />
        <PropsTable title='ContextMenuLabel' data={LABEL_PROPS} />
      </section>
    </div>
  )
}
