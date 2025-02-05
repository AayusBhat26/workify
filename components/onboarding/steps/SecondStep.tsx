import { Button } from '@/components/ui/button';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { RadioGroupItem } from '@/components/ui/radio-group';
import { useOnboardingForm } from '@/context/OnboardingForm';
import { moreInfoSecond } from '@/schema/moreInfoSecond';
import { ActionType } from '@/types/OnboardingContext';
import { zodResolver } from '@hookform/resolvers/zod';
import { RadioGroup } from '@/components/ui/radio-group';
import { ArrowRight } from 'lucide-react';
import { useTranslations } from 'next-intl';
import React from 'react';
import { useForm } from 'react-hook-form';

const useCases = [
    {
        case: 'WORK',
        title: 'For work',
    },
    {
        case: 'STUDY',
        title: 'For Study',
    },
    {
        case: 'PERSONAL',
        title: 'For Personal Use',
    },
];
export const SecondStep = () => {
    const { currentStep, dispatch, surname } = useOnboardingForm();
    const form = useForm<moreInfoSecond>({
        resolver: zodResolver(moreInfoSecond),
    });
    const t = useTranslations("ONBOARDING_FORM");

    const onSubmit = (data: moreInfoSecond) => {
        dispatch({ type: ActionType.USECASE, payload: data.useCase });
        dispatch({ type: ActionType.SURNAME, payload: surname });
        dispatch({ type: ActionType.CHANGE_SITE, payload: currentStep + 1 });
    };
    return (
        <>
            <div className="flex flex-col justify-center items-center gap-4 w-full mt-10 text-center">
                <h2 className="font-bold text-2xl md:text-4xl  max-w-xs">
                    {t("SECOND_STEP.TITLE")}{" "}
                    <span className="text-primary font-semibold">WORKIFY?</span>
                </h2>
                <p className="max-w-lg text-muted-foreground">
                    {t("SECOND_STEP.INFO")}
                </p>
            </div>
            <div className="max-w-md w-full space-y-8 mt-14">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <FormField
                            control={form.control}
                            name="useCase"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <RadioGroup
                                            onValueChange={field.onChange}
                                            defaultValue={field.value}
                                            className="flex flex-col space-y-1"
                                        >
                                            {useCases.map((useCase) => (
                                                <FormItem
                                                    key={useCase.case}
                                                    className={`flex items-center space-x-3 space-y-0 p-3 rounded-md transition-colors duration-200 relative overflow-hidden ${form.getValues("useCase") === useCase.case
                                                        ? "bg-primary/40"
                                                        : "hover:bg-primary/10"
                                                        }`}
                                                >
                                                    <FormControl
                                                        onClick={(e) => {
                                                            const target = e.target as HTMLInputElement;
                                                            dispatch({
                                                                type: ActionType.USECASE,
                                                                payload: target.value,
                                                            });
                                                        }}
                                                    >
                                                        <RadioGroupItem value={useCase.case} />
                                                    </FormControl>
                                                    <FormLabel className="font-normal lg:text-lg h-full left-9 flex items-center absolute w-full cursor-pointer">
                                                        {useCase.title}
                                                    </FormLabel>
                                                </FormItem>
                                            ))}
                                        </RadioGroup>
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <Button
                            className="mt-10 w-full max-w-md dark:text-white font-semibold"
                            //   disabled={!form.formState.isValid}
                            type="submit"
                        >
                            {t("NEXT_BTN")}
                            <ArrowRight width={18} height={18} />
                        </Button>
                    </form>
                </Form>
            </div>
        </>
    );
};