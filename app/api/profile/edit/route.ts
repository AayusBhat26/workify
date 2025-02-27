import { getAuthSession } from '@/lib/auth';
import { NextResponse } from 'next/server';
import { z } from 'zod';
import { db } from '@/lib/db';
import { accountInfo } from '@/schema/accountInfo';
export async function POST(request: Request) {
  const session = await getAuthSession();
  if (!session?.user) {
    return new Response('Unauthorized user', {
      status: 400,
      statusText: 'user is not authorized.',
    });
  }
  const body: unknown = await request.json();

  const res = accountInfo.safeParse(body);

  if (!res.success) {
    return NextResponse.json('ERRORS_WRONG_DATA', {
      status: 401,
    });
  }
  const { username, name, surname } = res.data;
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

    const existedUsername = await db.user.findUnique({
      where: {
        username
      },
      
    });
    if (existedUsername && existedUsername.id !== user.id) return NextResponse.json("ERRORS.TAKEN_USERNAME", {
      status: 402
    });
    await db.user.update({
      where: {
        id:user.id
      }, 
      data: {
        name, 
        surname,
        username
      }
    })
    return NextResponse.json(res.data, {
      status: 200,
      statusText: 'username updateds',
    });
  } catch (error) {
    return NextResponse.json('ERRORS.DB_ERROR', {
      status: 405,
    });
  }
}
