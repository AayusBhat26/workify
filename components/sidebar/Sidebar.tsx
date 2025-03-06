import { SidebarContainer } from "./SidebarContainer";
import { Workspace } from "@prisma/client";
import { getAuthSession } from "@/lib/auth";
import { getWorkspace, getWorkspaces } from "@/lib/api";


export const Sidebar = async () => {
  const session = await getAuthSession();
  if(!session) return null;
  const userWorkspace = await getWorkspaces(session.user.id)

  return <SidebarContainer userWorkspaces={userWorkspace} />;
};