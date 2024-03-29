import {useState} from 'react'
import useDeepCompareEffect from 'use-deep-compare-effect'

export default function newSelectableList({defaultValue, max}) {
  max = max || 1000
  const [values, setValues] = useState(defaultValue || [])
  const pushValue = val => {
    setValues(_state=>([..._state, val].slice(0, max)))
  }
  const removeValues = cond => setValues(_state=>_state.filter((x,i)=>!cond(x,i)))
  const clearValues = () => setValues([])
  const hasValues = () => values && values.length > 0
  const accessors = {values, pushValue, removeValues, clearValues, hasValues, setValues}
  useDeepCompareEffect(()=>setValues(defaultValue), [defaultValue])

  return accessors
}

export function useSelector(props) {
  const accessors = newSelectableList(props)
  const {values, pushValue, removeValues} = accessors
  const onRemove = item => removeValues(x=>x.id === item.id)
  const onPush = item => pushValue(item)
  const isSelected = item => values.map(x=>x.id).includes(item.id)

  return {
    ...accessors,
    onRemove, onPush, isSelected,
  }
}