'use client'
import { useUIStore } from '@/store/ui.store'
import { cn } from '@/lib/cn'

export function DashboardContent({ children }: { children: React.ReactNode }) {
  const sidebarOpen = useUIStore(s => s.sidebarOpen)

  return (
    <div className={cn('flex flex-1 flex-col transition-all duration-300', sidebarOpen ? 'pl-56' : 'pl-0')}>
      {children}
    </div>
  )
}
