import { Inter } from 'next/font/google'

import type { Metadata } from 'next'
import { ThemeProvider } from 'next-themes'

import { TooltipProvider } from '@/components/ui/tooltip'

import { QueryProvider } from '@/lib/query/provider'
import { cn } from '@/lib/cn'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' })

export const metadata: Metadata = {
  title: 'ASDP Dashboard',
  description: 'ASDP Core Engine Admin Dashboard'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en' className={cn('h-full antialiased', inter.variable)} suppressHydrationWarning>
      <body className='min-h-full flex flex-col'>
        <ThemeProvider attribute='data-theme' defaultTheme='system' enableSystem>
          <TooltipProvider>
            <QueryProvider>{children}</QueryProvider>
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
