import React, {useState,useMemo,useCallback} from 'react'
// react-draft-wysiwyg
// - https://github.com/jpuri/react-draft-wysiwyg
// - https://jpuri.github.io/react-draft-wysiwyg/#/docs
import {EditorState,convertToRaw,ContentState} from 'draft-js'
import {Editor} from 'react-draft-wysiwyg'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import draftToHtml from 'draftjs-to-html'
import htmlToDraft from 'html-to-draftjs'

export default ({defaultValue}) => {
  const contentBlock = htmlToDraft(defaultValue || "")
  const initState = contentBlock ?
    EditorState.createWithContent(ContentState.createFromBlockArray(contentBlock.contentBlocks)) :
    EditorState.createEmpty()
  const [editorState, setEditorState] = useState(initState)
  
  const render = (
    <Editor 
      editorState={editorState}
      toolbarClassName="toolbarClassName"
      wrapperClassName="wrapperClassName"
      editorClassName="editorClassName"
      onEditorStateChange={setEditorState} />
  )
  const rawContent = useMemo(()=>(
    convertToRaw(editorState.getCurrentContent())
  ), [editorState.getCurrentContent()])
  const html = useMemo(()=>(
    draftToHtml(rawContent)
  ), [rawContent])

  return {
    editorState,
    render,
    rawContent,
    html
  }
}
