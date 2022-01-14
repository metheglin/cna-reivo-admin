import React, {useState, useEffect, useMemo, useCallback} from 'react'
import {CircularProgress} from '@mui/material';
import Link from 'components/Link'
import {FrameLayout, FrameLayoutWrapper} from 'components/layouts'
import {useRouter} from 'next/router'
import {useSession} from 'modules/rvadmin/core/SessionProvider'
import {useApi} from 'modules/rvadmin/core/useApi'

import {Form, MainDashBar,} from 'components/staffs/profile'

const getBreadcrumb = () => ([
  {title: "My Profile"},
])

const Page = () => {
  const {api} = useSession()
  const [subject, setSubject] = useState()
  useEffect(()=>{
    api.fetch(`/my/profile`).then(res => setSubject(res.data))
  }, [])
  return (
    <FrameLayout dashBar={<MainDashBar breadcrumb={getBreadcrumb()} />}>
      {subject && <PageInner subject={subject} setSubject={setSubject} />}
    </FrameLayout>
  )
}

const PageInner = ({subject, setSubject}) => {
  const router = useRouter()
  const {api, enqueueSnackbar} = useSession()

  const save = (body) => {
    return api.fetch(`/my/profile`, {method: 'PUT', body}).then(res=>{
      enqueueSnackbar(res.message, {variant: "success"})
      // router.push(`/staffs/${subject.id}`)
      setSubject(res.data)
    })
  }

  return (
    <React.Fragment>
      {/*<SubDashBar {...{subject, setSubject}} />*/}
      <FrameLayoutWrapper><Form {...{save, subject}} /></FrameLayoutWrapper>
    </React.Fragment>
  )
}

export default Page
