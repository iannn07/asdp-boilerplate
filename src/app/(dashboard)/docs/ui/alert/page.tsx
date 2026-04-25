'use client'

import { IconAlertTriangle, IconInfoCircle, IconX } from '@tabler/icons-react'

import { useTranslation } from '@/lib/i18n/useTranslation'

import { Alert, AlertAction, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { ComponentPreview } from '../../_components/ComponentPreview'
import { CompositionTree } from '../../_components/CompositionTree'
import { ImportBlock } from '../../_components/ImportBlock'
import { PropsTable } from '../../_components/PropsTable'

const PROPS = [
  { prop: 'variant', type: '"default" | "destructive"', default: '"default"' },
  { prop: 'className', type: 'string', default: '-' }
]

const COMPOSITION = `Alert
├── <svg> (optional icon)
├── AlertTitle
├── AlertDescription
└── AlertAction`

export default function AlertPage() {
  const { t } = useTranslation()

  return (
    <div className='space-y-10'>
      <div>
        <h1 className='text-3xl font-bold tracking-tight'>Alert</h1>
        <p className='mt-2 text-muted-foreground'>{t('docs.alert.desc')}</p>
        <p className='mt-1 text-xs text-muted-foreground'>
          {t('docs.source')}: <code className='rounded bg-muted px-1 py-0.5'>src/components/ui/alert.tsx</code>
        </p>
      </div>

      <section className='space-y-4'>
        <h2 className='text-xl font-semibold'>{t('docs.whenToUse')}</h2>
        <p className='text-sm text-muted-foreground'>{t('docs.alert.whenToUse')}</p>
      </section>

      <section className='space-y-4'>
        <h2 className='text-xl font-semibold'>{t('docs.usage')}</h2>
        <ImportBlock
          code={`import {
  Alert,
  AlertTitle,
  AlertDescription,
  AlertAction,
} from "@/components/ui/alert"`}
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
            code={`import { IconInfoCircle } from "@tabler/icons-react"
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"

export function AlertDefault() {
  return (
    <Alert>
      <IconInfoCircle className="size-4" />
      <AlertTitle>Heads up!</AlertTitle>
      <AlertDescription>
        You can add components to your app using the CLI.
      </AlertDescription>
    </Alert>
  )
}`}
          >
            <Alert>
              <IconInfoCircle className='size-4' />
              <AlertTitle>Heads up!</AlertTitle>
              <AlertDescription>You can add components to your app using the CLI.</AlertDescription>
            </Alert>
          </ComponentPreview>
        </div>

        <div className='space-y-2'>
          <h3 className='text-base font-medium'>Destructive</h3>
          <ComponentPreview
            code={`import { IconAlertTriangle } from "@tabler/icons-react"
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"

export function AlertDestructive() {
  return (
    <Alert variant="destructive">
      <IconAlertTriangle className="size-4" />
      <AlertTitle>Error</AlertTitle>
      <AlertDescription>
        Your session has expired. Please log in again.
      </AlertDescription>
    </Alert>
  )
}`}
          >
            <Alert variant='destructive'>
              <IconAlertTriangle className='size-4' />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>Your session has expired. Please log in again.</AlertDescription>
            </Alert>
          </ComponentPreview>
        </div>

        <div className='space-y-2'>
          <h3 className='text-base font-medium'>With Action</h3>
          <ComponentPreview
            code={`import { IconInfoCircle, IconX } from "@tabler/icons-react"
import {
  Alert,
  AlertAction,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"
import { Button } from "@/components/ui/button"

export function AlertWithAction() {
  return (
    <Alert>
      <IconInfoCircle className="size-4" />
      <AlertTitle>Update available</AlertTitle>
      <AlertDescription>
        A new version of the application is available.
      </AlertDescription>
      <AlertAction>
        <Button variant="ghost" size="icon-xs">
          <IconX className="size-4" />
        </Button>
      </AlertAction>
    </Alert>
  )
}`}
          >
            <Alert>
              <IconInfoCircle className='size-4' />
              <AlertTitle>Update available</AlertTitle>
              <AlertDescription>A new version of the application is available.</AlertDescription>
              <AlertAction>
                <Button variant='ghost' size='icon-xs'>
                  <IconX className='size-4' />
                </Button>
              </AlertAction>
            </Alert>
          </ComponentPreview>
        </div>

        <div className='space-y-2'>
          <h3 className='text-base font-medium'>Without Icon</h3>
          <ComponentPreview
            code={`import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"

export function AlertNoIcon() {
  return (
    <Alert>
      <AlertTitle>Note</AlertTitle>
      <AlertDescription>
        This is an alert without an icon. The layout adjusts automatically.
      </AlertDescription>
    </Alert>
  )
}`}
          >
            <Alert>
              <AlertTitle>Note</AlertTitle>
              <AlertDescription>This is an alert without an icon. The layout adjusts automatically.</AlertDescription>
            </Alert>
          </ComponentPreview>
        </div>
      </section>

      <section className='space-y-4'>
        <h2 className='text-xl font-semibold'>{t('docs.apiReference')}</h2>
        <PropsTable title='Alert' data={PROPS} />
      </section>
    </div>
  )
}
