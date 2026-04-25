'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { useTranslation } from '@/lib/i18n/useTranslation'
import { DocsSidebar } from './DocsSidebar'

type DocsLayoutProps = {
  children: React.ReactNode
}

export function DocsLayout({ children }: DocsLayoutProps) {
  const pathname = usePathname()
  const { t } = useTranslation()

  const segments = pathname.replace('/docs/ui', '').split('/').filter(Boolean)
  const firstSegment = segments[0]

  const breadcrumbLabel = firstSegment
    ? firstSegment
        .split('-')
        .map(w => w.charAt(0).toUpperCase() + w.slice(1))
        .join(' ')
    : null

  return (
    <div className='flex flex-1'>
      <aside className='sticky top-14 hidden h-[calc(100vh-3.5rem)] w-60 shrink-0 overflow-y-auto border-r p-6 lg:block'>
        <DocsSidebar />
      </aside>

      <main className='flex-1 overflow-x-hidden'>
        <div className='mx-auto max-w-3xl px-6 py-10'>
          {breadcrumbLabel && (
            <nav className='mb-6 flex items-center gap-1.5 text-sm text-muted-foreground'>
              <Link href='/docs/ui' className='transition-colors hover:text-foreground'>
                {t('docs.components')}
              </Link>
              <span>/</span>
              <span className='text-foreground'>{breadcrumbLabel}</span>
            </nav>
          )}
          {children}
        </div>
      </main>
    </div>
  )
}
