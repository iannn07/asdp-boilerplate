'use client'

import { useTranslation } from '@/lib/i18n/useTranslation'

import { ThemeToggle } from '@/components/molecules/ThemeToggle'
import { ComponentPreview } from '../../_components/ComponentPreview'
import { ImportBlock } from '../../_components/ImportBlock'
import { CodeBlock } from '../../_components/CodeBlock'

export default function ThemeTogglePage() {
  const { t } = useTranslation()

  return (
    <div className='space-y-10'>
      <div>
        <h1 className='text-3xl font-bold tracking-tight'>Theme Toggle</h1>
        <p className='mt-2 text-muted-foreground'>{t('docs.themeToggle.desc')}</p>
        <p className='mt-1 text-xs text-muted-foreground'>
          {t('docs.source')}:{' '}
          <code className='rounded bg-muted px-1 py-0.5'>src/components/molecules/ThemeToggle.tsx</code>
        </p>
      </div>

      <section className='space-y-3'>
        <h2 className='text-xl font-semibold'>{t('docs.whenToUse')}</h2>
        <p className='text-sm text-muted-foreground'>{t('docs.themeToggle.whenToUse')}</p>
      </section>

      <section className='space-y-4'>
        <h2 className='text-xl font-semibold'>{t('docs.usage')}</h2>
        <ImportBlock code={`import { ThemeToggle } from "@/components/molecules/ThemeToggle"`} />
        <CodeBlock code={`<ThemeToggle />`} />
      </section>

      <section className='space-y-6'>
        <h2 className='text-xl font-semibold'>{t('docs.examples')}</h2>

        <div className='space-y-2'>
          <h3 className='text-base font-medium'>Default</h3>
          <p className='text-sm text-muted-foreground'>{t('docs.themeToggle.defaultDesc')}</p>
          <ComponentPreview
            code={`'use client'

import { ThemeToggle } from "@/components/molecules/ThemeToggle"

export function ThemeToggleDefault() {
  return <ThemeToggle />
}`}
          >
            <ThemeToggle />
          </ComponentPreview>
        </div>
      </section>

      <section className='space-y-4'>
        <h2 className='text-xl font-semibold'>{t('docs.dependencies')}</h2>
        <p className='text-sm text-muted-foreground'>{t('docs.themeToggle.depDesc')}</p>
        <CodeBlock
          code={`// Root layout setup (already configured)
import { ThemeProvider } from "next-themes"

export default function RootLayout({ children }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      {children}
    </ThemeProvider>
  )
}`}
        />
      </section>
    </div>
  )
}
