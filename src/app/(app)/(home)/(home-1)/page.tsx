import * as React from 'react';
import type { Metadata } from 'next';

import { config } from '@/config';
import { SignInForm } from '@/components/auth/sign-in-form';
//import { GuestGuard } from '@/components/auth/guest-guard';
import { SplitLayout } from '@/components/auth/split-layout';

export const metadata: Metadata = { title: `Sign in | Custom | Auth | ${config.site.name}` };

export default function Page(): React.JSX.Element {

  console.log("RENDER HOME PAGE");

  return (
      <SplitLayout>
         <SignInForm />
      </SplitLayout>
  );
}
