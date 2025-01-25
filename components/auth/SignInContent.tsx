"use client";

import { useForm } from "react-hook-form";
import { CardContent } from "../ui/card";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
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
import { Eye, EyeOff } from "lucide-react";

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
  const [showPassword, setShowPassword] = useState(false);
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
          title: m(`ERRORS.${account.error}`),
          variant: "destructive",
        });
      } else {
        toast({
          title: m("SUCCESS.SIGN_IN"),
        });
        router.push("/dashboard");
        router.refresh();
      }
    } catch (err) {
      let errMsg = m("ERRORS.DEFAULT");
      if (typeof err === "string") {
        errMsg = m(`ERRORS.${err}`);
      } else if (err instanceof Error) {
        errMsg = m(`ERRORS.${err.message}`);
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
      <Form {...form} >
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-7 ">
          <ProviderSignInButtons  onLoading={setIsLoading} />
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input 
                      placeholder={t("EMAIL")} 
                      {...field} 
                      className="h-12 dark:bg-gray-900 dark:border-gray-800 dark:text-white dark:placeholder:text-gray-400"
                    />
                  </FormControl>
                  <FormMessage className="dark:text-red-400" />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type={showPassword ? "text" : "password"}
                        placeholder={t("PASSWORD")}
                        {...field}
                        className="pr-10 h-12 dark:bg-gray-900 dark:border-gray-800 dark:text-white dark:placeholder:text-gray-400"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
                        aria-label={showPassword ? t("SIGN_IN.HIDE_PASSOWRD") : t("SHOW_PASSWORD")}
                      >
                        {showPassword ? (
                          <EyeOff className="h-5 w-5" />
                        ) : (
                          <Eye className="h-5 w-5" />
                        )}
                      </button>
                    </div>
                  </FormControl>
                  <FormMessage className="dark:text-red-400" />
                </FormItem>
              )}
            />
          </div>

          <div className="space-y-2">
            <Button
              disabled={isLoading}
              className="w-full font-bold text-gray-900 bg-primary hover:bg-primary/90 dark:bg-gradient-to-r dark:from-gray-900 dark:to-gray-800 dark:text-white dark:hover:from-gray-800 dark:hover:to-gray-700"
              type="submit"
            >
              {isLoading ? (
                <LoadingState loadingText={m("PENDING.LOADING")} />
              ) : (
                t("SIGN_IN.SUBMIT_BUTTON")
              )}
            </Button>
            
            <p className="text-xs text-center text-muted-foreground dark:text-gray-400">
              {t("SIGN_IN.DONT_HAVE_ACCOUNT.FIRST")}{" "}
              <Link 
                href="/sign-up" 
                className="text-primary hover:underline dark:text-primary-400"
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