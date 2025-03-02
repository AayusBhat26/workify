'use client';

import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Computer, Moon, Sun } from 'lucide-react';

interface Props {
  theme: 'light' | 'dark' | 'system';
  activeTheme?: string;
  onUpdateTheme: (theme: string) => void;
}
export const ThemeCard = ({ theme, activeTheme, onUpdateTheme }: Props) => {
  return (
    <Card
      tabIndex={1}
      onKeyDown={(e) => {
        if (e.key === 'Enter') {
          onUpdateTheme(theme);
        }
      }}
      onClick={() => onUpdateTheme(theme)}
      className={`${
        activeTheme === theme ? 'border-primary/50' : ''
      } w-full max-w-sm sm:max-w-lg sm:w-[calc((100%/2)-1.5rem)] xl:w-[calc((100%/3)-1.5rem)] hover:bg-accent hover:text-accent-foreground duration-200 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ring-offset-background`}
    >
      <CardHeader className="flex flex-row items-center justify-between space-x-0 space-y-0">
        <div className="flex items-center gap-2 ">
          {theme === 'light' && <Sun size={20} />}
          {theme === 'dark' && <Moon size={20} />}
          {theme === 'system' && <Computer size={20} />}
          <CardTitle className="text-xl ">
            {theme[0].toUpperCase() + theme.slice(1)} Theme
          </CardTitle>
        </div>
        {activeTheme === theme && <Badge variant={'default'}>Active</Badge>}
      </CardHeader>
      <CardContent className="h-44"></CardContent>
      <CardFooter>
        <p>Default {theme}</p>
      </CardFooter>
    </Card>
  );
};
