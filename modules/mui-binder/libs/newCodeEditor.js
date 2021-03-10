import React, {useState,useMemo,useEffect} from 'react'
import {makeStyles} from '@material-ui/core'

import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/material.css'
import 'codemirror/theme/neat.css'
import 'codemirror/mode/xml/xml.js'
import 'codemirror/mode/javascript/javascript.js'
import 'codemirror/mode/css/css.js'
import {Controlled as CodeMirror} from 'react-codemirror2'

const useStyles = makeStyles(theme=>({
  root: {
    '& .CodeMirror': {
      maxHeight: 400,
    },
    '& .CodeMirror-sizer': {
      fontSize: '0.9rem',
    }
  }
}))

// newCodeEditor is using `react-codemirror2`
// https://github.com/scniro/react-codemirror2
// `options` is passed to original codemirror.
// https://codemirror.net/doc/manual.html
export default ({defaultValue, label, options, ...props}) => {
  const classes = useStyles()
  const [editor, setEditor] = useState()
  const [value, setValue] = useState(defaultValue)
  const [lineWrapping, setLineWrapping] = useState(false)
  const toggleLineWrapping = () => setLineWrapping(!lineWrapping)
  useEffect(()=>setValue(defaultValue), [defaultValue])

  const render = useMemo(()=>(
    <div className={classes.root}>
      <CodeMirror {...props}
        value={value}
        editorDidMount={editor=>setEditor(editor)}
        onBeforeChange={(editor,data,value)=>setValue(value)}
        options={{
          theme: 'material',
          lineNumbers: true,
          lineWrapping: lineWrapping,
          ...options
        }} />
    </div>
  ), [value, lineWrapping])
  return {
    value, setValue, render,
    insert: (code) => {
      const doc = editor.getDoc()
      const cursor = doc.getCursor()
      doc.replaceRange(code, cursor)
    },
    lineWrapping, setLineWrapping, toggleLineWrapping,
  }
}
