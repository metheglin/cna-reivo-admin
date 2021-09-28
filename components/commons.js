import {Button, Chip} from '@material-ui/core'
import GetAppIcon from '@material-ui/icons/GetApp'

export function DownloadButton({children, ...props}) {
  return (
    <Button startIcon={<GetAppIcon />} size="small" 
      variant="contained" color="primary" 
      {...props}>{children}</Button>
  )
}

export function ActiveStatus({status}) {
  const color = status === 'active' ? 'primary' : 'secondary'
  return (<Chip size="small" variant="outlined" color={color} label={status} />)
}

export function OpenStatus({status}) {
  const color = status === 'opened' ? 'primary' : 'default'
  return (<Chip size="small" variant="outlined" color={color} label={status} />)
}
