'use client';

import { usePathname } from 'next/navigation';
import { Settings } from './Settings';

export const OptionsSidebar = () => {
  const pathname = usePathname();
  if (pathname === '/dashboard') return null;

  return (
    <div className="border-r w-64 h-full p-4 sm:py-6">
      {pathname.includes('/dashboard/settings') && <Settings />}
    </div>
  );
};
