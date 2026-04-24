import { Navbar } from '@/components/organisms/Navbar'
import { Sidebar } from '@/components/organisms/Sidebar'
import type { Locale } from '@/lib/i18n'

type DashboardShellProps = {
  children: React.ReactNode
  locale: Locale
}

export function DashboardShell({ children, locale }: DashboardShellProps) {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex flex-1 flex-col pl-56 transition-all duration-300">
        <Navbar locale={locale} />
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  )
}
