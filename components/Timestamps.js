import {Chip, Tooltip} from '@mui/material'
import {format, formatDistance} from 'date-fns'

export function Timestamp({prefix, datetime}) {
  if (!datetime) return null
  const label = [prefix, formatDistance(new Date(datetime), new Date(), {addSuffix: true})].filter(x=>x).join(' ')
  return (
    <Tooltip title={format(new Date(datetime), "yyyy-MM-dd HH:mm:ssxxx")}>
      <Chip size="small" variant="outlined" label={label} />
    </Tooltip>
  )
}

export function CreatedAt({created_at}) {
  return (<Timestamp datetime={created_at} prefix="Created" />)
}

export function UpdatedAt({updated_at}) {
  return (<Timestamp datetime={updated_at} prefix="Updated" />)
}
