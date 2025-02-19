import { userCompletedOnboarding } from '@/lib/userCompletedOnboarding';

const ThemesSettings = async () => {
  const session = await userCompletedOnboarding('/dashboard/settings');

  return <main>this is Themes Settings page</main>;
};
export default ThemesSettings;
