'use client'
import { useRouter } from 'next/navigation'

import { Button } from '@/components/atoms/Button'
import { LOCALE_COOKIE, type Locale } from '@/lib/i18n/shared'

type LocaleSwitcherProps = { currentLocale: Locale }

export function LocaleSwitcher({ currentLocale }: LocaleSwitcherProps) {
  const router = useRouter()

  const switchLocale = (locale: Locale) => {
    document.cookie = `${LOCALE_COOKIE}=${locale}; path=/; max-age=31536000`
    router.refresh()
  }

  return (
    <div className='flex gap-1'>
      <Button variant={currentLocale === 'id' ? 'default' : 'ghost'} size='sm' onClick={() => switchLocale('id')}>
        ID
      </Button>
      <Button variant={currentLocale === 'en' ? 'default' : 'ghost'} size='sm' onClick={() => switchLocale('en')}>
        EN
      </Button>
    </div>
  )
}
