import { AccountInfo } from '@/components/extra/settings/account/AccountInfo';
import { DeleteAccount } from '@/components/extra/settings/account/DeleteAccount';
import { Heading } from '@/components/extra/settings/account/Heading';
import { Separator } from '@/components/ui/separator';
import { userCompletedOnboarding } from '@/lib/userCompletedOnboarding';

const Settings = async () => {
  const session = await userCompletedOnboarding('/dashboard/settings');

  return (
    <div>
      <Heading />
      <AccountInfo session={session} />
      <div className="p-4 sm:p-6">
        <Separator />
      </div>
      <DeleteAccount userEmail={session.user.email!} />
    </div>
  );
};
export default Settings;
