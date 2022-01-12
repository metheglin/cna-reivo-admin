import React from 'react'
import {Button, Tooltip} from '@mui/material'
import CachedIcon from '@mui/icons-material/Cached'
import RestoreIcon from '@mui/icons-material/Restore'

export default function Component({subject, onOpen, onDraft, ...props}) {
  const {status} = subject
  return (
    <React.Fragment>
    {status === 'opened' && <ButtonDraft onClick={onDraft} {...props}/>}
    {status === 'draft' && <ButtonOpen onClick={onOpen} {...props} />}
    </React.Fragment>
  )
}

export const ButtonOpen = props => (
  <Tooltip title="Open now" arrow>
    <Button {...props}
      variant="contained"
      color="primary"
      size="small"
      startIcon={<CachedIcon />}>
      open
    </Button>
  </Tooltip>
)

export const ButtonDraft = props => (
  <Tooltip title="Make draft now" arrow>
    <Button {...props}
      variant="contained"
      color="secondary"
      size="small"
      startIcon={<RestoreIcon />}>
      draft
    </Button>
  </Tooltip>
)