import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'

import { AuthLayout } from '../AuthLayout'

describe('AuthLayout', () => {
  it('renders children inside centered container', () => {
    render(
      <AuthLayout>
        <p>Login form</p>
      </AuthLayout>
    )
    expect(screen.getByText('Login form')).toBeInTheDocument()
  })
})
