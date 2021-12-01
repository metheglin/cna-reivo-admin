import {Fragment, useState} from 'react'
import {
  makeStyles, Dialog, DialogContent, DialogActions, Button, Grid, InputLabel, 
  GridList, List,
} from '@material-ui/core'
import {AssetTile, AssetRow} from './index.js'

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
// import AssetsButtonModal from 'modules/mui-binder/libs/asset/components/AssetsButtonModal'
// import useAssets from 'modules/mui-binder/libs/asset/useAssets'
// import useImageUploader from 'modules/mui-binder/libs/asset/useImageUploader'
// 
// const baseQuery = {channel: 'label'}
// const sourceAssets = useAssets({baseQuery})
// const sourceUploader = useImageUploader({baseQuery, onUploaded: sourceAssets.addItem})
// 
// return (
//   <AssetsButtonModal label="Asset" sourceAssets={sourceAssets} sourceUploader={sourceUploader} onClick={()=>{}} />
// )
export default function AssetsButtonModal({sourceAssets, sourceUploader, label, onClick, children}) {
  const classes = useStyles()
  const [open, setOpen] = useState(false)
  const handleClick = (item) => {
    onClick(item)
    setOpen(false)
  }

  const renderCollection = (
    <GridList cellHeight={120} spacing={6} cols={12}>
      {sourceAssets.items.map((item,i) => (
        <AssetTile key={i} item={item} onClick={()=>handleClick(item)} />
      ))}
    </GridList>
  )

  const renderUploader = sourceUploader ? sourceUploader.render : null
  const renderAction = (children && children(setOpen)) || (
    <Grid container justify="space-between" alignItems="center">
      <Grid item>
        {label && <InputLabel shrink>{label}</InputLabel>}
      </Grid>
      <Grid item>
        <Button size="small" onClick={()=>setOpen(true)} color="primary">Open</Button>
      </Grid>
    </Grid>
  )

  return (
    <Fragment>
      {renderAction}

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
}
