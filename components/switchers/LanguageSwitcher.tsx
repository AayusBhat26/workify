'use client';

import { usePathname, useRouter } from '@/navigation';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@radix-ui/react-dropdown-menu';
import { HoverCard, HoverCardContent } from '@radix-ui/react-hover-card';
import { motion } from 'framer-motion';
import { Globe } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import { useTheme } from 'next-themes';
import { startTransition, useEffect, useState } from 'react';
import { Button } from '../ui/button';
import { LoadingState } from '../ui/loadingState';

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

export const LanguageSwitcher = ({
  size = 'default',
  variant = 'default',
  alignHover = 'center',
  alignDropDown = 'center',
  textSize = 'text-base',
}: Props) => {
  const { theme } = useTheme();
  const locale = useLocale();
  const [isLoading, setIsLoading] = useState(false);
  const [mounted, setMounted] = useState(false);
  const router = useRouter();
  const path = usePathname();

  useEffect(() => {
    setMounted(true);
  }, []);

  function changeLanguage(nextLocale: 'hi' | 'en') {
    setIsLoading(true);
    startTransition(() => {
      router.replace(path, { locale: nextLocale });
      setIsLoading(false);
    });
  }

  const t = useTranslations('COMMON');
  //   if (!mounted) return null;
  return (
    <HoverCard openDelay={250} closeDelay={250}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            disabled={isLoading}
            variant={variant}
            size={'icon'}
            className={textSize}
            suppressHydrationWarning
          >
            {isLoading ? (
              <LoadingState className="h-4 w-4" />
            ) : (
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <Globe className={`h-4 w-4 transition-transform`} />
                <span className="sr-only">{t('LANG_HOVER')}</span>
              </motion.div>
            )}
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent
          align={alignDropDown}
          className="rounded-lg shadow-lg overflow-hidden"
          asChild
        >
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className={
              theme === 'dark'
                ? 'bg-gray-800 border-gray-700'
                : 'bg-white border-gray-200'
            }
          >
            <DropdownMenuItem
              onClick={() => changeLanguage('en')}
              className="cursor-pointer p-2 outline-none"
            >
              <motion.div
                whileHover={{ x: 5 }}
                className={`flex items-center gap-2 ${
                  theme === 'dark' ? 'text-white' : 'text-gray-800'
                }`}
              >
                <span
                  className={`${
                    locale === 'en' ? 'font-bold' : 'font-medium'
                  } transition-colors duration-200 flex items-center gap-2`}
                >
                  <span className="text-sm">English</span>
                  <span className="text-xs opacity-70">EN</span>
                </span>
              </motion.div>
            </DropdownMenuItem>

            <DropdownMenuItem
              onClick={() => changeLanguage('hi')}
              className="cursor-pointer p-2 outline-none"
            >
              <motion.div
                whileHover={{ x: 5 }}
                className={`flex items-center gap-2 ${
                  theme === 'dark' ? 'text-white' : 'text-gray-800'
                }`}
              >
                <span
                  className={`${
                    locale === 'hi' ? 'font-bold' : 'font-medium'
                  } transition-colors duration-200 flex items-center gap-2`}
                >
                  <span className="text-sm">हिन्दी</span>
                  <span className="text-xs opacity-70">HI</span>
                </span>
              </motion.div>
            </DropdownMenuItem>
          </motion.div>
        </DropdownMenuContent>
      </DropdownMenu>
      <HoverCardContent align={alignHover}>
        <span>{t('LANG_HOVER')}</span>
      </HoverCardContent>
    </HoverCard>
  );
};
