import React from 'react'
import LinkNext from 'next/link'
import {Breadcrumbs, Typography, Link} from '@material-ui/core'

const renderListItem = ({title, url}, index) => {
  if (!url) return (<Typography key={index} color="textPrimary">{title}</Typography>)
  return (
    <LinkNext key={index} href={url}><Link color="inherit" href={url}>{title}</Link></LinkNext>
  )
}

export default function Breadcrumb({list}) {
  return (
    <Breadcrumbs maxItems={4} aria-label="breadcrumb">
      {list.map((x,i)=>renderListItem(x,i))}
    </Breadcrumbs>
  )
}
