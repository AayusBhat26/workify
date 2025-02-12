import { userCompletedOnboarding } from '@/lib/userCompletedOnboarding';

const Settings = async () => {
  const session = await userCompletedOnboarding('/dashboard/settings');

  return <main>this is settings page</main>;
};
export default Settings;
