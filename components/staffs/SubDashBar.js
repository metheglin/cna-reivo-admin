import React from 'react'
import DashBar from 'components/DashBar'
import {CreatedAt, UpdatedAt} from 'components/Timestamps'
import {useSession} from 'modules/rvadmin/core/SessionProvider'
import {StaffStatus, StaffStatusButton} from './index'

export default function SubDashBar({subject, setSubject}) {
  if (!subject) return null
  
  const main = (
    <React.Fragment>
      <StaffStatus {...subject} />
      <CreatedAt {...subject} />
      <UpdatedAt {...subject} />
    </React.Fragment>
  )
  const sub = (<StaffStatusButton subject={subject} setSubject={setSubject} />)
  return (
    <DashBar main={main}>{sub}</DashBar>
  )
}
