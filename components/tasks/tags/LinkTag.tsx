"use client";
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Tag } from "lucide-react"
import Link from "next/link"
import {Tag as TagType, WorkspaceIconColor} from "@prisma/client"
import { useMemo } from "react"
interface Props{
    tag:TagType;
    disabled: boolean;
}
export const LinkTag = ({tag:{color, id, name, workspaceId}, disabled}: Props)=>{
     const tagColor = useMemo(() => {
          switch (color) {
            case WorkspaceIconColor.BLUE:
              return "text-blue-600 hover:text-blue-500 border-blue-600 hover:border-blue-500";
            case WorkspaceIconColor.EMERALD:
              return "text-emerald-600 hover:text-emerald-500 border-emerald-600 hover:border-emerald-500";
            case WorkspaceIconColor.LIME:
              return "text-lime-600 hover:text-lime-500 border-lime-600 hover:border-lime-500";
            case WorkspaceIconColor.ORANGE:
              return "text-orange-600 hover:text-orange-500 border-orange-600 hover:border-orange-500";
            case WorkspaceIconColor.PINK:
              return "text-pink-600 hover:text-pink-500 border-pink-600 hover:border-pink-500";
            case WorkspaceIconColor.YELLOW:
              return "text-yellow-600 hover:text-yellow-500 border-yellow-600 hover:border-yellow-500";
            case WorkspaceIconColor.RED:
              return "text-red-600 hover:text-red-500 border-red-600 hover:border-red-500";
            case WorkspaceIconColor.PURPLE:
              return "text-purple-600 hover:text-purple-500 border-purple-600 hover:border-purple-500";
            case WorkspaceIconColor.GREEN:
              return "text-green-600 hover:text-green-500 border-green-600 hover:border-green-500";
            case WorkspaceIconColor.CYAN:
              return "text-cyan-600 hover:text-cyan-500 border-cyan-600 hover:border-cyan-500";
            case WorkspaceIconColor.INDIGO:
              return "text-indigo-600 hover:text-indigo-500 border-indigo-600 hover:border-indigo-500";
            default:
              return "text-blue-600 hover:text-blue-500 border-blue-600 hover:border-blue-500";
          }
        }, [color]);
    return <Link 
    aria-disabled={disabled}
    href={"/"} className={cn(
        `${buttonVariants({
            variant:"outline",
            size:"sm"
        })}px-2.5 py-0.5 h-fit text-xs ${disabled ? "pointer-events-none": " "} ` 
    )}>
        <Tag size={16} className={`mr-2 w-3 h-3 ${tagColor}`}/>
        <span>{name}</span>
    </Link>
}