import { cn } from '@/lib/cn'

type SpinnerProps = { size?: 'sm' | 'md' | 'lg'; className?: string }

const sizeMap = { sm: 'h-4 w-4', md: 'h-6 w-6', lg: 'h-8 w-8' }

export function Spinner({ size = 'md', className }: SpinnerProps) {
  return (
    <span
      role='status'
      data-testid='spinner'
      className={cn(
        'inline-block animate-spin rounded-full border-2 border-current border-t-transparent',
        sizeMap[size],
        className
      )}
      aria-label='Loading'
    />
  )
}
