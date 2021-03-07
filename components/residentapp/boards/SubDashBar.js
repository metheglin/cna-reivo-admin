import React from 'react'
import DashBar from 'components/DashBar'
import PublishStatus from 'components/PublishStatus'
import PublishButton from 'components/PublishButton'
import BuildingSummary from './BuildingSummary'

import {useSession} from 'modules/rvadmin/core/SessionProvider'

export default function SubDashBar({subject, setSubject}) {
  if (!subject) return null
  const {api, enqueueSnackbar} = useSession()
  const onOpen = () => {
    api.fetch(`/residentapp/boards/${subject.id}/open`, {method: "PATCH"}).then(res=>{
      setSubject(res.data)
      enqueueSnackbar(res.message, {variant: 'success', persist: false})
    })
  }
  const onDraft = () => {
    api.fetch(`/residentapp/boards/${subject.id}/draft`, {method: "PATCH"}).then(res=>{
      setSubject(res.data)
      enqueueSnackbar(res.message, {variant: 'success', persist: false})
    })
  }
  const main = (
    <React.Fragment>
      <PublishStatus {...subject} />
      <BuildingSummary buildings={subject.buildings} />
    </React.Fragment>
  )
  const sub = (
    <PublishButton subject={subject} 
      onOpen={onOpen}
      onDraft={onDraft} />
  )
  return (
    <DashBar main={main}>{sub}</DashBar>
  )
}
