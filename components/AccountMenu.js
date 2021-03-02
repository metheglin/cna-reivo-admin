import React, {useState} from 'react'
import {useRouter} from 'next/router'
import {useTheme} from 'themes/default'
import {useSession} from 'modules/rvadmin/core/SessionProvider'
import {
  IconButton, Menu, MenuItem, FormControlLabel, Switch,
} from '@material-ui/core';
import PersonIcon from '@material-ui/icons/Person';
import SwapHorizIcon from '@material-ui/icons/SwapHoriz';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

export default function AccountMenu() {
  const [anchorEl, setAnchorEl] = useState(null)
  const router = useRouter()
  const session = useSession()
  const {email} = session.payload
  const {paletteType, setPaletteType} = useTheme()

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
        <MenuItem>
          <FormControlLabel
            control={
              <Switch
                checked={paletteType === 'dark'}
                onChange={()=>setPaletteType(paletteType === 'dark' ? 'light' : 'dark')}
                color="primary"
              />
            }
            label="Dark mode"
          />
        </MenuItem>
        <MenuItem>{email}</MenuItem>
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