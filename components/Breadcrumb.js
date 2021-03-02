import React from 'react'
// import LinkNext from 'next/link'
import Link from 'components/Link'
import {Breadcrumbs, Typography, makeStyles} from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  item: {
    fontSize: 12,
  },
}))

const renderListItem = ({title, url}, index) => {
  const classes = useStyles()
  if (!url) return (<Typography key={index} color="textPrimary" className={classes.item}>{title}</Typography>)
  return (
    <Link key={index} color="inherit" href={url} className={classes.item}>{title}</Link>
  )
}

export default function Breadcrumb({list}) {
  return (
    <Breadcrumbs maxItems={4} aria-label="breadcrumb">
      {list.map((x,i)=>renderListItem(x,i))}
    </Breadcrumbs>
  )
}
