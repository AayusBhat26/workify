import { HeaderDashboard } from "@/components/header/HeaderDashboard";
import { InviteUsers } from "@/components/inviteUsers/InviteUsers";
import { NewTask } from "@/components/tasks/newTask/NewTask";
import { getUserWorkspaceRole, getWorkspace } from "@/lib/api";
import { userCompletedOnboarding } from "@/lib/userCompletedOnboarding";

interface Params {
    params: {
        workspace_id: string;
    };
}
const Tasks = async ({ params: { workspace_id } }: Params) => {
    const session = await userCompletedOnboarding(`/dashboard/workspace/${workspace_id}`);

    const [workspace, userRole] = await Promise.all([getWorkspace(workspace_id, session?.user?.id), getUserWorkspaceRole(workspace_id, session.user.id)]);
    
    return <>
        <HeaderDashboard addManualRoutes={[
            {
                name: "DASHBOARD",
                href: "/dashboard",
                useTranslate: true,
            },
            {
                name: workspace.name,
                href: `/dashboard/workspace/${workspace_id}`,
            },
        ]} >
            {((userRole) === "ADMIN" || (userRole==="OWNER") && (
                <InviteUsers workspace={workspace}/>
            ))}
            </HeaderDashboard>
        <main className="flex flex-col gap-2 min-h-[40rem]">
            {/* {workspace?.name}
            {workspace_id} tasks page */}
            <NewTask workspaceId={workspace_id}/>
        </main>
    </>
};
export default Tasks;