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
  },
  selector: {
    marginTop: 35,
  }
}))

export default function useModalRender(selectableLabels, props={}) {
  const classes = useStyles()
  const {prefix, renderList, renderSelector, renderFilter} = selectableLabels
  const {label} = props
  const [open, setOpen] = useState(false)

  return (
    <React.Fragment>
      <Grid container justify="space-between" alignItems="center">
        <Grid item>
          {label && <InputLabel shrink>Labels</InputLabel>}
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
          <Grid container>
            <Grid item sm={3}>
              <div className={classes.selector}>{renderSelector}</div>
            </Grid>
            <Grid item container sm={9}>
              <Grid item container alignItems="center" spacing={1}>
                <Grid item className={classes.grow}>{renderFilter}</Grid>
                <Grid item>
                  <Link href={`/labels/new${prefix}`} passHref>
                    <Button size="small"
                      className={classes.button}
                      startIcon={<AddIcon />}>
                      Add More
                    </Button>
                  </Link>
                </Grid>
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