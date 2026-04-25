'use client'

import { useTranslation } from '@/lib/i18n/useTranslation'

import Link from 'next/link'

import { Button } from '@/components/atoms/Button'
import { Callout } from '../../_components/Callout'
import { ComponentPreview } from '../../_components/ComponentPreview'
import { ImportBlock } from '../../_components/ImportBlock'
import { PropsTable } from '../../_components/PropsTable'

const PROPS = [
  { prop: 'loading', type: 'boolean', default: 'false' },
  { prop: 'disabled', type: 'boolean', default: 'false' },
  { prop: 'variant', type: '"default" | "outline" | "secondary" | "ghost" | "destructive" | "link"', default: '"default"' },
  { prop: 'size', type: '"default" | "xs" | "sm" | "lg" | "icon" | "icon-xs" | "icon-sm" | "icon-lg"', default: '"default"' },
  { prop: 'ref', type: 'Ref<HTMLButtonElement>', default: '-' },
  { prop: 'children', type: 'ReactNode', default: '-' }
]

const COMPARISON_KEYS = [
  { feature: 'docs.buttonAtom.compLoadingSpinner', primitive: 'docs.buttonAtom.compLoadingSpinnerPrimitive', atom: 'docs.buttonAtom.compLoadingSpinnerAtom' },
  { feature: 'docs.buttonAtom.compAutoDisable', primitive: 'docs.buttonAtom.compAutoDisablePrimitive', atom: 'docs.buttonAtom.compAutoDisableAtom' },
  { feature: 'docs.buttonAtom.compRefForwarding', primitive: 'docs.buttonAtom.compRefForwardingPrimitive', atom: 'docs.buttonAtom.compRefForwardingAtom' },
  { feature: 'docs.buttonAtom.compUseIn', primitive: 'docs.buttonAtom.compUseInPrimitive', atom: 'docs.buttonAtom.compUseInAtom' }
]

export default function ButtonAtomPage() {
  const { t } = useTranslation()

  return (
    <div className='space-y-10'>
      <div>
        <h1 className='text-3xl font-bold tracking-tight'>Button (Atom)</h1>
        <p className='mt-2 text-muted-foreground'>
          {t('docs.buttonAtom.desc')}{' '}
          <Link href='/docs/ui/button' className='underline underline-offset-2'>
            Button primitive
          </Link>
        </p>
        <p className='mt-1 text-xs text-muted-foreground'>
          {t('docs.source')}: <code className='rounded bg-muted px-1 py-0.5'>src/components/atoms/Button.tsx</code>
        </p>
      </div>

      <Callout variant='recommendation'>
        <strong>{t('docs.recommendedForApp')}</strong>{' '}
        {t('docs.recommendedForAppDesc')}{' '}
        <Link href='/docs/ui/button' className='underline underline-offset-2'>
          Button primitive
        </Link>
      </Callout>

      <section className='space-y-4'>
        <h2 className='text-xl font-semibold'>{t('docs.whenToUse')}</h2>
        <p className='text-sm text-muted-foreground'>
          {t('docs.buttonAtom.whenToUse')}
        </p>
      </section>

      <section className='space-y-4'>
        <h2 className='text-xl font-semibold'>{t('docs.differenceFromPrimitive')}</h2>
        <div className='rounded-lg border'>
          <table className='w-full text-sm'>
            <thead>
              <tr className='border-b'>
                <th className='px-4 py-3 text-left font-medium'>{t('docs.feature')}</th>
                <th className='px-4 py-3 text-left font-medium text-muted-foreground'>{t('docs.primitiveCol')}</th>
                <th className='px-4 py-3 text-left font-medium'>{t('docs.atomCol')}</th>
              </tr>
            </thead>
            <tbody>
              {COMPARISON_KEYS.map(row => (
                <tr key={row.feature} className='border-b last:border-0'>
                  <td className='px-4 py-3 font-medium'>{t(row.feature)}</td>
                  <td className='px-4 py-3 text-muted-foreground'>{t(row.primitive)}</td>
                  <td className='px-4 py-3'>{t(row.atom)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className='space-y-4'>
        <h2 className='text-xl font-semibold'>{t('docs.usage')}</h2>
        <ImportBlock code={`import { Button } from "@/components/atoms/Button"`} />
      </section>

      <section className='space-y-6'>
        <h2 className='text-xl font-semibold'>{t('docs.examples')}</h2>

        <div className='space-y-2'>
          <h3 className='text-base font-medium'>Default</h3>
          <ComponentPreview
            code={`import { Button } from "@/components/atoms/Button"

export function ButtonDefault() {
  return <Button>Click me</Button>
}`}
          >
            <Button>Click me</Button>
          </ComponentPreview>
        </div>

        <div className='space-y-2'>
          <h3 className='text-base font-medium'>Loading</h3>
          <p className='text-sm text-muted-foreground'>
            {t('docs.buttonAtom.loadingDesc')}
          </p>
          <ComponentPreview
            code={`import { Button } from "@/components/atoms/Button"

export function ButtonLoading() {
  return <Button loading>Saving...</Button>
}`}
          >
            <Button loading>Saving...</Button>
          </ComponentPreview>
        </div>

        <div className='space-y-2'>
          <h3 className='text-base font-medium'>Loading with Async Handler</h3>
          <p className='text-sm text-muted-foreground'>
            {t('docs.buttonAtom.asyncDesc')}
          </p>
          <ComponentPreview
            code={`'use client'

import { useState } from 'react'

import { Button } from "@/components/atoms/Button"

export function ButtonAsync() {
  const [isLoading, setIsLoading] = useState(false)

  const handleClick = async () => {
    setIsLoading(true)
    await new Promise(resolve => setTimeout(resolve, 2000))
    setIsLoading(false)
  }

  return (
    <Button loading={isLoading} onClick={handleClick}>
      Submit
    </Button>
  )
}`}
          >
            <Button loading>Submit</Button>
          </ComponentPreview>
        </div>

        <div className='space-y-2'>
          <h3 className='text-base font-medium'>Loading Variants</h3>
          <ComponentPreview
            code={`import { Button } from "@/components/atoms/Button"

export function ButtonLoadingVariants() {
  return (
    <div className="flex gap-3">
      <Button loading>Default</Button>
      <Button loading variant="outline">Outline</Button>
      <Button loading variant="secondary">Secondary</Button>
      <Button loading variant="destructive">Destructive</Button>
    </div>
  )
}`}
          >
            <div className='flex gap-3'>
              <Button loading>Default</Button>
              <Button loading variant='outline'>Outline</Button>
              <Button loading variant='secondary'>Secondary</Button>
              <Button loading variant='destructive'>Destructive</Button>
            </div>
          </ComponentPreview>
        </div>

        <div className='space-y-2'>
          <h3 className='text-base font-medium'>Disabled</h3>
          <ComponentPreview
            code={`import { Button } from "@/components/atoms/Button"

export function ButtonDisabled() {
  return <Button disabled>Disabled</Button>
}`}
          >
            <Button disabled>Disabled</Button>
          </ComponentPreview>
        </div>
      </section>

      <section className='space-y-4'>
        <h2 className='text-xl font-semibold'>{t('docs.apiReference')}</h2>
        <p className='text-sm text-muted-foreground'>
          {t('docs.extendsAllProps')}{' '}
          <Link href='/docs/ui/button' className='underline underline-offset-2'>
            Button primitive
          </Link>
        </p>
        <PropsTable data={PROPS} />
      </section>
    </div>
  )
}
