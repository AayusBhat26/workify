import ActiveLink from "@/components/ui/active-link";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { Workspace } from "@prisma/client"
import Image from "next/image";

interface Props{ 
  workspace: Workspace;

}
export const Workspace_ = ({workspace: {id, image, name}}:Props)=>{
  return (
    <HoverCard openDelay={250} closeDelay={250}>
      <HoverCardTrigger>
        <ActiveLink className="text-white font-bold" href={`/dashboard/workspace/${name}`} variant={image ? "ghost":"default"} size={"icon"}>
        {image ? (
          <Image className="w-full h-full object-cover rounded-md" src={image} height={300} width={300} alt={`${name[0] + name[1]}`.toUpperCase()}/>
        ) : <p>
          {name[0].toUpperCase()}</p>}

        </ActiveLink>
      </HoverCardTrigger>
      <HoverCardContent>
        <span>
          {name}
        </span>
      </HoverCardContent>
    </HoverCard>
  )
}