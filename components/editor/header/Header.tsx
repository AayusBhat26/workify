import { Badge } from "@/components/ui/badge";
import { Logo } from "./Logo";
import { Title } from "./Title";
import { TaskCalendar } from "./TasksCalendar";
import { TagSelector } from "@/components/extra/tags/tagSelector/TagSelector";
import { LinkTag } from "@/components/extra/tags/LinkTag";

export const Header = ()=>{
    return (
        <div className="w-full flex items-center gap-2 sm:gap-4">
    <Logo />
    <div className="w-full flex flex-col gap-2">
        <Title/>
    <div className="w-full flex gap-1 flex-wrap flex-row">
        <TaskCalendar/>
        <TagSelector />
        <LinkTag/>
    </div>
    </div>
</div>
    )
}