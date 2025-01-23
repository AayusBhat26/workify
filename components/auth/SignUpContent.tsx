"use client";
import { useForm } from "react-hook-form";
import { CardContent } from "../ui/card";
import { Form, FormControl, FormField, FormItem, FormMessage } from "../ui/form";
import { signUpSchema } from "@/schema/signUpSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { ProviderSignInButtons } from "./ProviderSignInButtons";
import { Input } from "../ui/input";
import { useTranslations } from "next-intl";
import { Button } from "../ui/button";
import Link from "next/link";
export const SignUpContent = () => {
  const form = useForm<signUpSchema>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: "",
      password: "",
      useranme: "",
    },
  });
  const t = useTranslations("AUTH");
  const onSubmit = async (data: signUpSchema) => {
    console.log(data);
  }
  return (
    <CardContent>
      <Form {...form}>
        <form className="space-y-5" onSubmit={form.handleSubmit(onSubmit)}>
          <ProviderSignInButtons />
          <div className="space-y 1 5">
            <FormField control={form.control} name="email" render={({field}) =>(
                <FormItem>
                    <FormControl>
                        <Input placeholder={t("EMAIL")} {...field}/>
                    </FormControl>
                    <FormMessage/>
                </FormItem>
            )} />
            
            <FormField control={form.control} name="useranme" render={({field}) =>(
                <FormItem>
                    <FormControl>
                        <Input placeholder={t("USERNAME")} {...field}/>
                    </FormControl>
                    <FormMessage/>
                </FormItem>
            )} />
            <FormField control={form.control} name="password" render={({field}) =>(
                <FormItem>
                    <FormControl>
                        <Input placeholder={t("PASSWORD")} {...field}/>
                    </FormControl>
                    <FormMessage/>
                </FormItem>
            )} />
          </div>
          <div className="space-y-2">
            <Button className="w-full font-bold text-white" type="submit">{t("SIGN_UP.SUBMIT_BUTTON")}</Button>
            <p className="text-xs text-center text-muted-foreground">
                {t("SIGN_UP.TERMS.FIRST")}{" "}
                <Link className="" href={"/"}>
                {t("SIGN_UP.TERMS.SECOND")}
                </Link>
            </p>
          </div>
        </form>
      </Form>
    </CardContent>
  );
};
