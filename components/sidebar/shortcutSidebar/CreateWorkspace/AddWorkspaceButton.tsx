"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { Plus } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { AddWorkspaceForm } from "./AddWorkspaceForm";

export const AddWorkspaceButton = ()=>{
  const [isOpen, setIsOpen] = useState(false);
  const t = useTranslations("SIDEBAR");
  return <div>
    <Dialog open={isOpen} onOpenChange={setIsOpen} >
      <HoverCard openDelay={250} closeDelay={250} >
        <DialogTrigger asChild >
          <HoverCardTrigger >
            <Button onClick={()=>setIsOpen(!isOpen)} variant={"ghost"} size={"icon"}>
              <Plus />
            </Button>
          </HoverCardTrigger>
        </DialogTrigger>
        <HoverCardContent align="start">{t("MAIN.NEW_WORKSPACE_HOVER")}</HoverCardContent>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {t("MAIN.NEW_WORKSPACE_DIALOG_TITLE")}
            </DialogTitle>
            <DialogDescription>
              {t("MAIN.NEW_WORKSPACE_DIALOG_DESC")}
            </DialogDescription>
          </DialogHeader>
          <AddWorkspaceForm onSetOpen={setIsOpen} />
        </DialogContent>
      </HoverCard>
    </Dialog>
  </div>;
}