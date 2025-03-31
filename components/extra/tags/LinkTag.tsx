import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Tag } from "lucide-react"
import Link from "next/link"

export const LinkTag = ()=>{
    return <Link href={"/"} className={cn(
        `${buttonVariants({
            variant:"outline",
            size:"sm"
        })}px-2.5 py-0.5 h-fit text-xs text-muted-foreground`
    )}>
        <Tag size={16} className="mr-2 w-3 h-3 text-blue-600 hover:text-blue-500"/>
        <span>critical</span>
    </Link>
}