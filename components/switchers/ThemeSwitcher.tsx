"use client";

import { DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { DropdownMenu } from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export const ThemeSwitcher = () => {
    const {setTheme}= useTheme();
  return <DropdownMenu>
    <DropdownMenuTrigger asChild>
        <Button variant={"outline"} size={"icon"}>
            <Sun className="h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:-rotate-0 dark:scale-100"/>
            <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"/>
            <span className="sr-only">toggle theme</span>
        </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end">
        <DropdownMenuItem className="text-sm p-2" onClick={() =>setTheme("light")}>
            Light
        </DropdownMenuItem>
        <DropdownMenuItem className="text-sm p-2" onClick={() =>setTheme("dark")}>
            Dark
        </DropdownMenuItem>
        <DropdownMenuItem className="text-sm p-2" onClick={() =>setTheme("system")}>
            System
        </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>;
};
