import React, {useState, useEffect, useMemo, useCallback} from 'react'
import {
  Box,Typography,makeStyles,CircularProgress,
  Paper, Toolbar, Tooltip, IconButton,
} from '@material-ui/core';
import Link from 'components/Link'
import {FrameLayout} from 'components/layouts'
import {useRouter} from 'next/router'
import {useSession} from 'modules/rvadmin/core/SessionProvider'
import {useQuery} from 'react-query'
import AddCircleIcon from '@material-ui/icons/AddCircle'

import {Form, DashBar, getBreadcrumb} from 'components/labels'

const Page = () => {
  const prefix = '/'
  return (
    <FrameLayout breadcrumb={getBreadcrumb(prefix)}>
      <DashBar prefix={prefix} />
      <Box py={2}><PageContainer /></Box>
    </FrameLayout>
  )
}

const PageContainer = () => {
  const router = useRouter()
  const session = useSession()
  const {id} = router.query

  if (!id) return (<CircularProgress />)
  const {isLoading, error, data} = useQuery('subject', ()=>session.api.fetch(`/labels/${id}`).then(res=>res.data))
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

  return (<Form {...{save, subject}} />)
}

export default Page
