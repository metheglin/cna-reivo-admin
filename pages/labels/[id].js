import React, {useState, useEffect, useMemo, useCallback} from 'react'
import { Typography, CircularProgress, Paper, Toolbar, Tooltip, IconButton } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import Link from 'components/Link'
import {FrameLayout, FrameLayoutWrapper} from 'components/layouts'
import {useRouter} from 'next/router'
import {useSession} from 'modules/rvadmin/core/SessionProvider'
import {useQuery} from 'react-query'
import AddCircleIcon from '@mui/icons-material/AddCircle'

import {Form, MainDashBar} from 'components/labels'

const getBreadcrumb = (id, prefix) => {
  return [
    {title: `Labels (${prefix})`, url: `/labels/prefix${prefix}`},
    {title: id},
  ]
}

const Page = () => {
  const router = useRouter()
  const {id, prefix} = router.query
  return (
    <FrameLayout dashBar={<MainDashBar prefix={prefix} breadcrumb={getBreadcrumb(id, prefix)} />}>
      <PageContainer id={id} />
    </FrameLayout>
  )
}

const PageContainer = ({id}) => {
  if (!id) return (<CircularProgress />)
  const session = useSession()
  const {isLoading, error, data} = useQuery(`/labels/${id}`, ()=>session.api.fetch(`/labels/${id}`).then(res=>res.data))
  if (isLoading) return (<CircularProgress />)
  return (<PageInner subject={data} />)
}

const PageInner = ({subject}) => {
  const router = useRouter()
  const session = useSession()

  const save = (body) => {
    return session.api.fetch(`/labels/${subject.id}`, {method: 'PUT', body}).then(res=>{
      session.enqueueSnackbar(res.message, {variant: "success"})
      router.push(`/labels/${subject.id}`)
    })
  }

  return (<FrameLayoutWrapper><Form {...{save, subject}} /></FrameLayoutWrapper>)
}

export default Page
