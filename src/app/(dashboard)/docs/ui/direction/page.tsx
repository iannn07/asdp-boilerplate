'use client'

import { useTranslation } from '@/lib/i18n/useTranslation'

import { DirectionProvider } from '@/components/ui/direction'
import { ComponentPreview } from '../../_components/ComponentPreview'
import { ImportBlock } from '../../_components/ImportBlock'
import { PropsTable } from '../../_components/PropsTable'

const PROVIDER_PROPS = [
  { prop: 'direction', type: '"ltr" | "rtl"', default: '"ltr"' },
  { prop: 'children', type: 'React.ReactNode', default: '-' }
]

export default function DirectionPage() {
  const { t } = useTranslation()

  return (
    <div className='space-y-10'>
      <div>
        <h1 className='text-3xl font-bold tracking-tight'>Direction</h1>
        <p className='mt-2 text-muted-foreground'>{t('docs.direction.desc')}</p>
        <p className='mt-1 text-xs text-muted-foreground'>
          {t('docs.source')}: <code className='rounded bg-muted px-1 py-0.5'>src/components/ui/direction.tsx</code>
        </p>
      </div>

      <section className='space-y-4'>
        <h2 className='text-xl font-semibold'>{t('docs.whenToUse')}</h2>
        <p className='text-sm text-muted-foreground'>{t('docs.direction.whenToUse')}</p>
      </section>

      <section className='space-y-4'>
        <h2 className='text-xl font-semibold'>{t('docs.usage')}</h2>
        <ImportBlock code={`import { DirectionProvider, useDirection } from "@/components/ui/direction"`} />
      </section>

      <section className='space-y-6'>
        <h2 className='text-xl font-semibold'>{t('docs.examples')}</h2>

        <div className='space-y-2'>
          <h3 className='text-base font-medium'>LTR (Left-to-Right)</h3>
          <ComponentPreview
            code={`import { DirectionProvider } from "@/components/ui/direction"

export function DirectionLtr() {
  return (
    <DirectionProvider direction="ltr">
      <div className="rounded-2xl border p-4 text-sm" dir="ltr">
        <p className="font-medium">Left-to-Right</p>
        <p className="text-muted-foreground">
          This content flows from left to right. This is the default
          direction for most Latin-script languages.
        </p>
      </div>
    </DirectionProvider>
  )
}`}
          >
            <DirectionProvider direction='ltr'>
              <div className='rounded-2xl border p-4 text-sm' dir='ltr'>
                <p className='font-medium'>Left-to-Right</p>
                <p className='text-muted-foreground'>
                  This content flows from left to right. This is the default direction for most Latin-script languages.
                </p>
              </div>
            </DirectionProvider>
          </ComponentPreview>
        </div>

        <div className='space-y-2'>
          <h3 className='text-base font-medium'>RTL (Right-to-Left)</h3>
          <ComponentPreview
            code={`import { DirectionProvider } from "@/components/ui/direction"

export function DirectionRtl() {
  return (
    <DirectionProvider direction="rtl">
      <div className="rounded-2xl border p-4 text-sm" dir="rtl">
        <p className="font-medium">\u0645\u0646 \u0627\u0644\u064A\u0645\u064A\u0646 \u0625\u0644\u0649 \u0627\u0644\u064A\u0633\u0627\u0631</p>
        <p className="text-muted-foreground">
          \u0647\u0630\u0627 \u0627\u0644\u0645\u062D\u062A\u0648\u0649 \u064A\u062A\u062F\u0641\u0642 \u0645\u0646 \u0627\u0644\u064A\u0645\u064A\u0646 \u0625\u0644\u0649 \u0627\u0644\u064A\u0633\u0627\u0631. \u0647\u0630\u0627 \u0647\u0648 \u0627\u0644\u0627\u062A\u062C\u0627\u0647 \u0627\u0644\u0627\u0641\u062A\u0631\u0627\u0636\u064A \u0644\u0644\u063A\u0629 \u0627\u0644\u0639\u0631\u0628\u064A\u0629.
        </p>
      </div>
    </DirectionProvider>
  )
}`}
          >
            <DirectionProvider direction='rtl'>
              <div className='rounded-2xl border p-4 text-sm' dir='rtl'>
                <p className='font-medium'>من اليمين إلى اليسار</p>
                <p className='text-muted-foreground'>
                  هذا المحتوى يتدفق من اليمين إلى اليسار. هذا هو الاتجاه الافتراضي للغة العربية.
                </p>
              </div>
            </DirectionProvider>
          </ComponentPreview>
        </div>

        <div className='space-y-2'>
          <h3 className='text-base font-medium'>Mixed Directions</h3>
          <ComponentPreview
            code={`import { DirectionProvider } from "@/components/ui/direction"

export function DirectionMixed() {
  return (
    <div className="space-y-4">
      <DirectionProvider direction="ltr">
        <div className="rounded-2xl border p-4 text-sm" dir="ltr">
          <p className="font-medium">English (LTR)</p>
          <p className="text-muted-foreground">
            This section uses left-to-right direction.
          </p>
        </div>
      </DirectionProvider>
      <DirectionProvider direction="rtl">
        <div className="rounded-2xl border p-4 text-sm" dir="rtl">
          <p className="font-medium">\u0639\u0631\u0628\u064A (RTL)</p>
          <p className="text-muted-foreground">
            \u0647\u0630\u0627 \u0627\u0644\u0642\u0633\u0645 \u064A\u0633\u062A\u062E\u062F\u0645 \u0627\u062A\u062C\u0627\u0647 \u0645\u0646 \u0627\u0644\u064A\u0645\u064A\u0646 \u0625\u0644\u0649 \u0627\u0644\u064A\u0633\u0627\u0631.
          </p>
        </div>
      </DirectionProvider>
    </div>
  )
}`}
          >
            <div className='space-y-4'>
              <DirectionProvider direction='ltr'>
                <div className='rounded-2xl border p-4 text-sm' dir='ltr'>
                  <p className='font-medium'>English (LTR)</p>
                  <p className='text-muted-foreground'>This section uses left-to-right direction.</p>
                </div>
              </DirectionProvider>
              <DirectionProvider direction='rtl'>
                <div className='rounded-2xl border p-4 text-sm' dir='rtl'>
                  <p className='font-medium'>عربي (RTL)</p>
                  <p className='text-muted-foreground'>هذا القسم يستخدم اتجاه من اليمين إلى اليسار.</p>
                </div>
              </DirectionProvider>
            </div>
          </ComponentPreview>
        </div>
      </section>

      <section className='space-y-4'>
        <h2 className='text-xl font-semibold'>{t('docs.apiReference')}</h2>
        <PropsTable title='DirectionProvider' data={PROVIDER_PROPS} />
      </section>
    </div>
  )
}
