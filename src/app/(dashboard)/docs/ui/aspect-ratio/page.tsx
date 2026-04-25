'use client'

import { useTranslation } from '@/lib/i18n/useTranslation'

import { AspectRatio } from '@/components/ui/aspect-ratio'
import { ComponentPreview } from '../../_components/ComponentPreview'
import { ImportBlock } from '../../_components/ImportBlock'
import { PropsTable } from '../../_components/PropsTable'

const PROPS = [
  { prop: 'ratio', type: 'number', default: '-' },
  { prop: 'className', type: 'string', default: '-' }
]

export default function AspectRatioPage() {
  const { t } = useTranslation()

  return (
    <div className='space-y-10'>
      <div>
        <h1 className='text-3xl font-bold tracking-tight'>Aspect Ratio</h1>
        <p className='mt-2 text-muted-foreground'>{t('docs.aspectRatio.desc')}</p>
        <p className='mt-1 text-xs text-muted-foreground'>
          {t('docs.source')}: <code className='rounded bg-muted px-1 py-0.5'>src/components/ui/aspect-ratio.tsx</code>
        </p>
      </div>

      <section className='space-y-4'>
        <h2 className='text-xl font-semibold'>{t('docs.whenToUse')}</h2>
        <p className='text-sm text-muted-foreground'>{t('docs.aspectRatio.whenToUse')}</p>
      </section>

      <section className='space-y-4'>
        <h2 className='text-xl font-semibold'>{t('docs.usage')}</h2>
        <ImportBlock code={`import { AspectRatio } from "@/components/ui/aspect-ratio"`} />
      </section>

      <section className='space-y-6'>
        <h2 className='text-xl font-semibold'>{t('docs.examples')}</h2>

        <div className='space-y-2'>
          <h3 className='text-base font-medium'>16:9 Ratio</h3>
          <ComponentPreview
            code={`import { AspectRatio } from "@/components/ui/aspect-ratio"

export function AspectRatio16x9() {
  return (
    <div className="w-[450px]">
      <AspectRatio ratio={16 / 9}>
        <div className="flex size-full items-center justify-center rounded-2xl bg-muted">
          <span className="text-sm text-muted-foreground">16:9</span>
        </div>
      </AspectRatio>
    </div>
  )
}`}
          >
            <div className='w-[450px]'>
              <AspectRatio ratio={16 / 9}>
                <div className='flex size-full items-center justify-center rounded-2xl bg-muted'>
                  <span className='text-sm text-muted-foreground'>16:9</span>
                </div>
              </AspectRatio>
            </div>
          </ComponentPreview>
        </div>

        <div className='space-y-2'>
          <h3 className='text-base font-medium'>4:3 Ratio</h3>
          <ComponentPreview
            code={`import { AspectRatio } from "@/components/ui/aspect-ratio"

export function AspectRatio4x3() {
  return (
    <div className="w-[300px]">
      <AspectRatio ratio={4 / 3}>
        <div className="flex size-full items-center justify-center rounded-2xl bg-muted">
          <span className="text-sm text-muted-foreground">4:3</span>
        </div>
      </AspectRatio>
    </div>
  )
}`}
          >
            <div className='w-[300px]'>
              <AspectRatio ratio={4 / 3}>
                <div className='flex size-full items-center justify-center rounded-2xl bg-muted'>
                  <span className='text-sm text-muted-foreground'>4:3</span>
                </div>
              </AspectRatio>
            </div>
          </ComponentPreview>
        </div>

        <div className='space-y-2'>
          <h3 className='text-base font-medium'>1:1 Square</h3>
          <ComponentPreview
            code={`import { AspectRatio } from "@/components/ui/aspect-ratio"

export function AspectRatioSquare() {
  return (
    <div className="w-[200px]">
      <AspectRatio ratio={1}>
        <div className="flex size-full items-center justify-center rounded-2xl bg-muted">
          <span className="text-sm text-muted-foreground">1:1</span>
        </div>
      </AspectRatio>
    </div>
  )
}`}
          >
            <div className='w-[200px]'>
              <AspectRatio ratio={1}>
                <div className='flex size-full items-center justify-center rounded-2xl bg-muted'>
                  <span className='text-sm text-muted-foreground'>1:1</span>
                </div>
              </AspectRatio>
            </div>
          </ComponentPreview>
        </div>

        <div className='space-y-2'>
          <h3 className='text-base font-medium'>With Image</h3>
          <ComponentPreview
            code={`import { AspectRatio } from "@/components/ui/aspect-ratio"

export function AspectRatioImage() {
  return (
    <div className="w-[450px] overflow-hidden rounded-2xl">
      <AspectRatio ratio={16 / 9}>
        <img
          src="https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800&dpr=2&q=80"
          alt="Photo by Drew Beamer"
          className="size-full object-cover"
        />
      </AspectRatio>
    </div>
  )
}`}
          >
            <div className='w-[450px] overflow-hidden rounded-2xl'>
              <AspectRatio ratio={16 / 9}>
                <div className='flex size-full items-center justify-center bg-gradient-to-br from-muted to-muted-foreground/20'>
                  <span className='text-sm text-muted-foreground'>Image placeholder</span>
                </div>
              </AspectRatio>
            </div>
          </ComponentPreview>
        </div>
      </section>

      <section className='space-y-4'>
        <h2 className='text-xl font-semibold'>{t('docs.apiReference')}</h2>
        <PropsTable title='AspectRatio' data={PROPS} />
      </section>
    </div>
  )
}
