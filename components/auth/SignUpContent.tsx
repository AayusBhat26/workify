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
import { signUpSchema } from "@/schema/signUpSchema";
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
import { Eye, EyeOff } from "lucide-react";
import {motion} from "framer-motion";
export const SignUpContent = () => {
  const form = useForm<signUpSchema>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: "",
      password: "",
      username: "",
      name: "",
      surname: "",
    },
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { toast } = useToast();
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
      
      if (!res.ok) throw new Error("Something went wrong _ api_call_signup_content");
      
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
      let errMessage = m("ERRORS.DEFAULT");
      if (typeof error === "string") {
        errMessage = error;
      } else if (error instanceof Error) {
        errMessage = error.message;
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
        <motion.form 
          className="space-y-6" 
          onSubmit={form.handleSubmit(onSubmit)}
          initial="hidden"
          animate="visible"
          
        >
          <motion.div >
            <ProviderSignInButtons disabled={isLoading} onLoading={setIsLoading} />
          </motion.div>

          <div className="space-y-4">
            {/* Name and Surname Row */}
            <motion.div 
              className="grid md:grid-cols-2 gap-4"
              
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <motion.div
                       
                      >
                        <Input
                          placeholder={t("NAME")}
                          {...field}
                          className="h-12 dark:bg-gray-900 dark:border-gray-800 dark:text-white dark:placeholder:text-gray-400"
                         
                        />
                      </motion.div>
                    </FormControl>
                    <FormMessage className="dark:text-red-400" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="surname"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <motion.div
                        
                        transition={{ delay: 0.2 }}
                      >
                        <Input
                          placeholder={t("SURNAME")}
                          {...field}
                          className="h-12 dark:bg-gray-900 dark:border-gray-800 dark:text-white dark:placeholder:text-gray-400"
                        
                        />
                      </motion.div>
                    </FormControl>
                    <FormMessage className="dark:text-red-400" />
                  </FormItem>
                )}
              />
            </motion.div>

            {/* Email Field */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <motion.div
                      
                      transition={{ delay: 0.3 }}
                    >
                      <Input
                        placeholder={t("EMAIL")}
                        {...field}
                        className="h-12 dark:bg-gray-900 dark:border-gray-800 dark:text-white dark:placeholder:text-gray-400"
                        
                      />
                    </motion.div>
                  </FormControl>
                  <FormMessage className="dark:text-red-400" />
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
                    <motion.div
                     
                      transition={{ delay: 0.4 }}
                    >
                      <Input
                        placeholder={t("USERNAME")}
                        {...field}
                        className="h-12 dark:bg-gray-900 dark:border-gray-800 dark:text-white dark:placeholder:text-gray-400"
                        
                      />
                    </motion.div>
                  </FormControl>
                  <FormMessage className="dark:text-red-400" />
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
                    <motion.div
                      
                    >
                      <div className="relative">
                        <Input
                          type={showPassword ? "text" : "password"}
                          placeholder={t("PASSWORD")}
                          {...field}
                          className="pr-10 h-12 dark:bg-gray-900 dark:border-gray-800 dark:text-white dark:placeholder:text-gray-400"
                        />
                        <motion.button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
                          aria-label={showPassword ? t("SIGN_IN.HIDE_PASSWORD") : t("SHOW_PASSWORD")}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          {showPassword ? (
                            <EyeOff className="h-5 w-5" />
                          ) : (
                            <Eye className="h-5 w-5" />
                          )}
                        </motion.button>
                      </div>
                    </motion.div>
                  </FormControl>
                  <FormMessage className="dark:text-red-400" />
                </FormItem>
              )}
            />
          </div>

          <motion.div 
            className="space-y-3"
            
            transition={{ delay: 0.6 }}
          >
            <Button
              disabled={isLoading}
              className="w-full font-bold text-gray-900 bg-primary hover:bg-primary/90 dark:bg-gradient-to-r dark:from-gray-900 dark:to-gray-800 dark:text-white dark:hover:from-gray-800 dark:hover:to-gray-700"
              type="submit"
              asChild
            >
              <motion.div
                
              >
                {isLoading ? (
                  <LoadingState loadingText={m("PENDING.LOADING")} />
                ) : (
                  t("SIGN_UP.SUBMIT_BUTTON")
                )}
              </motion.div>
            </Button>
            
            <motion.p 
              className="text-xs text-center text-muted-foreground dark:text-gray-400"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              {t("SIGN_UP.TERMS.FIRST")}{" "}
              <Link
                href="/"
                className="text-primary hover:underline dark:text-primary-400"
              >
                {t("SIGN_UP.TERMS.SECOND")}
              </Link>
            </motion.p>
          </motion.div>
        </motion.form>
      </Form>
    </CardContent>
  );
}; 