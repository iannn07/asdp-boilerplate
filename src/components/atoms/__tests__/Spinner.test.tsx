import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'

import { Spinner } from '../Spinner'

describe('Spinner', () => {
  it('renders with accessible role status', () => {
    render(<Spinner />)
    expect(screen.getByRole('status')).toBeInTheDocument()
  })

  it('accepts size prop', () => {
    render(<Spinner size='lg' />)
    const el = screen.getByRole('status')

    expect(el.className).toContain('h-8')
  })
})
