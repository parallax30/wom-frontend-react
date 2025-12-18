'use client';

import * as React from 'react';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import type { SerializedStyles } from '@emotion/utils';
import { useServerInsertedHTML } from 'next/navigation';
import type { StyleSheet } from '@emotion/sheet';


export default function ThemeRegistry({
  children,
}: {
  children: React.ReactNode;
}) {
  const [{ cache, flush }] = React.useState(() => {
    const cache = createCache({ key: 'mui', prepend: true });
    cache.compat = true;

    const prevInsert = cache.insert;
    let inserted: string[] = [];

    cache.insert = (
        selector: string,
        serialized: SerializedStyles,
        sheet: StyleSheet,
        shouldCache: boolean
        ) => {
        if (cache.inserted[serialized.name] === undefined) {
            inserted.push(serialized.name);
        }
        return prevInsert(selector, serialized, sheet, shouldCache);
     };


    const flush = () => {
      const prevInserted = inserted;
      inserted = [];
      return prevInserted;
    };

    return { cache, flush };
  });

  useServerInsertedHTML(() => {
    const names = flush();
    if (names.length === 0) return null;

    return (
      <style
        data-emotion={`mui ${names.join(' ')}`}
        dangerouslySetInnerHTML={{
          __html: names.map((name) => cache.inserted[name]).join(''),
        }}
      />
    );
  });

  return <CacheProvider value={cache}>{children}</CacheProvider>;
}
