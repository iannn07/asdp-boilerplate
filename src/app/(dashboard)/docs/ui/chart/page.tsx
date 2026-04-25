'use client'

import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts'

import { useTranslation } from '@/lib/i18n/useTranslation'

import {
  type ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent
} from '@/components/ui/chart'
import { ComponentPreview } from '../../_components/ComponentPreview'
import { CompositionTree } from '../../_components/CompositionTree'
import { ImportBlock } from '../../_components/ImportBlock'
import { PropsTable } from '../../_components/PropsTable'

const CONTAINER_PROPS = [
  { prop: 'config', type: 'ChartConfig', default: '-' },
  { prop: 'initialDimension', type: '{ width: number; height: number }', default: '{ width: 320, height: 200 }' },
  { prop: 'children', type: 'ResponsiveContainer children', default: '-' },
  { prop: 'className', type: 'string', default: '-' }
]

const TOOLTIP_CONTENT_PROPS = [
  { prop: 'indicator', type: '"line" | "dot" | "dashed"', default: '"dot"' },
  { prop: 'hideLabel', type: 'boolean', default: 'false' },
  { prop: 'hideIndicator', type: 'boolean', default: 'false' },
  { prop: 'nameKey', type: 'string', default: '-' },
  { prop: 'labelKey', type: 'string', default: '-' }
]

const LEGEND_CONTENT_PROPS = [
  { prop: 'hideIcon', type: 'boolean', default: 'false' },
  { prop: 'nameKey', type: 'string', default: '-' },
  { prop: 'verticalAlign', type: '"top" | "bottom"', default: '"bottom"' },
  { prop: 'className', type: 'string', default: '-' }
]

const COMPOSITION = `ChartContainer
├── ChartStyle (auto-injected)
└── ResponsiveContainer
    └── <Recharts Chart>
        ├── ChartTooltip
        │   └── ChartTooltipContent
        └── ChartLegend
            └── ChartLegendContent`

const chartData = [
  { month: 'January', desktop: 186, mobile: 80 },
  { month: 'February', desktop: 305, mobile: 200 },
  { month: 'March', desktop: 237, mobile: 120 },
  { month: 'April', desktop: 73, mobile: 190 },
  { month: 'May', desktop: 209, mobile: 130 },
  { month: 'June', desktop: 214, mobile: 140 }
]

const chartConfig = {
  desktop: {
    label: 'Desktop',
    color: 'var(--chart-1)'
  },
  mobile: {
    label: 'Mobile',
    color: 'var(--chart-2)'
  }
} satisfies ChartConfig

export default function ChartPage() {
  const { t } = useTranslation()

  return (
    <div className='space-y-10'>
      <div>
        <h1 className='text-3xl font-bold tracking-tight'>Chart</h1>
        <p className='mt-2 text-muted-foreground'>{t('docs.chart.desc')}</p>
        <p className='mt-1 text-xs text-muted-foreground'>
          {t('docs.source')}: <code className='rounded bg-muted px-1 py-0.5'>src/components/ui/chart.tsx</code>
        </p>
      </div>

      <section className='space-y-4'>
        <h2 className='text-xl font-semibold'>{t('docs.whenToUse')}</h2>
        <p className='text-sm text-muted-foreground'>{t('docs.chart.whenToUse')}</p>
      </section>

      <section className='space-y-4'>
        <h2 className='text-xl font-semibold'>{t('docs.usage')}</h2>
        <ImportBlock
          code={`import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart"`}
        />
      </section>

      <section className='space-y-4'>
        <h2 className='text-xl font-semibold'>{t('docs.composition')}</h2>
        <CompositionTree tree={COMPOSITION} />
      </section>

      <section className='space-y-6'>
        <h2 className='text-xl font-semibold'>{t('docs.examples')}</h2>

        <div className='space-y-2'>
          <h3 className='text-base font-medium'>Bar Chart</h3>
          <ComponentPreview
            code={`'use client'

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"
import {
  type ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

const chartData = [
  { month: "January", desktop: 186, mobile: 80 },
  { month: "February", desktop: 305, mobile: 200 },
  { month: "March", desktop: 237, mobile: 120 },
  { month: "April", desktop: 73, mobile: 190 },
  { month: "May", desktop: 209, mobile: 130 },
  { month: "June", desktop: 214, mobile: 140 },
]

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "var(--chart-1)",
  },
  mobile: {
    label: "Mobile",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig

export function ChartDemo() {
  return (
    <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
      <BarChart data={chartData}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="month"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          tickFormatter={(value) => value.slice(0, 3)}
        />
        <ChartTooltip content={<ChartTooltipContent />} />
        <ChartLegend content={<ChartLegendContent />} />
        <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
        <Bar dataKey="mobile" fill="var(--color-mobile)" radius={4} />
      </BarChart>
    </ChartContainer>
  )
}`}
          >
            <ChartContainer config={chartConfig} className='min-h-[200px] w-full'>
              <BarChart data={chartData}>
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey='month'
                  tickLine={false}
                  tickMargin={10}
                  axisLine={false}
                  tickFormatter={value => value.slice(0, 3)}
                />
                <ChartTooltip content={<ChartTooltipContent />} />
                <ChartLegend content={<ChartLegendContent />} />
                <Bar dataKey='desktop' fill='var(--color-desktop)' radius={4} />
                <Bar dataKey='mobile' fill='var(--color-mobile)' radius={4} />
              </BarChart>
            </ChartContainer>
          </ComponentPreview>
        </div>

        <div className='space-y-2'>
          <h3 className='text-base font-medium'>With Custom Tooltip</h3>
          <ComponentPreview
            code={`'use client'

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

const chartData = [
  { month: "January", desktop: 186, mobile: 80 },
  { month: "February", desktop: 305, mobile: 200 },
  { month: "March", desktop: 237, mobile: 120 },
]

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "var(--chart-1)",
  },
  mobile: {
    label: "Mobile",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig

export function ChartCustomTooltip() {
  return (
    <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
      <BarChart data={chartData}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="month"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          tickFormatter={(value) => value.slice(0, 3)}
        />
        <ChartTooltip
          content={<ChartTooltipContent indicator="line" hideLabel />}
        />
        <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
        <Bar dataKey="mobile" fill="var(--color-mobile)" radius={4} />
      </BarChart>
    </ChartContainer>
  )
}`}
          >
            <ChartContainer config={chartConfig} className='min-h-[200px] w-full'>
              <BarChart data={chartData.slice(0, 3)}>
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey='month'
                  tickLine={false}
                  tickMargin={10}
                  axisLine={false}
                  tickFormatter={value => value.slice(0, 3)}
                />
                <ChartTooltip content={<ChartTooltipContent indicator='line' hideLabel />} />
                <Bar dataKey='desktop' fill='var(--color-desktop)' radius={4} />
                <Bar dataKey='mobile' fill='var(--color-mobile)' radius={4} />
              </BarChart>
            </ChartContainer>
          </ComponentPreview>
        </div>
      </section>

      <section className='space-y-4'>
        <h2 className='text-xl font-semibold'>{t('docs.apiReference')}</h2>
        <PropsTable title='ChartContainer' data={CONTAINER_PROPS} />
        <PropsTable title='ChartTooltipContent' data={TOOLTIP_CONTENT_PROPS} />
        <PropsTable title='ChartLegendContent' data={LEGEND_CONTENT_PROPS} />
      </section>
    </div>
  )
}
