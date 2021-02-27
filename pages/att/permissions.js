import React from 'react'
import {
  Box,Button,Container,Grid,Link,TextField,Typography,makeStyles,CircularProgress
} from '@material-ui/core';
import FaceIcon from '@material-ui/icons/Face';
import StarsIcon from '@material-ui/icons/Stars';
import {CenterLayout} from 'components/layouts'
import {useRouter} from 'next/router'
import {useQuery} from 'react-query'
import {useFlash} from 'modules/rvadmin/core/FlashProvider'
import Api from 'modules/rvadmin/utils/Api'
import AccessToken from 'modules/rvadmin/utils/AccessToken'

const Page = () => {
  const router = useRouter()
  const {handleApiError} = useFlash()
  const api = Api.json({token: Api.token, handleApiError})

  const {isLoading, error, data} = useQuery('permissions', ()=>api.fetch('/permissions').then(res=>res.data))

  const selectAccount = (permissionId) => {
    api.fetch('/authorize', {
      method: "POST",
      body: {permission_id: permissionId}
    }).then(response=>{
      const token = response.data
      AccessToken.setToken( token )
      router.push('/')
    })
  }

  return (
    <CenterLayout>
      <Box
        display="flex"
        flexDirection="column"
        height="100%"
        justifyContent="center"
      >
        <Container maxWidth="sm">

          <Box mb={3}>
            <Typography color="textPrimary" variant="h2">Select Account</Typography>
            <Typography color="textSecondary" gutterBottom variant="body2">
              利用するアカウントを選択します
            </Typography>
          </Box>

          <Grid container spacing={3}>
            {isLoading && <CircularProgress />}
            {data && data.map((permission, i)=>(
              <Grid key={i} item xs={12} md={6}>
                <PermissionButton permission={permission} onClick={()=>selectAccount(permission.id)} />
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
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
