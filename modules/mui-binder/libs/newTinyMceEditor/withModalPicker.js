import React, {useState, useMemo} from 'react'
import {
  makeStyles, Dialog, DialogContent, DialogActions, Button, Grid,
  InputLabel, GridList, GridListTile,
} from '@material-ui/core'
import Link from 'next/link'
import AddIcon from '@material-ui/icons/Add'
import {getThumbnail} from 'modules/mui-binder/components/Asset'
import newTinyMceEditor from './index.js'

const useStyles = makeStyles(theme=>({
  grow: {
    flexGrow: 1,
    marginBottom: theme.spacing(2),
  },
}))

function AssetGridList({assets, onClick}) {
  return (
    <GridList cellHeight={120} spacing={6} cols={12}>
      {assets.map((item,i) => (
        <GridListTile key={i} onClick={()=>onClick(item)}>
          <img src={getThumbnail(item)} alt={item.content_type} />
        </GridListTile>
      ))}
    </GridList>
  )
}
export default function withModalPicker(editorProps, {assetsModule}) {
  const classes = useStyles()
  const [imgOpen, setImgOpen] = useState(false)
  const [imgPicker, setImgPicker] = useState()
  const file_picker_callback = (callback, value, meta)=>{
    if (meta.filetype === 'image') {
      setImgOpen(true)
      setImgPicker({callback})
    }
  }
  const init = {file_picker_callback, ...editorProps.init}
  const editor = newTinyMceEditor({...editorProps, init})
  const {assets, render: renderUploader} = assetsModule

  const render = (
    <React.Fragment>
      {editor.render}
      <Dialog
        className={classes.root}
        disableBackdropClick
        disableEscapeKeyDown
        fullWidth={true}
        maxWidth={false}
        onEntering={()=>{}}
        aria-labelledby="confirmation-dialog-title"
        open={imgOpen}>
        <DialogContent dividers>
          <Grid container justify="space-between" spacing={1}>
            <Grid item container>
              <Grid item container alignItems="center" spacing={1}>
                <Grid item className={classes.grow}>{renderUploader}</Grid>
              </Grid>
              <Grid item className={classes.grow}>
                <AssetGridList assets={assets} onClick={(asset)=>{
                  imgPicker && imgPicker.callback(asset.publish_url)
                  setImgOpen(false)
                }} />
              </Grid>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={()=>setImgOpen(false)} color="primary">Close</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  )

  return {...editor, render}
}