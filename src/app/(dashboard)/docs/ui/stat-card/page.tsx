'use client'

import { useTranslation } from '@/lib/i18n/useTranslation'

import { IconTrendingUp, IconUsers, IconCurrencyDollar } from '@tabler/icons-react'

import { StatCard } from '@/components/molecules/StatCard'
import { ComponentPreview } from '../../_components/ComponentPreview'
import { ImportBlock } from '../../_components/ImportBlock'
import { PropsTable } from '../../_components/PropsTable'

const PROPS = [
  { prop: 'title', type: 'string', default: '-' },
  { prop: 'value', type: 'string | number', default: '-' },
  { prop: 'description', type: 'string | undefined', default: '-' },
  { prop: 'icon', type: 'ReactNode | undefined', default: '-' }
]

export default function StatCardPage() {
  const { t } = useTranslation()

  return (
    <div className='space-y-10'>
      <div>
        <h1 className='text-3xl font-bold tracking-tight'>Stat Card</h1>
        <p className='mt-2 text-muted-foreground'>
          {t('docs.statCard.desc')}
        </p>
        <p className='mt-1 text-xs text-muted-foreground'>
          {t('docs.source')}: <code className='rounded bg-muted px-1 py-0.5'>src/components/molecules/StatCard.tsx</code>
        </p>
      </div>

      <section className='space-y-3'>
        <h2 className='text-xl font-semibold'>{t('docs.whenToUse')}</h2>
        <p className='text-sm text-muted-foreground'>
          {t('docs.statCard.whenToUse')}
        </p>
      </section>

      <section className='space-y-4'>
        <h2 className='text-xl font-semibold'>{t('docs.usage')}</h2>
        <ImportBlock code={`import { StatCard } from "@/components/molecules/StatCard"`} />
      </section>

      <section className='space-y-6'>
        <h2 className='text-xl font-semibold'>{t('docs.examples')}</h2>

        <div className='space-y-2'>
          <h3 className='text-base font-medium'>Default</h3>
          <ComponentPreview
            code={`import { IconUsers } from "@tabler/icons-react"
import { StatCard } from "@/components/molecules/StatCard"

export function StatCardDefault() {
  return (
    <StatCard
      title="Total Users"
      value={2350}
      description="+20.1% from last month"
      icon={<IconUsers className="h-4 w-4 text-muted-foreground" />}
    />
  )
}`}
          >
            <div className='w-[280px]'>
              <StatCard
                title='Total Users'
                value={2350}
                description='+20.1% from last month'
                icon={<IconUsers className='h-4 w-4 text-muted-foreground' />}
              />
            </div>
          </ComponentPreview>
        </div>

        <div className='space-y-2'>
          <h3 className='text-base font-medium'>Grid Layout</h3>
          <ComponentPreview
            code={`import { IconCurrencyDollar, IconTrendingUp, IconUsers } from "@tabler/icons-react"
import { StatCard } from "@/components/molecules/StatCard"

export function StatCardGrid() {
  return (
    <div className="grid grid-cols-3 gap-4">
      <StatCard
        title="Revenue"
        value="$45,231"
        description="+20.1%"
        icon={<IconCurrencyDollar className="h-4 w-4 text-muted-foreground" />}
      />
      <StatCard
        title="Users"
        value="2,350"
        description="+180"
        icon={<IconUsers className="h-4 w-4 text-muted-foreground" />}
      />
      <StatCard
        title="Growth"
        value="12.5%"
        description="+2.1%"
        icon={<IconTrendingUp className="h-4 w-4 text-muted-foreground" />}
      />
    </div>
  )
}`}
            className='p-4'
          >
            <div className='grid w-full grid-cols-3 gap-4'>
              <StatCard
                title='Revenue'
                value='$45,231'
                description='+20.1%'
                icon={<IconCurrencyDollar className='h-4 w-4 text-muted-foreground' />}
              />
              <StatCard
                title='Users'
                value='2,350'
                description='+180'
                icon={<IconUsers className='h-4 w-4 text-muted-foreground' />}
              />
              <StatCard
                title='Growth'
                value='12.5%'
                description='+2.1%'
                icon={<IconTrendingUp className='h-4 w-4 text-muted-foreground' />}
              />
            </div>
          </ComponentPreview>
        </div>

        <div className='space-y-2'>
          <h3 className='text-base font-medium'>Without Icon</h3>
          <ComponentPreview
            code={`import { StatCard } from "@/components/molecules/StatCard"

export function StatCardWithoutIcon() {
  return (
    <StatCard
      title="Active Sessions"
      value={142}
      description="Currently online"
    />
  )
}`}
          >
            <div className='w-[280px]'>
              <StatCard title='Active Sessions' value={142} description='Currently online' />
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
