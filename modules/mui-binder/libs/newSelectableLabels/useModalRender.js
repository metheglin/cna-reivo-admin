import React, {useState} from 'react'
import {makeStyles, Dialog, DialogContent, DialogActions, Button, Grid} from '@material-ui/core'

const useStyles = makeStyles(theme=>({
  // root: {
  //   maxWidth: '80vw',
  // },
}))

export default function useModalRender(selectableLabels) {
  const classes = useStyles()
  const {renderList, renderSelector} = selectableLabels
  const [open, setOpen] = useState(false)

  return (
    <React.Fragment>
      <Button autoFocus onClick={()=>setOpen(true)} color="primary">
        Open
      </Button>
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
          <Grid container>
            <Grid item sm={3}>
              {renderSelector}
            </Grid>
            <Grid item sm={9}>
              {renderList}
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={()=>setOpen(false)} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  )
}