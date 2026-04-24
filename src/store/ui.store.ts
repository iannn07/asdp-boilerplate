import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type Theme = 'light' | 'dark' | 'system'

type UIState = {
  sidebarOpen: boolean
  theme: Theme
  setSidebarOpen: (open: boolean) => void
  toggleSidebar: () => void
  setTheme: (theme: Theme) => void
}

export const useUIStore = create<UIState>()(
  persist(
    set => ({
      sidebarOpen: true,
      theme: 'system',
      setSidebarOpen: open => set({ sidebarOpen: open }),
      toggleSidebar: () => set(s => ({ sidebarOpen: !s.sidebarOpen })),
      setTheme: theme => set({ theme })
    }),
    { name: 'ui-store' }
  )
)
