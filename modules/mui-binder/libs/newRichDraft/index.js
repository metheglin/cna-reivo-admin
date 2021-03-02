import React, {useState,useMemo,useRef} from 'react'
// https://draftjs.org/docs/api-reference-data-conversion/
import {
  convertToRaw, convertFromRaw, 
} from 'draft-js'

// https://github.com/niuware/mui-rte
import MUIRichTextEditor from 'mui-rte'
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles'
import {stateToHTML} from 'draft-js-export-html';
import {stateFromHTML} from 'draft-js-import-html';
import ImageSearchIcon from '@material-ui/icons/ImageSearch'
import StoreIcon from '@material-ui/icons/Store'
import {
  ShopCard, ShopSearchModal, AssetModal, 
  ShopIntroductionModal, ShopIntro,
} from './components'
// import {generateShopIntro} from './components/ShopIntro'

import {exportOptions, importOptions} from './utils'

const makeHtml = (cs) => stateToHTML(cs, exportOptions)

const innerTheme = theme => createMuiTheme({
  ...theme,
  overrides: {
    MUIRichTextEditor: {
      editorContainer: {
        border: "1px solid gray",
        borderRadius: "6px",
        // paddingLeft: theme.spacing(2),
        // paddingRight: theme.spacing(2),
        padding: theme.spacing(2),
        minHeight: theme.spacing(8),
        '& .public-DraftStyleDefault-block': {
          margin: "0.4em 0",
        },
        '& img': {
          width: 'auto',
          maxWidth: '100%',
        }
      }
    }
  }
})

const defaultControls = [
  "asset", "media", 
  "title", "bold", "italic", "underline", "strikethrough", "highlight", 
  "undo", "redo", "link", 
  "numberList", "bulletList", 
  "quote", // "code", "clear", // "save"
]

export default ({
  defaultValue, 
  controls, label, 
  assetsModule, 
  onSave,
}) => {
  const ref = useRef()
  const [contentState, setContentState] = useState(
    stateFromHTML(defaultValue || "", importOptions)
  )
  const raw = useMemo(()=>convertToRaw(contentState), [contentState])
  // console.log({raw})

  const save = ()=>ref.current.save()

  const [editorStateOfModal,setEditorStateOfModal] = useState()
  const [modalKind, modalEditorState] = editorStateOfModal || []
  // const ShopIntro = generateShopIntro({
  //   handleEdit: (blockProps)=>{
  //     setEditorStateOfModal(["shop_introduction", blockProps])
  //   },
  // })
  const render = (
    <MuiThemeProvider theme={innerTheme}>
      {modalKind === 'asset' && (
        <AssetModal 
          editorRef={ref}
          assetsModule={assetsModule}
          handleClose={()=>setEditorStateOfModal(null)}
          editorState={modalEditorState} 
          setContentState={setContentState} />
      )}
      {modalKind === 'shop' && (
        <ShopSearchModal 
          editorRef={ref}
          handleClose={()=>setEditorStateOfModal(null)}
          editorState={modalEditorState} 
          setContentState={setContentState} />
      )}
      {modalKind === 'shop_introduction' && (
        <ShopIntroductionModal 
          editorRef={ref}
          assetsModule={assetsModule}
          handleClose={()=>setEditorStateOfModal(null)}
          editorState={modalEditorState} 
          setContentState={setContentState} />
      )}
      <MUIRichTextEditor 
        ref={ref}
        label={label} value={JSON.stringify(raw)} 
        toolbarButtonSize="small"
        controls={controls || defaultControls}
        customControls={[
          {
            name: "asset",
            icon: <ImageSearchIcon />,
            type: "callback",
            onClick: (editorState, name, anchor) => {
              setEditorStateOfModal(["asset", editorState])
            }
          },
          {
            name: "shop",
            icon: <StoreIcon />,
            type: "callback",
            onClick: (editorState, name, anchor) => {
              setEditorStateOfModal(["shop", editorState])
            },
          },
          {
            name: "shopcard",
            type: "atomic",
            atomicComponent: ShopCard
          },
          {
            name: "shop_introduction",
            icon: <StoreIcon />,
            type: "callback",
            onClick: (editorState, name, anchor) => {
              setEditorStateOfModal(["shop_introduction", editorState])
            },
          },
          {
            name: "shopintro",
            type: "atomic",
            atomicComponent: ShopIntro
          },
        ]}
        onSave={(data)=>{
          const rawContent = JSON.parse(data)
          const cs = convertFromRaw(rawContent)
          const html = makeHtml(cs)
          onSave(html)
        }}
        // onChange={(es)=>{
        //   const cs = es.getCurrentContent()
        //   console.log('ho', convertToRaw(cs))
        //   setHtml(makeHtml(cs))
        // }}
        />
    </MuiThemeProvider>
  )

  return {
    render,
    raw,
    // html,
    // setContentState,
    save,
  }
}
