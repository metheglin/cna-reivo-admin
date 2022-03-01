import {Fragment, useState, useMemo, useRef} from 'react'
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
import AssetsButtonModal from 'modules/mui-binder/libs/asset/components/AssetsButtonModal'

const useStyles = makeStyles(theme=>({
  grow: {
    flexGrow: 1,
    marginBottom: theme.spacing(2),
  },
}))

export default function withModalPicker(editorProps, {sourceAssets, sourceUploader}) {
  const classes = useStyles()
  const assetsRef = useRef()
  const [imgPicker, setImgPicker] = useState()
  const file_picker_callback = (callback, value, meta)=>{
    // console.log('file_picker_callback', callback, value, meta)
    if (meta.filetype === 'image') {
      assetsRef.current.setOpen(true)
      setImgPicker({callback})
    }
  }
  const init = {file_picker_callback, ...editorProps.init}
  const editor = newTinyMceEditor({...editorProps, init})

  const render = (
    <Fragment>
      {editor.render}
      <AssetsButtonModal ref={assetsRef} label="Image" 
        sourceAssets={sourceAssets} sourceUploader={sourceUploader} 
        actionComponent={(setOpen)=><Fragment></Fragment>}
        onClick={(asset)=>{
          console.log(asset)
          imgPicker && imgPicker.callback(asset.publish_url)
          assetsRef.current.setOpen(false)
        }} />
    </Fragment>
  )

  return {...editor, render}
}