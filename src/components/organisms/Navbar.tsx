'use client'
import { IconMenu2 } from '@tabler/icons-react'

import { Button } from '@/components/atoms/Button'
import { ThemeToggle } from '@/components/molecules/ThemeToggle'
import { LocaleSwitcher } from '@/components/molecules/LocaleSwitcher'
import { useUIStore } from '@/store/ui.store'

export function Navbar() {
  const toggleSidebar = useUIStore(s => s.toggleSidebar)

  return (
    <header className='sticky top-0 z-40 flex h-14 items-center gap-4 border-b bg-background px-4'>
      <Button variant='ghost' size='icon' onClick={toggleSidebar} aria-label='Toggle sidebar'>
        <IconMenu2 className='h-5 w-5' />
      </Button>
      <div className='ml-auto flex items-center gap-2'>
        <LocaleSwitcher />
        <ThemeToggle />
      </div>
    </header>
  )
}
