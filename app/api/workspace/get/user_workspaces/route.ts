import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export const GET = async (request: Request) => {
  const url = new URL(request.url);

  const userId = url.searchParams.get("userId");

  if (!userId) return NextResponse.json("ERRORS.NO_USER_API", { status: 404 });

  try {
    const workspaces = await db.workspace.findMany({
      where: {
        creatorId: userId
      }
    });

    if (!workspaces) return NextResponse.json([], { status: 200 });

    return NextResponse.json(workspaces, { status: 200 });
  } catch (e) {
    return NextResponse.json("ERRORS.DB_ERROR", { status: 405 });
  }
};