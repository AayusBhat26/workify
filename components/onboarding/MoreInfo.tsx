"use client";
import { useOnboardingForm } from "@/context/OnboardingForm"
import { FirstStep } from "./steps/FirstStep";
import { SecondStep } from "./steps/SecondStep";
import { ThirdStep } from "./steps/ThirdStep";
import { FormStepInfo } from "./FormStepInfo";
import { WorkifyHeader } from "../ui/workifyHeader";
import { Final } from "./steps/Final";

interface Props {
    profileImage?: string | null;
}
export const MoreInfo = ({ profileImage }: Props) => {
    const { currentStep } = useOnboardingForm();
    return (
        <section className="w-full lg:w-1/2 bg-card min-h-full flex flex-col justify-between items-center p-4 md:p-6">
            <div className="mt-16 mb-8 w-full flex flex-col items-center">
                <WorkifyHeader size={50} />
                {/* <h2 className="font-bold text-4xl md:text-5xl flex flex-col items-center my-10 ">
                     ipsum dolor sLoremit amet.
                </h2> */}
                {currentStep === 1 && <FirstStep profileImage={profileImage} />}
                {currentStep === 2 && <SecondStep />}
                {currentStep === 3 && <ThirdStep />}
                {currentStep === 4 && <Final />}
            </div>
            <FormStepInfo />
        </section>
    )
}