import { getAuthSession } from '@/lib/auth';
import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
export async function POST(request: Request) {
  const session = await getAuthSession();
  if (!session?.user) {
    return new Response('Unauthorized user', {
      status: 400,
      statusText: 'user is not authorized.',
    });
  }
  // finding the user
  try {
    const user = await db.user.findUnique({
      where: {
        id: session.user.id,
      },
    });
    if (!user) {
      return new NextResponse('User not found', {
        status: 404,
        statusText: 'user not found in the database,',
      });
    }

    const updatedUser = await db.user.update({
      where: {
        id: session.user.id,
      },
      data: {
        image: null,
      },
    });
    return NextResponse.json(updatedUser, {
      status: 200,
      statusText: ' Image deleted.',
    });
  } catch (error) {
    return NextResponse.json('ERRORS.DB_ERROR', {
      status: 405,
    });
  }
}
