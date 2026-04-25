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
      { name: 'Accordion', href: '/docs/ui/accordion' },
      { name: 'Alert', href: '/docs/ui/alert' },
      { name: 'Alert Dialog', href: '/docs/ui/alert-dialog' },
      { name: 'Aspect Ratio', href: '/docs/ui/aspect-ratio' },
      { name: 'Avatar', href: '/docs/ui/avatar' },
      { name: 'Badge', href: '/docs/ui/badge' },
      { name: 'Breadcrumb', href: '/docs/ui/breadcrumb' },
      { name: 'Button', href: '/docs/ui/button' },
      { name: 'Button Group', href: '/docs/ui/button-group' },
      { name: 'Calendar', href: '/docs/ui/calendar' },
      { name: 'Card', href: '/docs/ui/card' },
      { name: 'Carousel', href: '/docs/ui/carousel' },
      { name: 'Chart', href: '/docs/ui/chart' },
      { name: 'Checkbox', href: '/docs/ui/checkbox' },
      { name: 'Collapsible', href: '/docs/ui/collapsible' },
      { name: 'Combobox', href: '/docs/ui/combobox' },
      { name: 'Command', href: '/docs/ui/command' },
      { name: 'Context Menu', href: '/docs/ui/context-menu' },
      { name: 'Dialog', href: '/docs/ui/dialog' },
      { name: 'Direction', href: '/docs/ui/direction' },
      { name: 'Drawer', href: '/docs/ui/drawer' },
      { name: 'Dropdown Menu', href: '/docs/ui/dropdown-menu' },
      { name: 'Empty', href: '/docs/ui/empty' },
      { name: 'Field', href: '/docs/ui/field' },
      { name: 'Hover Card', href: '/docs/ui/hover-card' },
      { name: 'Input', href: '/docs/ui/input' },
      { name: 'Input Group', href: '/docs/ui/input-group' },
      { name: 'Input OTP', href: '/docs/ui/input-otp' },
      { name: 'Item', href: '/docs/ui/item' },
      { name: 'Kbd', href: '/docs/ui/kbd' },
      { name: 'Label', href: '/docs/ui/label' },
      { name: 'Menubar', href: '/docs/ui/menubar' },
      { name: 'Native Select', href: '/docs/ui/native-select' },
      { name: 'Navigation Menu', href: '/docs/ui/navigation-menu' },
      { name: 'Pagination', href: '/docs/ui/pagination' },
      { name: 'Popover', href: '/docs/ui/popover' },
      { name: 'Progress', href: '/docs/ui/progress' },
      { name: 'Radio Group', href: '/docs/ui/radio-group' },
      { name: 'Resizable', href: '/docs/ui/resizable' },
      { name: 'Scroll Area', href: '/docs/ui/scroll-area' },
      { name: 'Select', href: '/docs/ui/select' },
      { name: 'Separator', href: '/docs/ui/separator' },
      { name: 'Sheet', href: '/docs/ui/sheet' },
      { name: 'Sidebar', href: '/docs/ui/sidebar' },
      { name: 'Skeleton', href: '/docs/ui/skeleton' },
      { name: 'Slider', href: '/docs/ui/slider' },
      { name: 'Sonner', href: '/docs/ui/sonner' },
      { name: 'Switch', href: '/docs/ui/switch' },
      { name: 'Table', href: '/docs/ui/table' },
      { name: 'Tabs', href: '/docs/ui/tabs' },
      { name: 'Textarea', href: '/docs/ui/textarea' },
      { name: 'Toggle', href: '/docs/ui/toggle' },
      { name: 'Toggle Group', href: '/docs/ui/toggle-group' },
      { name: 'Tooltip', href: '/docs/ui/tooltip' },
      { name: 'Typography', href: '/docs/ui/typography' }
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
