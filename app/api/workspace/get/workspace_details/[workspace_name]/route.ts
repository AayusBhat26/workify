import { db } from "@/lib/db";
import { NextResponse } from "next/server";

interface Params {
  params: {
    workspace_name: string;
  };
}

export const GET = async (
  request: Request,
  { params: { workspace_name } }: Params
) => {
  const url = new URL(request.url);

  const userId = url.searchParams.get("userId");

  if (!userId) return NextResponse.json("ERRORS.NO_USER_API", { status: 404 });

  try {
    const workspace = await db.workspace.findMany({
      where: {
        name: workspace_name,
        creatorId: userId
      },
    });

    if (!workspace)
      return NextResponse.json("Workspace not found", { status: 200 });

    return NextResponse.json(workspace, { status: 200 });
  } catch (err) {
    return NextResponse.json("ERRORS.DB_ERROR", { status: 405 });
  }
};