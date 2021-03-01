import React, {useState} from 'react'
import {useRouter} from 'next/router'
import {useSession} from 'modules/rvadmin/core/SessionProvider'
// import Link from 'components/Link'
import LinkNext from 'next/link'
import {
  IconButton, Menu, MenuItem
} from '@material-ui/core';
import PersonIcon from '@material-ui/icons/Person';
import SwapHorizIcon from '@material-ui/icons/SwapHoriz';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

export default function AccountMenu() {
  const [anchorEl, setAnchorEl] = useState(null)
  const router = useRouter()
  const session = useSession()
  const {email} = session.payload

  return (
    <React.Fragment>
      <IconButton color="inherit" onClick={(e)=>setAnchorEl(e.currentTarget)}>
        <PersonIcon />
      </IconButton>
      <Menu
        id="account-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={()=>setAnchorEl(null)}>
        <MenuItem onClick={()=>{}}>{email}</MenuItem>
        <MenuItem onClick={()=>router.push('/att/permissions')}>
          <SwapHorizIcon style={{paddingRight: 6}} /> アカウントを変更
        </MenuItem>
        <MenuItem onClick={()=>session.logout()}>
          <ExitToAppIcon style={{paddingRight: 6}} /> ログアウト
        </MenuItem>
      </Menu>
    </React.Fragment>
  )
}