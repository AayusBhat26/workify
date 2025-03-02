import { SecurityCard } from '@/components/extra/settings/security/SecurityCard';
import { userCompletedOnboarding } from '@/lib/userCompletedOnboarding';

const Security = async () => {
  const session = await userCompletedOnboarding('/dashboard/settings');

  return <SecurityCard/>;
};
export default Security;
