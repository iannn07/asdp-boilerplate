import { create } from 'zustand'

type UsersState = {
  selectedIds: string[]
  toggleSelected: (id: string) => void
  clearSelection: () => void
}

export const useUsersStore = create<UsersState>()((set) => ({
  selectedIds: [],
  toggleSelected: (id) =>
    set((s) => ({
      selectedIds: s.selectedIds.includes(id)
        ? s.selectedIds.filter((x) => x !== id)
        : [...s.selectedIds, id],
    })),
  clearSelection: () => set({ selectedIds: [] }),
}))
