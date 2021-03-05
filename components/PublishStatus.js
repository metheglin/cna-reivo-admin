import React from 'react'
import {Chip, Typography, makeStyles} from '@material-ui/core';
import { formatDistance } from 'date-fns'
import ja from 'date-fns/locale/ja'

const useStyles = makeStyles({
  caption: {
    fontSize: '0.65rem',
  }
})

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
          status = ["非公開", "default"]
          if (publicDay <= publicLimit) {
            info = [
              `${formatDistance(dt1, new Date(), { addSuffix: true, locale: ja })}に公開`, 
              'secondary'
            ]
          }
        } else {
          status = ["公開中", "primary"]
          if (privateDay <= privateLimit) {
            info = [
              `${formatDistance(dt2, new Date(), { addSuffix: true, locale: ja })}に終了`,
              'secondary'
            ]
          }
        }
      } else {
        status = ["非公開", "default"]
        info = ["公開予定なし", "inherit"]
      }
    } else {
      status = ["非公開", "default"]
      info = ["公開予定なし", "inherit"]
    }
  } else {
    if (props.status === "opened") {
      status = ["公開中", "primary"]
    } else {
      status = ["非公開", "default"]
    }
  }

  return (
    <React.Fragment>
      {status && <Chip size="small" label={status[0]} color={status[1]} />}{' '}
      {info && <Typography className={classes.caption} variant="caption" color={info[1]}>{info[0]}</Typography>}
    </React.Fragment>
  )
}
