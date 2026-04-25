import type { Locale } from './shared'

import en from '@/locales/messages/en.json'
import id from '@/locales/messages/id.json'

export { type Locale, locales, defaultLocale } from './shared'

const messages: Record<Locale, Record<string, unknown>> = { en, id }

function resolve(obj: Record<string, unknown>, key: string): string {
  const parts = key.split('.')
  let current: unknown = obj

  for (const part of parts) {
    if (current == null || typeof current !== 'object') return key
    current = (current as Record<string, unknown>)[part]
  }

  return typeof current === 'string' ? current : key
}

export function getTranslations(locale: Locale) {
  const dict = messages[locale] ?? messages.en

  return {
    t: (key: string) => resolve(dict, key)
  }
}
