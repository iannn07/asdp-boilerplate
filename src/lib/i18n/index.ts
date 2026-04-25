import path from 'path'

import i18nLib from 'i18n'

import { locales, defaultLocale } from './shared'
import type { Locale } from './shared'

export { type Locale, locales, defaultLocale, LOCALE_COOKIE } from './shared'

i18nLib.configure({
  locales: [...locales],
  defaultLocale,
  directory: path.join(process.cwd(), 'src/locales/messages'),
  objectNotation: true,
  updateFiles: false
})

export function getI18n(locale: Locale) {
  i18nLib.setLocale(locale)

  return {
    t: (key: string) => i18nLib.__(key)
  }
}
