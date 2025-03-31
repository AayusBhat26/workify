'use client';

import { ScrollArea } from '@/components/ui/scroll-area';
import { usePathname } from 'next/navigation';
import { Settings } from './settingsOptions/Settings';
import { CreatedWorkspaceInfo } from '@/components/extra/CreatedWorkspaceInfo';
import { Workspace } from '@prisma/client';
import { WorkspaceOptions } from '../workspaceOptions/WorkspaceOptions';
interface Props{
  createdWorkspaces: number;
  userAdminWorkspaces: Workspace[];
}
export const OptionsSidebar = ({ createdWorkspaces, userAdminWorkspaces}: Props) => {
  const pathname = usePathname();
  const urlWorkspaceId: string | undefined = pathname.split('/')[4];
  const workspaceId = urlWorkspaceId ? urlWorkspaceId : "";
  if (pathname === '/en' || pathname === '/hi') return null;
  return (
    <div className="border-r sm:w-64 w-52 h-full p-4 sm:py-6 flex flex-col justify-between">
      <ScrollArea className="h-full">
        {pathname.includes('/dashboard/settings') && <Settings userAdminWorkspaces={userAdminWorkspaces} />}
        {pathname.includes(`/dashboard/workspace/${workspaceId}`) && <WorkspaceOptions workspaceId={workspaceId}/>}
        {pathname.includes(`/dashboard/workspace/${workspaceId}/tasks`) && <p>tasks</p>}
      </ScrollArea>
    </div>
  );
};
