'use client'
import { Menu } from 'lucide-react'
import { Button } from '@/components/atoms/Button'
import { ThemeToggle } from '@/components/molecules/ThemeToggle'
import { LocaleSwitcher } from '@/components/molecules/LocaleSwitcher'
import { useUIStore } from '@/store/ui.store'
import type { Locale } from '@/lib/i18n'

type NavbarProps = { locale: Locale }

export function Navbar({ locale }: NavbarProps) {
  const toggleSidebar = useUIStore((s) => s.toggleSidebar)
  return (
    <header className="sticky top-0 z-40 flex h-14 items-center gap-4 border-b bg-background px-4">
      <Button variant="ghost" size="icon" onClick={toggleSidebar} aria-label="Toggle sidebar">
        <Menu className="h-5 w-5" />
      </Button>
      <div className="ml-auto flex items-center gap-2">
        <LocaleSwitcher currentLocale={locale} />
        <ThemeToggle />
      </div>
    </header>
  )
}
