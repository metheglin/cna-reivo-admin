import {Chip} from '@material-ui/core'
import {formatDistance} from 'date-fns'

export function CreatedAt({created_at}) {
  if (!created_at) return null
  return (<Chip size="small" variant="outlined" label={`Created ${formatDistance(new Date(created_at), new Date(), {addSuffix: true})}`} />)
}

export function UpdatedAt({updated_at}) {
  if (!updated_at) return null
  return (<Chip size="small" variant="outlined" label={`Updated ${formatDistance(new Date(updated_at), new Date(), {addSuffix: true})}`} />)
}
