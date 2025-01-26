// ProviderSignInButton.tsx
"use client";
import { useProviderLoginError } from "@/hooks/use-error-provider";
import { cn } from "@/lib/utils";
import { signIn } from "next-auth/react";
import { useLocale } from "next-intl";
import React, { useState } from "react";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  providerName: "google" | "github";
  onLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ProviderSignInButton = ({ 
  children, 
  providerName,
  onLoading,
  ...props 
}: Props) => {
  const [showLoggedInfo, setLoggedInfo] = useState(false);
  const locale = useLocale();
  useProviderLoginError(showLoggedInfo);

  const handleSignIn = async () => {
    onLoading(true);
    setLoggedInfo(true);
    try {
      await signIn(providerName, {
        callbackUrl: `/${locale}/onboarding`
      });
    } catch (error) {
      console.error("Provider sign-in error:", error);
    }
  };

  return (
    <div className="relative group">
      <button
        onClick={handleSignIn}
        {...props}
        className={cn(
          "relative z-10 flex items-center justify-center",
          "transition-transform duration-200 hover:scale-110",
          props.className
        )}
      >
        {children}
      </button>
      
      {/* Animated tooltip */}
      <div className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        <div className="px-2.5 py-1.5 text-xs font-medium bg-foreground text-background rounded-full whitespace-nowrap">
          Sign in with {providerName.charAt(0).toUpperCase() + providerName.slice(1)}
        </div>
        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-foreground rotate-45" />
      </div>
    </div>
  );
};