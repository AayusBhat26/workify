"use client";

import {Button} from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Plus } from "lucide-react";
import { CommandContainer } from "./CommandContainer";
import { Tag, WorkspaceIconColor } from "@prisma/client";
import { LoadingState } from "@/components/ui/loadingState";
import { useRouter } from "next/navigation";

interface Props{
    tags?: Tag[];
    isLoading: boolean;
    currentActiveTag: Tag[];
    onSelectActiveTag: (id: string)=>void;
    workspaceId: string;
    onUpdateActiveTags?: (tagId: string, color: WorkspaceIconColor, name: string) => void;
    onDeleteActiveTag?: (tagId: string) => void;
}

export const TagSelector = ({tags, currentActiveTag, onSelectActiveTag, workspaceId, onUpdateActiveTags, isLoading, onDeleteActiveTag}:Props)=>{

    const router = useRouter();
    
    return <DropdownMenu>
        <DropdownMenuTrigger asChild>
            <Button className="w-fit h-fit text-xs justify-start text-left font-normal px-2.5 py-0" variant={"outline"} size={"sm"}>
                <Plus size={16} className=""/>
                <span className="hidden sm:inline">new tag </span>
                <span className="sm:hidden">tag</span>
            </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent >
            {isLoading && (
                <div className="p-3 flex justify-center items-center">
                    <LoadingState/>
                </div>
            )}

            {!isLoading && tags ? (<CommandContainer
            workspaceId={workspaceId}
            tags={tags}
            currentActiveTags={currentActiveTag}
            onSelectActiveTag={onSelectActiveTag}
            onUpdateActiveTags={onUpdateActiveTags}
            onDeleteActiveTag={onDeleteActiveTag}
            /> ):( <div className="p-3 text-sm  flex flex-col justify-center items-center gap-4">
                {/* <LoadingState/> */}
                <p>Something went wrong</p>
                <Button onClick={()=>router.refresh()}
                    className="w-full" size={"sm"} variant={"default"}>
                    Refresh Page</Button>
            </div>)}
            {/* <h1>content</h1> */}
        </DropdownMenuContent>
    </DropdownMenu>
}