import { describe, it, expect } from 'vitest'
import { getI18n, locales, defaultLocale } from '../index'

describe('getI18n', () => {
  it('translates a key in English', () => {
    const { t } = getI18n('en')
    expect(t('common.save')).toBe('Save')
  })

  it('translates a key in Indonesian', () => {
    const { t } = getI18n('id')
    expect(t('common.save')).toBe('Simpan')
  })

  it('translates nested auth keys', () => {
    const { t } = getI18n('en')
    expect(t('auth.login')).toBe('Login')
  })
})

describe('locale config', () => {
  it('exports id and en locales', () => {
    expect(locales).toEqual(['id', 'en'])
  })

  it('defaults to id', () => {
    expect(defaultLocale).toBe('id')
  })
})
