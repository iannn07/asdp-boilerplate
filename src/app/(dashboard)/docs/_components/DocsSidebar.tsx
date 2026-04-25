'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { cn } from '@/lib/cn'
import { useTranslation } from '@/lib/i18n/useTranslation'

type NavItem = { name: string; href: string }
type NavGroup = { titleKey: string; items: NavItem[] }

const NAV_GROUPS: NavGroup[] = [
  {
    titleKey: 'docs.primitives',
    items: [
      { name: 'Avatar', href: '/docs/ui/avatar' },
      { name: 'Badge', href: '/docs/ui/badge' },
      { name: 'Button', href: '/docs/ui/button' },
      { name: 'Card', href: '/docs/ui/card' },
      { name: 'Dropdown Menu', href: '/docs/ui/dropdown-menu' },
      { name: 'Input', href: '/docs/ui/input' },
      { name: 'Label', href: '/docs/ui/label' },
      { name: 'Separator', href: '/docs/ui/separator' },
      { name: 'Sheet', href: '/docs/ui/sheet' },
      { name: 'Table', href: '/docs/ui/table' },
      { name: 'Tooltip', href: '/docs/ui/tooltip' }
    ]
  },
  {
    titleKey: 'docs.custom',
    items: [
      { name: 'Button (Atom)', href: '/docs/ui/button-atom' },
      { name: 'Data Table', href: '/docs/ui/data-table' },
      { name: 'Form Field', href: '/docs/ui/form-field' },
      { name: 'Locale Switcher', href: '/docs/ui/locale-switcher' },
      { name: 'Page Header', href: '/docs/ui/page-header' },
      { name: 'Skeleton', href: '/docs/ui/skeleton' },
      { name: 'Spinner', href: '/docs/ui/spinner' },
      { name: 'Stat Card', href: '/docs/ui/stat-card' },
      { name: 'Theme Toggle', href: '/docs/ui/theme-toggle' }
    ]
  }
]

export function DocsSidebar() {
  const pathname = usePathname()
  const { t } = useTranslation()

  return (
    <nav className='space-y-6'>
      <Link href='/docs/ui' className='block text-sm font-semibold'>
        {t('docs.components')}
      </Link>
      {NAV_GROUPS.map(group => (
        <div key={group.titleKey} className='space-y-1'>
          <h4 className='px-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground'>
            {t(group.titleKey)}
          </h4>
          <ul className='space-y-0.5'>
            {group.items.map(item => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    'block rounded-md px-2 py-1.5 text-sm transition-colors',
                    pathname === item.href
                      ? 'bg-muted font-medium text-foreground'
                      : 'text-muted-foreground hover:text-foreground'
                  )}
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </nav>
  )
}

export { NAV_GROUPS }
