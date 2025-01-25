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
import { cn } from "@/lib/utils"; // Ensure you have a cn utility or use classnames

export const ThemeSwitcher = () => {
    const { theme, setTheme } = useTheme();

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button 
                    variant="ghost" 
                    size="icon"
                    className="relative hover:bg-accent/50 transition-colors"
                >
                    <Sun className={cn(
                        "h-[1.2rem] w-[1.2rem] absolute transition-all",
                        theme === "dark" ? "rotate-90 scale-0" : "rotate-0 scale-100"
                    )} />
                    <Moon className={cn(
                        "h-[1.2rem] w-[1.2rem] absolute transition-all",
                        theme === "dark" ? "rotate-0 scale-100" : "-rotate-90 scale-0"
                    )} />
                    <span className="sr-only">Toggle theme</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent 
                align="end"
                className={cn(
                    "min-w-[120px] rounded-md border bg-background p-1 shadow-lg",
                    "data-[state=open]:animate-in data-[state=closed]:animate-out",
                    "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
                    "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95"
                )}
            >
                <DropdownMenuItem 
                    onClick={() => setTheme("light")}
                    className={cn(
                        "flex items-center gap-2 p-2 text-sm rounded-sm cursor-pointer",
                        "hover:bg-accent focus:bg-accent outline-none transition-colors",
                        theme === "light" && "bg-accent/50 font-medium"
                    )}
                >
                    <Sun className="h-4 w-4" />
                    Light
                </DropdownMenuItem>
                <DropdownMenuItem 
                    onClick={() => setTheme("dark")}
                    className={cn(
                        "flex items-center gap-2 p-2 text-sm rounded-sm cursor-pointer",
                        "hover:bg-accent focus:bg-accent outline-none transition-colors",
                        theme === "dark" && "bg-accent/50 font-medium"
                    )}
                >
                    <Moon className="h-4 w-4" />
                    Dark
                </DropdownMenuItem>
                <DropdownMenuItem 
                    onClick={() => setTheme("system")}
                    className={cn(
                        "flex items-center gap-2 p-2 text-sm rounded-sm cursor-pointer",
                        "hover:bg-accent focus:bg-accent outline-none transition-colors",
                        theme === "system" && "bg-accent/50 font-medium"
                    )}
                >
                    <Monitor className="h-4 w-4" />
                    System
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};