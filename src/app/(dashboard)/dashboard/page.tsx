'use client'
import { Suspense } from 'react'

import { IconUsers, IconChartBar, IconActivity } from '@tabler/icons-react'

import { PageHeader } from '@/components/organisms/PageHeader'
import { StatCard } from '@/components/molecules/StatCard'
import { Skeleton } from '@/components/atoms/Skeleton'
import { useTranslation } from '@/lib/i18n/useTranslation'

export default function DashboardPage() {
  const { t } = useTranslation()

  return (
    <div className='space-y-6'>
      <PageHeader title={t('nav.dashboard')} description={t('common.welcome')} />
      <Suspense
        fallback={
          <div className='grid grid-cols-1 gap-4 sm:grid-cols-3'>
            {Array.from({ length: 3 }).map((_, i) => (
              <Skeleton key={i} className='h-32 w-full' />
            ))}
          </div>
        }
      >
        <div className='grid grid-cols-1 gap-4 sm:grid-cols-3'>
          <StatCard title={t('common.totalUsers')} value='—' icon={<IconUsers className='h-4 w-4 text-muted-foreground' />} />
          <StatCard title={t('common.reports')} value='—' icon={<IconChartBar className='h-4 w-4 text-muted-foreground' />} />
          <StatCard title={t('common.activeSessions')} value='—' icon={<IconActivity className='h-4 w-4 text-muted-foreground' />} />
        </div>
      </Suspense>
    </div>
  )
}
