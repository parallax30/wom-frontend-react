import { ApplicationLayout } from '@/app/(app)/application-layout'
import { ReactNode } from 'react'
import { UserProvider } from '@/contexts/auth/user-context';

interface Props {
  children: ReactNode
}

const Layout: React.FC<Props> = ({ children }) => {
  return (
    <div
      style={{
        display: 'flex',
        minHeight: '100vh',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem'
      }}
    >
      {children}
    </div>
  );
}

export default Layout
