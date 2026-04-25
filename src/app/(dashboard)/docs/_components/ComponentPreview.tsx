'use client'

import { useState } from 'react'

import { IconCode, IconChevronDown } from '@tabler/icons-react'

import { cn } from '@/lib/cn'
import { useTranslation } from '@/lib/i18n/useTranslation'
import { CodeBlock } from './CodeBlock'

type ComponentPreviewProps = {
  children: React.ReactNode
  code: string
  className?: string
}

export function ComponentPreview({ children, code, className }: ComponentPreviewProps) {
  const [isCodeVisible, setIsCodeVisible] = useState(false)
  const { t } = useTranslation()

  return (
    <div className='rounded-lg border'>
      <div className={cn('flex min-h-[120px] items-center justify-center p-8', className)}>
        {children}
      </div>

      <div className='border-t'>
        <button
          type='button'
          onClick={() => setIsCodeVisible(prev => !prev)}
          className='flex w-full items-center justify-center gap-1.5 px-4 py-2.5 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground'
        >
          <IconCode className='size-3.5' />
          {isCodeVisible ? t('docs.hideCode') : t('docs.showCode')}
          <IconChevronDown
            className={cn('size-3 transition-transform', isCodeVisible && 'rotate-180')}
          />
        </button>

        {isCodeVisible && (
          <CodeBlock code={code} className='[&_pre]:rounded-none [&_pre]:rounded-b-lg [&_pre]:border-0 [&_pre]:border-t' />
        )}
      </div>
    </div>
  )
}
