import { getAuthSession } from '@/lib/auth';
import { NextResponse } from 'next/server';
import { z } from 'zod';
import { db } from '@/lib/db';
export async function POST(request: Request) {
  const session = await getAuthSession();
  if (!session?.user) {
    return new Response('Unauthorized user', {
      status: 400,
      statusText: 'user is not authorized.',
    });
  }
  const body: unknown = await request.json();

  const res = z
    .object({
      profileImage: z.string(),
    })
    .safeParse(body);

  if (!res.success) {
    return NextResponse.json('ERRORS_WRONG_DATA', {
      status: 401,
    });
  }
  const { profileImage } = res.data;
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
        image: profileImage,
      },
    });
    return NextResponse.json(updatedUser, {
      status: 200,
      statusText: 'new image link is stored in the database.',
    });
  } catch (error) {
    return NextResponse.json('ERRORS.DB_ERROR', {
      status: 405,
    });
  }
}
