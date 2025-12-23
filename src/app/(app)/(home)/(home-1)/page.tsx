import * as React from 'react';
import type { Metadata } from 'next';

import { config } from '@/config';
import { SignInForm } from '@/components/auth/sign-in-form';
import { SplitLayout } from '@/components/auth/split-layout';

import { getGlobal, getLogin } from "@/services/apiService";
import { richTextToReact } from '@/utils/richText';
import { get } from 'lodash';

export const metadata: Metadata = { title: `Sign in | Custom | Auth | ${config.site.name}` };

export default async function Page(): Promise<React.JSX.Element> {


  const responseGlobal = await getGlobal({});
  const globalData = responseGlobal?.data?.data;
  const logoGrande =
  globalData.headerImage.url ?? null;



  const response = await getLogin({ populate: "*" });

  const rawCms = response?.data?.data;
  const cmsData = rawCms
  ? {
      ...rawCms,
      loginParagraphLeft: richTextToReact(rawCms.loginParagraphLeft),
      loginParagraphAgreement: richTextToReact(rawCms.loginParagraphAgreement),
      logoGrande

    }
  : null; 

  return (
      <SplitLayout cms={cmsData}>
         <SignInForm cms={cmsData}/>
      </SplitLayout>
  );
}
