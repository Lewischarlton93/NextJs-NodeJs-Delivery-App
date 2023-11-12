import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import ThemeRegistry from '../Theme/ThemeRegistry'
import NavBar from '../src/Components/UI/Nav/NavBar'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Deliveroo App',
  description: ''
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeRegistry options={{ key: 'mui-theme' }}>
          <NavBar />
          {children}
        </ThemeRegistry>
      </body>
    </html>
  )
}
