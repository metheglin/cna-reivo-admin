import {Chip, Button, Tooltip} from '@material-ui/core'
import CachedIcon from '@material-ui/icons/Cached'
import {useSession} from 'modules/rvadmin/core/SessionProvider'
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

  const type = status === 'active' ? 'inactivate' : 'activate'
  const onClick = type === 'activate' ? handleActivate : handleInactivate
  return (
    <Tooltip title={`${type} now`} arrow>
      <Button {...props}
        variant="contained"
        color={type === 'activate' ? "primary" : "secondary"}
        size="small"
        onClick={onClick}
        startIcon={<CachedIcon />}>
        {type}
      </Button>
    </Tooltip>
  )
}
