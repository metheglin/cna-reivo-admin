import React from 'react'
import {Chip, Typography, makeStyles} from '@material-ui/core';
import { formatDistance } from 'date-fns'
import ja from 'date-fns/locale/ja'

const useStyles = makeStyles({
  caption: {
    fontSize: '0.65rem',
  }
})

const statusMap = {
  published: {
    color: "primary",
    label: "published",
  },
  unpublished: {
    color: "secondary",
    label: "not published",
  }
}

export default function PublishStatus(props) {
  const classes = useStyles()
  const dt1= new Date(props.start_at)
  const dt2= new Date(props.end_at)
  const publicDay = Math.ceil(( dt1 - new Date()) / (60 * 60 * 24 * 1000))
  const privateDay = Math.ceil((dt2 - new Date()) / (60 * 60 * 24 * 1000))
  const publicLimit = 3
  const privateLimit = 30
  let status = null
  let info = null
  
  if (props.start_at && props.end_at) {
    if (props.status === "opened") {
      if (privateDay > 0) {
        if (publicDay > 0) {
          status = "unpublished"
          if (publicDay <= publicLimit) {
            info = [
              `${formatDistance(dt1, new Date(), { addSuffix: true, locale: ja })}に公開`, 
              'secondary'
            ]
          }
        } else {
          status = "published"
          if (privateDay <= privateLimit) {
            info = [
              `${formatDistance(dt2, new Date(), { addSuffix: true, locale: ja })}に終了`,
              'secondary'
            ]
          }
        }
      } else {
        status = "unpublished"
        info = ["公開予定なし", "inherit"]
      }
    } else {
      status = "unpublished"
      info = ["公開予定なし", "inherit"]
    }
  } else {
    if (props.status === "opened") {
      status = "published"
    } else {
      status = "unpublished"
    }
  }

  const {color: statusColor, label: statusLabel} = statusMap[status] || {}
  const [infoLabel, infoColor] = info || []

  return (
    <React.Fragment>
      {statusLabel && <Chip size="small" variant="outlined" label={statusLabel} color={statusColor} />}{' '}
      {infoLabel && <Typography className={classes.caption} variant="caption" color={infoColor}>{infoLabel}</Typography>}
    </React.Fragment>
  )
}
