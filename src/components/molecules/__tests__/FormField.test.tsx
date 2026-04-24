import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { FormField } from '../FormField'

describe('FormField', () => {
  it('renders label and input', () => {
    render(<FormField label="Email" id="email" />)
    expect(screen.getByLabelText('Email')).toBeInTheDocument()
  })

  it('renders error message when provided', () => {
    render(<FormField label="Email" id="email" error="Invalid email" />)
    expect(screen.getByText('Invalid email')).toBeInTheDocument()
    expect(screen.getByRole('textbox')).toHaveAttribute('aria-invalid', 'true')
  })

  it('renders without error when no error prop', () => {
    render(<FormField label="Name" id="name" />)
    expect(screen.queryByRole('alert')).not.toBeInTheDocument()
  })
})
