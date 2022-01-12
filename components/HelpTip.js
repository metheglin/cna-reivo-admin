import React from 'react'
// import { makeStyles } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import HelpIcon from '@mui/icons-material/HelpOutline';

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