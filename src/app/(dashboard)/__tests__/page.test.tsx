import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'

vi.mock('@/components/organisms/PageHeader', () => ({
  PageHeader: ({ title }: { title: string }) => <h1>{title}</h1>
}))
vi.mock('@/components/molecules/StatCard', () => ({
  StatCard: ({ title }: { title: string }) => <div>{title}</div>
}))

import DashboardPage from '../dashboard/page'

describe('DashboardPage', () => {
  it('renders Dashboard heading', () => {
    render(<DashboardPage />)
    expect(screen.getByRole('heading', { name: /dashboard/i })).toBeInTheDocument()
  })
})
