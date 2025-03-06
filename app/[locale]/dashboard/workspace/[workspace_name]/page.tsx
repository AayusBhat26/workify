import { userCompletedOnboarding } from "@/lib/userCompletedOnboarding";

interface Params{
    params:{
        workspace_name: string;
    };
}
const Workspace = async ({params:{workspace_name}}: Params)=>{
    const session = await userCompletedOnboarding(`/dashboard/workspace/${workspace_name}`);

    return <div>
        {workspace_name}
    </div>
};
export default Workspace;