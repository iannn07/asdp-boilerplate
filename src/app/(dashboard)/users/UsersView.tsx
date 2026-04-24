'use client'
import { useUsers } from '@/modules/users/hooks/useUsers'
import { UserTable } from '@/modules/users/components/UserTable'
import { Spinner } from '@/components/atoms/Spinner'

export function UsersView() {
  const { data, isLoading } = useUsers()
  if (isLoading) return <Spinner />
  return <UserTable data={data ?? []} />
}
