import { redirect } from "next/navigation";
import { getAuthSession } from "./auth"

export const userCompletedOnboarding = async (currentPath: string)=>{
    const session = await getAuthSession(); 
    console.log(session);
    
    if(!session) redirect("/");

    if(session.user.moveToDashboard && currentPath === "/onboarding") redirect("/user-page");
    
    if(!session.user.moveToDashboard && currentPath !== "/onboarding") redirect("/onboarding?error=not-completed-onboarding");

    return session;
}