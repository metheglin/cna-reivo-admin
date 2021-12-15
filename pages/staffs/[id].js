import React, {useState, useEffect, useMemo, useCallback} from 'react'
import {CircularProgress} from '@material-ui/core';
import Link from 'components/Link'
import {FrameLayout, FrameLayoutWrapper} from 'components/layouts'
import {useRouter} from 'next/router'
import {useSession} from 'modules/rvadmin/core/SessionProvider'
import {useApi} from 'modules/rvadmin/core/useApi'

import {Form, MainDashBar, SubDashBar} from 'components/staffs'

const getBreadcrumb = (id) => ([
  {title: "Staffs", url: '/staffs'},
  {title: id}
])

const Page = () => {
  const router = useRouter()
  const {id} = router.query
  return (
    <FrameLayout dashBar={<MainDashBar breadcrumb={getBreadcrumb(id)} />}>
      <PageContainer id={id} />
    </FrameLayout>
  )
}

const PageContainer = ({id}) => {
  if (!id) return (<CircularProgress />)
  const session = useSession()
  const {isLoading, error, data, setData} = useApi(`/staffs/${id}`, (api)=>api.fetch(`/staffs/${id}`).then(res=>res.data))
  if (isLoading) return (<CircularProgress />)
  return (<PageInner subject={data} setSubject={setData} />)
}

const PageInner = ({subject, setSubject}) => {
  const router = useRouter()
  const session = useSession()

  const save = (body) => {
    return session.api.fetch(`/staffs/${subject.id}`, {method: 'PUT', body}).then(res=>{
      session.enqueueSnackbar(res.message, {variant: "success"})
      // router.push(`/staffs/${subject.id}`)
      setSubject(res.data)
    })
  }

  return (
    <React.Fragment>
      <SubDashBar {...{subject, setSubject}} />
      <FrameLayoutWrapper><Form {...{save, subject}} /></FrameLayoutWrapper>
    </React.Fragment>
  )
}

export default Page
