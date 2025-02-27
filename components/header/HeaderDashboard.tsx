import { getAuthSession } from '@/lib/auth';
import { BreadCrum } from '../extra/BreadCrum';
import { Welcome } from '../extra/Welcom';
import { HeaderUser } from './HeaderUser';

export const HeaderDashboard = async() => {
  const session = await getAuthSession();
  return (
    <header className="flex w-full justify-between items-center mb-4">
      <Welcome />
      <BreadCrum />
      <HeaderUser 
        profileImage={session?.user.image} 
        // username={session?.user.name} 
        // email={session?.user.email} 
      />
    </header>
  );
};
