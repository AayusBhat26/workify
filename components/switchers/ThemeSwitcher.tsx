// components/switchers/ThemeSwitcher.tsx
'use client';
import { HoverCard } from '@radix-ui/react-hover-card';
import { motion } from 'framer-motion';
import { Monitor, Moon, Sun } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useTheme } from 'next-themes';
import { Button } from '../ui/button';
interface Props {
  variant?:
    | 'default'
    | 'destructive'
    | 'outline'
    | 'secondary'
    | 'ghost'
    | 'link'
    | null;
  size?: 'default' | 'sm' | 'lg' | 'icon' | null;
  alignHover?: 'center' | 'start' | 'end';
  alignDropDown?: 'center' | 'start' | 'end';
  textSize?: 'text-lg' | 'text-base';
}
export const ThemeSwitcher = ({
  size = 'default',
  variant = 'default',
  alignHover = 'center',
  alignDropDown = 'center',
}: // textSize = 'text-base',
Props) => {
  const { theme, setTheme } = useTheme();
  const t = useTranslations('COMMON');
  return (
    <HoverCard openDelay={250} closeDelay={250}>
      <div className="flex items-center gap-1 p-1 rounded-full bg-card dark:bg-card-dark border border-border">
        <Button
          size="sm"
          variant="ghost"
          onClick={() => setTheme('light')}
          className={`rounded-full ${
            theme === 'light'
              ? 'bg-primary text-primary-foreground'
              : 'text-foreground'
          }`}
        >
          <motion.div
            animate={{ rotate: theme === 'light' ? 0 : 180 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <Sun className="h-4 w-4" />
          </motion.div>
        </Button>

        <Button
          size="sm"
          variant="ghost"
          onClick={() => setTheme('system')}
          className={`rounded-full ${
            theme === 'system'
              ? 'bg-primary text-primary-foreground'
              : 'text-foreground'
          }`}
        >
          <Monitor className="h-4 w-4" />
        </Button>

        <Button
          size="sm"
          variant="ghost"
          onClick={() => setTheme('dark')}
          className={`rounded-full ${
            theme === 'dark'
              ? 'bg-primary text-primary-foreground'
              : 'text-foreground'
          }`}
        >
          <motion.div
            animate={{ rotate: theme === 'dark' ? 0 : 180 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <Moon className="h-4 w-4" />
          </motion.div>
        </Button>
      </div>
    </HoverCard>
  );
};
