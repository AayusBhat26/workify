'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { LoadingState } from '@/components/ui/loadingState';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { ThemeCard } from './ThemeCard';

export const Theme = () => {
  const [isMounted, setIsMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const [currentView, setCurrentView] = useState(1);
  useEffect(() => {
    setIsMounted(true);
  }, []);
  if (!isMounted) {
    return (
      <div>
        <LoadingState className="w-12 h-12" />
      </div>
    );
  }
  const views = [1, 2, 3];
  return (
    <Card className=" bg-background border-none shadow-none">
      <CardHeader>
        <CardTitle>Theme</CardTitle>
        <CardDescription className="flex flex-row gap-6">
          select theme.
        </CardDescription>
      </CardHeader>
      {/* <div className="flex flex-row gap-10">
        {views.map((view) => view === 1 && <p classname>view 1</p>)}
      </div> */}
      <CardContent className="flex flex-wrap justify-center gap-6">
        <ThemeCard onUpdateTheme={setTheme} theme="light" activeTheme={theme} />
        <ThemeCard onUpdateTheme={setTheme} theme="dark" activeTheme={theme} />
        <ThemeCard
          onUpdateTheme={setTheme}
          theme="system"
          activeTheme={theme}
        />
      </CardContent>
    </Card>
  );
};
