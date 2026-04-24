import { Inter } from 'next/font/google'

import type { Metadata } from 'next'
import { ThemeProvider } from 'next-themes'

import { QueryProvider } from '@/lib/query/provider'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'ASDP Dashboard',
  description: 'ASDP Core Engine Admin Dashboard'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='id' suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute='class' defaultTheme='system' enableSystem>
          <QueryProvider>{children}</QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
