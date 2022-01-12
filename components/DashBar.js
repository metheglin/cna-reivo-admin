import React from 'react'
import { Typography, Toolbar, Tooltip, IconButton, Icon, Divider } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import {useRouter} from 'next/router'
import Breadcrumb from 'components/Breadcrumb'

const renderIconLink = ({title, url, icon, ...props}) => {
  const router = useRouter()
  const button = (
    <IconButton size="small" onClick={()=>router.push(url)}>
      <Icon {...props}>{icon}</Icon>
    </IconButton>
  )
  return title ? (<Tooltip title={title}>{button}</Tooltip>) : button
}

const useStyles = makeStyles(theme =>({
  root: {
    color: theme.palette.mode === 'light' ? null : '#fff',
    marginLeft: theme.spacing(3),
    marginRight: theme.spacing(3),
  },
  toolbar: {
    display: "flex",
    justifyContent: "space-between",
    padding: 0,
  },
}))

export default function DashBar({children, main}) {
  const classes = useStyles()
  return (
    <div className={classes.root}>
      <Toolbar className={classes.toolbar}>
        <div>{main}</div>
        <div>{children}</div>
      </Toolbar>
      <Divider />
    </div>
  )
}

export function MainDashBar({children, title, breadcrumb, iconLinks}) {
  const main = (
    <React.Fragment>
      {title && <Typography variant="h4">{title}</Typography>}
      {breadcrumb && <Breadcrumb list={breadcrumb} />}
    </React.Fragment>
  )
  const sub = (
    <React.Fragment>
      {iconLinks.map((x,i)=><React.Fragment key={i}>{renderIconLink(x)}</React.Fragment>)}
      {children}
    </React.Fragment>
  )
  return (<DashBar main={main}>{sub}</DashBar>)
}
