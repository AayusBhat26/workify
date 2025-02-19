import { AccountInfo } from '@/components/extra/settings/account/AccountInfo';
import { Heading } from '@/components/extra/settings/account/Heading';
import { userCompletedOnboarding } from '@/lib/userCompletedOnboarding';

const Settings = async () => {
  const session = await userCompletedOnboarding('/dashboard/settings');

  return (
    <main>
      <Heading />
      <AccountInfo session={session} />
    </main>
  );
};
export default Settings;
