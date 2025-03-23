import { Workspace } from '@prisma/client';
import React from 'react'
import { Workspace_ } from './Workspace';
interface Props{
  userWorkspacesList: Workspace[];
  href: string;

}
export const Workspaces = ({userWorkspacesList, href}: Props) => {
  return (
    <div className='flex flex-col gap-3 '>{
        userWorkspacesList.map((workspace)=>(
          <Workspace_ key={workspace.id} workspace={workspace} href={href}
          />
        ))
      }</div>
  )
}

// export default Workspaces