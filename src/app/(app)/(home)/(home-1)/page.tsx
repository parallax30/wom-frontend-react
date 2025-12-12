import * as React from 'react';
import type { Metadata } from 'next';

import { config } from '@/config';
import { SignInForm } from '@/components/auth/sign-in-form';
import { SplitLayout } from '@/components/auth/split-layout';

import { getLogin } from "@/services/apiService";

export const metadata: Metadata = { title: `Sign in | Custom | Auth | ${config.site.name}` };

export default async function Page(): Promise<React.JSX.Element> {

  console.log("RENDER HOME PAGE");
  const response = await getLogin({ populate: "*" });
  const cmsData = response?.data?.data; 

  return (
      <SplitLayout cms={cmsData}>
         <SignInForm cms={cmsData}/>
      </SplitLayout>
  );
}
