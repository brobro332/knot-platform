'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useKnot } from '../presentation/state/KnotContext';
import { DashboardPageView } from '../presentation/pages/DashboardPageView';

export default function Home() {
  const router = useRouter();
  const { currentUser } = useKnot();

  useEffect(() => {
    if (!currentUser) {
      router.replace('/login');
    }
  }, [currentUser, router]);

  if (!currentUser) {
    return null;
  }

  return <DashboardPageView />;
}
