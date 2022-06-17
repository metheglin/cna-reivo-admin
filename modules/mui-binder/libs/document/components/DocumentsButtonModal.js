import {Fragment, useState, forwardRef, useImperativeHandle} from 'react'
import {
  Dialog,
  DialogContent,
  DialogActions,
  Button,
  Grid,
  InputLabel,
  ImageList,
  List,
} from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import {DocumentRow} from './DocumentRow'

const useStyles = makeStyles(theme=>({
  grow: {
    flexGrow: 1,
    marginBottom: theme.spacing(2),
  },
  selector: {
    marginTop: 68,
  }
}))

// USAGE:
// 
// import DocumentsButtonModal from 'modules/mui-binder/libs/asset/components/DocumentsButtonModal'
// import useDocuments from 'modules/mui-binder/libs/asset/useDocuments'
// import useImageUploader from 'modules/mui-binder/libs/asset/useImageUploader'
// 
// const baseQuery = {channel: 'label'}
// const sources = useDocuments({baseQuery})
// const sourceUploader = useImageUploader({baseQuery, onUploaded: sourceDocuments.addItem})
// 
// return (
//   <DocumentsButtonModal label="Document" sources={sources} sourceUploader={sourceUploader} onClick={()=>{}} />
// )
const DocumentsButtonModal = forwardRef(({sources, sourceUploader, label, onClick, actionComponent}, ref) => {
  const classes = useStyles()
  const [open, setOpen] = useState(false)
  const handleClick = (item) => {
    onClick(item)
    setOpen(false)
  }

  const renderCollection = (
    <List dense>
      {sources.items.map((item,i) => (<DocumentRow key={i} item={item} onClick={()=>handleClick(item)} />))}
    </List>
  )

  const renderUploader = sourceUploader ? sourceUploader.render : null
  const renderAction = (actionComponent && actionComponent(setOpen)) || (
    <Grid container justifyContent="space-between" alignItems="center">
      <Grid item>
        {label && <InputLabel shrink>{label}</InputLabel>}
      </Grid>
      <Grid item>
        <Button size="small" onClick={()=>setOpen(true)} color="primary">Open</Button>
      </Grid>
    </Grid>
  )

  useImperativeHandle(ref, ()=>({
    get open() {return open},
    setOpen(x) {return setOpen(x)}
  }))

  return (
    <Fragment>
      {renderAction}

      <Dialog
        className={classes.root}
        disableEscapeKeyDown
        fullWidth={true}
        maxWidth={false}
        aria-labelledby="confirmation-dialog-title"
        open={open}
        TransitionProps={{
          onEntering: ()=>{}
        }}>
        <DialogContent dividers>
          <Grid container justifyContent="space-between" spacing={1}>
            <Grid item container sm={12}>
              {renderUploader && (
                <Grid item container alignItems="center" spacing={1}>
                  <Grid item className={classes.grow}>{renderUploader}</Grid>
                </Grid>)}
              <Grid item className={classes.grow}>{renderCollection}</Grid>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={()=>setOpen(false)} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  )
})
export default DocumentsButtonModal
