'use client';

import { useState, useEffect } from 'react';

import LoadingPage from '@/components/loading-page';
import MenuPage from '@/components/menu-page';

export default function LandingPage() {
  const [isLoaded, setIsLoaded] = useState(false);

  const load = async () => {
    setTimeout(() => {
      setIsLoaded(true);
    }, 5000);
  };

  useEffect(() => {
    load();
  }, []);

  return(
    isLoaded ? <MenuPage /> : <LoadingPage />
  );
}
