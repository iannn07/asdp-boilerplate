import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'

import { PageHeader } from '../PageHeader'

describe('PageHeader', () => {
  it('renders title', () => {
    render(<PageHeader title='Users' />)
    expect(screen.getByRole('heading', { name: 'Users' })).toBeInTheDocument()
  })

  it('renders description when provided', () => {
    render(<PageHeader title='Users' description='Manage users' />)
    expect(screen.getByText('Manage users')).toBeInTheDocument()
  })

  it('renders actions slot', () => {
    render(<PageHeader title='Users' actions={<button>Add User</button>} />)
    expect(screen.getByRole('button', { name: 'Add User' })).toBeInTheDocument()
  })
})
