'use client'

import { useTranslation } from '@/lib/i18n/useTranslation'

import { Button } from '@/components/ui/button'
import { PageHeader } from '@/components/organisms/PageHeader'
import { ComponentPreview } from '../../_components/ComponentPreview'
import { ImportBlock } from '../../_components/ImportBlock'
import { PropsTable } from '../../_components/PropsTable'

const PROPS = [
  { prop: 'title', type: 'string', default: '-' },
  { prop: 'description', type: 'string | undefined', default: '-' },
  { prop: 'actions', type: 'ReactNode | undefined', default: '-' }
]

export default function PageHeaderPage() {
  const { t } = useTranslation()

  return (
    <div className='space-y-10'>
      <div>
        <h1 className='text-3xl font-bold tracking-tight'>Page Header</h1>
        <p className='mt-2 text-muted-foreground'>{t('docs.pageHeader.desc')}</p>
        <p className='mt-1 text-xs text-muted-foreground'>
          {t('docs.source')}:{' '}
          <code className='rounded bg-muted px-1 py-0.5'>src/components/organisms/PageHeader.tsx</code>
        </p>
      </div>

      <section className='space-y-3'>
        <h2 className='text-xl font-semibold'>{t('docs.whenToUse')}</h2>
        <p className='text-sm text-muted-foreground'>{t('docs.pageHeader.whenToUse')}</p>
      </section>

      <section className='space-y-4'>
        <h2 className='text-xl font-semibold'>{t('docs.usage')}</h2>
        <ImportBlock code={`import { PageHeader } from "@/components/organisms/PageHeader"`} />
      </section>

      <section className='space-y-6'>
        <h2 className='text-xl font-semibold'>{t('docs.examples')}</h2>

        <div className='space-y-2'>
          <h3 className='text-base font-medium'>Default</h3>
          <ComponentPreview
            code={`import { PageHeader } from "@/components/organisms/PageHeader"

export function PageHeaderDefault() {
  return (
    <PageHeader
      title="Users"
      description="Manage your team members and their roles."
    />
  )
}`}
            className='items-start justify-start'
          >
            <div className='w-full'>
              <PageHeader title='Users' description='Manage your team members and their roles.' />
            </div>
          </ComponentPreview>
        </div>

        <div className='space-y-2'>
          <h3 className='text-base font-medium'>With Actions</h3>
          <ComponentPreview
            code={`import { Button } from "@/components/ui/button"
import { PageHeader } from "@/components/organisms/PageHeader"

export function PageHeaderWithActions() {
  return (
    <PageHeader
      title="Users"
      description="Manage your team members."
      actions={<Button size="sm">Add User</Button>}
    />
  )
}`}
            className='items-start justify-start'
          >
            <div className='w-full'>
              <PageHeader
                title='Users'
                description='Manage your team members.'
                actions={<Button size='sm'>Add User</Button>}
              />
            </div>
          </ComponentPreview>
        </div>

        <div className='space-y-2'>
          <h3 className='text-base font-medium'>Title Only</h3>
          <ComponentPreview
            code={`import { PageHeader } from "@/components/organisms/PageHeader"

export function PageHeaderTitleOnly() {
  return <PageHeader title="Dashboard" />
}`}
            className='items-start justify-start'
          >
            <div className='w-full'>
              <PageHeader title='Dashboard' />
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
