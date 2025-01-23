"use client";

import { useForm } from "react-hook-form";
import { CardContent } from "../ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ProviderSignInButtons } from "./ProviderSignInButtons";
import { Input } from "../ui/input";
import { useTranslations } from "next-intl";
import { Button } from "../ui/button";
import Link from "next/link";
import { signInSchema, SignInSchema } from "@/schema/signInSchema";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { LoadingState } from "../ui/loadingState";

export const SignInContent = () => {
  const t = useTranslations("AUTH");
  const form = useForm<SignInSchema>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const router = useRouter();
  const m = useTranslations("MESSAGES");

  const onSubmit = async (data: SignInSchema) => {
    setIsLoading(true);

    try {
      const account = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
      });

      if (!account) throw new Error("Something went wrong");

      if (account.error) {
        toast({
          title: m(`ERRORS.${account.error}`), // Use the error key from MESSAGES
          variant: "destructive",
        });
      } else {
        toast({
          title: m("SUCCESS.SIGN_IN"), // Success message
        });
        router.push("/onboarding");
        router.refresh();
      }
    } catch (err) {
      let errMsg = m("ERRORS.DEFAULT"); // Default error message
      if (typeof err === "string") {
        errMsg = m(`ERRORS.${err}`); // Use the error key from MESSAGES
      } else if (err instanceof Error) {
        errMsg = m(`ERRORS.${err.message}`); // Use the error key from MESSAGES
      }
      toast({
        title: errMsg,
        variant: "destructive",
      });
    }
    setIsLoading(false);
  };

  return (
    <CardContent>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-7">
          <ProviderSignInButtons signInCard disabled={isLoading} />
          <div className="space-y-1.5">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder={t("EMAIL")} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder={t("PASSWORD")}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="space-y-2">
            <Button
              disabled={isLoading}
              className="w-full font-bold text-white"
              type="submit"
            >
              {isLoading ? (
                <LoadingState loadingText={m("PENDING.LOADING")} />
              ) : (
                t("SIGN_IN.SUBMIT_BUTTON")
              )}
            </Button>
            <p className="text-xs text-center text-muted-foreground">
              {t("SIGN_IN.DONT_HAVE_ACCOUNT.FIRST")}{" "}
              <Link
                href="/sign-up"
                className="text-primary hover:underline"
              >
                {t("SIGN_IN.DONT_HAVE_ACCOUNT.SECOND")}
              </Link>
            </p>
          </div>
        </form>
      </Form>
    </CardContent>
  );
};