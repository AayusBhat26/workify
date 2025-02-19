import { Theme } from '@/components/extra/settings/theme/Theme';
import { userCompletedOnboarding } from '@/lib/userCompletedOnboarding';

const ThemesSettings = async () => {
  const session = await userCompletedOnboarding('/dashboard/settings');

  return (
    <main>
      <Theme />
    </main>
  );
};
// theme page -> theme component -> theme card component
export default ThemesSettings;
