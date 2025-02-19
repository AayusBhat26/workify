'use client';

import { usePathname } from 'next/navigation';

export const Welcome = () => {
  const pathname = usePathname();
  if (pathname === '/en/dashboard' || pathname === '/hi/dashboard') {
    return (
      <div className=" space-y-1">
        <p className="font-bold text-3xl">Hey, aayush</p>
        <p className="text-muted-foreground max-w-sm sm:max-w-xl">
          Welcome to Workify
        </p>
      </div>
    );
  }
};
