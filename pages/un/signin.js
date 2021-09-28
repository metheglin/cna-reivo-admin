import React, { useState } from 'react'
import {
  Box,Button,Container,Grid,Link,TextField,Typography,makeStyles,CircularProgress
} from '@material-ui/core';
import {CenterLayout} from 'components/layouts'
import {useRouter} from 'next/router'
import {useQuery} from 'react-query'
import {useFlash} from 'modules/rvadmin/core/FlashProvider'
import Api from 'modules/rvadmin/utils/Api'
import {useSession} from 'modules/rvadmin/core/SessionProvider'
import {useTranslation} from 'react-i18next'

const Page = () => {
  const session = useSession()
  const router = useRouter()
  const {t} = useTranslation()
  const [login, setLogin] = useState("")
  const [password, setPassword] = useState("")

  const signIn = (login, password) => {
    session.api.fetch('/authenticate', {
      method: "POST",
      body: {login, password},
    }).then(response=>{
      session.setToken(response.data)
      router.push('/att/permissions')
    })
  }

  return (
    <CenterLayout>
      <Container maxWidth="sm">
        <Box mb={3}>
          <Typography color="textPrimary" variant="h4">Sign in</Typography>
          {/*<Typography color="textSecondary" gutterBottom variant="body2">
            You&apos;re logging in by <code>{session.payload.email}</code>
          </Typography>*/}
        </Box>

        {/*<Box mt={3} mb={1}>
          <Typography align="center" color="textSecondary" variant="body1">
            or login with email address
          </Typography>
        </Box>*/}

        <Box my={3}>
          {/*<TextField
            error={Boolean(touched.email && errors.email)}
            fullWidth
            helperText={touched.email && errors.email}
            label="Email Address"
            margin="normal"
            name="email"
            onBlur={handleBlur}
            onChange={handleChange}
            type="email"
            value={values.email}
            variant="outlined"
          />*/}
          <TextField
            fullWidth
            label="Email Address"
            margin="normal"
            name="email"
            onChange={e=>setLogin(e.target.value)}
            type="email"
            value={login}
            variant="outlined"
          />
          <TextField
            fullWidth
            label="Password"
            margin="normal"
            name="password"
            onChange={e=>setPassword(e.target.value)}
            type="password"
            value={password}
            variant="outlined"
          />
        </Box>

        <Box my={2}>
          <Button
            color="primary"
            disabled={false}
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            onClick={()=>signIn(login, password)}
          >
            {t('Sign in now')}
          </Button>
        </Box>

        <Typography color="textSecondary" variant="body1">
          {t('Don\'t have a staff account?')}
        </Typography>
      </Container>
    </CenterLayout>
  )
}

export default Page
