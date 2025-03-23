import {Workspace, WorkspaceIconColor} from "@prisma/client"
export const colors: string[] = Object.values(WorkspaceIconColor);
export const getRandomColor = ()=>{
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex] as WorkspaceIconColor;
}