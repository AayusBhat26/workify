"use client";

import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@radix-ui/react-dropdown-menu";
import { startTransition, useState } from "react";
import { Button } from "../ui/button";
import { LoadingState } from "../ui/loadingState";
import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/navigation";
import { useTheme } from "next-themes";
import { Globe } from "lucide-react";

export const LanguageSwitcher = () => {
    const { theme } = useTheme();
    const locale = useLocale();
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    const path = usePathname();

    function changeLanguage(nextLocale: "hi" | "en") {
        setIsLoading(true);
        startTransition(() => {
            router.replace(path, { locale: nextLocale });
            setIsLoading(false);
        });
    }

    return(
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button 
                    disabled={isLoading} 
                    variant={"ghost"} 
                    size={"icon"}
                    className="hover:bg-accent/50 transition-all duration-200"
                >
                    {isLoading ? (
                        <LoadingState className="h-4 w-4" />
                    ) : (
                        <>
                            <Globe className={`h-4 w-4 ${theme === 'dark' ? 'text-foreground' : 'text-primary'} transition-transform hover:scale-110`} />
                            <span className="sr-only">Change Language</span>
                        </>
                    )}
                </Button>
            </DropdownMenuTrigger> 
            
            <DropdownMenuContent 
                align="end"
                className={`${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-lg shadow-lg`}
            >
                <DropdownMenuItem 
                    onClick={() => changeLanguage("en")}
                    className={`cursor-pointer p-2 transition-all duration-200 ${
                        theme === 'dark' 
                            ? 'hover:bg-gray-700/80 hover:translate-x-1' 
                            : 'hover:bg-accent/20 hover:translate-x-1'
                    }`}
                >
                    <span className={`${locale === 'en' ? 'font-bold' : 'font-medium'} ${
                        theme === 'dark' 
                            ? 'text-white hover:text-primary' 
                            : 'text-gray-800 hover:text-primary'
                    } transition-colors duration-200 flex items-center gap-2`}>
                        <span className="text-sm">English</span>
                        <span className="text-xs opacity-70">EN</span>
                    </span>
                </DropdownMenuItem>
                
                <DropdownMenuItem 
                    onClick={() => changeLanguage("hi")}
                    className={`cursor-pointer p-2 transition-all duration-200 ${
                        theme === 'dark' 
                            ? 'hover:bg-gray-700/80 hover:translate-x-1' 
                            : 'hover:bg-accent/20 hover:translate-x-1'
                    }`}
                >
                    <span className={`${locale === 'hi' ? 'font-bold' : 'font-medium'} ${
                        theme === 'dark' 
                            ? 'text-white hover:text-primary' 
                            : 'text-gray-800 hover:text-primary'
                    } transition-colors duration-200 flex items-center gap-2`}>
                        <span className="text-sm">हिन्दी</span>
                        <span className="text-xs opacity-70">HI</span>
                    </span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}