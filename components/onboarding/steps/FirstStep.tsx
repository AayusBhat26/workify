import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useOnboardingForm } from "@/context/OnboardingForm";
import { moreInfoFirst } from "@/schema/moreInfoFirst";
import { ActionType } from "@/types/OnboardingContext";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, User } from "lucide-react";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { AddUserImage } from "../common/AddUserImage";
import { useSession } from "next-auth/react";
import { useTranslations } from "next-intl";

interface Props {
    profileImage?: string | null;
}
export const FirstStep = ({ profileImage }: Props) => {
    const session = useSession();
    const { currentStep, name, surname, dispatch } = useOnboardingForm();
    const form = useForm<moreInfoFirst>({
        resolver: zodResolver(moreInfoFirst),
        defaultValues: {
            name: name ? name : "",
            surname: surname ? surname : ""
        },
    });
    const t = useTranslations("ONBOARDING_FORM");
    useEffect(() => {
        dispatch({ type: ActionType.PROFILEIMAGE, payload: profileImage as string | null });
    }, [profileImage, dispatch])
    const onSubmit = (data: moreInfoFirst) => {
        dispatch({ type: ActionType.NAME, payload: data.name! });
        dispatch({ type: ActionType.SURNAME, payload: data.surname! });
        dispatch({ type: ActionType.CHANGE_SITE, payload: currentStep + 1 });

    }
    return <>
        <h3 className="font-bold  md:text-2xl flex flex-col items-center my-10 w-full">
            <span>
                {t("FIRST_STEP.TITLE.FIRST")}
            </span>
            {/* <span>{t("FIRST_STEP.TITLE.SECOND")}</span> */}
        </h3>
        <div className="max-w-md w-full space-y-8">
            <div className="w-full flex flex-col justify-center items-center gap-2">
                <p>{t("FIRST_STEP.PHOTO")}</p>
                <AddUserImage profileImage={profileImage} fullname={`${name} ${surname}`} />
            </div>
            <Form {...form}>
                <form className="space-y-8" onSubmit={form.handleSubmit(onSubmit)}>
                    <div className="space-y-1 8">
                        <FormField control={form.control} name="name"

                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-muted-foreground">
                                        {t("FIRST_STEP.INPUTS.NAME")}
                                    </FormLabel>
                                    <FormControl>
                                        <Input placeholder={t("FIRST_STEP.PLACEHOLDER.NAME")} {...field} className="bg-muted" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField control={form.control} name="surname"

                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-muted-foreground">
                                        {t("FIRST_STEP.INPUTS.SURNAME")}
                                    </FormLabel>
                                    <FormControl>
                                        <Input placeholder={t("FIRST_STEP.PLACEHOLDER.SURNAME")} {...field}
                                            className="bg-muted"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <Button className="w-full max-w-md dark:text-black font-semibold">Move to Step 2
                        <ArrowRight className="" width={15} height={15} />
                    </Button>
                </form>
            </Form>

        </div>
    </>
};