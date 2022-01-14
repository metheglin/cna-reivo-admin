import React, {useState} from 'react'
import {useRouter} from 'next/router'
import {useTheme} from 'themes/default'
import {useSession} from 'modules/rvadmin/core/SessionProvider'
import {
  IconButton, Menu, MenuItem, FormControlLabel, Switch,
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

export default function AccountMenu() {
  const [anchorEl, setAnchorEl] = useState(null)
  const router = useRouter()
  const session = useSession()
  const {email} = session.payload
  const {paletteType, setPaletteType} = useTheme()

  return (
    <React.Fragment>
      <IconButton color="inherit" onClick={(e)=>setAnchorEl(e.currentTarget)} size="large">
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
        <MenuItem onClick={()=>router.push('/my/profile')}>
          <PersonIcon style={{paddingRight: 6}} /> プロフィール
        </MenuItem>
        <MenuItem onClick={()=>router.push('/att/permissions')}>
          <SwapHorizIcon style={{paddingRight: 6}} /> アカウントを変更
        </MenuItem>
        <MenuItem onClick={()=>session.logout()}>
          <ExitToAppIcon style={{paddingRight: 6}} /> ログアウト
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
}