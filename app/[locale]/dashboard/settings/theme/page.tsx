import { Theme } from '@/components/extra/settings/theme/Theme';
import { HeaderDashboard } from '@/components/header/HeaderDashboard';
import { userCompletedOnboarding } from '@/lib/userCompletedOnboarding';

const ThemesSettings = async () => {
  const session = await userCompletedOnboarding('/dashboard/settings');

  return (
    <main>
      <HeaderDashboard/>
      <Theme />
    </main>
  );
};
// theme page -> theme component -> theme card component
export default ThemesSettings;
