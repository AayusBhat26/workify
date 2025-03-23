import { SidebarContainer } from "./SidebarContainer";
import { Workspace } from "@prisma/client";
import { getAuthSession } from "@/lib/auth";
import { getUserAdminWorkspaces, getWorkspace, getWorkspaces } from "@/lib/api";


export const Sidebar = async () => {
  const session = await getAuthSession();
  if(!session) return null;
  const [userWorkspaces, userAdminWorkspaces] = await Promise.all( [getWorkspaces(session.user.id), getUserAdminWorkspaces(session.user.id)]);

  return <SidebarContainer userWorkspaces={userWorkspaces} userId={session.user.id}   
  userAdminWorkspaces={userAdminWorkspaces}
  />;
};