import {Fragment, useState, useEffect, useMemo} from 'react'
import {Editor} from "@tinymce/tinymce-react"
import {useTheme} from '@themes/default'
import {useTranslation} from 'react-i18next'

// const toolbar = "undo redo | formatselect | fontsizeselect | bold italic underline strikethrough | alignleft aligncenter alignright alignjustify | outdent indent |  numlist bullist table | forecolor backcolor removeformat | image link | fullscreen "
const defaultToolbar = "formatselect | bold italic underline strikethrough | numlist bullist | image link"
const plugins = ["fullscreen", "link", "table", "lists", "image"]

const defaultInitProps = {
  plugins,
  height: 400,
  menubar: false,
  branding: false,
}

export default function newTinyMceEditor({defaultValue, toolbar, ...props}) {
  toolbar = toolbar || defaultToolbar
  const theme = useTheme()
  const {t} = useTranslation()
  const {init} = props
  const skin = theme.paletteType === 'dark' ?
    {skin: "oxide-dark", content_css: "dark",} :
    {}
  const [value, setValue] = useState(defaultValue)
  useEffect(()=>setValue(defaultValue), [defaultValue])
  const render = useMemo(()=>(
    <Fragment>
      {label && <InputLabel shrink>{t(label)}</InputLabel>}
      <Editor {...props}
        apiKey="q0at5wch0ut06ov3rnokh8jffwakzuld6mh392wkbyf7d6qg"
        initialValue={defaultValue}
        init={{...skin, ...defaultInitProps, ...init, toolbar}}
        onEditorChange={(x)=>setValue(x)} />
    </Fragment>
  ), [defaultValue])

  return {value, render}
}

export {default as newTinyMceEditorWithModalPicker} from './withModalPicker'