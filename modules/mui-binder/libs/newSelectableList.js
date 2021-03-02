import {useState} from 'react'

export default ({defaultValue, max}) => {
  max = max || 1000
  const [values, setValues] = useState(defaultValue || [])
  const pushValue = val => {
    setValues(_state=>([..._state, val].slice(0, max)))
  }
  const removeValues = cond => setValues(_state=>_state.filter((x,i)=>!cond(x,i)))
  const clearValues = () => setValues([])
  const hasValues = () => values && values.length > 0
  const accessors = {values, pushValue, removeValues, clearValues, hasValues, setValues}

  return accessors
}
