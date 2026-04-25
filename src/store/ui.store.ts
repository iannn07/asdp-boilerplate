import { create } from 'zustand'
import { persist } from 'zustand/middleware'

import type { Locale } from '@/lib/i18n/shared'
import { defaultLocale } from '@/lib/i18n/shared'

type UIState = {
  sidebarOpen: boolean
  locale: Locale
  setSidebarOpen: (open: boolean) => void
  toggleSidebar: () => void
  setLocale: (locale: Locale) => void
}

export const useUIStore = create<UIState>()(
  persist(
    set => ({
      sidebarOpen: true,
      locale: defaultLocale,
      setSidebarOpen: open => set({ sidebarOpen: open }),
      toggleSidebar: () => set(s => ({ sidebarOpen: !s.sidebarOpen })),
      setLocale: locale => set({ locale })
    }),
    { name: 'ui-store' }
  )
)
