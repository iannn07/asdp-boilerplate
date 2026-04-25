import { Navbar } from '@/components/organisms/Navbar'
import { Sidebar } from '@/components/organisms/Sidebar'
import { DashboardContent } from './DashboardContent'

export function DashboardShell({ children }: { children: React.ReactNode }) {
  return (
    <div className='flex min-h-screen'>
      <Sidebar />
      <DashboardContent>
        <Navbar />
        <main className='flex-1 p-6'>{children}</main>
      </DashboardContent>
    </div>
  )
}
