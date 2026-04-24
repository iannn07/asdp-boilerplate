import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'

vi.mock('@/components/organisms/Sidebar', () => ({ Sidebar: () => <nav>Sidebar</nav> }))
vi.mock('@/components/organisms/Navbar', () => ({ Navbar: () => <header>Navbar</header> }))

import { DashboardShell } from '../DashboardShell'

describe('DashboardShell', () => {
  it('renders children in main content area', () => {
    render(
      <DashboardShell locale="en">
        <p>Content</p>
      </DashboardShell>,
    )
    expect(screen.getByText('Content')).toBeInTheDocument()
  })

  it('renders Sidebar and Navbar', () => {
    render(<DashboardShell locale="en"><p>x</p></DashboardShell>)
    expect(screen.getByText('Sidebar')).toBeInTheDocument()
    expect(screen.getByText('Navbar')).toBeInTheDocument()
  })
})
