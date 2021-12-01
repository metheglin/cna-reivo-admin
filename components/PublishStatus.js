import {Chip, Tooltip} from '@material-ui/core';
import { formatDistance, formatDistanceToNow } from 'date-fns'
// import ja from 'date-fns/locale/ja'

const checkPublishStatus = ({start_at, end_at, status}) => {
  const daysLeftToPublish = Math.ceil((new Date(start_at) - new Date()) / (60 * 60 * 24 * 1000))
  const daysLeftToUnPublish = Math.ceil((new Date(end_at) - new Date()) / (60 * 60 * 24 * 1000))
  if (!start_at || !end_at) {
    return (status === "opened") ?
      ["published", "primary", null] :
      ["not published", "secondary", null]
  }

  if (status !== "opened") {
    return ["not published", "default", "Never be publishing"]
  }
  if (daysLeftToUnPublish <= 0) {
    return ["not published", "default", `Expired ${formatDistance(new Date(end_at), new Date())} ago`]
  }
  if (daysLeftToPublish > 0) {
    const color = daysLeftToPublish <= 7 ? "secondary" : "default"
    const info = [
      "Waiting to be published",
      daysLeftToPublish <= 7 ? formatDistanceToNow(new Date(start_at)) : null
    ].join(' ')
    return ["not published", color, info]
  } else {
    const color = daysLeftToUnPublish <= 14 ? "secondary" : "primary"
    const info = daysLeftToUnPublish <= 14 ? `Will be closed ${formatDistanceToNow(new Date(end_at))}` : null
    return ["published", color, info]
  }
}

export default function PublishStatus({start_at, end_at, status}) {
  const [label, color, info] = checkPublishStatus({start_at, end_at, status})
  const StatusComponent = (<Chip size="small" variant="outlined" label={label} color={color} />)
  if (info) {
    return (<Tooltip interactive title={info}>{StatusComponent}</Tooltip>)
  } else {
    return StatusComponent
  }
}
