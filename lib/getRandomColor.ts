import {Workspace, WorkspaceIconColor} from "@prisma/client"
export const getRandomColor = ()=>{
    const colors: string[] = Object.values(WorkspaceIconColor);
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex] as WorkspaceIconColor;
}