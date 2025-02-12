import { OptionsSidebar } from './optionSidebar/OptionsSidebar';
import { ShortcutSidebar } from './shortcutSidebar/ShortcutSidebar';

export const Sidebar = () => {
  return (
    <aside className="fixed top-0 left-0 md:static h-full flex overflow-hidden">
      <ShortcutSidebar />
      <OptionsSidebar />
    </aside>
  );
};
