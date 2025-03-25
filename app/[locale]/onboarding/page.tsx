import { MoreInfo } from "@/components/onboarding/MoreInfo";
import { SummarySection } from "@/components/onboarding/SummarySection";
import { OnboardingFormProvider } from "@/context/OnboardingForm";
import { userCompletedOnboarding } from "@/lib/userCompletedOnboarding"

const Onboarding = async () => {
    const session = await userCompletedOnboarding("/onboarding");
    (session);

    return <OnboardingFormProvider session={session}>
        <MoreInfo profileImage={session.user.image} />
        <SummarySection />
    </OnboardingFormProvider>

}
export default Onboarding;