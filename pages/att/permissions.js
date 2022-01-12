import React from 'react'
import {
  Box,
  Button,
  Container,
  Grid,
  Link,
  TextField,
  Typography,
  CircularProgress,
} from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import FaceIcon from '@mui/icons-material/Face';
import StarsIcon from '@mui/icons-material/Stars';
import {CenterLayout} from 'components/layouts'
import {useRouter} from 'next/router'
import {useQuery} from 'react-query'
import {useSession} from 'modules/rvadmin/core/SessionProvider'
import {useTranslation, Trans} from 'react-i18next'

const Page = () => {
  const session = useSession()
  const router = useRouter()
  const {t} = useTranslation()
  const {isLoading, error, data} = useQuery('permissions', ()=>session.api.fetch('/permissions').then(res=>res.data))

  const selectAccount = (permissionId) => {
    session.api.fetch('/authorize', {
      method: "POST",
      body: {permission_id: permissionId}
    }).then(response=>{
      session.setToken(response.data)
      router.push('/')
    })
  }

  const email = session.payload.email || 'localhost'

  return (
    <CenterLayout>
      <Container maxWidth="sm">

        <Box mb={3}>
          <Typography color="textPrimary" variant="h4">Select Account</Typography>
          <Typography color="textSecondary" gutterBottom variant="body2">
            <Trans i18nKey="You're logging in with" email={email}>
              You're logging in with <code>{{email}}</code>
            </Trans>
          </Typography>
        </Box>

        <Box mb={3}>
          <Grid container spacing={3}>
            {isLoading && <CircularProgress />}
            {data && data.map((permission, i)=>(
              <Grid key={i} item xs={12} md={6}>
                <PermissionButton permission={permission} onClick={()=>selectAccount(permission.id)} />
              </Grid>
            ))}
          </Grid>
        </Box>

        <Typography color="textSecondary" variant="body1">
          <Trans i18nKey="Don't have a party account?">
            Don&apos;t have a party account?
            Try <Link href="#" onClick={()=>session.logout()}>
              Log out
            </Link>{' '}and signin again.
          </Trans>
        </Typography>
      </Container>
    </CenterLayout>
  )
}
export default Page

const PermissionButton = ({permission, ...props}) => {
  const {ability_kind, name} = permission
  if (ability_kind === 'master') return <PermissionMaster {...props}>{name}</PermissionMaster>
  if (ability_kind === 'admin') return <PermissionAdmin {...props}>{name}</PermissionAdmin>
  return <PermissionRegular {...props}>{name}</PermissionRegular>
}

const PermissionMaster = props => (
  <Button
    color="secondary"
    fullWidth
    startIcon={<StarsIcon />}
    size="large"
    variant="contained"
    {...props}
  >
    {props.children}
  </Button>
)
const PermissionAdmin = props => (
  <Button
    color="secondary"
    fullWidth
    startIcon={<FaceIcon />}
    size="large"
    variant="contained"
    {...props}
  >
    {props.children}
  </Button>
)
const PermissionRegular = props => (
  <Button
    color="primary"
    fullWidth
    startIcon={<FaceIcon />}
    size="large"
    variant="contained"
    {...props}
  >
    {props.children}
  </Button>
)
