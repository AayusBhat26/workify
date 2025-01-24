"use client";
import { useForm } from "react-hook-form";
import { CardContent } from "../ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import { signUpSchema } from "@/schema/signUpSchema"; // Ensure this schema is updated
import { zodResolver } from "@hookform/resolvers/zod";
import { ProviderSignInButtons } from "./ProviderSignInButtons";
import { Input } from "../ui/input";
import { useTranslations } from "next-intl";
import { Button } from "../ui/button";
import Link from "next/link";
import { useState } from "react";
import { toast, useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { LoadingState } from "../ui/loadingState";

export const SignUpContent = () => {
  const form = useForm<signUpSchema>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: "",
      password: "",
      username: "",
      name: "", // Add default value for name
      surname: "", // Add default value for surname
    },
  });
  const [isLoading, setIsLoading] = useState(false);
  const {} = useToast();
  const router = useRouter();
  const t = useTranslations("AUTH");
  const m = useTranslations("MESSAGES");

  const onSubmit = async (data: signUpSchema) => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!res.ok)
        throw new Error("Something went wrong _ api_call_signup_content");
      const signUpInfo = await res.json();

      if (res.status >= 200 && res.status <= 205) {
        toast({
          title: m("SUCCESS.SIGN_UP"),
          variant: "default",
        });
        await signIn("credentials", {
          email: data.email,
          password: data.password,
          redirect: false,
        });
        router.push("/");
      } else {
        throw new Error(signUpInfo);
      }
    } catch (error) {
      console.log(error);

      let errMessage = m("ERRORS.DEFAULT");
      if (typeof error === "string") {
        errMessage = error;
      } else if (error instanceof Error) {
        errMessage = error.message;
        console.log(errMessage);
      }
      toast({
        title: errMessage,
        variant: "destructive",
      });
    }
    setIsLoading(false);
  };

  return (
    <CardContent>
      <Form {...form}>
        <form className="space-y-5" onSubmit={form.handleSubmit(onSubmit)}>
          <ProviderSignInButtons disabled={isLoading} onLoading={setIsLoading} />
          <div className="space-y-1.5">
            {/* Name Field */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder={t("NAME")} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Surname Field */}
            <FormField
              control={form.control}
              name="surname"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder={t("SURNAME")} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Email Field */}
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

            {/* Username Field */}
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder={t("USERNAME")} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Password Field */}
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
                t("SIGN_UP.SUBMIT_BUTTON")
              )}
            </Button>
            <p className="text-xs text-center text-muted-foreground">
              {t("SIGN_UP.TERMS.FIRST")}{" "}
              <Link className="hover:underline" href={"/"}>
                {t("SIGN_UP.TERMS.SECOND")}
              </Link>
            </p>
          </div>
        </form>
      </Form>
    </CardContent>
  );
};