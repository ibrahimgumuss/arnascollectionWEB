'use client';

import { SiteProvider } from '@/context/SiteContext';
import { ReactNode } from 'react';

export default function Providers({ children }: { children: ReactNode }) {
    return <SiteProvider>{children}</SiteProvider>;
}
