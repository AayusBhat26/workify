'use client';

import ActiveLink from '@/components/ui/active-link';
import { LockKeyhole, SunMoon, User2 } from 'lucide-react';
import { useTranslations } from 'next-intl';
const settingField = [
  {
    href: '/dashboard/settings',
    icon: <User2 size={20} />,
    title: 'SETTINGS.ACCOUNT',
  },
  {
    href: '/dashboard/settings/security',
    icon: <LockKeyhole size={20} />,
    title: 'SETTINGS.SECURITY',
  },
  {
    href: '/dashboard/settings/theme',
    icon: <SunMoon size={20} />,
    title: 'SETTINGS.THEME',
  },
];
export const Settings = () => {
  const t = useTranslations('SIDEBAR');
  return (
    <div className="flex flex-col gap-6 w-full ">
      <div>
        <p className="text-xs sm:text-sm uppercase text-muted-foreground">
          {t('SETTINGS.GENERAL')}
        </p>
        <div className="flex flex-col gap-2 w-full mt-2">
          {settingField.map((field) => (
            <ActiveLink
              key={field.href}
              href={field.href}
              variant={'ghost'}
              size={'sm'}
              className="flex justify-start w-full items-center gap-2"
            >
              {field.icon}
              {t(field.title)}
            </ActiveLink>
          ))}
        </div>
      </div>
      <div>
        <p className="text-xs sm:text-sm uppercase text-muted-foreground">
          {t('SETTINGS.WORKSPACE')}
        </p>
              <div className="flex flex-col gap-2 w-full mt-2 h-96 overflow-y-auto">
                  
        </div>
      </div>
    </div>
  );
};
