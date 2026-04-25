import { useMemo } from 'react'

import { useUIStore } from '@/store/ui.store'
import { getTranslations } from '.'

export function useTranslation() {
  const locale = useUIStore(s => s.locale)

  const { t } = useMemo(() => getTranslations(locale), [locale])

  return { t, locale }
}
