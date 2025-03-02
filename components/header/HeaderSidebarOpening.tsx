'use client';

import { useToggleSidebar } from '@/context/ToggleSidebar';
import { PanelLeftOpen } from 'lucide-react';
import { Button } from '../ui/button';

export const HeaderSidebarOpening = () => {
  const { setIsOpen } = useToggleSidebar();
  return (
    <Button
      onClick={() => {
        setIsOpen(true);
      }}
      className="text-muted-foreground lg:hidden "
      variant={'ghost'}
      size={'icon'}
    >
      <PanelLeftOpen />
    </Button>
  );
};
