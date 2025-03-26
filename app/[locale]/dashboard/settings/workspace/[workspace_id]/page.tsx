import { WorkspaceTab } from "@/components/extra/settings/workspace/WorkspaceTab";
import { HeaderDashboard } from "@/components/header/HeaderDashboard";
import { InviteUsers } from "@/components/inviteUsers/InviteUsers";
import { getWorkspace, getWorkspaceSetting } from "@/lib/api";
import { userCompletedOnboarding } from "@/lib/userCompletedOnboarding";
import { notFound } from "next/navigation";

interface Params {
    params: {
        workspace_id: string;
    }
}

const Workspace = async ({ params: { workspace_id } }: Params) => {
    (`Fetching data for workspace_id: ${workspace_id}`);

    const session = await userCompletedOnboarding(
        `/dashboard/settings/workspace/${workspace_id}`
    );
    (`Session data:  ${session}`);

    const workspace = await getWorkspaceSetting(workspace_id, session.user.id);
    (`Workspace data:${workspace}`);

    if (!workspace) {
        console.error(`Workspace not found for workspace_id: ${workspace_id}`);
        notFound();

    }

    const user = workspace.subscribers.find(
        (subscriber) => subscriber.user.id === session.user.id
    );

    return (
        <>
            <HeaderDashboard
                className="mb-2 sm:mb-0"
                addManualRoutes={[
                    {
                        name: "DASHBOARD",
                        href: "/dashboard",
                        useTranslate: true,
                    },
                    {
                        name: "settings",
                        href: "/dashboard/settings",
                    },
                    {
                        name: workspace.name,
                        href: `/dashboard/settings/workspace/${workspace_id}`,
                    },
                ]}
            >
                {(user?.userRole === "ADMIN" || user?.userRole === "OWNER") && (
                    <InviteUsers workspace={workspace} />
                )}
                {/* <AddTaskShortcut userId={session.user.id} /> */}
            </HeaderDashboard>
            <main className="flex flex-col gap-2">
                <WorkspaceTab workspace={workspace} workspaceId={workspace.id} />
            </main>
        </>
    );
};

export default Workspace;