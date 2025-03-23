// we have to store all the values we have received from the first, second and third steps.

import { getAuthSession } from '@/lib/auth';
import { db } from '@/lib/db';
import { onboardingSchema } from '@/schema/onboardingSchema';
import { v4 as uuidv4 } from 'uuid';
import { NextResponse } from 'next/server';
import { UseCase as UseCaseType } from '@prisma/client';
export async function POST(request: Request) {
  const session = await getAuthSession();
  if (!session?.user) {
    return new Response('Unauthorized user', {
      status: 400,
      statusText: 'User might not be logged in _ route.ts_ onboarding',
    });
  }

  const body: unknown = await request.json();
  // we get the body and we parse it based on the onboarding schema that we have created.
  const res = onboardingSchema.safeParse(body);
  if (!res.success) {
    return NextResponse.json('there is something wrong with data, ERROR_WRONG_DATA', {
      status: 401,
    });
  }
  const { useCase, workspaceName, workspaceImage, name, surname } = res.data;

  try {
    const user = await db.user.findUnique({
      where: {
        id: session.user.id,
      },
    });
    if (!user) {
      return new NextResponse('No user found, ERRORS.NO_USER_API', {
        status: 404,
        statusText: 'user not found',
      });
    }
    // sab kuch sahi ho gya toh hum onboarding ka process khatam kr skte hai so that user apne dashboard pe move kr jaye.
    await db.user.update({
      where: {
        id: session.user.id,
      },
      data: {
        moveToDashboard: true,
        name,
        surname,
        usecase: useCase as UseCaseType,
      },
    });
    // creating a workspace for the user.
    const workspace = await db.workspace.create({
      data: {
        creatorId: user.id,
        name: workspaceName,
        image: workspaceImage,
        // inviteCode: uuidv4(),
        // adminCode: uuidv4(),
        // canEditCode: uuidv4(),
        // readOnlyCode: uuidv4(),
        // colors:getRam
      },
    });
    await db.subscription.create({
      data: {
        userId: user.id,
        workspaceId: workspace.id,
        userRole: 'OWNER',
      },
    });
    return NextResponse.json('OK', { status: 200 });
  } catch (error) {
    return NextResponse.json('ERRORS.DB_ERROR', { status: 405 });
  }
}
