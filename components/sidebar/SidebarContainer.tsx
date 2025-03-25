'use client';

import { useToggleSidebar } from '@/context/ToggleSidebar';

import { Workspace } from '@prisma/client';
import { OpenCloseSidebar } from './OpenCloseSidebar';
import { OptionsSidebar } from './optionSidebar/OptionsSidebar';
import { ShortcutSidebar } from './shortcutSidebar/ShortcutSidebar';

interface Props {
  userWorkspaces: Workspace[];
  userId: string;
  userAdminWorkspaces: Workspace[];
}

export const SidebarContainer = ({
  userWorkspaces,
  userId,
  userAdminWorkspaces,
}: Props) => {
  const { isOpen, setIsOpen } = useToggleSidebar();
  const createdWorkspaces = userWorkspaces.filter(
    (workspace) => workspace.creatorId  === userId,
  );
  (createdWorkspaces);
  
  return (
    <>
      <aside
        className={`fixed z-50 top-0 h-full left-0 lg:static bg-background border-r flex lg:translate-x-0 transition-all duration-300 ${
          isOpen ? 'translate-x-0 shadow-sm' : 'translate-x-[-100%]'
        }`}
      >
        <ShortcutSidebar
        userWorkspaces={userWorkspaces}
        createdWorkspaces={createdWorkspaces.length}
        
        />
        <OptionsSidebar
        createdWorkspaces={createdWorkspaces.length}
        userAdminWorkspaces={userAdminWorkspaces}
        // userWorkspaces={userWorkspaces}
        />
        <OpenCloseSidebar />
      </aside>
      <div
        onClick={() => {
          setIsOpen(false);
        }}
        className={`fixed h-screen w-full top-0 left-0 bg-black/80 z-40 lg:hidden ${
          isOpen ? 'block' : 'hidden'
        }`}
      ></div>
    </>
  );
};
