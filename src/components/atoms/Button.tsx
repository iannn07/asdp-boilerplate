import { forwardRef } from 'react'
import { Button as ShadcnButton } from '@/components/ui/button'
import type { ComponentPropsWithoutRef } from 'react'
import { Spinner } from './Spinner'

type ButtonProps = ComponentPropsWithoutRef<typeof ShadcnButton> & {
  loading?: boolean
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ loading, disabled, children, ...props }, ref) => (
    <ShadcnButton ref={ref} disabled={disabled || loading} {...props}>
      {loading && <Spinner size="sm" className="mr-2" />}
      {children}
    </ShadcnButton>
  ),
)
Button.displayName = 'Button'
