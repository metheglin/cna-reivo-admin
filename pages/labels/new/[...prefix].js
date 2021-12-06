import React, {useState, useEffect, useMemo, useCallback} from 'react'
import {
  Grid,TextField,Typography,makeStyles,CircularProgress,
  Paper, Toolbar, Tooltip, IconButton,
} from '@material-ui/core';
import Link from 'components/Link'
import {FrameLayout, FrameLayoutWrapper} from 'components/layouts'
import {useRouter} from 'next/router'
import {useSession} from 'modules/rvadmin/core/SessionProvider'

import AddCircleIcon from '@material-ui/icons/AddCircle'

import {Form, MainDashBar, normalizePath} from 'components/labels'

const getBreadcrumb = (prefix) => ([
  {title: `Labels (${prefix})`, url: `/labels/prefix${prefix}`},
  {title: 'New',},
])

const Page = () => {
  const router = useRouter()
  let {prefix} = router.query
  prefix = normalizePath(prefix)
  return (
    <FrameLayout dashBar={<MainDashBar prefix={prefix} breadcrumb={getBreadcrumb(prefix)} />}>
      <PageInner prefix={prefix} />
    </FrameLayout>
  )
}

const PageInner = ({prefix}) => {
  const router = useRouter()
  const session = useSession()

  const save = (body) => {
    return session.api.fetch('/labels', {method: 'POST', body}).then(res=>{
      router.push({pathname: `/labels/${res.data.id}`, query: {prefix}})
    })
  }

  return (<FrameLayoutWrapper><Form {...{save, prefix}} /></FrameLayoutWrapper>)
}

export default Page
