import { getAuthSession } from '@/lib/auth';
import { BreadCrum } from '../extra/BreadCrum';
import Welcome from '../extra/Welcom';
import { OpenCloseSidebar } from '../sidebar/OpenCloseSidebar';
import { HeaderUser } from './HeaderUser';
import { cn } from '@/lib/utils';

export const HeaderDashboard = async () => {
  const session = await getAuthSession();
  return (
    <header
      className={cn(
        'flex w-full justify-between items-center mb-4 py-2 gap-2',
        // className,
      )}
    >
      <div className="flex items-center gap-2">
        <OpenCloseSidebar />
        <Welcome hideOnMobile hideOnDesktop showOnlyOnPath="/dashboard" username={ session?.user.username!} />
        <BreadCrum />
      </div>

      <HeaderUser
        profileImage={session?.user.image}
        // username={session?.user.name}
        // email={session?.user.email}
      />
    </header>
  );
};
