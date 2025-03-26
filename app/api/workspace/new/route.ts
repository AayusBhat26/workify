import { getAuthSession } from '@/lib/auth';
import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { apiWorkspaceSchema } from '@/schema/workspaceSchema';
import { MAX_WORKSPACES_COUNT } from '@/lib/options';
import { getRandomColor } from '@/lib/getRandomColor';
import { v4 as uuidv4 } from "uuid";
export async function POST(request: Request) {
  const session = await getAuthSession();
  if (!session?.user) {
    return new Response('Unauthorized user', {
      status: 400,
      statusText: 'user is not authorized.',
    });
  }
  const body: unknown = await request.json();

  const res = apiWorkspaceSchema
    .safeParse(body);

  if (!res.success) {
    return NextResponse.json('ERRORS_WRONG_DATA', {
      status: 401,
    });
  }
  const { workspaceName, file } = res.data;
  try {
    const user = await db.user.findUnique({
      where: {
        id: session.user.id,
      },include:{
        createdWorksapces:{
            select:{
                id:true,
                name:true,
            }
        }
      }
    });
    if (!user) {
      return new NextResponse('User not found', {
        status: 404,
        statusText: 'user not found in the database,',
      });
    }
    if(user.createdWorksapces.length  === MAX_WORKSPACES_COUNT){
      return new NextResponse("ERRORS.TOO_MANY_WORKSPACES", {
        status: 402,
      });
    }
    // avoiding same workspace name
    const sameWorkspaceName = user.createdWorksapces.find(
        (workspace)=>workspace.name.toLowerCase() === workspaceName.toLowerCase()
    );

    if(sameWorkspaceName){
        return new NextResponse("ERRORS.SAME_NAME_WORKSPACE", {
            status: 403
        });
    }
    const color = getRandomColor();
   // creating new workspace.
   const newWorkspace = await db.workspace.create({
    data: {
        creatorId: user.id, 
        name: workspaceName, 
        image: file, 
        color,
        inviteCode: uuidv4(), 
        adminCode: uuidv4(), 
        canEditCode: uuidv4(), 
        readOnlyCode: uuidv4() 
    }
   });
   await db.subscription.create({
    data:{
      userId: user.id, 
      workspaceId: newWorkspace.id,
      userRole : "OWNER"
    }
   })
    return NextResponse.json(newWorkspace, {
      status: 200,
      statusText: 'new image link is stored in the database.',
    });
  } catch (error) {
    return NextResponse.json('ERRORS.DB_ERROR', {
      status: 405,
    });
  }
}
