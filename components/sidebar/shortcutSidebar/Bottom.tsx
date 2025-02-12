'use client';

import { LanguageSwitcher } from '@/components/switchers/LanguageSwitcher';
import ActiveLink from '@/components/ui/active-link';
import { Button } from '@/components/ui/button';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card';
import { LogOutIcon, Settings } from 'lucide-react';
import { signOut } from 'next-auth/react';
import { useLocale, useTranslations } from 'next-intl';

export const Bottom = () => {
  const t = useTranslations('SIDEBAR');
  const lang = useLocale();
  const logouthandler = () => {
    signOut({
      callbackUrl: `${window.location.origin}/${lang}`,
    });
  };
  return (
    <div>
      <div className="cursor-pointer flex flex-col gap-4">
        <LanguageSwitcher />
      </div>
      {/* <ThemeSwitcher /> */}
      <HoverCard openDelay={250} closeDelay={250}>
        <HoverCardTrigger tabIndex={1}>
          <Button onClick={logouthandler} variant={'ghost'} size={'icon'}>
            <LogOutIcon className="cursor-pointer" />
          </Button>
        </HoverCardTrigger>
        <HoverCardContent align="start">
          <span>{t('MAIN.LOG_OUT_HOVER')}</span>
        </HoverCardContent>
      </HoverCard>
      <HoverCard openDelay={250} closeDelay={250}>
        <HoverCardTrigger tabIndex={1}>
          <ActiveLink
            include="setting"
            variant={'ghost'}
            size={'icon'}
            href="/dashboard/settings"
          >
            <Settings />
          </ActiveLink>
        </HoverCardTrigger>
        <HoverCardContent align="start">
          <span>{t('MAIN.SETTINGS_HOVER')}</span>
        </HoverCardContent>
      </HoverCard>
    </div>
  );
};
