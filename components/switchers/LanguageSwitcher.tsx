"use client";

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { startTransition, useState } from "react";
import { Button } from "../ui/button";
import { LoadingState } from "../ui/loadingState";
import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/navigation"; // Changed import

export const LanguageSwitcher = () => {
    const locale = useLocale(); 
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    const path = usePathname();

    function changeWhenSelected(nextLocale: "hi" | "en") {
        setIsLoading(true); 
        startTransition(() => {
            router.replace(path, { locale: nextLocale });
            setIsLoading(false);
        });
    }

    return(
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button disabled={isLoading} variant={"ghost"} size={"icon"}>
                    {isLoading ? <LoadingState className="mr-0"/> : locale.toUpperCase()}
                    <span className="sr-only">Change Language</span>
                </Button>
            </DropdownMenuTrigger> 
            <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => changeWhenSelected("en")}>
                    EN
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => changeWhenSelected("hi")}>
                    HI
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}