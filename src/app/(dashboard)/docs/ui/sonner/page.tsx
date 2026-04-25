'use client'

import { toast } from 'sonner'

import { useTranslation } from '@/lib/i18n/useTranslation'

import { Button } from '@/components/ui/button'
import { ComponentPreview } from '../../_components/ComponentPreview'
import { ImportBlock } from '../../_components/ImportBlock'
import { PropsTable } from '../../_components/PropsTable'

const TOASTER_PROPS = [
  { prop: 'theme', type: '"light" | "dark" | "system"', default: '"system"' },
  { prop: 'position', type: 'string', default: '"bottom-right"' },
  { prop: 'richColors', type: 'boolean', default: 'false' },
  { prop: 'className', type: 'string', default: '-' }
]

export default function SonnerPage() {
  const { t } = useTranslation()

  return (
    <div className='space-y-10'>
      <div>
        <h1 className='text-3xl font-bold tracking-tight'>Sonner</h1>
        <p className='mt-2 text-muted-foreground'>{t('docs.sonner.desc')}</p>
        <p className='mt-1 text-xs text-muted-foreground'>
          {t('docs.source')}: <code className='rounded bg-muted px-1 py-0.5'>src/components/ui/sonner.tsx</code>
        </p>
      </div>

      <section className='space-y-4'>
        <h2 className='text-xl font-semibold'>{t('docs.whenToUse')}</h2>
        <p className='text-sm text-muted-foreground'>{t('docs.sonner.whenToUse')}</p>
      </section>

      <section className='space-y-4'>
        <h2 className='text-xl font-semibold'>{t('docs.usage')}</h2>
        <ImportBlock
          code={`import { Toaster } from "@/components/ui/sonner"
import { toast } from "sonner"`}
        />
      </section>

      <section className='space-y-6'>
        <h2 className='text-xl font-semibold'>{t('docs.examples')}</h2>

        <div className='space-y-2'>
          <h3 className='text-base font-medium'>Default</h3>
          <ComponentPreview
            code={`'use client'

import { toast } from "sonner"
import { Button } from "@/components/ui/button"

export function SonnerDemo() {
  return (
    <Button
      variant="outline"
      onClick={() => toast("Event has been created.")}
    >
      Show Toast
    </Button>
  )
}`}
          >
            <Button variant='outline' onClick={() => toast('Event has been created.')}>
              Show Toast
            </Button>
          </ComponentPreview>
        </div>

        <div className='space-y-2'>
          <h3 className='text-base font-medium'>Success</h3>
          <ComponentPreview
            code={`'use client'

import { toast } from "sonner"
import { Button } from "@/components/ui/button"

export function SonnerSuccess() {
  return (
    <Button
      variant="outline"
      onClick={() => toast.success("Profile updated successfully.")}
    >
      Show Success
    </Button>
  )
}`}
          >
            <Button variant='outline' onClick={() => toast.success('Profile updated successfully.')}>
              Show Success
            </Button>
          </ComponentPreview>
        </div>

        <div className='space-y-2'>
          <h3 className='text-base font-medium'>Error</h3>
          <ComponentPreview
            code={`'use client'

import { toast } from "sonner"
import { Button } from "@/components/ui/button"

export function SonnerError() {
  return (
    <Button
      variant="outline"
      onClick={() => toast.error("Something went wrong.")}
    >
      Show Error
    </Button>
  )
}`}
          >
            <Button variant='outline' onClick={() => toast.error('Something went wrong.')}>
              Show Error
            </Button>
          </ComponentPreview>
        </div>

        <div className='space-y-2'>
          <h3 className='text-base font-medium'>With Description</h3>
          <ComponentPreview
            code={`'use client'

import { toast } from "sonner"
import { Button } from "@/components/ui/button"

export function SonnerWithDescription() {
  return (
    <Button
      variant="outline"
      onClick={() =>
        toast("Event has been created", {
          description: "Sunday, December 03, 2023 at 9:00 AM",
        })
      }
    >
      With Description
    </Button>
  )
}`}
          >
            <Button
              variant='outline'
              onClick={() =>
                toast('Event has been created', {
                  description: 'Sunday, December 03, 2023 at 9:00 AM'
                })
              }
            >
              With Description
            </Button>
          </ComponentPreview>
        </div>
      </section>

      <section className='space-y-4'>
        <h2 className='text-xl font-semibold'>{t('docs.apiReference')}</h2>
        <PropsTable title='Toaster' data={TOASTER_PROPS} />
      </section>
    </div>
  )
}
