import { WorkspaceTab } from "@/components/extra/settings/workspace/WorkspaceTab";
import { HeaderDashboard } from "@/components/header/HeaderDashboard";
import { getWorkspace, getWorkspaceSetting } from "@/lib/api";
import { userCompletedOnboarding } from "@/lib/userCompletedOnboarding";
import { notFound } from "next/navigation";

interface Params {
    params: {
        workspace_id: string;
    }
}

const Workspace = async ({ params: { workspace_id } }: Params) => {
    console.log(`Fetching data for workspace_id: ${workspace_id}`);

    const session = await userCompletedOnboarding(
        `/dashboard/settings/workspace/${workspace_id}`
    );
    console.log(`Session data:`, session);

    const workspace = await getWorkspaceSetting(workspace_id, session.user.id);
    console.log(`Workspace data:`, workspace);

    if (!workspace) {
        console.error(`Workspace not found for workspace_id: ${workspace_id}`);
        notFound();
        return null;
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
                {/* {(user?.userRole === "ADMIN" || user?.userRole === "OWNER") && (
                    <InviteUsers workspace={workspace} />
                )}
                <AddTaskShortcut userId={session.user.id} /> */}
            </HeaderDashboard>
            <main className="flex flex-col gap-2">
                <WorkspaceTab workspace={workspace} workspaceId={workspace.id} />
            </main>
        </>
    );
};

export default Workspace;