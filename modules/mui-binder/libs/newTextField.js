import React, {useState, useEffect} from 'react'
import TextField from '@material-ui/core/TextField'

export default function newTextField({defaultValue, onChange, ...restProps}) {
  const [value, setValue] = useState(defaultValue || "")
  const reset = () => setValue(defaultValue || "")
  useEffect(()=>setValue(defaultValue), [defaultValue])
  useEffect(()=>{
    onChange && onChange(value)
  }, [value, onChange])
  const render = (
    <TextField {...restProps} value={value} onChange={e=>setValue(e.target.value)} />
  )
  return {value, render, reset}
}