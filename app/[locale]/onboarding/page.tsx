import { MoreInfo } from "@/components/onboarding/MoreInfo";
import { SummarySection } from "@/components/onboarding/SummarySection";
import { OnboardingFormProvider } from "@/context/OnboardingForm";
import { userCompletedOnboarding } from "@/lib/userCompletedOnboarding"

const Onboarding = async () => {
    const session = await userCompletedOnboarding("/onboarding");
    console.log(session);

    return <OnboardingFormProvider session={session}>
        <MoreInfo />
        <SummarySection />
    </OnboardingFormProvider>

}
export default Onboarding;