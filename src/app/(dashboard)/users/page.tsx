'use client'

import { PageHeader } from '@/components/organisms/PageHeader'
import { useTranslation } from '@/lib/i18n/useTranslation'
import { UsersView } from './UsersView'

export default function UsersPage() {
  const { t } = useTranslation()

  return (
    <div className='space-y-6'>
      <PageHeader title={t('users.title')} description={t('common.manageSystemUsers')} />
      <UsersView />
    </div>
  )
}
