
import { Sidebar } from '@/components/sidebar/Sidebar';
import { ToggleSidebarProvider } from '@/context/ToggleSidebar';

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <ToggleSidebarProvider>
      <div className="overflow-hidden flex h-0 min-h-screen w-full">
        <Sidebar />
        <div className="relative p-4 md:p-6 flex flex-grow flex-col overflow-y-auto lg:px-10 scrollbar-thin scrollbar-thumb-muted-foreground scrollbar-track-secondary">
          {/* <HeaderDashboard /> */}
          {children}
        </div>
      </div>
    </ToggleSidebarProvider>
  );
};

export default DashboardLayout;
