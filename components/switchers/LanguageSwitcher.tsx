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
import { motion, AnimatePresence } from "framer-motion";
import { useEffect } from "react";

export const LanguageSwitcher = () => {
    const { theme } = useTheme();
    const locale = useLocale();
    const [isLoading, setIsLoading] = useState(false);
    const [mounted, setMounted] = useState(false);
    const router = useRouter();
    const path = usePathname();

    useEffect(() => {
        setMounted(true);
    }, []);

    function changeLanguage(nextLocale: "hi" | "en") {
        setIsLoading(true);
        startTransition(() => {
            router.replace(path, { locale: nextLocale });
            setIsLoading(false);
        });
    }

    if (!mounted) return null;

    return(
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button 
                    disabled={isLoading} 
                    variant={"ghost"} 
                    size={"icon"}
                    className="hover:bg-accent/50 transition-all duration-200"
                    suppressHydrationWarning
                >
                    {isLoading ? (
                        <LoadingState className="h-4 w-4" />
                    ) : (
                        <motion.div
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                        >
                            <Globe className={`h-4 w-4 transition-transform`} />
                            <span className="sr-only">Change Language</span>
                        </motion.div>
                    )}
                </Button>
            </DropdownMenuTrigger> 
            
            <DropdownMenuContent 
                align="end"
                className="rounded-lg shadow-lg overflow-hidden"
                asChild
            >
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className={theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}
                >
                    <DropdownMenuItem 
                        onClick={() => changeLanguage("en")}
                        className="cursor-pointer p-2 outline-none"
                    >
                        <motion.div
                            whileHover={{ x: 5 }}
                            className={`flex items-center gap-2 ${
                                theme === 'dark' ? 'text-white' : 'text-gray-800'
                            }`}
                        >
                            <span className={`${locale === 'en' ? 'font-bold' : 'font-medium'} transition-colors duration-200 flex items-center gap-2`}>
                                <span className="text-sm">English</span>
                                <span className="text-xs opacity-70">EN</span>
                            </span>
                        </motion.div>
                    </DropdownMenuItem>
                    
                    <DropdownMenuItem 
                        onClick={() => changeLanguage("hi")}
                        className="cursor-pointer p-2 outline-none"
                    >
                        <motion.div
                            whileHover={{ x: 5 }}
                            className={`flex items-center gap-2 ${
                                theme === 'dark' ? 'text-white' : 'text-gray-800'
                            }`}
                        >
                            <span className={`${locale === 'hi' ? 'font-bold' : 'font-medium'} transition-colors duration-200 flex items-center gap-2`}>
                                <span className="text-sm">हिन्दी</span>
                                <span className="text-xs opacity-70">HI</span>
                            </span>
                        </motion.div>
                    </DropdownMenuItem>
                </motion.div>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}