import { useState } from 'react'
import useDeepCompareEffect from 'use-deep-compare-effect'
import { Editor, EditorState, ContentState, CompositeDecorator } from 'draft-js'
import { convertToRaw, convertFromRaw } from 'draft-js'
import makeStyles from '@mui/styles/makeStyles'
import {Paper} from '@mui/material'
import Media from './components/Media'
import LinkInEditor from './components/LinkInEditor'
import Controls from './components/Controls'

const useStyles = makeStyles(theme=>({
  editor: {
    marginTop: 16,
    maxHeight: 500,
    minHeight: 200,
    overflowY: 'scroll',
    padding: theme.spacing(1),
  }
}))

const getDraftCss = (name) => `
  .newDraft-${name} *[data-block=true] {
    margin-bottom: 8px;
  }

  .newDraft-${name} .header-two {
    position: relative;
    padding-left: 18px;
  }
  .newDraft-${name} .header-two:before {
    content: ' ';
    display: inline-block;
    width: 0.3em;
    height: 100%;
    background-color: white;
    position: absolute;
    left: 0;
  }
  .newDraft-${name} .header-three {
    // margin-bottom: 12px;
    border-bottom: 1px solid white;
    padding-bottom: 4px;
  }
`

const buildGetContentJson = (editorState) => {
  return () => {
    const contentState = editorState.getCurrentContent()
    const raw = convertToRaw(contentState)
    return JSON.stringify(raw)
  }
}

const blockRendererFn = (contentBlock) => {
  const type = contentBlock.getType()
  if (type === 'atomic') {
    return {
      component: Media,
      editable: false,
      props: {
        // foo: 'bar',
      },
    };
  }
}

const blockStyleFn = (contentBlock) => {
  const type = contentBlock.getType()
  return type
}

const decorators = [
  {
    component: LinkInEditor,
    strategy: (contentBlock, callback, contentState) => {
      contentBlock.findEntityRanges(
        (character) => {
            const entityKey = character.getEntity()
            return (
              entityKey !== null &&
              contentState.getEntity(entityKey).getType() === 'LINK'
            )
        },
        callback
      )
    },
  }
]
const decorator = new CompositeDecorator(decorators)

// 
// Example of `defaultValue`
// {"blocks":[{"key":"ah20o","data":{},"text":"タイトル","type":"header-two","depth":0,"entityRanges":[],"inlineStyleRanges":[]},{"key":"73cco","data":{},"text":"本文本文本文本文本文本文本文本文本文本文","type":"unstyled","depth":0,"entityRanges":[],"inlineStyleRanges":[]},{"key":"enmjh","data":{},"text":"本文本文本文本文","type":"unstyled","depth":0,"entityRanges":[],"inlineStyleRanges":[]},{"key":"cpefg","data":{},"text":"","type":"unstyled","depth":0,"entityRanges":[],"inlineStyleRanges":[]},{"key":"f3uhi","data":{},"text":" ","type":"atomic","depth":0,"entityRanges":[{"key":0,"length":1,"offset":0}],"inlineStyleRanges":[]},{"key":"463ek","data":{},"text":"","type":"unstyled","depth":0,"entityRanges":[],"inlineStyleRanges":[]},{"key":"j6sd","data":{},"text":"","type":"unstyled","depth":0,"entityRanges":[],"inlineStyleRanges":[]},{"key":"8lpq8","data":{},"text":"本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文","type":"unstyled","depth":0,"entityRanges":[],"inlineStyleRanges":[]},{"key":"cpvhf","data":{},"text":"タイトル２","type":"header-two","depth":0,"entityRanges":[],"inlineStyleRanges":[]},{"key":"fdlun","data":{},"text":"ここに リンク が入ります。","type":"unstyled","depth":0,"entityRanges":[{"key":1,"length":3,"offset":4}],"inlineStyleRanges":[]},{"key":"16ine","data":{},"text":"本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文","type":"unstyled","depth":0,"entityRanges":[],"inlineStyleRanges":[{"style":"BOLD","length":14,"offset":8}]},{"key":"7khk3","data":{},"text":"","type":"unstyled","depth":0,"entityRanges":[],"inlineStyleRanges":[]}],"entityMap":{"0":{"data":{"url":"//s3-ap-northeast-1.amazonaws.com/localcloud-staging.reivo.info/public/shared/u5qp88a4sm4q12zio26lcrv8lkkr"},"type":"IMAGE","mutability":"IMMUTABLE"},"1":{"data":{"url":"https://google.co.jp/","href":"https://google.co.jp/","target":"_blank"},"type":"LINK","mutability":"MUTABLE"}}}
export default function newDraft({defaultValue, channel}) {
  const classes = useStyles()
  const {blocks=[], entityMap={}} = defaultValue || {}
  const [editorState, setEditorState] = useState(EditorState.createEmpty(decorator))
  useDeepCompareEffect(()=>{
    const state = EditorState.createWithContent(convertFromRaw({blocks, entityMap}), decorator)
    setEditorState(state)
  }, [{blocks, entityMap}])

  const render = (
    <div className={`newDraft-${channel}`}>
      <style>{getDraftCss(channel)}</style>
      <Controls editorState={editorState} setEditorState={setEditorState} channel={channel} />
      <Paper variant="outlined" className={classes.editor}>
        <Editor
          editorState={editorState}
          onChange={(state)=>setEditorState(state)}
          blockRendererFn={blockRendererFn}
          blockStyleFn={blockStyleFn}
        />
      </Paper>
    </div>
  )

  return {render, editorState, getContentJson: buildGetContentJson(editorState)}
}
