import React, {useState} from 'react'
import {
  makeStyles, Dialog, DialogContent, DialogActions, Button, Grid,
  InputLabel, 
} from '@material-ui/core'
import Link from 'next/link'
import AddIcon from '@material-ui/icons/Add'

const useStyles = makeStyles(theme=>({
  // root: {
  //   maxWidth: '80vw',
  // },
  grow: {
    flexGrow: 1,
    marginBottom: theme.spacing(2),
  },
  selector: {
    marginTop: 68,
  }
}))

export default function useModalRender(selectableAssets, props={}) {
  const classes = useStyles()
  const {renderList, renderSelector, renderUploader} = selectableAssets
  const {label} = props
  const [open, setOpen] = useState(false)

  return (
    <React.Fragment>
      <Grid container justify="space-between" alignItems="center">
        <Grid item>
          {label && <InputLabel shrink>{label}</InputLabel>}
        </Grid>
        <Grid item>
          <Button size="small" onClick={()=>setOpen(true)} color="primary">Modify</Button>
        </Grid>
      </Grid>
      {renderSelector}
      <Dialog
        className={classes.root}
        disableBackdropClick
        disableEscapeKeyDown
        fullWidth={true}
        maxWidth={false}
        onEntering={()=>{}}
        aria-labelledby="confirmation-dialog-title"
        open={open}>
        <DialogContent dividers>
          <Grid container justify="space-between" spacing={1}>
            <Grid item sm={3}>
              <div className={classes.selector}>{renderSelector}</div>
            </Grid>
            <Grid item container sm={9}>
              <Grid item container alignItems="center" spacing={1}>
                <Grid item className={classes.grow}>{renderUploader}</Grid>
              </Grid>
              <Grid item className={classes.grow}>{renderList}</Grid>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={()=>setOpen(false)} color="primary">
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  )
}