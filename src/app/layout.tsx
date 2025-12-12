import '@/styles/tailwind.css'
import { Metadata } from 'next'
import { Be_Vietnam_Pro } from 'next/font/google'
import ThemeProvider from './theme-provider'
import { UserProvider } from '@/contexts/auth/user-context'



export const metadata: Metadata = {
  title: {
    template: '',
    default: 'Ncmaz - Blog, News, Magazine template',
  },
  description: 'Ncmaz - Blog, News, Magazine template',
  keywords: ['Ncmaz', 'Blog', 'News', 'Magazine'],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-white text-base text-neutral-900 dark:bg-neutral-900 dark:text-neutral-200">
        <ThemeProvider>
          <UserProvider>
            {children}
          </UserProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
