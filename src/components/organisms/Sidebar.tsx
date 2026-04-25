'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { IconComponents, IconLayoutDashboard, IconUsers } from '@tabler/icons-react'

import { cn } from '@/lib/cn'
import { useTranslation } from '@/lib/i18n/useTranslation'
import { useUIStore } from '@/store/ui.store'

type NavItem = { href: string; labelKey: string; icon: React.ReactNode }

const navItems: NavItem[] = [
  { href: '/dashboard', labelKey: 'nav.dashboard', icon: <IconLayoutDashboard className='h-4 w-4' /> },
  { href: '/users', labelKey: 'nav.users', icon: <IconUsers className='h-4 w-4' /> },
  { href: '/docs/ui', labelKey: 'nav.docs', icon: <IconComponents className='h-4 w-4' /> }
]

export function Sidebar() {
  const sidebarOpen = useUIStore(s => s.sidebarOpen)
  const pathname = usePathname()
  const { t } = useTranslation()

  return (
    <aside
      className={cn(
        'fixed inset-y-0 left-0 z-30 flex flex-col border-r bg-background transition-all duration-300',
        sidebarOpen ? 'w-56' : 'w-0 overflow-hidden'
      )}
    >
      <div className='flex h-14 items-center border-b px-4'>
        <span className='font-semibold'>ASDP</span>
      </div>
      <nav className='flex-1 space-y-1 p-2'>
        {navItems.map(item => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              'flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground',
              (pathname === item.href || pathname.startsWith(item.href + '/')) && 'bg-accent text-accent-foreground'
            )}
          >
            {item.icon}
            {t(item.labelKey)}
          </Link>
        ))}
      </nav>
    </aside>
  )
}
