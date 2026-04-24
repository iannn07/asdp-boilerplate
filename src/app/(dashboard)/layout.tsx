import { headers } from 'next/headers'
import { DashboardShell } from '@/components/templates/DashboardShell'
import type { Locale } from '@/lib/i18n'

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const headersList = await headers()
  const locale = (headersList.get('x-locale') ?? 'id') as Locale
  return <DashboardShell locale={locale}>{children}</DashboardShell>
}
