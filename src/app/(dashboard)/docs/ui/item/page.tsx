'use client'

import { IconDotsVertical, IconMail, IconPhoto, IconUser } from '@tabler/icons-react'

import { useTranslation } from '@/lib/i18n/useTranslation'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Item, ItemActions, ItemContent, ItemDescription, ItemGroup, ItemMedia, ItemTitle } from '@/components/ui/item'
import { ComponentPreview } from '../../_components/ComponentPreview'
import { CompositionTree } from '../../_components/CompositionTree'
import { ImportBlock } from '../../_components/ImportBlock'
import { PropsTable } from '../../_components/PropsTable'

const ITEM_PROPS = [
  { prop: 'variant', type: '"default" | "outline" | "muted"', default: '"default"' },
  { prop: 'size', type: '"default" | "sm" | "xs"', default: '"default"' },
  { prop: 'render', type: 'React.ReactElement', default: '-' },
  { prop: 'className', type: 'string', default: '-' }
]

const MEDIA_PROPS = [
  { prop: 'variant', type: '"default" | "icon" | "image"', default: '"default"' },
  { prop: 'className', type: 'string', default: '-' }
]

const COMPOSITION = `ItemGroup
├── Item
│   ├── ItemMedia
│   ├── ItemContent
│   │   ├── ItemTitle
│   │   └── ItemDescription
│   ├── ItemActions
│   ├── ItemHeader
│   └── ItemFooter
└── ItemSeparator`

