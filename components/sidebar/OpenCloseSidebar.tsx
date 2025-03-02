'use client';
import { useToggleSidebar } from '@/context/ToggleSidebar';
import { Button } from '../ui/button';
import { PanelLeftClose } from 'lucide-react';

export const OpenCloseSidebar = () => {
  const { isOpen, setIsOpen } = useToggleSidebar();
  return (
    <Button
      onClick={() => {
        setIsOpen(!isOpen);
      }} 
      className={`absolute right-[-2.5rem] top-10 z-10 rounded-tl-none lg:hidden ${
        isOpen ? 'hidden' : ''
      }`} // Fixed conditional class
      size={'icon'}
      variant={'secondary'}
    >
      <PanelLeftClose />
    </Button>
  );
};
