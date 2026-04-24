import path from 'path'

import i18nLib from 'i18n'

i18nLib.configure({
  locales: ['id', 'en'],
  defaultLocale: 'id',
  directory: path.join(process.cwd(), 'messages'),
  objectNotation: true,
  updateFiles: false
})

export type Locale = 'id' | 'en'
export const locales: Locale[] = ['id', 'en']
export const defaultLocale: Locale = 'id'
export const LOCALE_COOKIE = 'NEXT_LOCALE'

export function getI18n(locale: Locale) {
  i18nLib.setLocale(locale)
  
return {
    t: (key: string) => i18nLib.__(key)
  }
}
