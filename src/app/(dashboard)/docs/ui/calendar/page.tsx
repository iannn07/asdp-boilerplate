'use client'

import * as React from 'react'

import type { DateRange } from 'react-day-picker'

import { useTranslation } from '@/lib/i18n/useTranslation'

import { Calendar } from '@/components/ui/calendar'
import { ComponentPreview } from '../../_components/ComponentPreview'
import { ImportBlock } from '../../_components/ImportBlock'
import { PropsTable } from '../../_components/PropsTable'

const PROPS = [
  { prop: 'mode', type: '"single" | "multiple" | "range"', default: '-' },
  { prop: 'selected', type: 'Date | Date[] | DateRange', default: '-' },
  { prop: 'onSelect', type: '(date: ...) => void', default: '-' },
  { prop: 'showOutsideDays', type: 'boolean', default: 'true' },
  { prop: 'captionLayout', type: '"label" | "dropdown" | "dropdown-months" | "dropdown-years"', default: '"label"' },
  { prop: 'buttonVariant', type: 'ButtonVariant', default: '"ghost"' },
  { prop: 'disabled', type: 'Matcher | Matcher[]', default: '-' },
  { prop: 'className', type: 'string', default: '-' }
]

export default function CalendarPage() {
  const { t } = useTranslation()
  const [singleDate, setSingleDate] = React.useState<Date | undefined>(new Date())

  const [dateRange, setDateRange] = React.useState<DateRange | undefined>({
    from: new Date(),
    to: new Date(new Date().setDate(new Date().getDate() + 7))
  })

  return (
    <div className='space-y-10'>
      <div>
        <h1 className='text-3xl font-bold tracking-tight'>Calendar</h1>
        <p className='mt-2 text-muted-foreground'>{t('docs.calendar.desc')}</p>
        <p className='mt-1 text-xs text-muted-foreground'>
          {t('docs.source')}: <code className='rounded bg-muted px-1 py-0.5'>src/components/ui/calendar.tsx</code>
        </p>
      </div>

      <section className='space-y-4'>
        <h2 className='text-xl font-semibold'>{t('docs.whenToUse')}</h2>
        <p className='text-sm text-muted-foreground'>{t('docs.calendar.whenToUse')}</p>
      </section>

      <section className='space-y-4'>
        <h2 className='text-xl font-semibold'>{t('docs.usage')}</h2>
        <ImportBlock code={`import { Calendar } from "@/components/ui/calendar"`} />
      </section>

      <section className='space-y-6'>
        <h2 className='text-xl font-semibold'>{t('docs.examples')}</h2>

        <div className='space-y-2'>
          <h3 className='text-base font-medium'>Single Date</h3>
          <ComponentPreview
            code={`'use client'

import * as React from "react"
import { Calendar } from "@/components/ui/calendar"

export function CalendarSingle() {
  const [date, setDate] = React.useState<Date | undefined>(new Date())

  return (
    <Calendar
      mode="single"
      selected={date}
      onSelect={setDate}
      className="rounded-3xl border"
    />
  )
}`}
          >
            <Calendar mode='single' selected={singleDate} onSelect={setSingleDate} className='rounded-3xl border' />
          </ComponentPreview>
        </div>

        <div className='space-y-2'>
          <h3 className='text-base font-medium'>Date Range</h3>
          <ComponentPreview
            code={`'use client'

import * as React from "react"
import type { DateRange } from "react-day-picker"
import { Calendar } from "@/components/ui/calendar"

export function CalendarRange() {
  const [range, setRange] = React.useState<DateRange | undefined>({
    from: new Date(),
    to: new Date(new Date().setDate(new Date().getDate() + 7)),
  })

  return (
    <Calendar
      mode="range"
      selected={range}
      onSelect={setRange}
      numberOfMonths={2}
      className="rounded-3xl border"
    />
  )
}`}
          >
            <Calendar
              mode='range'
              selected={dateRange}
              onSelect={setDateRange}
              numberOfMonths={2}
              className='rounded-3xl border'
            />
          </ComponentPreview>
        </div>

        <div className='space-y-2'>
          <h3 className='text-base font-medium'>With Dropdown Navigation</h3>
          <ComponentPreview
            code={`'use client'

import * as React from "react"
import { Calendar } from "@/components/ui/calendar"

export function CalendarDropdown() {
  const [date, setDate] = React.useState<Date | undefined>(new Date())

  return (
    <Calendar
      mode="single"
      selected={date}
      onSelect={setDate}
      captionLayout="dropdown"
      className="rounded-3xl border"
    />
  )
}`}
          >
            <Calendar mode='single' captionLayout='dropdown' className='rounded-3xl border' />
          </ComponentPreview>
        </div>
      </section>

      <section className='space-y-4'>
        <h2 className='text-xl font-semibold'>{t('docs.apiReference')}</h2>
        <PropsTable title='Calendar' data={PROPS} />
      </section>
    </div>
  )
}
