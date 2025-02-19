import { userCompletedOnboarding } from '@/lib/userCompletedOnboarding';

const Security = async () => {
  const session = await userCompletedOnboarding('/dashboard/settings');

  return <main>this is security page</main>;
};
export default Security;
