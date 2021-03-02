import React from 'react'
import {
  Typography, Paper, Toolbar, Tooltip, IconButton, Icon
} from '@material-ui/core'
import {useRouter} from 'next/router'

const renderIconLink = ({title, url, icon, ...props}) => {
  const router = useRouter()
  const button = (
    <IconButton size="small" onClick={()=>router.push(url)}>
      <Icon {...props}>{icon}</Icon>
    </IconButton>
  )
  return title ? (<Tooltip title={title}>{button}</Tooltip>) : button
}

export default function DashBar({children, title, iconLinks}) {
  return (
    <Paper>
      <Toolbar>
        <Typography>{title}</Typography>
        {iconLinks.map((x,i)=><React.Fragment key={i}>{renderIconLink(x)}</React.Fragment>)}
        {children}
      </Toolbar>
    </Paper>
  )

}