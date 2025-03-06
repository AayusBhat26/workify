"use client"

import { MAX_WORKSPACES_COUNT } from "@/lib/options";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";

interface Props{
    className?:string;
    activeNumber: number;
}
export const ActiveWorkspacesInfo = ({className, activeNumber}: Props)=>{
    const t = useTranslations("COMMON");
    return (
        <p className={cn("text-muted-foreground text-sm text-center", className)}>
            {t("ACTIVE_WORKSPACES.FIRST")}{""}
            <span className="font-bold">{" "} {activeNumber} {" "} {t("ACTIVE_WORKSPACES.SECOND")}{" "}{MAX_WORKSPACES_COUNT}</span>
            {}
        </p>
    )
}