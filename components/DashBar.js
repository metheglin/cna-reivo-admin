import {Fragment, isValidElement} from 'react'
import { Typography, Toolbar, Tooltip, IconButton, Icon, Divider } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import {useRouter} from 'next/router'
import Breadcrumb from 'components/Breadcrumb'
import {useTranslation} from 'react-i18next'

const renderIconLink = ({title, url, icon, ...props}) => {
  const router = useRouter()
  const {t} = useTranslation()
  const button = (
    <IconButton size="small" onClick={()=>router.push(url)}>
      <Icon {...props}>{icon}</Icon>
    </IconButton>
  )
  return title ? (<Tooltip title={t(title)}>{button}</Tooltip>) : button
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
    <Fragment>
      {title && <Typography variant="h4">{title}</Typography>}
      {breadcrumb && <Breadcrumb list={breadcrumb} />}
    </Fragment>
  )
  const sub = (
    <Fragment>
      {iconLinks.filter(x=>x).map((x,i)=>{
        return isValidElement(x) ?
          x :
          <Fragment key={i}>{renderIconLink(x)}</Fragment>
      })}
      {children}
    </Fragment>
  )
  return (<DashBar main={main}>{sub}</DashBar>)
}
