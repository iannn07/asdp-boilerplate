import { queryOptions } from '@tanstack/react-query'

import { api } from '@/lib/api'
import type { User } from '../types'

export const userKeys = {
  all: ['users'] as const,
  list: () => [...userKeys.all, 'list'] as const,
  detail: (id: string) => [...userKeys.all, 'detail', id] as const
}

export const usersQueryOptions = queryOptions({
  queryKey: userKeys.list(),
  queryFn: () => api.get<User[]>('/users')
})

export const userDetailQueryOptions = (id: string) =>
  queryOptions({
    queryKey: userKeys.detail(id),
    queryFn: () => api.get<User>(`/users/${id}`)
  })
