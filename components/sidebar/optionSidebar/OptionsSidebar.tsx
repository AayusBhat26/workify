'use client';

import { ScrollArea } from '@/components/ui/scroll-area';
import { usePathname } from 'next/navigation';
import { Settings } from './Settings';
import { CreatedWorkspaceInfo } from '@/components/extra/CreatedWorkspaceInfo';
import { Workspace } from '@prisma/client';
interface Props{
  createdWorkspaces: number;
  userAdminWorkspaces: Workspace[];
}
export const OptionsSidebar = ({ createdWorkspaces, userAdminWorkspaces}: Props) => {
  const pathname = usePathname();
  if (pathname === '/en/dashboard' || pathname === '/hi/dashboard') return null;

  return (
    <div className="border-r sm:w-64 w-52 h-full p-4 sm:py-6 flex flex-col justify-between">
      <ScrollArea className="h-full">
        {pathname.includes('/dashboard/settings') && <Settings userAdminWorkspaces={userAdminWorkspaces} />}
        <CreatedWorkspaceInfo createdNumber={createdWorkspaces}/>
        {/* {(pathname === `/dashboard/workspace/${workspaceId}` || */}
        {/* pathname === */}
        {/* `/dashboard/workspace/${workspaceId}/tasks/task/${urlAdditionalId}` || */}
        {/* pathname === */}
        {/* `/dashboard/workspace/${workspaceId}/mind-maps/mind-map/${urlAdditionalId}` ||
          pathname ===
            `/dashboard/workspace/${workspaceId}/chat/${chatId}`) && (
          <WorkspaceOptions workspaceId={workspaceId} />
        )} */}
        {/* {(pathname === '/dashboard/pomodoro' ||
          pathname === '/dashboard/pomodoro/settings') && <PomodoroLinks />}

        {pathname === '/dashboard/assigned-to-me' && (
          <AssignedToMeFilter userWorkspaces={userWorkspaces} />
        )}
     

      <CreatedWorkspacesInfo createdNumber={createdWorkspaces} /> */}
      </ScrollArea>
    </div>
  );
};
