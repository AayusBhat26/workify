import { redirect } from 'next/navigation';
import { getAuthSession } from './auth';

export const userCompletedOnboarding = async (currentPath: string) => {
  // check if the user has completed the auth
  const session = await getAuthSession();
  console.log('session: ', session);

  if (!session) redirect('/');

  // if (session.user.moveToDashboard && currentPath === '/onboarding') redirect('/user-page');

  if (!session.user.moveToDashboard && currentPath !== '/onboarding')
    redirect('/onboarding?error=not-completed-onboarding');

  return session;
};
