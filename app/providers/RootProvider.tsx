'use client';

import type { PropsWithChildren } from 'react';
import { ThemeProvider } from 'next-themes';
import NextAuthProvider from './NextAuthProvider';

export default function RootProvider({ children }: PropsWithChildren) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <NextAuthProvider>{children}</NextAuthProvider>
    </ThemeProvider>
  );
}
