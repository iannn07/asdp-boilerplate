'use client'
import { createColumnHelper } from '@tanstack/react-table'
import { DataTable } from '@/components/organisms/DataTable'
import { Badge } from '@/components/atoms/Badge'
import type { User } from '../types'

const col = createColumnHelper<User>()

const columns = [
  col.accessor('name', { header: 'Name' }),
  col.accessor('email', { header: 'Email' }),
  col.accessor('role', {
    header: 'Role',
    cell: (info) => <Badge variant="outline">{info.getValue()}</Badge>,
  }),
  col.accessor('createdAt', {
    header: 'Created',
    cell: (info) => new Date(info.getValue()).toLocaleDateString(),
  }),
]

export function UserTable({ data }: { data: User[] }) {
  return <DataTable columns={columns} data={data} emptyMessage="No users found." />
}
