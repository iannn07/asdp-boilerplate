import { Suspense } from 'react'

import { Users, BarChart2, Activity } from 'lucide-react'

import { PageHeader } from '@/components/organisms/PageHeader'
import { StatCard } from '@/components/molecules/StatCard'
import { Skeleton } from '@/components/atoms/Skeleton'

export default function DashboardPage() {
  return (
    <div className='space-y-6'>
      <PageHeader title='Dashboard' description='Welcome to ASDP Core Engine' />
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
          <StatCard title='Total Users' value='—' icon={<Users className='h-4 w-4 text-muted-foreground' />} />
          <StatCard title='Reports' value='—' icon={<BarChart2 className='h-4 w-4 text-muted-foreground' />} />
          <StatCard title='Active Sessions' value='—' icon={<Activity className='h-4 w-4 text-muted-foreground' />} />
        </div>
      </Suspense>
    </div>
  )
}
