"use client";

import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@radix-ui/react-dropdown-menu";
import { Button } from "../ui/button";
import { Moon, Sun, Monitor } from "lucide-react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export const ThemeSwitcher = () => {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button 
                    variant="ghost" 
                    size="icon"
                    className="relative hover:bg-accent/50 transition-colors"
                    suppressHydrationWarning
                >
                    <motion.div
                        initial={{ rotate: 0, scale: 1 }}
                        animate={{ 
                            rotate: theme === "dark" ? 90 : 0,
                            scale: theme === "dark" ? 0 : 1
                        }}
                        transition={{ type: "spring", stiffness: 300 }}
                    >
                        <Sun className="h-[1.2rem] w-[1.2rem]" />
                    </motion.div>
                    <motion.div
                        initial={{ rotate: -90, scale: 0 }}
                        animate={{ 
                            rotate: theme === "dark" ? 0 : -90,
                            scale: theme === "dark" ? 1 : 0
                        }}
                        transition={{ type: "spring", stiffness: 300 }}
                        className="absolute"
                    >
                        <Moon className="h-[1.2rem] w-[1.2rem]" />
                    </motion.div>
                    <span className="sr-only">Toggle theme</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent 
                align="end"
                className={cn(
                    "min-w-[120px] rounded-md border bg-background p-1 shadow-lg",
                )}
                asChild
            >
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                >
                    <DropdownMenuItem 
                        onClick={() => setTheme("light")}
                        className={cn(
                            "flex items-center gap-2 p-2 text-sm rounded-sm cursor-pointer",
                            "hover:bg-accent focus:bg-accent outline-none transition-colors",
                            theme === "light" && "bg-accent/50 font-medium"
                        )}
                    >
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            className="flex items-center gap-2"
                        >
                            <Sun className="h-4 w-4" />
                            Light
                        </motion.div>
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                        onClick={() => setTheme("dark")}
                        className={cn(
                            "flex items-center gap-2 p-2 text-sm rounded-sm cursor-pointer",
                            "hover:bg-accent focus:bg-accent outline-none transition-colors",
                            theme === "dark" && "bg-accent/50 font-medium"
                        )}
                    >
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            className="flex items-center gap-2"
                        >
                            <Moon className="h-4 w-4" />
                            Dark
                        </motion.div>
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                        onClick={() => setTheme("system")}
                        className={cn(
                            "flex items-center gap-2 p-2 text-sm rounded-sm cursor-pointer",
                            "hover:bg-accent focus:bg-accent outline-none transition-colors",
                            theme === "system" && "bg-accent/50 font-medium"
                        )}
                    >
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            className="flex items-center gap-2"
                        >
                            <Monitor className="h-4 w-4" />
                            System
                        </motion.div>
                    </DropdownMenuItem>
                </motion.div>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};