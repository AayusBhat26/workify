'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useState, useTransition } from 'react';

export const changeLanguage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const pathname = usePathname();
  const onSelectChange = (nextLocale: 'hi' | 'en') => {
    setIsLoading(true);
    startTransition(() => {
      (pathname, nextLocale);

      router.replace(`/${nextLocale}`);
    });
  };
  return { isLoading, isPending, onSelectChange };
};
