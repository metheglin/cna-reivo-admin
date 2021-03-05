import React from 'react'
import {
  makeStyles, Typography, Toolbar, Tooltip, IconButton, Icon, Divider,
} from '@material-ui/core'
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

export default function DashBar({children, title, breadcrumb, iconLinks}) {
  const classes = useStyles()
  return (
    <div className={classes.root}>
      <Toolbar className={classes.toolbar}>
        <div>
          {title && <Typography variant="h4">{title}</Typography>}
          {breadcrumb && <Breadcrumb list={breadcrumb} />}
        </div>
        <div>
          {iconLinks.map((x,i)=><React.Fragment key={i}>{renderIconLink(x)}</React.Fragment>)}
          {children}
        </div>
      </Toolbar>
      <Divider />
    </div>
  )

}