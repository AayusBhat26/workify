"use client";

import ActiveLink from "@/components/ui/active-link";
import { Brain, Calendar, Files, Map, Pencil } from "lucide-react";
import { useTranslations } from "next-intl";
import { useMemo } from "react";

interface Props {
  workspaceId: string;
};

export const WorkspaceOptions = ({ workspaceId }: Props) => {
  const t = useTranslations("SIDEBAR.WORKSPACE_OPTIONS");
  const workspaceOptionsFields = useMemo(()=>[
    {
    href: `/dashboard/workspace/${workspaceId}/tasks`,
    icon: <Pencil size={20}/>,
    title: `${t("TASKS")}`,
  },
  {
    href: `/dashboard/workspace/${workspaceId}/mind-maps`,
    icon: <Map size={20}/>,
    title: `${t("MIND_MAPS")}`,
  },
  {
    href: `/dashboard/workspace/${workspaceId}/schedules`,
    icon: <Calendar size={20}/>,
    title: `${t("SCHEDULES")}`,
  },
  {
    href: `/dashboard/workspace/${workspaceId}/study`,
    icon: <Brain size={20}/>,
    title: `${t("STUDY")}`,
  },
  {
    href: `/dashboard/workspace/${workspaceId}/files`,
    icon: <Files size={20}/>,
    title: `${t("FILES")}`,
  },

], [workspaceId, t])
  return (
    <div>
    <p className="text-xs sm:text-sm uppercase text-muted-foreground">{t("SHORTCUTS")}</p>
    <div className="grid grid-cols-2 gap-2">
      {workspaceOptionsFields.map((field, i) => (
        <ActiveLink
          key={i}
          href={field.href}
          variant="ghost"
          size="sm"
          className="flex justify-start items-center gap-2 border border-red-100 p-2"
        >
          {field.icon}
          {field.title}
        </ActiveLink>
      ))}
    </div>
  </div>
  )
};