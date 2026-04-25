import Link from 'next/link'

import { IconLayoutDashboard, IconUsers, IconComponents } from '@tabler/icons-react'

const SECTIONS = [
  {
    title: 'Dashboard',
    description: 'Admin dashboard with stat cards, sidebar navigation, and sample data views.',
    href: '/dashboard',
    icon: IconLayoutDashboard
  },
  {
    title: 'Users',
    description: 'Example feature module demonstrating DataTable with user management and role badges.',
    href: '/users',
    icon: IconUsers
  },
  {
    title: 'Component Docs',
    description: 'Browse all UI components with live previews, code examples, and API references.',
    href: '/docs/ui',
    icon: IconComponents
  }
]

export default function Home() {
  return (
    <div className='flex min-h-screen flex-col items-center justify-center px-6 py-20'>
      <div className='mx-auto w-full max-w-2xl space-y-12 text-center'>
        <div className='space-y-4'>
          <h1 className='text-4xl font-bold tracking-tight'>ASDP Core Engine</h1>
          <p className='text-lg text-muted-foreground'>
            A production-ready Next.js boilerplate with shadcn/ui, TailwindCSS, TanStack Table, and Zustand.
            Start building features immediately.
          </p>
        </div>

        <div className='grid gap-4 sm:grid-cols-3'>
          {SECTIONS.map(section => (
            <Link
              key={section.href}
              href={section.href}
              className='group flex flex-col items-center gap-3 rounded-xl border p-6 text-center transition-all hover:border-foreground/20 hover:bg-muted/50 hover:shadow-sm'
            >
              <section.icon className='size-8 text-muted-foreground transition-colors group-hover:text-foreground' />
              <h2 className='text-base font-semibold'>{section.title}</h2>
              <p className='text-sm text-muted-foreground'>{section.description}</p>
            </Link>
          ))}
        </div>

        <p className='text-xs text-muted-foreground'>
          Built with Next.js 16 &middot; React 19 &middot; TypeScript &middot; TailwindCSS v4
        </p>
      </div>
    </div>
  )
}
