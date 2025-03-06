import { Workspace } from '@prisma/client';
import React from 'react'
import { Workspace_ } from './Workspace';
interface Props{
  userWorkspacesList: Workspace[];

}
export const Workspaces = ({userWorkspacesList}: Props) => {
  return (
    <div className='flex flex-col gap-3 '>{
        userWorkspacesList.map((workspace)=>(
          <Workspace_ key={workspace.id} workspace={workspace}/>
        ))
      }</div>
  )
}

// export default Workspaces