"use client";
import { useOnboardingForm } from "@/context/OnboardingForm"
import { FirstStep } from "./steps/FirstStep";
import { SecondStep } from "./steps/SecondStep";
import { ThirdStep } from "./steps/ThirdStep";
import { FormStepInfo } from "./FormStepInfo";

export const MoreInfo = () => {
    const { currentStep } = useOnboardingForm();
    return (
        <section className="w-full lg:w-1/2 bg-card min-h-full flex flex-col justify-between items-center p-4 md:p-6">
            <div className="mt-16 mb-8 w-full flex flex-col items-center">
                <div className="flex justify-center items-center gap-2">
                    {/* log */}
                    <h1 className="text-2xl">
                        <span className="text-primary font-semibold">
                            WORKIFY
                        </span>
                    </h1>
                </div>
                <h2 className="font-bold text-4xl md:text-5xl flex flex-col items-center my-10 ">
                    Lorem ipsum dolor sit amet.
                </h2>
                {currentStep === 1 && <FirstStep />}
                {currentStep === 2 && <SecondStep />}
                {currentStep === 3 && <ThirdStep />}
            </div>
            <FormStepInfo />
        </section>
    )
}