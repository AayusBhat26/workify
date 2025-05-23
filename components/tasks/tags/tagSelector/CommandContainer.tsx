import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { Plus } from "lucide-react";
import { useState } from "react";
// import { CommandTagItem } from "./CommandTagItem";
import { WorkspaceIconColor, Tag } from "@prisma/client";
import { useTranslations } from "next-intl";
import { CommandTagItem } from "./CommandTagItem";
import { CreateNewTagOrEditTag } from "./CreateNewOrEditTag";
// import { EditT ag } from "./EditTag";

interface Props {
  tags?: Tag[];
  currentActiveTags: Tag[];
  onSelectActiveTag: (id: string) => void;
  workspaceId: string;
  onUpdateActiveTags?: (tagId: string, color: WorkspaceIconColor, name: string) => void;  
  onDeleteActiveTag?: (tagId: string) => void;
}

export const CommandContainer = ({tags, currentActiveTags, onSelectActiveTag, workspaceId, onUpdateActiveTags, onDeleteActiveTag}:Props) => {
  const [tab, setTab] = useState<"list" | "newTag" | "editTag">("list");
  const onSetTab = (tab: "list" | "newTag" | "editTag") => {
    setTab(tab);
  };
  const [editedTagInfo, setEditedTagInfo] = useState<null | Tag>(null);
  const t = useTranslations("TASK.HEADER.TAG");

  const onEditTagInfoHandler = (tag: Tag) => {
    setEditedTagInfo(tag);
    setTab("editTag");
  };


  return (
    <Command className="w-[15rem]">
      {tab === "list" && (
        <>
          <CommandInput className="text-xs" placeholder={t("FILTER")} />
          <CommandList>
            <CommandEmpty>No result found</CommandEmpty>
            {tags && tags?.length > 0 && (
              <>
                <CommandGroup heading={t("TAGS_HEADING")}>
                  {tags?.map((tag) => (
                    <CommandTagItem
                      key={tag.id}
                      tag={tag}
                      currentActiveTags={currentActiveTags}
                      onSelectActiveTag={onSelectActiveTag}
                      onEditTagInfo={onEditTagInfoHandler}
                    />
                  ))}
                </CommandGroup>
              </>
            )}

            <CommandGroup heading="TAGS">
              {tags?.map((tag)=>(
                <CommandTagItem key={tag.id} tag={tag} currentActiveTags={currentActiveTags} onSelectActiveTag={onSelectActiveTag}
                  onEditTagInfo={onEditTagInfoHandler} 
                  // onUpdateActiveTags={onUpdateActiveTags}
                />
              ))}
            </CommandGroup>
            <CommandSeparator />
            <CommandGroup heading={t("NEW_HEADING")}>
              <CommandItem className="p-0">
                <Button
                  size={"sm"}
                  variant={"ghost"}
                  className="w-full h-fit justify-start px-2 py-1.5 text-xs"
                  onClick={() => {
                    setTab("newTag");
                  }}
                >
                  <Plus className="mr-1" size={16} />
                  {t("ADD_TAG")}
                </Button>
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </>
      )}
      {tab === "newTag" &&(<CreateNewTagOrEditTag onSetTab={onSetTab} workspaceId={workspaceId} />) }
      {tab === "editTag" && <CreateNewTagOrEditTag edit workspaceId={workspaceId} color={editedTagInfo?.color} id={editedTagInfo?.id}
      tagName={editedTagInfo?.name}
      onSetTab={onSetTab}
      onUpdateActiveTags={onUpdateActiveTags}
      onDeleteActiveTag={onDeleteActiveTag}
      currentActiveTags={currentActiveTags}
      onSelectActiveTag={onSelectActiveTag}
      />}

      {/* {tab === "newTag" && (
        <CreateNewTagOrEditTag onSetTab={onSetTab} workspaceId={workspaceId} />
      )}
      {tab === "editTag" && (
        <CreateNewTagOrEditTag
          edit
          workspaceId={workspaceId}
          color={editedTagInfo?.color}
          id={editedTagInfo?.id}
          tagName={editedTagInfo?.name}
          onSetTab={onSetTab}
          onUpdateActiveTags={onUpdateActiveTags}
          onDeleteActiveTag={onDeleteActiveTag}
          currentActiveTags={currentActiveTags}
          onSelectActiveTag={onSelectActiveTag}
        />
      )} */}
      {/* {tab === "newTag" && <NewTag onSetTab={onSetTab} workspaceId={workspaceId}/>} */}

    </Command>
  );
};