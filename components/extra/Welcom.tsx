'use client';
import React from 'react';

import { cn } from '@/lib/utils';
import { useFormatter, useTranslations } from 'next-intl';
import { usePathname } from 'next/navigation';

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  hideOnMobile?: boolean;
  hideOnDesktop?: boolean;
  showOnlyOnPath?: string;
  username?: string | null;
  name?: string | null;
  surname?: string | null;
}

const Welcome = React.forwardRef<HTMLDivElement, Props>(
  (
    {
      className,
      hideOnMobile,
      hideOnDesktop,
      showOnlyOnPath,
      username,
      surname,
      name,
      ...props
    },
    ref,
  ) => {
    const pathname = usePathname();

    // const format = useFormatter();

    // const dateTime = new Date();
    const t = useTranslations('COMMON');
    console.log(username);
    
    if (showOnlyOnPath && pathname !== showOnlyOnPath) return null;
    else {
      console.log(username, surname, name)
      return (
        <div
          ref={ref}
          className={cn(
            `space-y-1 ${hideOnDesktop ? 'lg:hidden' : ''} ${
              hideOnMobile ? 'hidden lg:block' : ''
            }`,
            className,
          )}
          {...props}
        >
          <p className="font-bold sm:text-3xl text-2xl">
            {t('WELCOMEBACK')},{' '}
            <span>
              {name
                ? name && surname
                  ? `${name} ${surname}`
                  : name
                : username}
            </span>{" "}
            👋
          </p>
          
        </div>
      );
    }
  },
);

Welcome.displayName = 'Welcome';

export default Welcome;
