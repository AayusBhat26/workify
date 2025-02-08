import { userCompletedOnboarding } from "@/lib/userCompletedOnboarding"

const Dashboard = async () => {
    const session = await userCompletedOnboarding("/dashboard");
    console.log(session);

    return (
        <>
            welcome to your dashboard.
        </>
    )
};
export default Dashboard;