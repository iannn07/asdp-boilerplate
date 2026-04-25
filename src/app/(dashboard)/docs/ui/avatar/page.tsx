'use client'

import { useTranslation } from '@/lib/i18n/useTranslation'

import { Avatar, AvatarBadge, AvatarFallback, AvatarGroup, AvatarGroupCount, AvatarImage } from '@/components/ui/avatar'
import { Callout } from '../../_components/Callout'
import { ComponentPreview } from '../../_components/ComponentPreview'
import { CompositionTree } from '../../_components/CompositionTree'
import { ImportBlock } from '../../_components/ImportBlock'
import { PropsTable } from '../../_components/PropsTable'

const AVATAR_PROPS = [
  { prop: 'size', type: '"default" | "sm" | "lg"', default: '"default"' },
  { prop: 'className', type: 'string', default: '-' }
]

const AVATAR_IMAGE_PROPS = [
  { prop: 'src', type: 'string', default: '-' },
  { prop: 'alt', type: 'string', default: '-' },
  { prop: 'className', type: 'string', default: '-' }
]

const COMPOSITION = `Avatar
├── AvatarImage
├── AvatarFallback
└── AvatarBadge

AvatarGroup
├── Avatar
│   ├── AvatarImage
│   ├── AvatarFallback
│   └── AvatarBadge
└── AvatarGroupCount`

export default function AvatarPage() {
  const { t } = useTranslation()

  return (
    <div className='space-y-10'>
      <div>
        <h1 className='text-3xl font-bold tracking-tight'>Avatar</h1>
        <p className='mt-2 text-muted-foreground'>{t('docs.avatar.desc')}</p>
        <p className='mt-1 text-xs text-muted-foreground'>
          {t('docs.source')}: <code className='rounded bg-muted px-1 py-0.5'>src/components/ui/avatar.tsx</code>
        </p>
      </div>

      <Callout variant='info'>
        {t('docs.alsoAvailableAs')}{' '}
        <code className='rounded bg-muted px-1 py-0.5 text-xs'>@/components/atoms/Avatar</code> {t('docs.reexportNote')}
      </Callout>

      <section className='space-y-4'>
        <h2 className='text-xl font-semibold'>{t('docs.whenToUse')}</h2>
        <p className='text-sm text-muted-foreground'>{t('docs.avatar.whenToUse')}</p>
      </section>

      <section className='space-y-4'>
        <h2 className='text-xl font-semibold'>{t('docs.usage')}</h2>
        <ImportBlock code={`import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"`} />
      </section>

      <section className='space-y-4'>
        <h2 className='text-xl font-semibold'>{t('docs.composition')}</h2>
        <CompositionTree tree={COMPOSITION} />
      </section>

      <section className='space-y-6'>
        <h2 className='text-xl font-semibold'>{t('docs.examples')}</h2>

        <div className='space-y-2'>
          <h3 className='text-base font-medium'>Basic</h3>
          <ComponentPreview
            code={`import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function AvatarBasic() {
  return (
    <Avatar>
      <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
  )
}`}
          >
            <Avatar>
              <AvatarImage src='https://github.com/shadcn.png' alt='@shadcn' />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </ComponentPreview>
        </div>

        <div className='space-y-2'>
          <h3 className='text-base font-medium'>Sizes</h3>
          <ComponentPreview
            code={`import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function AvatarSizes() {
  return (
    <div className="flex items-center gap-3">
      <Avatar size="sm">
        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <Avatar size="lg">
        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
    </div>
  )
}`}
          >
            <div className='flex items-center gap-3'>
              <Avatar size='sm'>
                <AvatarImage src='https://github.com/shadcn.png' alt='@shadcn' />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <Avatar>
                <AvatarImage src='https://github.com/shadcn.png' alt='@shadcn' />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <Avatar size='lg'>
                <AvatarImage src='https://github.com/shadcn.png' alt='@shadcn' />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </div>
          </ComponentPreview>
        </div>

        <div className='space-y-2'>
          <h3 className='text-base font-medium'>Badge</h3>
          <p className='text-sm text-muted-foreground'>{t('docs.avatar.badgeDesc')}</p>
          <ComponentPreview
            code={`import { Avatar, AvatarBadge, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function AvatarWithBadge() {
  return (
    <Avatar>
      <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
      <AvatarFallback>CN</AvatarFallback>
      <AvatarBadge className="bg-green-600 dark:bg-green-800" />
    </Avatar>
  )
}`}
          >
            <Avatar>
              <AvatarImage src='https://github.com/shadcn.png' alt='@shadcn' />
              <AvatarFallback>CN</AvatarFallback>
              <AvatarBadge className='bg-green-600 dark:bg-green-800' />
            </Avatar>
          </ComponentPreview>
        </div>

        <div className='space-y-2'>
          <h3 className='text-base font-medium'>Avatar Group</h3>
          <ComponentPreview
            code={`import {
  Avatar,
  AvatarFallback,
  AvatarGroup,
  AvatarGroupCount,
  AvatarImage,
} from "@/components/ui/avatar"

export function AvatarGroupDemo() {
  return (
    <AvatarGroup>
      <Avatar>
        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarImage src="https://github.com/maxleiter.png" alt="@maxleiter" />
        <AvatarFallback>ML</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarImage src="https://github.com/evilrabbit.png" alt="@evilrabbit" />
        <AvatarFallback>ER</AvatarFallback>
      </Avatar>
      <AvatarGroupCount>+3</AvatarGroupCount>
    </AvatarGroup>
  )
}`}
          >
            <AvatarGroup>
              <Avatar>
                <AvatarImage src='https://github.com/shadcn.png' alt='@shadcn' />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <Avatar>
                <AvatarImage src='https://github.com/maxleiter.png' alt='@maxleiter' />
                <AvatarFallback>ML</AvatarFallback>
              </Avatar>
              <Avatar>
                <AvatarImage src='https://github.com/evilrabbit.png' alt='@evilrabbit' />
                <AvatarFallback>ER</AvatarFallback>
              </Avatar>
              <AvatarGroupCount>+3</AvatarGroupCount>
            </AvatarGroup>
          </ComponentPreview>
        </div>

        <div className='space-y-2'>
          <h3 className='text-base font-medium'>Fallback</h3>
          <p className='text-sm text-muted-foreground'>{t('docs.avatar.fallbackDesc')}</p>
          <ComponentPreview
            code={`import { Avatar, AvatarFallback } from "@/components/ui/avatar"

export function AvatarFallbackDemo() {
  return (
    <Avatar>
      <AvatarFallback>AB</AvatarFallback>
    </Avatar>
  )
}`}
          >
            <Avatar>
              <AvatarFallback>AB</AvatarFallback>
            </Avatar>
          </ComponentPreview>
        </div>
      </section>

      <section className='space-y-4'>
        <h2 className='text-xl font-semibold'>{t('docs.apiReference')}</h2>
        <PropsTable title='Avatar' data={AVATAR_PROPS} />
        <PropsTable title='AvatarImage' data={AVATAR_IMAGE_PROPS} />
        <PropsTable title='AvatarFallback' data={[{ prop: 'className', type: 'string', default: '-' }]} />
        <PropsTable title='AvatarBadge' data={[{ prop: 'className', type: 'string', default: '-' }]} />
      </section>
    </div>
  )
}
