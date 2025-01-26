import { userCompletedOnboarding } from "@/lib/userCompletedOnboarding"

const Onboarding = async() =>{
    const session = await userCompletedOnboarding("/onboarding");
    console.log(session);

    return <p> onboarding</p>
    
}
export default Onboarding;