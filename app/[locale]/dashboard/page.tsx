import Welcome from "@/components/extra/Welcom";
import { HeaderDashboard } from "@/components/header/HeaderDashboard";
import { userCompletedOnboarding } from "@/lib/userCompletedOnboarding"

const Dashboard = async () => {
    const session = await userCompletedOnboarding("/dashboard");
    (session);

    return (
        <>
        <HeaderDashboard/>
        <main>
            <Welcome username={session?.user.username} name={session?.user.username} surname={session?.user.surname} className="px-4 py-2"/>
        </main>
        </>
    )
};
export default Dashboard;