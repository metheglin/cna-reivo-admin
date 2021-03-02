import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Modal from '@material-ui/core/Modal'
import Grid from '@material-ui/core/Grid'

import Uploader from '../../../components/Uploader'
import AssetCard from '../../../components/AssetCard'

import { EditorState, AtomicBlockUtils } from 'draft-js'

const useStyles = makeStyles(theme => ({
  paper: {
    position: 'absolute',
    width: '80%',
    height: '80%',
    margin: 'auto',
    backgroundColor: theme.palette.background.paper,
    outline: 'none',
    // border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}))

export default ({assetsModule, editorRef, editorState, setContentState, handleClose}) => {
  const classes = useStyles()
  const mod = assetsModule
  const onClick = (asset) => {
    const options = { 
      // selection: editorState.getCurrentContent().getSelectionAfter(),
    }
    const cs = editorState.getCurrentContent()
    const csWithEntity = cs.createEntity("IMAGE", 'IMMUTABLE', {url: asset.publish_url})
    const entityKey = csWithEntity.getLastCreatedEntityKey()
    const newEditorStateRaw = EditorState.set(editorState, { 
        currentContent: csWithEntity, 
        ...options
    })
    const es = AtomicBlockUtils.insertAtomicBlock(newEditorStateRaw, entityKey, ' ')
    setContentState(es.getCurrentContent())
    handleClose()
  }

  // NOTE:
  // https://github.com/niuware/mui-rte/blob/master/src/utils.ts#L75
  // This imperative action is not supported unless you define custom atomic component as a custom_controls option.
  // You better to make own draft-js library with mui.
  // const onClick = (asset)=>{
  //   console.log('data', {url: asset.publish_url})
  //   editorRef.current.insertAtomicBlock("IMAGE", {url: asset.publish_url})
  //   handleClose()
  // }

  return (
    <Modal
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
      open
      onClose={handleClose}>
      <div style={{top:0,bottom:0,left:0,right:0}} className={classes.paper}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Uploader onDrop={mod.onDrop} />
          </Grid>
          <Grid item xs={12}>
            <Grid container className={null} spacing={1}>
              {mod.assets.map(item => (
                <Grid item key={item.id} xs={4} sm={3} md={2}>
                  <AssetCard item={item} 
                    onClick={onClick} />
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </div>
    </Modal>
  )
}
