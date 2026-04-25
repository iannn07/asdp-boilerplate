'use client'

import { useTranslation } from '@/lib/i18n/useTranslation'

import { Skeleton } from '@/components/atoms/Skeleton'
import { ComponentPreview } from '../../_components/ComponentPreview'
import { ImportBlock } from '../../_components/ImportBlock'
import { PropsTable } from '../../_components/PropsTable'

const PROPS = [{ prop: 'className', type: 'string', default: '-' }]

export default function SkeletonPage() {
  const { t } = useTranslation()

  return (
    <div className='space-y-10'>
      <div>
        <h1 className='text-3xl font-bold tracking-tight'>Skeleton</h1>
        <p className='mt-2 text-muted-foreground'>{t('docs.skeleton.desc')}</p>
        <p className='mt-1 text-xs text-muted-foreground'>
          {t('docs.source')}: <code className='rounded bg-muted px-1 py-0.5'>src/components/atoms/Skeleton.tsx</code>
        </p>
      </div>

      <section className='space-y-3'>
        <h2 className='text-xl font-semibold'>{t('docs.whenToUse')}</h2>
        <p className='text-sm text-muted-foreground'>{t('docs.skeleton.whenToUse')}</p>
      </section>

      <section className='space-y-4'>
        <h2 className='text-xl font-semibold'>{t('docs.usage')}</h2>
        <ImportBlock code={`import { Skeleton } from "@/components/atoms/Skeleton"`} />
      </section>

      <section className='space-y-6'>
        <h2 className='text-xl font-semibold'>{t('docs.examples')}</h2>

        <div className='space-y-2'>
          <h3 className='text-base font-medium'>Default</h3>
          <ComponentPreview
            code={`import { Skeleton } from "@/components/atoms/Skeleton"

export function SkeletonDefault() {
  return (
    <div className="space-y-3">
      <Skeleton className="h-4 w-[250px]" />
      <Skeleton className="h-4 w-[200px]" />
      <Skeleton className="h-4 w-[150px]" />
    </div>
  )
}`}
          >
            <div className='space-y-3'>
              <Skeleton className='h-4 w-[250px]' />
              <Skeleton className='h-4 w-[200px]' />
              <Skeleton className='h-4 w-[150px]' />
            </div>
          </ComponentPreview>
        </div>

        <div className='space-y-2'>
          <h3 className='text-base font-medium'>Card Skeleton</h3>
          <p className='text-sm text-muted-foreground'>{t('docs.skeleton.cardSkeletonDesc')}</p>
          <ComponentPreview
            code={`import { Skeleton } from "@/components/atoms/Skeleton"

export function CardSkeleton() {
  return (
    <div className="flex items-center gap-4">
      <Skeleton className="size-12 rounded-full" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[200px]" />
        <Skeleton className="h-4 w-[160px]" />
      </div>
    </div>
  )
}`}
          >
            <div className='flex items-center gap-4'>
              <Skeleton className='size-12 rounded-full' />
              <div className='space-y-2'>
                <Skeleton className='h-4 w-[200px]' />
                <Skeleton className='h-4 w-[160px]' />
              </div>
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
