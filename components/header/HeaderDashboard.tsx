import { BreadCrum } from '../extra/BreadCrum';
import { Welcome } from '../extra/Welcom';

export const HeaderDashboard = () => {
  return (
    <header className="flex w-full justify-between items-center mb-4">
      <Welcome />
      <BreadCrum />
      {/* <HeaderUser /> */}
    </header>
  );
};
