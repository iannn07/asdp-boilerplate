'use client'

import { useTranslation } from '@/lib/i18n/useTranslation'

import Link from 'next/link'

import { IconGitBranch } from '@tabler/icons-react'

import { Button } from '@/components/ui/button'
import { Callout } from '../../_components/Callout'
import { ComponentPreview } from '../../_components/ComponentPreview'
import { ImportBlock } from '../../_components/ImportBlock'
import { PropsTable } from '../../_components/PropsTable'

const PROPS = [
  { prop: 'variant', type: '"default" | "outline" | "secondary" | "ghost" | "destructive" | "link"', default: '"default"' },
  { prop: 'size', type: '"default" | "xs" | "sm" | "lg" | "icon" | "icon-xs" | "icon-sm" | "icon-lg"', default: '"default"' },
  { prop: 'className', type: 'string', default: '-' }
]

export default function ButtonPage() {
  const { t } = useTranslation()

  return (
    <div className='space-y-10'>
      <div>
        <h1 className='text-3xl font-bold tracking-tight'>Button</h1>
        <p className='mt-2 text-muted-foreground'>
          {t('docs.button.desc')}
        </p>
        <p className='mt-1 text-xs text-muted-foreground'>
          {t('docs.source')}: <code className='rounded bg-muted px-1 py-0.5'>src/components/ui/button.tsx</code>
        </p>
      </div>

      <Callout variant='recommendation'>
        <strong>{t('docs.designSystemPrimitive')}</strong>{' '}
        {t('docs.designSystemPrimitiveDesc')}{' '}
        <Link href='/docs/ui/button-atom' className='underline underline-offset-2'>
          Button Atom
        </Link>
      </Callout>

      <section className='space-y-4'>
        <h2 className='text-xl font-semibold'>{t('docs.whenToUse')}</h2>
        <p className='text-sm text-muted-foreground'>
          {t('docs.button.whenToUse')}
        </p>
      </section>

      <section className='space-y-4'>
        <h2 className='text-xl font-semibold'>{t('docs.usage')}</h2>
        <ImportBlock code={`import { Button } from "@/components/ui/button"`} />
      </section>

      <section className='space-y-6'>
        <h2 className='text-xl font-semibold'>{t('docs.examples')}</h2>

        <div className='space-y-2'>
          <h3 className='text-base font-medium'>Default</h3>
          <ComponentPreview
            code={`import { Button } from "@/components/ui/button"

export function ButtonDefault() {
  return <Button>Button</Button>
}`}
          >
            <Button>Button</Button>
          </ComponentPreview>
        </div>

        <div className='space-y-2'>
          <h3 className='text-base font-medium'>Outline</h3>
          <ComponentPreview
            code={`import { Button } from "@/components/ui/button"

export function ButtonOutline() {
  return <Button variant="outline">Outline</Button>
}`}
          >
            <Button variant='outline'>Outline</Button>
          </ComponentPreview>
        </div>

        <div className='space-y-2'>
          <h3 className='text-base font-medium'>Secondary</h3>
          <ComponentPreview
            code={`import { Button } from "@/components/ui/button"

export function ButtonSecondary() {
  return <Button variant="secondary">Secondary</Button>
}`}
          >
            <Button variant='secondary'>Secondary</Button>
          </ComponentPreview>
        </div>

        <div className='space-y-2'>
          <h3 className='text-base font-medium'>Ghost</h3>
          <ComponentPreview
            code={`import { Button } from "@/components/ui/button"

export function ButtonGhost() {
  return <Button variant="ghost">Ghost</Button>
}`}
          >
            <Button variant='ghost'>Ghost</Button>
          </ComponentPreview>
        </div>

        <div className='space-y-2'>
          <h3 className='text-base font-medium'>Destructive</h3>
          <ComponentPreview
            code={`import { Button } from "@/components/ui/button"

export function ButtonDestructive() {
  return <Button variant="destructive">Destructive</Button>
}`}
          >
            <Button variant='destructive'>Destructive</Button>
          </ComponentPreview>
        </div>

        <div className='space-y-2'>
          <h3 className='text-base font-medium'>Link</h3>
          <ComponentPreview
            code={`import { Button } from "@/components/ui/button"

export function ButtonLink() {
  return <Button variant="link">Link</Button>
}`}
          >
            <Button variant='link'>Link</Button>
          </ComponentPreview>
        </div>

        <div className='space-y-2'>
          <h3 className='text-base font-medium'>Sizes</h3>
          <p className='text-sm text-muted-foreground'>
            {t('docs.useSizeProp')}
          </p>
          <ComponentPreview
            code={`import { Button } from "@/components/ui/button"

export function ButtonSizes() {
  return (
    <div className="flex items-center gap-3">
      <Button size="xs">Extra Small</Button>
      <Button size="sm">Small</Button>
      <Button>Default</Button>
      <Button size="lg">Large</Button>
    </div>
  )
}`}
          >
            <div className='flex items-center gap-3'>
              <Button size='xs'>Extra Small</Button>
              <Button size='sm'>Small</Button>
              <Button>Default</Button>
              <Button size='lg'>Large</Button>
            </div>
          </ComponentPreview>
        </div>

        <div className='space-y-2'>
          <h3 className='text-base font-medium'>Icon</h3>
          <ComponentPreview
            code={`import { IconGitBranch } from "@tabler/icons-react"

import { Button } from "@/components/ui/button"

export function ButtonIcon() {
  return (
    <Button variant="outline" size="icon" aria-label="Branch">
      <IconGitBranch />
    </Button>
  )
}`}
          >
            <Button variant='outline' size='icon' aria-label='Branch'>
              <IconGitBranch />
            </Button>
          </ComponentPreview>
        </div>

        <div className='space-y-2'>
          <h3 className='text-base font-medium'>With Icon</h3>
          <ComponentPreview
            code={`import { IconGitBranch } from "@tabler/icons-react"

import { Button } from "@/components/ui/button"

export function ButtonWithIcon() {
  return (
    <Button variant="outline" size="sm">
      <IconGitBranch /> New Branch
    </Button>
  )
}`}
          >
            <Button variant='outline' size='sm'>
              <IconGitBranch /> New Branch
            </Button>
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
