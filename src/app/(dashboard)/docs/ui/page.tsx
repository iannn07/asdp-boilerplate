'use client'

import { useState } from 'react'

import Link from 'next/link'

import { IconSearch } from '@tabler/icons-react'

import { Input } from '@/components/ui/input'
import { useTranslation } from '@/lib/i18n/useTranslation'
import { NAV_GROUPS } from '../_components/DocsSidebar'

const ALL_COMPONENTS = NAV_GROUPS.flatMap(g =>
  g.items.map(item => ({ ...item, groupKey: g.titleKey }))
)

export default function DocsIndexPage() {
  const [query, setQuery] = useState('')
  const { t } = useTranslation()

  const filtered = query
    ? ALL_COMPONENTS.filter(c => c.name.toLowerCase().includes(query.toLowerCase()))
    : ALL_COMPONENTS

  const groups = [...new Set(filtered.map(c => c.groupKey))]

  return (
    <div className='space-y-8'>
      <div>
        <h1 className='text-3xl font-bold tracking-tight'>{t('docs.components')}</h1>
        <p className='mt-2 text-muted-foreground'>{t('docs.browseDescription')}</p>
      </div>

      <div className='relative max-w-sm'>
        <IconSearch className='absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground' />
        <Input
          placeholder={t('docs.searchComponents')}
          value={query}
          onChange={e => setQuery(e.target.value)}
          className='pl-9'
        />
      </div>

      {groups.map(groupKey => {
        const items = filtered.filter(c => c.groupKey === groupKey)
        return (
          <div key={groupKey} className='space-y-3'>
            <h2 className='text-sm font-semibold uppercase tracking-wider text-muted-foreground'>
              {t(groupKey)}
            </h2>
            <div className='grid gap-3 sm:grid-cols-2 lg:grid-cols-3'>
              {items.map(item => (
                <Link
                  key={item.href}
                  href={item.href}
                  className='group rounded-lg border p-4 transition-colors hover:border-foreground/20 hover:bg-muted/50'
                >
                  <span className='text-sm font-medium group-hover:text-foreground'>{item.name}</span>
                </Link>
              ))}
            </div>
          </div>
        )
      })}

      {filtered.length === 0 && (
        <p className='text-sm text-muted-foreground'>
          {t('docs.noComponentsFound')} &quot;{query}&quot;.
        </p>
      )}
    </div>
  )
}
