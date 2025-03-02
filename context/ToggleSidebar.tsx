'use client';

import { createContext, useContext, useState } from 'react';

interface Props {
  children: React.ReactNode;
}
interface ToggleSidebarContext {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
export const ToggleContext = createContext<ToggleSidebarContext | null>(null);
export const ToggleSidebarProvider = ({ children }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <ToggleContext.Provider value={{ isOpen, setIsOpen }}>
      {children}
    </ToggleContext.Provider>
  );
};

export const useToggleSidebar = () => {
  const context = useContext(ToggleContext);
  if (!context) throw new Error('invalid use');
  return context;
};
