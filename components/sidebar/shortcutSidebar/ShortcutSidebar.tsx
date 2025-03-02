import { Bottom } from './Bottom';
import { AddWorkspaceButton } from './CreateWorkspace/AddWorkspaceButton';
import { Top } from './Top';
import { Workspaces } from './Workspace';

export const ShortcutSidebar = () => {
  return (
    <div className="border-r h-screen flex flex-col justify-between items-center p-4 sm:py-6 border">
      <div className="flex flex-col items-center gap-4">
        <Top />
        <Workspaces />
        <AddWorkspaceButton />
      </div>
      <div className="mt-auto">
        <Bottom />
      </div>
    </div>
  );
};
