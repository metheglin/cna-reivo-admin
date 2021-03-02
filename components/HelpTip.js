import React from 'react'
// import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import HelpIcon from '@material-ui/icons/HelpOutline';

export default ({children}) => {
  // const classes = useStyles()
  return (
    <Grid container alignItems="flex-start" wrap="nowrap" spacing={2}>
      <Grid item><HelpIcon/></Grid>
      <Grid item>
        <Typography variant="body1">
          {children}
        </Typography>
      </Grid>
    </Grid>
  )
}