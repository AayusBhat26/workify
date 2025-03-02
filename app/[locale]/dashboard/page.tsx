import Welcome from "@/components/extra/Welcom";
import { userCompletedOnboarding } from "@/lib/userCompletedOnboarding"

const Dashboard = async () => {
    const session = await userCompletedOnboarding("/dashboard");
    console.log(session);

    return (
        <div>
            <Welcome username="" hideOnDesktop className="px-4 py-2"/>
        </div>
    )
};
export default Dashboard;