import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'

vi.mock('@/components/templates/AuthLayout', () => ({
  AuthLayout: ({ children }: { children: React.ReactNode }) => <div>{children}</div>
}))
vi.mock('../actions', () => ({
  loginAction: vi.fn().mockResolvedValue({ success: false, errors: { email: 'Email is required' } })
}))

import LoginPage from '../page'

describe('LoginPage', () => {
  it('renders email and password fields', () => {
    render(<LoginPage />)
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument()
  })

  it('renders submit button', () => {
    render(<LoginPage />)
    expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument()
  })

  it('shows validation error on empty submit', async () => {
    render(<LoginPage />)
    await userEvent.click(screen.getByRole('button', { name: /login/i }))
    expect(await screen.findByText(/email is required/i)).toBeInTheDocument()
  })
})
