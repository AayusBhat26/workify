import { redirect } from "next/navigation";
import { getAuthSession } from "./auth"

export const userCompletedOnboarding = async (currentPath: string)=>{
    const session = await getAuthSession(); 
    if(!session) redirect("/");

    if(session.user.moveToDashboard && currentPath === "/dashboard") redirect("/user-page");
    
    if(!session.user.moveToDashboard && currentPath !== "/dashboard") redirect("/dashboard?error=not-completed-onboarding");

    return session;
}