'use client'
import { useMemo } from 'react'

import { createColumnHelper } from '@tanstack/react-table'

import { DataTable } from '@/components/organisms/DataTable'
import { Badge } from '@/components/atoms/Badge'
import { useTranslation } from '@/lib/i18n/useTranslation'
import type { User } from '../types'

const col = createColumnHelper<User>()

function useColumns() {
  const { t } = useTranslation()

  return useMemo(
    () => [
      col.accessor('name', { header: t('users.name') }),
      col.accessor('email', { header: t('users.email') }),
      col.accessor('role', {
        header: t('users.role'),
        cell: info => <Badge variant='outline'>{info.getValue()}</Badge>
      }),
      col.accessor('createdAt', {
        header: t('common.created'),
        cell: info => new Date(info.getValue()).toLocaleDateString()
      })
    ],
    [t]
  )
}

export function UserTable({ data }: { data: User[] }) {
  const columns = useColumns()
  const { t } = useTranslation()

  return <DataTable columns={columns} data={data} emptyMessage={t('common.noUsersFound')} />
}
