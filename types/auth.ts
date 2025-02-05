import { User } from 'next-auth';

declare module 'next-auth/jwt' {
  interface JWT {
    id: string;
    usernam?: string | null;
    surname?: string | null;
    completedOnboarding?: boolean;
  }
}

declare module 'next-auth' {
  interface Session {
    user: User & {
      id: string;
      username?: string | null;
      moveToDashboard: boolean;
      surname?: string | null;
    };
  }
}
