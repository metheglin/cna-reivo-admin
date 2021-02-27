import React, {useState, useEffect} from 'react';
import {useRouter} from 'next/router'
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import CircularProgress from '@material-ui/core/CircularProgress'
import Container from '@material-ui/core/Container'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

import {useFlash} from 'modules/rvadmin/core/FlashProvider'
import Api from 'modules/rvadmin/utils/Api'
import AccessToken from 'modules/rvadmin/utils/AccessToken'
import PermissionChip from 'components/PermissionChip'

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  chip: {
    margin: theme.spacing(1),
  },
}));

const permissions = () => {
  const router = useRouter()
  const classes = useStyles();
  const [loading, setLoading] = useState(false)
  const [permissions, setPermissions] = useState([])
  const {handleApiError} = useFlash()
  const api = Api.json({token: Api.token, handleApiError})
  useEffect(()=>{
    setLoading(true)
    api.fetch('/permissions').then(res=>{
      setPermissions(res.data)
      setLoading(false)
    })
  }, [])
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
  if (loading) return <CircularProgress />
  return (
    <div className={classes.paper}>
      <Avatar className={classes.avatar}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        アカウントを選択
      </Typography>
      <Box mt={2}>
        <Container component="main" maxWidth="xs">
          <List className={classes.root}>
            {permissions.map(permission => {
              return (
                <ListItem key={permission.id} role={undefined} dense button 
                  onClick={()=>selectAccount(permission.id)}>
                  <ListItemIcon><PermissionChip permission={permission} /></ListItemIcon>
                  <ListItemText id={permission.id} primary={permission.party_name} />
                  {/*<ListItemSecondaryAction>
                    <IconButton edge="end" aria-label="comments">
                      <CommentIcon />
                    </IconButton>
                  </ListItemSecondaryAction>*/}
                </ListItem>
              );
            })}
          </List>
        </Container>
      </Box>
    </div>
  )
}
export default permissions
