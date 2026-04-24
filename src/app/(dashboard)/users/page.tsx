import { Suspense } from 'react'

import { dehydrate, HydrationBoundary } from '@tanstack/react-query'

import { getQueryClient } from '@/lib/query/client'
import { PageHeader } from '@/components/organisms/PageHeader'
import { Skeleton } from '@/components/atoms/Skeleton'
import { usersQueryOptions } from '@/modules/users/queries'
import { UsersView } from './UsersView'

export default async function UsersPage() {
  const queryClient = getQueryClient()

  await queryClient.prefetchQuery(usersQueryOptions)

  return (
    <div className='space-y-6'>
      <PageHeader title='Users' description='Manage system users' />
      <Suspense fallback={<Skeleton className='h-64 w-full' />}>
        <HydrationBoundary state={dehydrate(queryClient)}>
          <UsersView />
        </HydrationBoundary>
      </Suspense>
    </div>
  )
}
