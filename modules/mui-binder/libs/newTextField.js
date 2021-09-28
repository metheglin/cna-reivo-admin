import React, {useState, useEffect} from 'react'
import TextField from '@material-ui/core/TextField'
import {useTranslation} from 'react-i18next'

export default function newTextField({defaultValue, onChange, label, helperText, ...restProps}) {
  const {t} = useTranslation()
  const [value, setValue] = useState(defaultValue || "")
  const reset = () => setValue(defaultValue || "")
  useEffect(()=>setValue(defaultValue), [defaultValue])
  useEffect(()=>{
    onChange && onChange(value)
  }, [value, onChange])
  const render = (
    <TextField {...restProps} 
      label={t(label)} helperText={t(helperText)}
      value={value} onChange={e=>setValue(e.target.value)} />
  )
  return {value, render, reset}
}