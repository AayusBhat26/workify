import { Bottom } from './Bottom';
import { Top } from './Top';
import { Workspaces } from './Workspace';

export const ShortcutSidebar = () => {
  return (
    <div className="border-r h-full flex-col justify-between items-center p-4 sm:py-6 ">
      <div className="w-full h-2/3">
        <Top />
        <Workspaces />
        {/* <h2>dynamic workspace icons</h2> */}
      </div>
      {/* <h3 className="">bottom content</h3>
       */}
      <Bottom />
    </div>
  );
};
