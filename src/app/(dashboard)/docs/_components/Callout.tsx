import { IconInfoCircle, IconBulb } from '@tabler/icons-react'

import { cn } from '@/lib/cn'

type CalloutProps = {
  variant?: 'info' | 'recommendation'
  children: React.ReactNode
  className?: string
}

const VARIANT_STYLES = {
  info: 'border-blue-200 bg-blue-50/50 text-blue-900 dark:border-blue-900/50 dark:bg-blue-950/30 dark:text-blue-200',
  recommendation:
    'border-amber-200 bg-amber-50/50 text-amber-900 dark:border-amber-900/50 dark:bg-amber-950/30 dark:text-amber-200'
}

const VARIANT_ICONS = {
  info: IconInfoCircle,
  recommendation: IconBulb
}

export function Callout({ variant = 'info', children, className }: CalloutProps) {
  const Icon = VARIANT_ICONS[variant]

  return (
    <div className={cn('flex gap-3 rounded-lg border p-4 text-sm leading-relaxed', VARIANT_STYLES[variant], className)}>
      <Icon className='mt-0.5 size-4 shrink-0' />
      <div>{children}</div>
    </div>
  )
}
