import { render } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { Skeleton } from '../Skeleton'

describe('Skeleton', () => {
  it('renders with animate-pulse class', () => {
    const { container } = render(<Skeleton className="h-4 w-24" />)
    expect(container.firstChild).toHaveClass('animate-pulse')
  })
})
