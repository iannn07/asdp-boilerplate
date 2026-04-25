'use client'

import { useCallback, useState } from 'react'

import { IconCheck, IconCopy } from '@tabler/icons-react'

type ImportBlockProps = {
  code: string
}

export function ImportBlock({ code }: ImportBlockProps) {
  const [isCopied, setIsCopied] = useState(false)

  const handleCopy = useCallback(async () => {
    await navigator.clipboard.writeText(code)
    setIsCopied(true)
    setTimeout(() => setIsCopied(false), 2000)
  }, [code])

  return (
    <div className='group/import relative'>
      <button
        type='button'
        onClick={handleCopy}
        className='absolute right-3 top-1/2 z-10 flex size-7 -translate-y-1/2 items-center justify-center rounded-md text-muted-foreground opacity-0 transition-all hover:text-foreground group-hover/import:opacity-100'
        aria-label='Copy import'
      >
        {isCopied ? <IconCheck className='size-3.5' /> : <IconCopy className='size-3.5' />}
      </button>
      <pre className='overflow-x-auto rounded-lg border bg-muted/50 px-4 py-3 text-[13px] leading-relaxed'>
        <code>{code}</code>
      </pre>
    </div>
  )
}
