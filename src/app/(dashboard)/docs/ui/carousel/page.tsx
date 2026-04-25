'use client'

import { useTranslation } from '@/lib/i18n/useTranslation'

import { Card, CardContent } from '@/components/ui/card'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel'
import { ComponentPreview } from '../../_components/ComponentPreview'
import { CompositionTree } from '../../_components/CompositionTree'
import { ImportBlock } from '../../_components/ImportBlock'
import { PropsTable } from '../../_components/PropsTable'

const CAROUSEL_PROPS = [
  { prop: 'orientation', type: '"horizontal" | "vertical"', default: '"horizontal"' },
  { prop: 'opts', type: 'EmblaCarouselOptions', default: '-' },
  { prop: 'plugins', type: 'EmblaCarouselPlugin', default: '-' },
  { prop: 'setApi', type: '(api: CarouselApi) => void', default: '-' },
  { prop: 'className', type: 'string', default: '-' }
]

const BUTTON_PROPS = [
  { prop: 'variant', type: 'ButtonVariant', default: '"outline"' },
  { prop: 'size', type: 'ButtonSize', default: '"icon-sm"' },
  { prop: 'className', type: 'string', default: '-' }
]

const COMPOSITION = `Carousel
├── CarouselContent
│   └── CarouselItem
├── CarouselPrevious
└── CarouselNext`

export default function CarouselPage() {
  const { t } = useTranslation()

  return (
    <div className='space-y-10'>
      <div>
        <h1 className='text-3xl font-bold tracking-tight'>Carousel</h1>
        <p className='mt-2 text-muted-foreground'>{t('docs.carousel.desc')}</p>
        <p className='mt-1 text-xs text-muted-foreground'>
          {t('docs.source')}: <code className='rounded bg-muted px-1 py-0.5'>src/components/ui/carousel.tsx</code>
        </p>
      </div>

      <section className='space-y-4'>
        <h2 className='text-xl font-semibold'>{t('docs.whenToUse')}</h2>
        <p className='text-sm text-muted-foreground'>{t('docs.carousel.whenToUse')}</p>
      </section>

      <section className='space-y-4'>
        <h2 className='text-xl font-semibold'>{t('docs.usage')}</h2>
        <ImportBlock
          code={`import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel"`}
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
            code={`import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

export function CarouselDemo() {
  return (
    <Carousel className="w-full max-w-xs">
      <CarouselContent>
        {Array.from({ length: 5 }).map((_, index) => (
          <CarouselItem key={index}>
            <Card>
              <CardContent className="flex aspect-square items-center justify-center p-6">
                <span className="text-4xl font-semibold">{index + 1}</span>
              </CardContent>
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  )
}`}
          >
            <Carousel className='w-full max-w-xs'>
              <CarouselContent>
                {Array.from({ length: 5 }).map((_, index) => (
                  <CarouselItem key={index}>
                    <Card>
                      <CardContent className='flex aspect-square items-center justify-center p-6'>
                        <span className='text-4xl font-semibold'>{index + 1}</span>
                      </CardContent>
                    </Card>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </ComponentPreview>
        </div>

        <div className='space-y-2'>
          <h3 className='text-base font-medium'>Basis Third</h3>
          <p className='text-sm text-muted-foreground'>
            Use <code className='rounded bg-muted px-1 py-0.5 text-xs'>basis-1/3</code> on each item to show multiple
            slides.
          </p>
          <ComponentPreview
            code={`import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

export function CarouselThird() {
  return (
    <Carousel className="w-full max-w-sm">
      <CarouselContent className="-ml-1">
        {Array.from({ length: 5 }).map((_, index) => (
          <CarouselItem key={index} className="pl-1 basis-1/3">
            <Card>
              <CardContent className="flex aspect-square items-center justify-center p-6">
                <span className="text-2xl font-semibold">{index + 1}</span>
              </CardContent>
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  )
}`}
          >
            <Carousel className='w-full max-w-sm'>
              <CarouselContent className='-ml-1'>
                {Array.from({ length: 5 }).map((_, index) => (
                  <CarouselItem key={index} className='basis-1/3 pl-1'>
                    <Card>
                      <CardContent className='flex aspect-square items-center justify-center p-6'>
                        <span className='text-2xl font-semibold'>{index + 1}</span>
                      </CardContent>
                    </Card>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </ComponentPreview>
        </div>

        <div className='space-y-2'>
          <h3 className='text-base font-medium'>Vertical</h3>
          <ComponentPreview
            code={`import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

export function CarouselVertical() {
  return (
    <Carousel orientation="vertical" className="w-full max-w-xs">
      <CarouselContent className="-mt-1 h-[200px]">
        {Array.from({ length: 5 }).map((_, index) => (
          <CarouselItem key={index} className="pt-1 basis-1/2">
            <Card>
              <CardContent className="flex items-center justify-center p-6">
                <span className="text-3xl font-semibold">{index + 1}</span>
              </CardContent>
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  )
}`}
          >
            <Carousel orientation='vertical' className='w-full max-w-xs'>
              <CarouselContent className='-mt-1 h-[200px]'>
                {Array.from({ length: 5 }).map((_, index) => (
                  <CarouselItem key={index} className='basis-1/2 pt-1'>
                    <Card>
                      <CardContent className='flex items-center justify-center p-6'>
                        <span className='text-3xl font-semibold'>{index + 1}</span>
                      </CardContent>
                    </Card>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </ComponentPreview>
        </div>
      </section>

      <section className='space-y-4'>
        <h2 className='text-xl font-semibold'>{t('docs.apiReference')}</h2>
        <PropsTable title='Carousel' data={CAROUSEL_PROPS} />
        <PropsTable title='CarouselPrevious / CarouselNext' data={BUTTON_PROPS} />
      </section>
    </div>
  )
}
