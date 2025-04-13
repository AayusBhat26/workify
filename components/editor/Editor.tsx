"use client";
import { Tag, WorkspaceIconColor } from "@prisma/client";
import { Card, CardContent } from "../ui/card"
import { Container } from "./container/Container"
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { TaskSchema, taskSchema } from "@/schema/taskSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";
import { Logo } from "./Logo";
import TextareAutoSize from "react-textarea-autosize";
import { TaskCalendar } from "./TasksCalendar";
import { DateRange } from "react-day-picker";
import { TagSelector } from "../extra/tags/tagSelector/TagSelector";
import { LinkTag } from "../extra/tags/LinkTag";
interface Props{
    workspaceId: string; 
    initialActiveTags?: Tag[];
}
export const Editor = ({workspaceId, initialActiveTags}: Props)=>{
    const [currentActiveTags, setCurrentActiveTags] = useState<Tag[]>([]);
    const [isMounted, setIsMounted] = useState(false);
    const _titleRef = useRef<HTMLTextAreaElement>(null);


    const form = useForm<TaskSchema>({
        resolver: zodResolver(taskSchema), 
        defaultValues:{
            icon:"🧠", 
            title:"", 
            content: null, 
            date: null,
        }
    });

    const {data: tags, isLoading} = useQuery({
        queryFn: async()=>{
            const res = await fetch(`/api/tags/get/get_workspace_tags?workspaceId=${workspaceId}`);

            if(!res.ok) return [];
            const data = await res.json();
            return data as Tag[]; 
        }, enabled: isMounted, 
        queryKey: ["getWorkspaceTags"]
    });
    useEffect(()=>{
        setIsMounted(true);
    }, []);

    const {ref: titleRef, ...rest} = form.register("title");
    const onFormSelectHandler =  (emoji: string)=>{
        form.setValue("icon", emoji); 
    }
   
    const onUpadteFormHandler = (date: DateRange | undefined)=>{
        form.setValue("date", date);
    }

    const onSelectActiveTagHanlder=(tagId:string)=>{
        setCurrentActiveTags((prevActiveTags)=>{
            const tagIndex = prevActiveTags.findIndex((activeTag)=>activeTag.id === tagId)
            if(tagIndex !== -1){
                const updateActiveTags = [...prevActiveTags]
                updateActiveTags.splice(tagIndex, 1);
                return updateActiveTags
            }
            else{
                const selectdTag = tags!.find((tag)=>tag.id === tagId);
                if(selectdTag){
                    return [...prevActiveTags, selectdTag];
                }
            }

            return prevActiveTags;
        })
    };

    const onUpdateActiveTagsHandler = (tagId: string, color: WorkspaceIconColor, name: string) => {
        setCurrentActiveTags((prevActiveTags) => {
            const updatedTags = prevActiveTags.map((tag)=>tag.id === tagId ? {...tag, color, name} : tag);
            return updatedTags;
        });
    };
    const onDeleteActiveTagHandler = (tagId: string) => {
        setCurrentActiveTags((prevActiveTags) => {
            const updatedTags = prevActiveTags.filter((tag) => tag.id !== tagId);
            return updatedTags;
        })
    }
    const onSubmit = (data: TaskSchema) =>{
        console.log(data);
        
    }

    return (
        <Card>
           
            <form id="task-form" onSubmit={form.handleSubmit(onSubmit)}>
                <CardContent className="py-4 sm:py-6">
                    <div className="w-full flex items-start gap-2  sm:gap-4">
                        <Logo onFormSelect={onFormSelectHandler}/>
                        <div>
                            <TextareAutoSize 
                                ref={(e) => {
                                    titleRef(e);
                                    //@ts-ignore
                                    _titleRef.current = e;
                                }}
                                onKeyDown={(e) => {
                                    
                                    if(e.key==="Enter") e.preventDefault();
                                }}
                                {...rest}
                                placeholder="Editor content"
                                className="w-full resize-none appearance-none overflow-hidden bg-transparent placeholder:text-muted-foreground text-2xl font-serif  font-semibold focus:outline-none"
                            />
                        </div>
                        <div className="w-full gap-1 flex flex-wrap flex-row">
                            <TaskCalendar
                            onUpdateForm={onUpadteFormHandler}
                            />
                            <TagSelector 
                            isLoading={isLoading}
                            tags={tags}
                            currentActiveTag={currentActiveTags}
                            onUpdateActiveTags={onUpdateActiveTagsHandler}
                            workspaceId={workspaceId}
                            onDeleteActiveTag={onDeleteActiveTagHandler}
                            onSelectActiveTag={onSelectActiveTagHanlder}
                            
                            />
                            {currentActiveTags.map((tag) => (
                                <LinkTag key={tag.id} tag={tag} disabled />
                            ))}
                        </div>
                    </div>
                    <Container />
                </CardContent>
                <button type="submit">Button</button>
            </form>
        </Card>
    )
}