'use client'

import { useUsers } from '@/modules/users/hooks/useUsers'
import { UserTable } from '@/modules/users/components/UserTable'
import { Spinner } from '@/components/atoms/Spinner'
import { useTranslation } from '@/lib/i18n/useTranslation'

export function UsersView() {
  const { data, isLoading, isError } = useUsers()
  const { t } = useTranslation()

  if (isLoading) {
    return (
      <div className='flex items-center justify-center py-12'>
        <Spinner size='lg' />
      </div>
    )
  }

  if (isError) {
    return (
      <div className='rounded-md border border-destructive/50 bg-destructive/10 p-4 text-sm text-destructive'>
        {t('common.failedLoadUsers')}
      </div>
    )
  }

  return <UserTable data={data ?? []} />
}
