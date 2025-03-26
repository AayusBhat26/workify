import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SettingsWorkspace } from "@/types/extended";
import { Layers, Users2 } from "lucide-react";
// import { EditWorkspaceCard } from "./overview/Edit/EditWorkspaceCard";
import { Separator } from "@/components/ui/separator";
import { EditWorkspaceCard } from "./overview/Edit/EditWorkspaceCard";
import { DeleteWorkspace } from "./overview/DeleteWorkspace";
import { MembersCard } from "./members/MembesCard";
// import { DeleteWorkspace } from "./overview/DeleteWorkspace";
// import { MembersCard } from "./members/MembersCard";

interface Props {
  workspace: SettingsWorkspace;
  workspaceId: string;
}

export const WorkspaceTab = ({ workspace, workspaceId }: Props) => {
  return (
    <Tabs defaultValue="overview">
      <TabsList className="mb-6">
        <TabsTrigger value="overview" className="mr-2 flex items-center gap-2">
          <Layers size={18} />
          Overview
        </TabsTrigger>
        <TabsTrigger value="members" className="mr-2 flex items-center gap-2">
          <Users2 size={18} />
          Members
        </TabsTrigger>
      </TabsList>
      <TabsContent value="overview" tabIndex={1}>
        <EditWorkspaceCard workspace={workspace}/>
        <div className="py-4 sm:py-6 ">
          <Separator/>
        </div>
        <DeleteWorkspace workspace={workspace}/>
      </TabsContent>
      <TabsContent value="members">
        <h1>members content</h1>
        <MembersCard workspace={workspace} workspaceId={workspace.id} />
      </TabsContent>
    </Tabs>
  );
};