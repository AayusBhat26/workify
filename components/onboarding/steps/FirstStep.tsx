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
export const FirstStep = () => {
    const session = useSession();
    const { currentStep, name, surname, dispatch, profileImage } = useOnboardingForm();
    const form = useForm<moreInfoFirst>({
        resolver: zodResolver(moreInfoFirst),
        defaultValues: {
            name: name ? name : "",
            surname: surname ? surname : ""
        },
    });
    useEffect(() => {
        dispatch({ type: ActionType.PROFILEIMAGE, payload: session.data?.user.image as string });
    }, [session.data?.user.image, dispatch])
    const onSubmit = (data: moreInfoFirst) => {
        dispatch({ type: ActionType.NAME, payload: data.name! });
        dispatch({ type: ActionType.SURNAME, payload: data.surname! });
        dispatch({ type: ActionType.CHANGE_SITE, payload: currentStep + 1 });

    }
    return <div className="max-w-md w-full space-y-8">
        {/* <div className="flex flex-col justify-center items-center gap-2">
            <p className="text-sm text-muted-foreground">
                Add A photo
            </p>
            <div className="bg-muted w-16 md:w-20 md:h-20 h-16 rounded-full flex justify-center items-center text-muted-foreground">
                <User />
            </div>
        </div> */}
        <AddUserImage profileImage={profileImage} fullname={`${name} ${surname}`} />
        <Form {...form}>
            <form className="space-y-8" onSubmit={form.handleSubmit(onSubmit)}>
                <div className="space-y-1 8">
                    <FormField control={form.control} name="name"

                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-muted-foreground">Name</FormLabel>
                                <FormControl>
                                    <Input placeholder="aayush" {...field} className="bg-muted" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField control={form.control} name="surname"

                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-muted-foreground"> Surname</FormLabel>
                                <FormControl>
                                    <Input placeholder="bhat" {...field}
                                        className="bg-muted"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <Button className="w-full max-w-md dark:text-white font-semibold">Move to Step 2
                    <ArrowRight className="" width={15} height={15} />
                </Button>
            </form>
        </Form>

    </div>
};