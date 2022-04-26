import {Tooltip, Button, Chip} from '@mui/material'
import GetAppIcon from '@mui/icons-material/GetApp'

export function DownloadButton({children, tooltip, ...props}) {
  const button = (
    <Button startIcon={<GetAppIcon />} size="small" 
      variant="contained" color="primary" 
      {...props}>{children}</Button>
  )
  return tooltip ?
    (<Tooltip title={tooltip} arrow>{button}</Tooltip>) :
    button
}

export function ActiveStatus({status}) {
  const color = status === 'active' ? 'primary' : 'secondary'
  return (<Chip size="small" variant="outlined" color={color} label={status} />)
}

export function OpenStatus({status}) {
  const color = status === 'opened' ? 'primary' : 'default'
  return (<Chip size="small" variant="outlined" color={color} label={status} />)
}
