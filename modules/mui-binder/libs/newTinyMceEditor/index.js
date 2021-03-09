import {Fragment, useState, useEffect, useMemo} from 'react'
import {Editor} from "@tinymce/tinymce-react"
import {useTheme} from '@themes/default'

// const toolbar = "undo redo | formatselect | fontsizeselect | bold italic underline strikethrough | alignleft aligncenter alignright alignjustify | outdent indent |  numlist bullist table | forecolor backcolor removeformat | image link | fullscreen "
const toolbar = "formatselect | bold italic underline strikethrough | numlist bullist | image link"
const plugins = ["fullscreen", "link", "table", "lists", "image"]

const defaultInitProps = {
  plugins, toolbar,
  height: 400,
  menubar: false,
  branding: false,
}

export default function newTinyMceEditor({defaultValue, assetsModule, ...props}) {
  const theme = useTheme()
  const {init} = props
  const skin = theme.paletteType === 'dark' ?
    {skin: "oxide-dark", content_css: "dark",} :
    {}
  const [value, setValue] = useState(defaultValue)
  useEffect(()=>setValue(defaultValue), [defaultValue])
  const render = useMemo(()=>(
    <Editor {...props}
      apiKey="q0at5wch0ut06ov3rnokh8jffwakzuld6mh392wkbyf7d6qg"
      value={defaultValue}
      init={{...skin, ...defaultInitProps, ...init}}
      onEditorChange={(x)=>setValue(x)} />
  ), [defaultValue])

  return {value, render}
}

export {default as newTinyMceEditorWithModalPicker} from './withModalPicker'