import { SecurityCard } from '@/components/extra/settings/security/SecurityCard';
import { HeaderDashboard } from '@/components/header/HeaderDashboard';
import { userCompletedOnboarding } from '@/lib/userCompletedOnboarding';

const Security = async () => {
  const session = await userCompletedOnboarding('/dashboard/settings');

  return (
    <>
    <HeaderDashboard/>
    <SecurityCard/>
    </>
  );
};
export default Security;
