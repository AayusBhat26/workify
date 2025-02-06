'use client';

import { useOnboardingForm } from '@/context/OnboardingForm';
import { useTranslations } from 'next-intl';

export const Final = () => {
    const { currentStep, workspaceName, workspaceImage } = useOnboardingForm();
    const t = useTranslations("ONBOARDING_FORM");
    return <div className='flex flex-col justify-center gap-4 w-full mt-10 text-center'>
        <h2 className="font-bold text-4xl md:text-5xl max-w-xs">
            {t("FOURTH_STEP.TITLE")}
        </h2>
        final {workspaceName}
    </div>;
};
