import { describe, it, expect } from 'vitest'

import { getTranslations, locales, defaultLocale } from '../index'

describe('getTranslations', () => {
  it('translates a key in English', () => {
    const { t } = getTranslations('en')

    expect(t('common.save')).toBe('Save')
  })

  it('translates a key in Indonesian', () => {
    const { t } = getTranslations('id')

    expect(t('common.save')).toBe('Simpan')
  })

  it('translates nested auth keys', () => {
    const { t } = getTranslations('en')

    expect(t('auth.login')).toBe('Login')
  })

  it('returns the key for missing translations', () => {
    const { t } = getTranslations('en')

    expect(t('nonexistent.key')).toBe('nonexistent.key')
  })
})

describe('locale config', () => {
  it('exports en and id locales', () => {
    expect(locales).toEqual(['en', 'id'])
  })

  it('defaults to en', () => {
    expect(defaultLocale).toBe('en')
  })
})
