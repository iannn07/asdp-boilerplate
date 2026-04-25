type Locale = 'id-ID' | 'en-US'

export function formatNumber(value: number, locale: Locale = 'id-ID'): string {
  return new Intl.NumberFormat(locale).format(value)
}

export function formatCurrency(value: number, locale: Locale = 'id-ID'): string {
  const currency = locale === 'id-ID' ? 'IDR' : 'USD'

  return new Intl.NumberFormat(locale, { style: 'currency', currency, maximumFractionDigits: 0 }).format(value)
}

export function formatDate(date: Date | string, locale: Locale = 'id-ID'): string {
  return new Intl.DateTimeFormat(locale, { day: 'numeric', month: 'long', year: 'numeric' }).format(new Date(date))
}

export function formatDateShort(date: Date | string, locale: Locale = 'id-ID'): string {
  return new Intl.DateTimeFormat(locale, { day: '2-digit', month: '2-digit', year: 'numeric' }).format(new Date(date))
}

export function formatRelativeTime(date: Date | string, locale: Locale = 'id-ID'): string {
  const diff = new Date(date).getTime() - Date.now()
  const abs = Math.abs(diff)
  const rtf = new Intl.RelativeTimeFormat(locale, { numeric: 'auto' })

  if (abs < 60_000) return rtf.format(Math.round(diff / 1000), 'second')
  if (abs < 3_600_000) return rtf.format(Math.round(diff / 60_000), 'minute')
  if (abs < 86_400_000) return rtf.format(Math.round(diff / 3_600_000), 'hour')

  return rtf.format(Math.round(diff / 86_400_000), 'day')
}
