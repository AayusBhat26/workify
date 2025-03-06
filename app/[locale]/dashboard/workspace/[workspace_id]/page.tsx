import { HeaderDashboard } from "@/components/header/HeaderDashboard";
import { getWorkspace } from "@/lib/api";
import { userCompletedOnboarding } from "@/lib/userCompletedOnboarding";

interface Params {
    params: {
        workspace_id: string;
    };
}
const Workspace = async ({ params: { workspace_id } }: Params) => {
    const session = await userCompletedOnboarding(`/dashboard/workspace/${workspace_id}`);
    const workspace = await getWorkspace(workspace_id, session.user.id);

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
        ]} />
        <main>
            {workspace_id}
        </main>
    </>
};
export default Workspace;