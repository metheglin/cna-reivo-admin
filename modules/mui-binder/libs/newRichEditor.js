import React, {useState,useMemo,useRef} from 'react'
import InputLabel from '@mui/material/InputLabel'
// https://draftjs.org/docs/api-reference-data-conversion/
import {
  // ContentState,
  convertToRaw,
  // convertFromRaw,convertFromHTML
} from 'draft-js'

// https://github.com/niuware/mui-rte
import MUIRichTextEditor from 'mui-rte'
import { createTheme, ThemeProvider, StyledEngineProvider, adaptV4Theme } from '@mui/material/styles';

import {stateToHTML} from 'draft-js-export-html';
import {stateFromHTML} from 'draft-js-import-html';

// https://github.com/sstur/draft-js-utils/blob/master/packages/draft-js-export-html/README.md
const exportOptions = {
  // image convert src => url
  // https://github.com/niuware/mui-rte/blob/master/src/components/Media.tsx#L39
  entityStyleFn: (entity) => {
    const entityType = entity.get('type').toLowerCase()
    if (entityType === 'image') {
      const data = entity.getData()
      // console.log(data.url, {data})
      return {
        element: 'img',
        attributes: {
          src: data.url,
          width: data.width,
          height: data.height,
        },
        // style: {
        //   textAlign: data.alignment,
        // },
      };
    }
  },
}
// https://github.com/sstur/draft-js-utils/blob/master/packages/draft-js-import-element/README.md
const importOptions = {
  // image convert src => url
  // https://github.com/niuware/mui-rte/blob/master/src/components/Media.tsx#L39
  customInlineFn: (element, {Style, Entity}) => {
    if (element.tagName === 'IMG') {
      return Entity('IMAGE', {
        url: element.getAttribute('src'),
        width: element.getAttribute('width'),
        height: element.getAttribute('height'),
      })
    }
  },
  // customBlockFn: (element) => {
  //   if (element.tagName === 'ARTICLE') {
  //     return {type: 'custom-block-type'};
  //   }
  //   if (element.tagName === 'CENTER') {
  //     return {data: {align: 'center'}};
  //   }
  // },
}

const makeHtml = (cs) => stateToHTML(cs, exportOptions)

const innerTheme = theme => createTheme(adaptV4Theme({
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
}))

export default ({defaultValue, controls, label}) => {
  const ref = useRef()
  const [contentState, setContentState] = useState(
    stateFromHTML(defaultValue || "", importOptions)
  )
  const [html, setHtml] = useState(makeHtml(contentState))
  const raw = useMemo(()=>convertToRaw(contentState), [contentState])
  // console.log({raw})
  
  const render = (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={innerTheme}>
        {label && <InputLabel>{label}</InputLabel>}
        <MUIRichTextEditor 
          ref={ref}
          value={JSON.stringify(raw)} 
          toolbarButtonSize="small"
          controls={controls || [
            "title", "bold", "italic", "underline", "strikethrough", "highlight", 
            "undo", "redo", "link", // "media", 
            "numberList", "bulletList", 
            "quote", "code", "clear", // "save"
          ]}
          onChange={(es)=>{
            const cs = es.getCurrentContent()
            // console.log('ho', convertToRaw(cs))
            setHtml(makeHtml(cs))
          }} />
      </ThemeProvider>
    </StyledEngineProvider>
  )

  return {
    render,
    raw,
    html,
    // setContentState,
  }
}