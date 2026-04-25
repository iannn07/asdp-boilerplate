'use client'

import { useCallback, useEffect, useState } from 'react'

import { useTheme } from 'next-themes'
import { IconCheck, IconCopy } from '@tabler/icons-react'
import { codeToHtml } from 'shiki'

import { cn } from '@/lib/cn'

type CodeBlockProps = {
  code: string
  lang?: string
  className?: string
}

export function CodeBlock({ code, lang = 'tsx', className }: CodeBlockProps) {
  const [isCopied, setIsCopied] = useState(false)
  const [highlightedHtml, setHighlightedHtml] = useState<string | null>(null)
  const { resolvedTheme } = useTheme()

  useEffect(() => {
    let isMounted = true
    const theme = resolvedTheme === 'dark' ? 'github-dark' : 'github-light'

    codeToHtml(code, { lang, theme }).then(html => {
      if (isMounted) setHighlightedHtml(html)
    })

    return () => {
      isMounted = false
    }
  }, [code, lang, resolvedTheme])

  const handleCopy = useCallback(async () => {
    await navigator.clipboard.writeText(code)
    setIsCopied(true)
    setTimeout(() => setIsCopied(false), 2000)
  }, [code])

  return (
    <div className={cn('group/codeblock relative', className)}>
      <button
        type='button'
        onClick={handleCopy}
        className='absolute right-3 top-3 z-10 flex size-8 items-center justify-center rounded-md border border-border/50 bg-background/80 text-muted-foreground opacity-0 backdrop-blur-sm transition-all hover:text-foreground group-hover/codeblock:opacity-100'
        aria-label='Copy code'
      >
        {isCopied ? <IconCheck className='size-3.5' /> : <IconCopy className='size-3.5' />}
      </button>

      {highlightedHtml ? (
        <div
          className='[&_pre]:overflow-x-auto [&_pre]:rounded-lg [&_pre]:border [&_pre]:p-4 [&_pre]:text-[13px] [&_pre]:leading-relaxed'
          dangerouslySetInnerHTML={{ __html: highlightedHtml }}
        />
      ) : (
        <pre className='overflow-x-auto rounded-lg border bg-muted/50 p-4 text-[13px] leading-relaxed'>
          <code>{code}</code>
        </pre>
      )}
    </div>
  )
}
