import {Chip} from '@material-ui/core'

export default function Component({buildings, max=1, ...props}) {
  const names = (buildings || []).map(x=>x.name)
  const count = names.length
  const summary = names.slice(0,max).join(', ')
  const label = (count > max) ? `${summary} ... ${count} others` : summary
  if (count <= 0) return null
  return (
    <Chip label={label} size="small" variant="outlined" {...props} />
  )
}