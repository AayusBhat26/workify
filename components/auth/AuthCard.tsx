"use client";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "../ui/card";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { SignUpContent } from "./SignUpContent";
import { SignInContent } from "./SignInContent";
import { Separator } from "../ui/separator";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { ProviderSignInButtons } from "./ProviderSignInButtons";
import { useState } from "react";

interface Props {
  signInCard?: boolean;
}

export const AuthCard = ({ signInCard }: Props) => {
  const t = useTranslations("AUTH");
  const [isLoading, setIsLoading] = useState(false);
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-[440px] mx-4"
    >
      <Card className={cn(
        "relative overflow-hidden shadow-2xl",
        "bg-background border border-border",
        "transition-all duration-300 hover:shadow-3xl"
      )}>
        {/* Animated gradient background */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute inset-0 z-0"
          aria-hidden="true"
        >
          <div className="absolute -inset-8 opacity-40">
            <div className="w-full h-full animate-gradient-rotate bg-[conic-gradient(from_var(--shimmer-angle),hsl(240,20%,95%)_0%,hsl(240,30%,90%)_10%,hsl(240,20%,95%)_20%)] dark:bg-[conic-gradient(from_var(--shimmer-angle),hsl(240,5%,5%)_0%,hsl(240,5%,10%)_50%,hsl(240,5%,5%)_100%)]" />
          </div>
        </motion.div>

        {/* Content container */}
        <div className="relative z-10 space-y-8 p-8">
          {/* Branding header */}
          <motion.div 
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            className="flex flex-col items-center space-y-6"
          >
            <h1 className="text-5xl font-bold tracking-tighter text-white dark:text-white">
              WORKIFY
            </h1>
            <div className="text-center space-y-2">
              <CardTitle className="text-3xl font-bold text-foreground">
                {signInCard ? t("SIGN_IN.TITLE") : t("SIGN_UP.TITLE")}
              </CardTitle>
              <CardDescription className="text-muted-foreground/90 text-lg">
                {signInCard ? t("SIGN_IN.MESSAGE") : t("SIGN_UP.MESSAGE")}
              </CardDescription>
            </div>
          </motion.div>

          {/* Form content */}
          <CardContent className="p-0 space-y-8">
            {signInCard ? <SignInContent /> : <SignUpContent />}

            {/* Social auth section */}
            <div className="space-y-6">
              <Separator className="bg-border" />
              <div className="text-center text-sm text-muted-foreground">
                {t("COMMON.OR_CONTINUE_WITH")}
              </div>
              <ProviderSignInButtons 
                onLoading={setIsLoading}
                disabled={isLoading}
              />
            </div>
          </CardContent>

          {/* Switch auth mode */}
          <div className="text-center text-sm text-muted-foreground/90">
            {signInCard ? t("SIGN_IN.DONT_HAVE_ACCOUNT.FIRST") : t("SIGN_UP.HAVE_ACCOUNT.FIRST")}
            <Link
              href={signInCard ? "/sign-up" : "/sign-in"}
              className="ml-2 font-semibold text-primary hover:text-primary/80 transition-colors underline decoration-2 underline-offset-4"
            >
              {signInCard ? t("SIGN_IN.DONT_HAVE_ACCOUNT.SECOND") : t("SIGN_UP.HAVE_ACCOUNT.SECOND")}
            </Link>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};