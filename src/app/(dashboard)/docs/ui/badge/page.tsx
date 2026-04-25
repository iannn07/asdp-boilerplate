'use client'

import { useTranslation } from '@/lib/i18n/useTranslation'

import { Badge } from '@/components/ui/badge'
import { Callout } from '../../_components/Callout'
import { ComponentPreview } from '../../_components/ComponentPreview'
import { ImportBlock } from '../../_components/ImportBlock'
import { PropsTable } from '../../_components/PropsTable'

const PROPS = [
  { prop: 'variant', type: '"default" | "secondary" | "destructive" | "outline" | "ghost" | "link"', default: '"default"' },
  { prop: 'className', type: 'string', default: '-' }
]

export default function BadgePage() {
  const { t } = useTranslation()

  return (
    <div className='space-y-10'>
      <div>
        <h1 className='text-3xl font-bold tracking-tight'>Badge</h1>
        <p className='mt-2 text-muted-foreground'>
          {t('docs.badge.desc')}
        </p>
        <p className='mt-1 text-xs text-muted-foreground'>
          {t('docs.source')}: <code className='rounded bg-muted px-1 py-0.5'>src/components/ui/badge.tsx</code>
        </p>
      </div>

      <Callout variant='info'>
        {t('docs.alsoAvailableAs')} <code className='rounded bg-muted px-1 py-0.5 text-xs'>@/components/atoms/Badge</code> {t('docs.reexportNote')}
      </Callout>

      <section className='space-y-4'>
        <h2 className='text-xl font-semibold'>{t('docs.whenToUse')}</h2>
        <p className='text-sm text-muted-foreground'>
          {t('docs.badge.whenToUse')}
        </p>
      </section>

      <section className='space-y-4'>
        <h2 className='text-xl font-semibold'>{t('docs.usage')}</h2>
        <ImportBlock code={`import { Badge } from "@/components/ui/badge"`} />
      </section>

      <section className='space-y-6'>
        <h2 className='text-xl font-semibold'>{t('docs.examples')}</h2>

        <div className='space-y-2'>
          <h3 className='text-base font-medium'>Default</h3>
          <ComponentPreview
            code={`import { Badge } from "@/components/ui/badge"

export function BadgeDefault() {
  return <Badge>Badge</Badge>
}`}
          >
            <Badge>Badge</Badge>
          </ComponentPreview>
        </div>

        <div className='space-y-2'>
          <h3 className='text-base font-medium'>Secondary</h3>
          <ComponentPreview
            code={`import { Badge } from "@/components/ui/badge"

export function BadgeSecondary() {
  return <Badge variant="secondary">Secondary</Badge>
}`}
          >
            <Badge variant='secondary'>Secondary</Badge>
          </ComponentPreview>
        </div>

        <div className='space-y-2'>
          <h3 className='text-base font-medium'>Destructive</h3>
          <ComponentPreview
            code={`import { Badge } from "@/components/ui/badge"

export function BadgeDestructive() {
  return <Badge variant="destructive">Destructive</Badge>
}`}
          >
            <Badge variant='destructive'>Destructive</Badge>
          </ComponentPreview>
        </div>

        <div className='space-y-2'>
          <h3 className='text-base font-medium'>Outline</h3>
          <ComponentPreview
            code={`import { Badge } from "@/components/ui/badge"

export function BadgeOutline() {
  return <Badge variant="outline">Outline</Badge>
}`}
          >
            <Badge variant='outline'>Outline</Badge>
          </ComponentPreview>
        </div>

        <div className='space-y-2'>
          <h3 className='text-base font-medium'>All Variants</h3>
          <ComponentPreview
            code={`import { Badge } from "@/components/ui/badge"

export function BadgeAllVariants() {
  return (
    <div className="flex flex-wrap gap-2">
      <Badge>Default</Badge>
      <Badge variant="secondary">Secondary</Badge>
      <Badge variant="destructive">Destructive</Badge>
      <Badge variant="outline">Outline</Badge>
    </div>
  )
}`}
          >
            <div className='flex flex-wrap gap-2'>
              <Badge>Default</Badge>
              <Badge variant='secondary'>Secondary</Badge>
              <Badge variant='destructive'>Destructive</Badge>
              <Badge variant='outline'>Outline</Badge>
            </div>
          </ComponentPreview>
        </div>
      </section>

      <section className='space-y-4'>
        <h2 className='text-xl font-semibold'>{t('docs.apiReference')}</h2>
        <PropsTable data={PROPS} />
      </section>
    </div>
  )
}
