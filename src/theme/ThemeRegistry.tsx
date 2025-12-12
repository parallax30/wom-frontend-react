"use client";

import { ReactNode, useState } from "react";
import { CacheProvider } from "@emotion/react";
import createEmotionCache from "../createEmotionCache";

export default function ThemeRegistry({ children }: { children: ReactNode }) {
  const [cache] = useState(createEmotionCache);
  return <CacheProvider value={cache}>{children}</CacheProvider>;
}
