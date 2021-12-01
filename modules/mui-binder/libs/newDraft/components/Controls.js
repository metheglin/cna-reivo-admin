import { Fragment, useState, useEffect } from 'react'
import { Grid, IconButton, Select, MenuItem, FormControl } from '@material-ui/core'
import { EditorState, RichUtils, AtomicBlockUtils } from 'draft-js'

import TitleIcon from '@material-ui/icons/Title'
import FormatBoldIcon from '@material-ui/icons/FormatBold'
import LinkIcon from '@material-ui/icons/Link'
import ImageIcon from '@material-ui/icons/Image'

import {useAssets, useImageUploader, AssetsButtonModal} from 'modules/mui-binder/libs/asset'

export default function Controls({channel, editorState, setEditorState}) {
  return (
    <Grid container spacing={0}>
      <Grid item>
        <ControlSelectFormat editorState={editorState} setEditorState={setEditorState} />
      </Grid>
      <Grid item><ControlButtonBold editorState={editorState} setEditorState={setEditorState} /></Grid>
      {/*<Grid item><ControlButtonLink editorState={editorState} setEditorState={setEditorState} /></Grid>*/}
      <Grid item><ControlButtonImage editorState={editorState} setEditorState={setEditorState} channel={channel} /></Grid>
    </Grid>
  )
}

export function ControlSelectFormat({editorState, setEditorState}) {
  const block = getSelectedBlock(editorState)
  const blockType = block.getType() || 'unstyled'
  const [format, setFormat] = useState(blockType)
  useEffect(()=>setFormat(blockType), [blockType])

  const handleChange = (x) => {
    const blockType = x.target.value
    const newEditorState = RichUtils.toggleBlockType(editorState, blockType)
    setEditorState(newEditorState)
    setFormat(blockType)
  }

  return (
    <FormControl style={{width: 120}}>
      <Select
        value={format}
        onChange={handleChange}
      >
        <MenuItem value={'unstyled'}>unstyled</MenuItem>
        <MenuItem value={'header-two'}>header-two</MenuItem>
        <MenuItem value={'header-three'}>header-three</MenuItem>
        <MenuItem value={'caption'}>caption</MenuItem>
      </Select>
    </FormControl>
  )
}

export function ControlButtonBold({editorState, setEditorState}) {
  const active = editorState.getCurrentInlineStyle().has('BOLD')
  const handleClick = () => {
    const newEditorState = RichUtils.toggleInlineStyle(editorState, 'BOLD')
    setEditorState(newEditorState)
  }
  return (
    <ControlButton active={active} onClick={handleClick}>
      <FormatBoldIcon />
    </ControlButton>
  )
}

export function ControlButtonLink({editorState, setEditorState}) {
  const entity = getSelectedEntity(editorState)
  const active = entity && entity.getType() === 'LINK' ? true : false
  return (
    <ControlButton active={active}>
      <LinkIcon />
    </ControlButton>
  )
}

export function ControlButtonImage({editorState, setEditorState, channel}) {
  const baseQuery = {channel}
  const sourceAssets = useAssets({baseQuery})
  const sourceUploader = useImageUploader({baseQuery, onUploaded: sourceAssets.addItem})

  const handleClick = (item) => {
    const data = {
      type: 'IMAGE',
      url: item.publish_url,
    }
    const newEditorState = insertAtomicBlock(editorState, "IMAGE", data)
    setEditorState(newEditorState)
  }

  return (
    <Fragment>
      <AssetsButtonModal sourceAssets={sourceAssets} sourceUploader={sourceUploader} onClick={handleClick}>
        {setOpen => <ControlButton active={false} onClick={()=>setOpen(true)}><ImageIcon /></ControlButton>}
      </AssetsButtonModal>
    </Fragment>
  )
}

function ControlButton({active, children, ...props}) {
  const color = active ? 'primary' : 'default'
  return (
    <IconButton size="small" color={color} {...props}>{children}</IconButton>
  )
}

const getSelectedEntity = (editorState) => {
  const selection = editorState.getSelection()
  const startOffset = selection.getStartOffset()
  const currentContent = editorState.getCurrentContent()
  const contentBlock = currentContent.getBlockForKey(selection.getStartKey())
  const entityKey = contentBlock.getEntityAt(startOffset)
  if (!entityKey) return null
  return currentContent.getEntity(entityKey)
}

const getSelectedBlock = (editorState) => {
  const selection = editorState.getSelection()
  return editorState.getCurrentContent().getBlockForKey(selection.getStartKey())
}

const insertAtomicBlock = (editorState, type, data) => {
  const contentState = editorState.getCurrentContent()
  const contentStateWithEntity = contentState.createEntity(type, 'IMMUTABLE', data)
  const entityKey = contentStateWithEntity.getLastCreatedEntityKey()
  const newEditorStateRaw = EditorState.set(editorState, {
      currentContent: contentStateWithEntity,
  })
  return AtomicBlockUtils.insertAtomicBlock(newEditorStateRaw, entityKey, ' ')
}
