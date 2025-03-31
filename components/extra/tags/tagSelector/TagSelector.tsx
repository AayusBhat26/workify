"use client";

import {Button} from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Plus } from "lucide-react";
import { CommandContainer } from "./CommandContainer";

export const TagSelector = ()=>{
    return <DropdownMenu>
        <DropdownMenuTrigger asChild>
            <Button className="w-fit h-fit text-xs justify-start text-left font-normal px-2.5 py-0 text-muted-foreground" variant={"outline"} size={"sm"}>
                <Plus size={16} className=""/>
                <span className="hidden sm:inline">new tag </span>
                <span className="sm:hidden">tag</span>
            </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent >
            {/* <h1>content</h1> */}
            <CommandContainer/>
        </DropdownMenuContent>
    </DropdownMenu>
}