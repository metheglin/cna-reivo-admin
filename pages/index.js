// import Head from 'next/head'
import Link from 'next/link'

import React, { useState } from 'react'
import {
  Box,Button,Container,Grid,TextField,Typography,makeStyles,CircularProgress
} from '@material-ui/core';
import {FrameLayout} from 'components/layouts'
import {useRouter} from 'next/router'
import {useQuery} from 'react-query'
import {useFlash} from 'modules/rvadmin/core/FlashProvider'
import Api from 'modules/rvadmin/utils/Api'
import {useSession} from 'modules/rvadmin/core/SessionProvider'

const Page = () => {
  const session = useSession()
  const router = useRouter()
  const {handleApiError} = useFlash()
  const api = Api.json({handleApiError})

  return (
    <FrameLayout 
      breadcrumb={[{title: "Home", url: "/"}, {title: "About", url: "/about"}]}>
      <Typography>Hello!</Typography>
    </FrameLayout>
  )
}

export default Page
