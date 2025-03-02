import Welcome from "@/components/extra/Welcom";
import { userCompletedOnboarding } from "@/lib/userCompletedOnboarding"

const Dashboard = async () => {
    const session = await userCompletedOnboarding("/dashboard");
    console.log(session);

    return (
        <div>
            <Welcome username={session?.user.username} name={session?.user.username} surname={session?.user.surname} className="px-4 py-2"/>
        </div>
    )
};
export default Dashboard;