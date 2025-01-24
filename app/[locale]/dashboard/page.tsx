import { userCompletedOnboarding } from "@/lib/userCompletedOnboarding"

const Dashboard = async() =>{
    const session = await userCompletedOnboarding("/dashboard");
    console.log(session);

    return <p> dashboard</p>
    
}
export default Dashboard;