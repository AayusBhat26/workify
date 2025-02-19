import { HeaderDashboard } from '@/components/header/HeaderDashboard';
import { Sidebar } from '@/components/sidebar/Sidebar';

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="flex h-0 min-h-screen w-full">
      <Sidebar />
      <div className="relative p-4 md:p-6 flex flex-grow flex-col overflow-y-auto ">
        <HeaderDashboard />
        {children}
      </div>
    </main>
  );
};

export default DashboardLayout;
