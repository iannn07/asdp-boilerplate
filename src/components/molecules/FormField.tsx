import { forwardRef } from 'react'

import type { ComponentPropsWithoutRef } from 'react'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/cn'

type FormFieldProps = ComponentPropsWithoutRef<'input'> & {
  label: string
  id: string
  error?: string
}

export const FormField = forwardRef<HTMLInputElement, FormFieldProps>(
  ({ label, id, error, className, ...props }, ref) => (
    <div className='flex flex-col gap-1.5'>
      <Label htmlFor={id}>{label}</Label>
      <Input
        ref={ref}
        id={id}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
        className={cn(error && 'border-destructive', className)}
        {...props}
      />
      {error && (
        <p id={`${id}-error`} role='alert' className='text-sm text-destructive'>
          {error}
        </p>
      )}
    </div>
  )
)
FormField.displayName = 'FormField'
