import React from 'react'
import {Button, Tooltip} from '@mui/material'
import CachedIcon from '@mui/icons-material/Cached'
import RestoreIcon from '@mui/icons-material/Restore'
import {useTranslation} from 'react-i18next'

export default function Component({subject, onOpen, onDraft, ...props}) {
  const {status} = subject
  return (
    <React.Fragment>
    {status === 'opened' && <ButtonDraft onClick={onDraft} {...props}/>}
    {status === 'draft' && <ButtonOpen onClick={onOpen} {...props} />}
    </React.Fragment>
  )
}

export const ButtonOpen = props => {
  const {t} = useTranslation()
  return (
    <Tooltip title={t("It will be opened for end-user by clicking here")} arrow>
      <Button {...props}
        variant="contained"
        color="primary"
        size="small"
        startIcon={<CachedIcon />}>
        {t('Open Now')}
      </Button>
    </Tooltip>
  )
}

export const ButtonDraft = props => {
  const {t} = useTranslation()
  return (
    <Tooltip title={t("It will be drafted and closed for end-user by clicking here")} arrow>
      <Button {...props}
        variant="contained"
        color="secondary"
        size="small"
        startIcon={<RestoreIcon />}>
        {t('Draft Now')}
      </Button>
    </Tooltip>
  )
}