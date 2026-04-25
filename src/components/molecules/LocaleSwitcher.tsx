'use client'

import { Button } from '@/components/atoms/Button'
import { useUIStore } from '@/store/ui.store'
import type { Locale } from '@/lib/i18n/shared'

export function LocaleSwitcher() {
  const locale = useUIStore(s => s.locale)
  const setLocale = useUIStore(s => s.setLocale)

  const switchLocale = (next: Locale) => {
    setLocale(next)
  }

  return (
    <div className='flex gap-1'>
      <Button variant={locale === 'id' ? 'default' : 'ghost'} size='sm' onClick={() => switchLocale('id')}>
        ID
      </Button>
      <Button variant={locale === 'en' ? 'default' : 'ghost'} size='sm' onClick={() => switchLocale('en')}>
        EN
      </Button>
    </div>
  )
}
