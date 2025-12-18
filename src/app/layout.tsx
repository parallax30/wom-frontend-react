import '@/styles/tailwind.css'
import { Metadata } from 'next'
import ThemeProvider from './theme-provider'
import { UserProvider } from '@/contexts/auth/user-context'
import { getGlobal } from '@/services/apiService'
import ThemeRegistry from './theme-registry'

export async function generateMetadata(): Promise<Metadata> {

  const globalResponse = await getGlobal()
  const global = globalResponse?.data?.data

  const faviconUrl = global?.favicon?.url
    ? `${process.env.NEXT_PUBLIC_API_URL}${global.favicon.url}`
    : '/favicon.ico'

  return {
    title: {
      template: '',
      default: 'Wom - Investor Portal',
    },
    description: global?.pageDescription ?? 'Wom - Investor Portal',
    keywords: ['Wom', 'Investor', 'Portal', 'News'],
    icons: {
      icon: { url: faviconUrl,
      type: 'image/jpeg'  },
    },
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body>
        <ThemeRegistry>
          {children}
        </ThemeRegistry>
      </body>
    </html>
  );
}
