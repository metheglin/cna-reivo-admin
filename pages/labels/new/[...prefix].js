import React, {useState, useEffect, useMemo, useCallback} from 'react'
import {
  Box,Grid,TextField,Typography,makeStyles,CircularProgress,
  Paper, Toolbar, Tooltip, IconButton,
} from '@material-ui/core';
import Link from 'components/Link'
import {FrameLayout} from 'components/layouts'
import {useRouter} from 'next/router'
import {useSession} from 'modules/rvadmin/core/SessionProvider'

import AddCircleIcon from '@material-ui/icons/AddCircle'

import {Form, DashBar, getBreadcrumb, normalizePath} from 'components/labels'

const Page = () => {
  const router = useRouter()
  let {prefix} = router.query
  prefix = normalizePath(prefix)
  return (
    <FrameLayout breadcrumb={getBreadcrumb(prefix)}>
      <DashBar prefix={prefix} />
      <Box py={2}><PageInner prefix={prefix} /></Box>
    </FrameLayout>
  )
}

const PageInner = ({prefix}) => {
  const router = useRouter()
  const session = useSession()

  const save = (body) => {
    return session.api.fetch('/labels', {method: 'POST', body}).then(res=>router.push(`/labels/${res.data.id}`))
  }

  return (<Form {...{save, prefix}} />)
}

export default Page
