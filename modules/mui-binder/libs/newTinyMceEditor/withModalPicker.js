import React, {useState, useMemo} from 'react'
import {
  Dialog,
  DialogContent,
  DialogActions,
  Button,
  Grid,
  InputLabel,
  ImageList,
  ImageListItem,
} from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import Link from 'next/link'
import AddIcon from '@mui/icons-material/Add'
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
    <ImageList cellHeight={120} spacing={6} cols={12}>
      {assets.map((item,i) => (
        <ImageListItem key={i} onClick={()=>onClick(item)}>
          <img src={getThumbnail(item)} alt={item.content_type} />
        </ImageListItem>
      ))}
    </ImageList>
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
        disableEscapeKeyDown
        fullWidth={true}
        maxWidth={false}
        aria-labelledby="confirmation-dialog-title"
        open={imgOpen}
        TransitionProps={{
          onEntering: ()=>{}
        }}>
        <DialogContent dividers>
          <Grid container justifyContent="space-between" spacing={1}>
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