import React, {useState, useEffect, useMemo, useCallback} from 'react'
import {Box, CircularProgress} from '@material-ui/core';
import Link from 'components/Link'
import {FrameLayout} from 'components/layouts'
import {useRouter} from 'next/router'
import {useSession} from 'modules/rvadmin/core/SessionProvider'
import {useQuery} from 'react-query'

import {Form, DashBar, getBreadcrumb} from 'components/residentapp/boards'

const Page = () => {
  const prefix = '/'
  const router = useRouter()
  const {id} = router.query
  return (
    <FrameLayout breadcrumb={getBreadcrumb(prefix)}>
      <DashBar prefix={prefix} />
      <Box py={2}><PageContainer id={id} /></Box>
    </FrameLayout>
  )
}

const PageContainer = ({id}) => {
  if (!id) return (<CircularProgress />)
  const session = useSession()
  const {isLoading, error, data} = useQuery(`/residentapp/boards/${id}`, ()=>session.api.fetch(`/residentapp/boards/${id}`).then(res=>res.data))
  if (isLoading) return (<CircularProgress />)
  return (<PageInner subject={data} />)
}

const PageInner = ({subject}) => {
  const router = useRouter()
  const session = useSession()

  const save = (body) => {
    return session.api.fetch(`/residentapp/boards/${subject.id}`, {method: 'PUT', body}).then(res=>{
      session.enqueueSnackbar(res.message, {variant: "success"})
      router.push(`/residentapp/boards/${subject.id}`)
    })
  }

  return (<Form {...{save, subject}} />)
}

export default Page
