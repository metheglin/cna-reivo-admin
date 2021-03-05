import React, {useState, useEffect, useMemo, useCallback} from 'react'
import {Box, CircularProgress} from '@material-ui/core';
import Link from 'components/Link'
import {FrameLayout} from 'components/layouts'
import {useRouter} from 'next/router'
import {useSession} from 'modules/rvadmin/core/SessionProvider'
import {useQuery} from 'react-query'

import {Form, DashBar} from 'components/residentapp/boards'

const getBreadcrumb = () => ([
  {title: "Boards", url: '/residentapp/boards'},
  {title: 'New'}
])

const Page = () => (
  <FrameLayout dashBar={<DashBar breadcrumb={getBreadcrumb()} />}>
    <Box py={2}><PageInner /></Box>
  </FrameLayout>
)

const PageInner = ({subject}) => {
  const router = useRouter()
  const session = useSession()

  const save = (body) => {
    return session.api.fetch(`/residentapp/boards`, {method: 'POST', body}).then(res=>{
      session.enqueueSnackbar(res.message, {variant: "success"})
      router.push(`/residentapp/boards/${subject.id}`)
    })
  }

  return (<Form {...{save, subject}} />)
}

export default Page
