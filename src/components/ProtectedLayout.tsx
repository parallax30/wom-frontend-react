'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getMe } from '@/services/auth';

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [ready, setReady] = useState(false);

  console.log('🔒 PROTECTED LAYOUT RENDER');

  useEffect(() => {
    const validate = async () => {
      const user = await getMe();

      if (!user) return router.replace('/login');
      if (user.blocked) return router.replace('/blocked');
      if (!user.confirmed) return router.replace('/pending-validation');

      setReady(true);
    };

    validate();
  }, []);

  if (!ready) return null;

  return <>{children}</>;
}
