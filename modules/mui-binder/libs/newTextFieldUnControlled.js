import React, {useRef} from 'react'
import TextField from '@material-ui/core/TextField'

export default ({defaultValue, ...restProps}) => {
  const ref = useRef()
  const render = (
    <TextField inputRef={ref} {...restProps} defaultValue={defaultValue} />
  )
  return {
    render,
    reset: ()=>ref.current.value = null,
    getValue: ()=>ref.current && ref.current.value,
  }
}