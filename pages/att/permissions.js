import React from 'react'
import {
  Box,Button,Container,Grid,Link,TextField,Typography,makeStyles,CircularProgress
} from '@material-ui/core';
import FaceIcon from '@material-ui/icons/Face';
import StarsIcon from '@material-ui/icons/Stars';
import {CenterLayout} from 'components/layouts'
import {useRouter} from 'next/router'
import {useQuery} from 'react-query'
import {useSession} from 'modules/rvadmin/core/SessionProvider'

const Page = () => {
  const session = useSession()
  const router = useRouter()
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

  return (
    <CenterLayout>
      <Container maxWidth="sm">

        <Box mb={3}>
          <Typography color="textPrimary" variant="h2">Select Account</Typography>
          <Typography color="textSecondary" gutterBottom variant="body2">
            You&apos;re logging in by <code>{session.payload.email}</code>
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
          Don&apos;t have an account?{' '}
          Try {' '}<Link href="#" variant="h5" onClick={()=>session.logout()}>
            Log out
          </Link>{' '}and signin again.
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
