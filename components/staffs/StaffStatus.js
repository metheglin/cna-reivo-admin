import {Chip, Button, Tooltip} from '@mui/material'
import CachedIcon from '@mui/icons-material/Cached'
import {useSession} from 'modules/rvadmin/core/SessionProvider'
import {useTranslation} from 'react-i18next'
// import {staffStatus, staffAction} from 'constants/status'

export function StaffStatus(props) {
  const {status} = props
  const color = status === 'active' ? 'primary' : 'secondary'
  return (
    <Chip size="small" variant="outlined" color={color} label={status} />
  )
}

export function StaffStatusButton({subject, setSubject, ...props}) {
  const {status} = subject
  const {t} = useTranslation()
  const {api, enqueueSnackbar} = useSession()
  const handleActivate = () => {
    api.fetch(`/staffs/${subject.id}/activate`, {method: "PATCH"}).then(res=>{
      setSubject(res.data)
      enqueueSnackbar(res.message, {variant: 'success', persist: false})
    })
  }
  const handleInactivate = () => {
    api.fetch(`/staffs/${subject.id}/inactivate`, {method: "PATCH"}).then(res=>{
      setSubject(res.data)
      enqueueSnackbar(res.message, {variant: 'success', persist: false})
    })
  }

  const type = status === 'active' ? 'Inactivate' : 'Activate'
  const onClick = status === 'active' ? handleInactivate : handleActivate
  return (
    <Tooltip title={`${type} now`} arrow>
      <Button {...props}
        variant="contained"
        color={status === 'active' ? "secondary" : "primary"}
        size="small"
        onClick={onClick}
        startIcon={<CachedIcon />}>
        {t(type)}
      </Button>
    </Tooltip>
  )
}
