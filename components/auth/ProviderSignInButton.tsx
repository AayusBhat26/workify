"use client";
import { useProviderLoginError } from "@/hooks/use-error-provider";
import { signIn } from "next-auth/react";
import { useLocale } from "next-intl";
import React, { useState } from "react"

// this works as the wrapper for the button component. 
interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
    providerName: "google" | "github";
    onLoading: React.Dispatch<React.SetStateAction<boolean>>;
}
export const ProviderSignInButton = ({ children, providerName ,onLoading, ...props }: Props) => {
    const [showLoggedInfo, setLoggedInfo] = useState(false); 
    const locale = useLocale(); 
    useProviderLoginError(showLoggedInfo); 

    const singInHandler = async () =>{
        onLoading(true);
        setLoggedInfo(true);
        try {
            await signIn(providerName, {
                callbackUrl: `/${locale}/dashboard`
            })
        } catch (error) {
            console.log(error, "inside the provider signin button ");
            
        }
    }
    return (
        <button onClick={singInHandler}
            className="flex items-center justify-center gap-2 w-full px-4 py-2 text-white bg-gray-800 rounded-md hover:bg-gray-700"
            {...props}
        >
            {children}
        </button>
    );
}