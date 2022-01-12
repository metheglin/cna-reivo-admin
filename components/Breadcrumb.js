import React from 'react'
// import LinkNext from 'next/link'
import Link from 'components/Link'
import { Breadcrumbs, Typography } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import {useTranslation} from 'react-i18next'

const useStyles = makeStyles((theme) => ({
  item: {
    fontSize: 12,
  },
}))

const renderListItem = ({title, url}, index) => {
  const classes = useStyles()
  const {t} = useTranslation()
  if (!url) return (<Typography key={index} color="textPrimary" className={classes.item}>{t(title)}</Typography>)
  return (
    <Link key={index} color="inherit" href={url} className={classes.item}>{t(title)}</Link>
  )
}

export default function Breadcrumb({list}) {
  return (
    <Breadcrumbs maxItems={4} aria-label="breadcrumb">
      {list.map((x,i)=>renderListItem(x,i))}
    </Breadcrumbs>
  )
}
