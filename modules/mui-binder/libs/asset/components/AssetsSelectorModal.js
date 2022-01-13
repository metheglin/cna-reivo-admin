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
// import AssetsSelectorModal from 'modules/mui-binder/libs/asset/components/AssetsSelectorModal'
// import AssetsButtonModal from 'modules/mui-binder/libs/asset/components/AssetsButtonModal'
// import {useSelector} from 'modules/mui-binder/libs/newSelectableList'
// import useAssets from 'modules/mui-binder/libs/asset/useAssets'
// import useImageUploader from 'modules/mui-binder/libs/asset/useImageUploader'
// 
// const baseQuery = {channel: 'label'}
// const sourceAssets = useAssets({baseQuery})
// const sourceUploader = useImageUploader({baseQuery, onUploaded: sourceAssets.addItem})
// const images = useSelector({defaultValue: [], max: 3,})
// 
// return (
//   <AssetsSelectorModal label="Asset" selector={images} sourceAssets={sourceAssets} sourceUploader={sourceUploader} />
// )
const AssetsSelectorModal = forwardRef(({selector, sourceAssets, sourceUploader, label}, ref) => {
  const classes = useStyles()
  const {values, onRemove, onPush, isSelected} = selector
  const [open, setOpen] = useState(false)

  const getItemProps = (item) => {
    const selected = isSelected(item)
    const onClick = () => selected ? onRemove(item) : onPush(item)
    return {item, selected, onClick}
  }

  const renderSelector = (
    <List dense>
      {values.map((item,i) => (<AssetRow key={i} {...getItemProps(item)} />))}
    </List>
  )

  const renderCollection = (
    <ImageList spacing={6} cols={12}>
      {sourceAssets.items.map((item,i) => (<AssetTile key={i} {...getItemProps(item)} />))}
    </ImageList>
  )

  const renderUploader = sourceUploader ? sourceUploader.render : null

  useImperativeHandle(ref, ()=>({
    get open() {return open},
    setOpen(x) {return setOpen(x)}
  }))

  return (
    <Fragment>
      <Grid container justifyContent="space-between" alignItems="center">
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
            <Grid item sm={3}>
              <div className={classes.selector}>{renderSelector}</div>
            </Grid>
            <Grid item container sm={9}>
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
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
})
export default AssetsSelectorModal