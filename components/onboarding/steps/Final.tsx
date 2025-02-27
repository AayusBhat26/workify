'use client';

import { Button } from '@/components/ui/button';
import { LoadingState } from '@/components/ui/loadingState';
import { useOnboardingForm } from '@/context/OnboardingForm';
import { useToast } from '@/hooks/use-toast';
import { useMutation } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import { useSession } from 'next-auth/react';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
export const Final = () => {
    const t = useTranslations("ONBOARDING_FORM");
    const m = useTranslations("MESSAGES");
    const { update } = useSession();
    const { toast } = useToast();
    const router = useRouter();
    const { currentStep, workspaceName, workspaceImage, useCase, surname, name } = useOnboardingForm();
    const { mutate: completeOnboarding, isPending } = useMutation({
        mutationFn: async () => {
            const { data } = await axios.post("/api/onboarding", {
                name, surname, useCase, workspaceImage, workspaceName, 
            });
            return data;
        },
        onError: (err: AxiosError) => {
            const error = err?.response?.data ? err.response.data : "ERRORS_DEFAULT"

            toast({
                title: m(error),
                variant: "destructive"
            });
        },
        onSuccess: async () => {
            toast({
                title: m("SUCCESS.ONBOARDING_COMPLETE"),
                variant: "default"
            });
            await update();
            router.push("/dashboard");
            router.refresh();
        },
        mutationKey: ["completeOnboarding"],

    });
    return <>
        <div className='flex flex-col justify-center gap-4 w-full mt-10 text-center'>
            <h2 className="font-bold w-full  text-center text-4xl md:text-5xl ">
                {t("FINISH.TITLE")}
            </h2>
            <p className='dark:text-white text-gray-400 text-xs'>
                Current Workspace Name
            </p>
            {workspaceName}
        </div>
        <div>
            <p>
                <span className='text-primary font-semibold'>Workify</span>
            </p>
            <Button disabled={isPending}
                onClick={() => completeOnboarding()}
                type="submit"
                className=''
            >
                {isPending ? <LoadingState /> : <>
                    {/* (t("START_BTN")) */}
                    start
                </>}
            </Button>
        </div>
    </>
};
