import React, {useState, useEffect, useMemo, useCallback} from 'react'
import {CircularProgress} from '@material-ui/core';
import Link from 'components/Link'
import {FrameLayout, FrameLayoutWrapper} from 'components/layouts'
import {useRouter} from 'next/router'
import {useSession} from 'modules/rvadmin/core/SessionProvider'
import {useQuery} from 'react-query'

import {Form, MainDashBar} from 'components/residentapp/boards'

const getBreadcrumb = () => ([
  {title: "Boards", url: '/residentapp/boards'},
  {title: 'New'}
])

const Page = () => (
  <FrameLayout dashBar={<MainDashBar breadcrumb={getBreadcrumb()} />}>
    <PageInner />
  </FrameLayout>
)

const PageInner = () => {
  const router = useRouter()
  const session = useSession()

  const save = (body) => {
    return session.api.fetch(`/residentapp/boards`, {method: 'POST', body}).then(res=>{
      session.enqueueSnackbar(res.message, {variant: "success"})
      router.push(`/residentapp/boards/${res.data.id}`)
    })
  }

  return (
    <React.Fragment>
      <FrameLayoutWrapper><Form {...{save}} /></FrameLayoutWrapper>
    </React.Fragment>
  )
}

export default Page
