import { useQuery } from '@tanstack/react-query'

import { usersQueryOptions } from '../queries'

export function useUsers() {
  return useQuery(usersQueryOptions)
}
