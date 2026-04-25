import { queryOptions } from '@tanstack/react-query'

import { api } from '@/lib/api'
import type { User } from '../types'
import { dummyUsers } from '../data/dummy'

export const userKeys = {
  all: ['users'] as const,
  list: () => [...userKeys.all, 'list'] as const,
  detail: (id: string) => [...userKeys.all, 'detail', id] as const
}

async function fetchUsersWithFallback(): Promise<User[]> {
  try {
    return await api.get<User[]>('/users')
  } catch {
    return dummyUsers
  }
}

export const usersQueryOptions = queryOptions({
  queryKey: userKeys.list(),
  queryFn: fetchUsersWithFallback,
  retry: false
})

export const userDetailQueryOptions = (id: string) =>
  queryOptions({
    queryKey: userKeys.detail(id),
    queryFn: () => api.get<User>(`/users/${id}`)
  })
