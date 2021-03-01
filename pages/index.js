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
  const [login, setLogin] = useState("")
  const [password, setPassword] = useState("")
  const {handleApiError} = useFlash()
  const api = Api.json({handleApiError})

  // const signIn = (login, password) => {
  //   api.fetch('/authenticate', {
  //     method: "POST",
  //     body: {login, password},
  //   }).then(response=>{
  //     session.setToken(response.data)
  //     router.push('/att/permissions')
  //   })
  // }
  // const breadcrumb = 

  return (
    <FrameLayout title='テスト'
      sidebar={[{title: 'test'}]}
      breadcrumb={[{title: "Home", url: "/"}, {title: "About", url: "/about"}]}>
      <Typography>Hello!</Typography>
    </FrameLayout>
  )
}

export default Page
