import { Workspace } from '@prisma/client';
import { Bottom } from './Bottom';
import { AddWorkspaceButton } from './CreateWorkspace/AddWorkspaceButton';
import { Top } from './Top';
import { Workspaces } from './workspaces/Workspaces';
interface Props{
  userWorkspaces: Workspace[];
  createdWorkspaces: number;

}
export const ShortcutSidebar = ({userWorkspaces, createdWorkspaces}: Props) => {
  return (
    <div className="border-r h-screen flex flex-col justify-between items-center p-4 sm:py-6 border">
      <div className="flex flex-col items-center gap-4">
        <Top />
        <Workspaces userWorkspacesList={userWorkspaces} href='/dashboard/workspace' />
        <AddWorkspaceButton createdWorkspaces={createdWorkspaces}/>
      </div>
      <div className="mt-auto">
        <Bottom />
      </div>
    </div>
  );
};