export default function ItemPage() {
  const { t } = useTranslation()

  return (
    <div className='space-y-10'>
      <div>
        <h1 className='text-3xl font-bold tracking-tight'>Item</h1>
        <p className='mt-2 text-muted-foreground'>{t('docs.item.desc')}</p>
        <p className='mt-1 text-xs text-muted-foreground'>
          {t('docs.source')}: <code className='rounded bg-muted px-1 py-0.5'>src/components/ui/item.tsx</code>
        </p>
      </div>

      <section className='space-y-4'>
        <h2 className='text-xl font-semibold'>{t('docs.whenToUse')}</h2>
        <p className='text-sm text-muted-foreground'>{t('docs.item.whenToUse')}</p>
      </section>

      <section className='space-y-4'>
        <h2 className='text-xl font-semibold'>{t('docs.usage')}</h2>
        <ImportBlock
          code={`import {
  Item,
  ItemMedia,
  ItemContent,
  ItemTitle,
  ItemDescription,
  ItemActions,
  ItemGroup,
  ItemSeparator,
  ItemHeader,
  ItemFooter,
} from "@/components/ui/item"`}
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
            code={`import { IconUser } from "@tabler/icons-react"
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item"

export function ItemDefault() {
  return (
    <Item variant="outline" className="max-w-md">
      <ItemMedia variant="icon">
        <IconUser className="size-4" />
      </ItemMedia>
      <ItemContent>
        <ItemTitle>John Doe</ItemTitle>
        <ItemDescription>Software Engineer</ItemDescription>
      </ItemContent>
    </Item>
  )
}`}
          >
            <Item variant='outline' className='max-w-md'>
              <ItemMedia variant='icon'>
                <IconUser className='size-4' />
              </ItemMedia>
              <ItemContent>
                <ItemTitle>John Doe</ItemTitle>
                <ItemDescription>Software Engineer</ItemDescription>
              </ItemContent>
            </Item>
          </ComponentPreview>
        </div>

        <div className='space-y-2'>
          <h3 className='text-base font-medium'>With Actions</h3>
          <ComponentPreview
            code={`import { IconDotsVertical, IconMail } from "@tabler/icons-react"
import { Button } from "@/components/ui/button"
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item"

export function ItemWithActions() {
  return (
    <Item variant="outline" className="max-w-md">
      <ItemMedia variant="icon">
        <IconMail className="size-4" />
      </ItemMedia>
      <ItemContent>
        <ItemTitle>New message</ItemTitle>
        <ItemDescription>
          You have received a new message from the team.
        </ItemDescription>
      </ItemContent>
      <ItemActions>
        <Button variant="ghost" size="icon-xs">
          <IconDotsVertical className="size-4" />
        </Button>
      </ItemActions>
    </Item>
  )
}`}
          >
            <Item variant='outline' className='max-w-md'>
              <ItemMedia variant='icon'>
                <IconMail className='size-4' />
              </ItemMedia>
              <ItemContent>
                <ItemTitle>New message</ItemTitle>
                <ItemDescription>You have received a new message from the team.</ItemDescription>
              </ItemContent>
              <ItemActions>
                <Button variant='ghost' size='icon-xs'>
                  <IconDotsVertical className='size-4' />
                </Button>
              </ItemActions>
            </Item>
          </ComponentPreview>
        </div>

        <div className='space-y-2'>
          <h3 className='text-base font-medium'>Item Group</h3>
          <ComponentPreview
            code={`import { IconMail, IconPhoto, IconUser } from "@tabler/icons-react"
import { Badge } from "@/components/ui/badge"
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemMedia,
  ItemSeparator,
  ItemTitle,
} from "@/components/ui/item"

export function ItemGroupDemo() {
  return (
    <ItemGroup className="max-w-md">
      <Item variant="outline">
        <ItemMedia variant="icon">
          <IconUser className="size-4" />
        </ItemMedia>
        <ItemContent>
          <ItemTitle>Profile updated</ItemTitle>
          <ItemDescription>Your profile has been updated.</ItemDescription>
        </ItemContent>
        <ItemActions>
          <Badge variant="secondary">New</Badge>
        </ItemActions>
      </Item>
      <Item variant="outline">
        <ItemMedia variant="icon">
          <IconMail className="size-4" />
        </ItemMedia>
        <ItemContent>
          <ItemTitle>New email</ItemTitle>
          <ItemDescription>You received a new email.</ItemDescription>
        </ItemContent>
      </Item>
      <Item variant="outline">
        <ItemMedia variant="icon">
          <IconPhoto className="size-4" />
        </ItemMedia>
        <ItemContent>
          <ItemTitle>Photo uploaded</ItemTitle>
          <ItemDescription>Your photo was uploaded successfully.</ItemDescription>
        </ItemContent>
      </Item>
    </ItemGroup>
  )
}`}
          >
            <ItemGroup className='max-w-md'>
              <Item variant='outline'>
                <ItemMedia variant='icon'>
                  <IconUser className='size-4' />
                </ItemMedia>
                <ItemContent>
                  <ItemTitle>Profile updated</ItemTitle>
                  <ItemDescription>Your profile has been updated.</ItemDescription>
                </ItemContent>
                <ItemActions>
                  <Badge variant='secondary'>New</Badge>
                </ItemActions>
              </Item>
              <Item variant='outline'>
                <ItemMedia variant='icon'>
                  <IconMail className='size-4' />
                </ItemMedia>
                <ItemContent>
                  <ItemTitle>New email</ItemTitle>
                  <ItemDescription>You received a new email.</ItemDescription>
                </ItemContent>
              </Item>
              <Item variant='outline'>
                <ItemMedia variant='icon'>
                  <IconPhoto className='size-4' />
                </ItemMedia>
                <ItemContent>
                  <ItemTitle>Photo uploaded</ItemTitle>
                  <ItemDescription>Your photo was uploaded successfully.</ItemDescription>
                </ItemContent>
              </Item>
            </ItemGroup>
          </ComponentPreview>
        </div>

        <div className='space-y-2'>
          <h3 className='text-base font-medium'>Sizes</h3>
          <ComponentPreview
            code={`import { IconUser } from "@tabler/icons-react"
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item"

export function ItemSizes() {
  return (
    <ItemGroup className="max-w-md">
      <Item variant="outline" size="default">
        <ItemMedia variant="icon">
          <IconUser className="size-4" />
        </ItemMedia>
        <ItemContent>
          <ItemTitle>Default size</ItemTitle>
          <ItemDescription>Regular padding and spacing.</ItemDescription>
        </ItemContent>
      </Item>
      <Item variant="outline" size="sm">
        <ItemMedia variant="icon">
          <IconUser className="size-4" />
        </ItemMedia>
        <ItemContent>
          <ItemTitle>Small size</ItemTitle>
          <ItemDescription>Compact padding and spacing.</ItemDescription>
        </ItemContent>
      </Item>
      <Item variant="outline" size="xs">
        <ItemMedia variant="icon">
          <IconUser className="size-4" />
        </ItemMedia>
        <ItemContent>
          <ItemTitle>Extra small</ItemTitle>
          <ItemDescription>Minimal padding.</ItemDescription>
        </ItemContent>
      </Item>
    </ItemGroup>
  )
}`}
          >
            <ItemGroup className='max-w-md'>
              <Item variant='outline' size='default'>
                <ItemMedia variant='icon'>
                  <IconUser className='size-4' />
                </ItemMedia>
                <ItemContent>
                  <ItemTitle>Default size</ItemTitle>
                  <ItemDescription>Regular padding and spacing.</ItemDescription>
                </ItemContent>
              </Item>
              <Item variant='outline' size='sm'>
                <ItemMedia variant='icon'>
                  <IconUser className='size-4' />
                </ItemMedia>
                <ItemContent>
                  <ItemTitle>Small size</ItemTitle>
                  <ItemDescription>Compact padding and spacing.</ItemDescription>
                </ItemContent>
              </Item>
              <Item variant='outline' size='xs'>
                <ItemMedia variant='icon'>
                  <IconUser className='size-4' />
                </ItemMedia>
                <ItemContent>
                  <ItemTitle>Extra small</ItemTitle>
                  <ItemDescription>Minimal padding.</ItemDescription>
                </ItemContent>
              </Item>
            </ItemGroup>
          </ComponentPreview>
        </div>
      </section>

      <section className='space-y-4'>
        <h2 className='text-xl font-semibold'>{t('docs.apiReference')}</h2>
        <PropsTable title='Item' data={ITEM_PROPS} />
        <PropsTable title='ItemMedia' data={MEDIA_PROPS} />
      </section>
    </div>
  )
}
